/* Copyright (c) 2020 . All Rights Reserved. */

export class AuthClaimLinkRule {
  lineOfBusiness: string;
  seqAuthType: number;
  authClosedStatus: string;
  authClosedReason: string;
  authNewStatus: string;
  authNewReason: string;
  authHeldStatus: string;
  authHeldReason: string;
  authDeniedStatus: string;
  authDeniedReason: string;
  authExpiredStatus: string;
  authExpiredReason: string;
  authQuantityExceededStatus: string;
  authQuantityExceededReason: string;
  authCostExceededStatus: string;
  authCostExceededReason: string;
  authDateStatus: string;
  authDateReason: string;
  authSecOpReqStatus: string;
  authSecOpReqReason: string;
  authGroupPlanStatus: string;
  authGroupPlanReason: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}