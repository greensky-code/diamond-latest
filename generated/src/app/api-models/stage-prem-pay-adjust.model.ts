/* Copyright (c) 2020 . All Rights Reserved. */

export class StagePremPayAdjust {
  batchId: string;
  transactionId: number;
  adjustId: number;
  customerId: string;
  customerType: string;
  individualFirstName: string;
  individualMiddleName: string;
  individualLastName: string;
  indivIdCodeQualifier: string;
  indivIdentificationCode: string;
  orgIdCodeQualifier: string;
  orgIdentificationCode: string;
  orgRefIdQualifier: string;
  orgRefIdCode: string;
  supplementalIdCodeQualifier: string;
  supplementalIdCode: string;
  companyCode: string;
  glRefCode: string;
  adjustmentTransactionId: number;
  adjustmentTransactionAmount: number;
  adjustmentTransactionDate: Date;
  adjustmentReason: string;
  description: string;
  transactionStatus: string;
}