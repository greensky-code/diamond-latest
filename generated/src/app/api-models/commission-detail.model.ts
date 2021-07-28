/* Copyright (c) 2020 . All Rights Reserved. */

export class CommissionDetail {
  seqCommissionId: number;
  seqGpbilId: number;
  seqGroupId: number;
  seqApTrans: number;
  billingMonth: Date;
  recordType: string;
  planOrRiderCode: string;
  premiumAmt: number;
  adminFeeAmt: number;
  agentSalesType: string;
  seqAgentId: number;
  commissionStep: string;
  commissionAmount: number;
  backupWitholding: number;
  seqVendId: number;
  seqVendAddress: number;
  processingStatus: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}