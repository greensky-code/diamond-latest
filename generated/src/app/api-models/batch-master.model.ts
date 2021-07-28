/* Copyright (c) 2020 . All Rights Reserved. */

export class BatchMaster {
  batchId: string;
  transactionType: string;
  tradingPartnerId: string;
  x12ControlNumber: string;
  status: string;
  comments: string;
  receivedDatetime: Date;
  receivedUser: string;
  finalizeDatetime: Date;
  finalizeUser: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}