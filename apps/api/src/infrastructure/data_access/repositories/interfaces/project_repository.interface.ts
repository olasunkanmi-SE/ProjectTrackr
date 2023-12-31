import { Project } from 'src/project/project';
import { IGenericRepository } from './generic_repository.interface';
import { ProjectDataModel } from 'src/infrastructure/data_access/model/project.entity';
export interface IProjectRepository
  extends IGenericRepository<Project, ProjectDataModel> {
  findProjects(): Promise<Project[]>;
  findProject(id: string): Promise<Project>;
}
