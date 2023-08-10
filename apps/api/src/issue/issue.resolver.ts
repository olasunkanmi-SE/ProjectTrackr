import { IssueService } from './issue.service';
import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/application/constants';
import { IssueDataModel } from './../data_access/model/issue.entity';
import { Issue } from './issue';

@Resolver(() => IssueDataModel)
export class IssueResolver {
  constructor(
    @Inject(TYPES.issueService)
    private readonly issueService: IssueService,
  ) {}

  @Query(() => [IssueDataModel])
  async issues(): Promise<Issue[]> {
    return await this.issueService.findIssues();
  }
}
