/* Copyright (c) 2020 . All Rights Reserved. */

export class StageEraHeader {
  batchId: string;
  transactionId: number;
  seqClaimId: number;
  patControlNo: string;
  claimFilingIndicator: string;
  claimNumber: string;
  placeOfService1: string;
  billType: string;
  drgCode: string;
  patientLastName: string;
  patientFirstName: string;
  patientMiddleInitial: string;
  patientId: string;
  subscriberLastName: string;
  subscriberFirstName: string;
  subscriberMiddleInitial: string;
  subscriberId: string;
  providerCategory: string;
  providerLastName: string;
  providerFirstName: string;
  providerMiddleInitial: string;
  providerTaxId: string;
  authNumber: number;
  termDate: Date;
  dateReceived: Date;
  primaryServiceDate: Date;
  claimThruDate: Date;
  claimStatus: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  totalBilled: number;
  totalNet: number;
  totalPatientLiability: number;
}