/* Copyright (c) 2020 . All Rights Reserved. */

export class PriceRuleDetail {
    priceRule: string;
    seqRuleDetail: number;

    modifierCode: string;
    ruleLevel: string;
    searchSequence: number;
    calculationMethod: string;
    allowedReason: string;
    holdReason: string;
    addToBaseUnits: number;
    allowedFactOvr: number;
    allowedFactor: string;
    multByPctAllowed: string;
    unitValueType: string;
    messageToOperator: string;
    securityCode: string;
    insertDatetime: Date;
    insertUser: string;
    insertProcess: string;
    updateDatetime: Date;
    updateUser: string;
    updateProcess: string;
    resetToInfo: string;
    carveOut: string;
    capOutlierInclExcl: string;
    multModPriceMethod: number;
    multModAllowedReason: string;
    multModAllowedFactOvr: number;
    userDefined1: string;
    userDefined2: string;
    updateDatetimeDisplay?: string;
    insertDatetimeDisplay?: string;

    priceRuleDetailPrimaryKey: {
        priceRule: string;
        seqRuleDetail?: number;
    }
}
