/* Copyright (c) 2020 . All Rights Reserved. */

export class PremBillCustomerWork {
  seqGpbilId: number;
  customerType: string;
  customerId: string;
  invoiceNumber: number;
  billingMonth: Date;
  balanceForward: number;
  paymentAmt: number;
  adjustmentAmt: number;
  newChargeAmt: number;
  newBalance: number;
  billingDatetime: Date;
  billedThroughDate: Date;
}