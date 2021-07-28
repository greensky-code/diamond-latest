/* Copyright (c) 2020 . All Rights Reserved. */

export class GroupStateMandate {
    seqGpstatId: number;
    seqGroupId: number;
    seqParentId: number;
    levelCode: string;
    mandateType: string;
    operator: string;
    state: string;
    effectiveDate: string;
    termDate: string;
    termReason: string;
    insertDatetime: string;
    insertUser: string;
    insertProcess: string;
    updateDatetime: string;
    updateUser: string;
    updateProcess: string;

    action: string;
    stateIndex?: number;
}


export class TermReasonViewModel {
    termReason: string;
    termReasonDesc: string;
}
