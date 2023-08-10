import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/issue/issue';
import { Repository } from 'typeorm';
import { IssueDataModel } from '../model/issue.entity';
import { IssueMapper } from './../../issue/issue.mapper';
import { GenericSqlRepository } from './generic_repository';

@Injectable()
export class IssueRepository extends GenericSqlRepository<
  Issue,
  IssueDataModel
> {
  constructor(
    @InjectRepository(IssueDataModel) repository: Repository<IssueDataModel>,
    issueMapper: IssueMapper,
  ) {
    super(repository, issueMapper);
  }
}