/* Copyright (c) 2020 . All Rights Reserved. */

import { BenefitPackageDetailPrimaryKeyModel } from "./benefit-package-detail-primary-key-model";

export class BenefitPackageDetail {
  benefitPackageId: string;
  seqBenPackage: number;
  benefitRule: any;
  startDate: any;
  endDate: any;
  parProvReq: string;
  authReq: string;
  riderReqFilter: string;
  supDepRule: string;
  noMosContFrom: number;
  noMosContThru: number;
  securityCode: string;
  insertDatetime: string;
  insertDatetimeDisplay: string;
  insertUser: string;
  insertProcess: string;
  updateDatetime: string;
  updateDatetimeDisplay: string;
  updateUser: string;
  updateProcess: string;
  processingOrder: any;
  riderOperator: string;
  adjustForOcPaid: string;
  parOperator: string;
  authOperator: string;
  applyPar: string;
  authLevel: string;
  applyRider: string;
  weightedValueAccum: string;
  ruleType: any;
  benefitPackageDetailPrimaryKey: any;
  benefitPackageDetailPrimaryKeyModel=new BenefitPackageDetailPrimaryKeyModel();
  benefProcessingOrder:any;
  processingSequence:any;
  use_qty:any;
}

export class BenefitPackageDetailRule {
      applyRider: any;
      authLevel: any;
      applyPar: any;
      authReq: any;
      endDate: any;
			startDate: any;
		  benefitRule: any;
      attributeNum8: any;
      attributeNum7: any;
      attributeNum6: any;
      attributeNum4: any;
      attributeNum3: any;
      attributeNum2: any;
      attributeNum1: any;
      attributeChar14: any;
      attributeChar13: any;
				  attributeChar11: any;
				  attributeChar7: any;
      attributeChar9: any;
      attributeChar5: any;
      attributeChar4: any;
      attributeChar3: any;
      attributeChar2: any;
      attributeChar1: any;
      shortDescription: any;
      ruleType: any;
      carryOver:any;
      use_qty:any;
      timeFrame:any;
      mbrFam:any;
      allGroup:any;
      rule:any;
      accumAmt:any;
      limitType:any;
      ruleLimit:any
      remainAmt:any;
}

export class BenefitPackageCustom {
  benefitPackageId: any;
  seqBenPackage: any;
  benefitRule: any;
  startDate: any;
  endDate: any;
  parProvReq: any;
  authReq: any;
  riderReqFilter: any;
  supDepRule: any;
  noMosContThru: any;
  noMosContFrom: any;
  securityCode: any;
  insertUser: any;
  insertDatetime: any;
  insertProcess: any;
  updateDatetime: any;
  updateUser: any;
  updateProcess: any;
  processingOrder: any;
  ruleId: any;
  ruleType: any;
  shortDescription: any;
  medDefFilter: any;
  narattive: any;
  attributeChar1: any;
  attributeChar2: any;
  attributeChar3: any;
  attributeChar4: any;
  attributeChar5: any;
  attributeChar6: any;
  attributeChar7: any;
  attributeChar8: any;
  attributeChar9: any;
  attributeChar10: any;
  ruletypeCode: any;
  attributeChar11: any;
  attributeChar12: any;
  attributeChar13: any;
  attributeChar14: any;
  attributeChar15: any;
  attributeNum1: any;
  attributeNum2: any;
  attributeNum3: any;
  attributeNum4: any;
  attributeNum5: any;
  attributeNum6: any;
  attributeNum7: any;
  attributeNum8: any;
  attributeNum9: any;
  attributeNum10: any;
  ruleLimit:any;
  limitWithoutSign:any;
  attributeDate1: any;
  attributeDate2: any;
  RuleSecurityCode: any;
    insertDatetimeDisplay: any;
    updateDatetimeDisplay: any;
}
  

export class ProcAccumAmtInModel {

     ruleId:any;
     ruleType:any;
     limitType:any;
     childIndivCount:any;
     familyMemnber:any;
     allGroups:any;
     seqGroupId:any;
     seqProvId:any;
     seqMembId:any;
     seqSubsId:any;
     relationshipCode:any;
     reqFromDate:any;
     reqThruDate:any;
     detailSvcDate:any;
     subLineCode:any;
     attributeChar7:any;
     renTimeFrame:any;
     renElapsedUnits:any;

}