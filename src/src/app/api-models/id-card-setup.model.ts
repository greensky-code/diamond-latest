export class IdCardSetup {
    idCardSetupPrimaryKey: {
        seqIdprtId?: number;
        jobId: string;
    }
    requestUser: string;
    requestDate: string;
    requestType: string;
    action: string;
    seqNarrativeId: number;
    idCardTemplate: string;
    effectiveDateFrom: string;
    effectiveDateThru: string;
    orderType: string;
    reprintRequest: string;
    reprintDate: Date;
    status: string;
    comments: string;
    template: string;
    securityCode: string;
    insertDatetime: Date;
    insertUser: string;
    insertProcess: string;
    updateDatetime: Date;
    updateUser: string;
    updateProcess: string;
    inProcess: string;
    insertDatetimeDisplay: string;
    updateDatetimeDisplay: string;
}
