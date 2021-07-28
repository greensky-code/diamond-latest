export class CiebOutgoingClaimDetail {
    ciebOutgoingClaimDetailPrimaryKey: {
      outgoingLineNumber: number;
      outgoingSubLineCode: string;
      seqClaimid: number
    };

    outgoingNetAmt: number;
    outgoingExchRate: number;
    outgoingEuroNetAmt: number;
    outgoingEuroExchRate: number;
    euroClearingHouseBbbr: string;
    netAmt: number;
    transStatusCode: string;
    transPaymentCode: string;
    tutgoingCurrencyCode: string;

    insertDatetime: any;
    insertProcess: string;
    insertUser: string;
    serviceDate: any;
    updateDatetime: any;
    updateProcess: string;
    updateUser: string;
    action: string;
}
