/* Copyright (c) 2020 . All Rights Reserved. */

export class GeneralLedgerInterface {
  companyCode: string;
  glAccountNumber: string;
  postingMonth: Date;
  postRunDateTime: Date;
  transactionType: string;
  debitAmt: number;
  creditAmt: number;
  glPostingStatus: string;
}