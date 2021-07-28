/* Copyright (c) 2020 . All Rights Reserved. */

export class ClaimsTransmittalSetup {
  seqCltrnId: number;
  jobId: string;
  requestUser: string;
  requestDate: Date;
  requestType: string;
  action: string;
  companyCode: string;
  fileType: string;
  includeHolds: string;
  fromVendorId: string;
  throughVendorId: string;
  fromBatchNumber: string;
  throughBatchNumber: string;
  fromClaimNumber: string;
  throughClaimNumber: string;
  reprintRequest: string;
  reprintDate: Date;
  status: string;
  comments: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  template: string;
  inProcess: string;
}