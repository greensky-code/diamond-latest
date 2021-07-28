/* Copyright (c) 2020 . All Rights Reserved. */

export class StagePremPayHeader {
  batchId: string;
  transactionId: number;
  transactionStatus: string;
  batchTotal: number;
  checkEftNumber: number;
  creditDebitFlag: string;
  premiumPayerIdQualifier: string;
  premiumPayerIdentifier: string;
  premiumPayerName: string;
  premiumPayerAddressLine1: string;
  premiumPayerAddressLine2: string;
  premiumPayerCity: string;
  premiumPayerState: string;
  premiumPayerZip: string;
  referenceIdentifierQualifier: string;
  premiumReceiverRefId: string;
}