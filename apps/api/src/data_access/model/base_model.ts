import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'BaseModel' })
export class BaseModel {
  @CreateDateColumn()
  auditCreatedDateTme: Date;

  @Column({ type: 'varchar', length: 50 })
  auditCreatedBy: string;

  @UpdateDateColumn()
  auditModifiedDateTime?: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  auditModifiedBy?: string;

  @DeleteDateColumn()
  auditDeletedDateTime?: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  auditDeletedBy?: string;
}
