/* Copyright (c) 2020 . All Rights Reserved. */

export class StageEraDetail {
  batchId: string;
  transactionId: number;
  lineNumber: number;
  subLineCode: string;
  netAmt: number;
  productServiceIdQualifier: string;
  procedureCode: string;
  hcpcsModifier1: string;
  hcpcsModifier2: string;
  hcpcsModifier3: string;
  hcpcsModifier4: string;
  quantity: number;
  aProductServiceIdQualifier: string;
  aProcedureCode: string;
  billedAmount: number;
  detailSvcDate: Date;
  svcToDate: Date;
  allowedReason: string;
  allowedAmt: number;
  copay1Reason: string;
  copay1Amt: number;
  copay2Reason: string;
  copay2Amt: number;
  deductibleReason: string;
  deductibleAmt: number;
  notCoveredReason: string;
  notCoveredAmt: number;
  otherCarrierReason: string;
  otherCarrierAmt: number;
  withholdReason: string;
  withholdAmt: number;
  capFundWithholdReason: string;
  capFundWithholdAmt: number;
  interestReason: string;
  interestAmt: number;
  discountReason: string;
  discountAmt: number;
  claimStatus: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  revenueCode: string;
  providerLineItemControlNo: string;
  penaltyAmt: number;
  penaltyReason: string;
}