export interface IAudit {
  auditCreatedDateTime: string;
  auditCreatedBy: string;
  auditModifiedDateTime?: string;
  auditModifiedBy?: string;
  auditDeletedDateTime?: string;
  auditDeletedBy?: string;
}
