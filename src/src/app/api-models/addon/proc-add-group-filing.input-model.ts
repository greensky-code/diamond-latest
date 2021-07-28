/* Copyright (c) 2021 . All Rights Reserved. */

export class ProcAddGroupFiling {
    pGroupId: string;
    pSeqGrpfilingId: number;
    pFilingType: string;
    pSitusState: string;
    pEffectiveDate: string;
    pTermDate: string;
    pChangeReason: string;
    pApplyToSubgroup: string;
    pUser: string;
    action?: string;
    updateProcess?: string;
    updateUser?: string;
    updateDatetime?: string;
    insertProcess?: string;
    insertUser?: string;
    insertDatetime?: string;
}

export class GroupFilingDetailViewModel {
    updateProcess: string;
    updateUser: string;
    updateDatetime: string;
    insertProcess: string;
    insertUser: string;
    insertDatetime: string;
    applyToSubgroup: string;
    changeReason: string;
    termDate: string;
    effectiveDate: string;
    situsState: string;
    filingType: string;
    seqGrpParentId: number;
    seqGroupId: number;
    seqGrpfilingId: number;
    action?: string;
}

export class GroupFilingDetailModel {
    updateProcess: string;
    updateUser: string;
    updateDatetime: string;
    insertProcess: string;
    insertUser: string;
    insertDatetime: string;
    applyToSubgroup: string;
    changeReason: string;
    termDate: string;
    effectiveDate: string;
    situsState: string;
    filingType: string;
    seqGrpParentId: number;
    seqGroupId: number;
    seqGrpfilingId: number;
    action?: string;
    stateIndex?: number;
}
