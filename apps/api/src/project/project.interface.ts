import { Audit } from 'src/audit/audit';

export interface IProject {
  name: string;
  description: string;
  code: string;
  category: string;
  audit: Audit;
}
