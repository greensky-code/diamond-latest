/* Copyright (c) 2020 . All Rights Reserved. */

import { ProvMaster } from '../api-models/prov-master.model';
import { VendorAddress } from '../api-models/vendor-address.model';
import { VendorMaster } from '../api-models/vendor-master';
import { PanelMaster } from './panel-master.model';

export class ProvContract {
  seqProvContract: number;
  seqProvId: number;
  contractType: string;
  lineOfBusiness: string;
  panelId: string;
  effectiveDate: string;
  termDate: string;
  termReason: string;
  pcpFlag: string;
  acceptNewPatients: string;
  enrollmentLimit: number;
  thresholdMet: string;
  thresholdMetMonth: Date;
  seqVendId: number;
  seqVendAddress: number;
  capModelId: string;
  userDefined1: string;
  participationFlag: string;
  printRemitAdvice: string;
  priceRule1: string;
  priceRule2: string;
  priceSchedule1: string;
  priceSchedule2: string;
  pricingRegion: string;
  pctOfBilled: number;
  pctAllowed: number;
  pctWithhold: number;
  pctOfAwp: number;
  dispensingFee: number;
  ipaId: string;
  serviceRegion: string;
  claimHoldReason: string;
  claimHoldDate: Date;
  userDefined2: string;
  securityCode: string;
  insertDatetime: Date;
  insertUser: string;
  insertProcess: string;
  updateDatetime: Date;
  updateUser: string;
  updateProcess: string;
  geographicRegion: string;
  drgGrouperId: string;
  grouperVersion: string;
  drgPricerId: string;
  pricerVersion: string;
  revisionLevel: string;
  drgBaseMult: number;
  drgOutlierMult: number;
  drgOutlierPctBilled: number;
  case2Pct: number;
  case3Pct: number;
  pricerFacilityNumber: string;
  pricerPaysource: string;
  seqCovProvGrp: number;
  comCobAlwdAmtRule: string;
  comCobAlwdAmtRsn: string;
  capFundModelId: string;
  capFundSubModelId: string;
  acceptMedicareAssignFlag: string;
  taxId: string;
  filingLimitDays: number;
  apcFacilityNumber: string;
  apcPaysource: string;
  excludeIncentive: string;
  excludeAdminFee: string;
  panelMaster:PanelMaster;
  pId:any;

  effDate:Date;
  trmDate:Date;

  provContract: ProvContract ;
  provMaster: ProvMaster;
  vendorAddress: VendorAddress ;
  vendorMaster: VendorMaster ;
}






