/* Copyright (c) 2020 . All Rights Reserved. */

export class BatchMasterIn {
  batchId: string;
  autoValidate: string;
  autoPost: string;
  partialPost: string;
  reworkable: string;
  processByBatch: string;
  priceClaims: string;
  adjudicateClaims: string;
  checkForDuplicates: string;
  paymentForIndividual: string;
  positiveFile: string;
  fileEffectiveDate: Date;
  totalTransactions: number;
  posted: number;
  deleted: number;
  detailsAdded: number;
  lensAdded: number;
  ndcAdded: number;
  otherCarriersAdded: number;
  totalBilledAmt: number;
  membersAdded: number;
  membersChanged: number;
  membersReinstated: number;
  membersTerminated: number;
  validateDatetime: Date;
  validateUser: string;
  postDatetime: Date;
  postUser: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}