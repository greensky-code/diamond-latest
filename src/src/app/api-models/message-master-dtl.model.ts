/* Copyright (c) 2020 . All Rights Reserved. */

export class MessageMasterDtl {
  messageId: number;
  languageId: number;
  messageText: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  messageMasterDtlPrimaryKey: {languageId: number, messageId: number};
}
