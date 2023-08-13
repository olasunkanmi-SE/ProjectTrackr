import { Project } from 'src/project/project';
import { Audit } from './../../audit/audit';

export interface IIssue {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee?: string;
  reporter?: string;
  projectId: string;
  project: Project;
  audit: Audit;
}
