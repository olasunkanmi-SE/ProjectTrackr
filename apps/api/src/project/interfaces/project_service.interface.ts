import { CreateProjectInput } from '../create-project.dto';
import { Project } from '../project';

export interface IProjectService {
  findProjects(): Promise<Project[]>;
  createProject(request: CreateProjectInput): Promise<Project>;
}
