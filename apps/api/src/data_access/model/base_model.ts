import { Field, GraphQLISODateTime } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'BaseModel' })
export class BaseModel {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  _id?: string;

  @CreateDateColumn()
  @Field(() => GraphQLISODateTime, { nullable: true })
  auditCreatedDateTime: string;

  @Column({ type: 'varchar', length: 50 })
  @Field(() => GraphQLISODateTime)
  auditCreatedBy: string;

  @UpdateDateColumn()
  @Field(() => GraphQLISODateTime, { nullable: true })
  auditModifiedDateTime?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  auditModifiedBy?: string;

  @DeleteDateColumn()
  @Field(() => GraphQLISODateTime, { nullable: true })
  auditDeletedDateTime?: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Field(() => GraphQLISODateTime, { nullable: true })
  auditDeletedBy?: string;
}
