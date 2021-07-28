/* Copyright (c) 2021 . All Rights Reserved. */

export class AccountsPayable {
  seqApTrans: number;
  fileType: string;
  discountWithhold: number;
  netAmt: number;
  apStatus: string;
  selectForPayment: string;
  seqVendId: number;
  seqVendAddress: number;
  checkNumber: string;
  checkDate: Date;
  dueDate: Date;
  postedDate: Date;
  vendor1099Flag: string;
  companyCode: string;
  bankAccountCode: string;
  debitGlNumber1: string;
  debitGlNumber2: string;
  creditGlNumber1: string;
  creditGlNumber2: string;
  apType: string;
  glMonth: Date;
  printFlag: string;
  prePriceOnlyFlag: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  seqCltrnId: number;
  seqCkprtId: number;
  eftTransNumber: string;
  capFundWithholdAmt: number;
  capFundModelId: string;
  capFundSubModelId: string;
  interestAmt: number;
  discountAmt: number;
  intDebitGlNumber: string;
  intCreditGlNumber: string;
  dscntDebitGlNumber: string;
  dscntCreditGlNumber: string;
  paidNetAmt: number;
  seqClaimId: number;
  penaltyAmt: number;
  penaltyExpenseAcc: string;
  penaltyPayableAcc: string;
  seqAdminFee: number;
  incentiveExpenseAcc: string;
  incentivePayableAcc: string;
  seqVendAdvPayAccDtl: number;
  offsetFlag: string;
  checkEftAmount: number;
  offsetSeqVadpyDtl: number;
  seqVendCredit: number;
  advPayPrepaidExpenseAcc: string;
  advPayPayableAcc: string;
  admFeeExpenseAcc: string;
  admFeePayableAcc: string;
  writeOffAcc: string;
}


export class AccountsPayableCustom {
  seqApTrans: number;
  fileType: string;
  netAmt: number;
  paidNetAmt: number;
  seqVendAddress: number;
}