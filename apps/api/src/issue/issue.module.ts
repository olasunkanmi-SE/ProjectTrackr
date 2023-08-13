import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from 'src/application/constants';
import { IssueDataModel } from 'src/infrastructure/data_access/model/issue.entity';
import { IssueRepository } from 'src/infrastructure/data_access/repositories/issue_repository';
import { IssueMapper } from './issue.mapper';
import { IssueResolver } from './issue.resolver';
import { IssueService } from './issue.service';
import { ProjectRepository } from 'src/infrastructure/data_access/repositories/project_repository';
import { ProjectDataModel } from 'src/infrastructure/data_access/model/project.entity';
import { ProjectMapper } from 'src/project/project.mapper';
import { AuditMapper } from 'src/audit/audit.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([IssueDataModel, ProjectDataModel])],
  providers: [
    { provide: TYPES.issueService, useClass: IssueService },
    { provide: TYPES.issueRepository, useClass: IssueRepository },
    { provide: TYPES.projectRepository, useClass: ProjectRepository },
    AuditMapper,
    IssueMapper,
    IssueResolver,
    ProjectMapper,
  ],
})
export class IssueModule {}
