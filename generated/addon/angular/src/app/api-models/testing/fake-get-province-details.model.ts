/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetProvinceDetails} from "../../api-models"

var getProvinceDetails1 = new GetProvinceDetails();
getProvinceDetails1.pTaxRegion ="sample data1";
getProvinceDetails1.pTaxType ="sample data1";
getProvinceDetails1.pTaxProduct ="sample data1";
getProvinceDetails1.pFundType ="sample data1";
getProvinceDetails1.pTaxPercent =123;
getProvinceDetails1.pEffDate ="sample data1";
getProvinceDetails1.pTermDate ="sample data1";
getProvinceDetails1.pProvinceEffDate ="sample data1";
getProvinceDetails1.pTermReasonCode ="sample data1";
getProvinceDetails1.pApplyRetro ="sample data1";

var getProvinceDetails2 = new GetProvinceDetails();
getProvinceDetails2.pTaxRegion ="sample data2";
getProvinceDetails2.pTaxType ="sample data2";
getProvinceDetails2.pTaxProduct ="sample data2";
getProvinceDetails2.pFundType ="sample data2";
getProvinceDetails2.pTaxPercent =123;
getProvinceDetails2.pEffDate ="sample data2";
getProvinceDetails2.pTermDate ="sample data2";
getProvinceDetails2.pProvinceEffDate ="sample data2";
getProvinceDetails2.pTermReasonCode ="sample data2";
getProvinceDetails2.pApplyRetro ="sample data2";

var getProvinceDetails3 = new GetProvinceDetails();
getProvinceDetails3.pTaxRegion ="sample data3";
getProvinceDetails3.pTaxType ="sample data3";
getProvinceDetails3.pTaxProduct ="sample data3";
getProvinceDetails3.pFundType ="sample data3";
getProvinceDetails3.pTaxPercent =123;
getProvinceDetails3.pEffDate ="sample data3";
getProvinceDetails3.pTermDate ="sample data3";
getProvinceDetails3.pProvinceEffDate ="sample data3";
getProvinceDetails3.pTermReasonCode ="sample data3";
getProvinceDetails3.pApplyRetro ="sample data3";


export const GetProvinceDetail: GetProvinceDetails[] = [
    getProvinceDetails1,
    getProvinceDetails2,
    getProvinceDetails3,
];