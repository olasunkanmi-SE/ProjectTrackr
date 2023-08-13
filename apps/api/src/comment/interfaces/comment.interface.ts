import { Audit } from 'src/audit/audit';
import { Issue } from 'src/issue/issue';

export interface IComment {
  content: string;
  issueId: string;
  issue: Issue;
  user?: string;
  audit: Audit;
}
