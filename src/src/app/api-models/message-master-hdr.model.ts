/* Copyright (c) 2020 . All Rights Reserved. */

export class MessageMasterHdr {
  messageId: number;
  messageType: string;
  messageLevel: number;
  frontEndMessage: string;
  replacementText: number;
  displayMessage: string;
  retainMessage: string;
  messageOptions: string;
  defaultMessage: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  uncleanFlag: string;
}