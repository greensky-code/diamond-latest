/* Copyright (c) 2020 . All Rights Reserved. */

export class ClaimBenefitAccum {
  seqAccumId: number;
  seqMembId: number;
  seqSubsId: number;
  seqGroupId: number;
  ruleId: string;
  benefitPackageId: string;
  detailSvcDate: Date;
  seqClaimId: number;
  lineNumber: number;
  subLineCode: string;
  claimAmt: number;
  claimQty: number;
  relationshipCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  fileType: string;
  admitDate: Date;
  dischargeDate: Date;
  benAccumClaimInd: string;
  seqBenPackage: number;
  weightedQty: number;
  seqProvId: number;
  compareDates: string;
  userDefined1: string;
}