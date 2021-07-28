/* Copyright (c) 2021 . All Rights Reserved. */

import {CignalinkDetailsModel} from "./proc-get-group-addr.view-model";

export class CignaLinkMaintenanceModel {
    groupIDNumber: string;
    groupName: string;
    cignaLinkPartnerList: Array<CignalinkDetailsModel>;

    constructor(groupIDNumber: string, groupName: string, cignaLinkPartnerList=  []) {
        this.groupIDNumber = groupIDNumber;
        this.groupName = groupName;
        this.cignaLinkPartnerList = cignaLinkPartnerList;
    }
}


export class CignaLinkDetailsData {
    seqGroupId: number;
    seqCodeId: number;
    countryCode: string;
    countryName: string;
    partnerCode: string;
    cLink: string;
    effDate: string;
    termDate: string;
    renewalDate: string;
    autoRenewFlag?: string;
    seqEntityId: number;
    seqAddrId: number;
    seqContactId: number;
    addrExistsFlag: string;
    contactExistsFlag: string;
    addrCountryFlag: string;
    provinceInd?: string;
    updateUser: string;
    updateDateTime: string;
    noteType: string;

}