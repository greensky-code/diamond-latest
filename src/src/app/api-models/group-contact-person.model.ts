/* Copyright (c) 2020 . All Rights Reserved. */

import {FORM_FIELD_ACTION_TYPES} from "../shared/models/models";

export class GroupContactPerson {
    action?: FORM_FIELD_ACTION_TYPES;
    emailId: string;
    primaryDistributionMethod?: string;
    updateProcess?: string;
    updateUser?: string;
    updateDatetime?: Date;
    insertProcess?: string;
    insertUser?: string;
    insertDatetime?: Date;
    securityCode?: string;
    faxNumber: string;
    extension: string;
    phoneNumber: string;
    contactTitle: string;
    contactName: string;
    insertDatetimeDisplay?: string;
    updateDatetimeDisplay?: string;
    groupContactPersonPrimaryKey?: {
        seqGroupContact?: number;
        seqGroupId: number;
    }
}
