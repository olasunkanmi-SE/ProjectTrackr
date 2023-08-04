import { Project } from '../project';

export interface IProjectService {
  findProjects(): Promise<Project[]>;
}
