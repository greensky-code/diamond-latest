/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetMemberEligRs} from "../../api-models"

var getMemberEligRs1 = new GetMemberEligRs();
getMemberEligRs1.pSeqMembId =123;
getMemberEligRs1.pSeqGroupId =123;
getMemberEligRs1.pPlanCode ="sample data1";
getMemberEligRs1.pSvcStartDt ="sample data1";
getMemberEligRs1.pReqStcInforList ="sample data1";

var getMemberEligRs2 = new GetMemberEligRs();
getMemberEligRs2.pSeqMembId =123;
getMemberEligRs2.pSeqGroupId =123;
getMemberEligRs2.pPlanCode ="sample data2";
getMemberEligRs2.pSvcStartDt ="sample data2";
getMemberEligRs2.pReqStcInforList ="sample data2";

var getMemberEligRs3 = new GetMemberEligRs();
getMemberEligRs3.pSeqMembId =123;
getMemberEligRs3.pSeqGroupId =123;
getMemberEligRs3.pPlanCode ="sample data3";
getMemberEligRs3.pSvcStartDt ="sample data3";
getMemberEligRs3.pReqStcInforList ="sample data3";


export const GetMemberEligR: GetMemberEligRs[] = [
    getMemberEligRs1,
    getMemberEligRs2,
    getMemberEligRs3,
];