import React, { useState, useRef, useEffect } from 'react';
import { SINGAPORE_WORKFLOW_DATA, ADMIN_WORKFLOW_DATA, PHILIPPINES_WORKFLOW_DATA, CANDIDATE_WORKFLOW_DATA } from './constants';
import WorkflowNode from './components/WorkflowNode';

// @ts-ignore
const { jsPDF } = window.jspdf;
// @ts-ignore
const html2canvas = window.html2canvas;

type View = 'singapore' | 'philippines' | 'admin' | 'candidate';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('singapore');
  const [zoom, setZoom] = useState(1);
  const [isExporting, setIsExporting] = useState(false);
  const workflowRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dataToRender =
    activeView === 'singapore'
      ? SINGAPORE_WORKFLOW_DATA
      : activeView === 'philippines'
      ? PHILIPPINES_WORKFLOW_DATA
      : activeView === 'admin'
      ? ADMIN_WORKFLOW_DATA
      : CANDIDATE_WORKFLOW_DATA;
      
  const getSubtitle = () => {
    switch(activeView) {
      case 'singapore':
        return "Visualizing the MingHwee.com Singapore Employer Journey";
      case 'philippines':
        return "Visualizing the MingHwee.com Philippines Employer Journey";
      case 'admin':
        return "Visualizing the Administrator's Management & Approval Process";
      case 'candidate':
        return "Visualizing the Complete Candidate Journey from Application to Hire";
      default:
        return "";
    }
  }

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  // Reset scroll position when view changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth / 2 - containerRef.current.clientWidth / 2;
    }
  }, [activeView]);

  const handleExportPDF = async () => {
    const elementToCapture = workflowRef.current;
    if (!elementToCapture) return;

    setIsExporting(true);
    
    const mainElement = elementToCapture.parentElement;
    const originalTransform = elementToCapture.style.transform;
    const originalOverflow = mainElement ? mainElement.style.overflow : '';
    
    // Temporarily adjust styles for full capture
    elementToCapture.style.transform = 'scale(1)';
    if (mainElement) {
        mainElement.style.overflow = 'visible';
    }

    try {
        const canvas = await html2canvas(elementToCapture, {
            scale: 2, // Capture at a higher resolution
            useCORS: true,
            logging: false,
            backgroundColor: null,
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;

        // Create a PDF with dimensions matching the captured image
        const doc = new jsPDF({
            orientation: imgWidth > imgHeight ? 'l' : 'p',
            unit: 'px',
            format: [imgWidth, imgHeight],
        });

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save(`${activeView}-workflow.pdf`);
    } catch (error) {
        console.error("Error exporting PDF:", error);
    } finally {
        // Restore original styles
        elementToCapture.style.transform = originalTransform;
        if (mainElement) {
            mainElement.style.overflow = originalOverflow;
        }
        setIsExporting(false);
    }
};

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-12 px-4 sm:px-6 lg:px-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Business Process Workflow
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-slate-600">
          {getSubtitle()}
        </p>
      </header>
      
      <div className="flex justify-center mb-8">
        <div className="bg-slate-200/60 rounded-full p-1 flex items-center space-x-1 shadow-inner flex-wrap justify-center">
          <button
            onClick={() => setActiveView('singapore')}
            aria-pressed={activeView === 'singapore'}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              activeView === 'singapore'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-transparent text-slate-500 hover:bg-white/50 hover:text-slate-700'
            }`}
          >
            Employer Workflow (SG)
          </button>
          <button
            onClick={() => setActiveView('philippines')}
            aria-pressed={activeView === 'philippines'}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              activeView === 'philippines'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-transparent text-slate-500 hover:bg-white/50 hover:text-slate-700'
            }`}
          >
            Employer Workflow (PH)
          </button>
           <button
            onClick={() => setActiveView('candidate')}
            aria-pressed={activeView === 'candidate'}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              activeView === 'candidate'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-transparent text-slate-500 hover:bg-white/50 hover:text-slate-700'
            }`}
          >
            Candidate Workflow
          </button>
          <button
            onClick={() => setActiveView('admin')}
            aria-pressed={activeView === 'admin'}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              activeView === 'admin'
                ? 'bg-white text-slate-900 shadow-md'
                : 'bg-transparent text-slate-500 hover:bg-white/50 hover:text-slate-700'
            }`}
          >
            Admin Workflow
          </button>
        </div>
      </div>
      
      <div className="flex justify-center items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
            <button
            onClick={handleZoomOut}
            aria-label="Zoom out"
            className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-600 font-bold hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
            -
            </button>
            <span className="text-sm font-semibold text-slate-600 w-12 text-center">{Math.round(zoom * 100)}%</span>
            <button
            onClick={handleZoomIn}
            aria-label="Zoom in"
            className="w-8 h-8 rounded-full bg-slate-200/80 text-slate-600 font-bold hover:bg-slate-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
            >
            +
            </button>
        </div>
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="btn-gradient text-sm"
        >
          <span>{isExporting ? 'Exporting...' : 'Export as PDF'}</span>
        </button>
      </div>

      {/* FIXED: Consistent horizontal scrolling for all pages */}
      <main 
        ref={containerRef}
        className="overflow-x-auto pb-8 rounded-lg bg-white/50 border border-slate-200 mx-4"
      >
        <div className="flex justify-center min-w-[300vw] px-[100vw]"> {/* Fixed consistent spacing */}
          <div 
            ref={workflowRef}
            className="flex flex-col items-center pt-4 transition-transform duration-300 ease-in-out flex-shrink-0"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          >
            {dataToRender.map((step, index) => (
              <React.Fragment key={step.id}>
                <WorkflowNode {...step} />
                {/* Only draw a connector if the step is NOT final AND does NOT have branches */}
                {index < dataToRender.length - 1 && !step.isFinal && !step.branches && (
                  <div className="w-1 h-12 bg-slate-300" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="text-center mt-16 text-slate-500 text-sm">
        <p>A visual representation of the hiring flow.</p>
      </footer>
    </div>
  );
};

export default App;