import { Inject } from '@nestjs/common';
import { TYPES } from 'src/application/constants';
import { IProjectService } from './interfaces/project_service.interface';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProjectDataModel } from '../infrastructure/data_access/model/project.entity';
import { Project } from './project';
import { CreateProjectInput } from './create-project.dto';

@Resolver(() => ProjectDataModel)
export class ProjectResolver {
  constructor(
    @Inject(TYPES.projectService)
    private readonly projectService: IProjectService,
  ) {}

  @Query(() => [ProjectDataModel])
  async projects(): Promise<Project[]> {
    return await this.projectService.findProjects();
  }

  @Mutation(() => ProjectDataModel)
  async createProject(
    @Args('createProjectInput')
    createProjectInput: CreateProjectInput,
  ): Promise<Project> {
    return this.projectService.createProject(createProjectInput);
  }
}
