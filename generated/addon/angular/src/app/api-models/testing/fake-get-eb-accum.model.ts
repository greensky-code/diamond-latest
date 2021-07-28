/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetEbAccum} from "../../api-models"

var getEbAccum1 = new GetEbAccum();
getEbAccum1.pSeqMembId =123;
getEbAccum1.pSeqSubsId =123;
getEbAccum1.pCoverage ="sample data1";
getEbAccum1.pBenpkId ="sample data1";
getEbAccum1.pRuleType ="sample data1";
getEbAccum1.pRuleId ="sample data1";
getEbAccum1.pLimitType ="sample data1";
getEbAccum1.pPlanStartDt ="sample data1";
getEbAccum1.pPlanEndDt ="sample data1";
getEbAccum1.pAgg ="sample data1";

var getEbAccum2 = new GetEbAccum();
getEbAccum2.pSeqMembId =123;
getEbAccum2.pSeqSubsId =123;
getEbAccum2.pCoverage ="sample data2";
getEbAccum2.pBenpkId ="sample data2";
getEbAccum2.pRuleType ="sample data2";
getEbAccum2.pRuleId ="sample data2";
getEbAccum2.pLimitType ="sample data2";
getEbAccum2.pPlanStartDt ="sample data2";
getEbAccum2.pPlanEndDt ="sample data2";
getEbAccum2.pAgg ="sample data2";

var getEbAccum3 = new GetEbAccum();
getEbAccum3.pSeqMembId =123;
getEbAccum3.pSeqSubsId =123;
getEbAccum3.pCoverage ="sample data3";
getEbAccum3.pBenpkId ="sample data3";
getEbAccum3.pRuleType ="sample data3";
getEbAccum3.pRuleId ="sample data3";
getEbAccum3.pLimitType ="sample data3";
getEbAccum3.pPlanStartDt ="sample data3";
getEbAccum3.pPlanEndDt ="sample data3";
getEbAccum3.pAgg ="sample data3";


export const GetEbAccums: GetEbAccum[] = [
    getEbAccum1,
    getEbAccum2,
    getEbAccum3,
];