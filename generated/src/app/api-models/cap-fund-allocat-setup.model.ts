/* Copyright (c) 2020 . All Rights Reserved. */

export class CapFundAllocatSetup {
  seqCfdstId: number;
  jobId: string;
  capFundModelId: string;
  capFundMonth: Date;
  allocationAmt: number;
  status: string;
  action: string;
  requestUser: string;
  requestDatetime: Date;
  requestType: string;
  template: string;
  capRunFromDate: Date;
  jobRunDate: Date;
  origNetAmt: number;
  allocationPct: number;
  allocationMethod: number;
  minAllocationPct: number;
  maxAllocationPct: number;
  comments: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}