import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDataModel } from 'src/infrastructure/data_access/model/project.entity';
import { Project } from 'src/project/project';
import { Repository } from 'typeorm';
import { ProjectMapper } from '../../../project/project.mapper';
import { GenericSqlRepository } from './generic_repository';
import { IProjectRepository } from './interfaces/project_repository.interface';

@Injectable()
export class ProjectRepository
  extends GenericSqlRepository<Project, ProjectDataModel>
  implements IProjectRepository
{
  projectMapper: ProjectMapper;
  constructor(
    @InjectRepository(ProjectDataModel)
    repository: Repository<ProjectDataModel>,
    projectMapper: ProjectMapper,
  ) {
    super(repository, projectMapper);
    this.projectMapper = projectMapper;
  }

  async getProjects(): Promise<Project[]> {
    return await this.find({});
  }

  async getProjectById(id: string): Promise<Project> {
    return await this.findOne({ where: { _id: id } });
  }
}
