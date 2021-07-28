/* Copyright (c) 2021 . All Rights Reserved. */

export class ClmDtlAuthProcLnkDtl {
  seqCdaplDtl: number;
  seqCdaplHdr: number;
  processingOrder: number;
  ruleId: string;
  payAction: number;
  authProcRangeId: string;
  includeAllRanges: string;
  allowedReason: string;
  hldDenyReason: string;
  effectiveDate: string;
  termDate: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  action:any;
}

export class ProcSpCheckCDAPL {
  sbusKeyName: any;
  sbusKeyValue: any;
  slob: any;
  sauthType: any;
  deffectiveDate: any;
  dtermDate: any;
}