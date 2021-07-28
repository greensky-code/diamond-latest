/* Copyright (c) 2020 . All Rights Reserved. */

export class ClaimDetailNdc {
  seqClaimId: number;
  claimLineNumber: number;
  subLineCode: string;
  ndcLineNumber: number;
  ndcCode: string;
  quantity: number;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  ndcAmount: number;
  ndcUnitMeasure: string;
  ndcRxNumber: string;
}