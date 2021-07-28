/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetCoverStatus} from "../../api-models"

var getCoverStatus1 = new GetCoverStatus();
getCoverStatus1.pSeqMembId =123;
getCoverStatus1.pRiderCode ="sample data1";
getCoverStatus1.pSvcStartDt ="sample data1";

var getCoverStatus2 = new GetCoverStatus();
getCoverStatus2.pSeqMembId =123;
getCoverStatus2.pRiderCode ="sample data2";
getCoverStatus2.pSvcStartDt ="sample data2";

var getCoverStatus3 = new GetCoverStatus();
getCoverStatus3.pSeqMembId =123;
getCoverStatus3.pRiderCode ="sample data3";
getCoverStatus3.pSvcStartDt ="sample data3";


export const GetCoverStatu: GetCoverStatus[] = [
    getCoverStatus1,
    getCoverStatus2,
    getCoverStatus3,
];