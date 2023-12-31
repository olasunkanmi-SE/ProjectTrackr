import { Module } from '@nestjs/common';
import { TYPES } from 'src/application/constants';
import { ProjectRepository } from 'src/infrastructure/data_access/repositories/project_repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDataModel } from '../infrastructure/data_access/model/project.entity';
import { ProjectMapper } from './project.mapper';
import { ProjectService } from './project_service';
import { ProjectResolver } from './project.resolver';
import { IssueDataModel } from 'src/infrastructure/data_access/model/issue.entity';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectDataModel, IssueDataModel])],
  providers: [
    { provide: TYPES.projectService, useClass: ProjectService },
    { provide: TYPES.projectRepository, useClass: ProjectRepository },
    ProjectMapper,
    ProjectResolver,
  ],
})
export class ProjectModule {}
