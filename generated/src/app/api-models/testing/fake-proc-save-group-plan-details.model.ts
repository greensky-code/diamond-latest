/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcSaveGroupPlanDetails} from "../../api-models"

var procSaveGroupPlanDetails1 = new ProcSaveGroupPlanDetails();
procSaveGroupPlanDetails1.pGroupId ="sample data1";
procSaveGroupPlanDetails1.pPartner ="sample data1";
procSaveGroupPlanDetails1.pNoteType ="sample data1";
procSaveGroupPlanDetails1.pHaadPrdCd ="sample data1";
procSaveGroupPlanDetails1.pDhaPrdCd ="sample data1";
procSaveGroupPlanDetails1.pOtherUaePrdCd ="sample data1";
procSaveGroupPlanDetails1.pDubaiEntityId ="sample data1";
procSaveGroupPlanDetails1.pNetworkTierClassification ="sample data1";
procSaveGroupPlanDetails1.pNetworkEffectiveDate ="sample data1";
procSaveGroupPlanDetails1.pNetworkTermDate ="sample data1";
procSaveGroupPlanDetails1.pUserId ="sample data1";
procSaveGroupPlanDetails1.pPhotoIndicator ="sample data1";
procSaveGroupPlanDetails1.pClientDubaiWorkLocCode ="sample data1";
procSaveGroupPlanDetails1.pHaadPolicyHolderType ="sample data1";
procSaveGroupPlanDetails1.pQbokGblPlanInd ="sample data1";
procSaveGroupPlanDetails1.pQbokEffDate ="sample data1";
procSaveGroupPlanDetails1.pQbokTermDate ="sample data1";
procSaveGroupPlanDetails1.pUaeGblPlanInd ="sample data1";
procSaveGroupPlanDetails1.pUaeEffDate ="sample data1";
procSaveGroupPlanDetails1.pUaeTermDate ="sample data1";

var procSaveGroupPlanDetails2 = new ProcSaveGroupPlanDetails();
procSaveGroupPlanDetails2.pGroupId ="sample data2";
procSaveGroupPlanDetails2.pPartner ="sample data2";
procSaveGroupPlanDetails2.pNoteType ="sample data2";
procSaveGroupPlanDetails2.pHaadPrdCd ="sample data2";
procSaveGroupPlanDetails2.pDhaPrdCd ="sample data2";
procSaveGroupPlanDetails2.pOtherUaePrdCd ="sample data2";
procSaveGroupPlanDetails2.pDubaiEntityId ="sample data2";
procSaveGroupPlanDetails2.pNetworkTierClassification ="sample data2";
procSaveGroupPlanDetails2.pNetworkEffectiveDate ="sample data2";
procSaveGroupPlanDetails2.pNetworkTermDate ="sample data2";
procSaveGroupPlanDetails2.pUserId ="sample data2";
procSaveGroupPlanDetails2.pPhotoIndicator ="sample data2";
procSaveGroupPlanDetails2.pClientDubaiWorkLocCode ="sample data2";
procSaveGroupPlanDetails2.pHaadPolicyHolderType ="sample data2";
procSaveGroupPlanDetails2.pQbokGblPlanInd ="sample data2";
procSaveGroupPlanDetails2.pQbokEffDate ="sample data2";
procSaveGroupPlanDetails2.pQbokTermDate ="sample data2";
procSaveGroupPlanDetails2.pUaeGblPlanInd ="sample data2";
procSaveGroupPlanDetails2.pUaeEffDate ="sample data2";
procSaveGroupPlanDetails2.pUaeTermDate ="sample data2";

var procSaveGroupPlanDetails3 = new ProcSaveGroupPlanDetails();
procSaveGroupPlanDetails3.pGroupId ="sample data3";
procSaveGroupPlanDetails3.pPartner ="sample data3";
procSaveGroupPlanDetails3.pNoteType ="sample data3";
procSaveGroupPlanDetails3.pHaadPrdCd ="sample data3";
procSaveGroupPlanDetails3.pDhaPrdCd ="sample data3";
procSaveGroupPlanDetails3.pOtherUaePrdCd ="sample data3";
procSaveGroupPlanDetails3.pDubaiEntityId ="sample data3";
procSaveGroupPlanDetails3.pNetworkTierClassification ="sample data3";
procSaveGroupPlanDetails3.pNetworkEffectiveDate ="sample data3";
procSaveGroupPlanDetails3.pNetworkTermDate ="sample data3";
procSaveGroupPlanDetails3.pUserId ="sample data3";
procSaveGroupPlanDetails3.pPhotoIndicator ="sample data3";
procSaveGroupPlanDetails3.pClientDubaiWorkLocCode ="sample data3";
procSaveGroupPlanDetails3.pHaadPolicyHolderType ="sample data3";
procSaveGroupPlanDetails3.pQbokGblPlanInd ="sample data3";
procSaveGroupPlanDetails3.pQbokEffDate ="sample data3";
procSaveGroupPlanDetails3.pQbokTermDate ="sample data3";
procSaveGroupPlanDetails3.pUaeGblPlanInd ="sample data3";
procSaveGroupPlanDetails3.pUaeEffDate ="sample data3";
procSaveGroupPlanDetails3.pUaeTermDate ="sample data3";


export const ProcSaveGroupPlanDetail: ProcSaveGroupPlanDetails[] = [
    procSaveGroupPlanDetails1,
    procSaveGroupPlanDetails2,
    procSaveGroupPlanDetails3,
];