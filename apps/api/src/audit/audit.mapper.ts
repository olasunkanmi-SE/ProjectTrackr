import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/data_access/repositories/generic_repository';
import { Audit } from './audit';
import { BaseModel } from 'src/data_access/model/base.entity';
@Injectable()
export class AuditMapper implements IMapper<Audit, BaseModel> {
  toPersistence(entity: Audit): BaseModel {
    const model = {
      auditCreatedBy: entity.auditCreatedBy,
      auditCreatedDateTime: entity.auditCreatedDateTime,
      auditModifiedBy: entity.auditModifiedBy,
      auditModifiedDateTime: entity.auditModifiedDateTime,
      auditDeletedDateTime: entity.auditDeletedDateTime,
      auditDeletedBy: entity.auditDeletedBy,
    };
    return model;
  }

  toDomain(doc: BaseModel): Audit {
    const entity: Audit = Audit.create({
      auditCreatedBy: doc.auditCreatedBy,
      auditCreatedDateTime: doc.auditCreatedDateTime,
      auditModifiedBy: doc.auditModifiedBy,
      auditModifiedDateTime: doc.auditModifiedDateTime,
      auditDeletedDateTime: doc.auditDeletedDateTime,
      auditDeletedBy: doc.auditDeletedBy,
    }).getValue();
    return entity;
  }
}
