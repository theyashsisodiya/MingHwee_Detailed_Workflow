import { Actor, WorkflowStep } from './types';

const UNIFIED_EMPLOYER_WORKFLOW: WorkflowStep[] = [
  {
    id: 'E1',
    title: "1. Accessing the Website",
    actor: Actor.USER,
    description: "An employer visits MingHwee.com and is redirected to the appropriate regional URL based on their detected location.",
  },
  {
    id: 'E2',
    title: "2. Employer Login",
    actor: Actor.USER,
    description: "The employer logs in using one of the available secure login methods.",
    branches: [
      { id: 'E2a', title: "Single Pass Login", actor: Actor.SYSTEM, description: "A quick, unified login system for faster access." },
      { id: 'E2b', title: "OTP Login", actor: Actor.SYSTEM, description: "Secure login via a One-Time Password sent to the employer’s registered phone or email." },
    ],
  },
  {
    id: 'E3',
    title: "3. Profile Creation",
    actor: Actor.USER,
    description: "After logging in, the employer creates their profile with company information. First-time employers are prompted to attend an Employer Orientation Program (EOP), with reminders sent by the admin.",
  },
  {
    id: 'E4',
    title: "4. Admin Approval",
    actor: Actor.ADMIN,
    description: "The admin reviews the employer’s profile details for verification and approval.",
    branches: [
      { id: 'E4a', title: "Profile Approved", actor: Actor.SYSTEM, description: "The employer is granted approval and can post jobs on the platform." },
      { id: 'E4b', title: "Profile Rejected", actor: Actor.SYSTEM, description: "The employer is notified and cannot post jobs until issues are resolved.", isFinal: true },
    ],
  },
  {
    id: 'E5',
    title: "5. Posting Jobs",
    actor: Actor.USER,
    description: "Once approved, the employer can post jobs. Job posting for Domestic Helpers in Singapore is restricted by default, but other regions have open job categories.",
  },
  {
    id: 'E6',
    title: "6. Candidate Matching",
    actor: Actor.SYSTEM,
    description: "The platform’s automation system analyzes job requirements and matches relevant candidates based on their profile, skills, and experience.",
  },
  {
    id: 'E7',
    title: "7. Interview Invitations",
    actor: Actor.USER,
    description: "The employer reviews matched candidates and sends interview invitations. Interview links are automatically sent upon scheduling.",
  },
  {
    id: 'E8',
    title: "8. Interview Management",
    actor: Actor.USER,
    description: "The employer manages interviews through their dashboard.",
    branches: [
      { id: 'E8a', title: "View Upcoming", actor: Actor.SYSTEM, description: "View all scheduled interviews." },
      { id: 'E8b', title: "View Past", actor: Actor.SYSTEM, description: "Review completed interviews." },
      { id: 'E8c', title: "Reschedule", actor: Actor.SYSTEM, description: "Option to change the interview time." },
    ],
  },
  {
    id: 'E9',
    title: "9. Payment",
    actor: Actor.USER,
    description: "After a successful interview, the employer pays to hire the candidate, which triggers the documentation process.",
  },
  {
    id: 'E10',
    title: "10. Candidate Document Uploads",
    actor: Actor.SYSTEM,
    description: "The candidate uploads necessary documents in two phases for employer verification.",
     branches: [
      { id: 'E10a', title: "Phase 1 Docs (Pre-Arrival)", actor: Actor.SYSTEM, description: "• Passport\n• Work Visa\n• Medical Certificate\n• Experience Certificate\n• Skills Certification" },
      { id: 'E10b', title: "Phase 2 Docs (Post-Arrival)", actor: Actor.SYSTEM, description: "• Work Permit\n• Visa\n• Thumbprint\n• MOM Certificate\n• Housing Contract" },
    ],
  },
  {
    id: 'E11',
    title: "11. Document Verification",
    actor: Actor.USER,
    description: "The employer reviews the uploaded documents and updates the status in the progress tracker for each phase.",
     branches: [
      { id: 'E11a', title: "Verify Phase 1", actor: Actor.SYSTEM, description: "Status updated to Phase 1 Complete." },
      { id: 'E11b', title: "Verify Phase 2", actor: Actor.SYSTEM, description: "Status updated to Phase 2 Complete." },
      { id: 'E11c', title: "Re-upload Requested", actor: Actor.SYSTEM, description: "Candidate is prompted to re-upload incorrect documents." },
      { id: 'E11d', title: "Application Rejected", actor: Actor.SYSTEM, description: "If documents do not meet requirements, the application is rejected.", isFinal: true },
    ],
  },
  {
    id: 'E12',
    title: "12. Sending the Contract",
    actor: Actor.USER,
    description: "Once all documents are verified, the employer sends the official contract to the candidate for review and digital signature.",
  },
  {
    id: 'E13',
    title: "13. Post-Arrival & Finalization",
    actor: Actor.ADMIN,
    description: "After the contract is signed and the worker arrives, a series of final procedures are executed to finalize employment.",
    branches: [
        { id: 'E13a', title: 'Confirm Medical Clearance', actor: Actor.SYSTEM, description: 'Await confirmation of the worker’s medical clearance before proceeding.' },
        { id: 'E13b', title: 'Placement Fee Payment', actor: Actor.USER, description: 'Employer makes payment for the placement fee (loan) via PayNow, Cash, or Cheque.' },
        { id: 'E13c', title: 'Thumbprinting Scheduled', actor: Actor.ADMIN, description: 'Admin arranges a date with the employer for the worker’s thumbprinting at MOM.' },
        { id: 'E13d', title: 'Work Permit Delivery', actor: Actor.SYSTEM, description: 'After thumbprinting, the work permit is delivered to the employer’s designated address.' },
    ]
  },
   {
    id: 'E14',
    title: "14. Hire Finalized",
    actor: Actor.SYSTEM,
    description: "Upon thumbprinting completion and work permit delivery, the worker is officially hired and the onboarding process is complete.",
    isFinal: true,
  },
];

export const SINGAPORE_WORKFLOW_DATA: WorkflowStep[] = UNIFIED_EMPLOYER_WORKFLOW;

// Create a specific workflow for the Philippines by removing the "Single Pass Login" option.
const PHILIPPINES_EMPLOYER_WORKFLOW: WorkflowStep[] = UNIFIED_EMPLOYER_WORKFLOW.map(step => {
  if (step.id === 'E2') { // Target the Employer Login step
    return {
      ...step,
      // Filter out the Single Pass Login branch
      branches: step.branches?.filter(branch => branch.id !== 'E2a'), 
    };
  }
  return step;
});

export const PHILIPPINES_WORKFLOW_DATA: WorkflowStep[] = PHILIPPINES_EMPLOYER_WORKFLOW;

export const ADMIN_WORKFLOW_DATA: WorkflowStep[] = [
  {
    id: 'A1',
    title: "1. Admin Login",
    actor: Actor.ADMIN,
    description: "Admin logs into the platform to access the admin panel.",
  },
  {
    id: 'A2',
    title: "2. Admin Dashboard",
    actor: Actor.ADMIN,
    description: "The central hub for monitoring platform activity. The admin can navigate to different management sections from here.",
    branches: [
      {
        id: 'A2a',
        title: "View Statistics",
        actor: Actor.SYSTEM,
        description: "Dashboard shows hire stats, popular job categories, total users, active employers, new jobs, and pending approvals.",
      },
      {
        id: 'A2b',
        title: "Navigate Panel",
        actor: Actor.SYSTEM,
        description: "Uses the navigation bar to access: Dashboard, Candidate, Employer, and Approval sections.",
      },
    ],
  },
  {
    id: 'A3',
    title: "3. Management Sections",
    actor: Actor.ADMIN,
    description: "Admin performs specific management tasks based on the selected navigation option.",
    branches: [
      {
        id: 'A3a',
        title: "Candidate Management",
        actor: Actor.ADMIN,
        description: "View a list of all candidates. Can view individual profiles (name, contact, skills, etc.) and their uploaded documents.",
      },
      {
        id: 'A3b',
        title: "Employer Management",
        actor: Actor.ADMIN,
        description: "View a list of all employers. Can view profiles, verification documents (UOM), and manage their job posting status.",
        branches: [
            { id: 'A3b-1', title: 'Approve Employer', actor: Actor.SYSTEM, description: 'Grant the employer rights to post jobs.' },
            { id: 'A3b-2', title: 'Deny Employer', actor: Actor.SYSTEM, description: 'Reject the employer\'s application.' },
            { id: 'A3b-3', title: 'Status Pending', actor: Actor.SYSTEM, description: 'The default status until a decision is made.' }
        ]
      },
      {
        id: 'A3c',
        title: "Interview Approval",
        actor: Actor.ADMIN,
        description: "Review and approve interview invitations sent from employers to candidates. Approval is required for the interview to proceed.",
      },
    ],
    isFinal: true
  },
];

export const CANDIDATE_WORKFLOW_DATA: WorkflowStep[] = [
  {
    id: 'C1',
    title: "1. Accessing the Website",
    actor: Actor.USER,
    description: "A candidate visits Minghwee.com to begin their job search journey.",
  },
  {
    id: 'C2',
    title: "2. Candidate Login",
    actor: Actor.USER,
    description: "The candidate logs in based on their geographical location.",
    branches: [
      { 
        id: 'C2a', 
        title: "Singapore Candidate", 
        actor: Actor.SYSTEM, 
        description: "Candidates from Singapore have two login options.",
        branches: [
            { id: 'C2a-1', title: 'Single Pass Login', actor: Actor.SYSTEM, description: 'A quick, unified login system.' },
            { id: 'C2a-2', title: 'OTP Login', actor: Actor.SYSTEM, description: 'Secure login via a One-Time Password.' }
        ]
      },
      { 
        id: 'C2b', 
        title: "International Candidate", 
        actor: Actor.SYSTEM, 
        description: "Candidates from all other countries use OTP.",
        branches: [
            { id: 'C2b-1', title: 'OTP Login', actor: Actor.SYSTEM, description: 'Secure login via a One-Time Password.' }
        ]
      },
    ],
  },
  {
    id: 'C3',
    title: "3. New Candidate Registration",
    actor: Actor.USER,
    description: "Candidate completes their profile by providing detailed information, documents, and preferences through a multi-step application process.",
    branches: [
      {
        id: 'C3a',
        title: "1. Fill Up Biodata",
        actor: Actor.USER,
        description: `• Personal Info: Full Name, DOB, Nationality, Gender
• Contact Details: Phone, Email, Address
• Educational Background
• Employment History
• Skills & Qualifications
• Emergency Contact`,
      },
      {
        id: 'C3b',
        title: "2. Upload Photo",
        actor: Actor.USER,
        description: `• Specs: Recent, high-res passport-sized photo.
• Background: Neutral (white/light).
• Format: JPEG/PNG, under 2MB.`,
      },
      {
        id: 'C3c',
        title: "3. Video Interview",
        actor: Actor.USER,
        description: `• Instructions: Record in a quiet, well-lit space with professional attire.
• Questions: Background, job interest, strengths, etc.
• Guidelines: 5-7 mins max, MP4/MOV format.`,
      },
      {
        id: 'C3d',
        title: "4. Passport Copy",
        actor: Actor.USER,
        description: `• Required: Clear, scanned copy of personal details page.
• Validity: Must be valid for at least 6 months.
• Format: PDF/JPEG/PNG, under 3MB.`,
      },
      {
        id: 'C3e',
        title: "5. Select Job Interests",
        actor: Actor.USER,
        description: `• Job Categories: Choose preferred industry/roles.
• Location Preferences: Indicate desired locations.
• Salary Expectations: Provide a salary range.
• Job Type: Full-time, part-time, contract, etc.`,
      },
      {
        id: 'C3f',
        title: "6. Complete & Sign Forms",
        actor: Actor.USER,
        description: `• Forms to Sign: Employment Contract, Medical Form, Confidentiality Agreement.
• Signature: Review all terms and provide a digital or manual signature.`,
      },
    ],
  },
  {
    id: 'C4',
    title: "4. Automated Job Matching",
    actor: Actor.SYSTEM,
    description: "Once the profile is created, the platform’s automation system matches the candidate to relevant job openings based on their profile.",
  },
  {
    id: 'C5',
    title: "5. Internal Review Process",
    actor: Actor.SYSTEM,
    description: "Behind the scenes, matched profiles are reviewed by employers, who can then send interview invites that require admin approval.",
    branches: [
      { id: 'C5a', title: 'Employer Sends Invite', actor: Actor.ADMIN, description: 'An employer reviews the matched candidate and initiates an interview invite.' },
      { id: 'C5b', title: 'Admin Approves Invite', actor: Actor.ADMIN, description: 'The admin must approve the invite before it is sent to the candidate.' },
    ],
  },
  {
    id: 'C6',
    title: "6. Receive Interview Invite",
    actor: Actor.USER,
    description: "Once approved, the interview invite appears on the candidate's dashboard with job details.",
    branches: [
        { id: 'C6a', title: 'Accept Invite', actor: Actor.SYSTEM, description: 'Candidate accepts and proceeds to scheduling.' },
        { id: 'C6b', title: 'Reject Invite', actor: Actor.SYSTEM, description: 'Candidate declines the interview. The process ends for this job.', isFinal: true },
    ]
  },
  {
    id: 'C7',
    title: "7. Interview Scheduled",
    actor: Actor.SYSTEM,
    description: "Upon acceptance, an interview link is automatically sent to both the candidate and the employer.",
  },
  {
    id: 'C8',
    title: "8. Post-Interview Decision",
    actor: Actor.USER,
    description: "After the interview, if selected, the candidate decides whether to proceed with the hiring process.",
     branches: [
        { id: 'C8a', title: 'Proceed to Next Step', actor: Actor.SYSTEM, description: 'Candidate wishes to continue to the documentation stage.' },
        { id: 'C8b', title: 'Withdraw Application', actor: Actor.SYSTEM, description: 'Candidate is no longer interested. The process ends.', isFinal: true },
    ]
  },
  {
    id: 'C9',
    title: "9. Document Uploads",
    actor: Actor.USER,
    description: "The candidate uploads required documents in two separate phases as requested.",
     branches: [
      { id: 'C9a', title: "Phase 1: Initial Docs", actor: Actor.SYSTEM, description: "• Identity Proof: Passport, National ID\n• Work Permits\n• Medical Certificate\n• Experience Certificate\n• Skills Certification" },
      { id: 'C9b', title: "Phase 2: Arrival Docs (SG)", actor: Actor.SYSTEM, description: "• Work Permit\n• Visa\n• Thumbprint\n• MOM Certificate\n• Housing Contract" },
    ],
  },
  {
    id: 'C10',
    title: "10. Document Verification",
    actor: Actor.ADMIN,
    description: "The employer reviews the uploaded documents and updates the candidate’s status in a progress tracker.",
     branches: [
      { id: 'C10a', title: "Documents Approved", actor: Actor.SYSTEM, description: "All documents are verified and accepted." },
      { id: 'C10b', title: "Re-upload Requested", actor: Actor.SYSTEM, description: "Candidate is asked to re-upload incorrect or missing documents." },
      { id: 'C10c', title: "Application Rejected", actor: Actor.SYSTEM, description: "Documents do not meet requirements. Process ends.", isFinal: true },
    ],
  },
  {
    id: 'C11',
    title: "11. Offer Letter & Post-Arrival Procedures",
    actor: Actor.ADMIN,
    description: "An offer is sent and signed. After the worker arrives in Singapore, a series of procedures are executed to finalize employment and documentation.",
    branches: [
      {
        id: 'C11a',
        title: "1. Medical Clearance",
        actor: Actor.SYSTEM,
        description: "Wait for transport company to confirm worker's medical clearance, then confirm fetch date/time with employer.",
      },
      {
        id: 'C11b',
        title: "2. Placement Fee Payment",
        actor: Actor.ADMIN,
        description: "Remind employer to pay placement fee (loan) on fetching day.\nModes: PayNow, Cash, Cheque.",
      },
      {
        id: 'C11c',
        title: "3. Document Collection",
        actor: Actor.ADMIN,
        description: "On handover day, collect original employment contract and worker’s SIP certificate. Provide a copy of the SIP certificate to the employer.",
      },
      {
        id: 'C11d',
        title: "4. Handover Briefing",
        actor: Actor.ADMIN,
        description: "Brief worker and employer on documents for signing. Ensure the In-Principle Approval (IPA) form is signed by both parties.",
      },
      {
        id: 'C11e',
        title: "5. Schedule Thumbprint",
        actor: Actor.ADMIN,
        description: "Arrange a date with the employer for the worker’s thumbprinting. Transport will be arranged to pick up the worker.",
      },
      {
        id: 'C11f',
        title: "6. Request IC Details",
        actor: Actor.ADMIN,
        description: "Request IC details of up to three authorized persons for work permit collection for the MOM portal.",
      },
      {
        id: 'C11g',
        title: "7. Work Permit Delivery",
        actor: Actor.SYSTEM,
        description: "After thumbprinting at MOM is complete, the work permit card is delivered to the employer's designated address.",
      },
    ],
  },
  {
    id: 'C12',
    title: "12. Finalizing the Hire",
    actor: Actor.SYSTEM,
    description: "Once the work permit is delivered, the candidate is officially hired, and the onboarding process begins.",
  },
  {
    id: 'C13',
    title: "13. Additional Philippine Agency Processes",
    actor: Actor.ADMIN,
    description: "For first-time workers from the Philippines, a series of government-mandated courses and certifications must be completed before departure.",
    branches: [
      {
        id: 'C13a',
        title: "TESDA Course",
        actor: Actor.ADMIN,
        description: "Admin books the 3-day TESDA course. Worker attends with required documents. System tracks progress and sends reminders.",
      },
      {
        id: 'C13b',
        title: "PDOS Course",
        actor: Actor.ADMIN,
        description: "Admin books the 1-day online Pre-Departure Orientation Seminar. Certificate can be collected same day.",
      },
      {
        id: 'C13c',
        title: "OWWA Course",
        actor: Actor.ADMIN,
        description: "Admin books the OWWA course online and submits required forms and documents on behalf of the worker.",
      },
      {
        id: 'C13d',
        title: "Insurance",
        actor: Actor.ADMIN,
        description: "Admin fills out insurance form and pays on behalf of the worker. Policy is emailed to the worker.",
      },
      {
        id: 'C13e',
        title: "OEC (Overseas Employment Cert.)",
        actor: Actor.USER,
        description: "Worker completes e-Registration. Admin submits all course certificates and documents. Once approved, admin arranges flight bookings.",
      },
      {
        id: 'C13f',
        title: "Final Preparations",
        actor: Actor.ADMIN,
        description: "A pregnancy serum test is required 3 days before departure. Worker stays in Manila accommodation for 2-3 days for a pre-departure briefing.",
      },
    ],
    isFinal: true,
  },
];