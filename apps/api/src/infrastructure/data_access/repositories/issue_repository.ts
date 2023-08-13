import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Issue } from 'src/issue/issue';
import { Repository } from 'typeorm';
import { IssueDataModel } from '../model/issue.entity';
import { IssueMapper } from '../../../issue/issue.mapper';
import { GenericSqlRepository } from './generic_repository';
import { IIssueRepository } from './interfaces/issue_repository.interface';
import { DbLiterals } from 'src/application/constants';

@Injectable()
export class IssueRepository
  extends GenericSqlRepository<Issue, IssueDataModel>
  implements IIssueRepository
{
  issueMapper: IssueMapper;
  constructor(
    @InjectRepository(IssueDataModel) repository: Repository<IssueDataModel>,
    issueMapper: IssueMapper,
  ) {
    super(repository, issueMapper);
    this.issueMapper = issueMapper;
  }

  async getIssues(): Promise<Issue[]> {
    const { project, projectIssues, issues } = DbLiterals;
    const query = await this.repository
      .createQueryBuilder(issues)
      .leftJoinAndSelect(projectIssues, project)
      .getMany();
    return query.map((issue) => this.issueMapper.toDomain(issue));
  }
}
