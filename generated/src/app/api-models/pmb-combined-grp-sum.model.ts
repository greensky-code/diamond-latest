/* Copyright (c) 2020 . All Rights Reserved. */

export class PmbCombinedGrpSum {
  seqGroupId: number;
  periodFromDate: Date;
  periodThruDate: Date;
  billThruRequestDate: Date;
  seqParentId: number;
  totalBalanceForward: number;
  totalNewChargeAmt: number;
  totalAdjustments: number;
  totalPayments: number;
  totalBalance: number;
  commonBillingDateFlg: string;
  billType: string;
  supplementalBillSeqNumber: number;
}