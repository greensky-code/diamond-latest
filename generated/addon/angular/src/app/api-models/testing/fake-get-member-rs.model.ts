/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetMemberRs} from "../../api-models"

var getMemberRs1 = new GetMemberRs();
getMemberRs1.pSubscriberId ="sample data1";
getMemberRs1.pPersonNumber ="sample data1";
getMemberRs1.pFirstName ="sample data1";
getMemberRs1.pLastName ="sample data1";
getMemberRs1.pDob ="sample data1";
getMemberRs1.pGender ="sample data1";
getMemberRs1.pSvcStartDt ="sample data1";

var getMemberRs2 = new GetMemberRs();
getMemberRs2.pSubscriberId ="sample data2";
getMemberRs2.pPersonNumber ="sample data2";
getMemberRs2.pFirstName ="sample data2";
getMemberRs2.pLastName ="sample data2";
getMemberRs2.pDob ="sample data2";
getMemberRs2.pGender ="sample data2";
getMemberRs2.pSvcStartDt ="sample data2";

var getMemberRs3 = new GetMemberRs();
getMemberRs3.pSubscriberId ="sample data3";
getMemberRs3.pPersonNumber ="sample data3";
getMemberRs3.pFirstName ="sample data3";
getMemberRs3.pLastName ="sample data3";
getMemberRs3.pDob ="sample data3";
getMemberRs3.pGender ="sample data3";
getMemberRs3.pSvcStartDt ="sample data3";


export const GetMemberR: GetMemberRs[] = [
    getMemberRs1,
    getMemberRs2,
    getMemberRs3,
];