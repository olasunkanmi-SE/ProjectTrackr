import { CommentDataModel } from 'src/infrastructure/data_access/model/comment.entity';
import { IMapper } from 'src/infrastructure/data_access/repositories/generic_repository';
import { Comment } from './comment';
import { IssueMapper } from 'src/issue/issue.mapper';
import { AuditMapper } from 'src/audit/audit.mapper';

export class CommentMapper implements IMapper<Comment, CommentDataModel> {
  constructor(
    private readonly issueMapper: IssueMapper,
    private readonly auditMapper: AuditMapper,
  ) {}

  toPersistence(entity: Comment): CommentDataModel {
    const { content, issueId, audit, issue } = entity;
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
      content,
      issueId,
      audit,
      issue: this.issueMapper.toPersistence(issue),
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    };
    return model;
  }

  toDomain(model: CommentDataModel): Comment {
    const { content, issueId, issue, _id } = model;
    return Comment.create(
      {
        content,
        issueId,
        issue: this.issueMapper.toDomain(issue),
        audit: this.auditMapper.toDomain(model),
      },
      _id,
    );
  }
}
