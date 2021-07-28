/* Copyright (c) 2020 . All Rights Reserved. */

import {VendorAddress} from './vendor-address.model';

export class VendorMaster {
  seqVendId: number;
  vendorId: string;
  shortName: string;
  fullName: string;
  vendorType: string;
  irsTaxId: string;
  userDefined: string;
  holdPaymentFlag: string;
  vendor1099Flag: string;
  paymentDelayDays: number;
  seqVend1099Addr: number;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  eftInd: string;
  vendBankAccountNumber: string;
  vendBankAccountDescription: string;
  vendAbaRoutingNumber: string;
  vendAccountType: string;
  nationalProviderId: string;
  tradingPartnerId: string;
  userDefined2: string;
  userDate1: Date;
  userDate2: Date;
  vendorAddresses?: VendorAddress[];
}
