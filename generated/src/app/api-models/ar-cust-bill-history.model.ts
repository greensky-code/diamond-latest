/* Copyright (c) 2020 . All Rights Reserved. */

export class ArCustBillHistory {
  customerType: string;
  customerId: string;
  invoiceDate: Date;
  invoiceNumber: number;
  balanceForward: number;
  paymentAmt: number;
  adjustmentAmt: number;
  newChargeAmt: number;
  newBalance: number;
  billingDatetime: Date;
  billedThroughDate: Date;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
}