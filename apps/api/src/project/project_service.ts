import { Inject } from '@nestjs/common';
import { TYPES } from 'src/application/constants';
import { IProjectRepository } from 'src/infrastructure/data_access/repositories/interfaces/project_repository.interface';
import { Project } from './project';
import { Audit } from 'src/audit/audit';
import { IProjectService } from './interfaces/project_service.interface';

export class ProjectService implements IProjectService {
  constructor(
    @Inject(TYPES.projectRepository)
    private readonly projectRepository: IProjectRepository,
  ) {}

  async findProjects(): Promise<Project[]> {
    return await this.projectRepository.findProjects();
  }

  async createProject(request: {
    name: string;
    code: string;
    description: string;
    category: string;
  }): Promise<Project> {
    const audit: Audit = Audit.create({
      auditCreatedDateTime: new Date().toISOString(),
      auditCreatedBy: 'Ola',
    }).getValue();
    const project = Project.create({ ...request, audit }).getValue();
    return await this.projectRepository.save(project);
  }
}
