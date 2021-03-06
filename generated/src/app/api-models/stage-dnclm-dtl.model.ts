/* Copyright (c) 2020 . All Rights Reserved. */

export class StageDnclmDtl {
  batchId: string;
  transactionId: number;
  lineNo: number;
  subLineCode: string;
  lineStatus: string;
  detailSvcDate: Date;
  svcThruDate: Date;
  toothNo: string;
  toothStatus: string;
  toothSurface1: string;
  toothSurface2: string;
  toothSurface3: string;
  toothSurface4: string;
  toothSurface5: string;
  arch: string;
  quadrant: string;
  oralCavity: string;
  typeOfService: string;
  placeOfService: string;
  diagnosisCodePtr1: number;
  diagnosisCodePtr2: number;
  diagnosisCodePtr3: number;
  diagnosisCodePtr4: number;
  diagnosisCodePtr5: number;
  diagnosisCodePtr6: number;
  diagnosisCodePtr7: number;
  diagnosisCodePtr8: number;
  procedureCode: string;
  quantity: number;
  billedAmt: number;
  allowedFactor: number;
  allowedAmt: number;
  allowedRsn: string;
  notCoveredAmt: number;
  notCoveredRsn: string;
  copayAmt: number;
  copayRsn: string;
  coinsAmt: number;
  coinsRsn: string;
  deductibleAmt: number;
  deductibleRsn: string;
  otherCarrierAmt: number;
  otherCarrierRsn: string;
  withholdAmt: number;
  netAmt: number;
  primaryPaidAmt: number;
  ocAllowedAmt: number;
  adjustmentRsn: string;
  checkDate: Date;
  anesTotalTime: number;
  adjudDate: Date;
  reservedLocalUseDtl: string;
  uncleanDays: number;
  overrideUncleanDays: number;
  interestAmt: number;
  discountAmt: number;
  paidNetAmt: number;
  claimStatusOut: string;
  processingStatusOut: string;
  procCodeQualifier: string;
  dtlClaimNumber: string;
  insertDatetime: Date;
}