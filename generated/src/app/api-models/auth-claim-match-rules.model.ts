/* Copyright (c) 2020 . All Rights Reserved. */

export class AuthClaimMatchRules {
  lineOfBusiness: string;
  claimType: string;
  matchOrder: number;
  authStatus: string;
  authLevel: string;
  description: string;
  providerUsed: string;
  primaryDosUsed: string;
  authBeginDaysBefore: number;
  thruDosUsed: string;
  authEndDaysAfter: number;
  placeServiceUsed: string;
  facilityIdUsed: string;
  surgeryProcUsed: string;
  applyAuthToClaim: string;
  action: string;
  reasonCode: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  authNumberMatch: string;
  authPlaceServiceUsed: string;
  claimPlaceServiceUsed: string;
  exactPlaceServiceUsed: string;
  diagnosisUsed: string;
  matchFirstDigits: number;
  vendorIdUsed: string;
  primarySpecialtyUsed: string;
  diamondIdUsed: string;
}