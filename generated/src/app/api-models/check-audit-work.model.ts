/* Copyright (c) 2020 . All Rights Reserved. */

export class CheckAuditWork {
  seqCvsupId: number;
  bankAccountCode: string;
  checkNumber: string;
  checkTransSeq: number;
  checkTransUpdSeq: number;
  checkDate: Date;
  transStatus: string;
  priorStatus: string;
  seqVendId: number;
  seqVendAddress: number;
  seqApTrans: number;
  fileType: string;
  transReasonCode: string;
  priorReasonCode: string;
  transStatusDate: Date;
  priorStatusDate: Date;
  claimNumber: string;
  lineNumber: number;
  dateOfService: Date;
  procedureCode: string;
  netAmt: number;
  seqCapTrans: number;
  capModelId: string;
  capEntityCode: string;
  capPoolId: string;
  capMonth: Date;
  applyTo: string;
  capTransAmt: number;
  insertUser: string;
  insertDatetime: Date;
  insertProcess: string;
  updateUser: string;
  updateDatetime: Date;
  updateProcess: string;
  interestAmt: number;
  discountAmt: number;
  paidNetAmt: number;
  penaltyAmt: number;
  seqAdminFee: number;
  seqVendAdvPayAccDtl: number;
}