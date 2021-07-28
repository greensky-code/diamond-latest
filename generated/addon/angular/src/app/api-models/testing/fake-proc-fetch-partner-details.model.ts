/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcFetchPartnerDetails} from "../../api-models"

var procFetchPartnerDetails1 = new ProcFetchPartnerDetails();
procFetchPartnerDetails1.pGroupId ="sample data1";
procFetchPartnerDetails1.poPartnerInd ="sample data1";
procFetchPartnerDetails1.poNewPlanInd ="sample data1";
procFetchPartnerDetails1.poCompanyCode ="sample data1";
procFetchPartnerDetails1.poEffectiveDate ="sample data1";
procFetchPartnerDetails1.poRetcode =123;
procFetchPartnerDetails1.poRetmsg ="sample data1";

var procFetchPartnerDetails2 = new ProcFetchPartnerDetails();
procFetchPartnerDetails2.pGroupId ="sample data2";
procFetchPartnerDetails2.poPartnerInd ="sample data2";
procFetchPartnerDetails2.poNewPlanInd ="sample data2";
procFetchPartnerDetails2.poCompanyCode ="sample data2";
procFetchPartnerDetails2.poEffectiveDate ="sample data2";
procFetchPartnerDetails2.poRetcode =123;
procFetchPartnerDetails2.poRetmsg ="sample data2";

var procFetchPartnerDetails3 = new ProcFetchPartnerDetails();
procFetchPartnerDetails3.pGroupId ="sample data3";
procFetchPartnerDetails3.poPartnerInd ="sample data3";
procFetchPartnerDetails3.poNewPlanInd ="sample data3";
procFetchPartnerDetails3.poCompanyCode ="sample data3";
procFetchPartnerDetails3.poEffectiveDate ="sample data3";
procFetchPartnerDetails3.poRetcode =123;
procFetchPartnerDetails3.poRetmsg ="sample data3";


export const ProcFetchPartnerDetail: ProcFetchPartnerDetails[] = [
    procFetchPartnerDetails1,
    procFetchPartnerDetails2,
    procFetchPartnerDetails3,
];