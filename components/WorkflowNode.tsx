import React from 'react';
import { Actor, WorkflowStep } from '../types';
import { AdminIcon, SystemIcon, UserIcon } from './Icons';

const actorConfig = {
  [Actor.USER]: {
    Icon: UserIcon,
    bg: 'bg-blue-50',
    text: 'text-blue-800',
    ring: 'ring-blue-200',
    iconBg: 'bg-blue-100',
  },
  [Actor.ADMIN]: {
    Icon: AdminIcon,
    bg: 'bg-amber-50',
    text: 'text-amber-800',
    ring: 'ring-amber-200',
    iconBg: 'bg-amber-100',
  },
  [Actor.SYSTEM]: {
    Icon: SystemIcon,
    bg: 'bg-emerald-50',
    text: 'text-emerald-800',
    ring: 'ring-emerald-200',
    iconBg: 'bg-emerald-100',
  },
};

const WorkflowNode: React.FC<WorkflowStep> = ({ title, actor, description, branches, isFinal }) => {
  const { Icon, bg, text, ring, iconBg } = actorConfig[actor];

  const NodeCard = (
     <div className={`relative max-w-md p-5 rounded-xl shadow-md border border-slate-200/80 ${bg} ring-1 ${ring} text-left`}>
        <div className="flex items-start space-x-4">
          <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconBg} ${text}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider ${text}`}>{actor}</p>
            <h3 className="text-lg font-bold text-slate-800 mt-1">{title}</h3>
            <p className="text-slate-600 text-sm mt-2 whitespace-pre-line">{description}</p>
          </div>
        </div>
      </div>
  );

  const hasBranches = branches && branches.length > 0;

  return (
    <div className="flex flex-col items-center">
      {NodeCard}
      {hasBranches && (
        <div className="flex flex-col items-center">
          {/* Vertical line from parent to branching area */}
          <div className="w-1 h-16 bg-slate-300" />

          {/* This container holds the branches and the horizontal connectors */}
          <div className="relative">
            {/* Top horizontal "one-to-many" connector */}
            {branches.length > 1 && (
              <div
                className="absolute top-0 h-1 bg-slate-300"
                // Spans from the center of the first child to the center of the last
                style={{ left: '50%', right: '50%', transform: 'translateX(-50%)' }}
              >
                 <div className="absolute top-0 left-0 w-full h-full bg-slate-300" style={{ transform: 'translateX(50%)' }} />
              </div>
            )}
            
            {/* Branch nodes container */}
            <div className="inline-flex flex-nowrap items-stretch justify-center px-4 gap-x-8">
              {branches.map((branch, index) => (
                <div key={branch.id} className="relative flex flex-col items-center flex-shrink-0">
                  
                  {/* Top vertical connector from horizontal line to card */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-slate-300" />
                  
                  {/* Top horizontal line segments for a clean join */}
                  {branches.length > 1 && (
                    <div
                      className="absolute top-0 h-1 bg-slate-300"
                      style={{
                        left: index === 0 ? '50%' : 'calc(-1rem - 1px)',
                        right: index === branches.length - 1 ? '50%' : 'calc(-1rem - 1px)',
                      }}
                    />
                  )}

                  {/* Margin container to reserve space for connectors */}
                  <div className="mt-16 mb-16">
                     <WorkflowNode {...branch} />
                  </div>
                 
                  {/* Explicit Merge Connectors: only if parent is not a final step */}
                  {!isFinal && (
                    <>
                      {/* Bottom vertical connector from card to horizontal merge line */}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-slate-300" />
                      
                      {/* Bottom horizontal "many-to-one" line segments */}
                      {branches.length > 1 && (
                        <div
                          className="absolute bottom-0 h-1 bg-slate-300"
                          style={{
                            left: index === 0 ? '50%' : 'calc(-1rem - 1px)',
                            right: index === branches.length - 1 ? '50%' : 'calc(-1rem - 1px)',
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
           {/* Final connector from the center of the merge line */}
           {!isFinal && <div className="w-1 h-16 bg-slate-300" />}
        </div>
      )}
    </div>
  );
};

export default WorkflowNode;