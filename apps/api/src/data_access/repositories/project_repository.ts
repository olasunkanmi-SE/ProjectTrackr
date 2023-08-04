import { ProjectMapper } from './../../project/project.mapper';
import { Project } from 'src/project/project';
import { GenericSqlRepository } from './generic_repository';
import { IProjectRepository } from './interfaces/project_repository.interface';
import { ProjectDataModel } from 'src/project/project_model';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectRepository
  extends GenericSqlRepository<Project, ProjectDataModel>
  implements IProjectRepository
{
  constructor(
    @InjectRepository(ProjectDataModel)
    repository: Repository<ProjectDataModel>,
    projectMapper: ProjectMapper,
  ) {
    super(repository, projectMapper);
  }

  async findProjects(): Promise<Project[]> {
    return await this.find({});
  }
}
