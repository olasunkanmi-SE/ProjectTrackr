import { Inject } from '@nestjs/common';
import { TYPES } from 'src/application/constants';
import { IProjectService } from './interfaces/project_service.interface';
import { Query, Resolver } from '@nestjs/graphql';
import { ProjectDataModel } from '../data_access/model/project.entity';
import { Project } from './project';

@Resolver((of) => ProjectDataModel)
export class ProjectResolver {
  constructor(
    @Inject(TYPES.projectService)
    private readonly projectService: IProjectService,
  ) {}

  @Query((returns) => [ProjectDataModel])
  async projects(): Promise<Project[]> {
    return await this.projectService.findProjects();
  }
}
