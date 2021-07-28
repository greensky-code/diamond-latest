import { ClaimHoldDeterValuesPrimaryKey } from "./claim-hold-deter-values-primary-key";

export class ClaimHoldDeterValues {
    seqClhldRule: number;
    determinantColumnNo: number;
    determinantValueNo: number;
    detFromValue: string;
    detThruValue: string;
    securityCode: string;
    insertDatetime: any;
    insertUser: string;
    insertProcess: string;
    updateDatetime: any;
    updateUser: string;
    updateProcess: string;
    claimHoldDeterValuesPrimaryKey:ClaimHoldDeterValuesPrimaryKey;
    action:any;
}
