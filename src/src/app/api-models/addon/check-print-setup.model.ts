/* Copyright (c) 2020 . All Rights Reserved. */

import {MemberMaster} from '../member-master.model';
import {VendorMaster} from '../vendor-master';
import {VendorAddress} from '../vendor-address.model';
import {CompanyMaster} from '../company-master.model';
import {ProvMaster} from '../prov-master.model';

export class CheckPrintSetup {
  seqCkprtId: number;
  jobId: string;
  requestUser: string;
  requestDate: string;
  requestType: string;
  autoManualFlag: string;
  action: string;
  postMonth: string;
  payableType: string;
  companyCode: string;
  bankAccountCode: string;
  checkNumber: string;
  checkDate: string;
  checkAmt: number;
  seqVendId: number;
  seqVendAddress: number;
  fromPostDate: string;
  thruPostDate: string;
  fromDueDate: string;
  thruDueDate: string;
  selectForPayment: string;
  seqMembId: number;
  seqProvId: number;
  printChoice: string;
  checkNotes: string;
  autoVoidChecks: string;
  status: string;
  comments: string;
  securityCode: string;
  insertDatetime: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateUser: string;
  updateProcess: string;
  template: string;
  unixSpoolerName: string;
  numAlignChecksPrinted: number;
  daemonRequest: string;
  inProcess: string;
  seqClaimId: number;
  capModelId: string;
  capEntityCode: string;
  seqCapPoolId: number;
  minCheckOverride: string;
  adminFeeInd: string;
  personNumber: any;
  memberMaster?: MemberMaster;
  vendorMaster?: VendorMaster;
  vendorAddress?: VendorAddress;
  companyMaster?: CompanyMaster;
  provMaster?: ProvMaster;

}