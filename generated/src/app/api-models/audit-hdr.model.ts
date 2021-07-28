/* Copyright (c) 2020 . All Rights Reserved. */

export class AuditHdr {
  seqAuditId: number;
  auditedRecordKey: string;
  keywordGroup: string;
  auditedTableName: string;
  databaseAction: string;
  modifyingUserId: string;
  auditTms: Date;
  modifyingProcessId: string;
  keyword: string;
}