/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetCompanyName} from "../../api-models"

var getCompanyName1 = new GetCompanyName();
getCompanyName1.pSeqGroupId =123;
getCompanyName1.pSvcStartDt ="sample data1";

var getCompanyName2 = new GetCompanyName();
getCompanyName2.pSeqGroupId =123;
getCompanyName2.pSvcStartDt ="sample data2";

var getCompanyName3 = new GetCompanyName();
getCompanyName3.pSeqGroupId =123;
getCompanyName3.pSvcStartDt ="sample data3";


export const GetCompanyNames: GetCompanyName[] = [
    getCompanyName1,
    getCompanyName2,
    getCompanyName3,
];