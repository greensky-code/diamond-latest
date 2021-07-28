/* Copyright (c) 2020 . All Rights Reserved. */

export class ClaimSubmittedDataDtl {
  seqClaimId: number;
  lineNumber: number;
  subLineCode: string;
  procedureCode: string;
  alternateProcCode: string;
  procedureModifier1: string;
  procedureModifier2: string;
  procedureModifier3: string;
  procedureModifier4: string;
  placeOfService: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  origNetAmt: number;
  netAmtBalNotPaid: number;
  userDefined1: string;
  userDefined2: string;
  userDefined3: number;
  userDefined4: number;
}