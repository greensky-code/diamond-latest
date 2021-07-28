/* Copyright (c) 2020 . All Rights Reserved. */

export class GeneralLedgerReference {
  companyCode: string;
  glRefCode: string;
  description: string;
  debitGlNumber1: string;
  creditGlNumber1: string;
  debitGlNumber2: string;
  creditGlNumber2: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  intDebitGlNumber: string;
  intCreditGlNumber: string;
  dscntDebitGlNumber: string;
  dscntCreditGlNumber: string;
  userDefined1: string;
  userDefined2: string;
  userDate1: Date;
  userDate2: Date;
  penaltyExpenseAcc: string;
  penaltyPayableAcc: string;
  incentiveExpenseAcc: string;
  incentivePayableAcc: string;
  advPayPrepaidExpenseAcc: string;
  advPayPayableAcc: string;
  admFeeExpenseAcc: string;
  admFeePayableAcc: string;
  writeOffAcc: string;
}