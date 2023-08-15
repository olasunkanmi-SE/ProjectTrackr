import { Inject } from '@nestjs/common';
import { TYPES } from 'src/application/constants';
import { Audit } from 'src/audit/audit';
import { IProjectRepository } from 'src/infrastructure/data_access/repositories/interfaces/project_repository.interface';
import { CreateProjectInput } from './validation/create-project.dto';
import { IProjectService } from './interfaces/project_service.interface';
import { Project } from './project';
import { ProjectMapper } from './project.mapper';

export class ProjectService implements IProjectService {
  constructor(
    @Inject(TYPES.projectRepository)
    private readonly projectRepository: IProjectRepository,
    private readonly projectMapper: ProjectMapper,
  ) {}

  async findProjects(): Promise<Project[]> {
    return await this.projectRepository.getProjects();
  }

  async createProject(request: CreateProjectInput): Promise<Project> {
    let project: Project | undefined;
    const audit: Audit = Audit.create({
      auditCreatedDateTime: new Date().toISOString(),
      auditCreatedBy: 'Ola',
    }).getValue();
    const result = await this.projectRepository.save(
      Project.create({ ...request, audit }).getValue(),
    );
    if (result) {
      project = this.projectMapper.toDomain(result);
    }
    return project;
  }
}
