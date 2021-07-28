/* Copyright (c) 2020 . All Rights Reserved. */

export class AuditPurgeJob {
  seqAudpuId: number;
  jobId: string;
  ruleName: string;
  status: number;
  action: number;
  requestType: string;
  requestUser: string;
  requestDate: Date;
  template: string;
  comments: string;
  securityCode: string;
  insertUser: string;
  insertProcess: string;
  insertDatetime: Date;
  updateUser: string;
  updateProcess: string;
  updateDatetime: Date;
}