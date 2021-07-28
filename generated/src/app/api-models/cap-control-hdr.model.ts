/* Copyright (c) 2020 . All Rights Reserved. */

export class CapControlHdr {
  capModel: string;
  lastClosedMonth: Date;
  runInProgress: string;
  runInProgressMonth: Date;
  ripFirstContractMonth: Date;
  ripLastContractMonth: Date;
  runInProgressDate: Date;
  lastRunDate: Date;
  currentRunStep: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  runInProgressJobId: number;
  lastMsgJobId: number;
}