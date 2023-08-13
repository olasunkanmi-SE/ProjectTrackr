import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseModel } from './base.entity';
import { IssueDataModel } from './issue.entity';

@Entity({ name: 'comments' })
@ObjectType()
export class CommentDataModel extends BaseModel {
  @Field()
  @Column({ type: 'varchar', length: 128 })
  content: string;

  @Field()
  @Column()
  issueId: string;

  @ManyToOne(() => IssueDataModel, (issue) => issue.comments)
  @Field(() => IssueDataModel)
  issue: IssueDataModel;
}
