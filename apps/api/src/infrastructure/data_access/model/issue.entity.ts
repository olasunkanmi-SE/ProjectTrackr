import { IssueStatus, IssuePriority } from '../../../application/constants';
import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseModel } from './base.entity';
import { ProjectDataModel } from './project.entity';
import { CommentDataModel } from './comment.entity';

@Entity({ name: 'issues' })
@ObjectType()
export class IssueDataModel extends BaseModel {
  @Field()
  @Column({ type: 'varchar', length: 128 })
  title: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column({
    type: 'enum',
    enum: IssueStatus,
    default: IssueStatus.READYFORDEVELOPMENT,
  })
  status: string;

  @Field()
  @Column({
    type: 'enum',
    enum: IssuePriority,
    default: IssuePriority.LOW,
  })
  priority: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 128 })
  assignee?: string;

  @Field({ nullable: true })
  @Column({ nullable: true, length: 128 })
  reporter?: string;

  @Field()
  @Column()
  projectId: string;

  @ManyToOne(() => ProjectDataModel, (project) => project.issues)
  @Field(() => ProjectDataModel)
  project: ProjectDataModel;

  @OneToMany(() => CommentDataModel, (comment) => comment.issue)
  @Field(() => [CommentDataModel], { nullable: true, defaultValue: [] })
  comments?: CommentDataModel[];
}
