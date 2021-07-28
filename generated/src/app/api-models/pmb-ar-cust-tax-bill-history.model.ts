/* Copyright (c) 2020 . All Rights Reserved. */

export class PmbArCustTaxBillHistory {
  customerType: string;
  customerId: string;
  invoiceNo: number;
  invoiceDate: Date;
  billingDatetime: Date;
  periodBilledFromDate: Date;
  periodBilledThruDate: Date;
  seqGpbilId: number;
  seqGroupId: number;
  prmTaxAmt: number;
  salesTaxAmt: number;
  balForwardSalesTaxAmt: number;
  salesTaxPaidAmt: number;
  salesTaxAdjAmt: number;
  newSalesTaxBalanceAmt: number;
  salesTaxPct: number;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  taxablePremiumAmt: number;
  otherPremiumAmt: number;
  taxType: string;
}