/* Copyright (c) 2020 . All Rights Reserved. */

export class ReleaseHoldJobSetup {
  keyword: string;
  seqRhjobId: number;
  jobId: string;
  seqRuleId: number;
  releaseFromDate: Date;
  releaseThruDate: Date;
  applyHeaderHoldsFlag: string;
  dateTypeCode: string;
  statusCode: number;
  actionCode: number;
  claimsSelected: number;
  claimsProcessed: number;
  requestDate: Date;
  requestUser: string;
  templateFlag: string;
  requestTypeCode: string;
  comments: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}