/* Copyright (c) 2020 . All Rights Reserved. */

export class ApiJobSetup {
  seqJobId: number;
  dbmsJobId: number;
  interfaceCode: number;
  requestUser: string;
  requestDate: Date;
  importDirectory: string;
  exportDirectory: string;
  importFile: string;
  exportFile: string;
  fromEnteredDate: Date;
  thruEnteredDate: Date;
  fromRcvdDate: Date;
  thruRcvdDate: Date;
  status: number;
  action: number;
  requestType: string;
  requestStartTime: Date;
  requestTranInterval: number;
  comments: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}