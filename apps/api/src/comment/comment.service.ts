import { CommentMapper } from 'src/comment/comment.mapper';
import { HttpStatus, Inject } from '@nestjs/common';
import { APIResponseMessage, TYPES } from 'src/application/constants';
import { ICommentRepository } from 'src/infrastructure/data_access/repositories/interfaces/comment_repository.interface';
import { Comment } from './comment';
import { CreateCommentInput } from './validation/create-comment.dto';
import { IIssueRepository } from 'src/infrastructure/data_access/repositories/interfaces/issue_repository.interface';
import { throwApplicationError } from 'src/utils/exception-instance';
import { Audit } from 'src/audit/audit';
import { ICommentService } from './interfaces/comment-service.interface';

export class CommentService implements ICommentService {
  constructor(
    @Inject(TYPES.commentRepository)
    private readonly commentRepository: ICommentRepository,
    @Inject(TYPES.issueRepository)
    private readonly IssueRepository: IIssueRepository,
    private readonly commentMapper: CommentMapper,
  ) {}

  async getComments(): Promise<Comment[]> {
    return await this.commentRepository.getComments();
  }

  async createComment(req: CreateCommentInput) {
    let comment: Comment | undefined;
    const { content, issueId } = req;
    const issue = await this.IssueRepository.getIssueById(issueId);
    if (!issue) {
      throwApplicationError(
        HttpStatus.NOT_FOUND,
        APIResponseMessage.issueNotFound,
      );
    }
    const audit: Audit = Audit.create({
      auditCreatedDateTime: new Date().toISOString(),
      auditCreatedBy: 'Ola',
    }).getValue();
    const result = await this.commentRepository.save(
      Comment.create({
        issueId,
        issue,
        content,
        audit,
      }),
    );
    if (result) {
      comment = this.commentMapper.toDomain(result);
    }
    return comment;
  }
}
