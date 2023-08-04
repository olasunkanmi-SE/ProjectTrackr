import { Inject } from '@nestjs/common';
import { TYPES } from 'src/application/constants';
import { IProjectRepository } from 'src/data_access/repositories/interfaces/project_repository.interface';
import { Project } from './project';

export class ProjectService {
  constructor(
    @Inject(TYPES.projectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async findProjects(): Promise<Project[]> {
    return await this.projectRepository.findProjects();
  }
}
