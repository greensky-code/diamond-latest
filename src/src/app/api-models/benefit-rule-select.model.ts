/* Copyright (c) 2020 . All Rights Reserved. */

export class BenefitRuleSelect {

    columnName: string;
    columnOccurrence: number;
    columnType: string;
    operator: string;
    fromValue: string;
    thruValue: string;
    securityCode: string;
    insertDatetime: Date;
    insertUser: string;
    insertProcess: string;
    updateDatetime: Date;
    updateUser: string;
    updateProcess: string;
    state: string;
    action: string;
    benefitRuleSelectPrimaryKey: {
        ruleId: string;
        seqBenRuleSel?: number;
    }
}

export class MedDefStatusModel {
    med_def_filter: string;
    reason_code: string;
    other_med_def_code: string;
}
