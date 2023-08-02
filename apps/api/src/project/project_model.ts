import { Field } from '@nestjs/graphql';
import { BaseModel } from 'src/data_access/model/base_model';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'Project' })
export class ProjectDataModel extends BaseModel {
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
}
