/* Copyright (c) 2020 . All Rights Reserved. */

export class AuditPurgeRule {
  ruleName: string;
  description: string;
  changedRecordPath: string;
  changedRecordFilename: string;
  deletedRecordPath: string;
  deletedRecordFilename: string;
  purgeCriteriaTimeframe: string;
  purgeCriteriaTime: number;
  purgeCriteriaDate: Date;
  keywords: string;
  securityCode: string;
  insertUser: string;
  insertProcess: string;
  insertDatetime: Date;
  updateUser: string;
  updateProcess: string;
  updateDatetime: Date;
}