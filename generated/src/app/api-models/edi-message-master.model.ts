/* Copyright (c) 2020 . All Rights Reserved. */

export class EdiMessageMaster {
  processCode: string;
  messageCode: string;
  defaultMessageText: string;
  reportCode: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  severityLevel: string;
  responseString: string;
  messageId: number;
}