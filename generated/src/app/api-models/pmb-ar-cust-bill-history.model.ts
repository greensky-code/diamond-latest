/* Copyright (c) 2020 . All Rights Reserved. */

export class PmbArCustBillHistory {
  customerType: string;
  customerId: string;
  invoiceNo: number;
  invoiceDate: Date;
  billingDatetime: Date;
  periodBilledFromDate: Date;
  periodBilledThruDate: Date;
  seqGpbilId: number;
  billJobType: string;
  customerName1: string;
  customerName2: string;
  customerAddrLine1: string;
  customerAddrLine2: string;
  customerCity: string;
  customerState: string;
  customerPostalCode: string;
  customerCountry: string;
  balanceForward: number;
  totalPaymentAmt: number;
  totalAdjustmentAmt: number;
  newChargeAmt: number;
  newBalance: number;
  paymentDueDate: Date;
  annualPremiumIncome: number;
  billedStartDate: Date;
  invoicePrintFormat: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  seqGroupId: number;
}