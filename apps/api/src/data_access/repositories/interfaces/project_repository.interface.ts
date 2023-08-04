import { Project } from 'src/project/project';
export interface IProjectRepository {
  findProjects(): Promise<Project[]>;
}
