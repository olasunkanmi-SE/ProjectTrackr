export const TYPES = {
  projectRepository: 'projectRepository',
  projectService: 'projectService',
  issueRepository: 'issueRepository',
  issueService: 'issueService',
  applicationLogger: 'applicationLogger',
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

export const APIResponseMessage = {
  serverError: 'Critical server error occured, please try again later',
};
