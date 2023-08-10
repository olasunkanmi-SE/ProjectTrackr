import { Inject, Injectable } from '@nestjs/common';
import { IIssueRepository } from './../data_access/repositories/interfaces/issue_repository.interface';
import { IIssueService } from './interfaces/issue.service.interface';
import { Issue } from './issue';
import { TYPES } from 'src/application/constants';

@Injectable()
export class IssueService implements IIssueService {
  constructor(
    @Inject(TYPES.issueRepository)
    private readonly issueRepository: IIssueRepository,
  ) {}

  async findIssues(): Promise<Issue[]> {
    return await this.issueRepository.findIssues();
  }
}
