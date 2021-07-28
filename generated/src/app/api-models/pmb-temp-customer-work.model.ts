/* Copyright (c) 2020 . All Rights Reserved. */

export class PmbTempCustomerWork {
  seqGpbilId: number;
  invoiceNo: number;
  seqGroupId: number;
  customerType: string;
  customerId: string;
  periodBilledFromDate: Date;
  periodBilledThruDate: Date;
  balanceForward: number;
  paymentAmt: number;
  adjustmentAmt: number;
  newChargeAmt: number;
  newBalance: number;
  billingDatetime: Date;
  useEftFlg: string;
  paymentDueDate: Date;
  noOfChildDep: number;
  noOfAdultDep: number;
  latestBillingDatetime: Date;
}