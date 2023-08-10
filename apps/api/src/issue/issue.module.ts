import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IssueDataModel } from 'src/data_access/model/issue.entity';
import { IssueMapper } from './issue.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([IssueDataModel])],
  providers: [IssueMapper],
})
export class IssueModule {}
