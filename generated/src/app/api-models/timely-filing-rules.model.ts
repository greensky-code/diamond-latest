/* Copyright (c) 2020 . All Rights Reserved. */

export class TimelyFilingRules {
  seqTfrulId: number;
  ruleOrder: number;
  claimType: string;
  effectiveDate: Date;
  termDate: Date;
  description: string;
  lobSelect: string;
  authLevelSelect: string;
  provStatusSelect: string;
  serviceStateSelect: string;
  companyCodeSelect: string;
  calcFromDate: number;
  calcThruDate: number;
  filingLimitDays: number;
  provLimDaysFlag: string;
  action: string;
  reasonCode: string;
  messageToOperator: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  placeOfServiceSelect: string;
  revenueCodeSelect: string;
  billTypeSelect: string;
  applyActionToAllDtlLines: string;
}