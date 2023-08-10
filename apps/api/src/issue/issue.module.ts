import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from 'src/application/constants';
import { IssueDataModel } from 'src/data_access/model/issue.entity';
import { IssueRepository } from 'src/data_access/repositories/issue_repository';
import { IssueMapper } from './issue.mapper';
import { IssueResolver } from './issue.resolver';
import { IssueService } from './issue.service';

@Module({
  imports: [TypeOrmModule.forFeature([IssueDataModel])],
  providers: [
    { provide: TYPES.issueService, useClass: IssueService },
    { provide: TYPES.issueRepository, useClass: IssueRepository },
    IssueMapper,
    IssueResolver,
  ],
})
export class IssueModule {}
