/* Copyright (c) 2020 . All Rights Reserved. */

export class EdiTransactionLog {
  transactionSetId: string;
  submitterId: string;
  fileType: string;
  inputFileName: string;
  transxStatusFlag: string;
  transxOriginFlag: string;
  conversionProgram: string;
  rcvdDateTime: Date;
  rcvdUserId: string;
  editDateTime: Date;
  editUserId: string;
  editStatus: string;
  postDateTime: Date;
  postUserId: string;
  postStatus: string;
  runOption1: string;
  runOption2: string;
  runOption3: string;
  runOption4: string;
  runOption5: string;
  redoConversion: string;
  defaultEffectiveDate: Date;
  defaultTermDate: Date;
  numInputRecords: number;
  numAdds: number;
  numTerms: number;
  numReinstates: number;
  numChanges: number;
  daemonRequest: string;
  comments: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  jobId: string;
  requestUser: string;
  requestDate: Date;
  requestType: string;
  action: string;
  template: string;
  inProcess: string;
}