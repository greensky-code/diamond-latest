import { FORM_FIELD_ACTION_TYPES } from "../shared/models/models";

export class ClaimBenefitAccum {
    action:FORM_FIELD_ACTION_TYPES;
    seqAccumId: number;
    seqMembId: number;
    seqSubsId: number;
    seqGroupId: number;
    ruleId: string;
    benefitPackageId: string;
    detailSvcDate: string;
    seqClaimId: number;
    lineNumber: number;
    subLineCode: string;
    claimAmt: number;
    claimQty: number;
    relationshipCode: string;
    insertDatetime: Date;
    insertUser: string;
    insertProcess: string;
    updateDatetime: Date;
    updateUser: string;
    updateProcess: string;
    fileType: string;
    admitDate: Date;
    dischargeDate: Date;
    benAccumClaimInd: string;
    seqBenPackage: number;
    weightedQty: number;
    seqProvId: number;
    compareDates: string;
    userDefined1: string;
  }

  export class ClaimAccumtProc{
    seqReportId:any;
    selectFromDate:any;
    SelectThruDate:any;
  }