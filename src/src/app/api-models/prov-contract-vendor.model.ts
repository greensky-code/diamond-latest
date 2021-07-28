/* Copyright (c) 2020 . All Rights Reserved. */

import { VendorMaster } from '../api-models/vendor-master';
import { VendorAddress } from '../api-models/vendor-address.model';
import { ProvMaster } from '../api-models/prov-master.model';
import { ProvContract } from '../api-models/prov-contract.model';

export class ProvContractVendor {
    seqVendId: number;
    seqVendAddress: number;
    securityCode: string;
    insertDatetime: Date;
    insertUser: string;
    insertProcess: string;
    updateDatetime: Date;
    updateUser: string;
    updateProcess: string;
    directoryInclude: string;
    defaultVendorAddr: string;
    provContract: ProvContract
    provContractVendorPrimaryKey: ProvContractVendorPrimaryKey;
    provMaster: ProvMaster
    vendorAddress: VendorAddress
    vendorMaster: VendorMaster
    action: string
}

export class ProvContractVendorPrimaryKey {
    seqProvContract: number
    seqProvId: number
    seqProvVendId?: number
}
