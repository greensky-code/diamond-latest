/* Copyright (c) 2020 . All Rights Reserved. */

export class ClaimAuditFilter {
  lineOfBusiness: string;
  claimType: string;
  claimResultCode: string;
  daysHistory: number;
  billedAmtMin: number;
  billedAmtMax: number;
  accountId: string;
  includeCob: string;
  includeSingleLine: string;
  filterHistory: string;
  optionalSort1Col: string;
  optionalSort2Col: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  claimAuditToolCode: number;
  swapModifiers: string;
}