/* Copyright (c) 2020 . All Rights Reserved. */

export class AlLtrRequestTransLog {
  seqLetterRequestId: number;
  seqTranId: number;
  actualStartTime: Date;
  actualEndTime: Date;
  transStatus: number;
  exportFilename: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}