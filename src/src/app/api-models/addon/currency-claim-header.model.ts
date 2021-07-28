/* Copyright (c) 2021 . All Rights Reserved. */

export class CurrencyClaimHeader {
  claimID: string;
  seqClaimID: number;
  docID: string;
  incurredCountryCode: string;
  incurredCountryDescription: string;
  currencyCode: string;
  currencyDescription: string;
  currencyDropdownDisabled: boolean = false;
  claimTableSource: string;
  provOutGoingPayCurrency: string;
  primaryServiceDate: Date;
  seqProvId: number;
  isMsgdisplay: boolean = false;
  seqEntityId: number;
}