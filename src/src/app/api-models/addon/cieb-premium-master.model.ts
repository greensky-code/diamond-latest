/* Copyright (c) 2021 . All Rights Reserved. */

export class CiebPremiumMaster {
  ciebPremiumMasterPrimaryKey: {
    seqGroupId: number;
    seqPremId: number;
  }

  hsdPlancode?: string;
  rxprimeAcctNum: string;
  claimDivision: string;
  policyCode: string;
  planEffectiveDate: string;
  planEndDate: string;
  rxprimePlancodeFlag: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  payerPbmCode?: string;
  drugList?: string;

  action?: string;
}
