/* Copyright (c) 2020 . All Rights Reserved. */

import {ProvAddressContactPrimaryKeyModel} from './prov-address-contact-primary-key.model';

export class ProvAddressContact {

    provAddressContactPrimaryKey: ProvAddressContactPrimaryKeyModel;
    emailId: string;
    primaryDistributionMethod: string;
    primaryContact: string;
    updateProcess: string;
    updateUser: string;
    updateDatetime: string;
    insertUser: string;
    insertDatetime: string;
    insertProcess: string;
    securityCode: string;
    faxNumber: string;
    extension: string;
    phoneNumber: string;
    contactTitle: string;
    contactName: string;
    action: string;
}
