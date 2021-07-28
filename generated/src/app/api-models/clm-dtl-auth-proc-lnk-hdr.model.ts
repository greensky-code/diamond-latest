/* Copyright (c) 2020 . All Rights Reserved. */

export class ClmDtlAuthProcLnkHdr {
  seqCdaplHdr: number;
  lineOfBusiness: string;
  authType: string;
  effectiveDate: Date;
  termDate: Date;
  description: string;
  tieBrkOnPrice: string;
  tieBrkOnProc: string;
  mtchOnDtlForInp: string;
  exceedDaysAction: string;
  exceedDaysReason: string;
  modifierUsedAction: string;
  modifierUsedReason: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  exceedAmtAction: string;
  exceedAmtReason: string;
}