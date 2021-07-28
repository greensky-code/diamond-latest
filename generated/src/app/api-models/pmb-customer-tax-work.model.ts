/* Copyright (c) 2020 . All Rights Reserved. */

export class PmbCustomerTaxWork {
  seqGpbilId: number;
  invoiceNo: number;
  seqGroupId: number;
  customerType: string;
  customerId: string;
  periodBilledFromDate: Date;
  periodBilledThruDate: Date;
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