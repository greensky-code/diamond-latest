/* Copyright (c) 2020 . All Rights Reserved. */

export class ProvContractPrice {
  claimType: string;
  seqProvContract: number;
  seqVendId: number;
  seqVendAddress: number;
  detSrchOrder: number;
  detSrchSequence: number;
  contractType: string;
  priceRule1: string;
  priceRule2: string;
  priceSchedule1: string;
  priceSchedule2: string;
  pricingRegion: string;
  pctOfBilled: number;
  pctAllowed: number;
  pctWithhold: number;
  serviceRegion: string;
  geographicRegion: string;
  determinantTable: string;
  determinant: string;
  operator: string;
  drgPricerId: string;
  pricerVersion: string;
  revisionLevel: string;
  drgBaseMult: number;
  drgOutlierMult: number;
  drgOutlierPctBilled: number;
  case2Pct: number;
  case3Pct: number;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  pricerFacilityNumber: string;
  pricerPaysource: string;
  targetRevCodeEditFlag: string;
  targetRevAction: string;
  targetRevReason: string;
  oldClaimType: string;
  oldDetSrchOrder: number;
  oldDetSrchSequence: number;
  provContractPricePrimaryKeyModel: any;
}
