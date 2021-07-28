/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetEffTermDt} from "../../api-models"

var getEffTermDt1 = new GetEffTermDt();
getEffTermDt1.pSeqMembId =123;
getEffTermDt1.pRiderCode ="sample data1";
getEffTermDt1.pSvcStartDt ="sample data1";
getEffTermDt1.oEffectDt ="sample data1";
getEffTermDt1.oTermDt ="sample data1";

var getEffTermDt2 = new GetEffTermDt();
getEffTermDt2.pSeqMembId =123;
getEffTermDt2.pRiderCode ="sample data2";
getEffTermDt2.pSvcStartDt ="sample data2";
getEffTermDt2.oEffectDt ="sample data2";
getEffTermDt2.oTermDt ="sample data2";

var getEffTermDt3 = new GetEffTermDt();
getEffTermDt3.pSeqMembId =123;
getEffTermDt3.pRiderCode ="sample data3";
getEffTermDt3.pSvcStartDt ="sample data3";
getEffTermDt3.oEffectDt ="sample data3";
getEffTermDt3.oTermDt ="sample data3";


export const GetEffTermDts: GetEffTermDt[] = [
    getEffTermDt1,
    getEffTermDt2,
    getEffTermDt3,
];