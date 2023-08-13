import { IssueService } from './issue.service';
import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TYPES } from 'src/application/constants';
import { IssueDataModel } from '../infrastructure/data_access/model/issue.entity';
import { Issue } from './issue';
import { CreateIssueInput } from './create-issue.dto';

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

  @Mutation(() => IssueDataModel)
  async createIssue(
    @Args('createIssueInput') createIssueInput: CreateIssueInput,
  ): Promise<Issue> {
    return await this.issueService.createIssue(createIssueInput);
  }
}
