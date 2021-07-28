/* Copyright (c) 2020 . All Rights Reserved. */

export class ProvContractSpecialty {
    primarySpecialty: string;
    boardStatus: string;
    directoryInclude: string;
    securityCode: string;
    insertDatetime: Date;
    insertUser: string;
    insertProcess: string;
    updateDatetime: Date;
    updateUser: string;
    updateProcess: string;
    provContractSpecialtyPrimaryKey: {
        seqProvId?: number;
        seqProvContract?: number;
        specialtyType?: string;
    }
    action: string;
}
