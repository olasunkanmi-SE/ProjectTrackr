import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/data_access/model/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { IssueDataModel } from './issue.entity';
import { IProject } from 'src/project/project.interface';

@Entity({ name: 'projects' })
@ObjectType()
export class ProjectDataModel
  extends BaseModel
  implements Omit<IProject, 'audit'>
{
  @Field()
  @Column({ type: 'varchar', length: 128 })
  name: string;

  @Field()
  @Column({ type: 'text' })
  description: string;

  @Field()
  @Column({ type: 'varchar', length: 32 })
  code: string;

  @Field()
  @Column({ type: 'varchar', length: 32 })
  category: string;

  @OneToMany(() => IssueDataModel, (issue) => issue.project)
  @Field(() => [IssueDataModel], { nullable: true })
  issues?: IssueDataModel[];
}
