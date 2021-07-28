/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetGroupPlanDetails} from "../../api-models"

var procGetGroupPlanDetails1 = new ProcGetGroupPlanDetails();
procGetGroupPlanDetails1.pGroupId ="sample data1";
procGetGroupPlanDetails1.pPartner ="sample data1";
procGetGroupPlanDetails1.pNoteType ="sample data1";
procGetGroupPlanDetails1.oHaadPrdCd ="sample data1";
procGetGroupPlanDetails1.oDhaPrdCd ="sample data1";
procGetGroupPlanDetails1.oOtherUaePrdCd ="sample data1";
procGetGroupPlanDetails1.oDubaiEntityId ="sample data1";
procGetGroupPlanDetails1.oNetworkTierClassification ="sample data1";
procGetGroupPlanDetails1.oNetworkEffectiveDate ="sample data1";
procGetGroupPlanDetails1.oNetworkTermDate ="sample data1";
procGetGroupPlanDetails1.oPhotoIndicator ="sample data1";
procGetGroupPlanDetails1.oClientDubaiWorkLocCode ="sample data1";
procGetGroupPlanDetails1.oHaadPolicyHolderType ="sample data1";
procGetGroupPlanDetails1.oQbokGblPlanInd ="sample data1";
procGetGroupPlanDetails1.oQbokEffDate ="sample data1";
procGetGroupPlanDetails1.oQbokTermDate ="sample data1";
procGetGroupPlanDetails1.oUaeGblPlanInd ="sample data1";
procGetGroupPlanDetails1.oUaeEffDate ="sample data1";
procGetGroupPlanDetails1.oUaeTermDate ="sample data1";

var procGetGroupPlanDetails2 = new ProcGetGroupPlanDetails();
procGetGroupPlanDetails2.pGroupId ="sample data2";
procGetGroupPlanDetails2.pPartner ="sample data2";
procGetGroupPlanDetails2.pNoteType ="sample data2";
procGetGroupPlanDetails2.oHaadPrdCd ="sample data2";
procGetGroupPlanDetails2.oDhaPrdCd ="sample data2";
procGetGroupPlanDetails2.oOtherUaePrdCd ="sample data2";
procGetGroupPlanDetails2.oDubaiEntityId ="sample data2";
procGetGroupPlanDetails2.oNetworkTierClassification ="sample data2";
procGetGroupPlanDetails2.oNetworkEffectiveDate ="sample data2";
procGetGroupPlanDetails2.oNetworkTermDate ="sample data2";
procGetGroupPlanDetails2.oPhotoIndicator ="sample data2";
procGetGroupPlanDetails2.oClientDubaiWorkLocCode ="sample data2";
procGetGroupPlanDetails2.oHaadPolicyHolderType ="sample data2";
procGetGroupPlanDetails2.oQbokGblPlanInd ="sample data2";
procGetGroupPlanDetails2.oQbokEffDate ="sample data2";
procGetGroupPlanDetails2.oQbokTermDate ="sample data2";
procGetGroupPlanDetails2.oUaeGblPlanInd ="sample data2";
procGetGroupPlanDetails2.oUaeEffDate ="sample data2";
procGetGroupPlanDetails2.oUaeTermDate ="sample data2";

var procGetGroupPlanDetails3 = new ProcGetGroupPlanDetails();
procGetGroupPlanDetails3.pGroupId ="sample data3";
procGetGroupPlanDetails3.pPartner ="sample data3";
procGetGroupPlanDetails3.pNoteType ="sample data3";
procGetGroupPlanDetails3.oHaadPrdCd ="sample data3";
procGetGroupPlanDetails3.oDhaPrdCd ="sample data3";
procGetGroupPlanDetails3.oOtherUaePrdCd ="sample data3";
procGetGroupPlanDetails3.oDubaiEntityId ="sample data3";
procGetGroupPlanDetails3.oNetworkTierClassification ="sample data3";
procGetGroupPlanDetails3.oNetworkEffectiveDate ="sample data3";
procGetGroupPlanDetails3.oNetworkTermDate ="sample data3";
procGetGroupPlanDetails3.oPhotoIndicator ="sample data3";
procGetGroupPlanDetails3.oClientDubaiWorkLocCode ="sample data3";
procGetGroupPlanDetails3.oHaadPolicyHolderType ="sample data3";
procGetGroupPlanDetails3.oQbokGblPlanInd ="sample data3";
procGetGroupPlanDetails3.oQbokEffDate ="sample data3";
procGetGroupPlanDetails3.oQbokTermDate ="sample data3";
procGetGroupPlanDetails3.oUaeGblPlanInd ="sample data3";
procGetGroupPlanDetails3.oUaeEffDate ="sample data3";
procGetGroupPlanDetails3.oUaeTermDate ="sample data3";


export const ProcGetGroupPlanDetail: ProcGetGroupPlanDetails[] = [
    procGetGroupPlanDetails1,
    procGetGroupPlanDetails2,
    procGetGroupPlanDetails3,
];