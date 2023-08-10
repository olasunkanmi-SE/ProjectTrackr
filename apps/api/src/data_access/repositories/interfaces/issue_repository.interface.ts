import { IssueDataModel } from 'src/data_access/model/issue.entity';
import { Issue } from 'src/issue/issue';
import { IGenericRepository } from './generic_repository.interface';

export interface IIssueRepository
  extends IGenericRepository<Issue, IssueDataModel> {
  findIssues(): Promise<Issue[]>;
}
