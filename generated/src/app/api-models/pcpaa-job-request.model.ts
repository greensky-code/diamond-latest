/* Copyright (c) 2020 . All Rights Reserved. */

export class PcpaaJobRequest {
  seqPcpjbId: number;
  jobId: string;
  requestUser: string;
  requestDate: Date;
  insertDateFrom: Date;
  insertDateThru: Date;
  insertByProcess: number;
  action: number;
  status: number;
  requestType: string;
  comments: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}