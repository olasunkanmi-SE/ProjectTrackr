import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentDataModel } from 'src/infrastructure/data_access/model/comment.entity';
import { IssueDataModel } from 'src/infrastructure/data_access/model/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentDataModel, IssueDataModel])],
})
export class CommentModule {}
