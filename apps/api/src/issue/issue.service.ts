import { IssueMapper } from './issue.mapper';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { APIResponseMessage, TYPES } from 'src/application/constants';
import { IProjectRepository } from 'src/infrastructure/data_access/repositories/interfaces/project_repository.interface';
import { throwApplicationError } from 'src/utils/exception-instance';
import { IIssueRepository } from '../infrastructure/data_access/repositories/interfaces/issue_repository.interface';
import { Audit } from './../audit/audit';
import { CreateIssueInput } from './create-issue.dto';
import { IIssueService } from './interfaces/issue.service.interface';
import { Issue } from './issue';

@Injectable()
export class IssueService implements IIssueService {
  constructor(
    @Inject(TYPES.issueRepository)
    private readonly issueRepository: IIssueRepository,
    @Inject(TYPES.projectRepository)
    private readonly projectRepository: IProjectRepository,
    private readonly issueMapper: IssueMapper,
  ) {}

  async findIssues(): Promise<Issue[]> {
    return await this.issueRepository.getIssues();
  }

  async createIssue(request: CreateIssueInput) {
    let issue: Issue | undefined;
    const { projectId, title, description, status, priority } = request;
    const project = await this.projectRepository.findProject(projectId);
    if (!project) {
      throwApplicationError(
        HttpStatus.NOT_FOUND,
        APIResponseMessage.projectNotFound,
      );
    }
    const audit: Audit = Audit.create({
      auditCreatedDateTime: new Date().toISOString(),
      auditCreatedBy: 'Ola',
    }).getValue();
    const result = await this.issueRepository.save(
      Issue.create({
        projectId,
        title,
        description,
        status,
        priority,
        project,
        audit,
      }).getValue(),
    );
    if (result) {
      issue = this.issueMapper.toDomain(result);
    }
    return issue;
  }
}
