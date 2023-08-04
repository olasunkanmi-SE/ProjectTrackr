import { Module } from '@nestjs/common';
import { TYPES } from 'src/application/constants';
import { ProjectRepository } from 'src/data_access/repositories/project_repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectDataModel } from './project_model';
import { ProjectMapper } from './project.mapper';
import { ProjectService } from './project_service';
import { ProjectResolver } from './project.resolver';
@Module({
  imports: [TypeOrmModule.forFeature([ProjectDataModel])],
  controllers: [],
  providers: [
    { provide: TYPES.projectService, useClass: ProjectService },
    { provide: TYPES.projectRepository, useClass: ProjectRepository },
    ProjectMapper,
    ProjectResolver,
  ],
})
export class ProjectModule {}
