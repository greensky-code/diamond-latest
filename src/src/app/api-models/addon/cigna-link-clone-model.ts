/* Copyright (c) 2021 . All Rights Reserved. */

export class CignaLinkCloneModel {
    sourceGroupId: string;
    sourceGroupName: string;
    cloneType: string;
    possibleSubgroupList: Array<string>;
    selectedSubgroupList: Array<string>;
    countryCode: string;
    exceptionCountryCodes: Array<string>;
    exceptionSubgroupIds: Array<string>;
    clonable: boolean;
}
