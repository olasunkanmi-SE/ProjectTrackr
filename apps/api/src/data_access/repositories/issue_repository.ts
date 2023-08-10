import { IssueMapper } from './../../issue/issue.mapper';
import { Injectable } from '@nestjs/common';
import { GenericSqlRepository } from './generic_repository';
import { Issue } from 'src/issue/issue';
import { IssueDataModel } from '../model/issue.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
