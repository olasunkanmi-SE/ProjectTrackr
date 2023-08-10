import { IMapper } from '../infrastructure/data_access/repositories/generic_repository';
import { Injectable } from '@nestjs/common';
import { Issue } from './issue';
import { IssueDataModel } from 'src/infrastructure/data_access/model/issue.entity';
import { ProjectMapper } from 'src/project/project.mapper';
import { AuditMapper } from 'src/audit/audit.mapper';

@Injectable()
export class IssueMapper implements IMapper<Issue, IssueDataModel> {
  toPersistence(entity: Issue): IssueDataModel {
    const {
      title,
      description,
      status,
      priority,
      assignee,
      reporter,
      projectId,
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
        project: new ProjectMapper().toDomain(project),
        audit: new AuditMapper().toDomain(model),
      },
      _id,
    ).getValue();
  }
}
