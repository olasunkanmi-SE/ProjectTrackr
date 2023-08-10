import { IssueDataModel } from 'src/infrastructure/data_access/model/issue.entity';
import { IGenericRepository } from 'src/infrastructure/data_access/repositories/interfaces/generic_repository.interface';
import { Issue } from 'src/issue/issue';

export interface IIssueRepository
  extends IGenericRepository<Issue, IssueDataModel> {
  findIssues(): Promise<Issue[]>;
}
