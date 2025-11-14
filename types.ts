export enum Actor {
  USER = 'User',
  ADMIN = 'Admin',
  SYSTEM = 'System',
}

export interface WorkflowStep {
  id: string | number;
  title: string;
  actor: Actor;
  description: string;
  branches?: WorkflowStep[];
  isFinal?: boolean;
}
