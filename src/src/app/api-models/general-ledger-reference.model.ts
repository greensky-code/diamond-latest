/* Copyright (c) 2020 . All Rights Reserved. */

import { GeneralLedgerReferencePrimaryKey } from "./general-ledger-reference-primary-key";

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
  userDate1: any;
  userDate2: any;
  penaltyExpenseAcc: string;
  penaltyPayableAcc: string;
  incentiveExpenseAcc: string;
  incentivePayableAcc: string;
  advPayPrepaidExpenseAcc: string;
  advPayPayableAcc: string;
  admFeeExpenseAcc: string;
  admFeePayableAcc: string;
  writeOffAcc: string;
  generalLedgerReferencePrimaryKey=new GeneralLedgerReferencePrimaryKey();
}