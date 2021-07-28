/* Copyright (c) 2020 . All Rights Reserved. */

export class ReportHeader {
  seqJobId: number;
  jobId: string;
  keywordName: string;
  parentJobId: string;
  requestDate: Date;
  requestType: string;
  runDate: Date;
  statusInd: string;
  deferredInd: string;
  reprintInd: string;
  storedProcedureId: string;
  toolUsed: string;
  connectString: string;
  serverClientPrtInd: string;
  printerName: string;
  errorInd: number;
  inProcessFlg: string;
  workfileTableName: string;
  templateInd: string;
  comments: number;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}