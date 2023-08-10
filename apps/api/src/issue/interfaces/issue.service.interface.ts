import { Issue } from '../issue';

export interface IIssueService {
  findIssues(): Promise<Issue[]>;
}
