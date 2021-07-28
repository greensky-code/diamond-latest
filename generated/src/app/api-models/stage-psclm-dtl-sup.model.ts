/* Copyright (c) 2020 . All Rights Reserved. */

export class StagePsclmDtlSup {
  batchId: string;
  transactionId: number;
  lineNo: number;
  subLineCode: string;
  claimStatus: string;
  processingStatus: string;
  placeOfServicePtr: number;
  seqProvId: number;
  seqMembId: number;
  adjudMethod: string;
  medDefCode: string;
  postDate: Date;
  companyCode: string;
  glRefCode: string;
  printFlag: string;
  printFlagChangeInd: string;
  eobId: string;
  raId: string;
  seqApTrans: number;
  seqAuthDtl: number;
  hiddenUserDef1: string;
  hiddenUserDef2: number;
  withholdSurplus: number;
  bmaAmt: number;
  bmaRsn: string;
  totalUnits: number;
  capFundStatus: number;
  capFundModelId: string;
  capFundSubModelId: string;
  capFundRunMonth: Date;
  auditStatus: string;
  fullCvrgAmt: number;
  cobPatLiabCvrgAmt: number;
  anesInd: string;
  procCodeClass: string;
  invalidFlags: string;
  authProcCodeUsed: string;
  authPrice: number;
  seqCdaplDtl: number;
  geoZipRegion: string;
}