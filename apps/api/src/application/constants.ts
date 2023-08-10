export const TYPES = {
  projectRepository: 'projectRepository',
  projectService: 'projectService',
};

export enum IssueStatus {
  REOPENED = 'Reopened',
  INPROGRESS = 'In progress',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  READYFORDEVELOPMENT = 'Ready for development',
}

export enum IssuePriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}
