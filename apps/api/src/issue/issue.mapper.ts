import { IMapper } from '../infrastructure/data_access/repositories/generic_repository';
import { Injectable } from '@nestjs/common';
import { Issue } from './issue';
import { IssueDataModel } from 'src/infrastructure/data_access/model/issue.entity';
import { ProjectMapper } from 'src/project/project.mapper';
import { AuditMapper } from 'src/audit/audit.mapper';
import { CommentMapper } from 'src/comment/comment.mapper';

@Injectable()
export class IssueMapper implements IMapper<Issue, IssueDataModel> {
  constructor(
    private readonly projectMapper: ProjectMapper,
    private readonly auditMapper: AuditMapper,
    private readonly commentMapper: CommentMapper,
  ) {}
  toPersistence(entity: Issue): IssueDataModel {
    const {
      title,
      description,
      status,
      priority,
      assignee,
      reporter,
      projectId,
      project,
      audit,
    } = entity;

    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    } = audit;

    const model = {
      _id: entity.id,
      title,
      description,
      status,
      priority,
      assignee,
      reporter,
      projectId,
      project: this.projectMapper.toPersistence(project),
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    };
    return model;
  }

  toDomain(model: IssueDataModel): Issue {
    const {
      title,
      description,
      status,
      priority,
      assignee,
      reporter,
      projectId,
      project,
      comments,
      _id,
    } = model;
    return Issue.create(
      {
        title,
        description,
        status,
        priority,
        assignee,
        reporter,
        projectId,
        project: this.projectMapper.toDomain(project),
        comments: comments.length
          ? comments.map((comment) => this.commentMapper.toDomain(comment))
          : [],
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    ).getValue();
  }
}
