/* Copyright (c) 2021 . All Rights Reserved. */

export class PlanListAddon {
  groupId: string;
  groupName: string;
  planCode: string;
  effDate: string;
  endDate: string;
  sharedBenefit: string;
  xsharedBenefit: string;
  xCarrierGroupNum: string;
  productType: string;
  xCarrierId: string;
  pextnCarrName: string;
  sharingMethod: string;
  xCarrierName: string;
  notSharingBen:boolean;
  action: string;
}
  
export class PlanListAddonIn {
  pSeqGroupId: number;
  pSvcDate: string;
}

export class ProductType {
  decode_1: string;
}
export class ExternalCarrier {
  decode_1: string;
  decode_2: string;
}