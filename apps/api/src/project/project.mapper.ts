import { Injectable } from '@nestjs/common';
import { IMapper } from 'src/data_access/repositories/generic_repository';
import { Project } from './project';
import { ProjectDataModel } from './project_model';
import { AuditMapper } from 'src/audit/audit.mapper';

@Injectable()
export class ProjectMapper implements IMapper<Project, ProjectDataModel> {
  toPersistence(entity: Project): ProjectDataModel {
    const { name, description, code, category, audit } = entity;
    const {
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    } = audit;
    const model = {
      _id: entity.id,
      name,
      description,
      code,
      category,
      auditCreatedBy,
      auditCreatedDateTime,
      auditDeletedBy,
      auditDeletedDateTime,
      auditModifiedBy,
      auditModifiedDateTime,
    };

    return model;
  }

  toDomain(model: ProjectDataModel): Project {
    const { name, description, code, category, _id } = model;
    return Project.create(
      {
        name,
        description,
        code,
        category,
        audit: new AuditMapper().toDomain(model),
      },
      _id,
    ).getValue();
  }
}
