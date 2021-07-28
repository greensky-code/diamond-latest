/* Copyright (c) 2020 . All Rights Reserved. */

export class ApiJobTransactionLog {
  seqJobId: number;
  seqTranId: number;
  actualStartTime: Date;
  actualEndTime: Date;
  transStatus: number;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}