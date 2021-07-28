/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UpdateProvinceDetails} from "../../api-models"

var updateProvinceDetails1 = new UpdateProvinceDetails();
updateProvinceDetails1.pSeqTaxScheduleId =123;
updateProvinceDetails1.pTaxRegion ="sample data1";
updateProvinceDetails1.pTaxType ="sample data1";
updateProvinceDetails1.pTaxProduct ="sample data1";
updateProvinceDetails1.pTaxPercent =123;
updateProvinceDetails1.pFundType ="sample data1";
updateProvinceDetails1.pEffDate ="sample data1";
updateProvinceDetails1.pTermDate ="sample data1";
updateProvinceDetails1.pProvinceEffDate ="sample data1";
updateProvinceDetails1.pTermReasonCode ="sample data1";
updateProvinceDetails1.pApplyRetro ="sample data1";
updateProvinceDetails1.pUser ="sample data1";
updateProvinceDetails1.pReturnMsg ="sample data1";

var updateProvinceDetails2 = new UpdateProvinceDetails();
updateProvinceDetails2.pSeqTaxScheduleId =123;
updateProvinceDetails2.pTaxRegion ="sample data2";
updateProvinceDetails2.pTaxType ="sample data2";
updateProvinceDetails2.pTaxProduct ="sample data2";
updateProvinceDetails2.pTaxPercent =123;
updateProvinceDetails2.pFundType ="sample data2";
updateProvinceDetails2.pEffDate ="sample data2";
updateProvinceDetails2.pTermDate ="sample data2";
updateProvinceDetails2.pProvinceEffDate ="sample data2";
updateProvinceDetails2.pTermReasonCode ="sample data2";
updateProvinceDetails2.pApplyRetro ="sample data2";
updateProvinceDetails2.pUser ="sample data2";
updateProvinceDetails2.pReturnMsg ="sample data2";

var updateProvinceDetails3 = new UpdateProvinceDetails();
updateProvinceDetails3.pSeqTaxScheduleId =123;
updateProvinceDetails3.pTaxRegion ="sample data3";
updateProvinceDetails3.pTaxType ="sample data3";
updateProvinceDetails3.pTaxProduct ="sample data3";
updateProvinceDetails3.pTaxPercent =123;
updateProvinceDetails3.pFundType ="sample data3";
updateProvinceDetails3.pEffDate ="sample data3";
updateProvinceDetails3.pTermDate ="sample data3";
updateProvinceDetails3.pProvinceEffDate ="sample data3";
updateProvinceDetails3.pTermReasonCode ="sample data3";
updateProvinceDetails3.pApplyRetro ="sample data3";
updateProvinceDetails3.pUser ="sample data3";
updateProvinceDetails3.pReturnMsg ="sample data3";


export const UpdateProvinceDetail: UpdateProvinceDetails[] = [
    updateProvinceDetails1,
    updateProvinceDetails2,
    updateProvinceDetails3,
];