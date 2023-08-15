import { CommentMapper } from 'src/comment/comment.mapper';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TYPES } from 'src/application/constants';
import { CommentDataModel } from 'src/infrastructure/data_access/model/comment.entity';
import { IssueDataModel } from 'src/infrastructure/data_access/model/issue.entity';
import { CommentService } from './comment.service';
import { CommentRepository } from 'src/infrastructure/data_access/repositories/comment_repository';
import { CommentResolver } from './comment.resolver';
import { IssueRepository } from 'src/infrastructure/data_access/repositories/issue_repository';
import { IssueMapper } from 'src/issue/issue.mapper';
import { ProjectMapper } from 'src/project/project.mapper';
import { AuditMapper } from 'src/audit/audit.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([CommentDataModel, IssueDataModel])],
  providers: [
    { provide: TYPES.commentService, useClass: CommentService },
    { provide: TYPES.commentRepository, useClass: CommentRepository },
    { provide: TYPES.issueRepository, useClass: IssueRepository },
    CommentMapper,
    CommentResolver,
    IssueMapper,
    ProjectMapper,
    AuditMapper,
  ],
})
export class CommentModule {}
