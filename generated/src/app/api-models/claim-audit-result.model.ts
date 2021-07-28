/* Copyright (c) 2020 . All Rights Reserved. */

export class ClaimAuditResult {
  claimResultCode: string;
  origLineDenyReasn: string;
  histChangeHoldReasn: string;
  applySmartSusp: string;
  smartSuspReasn: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  inclSingleLine: string;
  capStatusAction: string;
  capStatusReason: string;
}