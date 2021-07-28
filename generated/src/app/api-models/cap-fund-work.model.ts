/* Copyright (c) 2020 . All Rights Reserved. */

export class CapFundWork {
  seqCfdstId: number;
  capFundModelId: string;
  capFundSubModelId: string;
  capFundRunFromDate: Date;
  capFundRunMonth: Date;
  seqClaimId: number;
  lineNumber: number;
  subLineCode: string;
  detailSvcFromDate: Date;
  detailSvcToDate: Date;
  seqProvId: number;
  seqMembId: number;
  billedAmt: number;
  allowedAmt: number;
  notCoveredAmt: number;
  copayment1Amt: number;
  copayment2Amt: number;
  deductibleAmt: number;
  otherCarrierAmt: number;
  withholdAmt: number;
  capFundWithholdAmt: number;
  netAmt: number;
  procedureCode: string;
  procedureModifier: string;
  totalUnits: number;
  claimNumber: string;
  claimStatus: string;
  processingStatus: string;
  capFundStatus: number;
  securityCode: string;
  insertUser: string;
  insertProcess: string;
  insertDatetime: Date;
  updateUser: string;
  updateProcess: string;
  updateDatetime: Date;
}