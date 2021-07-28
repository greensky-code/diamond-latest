/* Copyright (c) 2020 . All Rights Reserved. */

export class CheckAudit {
  bankAccountCode: string;
  checkNumber: string;
  checkTransSeq: number;
  checkDate: Date;
  transStatus: string;
  priorStatus: string;
  seqVendId: number;
  seqVendAddress: number;
  transReasonCode: string;
  priorReasonCode: string;
  transStatusDate: Date;
  priorStatusDate: Date;
  seqCvsupId: number;
  securityCode: string;
  insertUser: string;
  insertDatetime: Date;
  insertProcess: string;
  updateUser: string;
  updateDatetime: Date;
  updateProcess: string;
}