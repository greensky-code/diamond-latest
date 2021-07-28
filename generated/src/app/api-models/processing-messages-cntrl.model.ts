/* Copyright (c) 2020 . All Rights Reserved. */

export class ProcessingMessagesCntrl {
  grouping: string;
  allowRegularMessages: string;
  allowDebugMessages: string;
  regularDays: number;
  debugDays: number;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  messageLevel: number;
}