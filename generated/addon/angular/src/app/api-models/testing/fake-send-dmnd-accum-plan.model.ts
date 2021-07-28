/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SendDmndAccumPlan} from "../../api-models"

var sendDmndAccumPlan1 = new SendDmndAccumPlan();
sendDmndAccumPlan1.pReqGroupNumber ="sample data1";
sendDmndAccumPlan1.pReqBenOptCode ="sample data1";
sendDmndAccumPlan1.pReqSrcSysCode ="sample data1";
sendDmndAccumPlan1.pReqAsOfDate ="sample data1";
sendDmndAccumPlan1.pReqStateCode ="sample data1";
sendDmndAccumPlan1.oOutcomeCode ="sample data1";

var sendDmndAccumPlan2 = new SendDmndAccumPlan();
sendDmndAccumPlan2.pReqGroupNumber ="sample data2";
sendDmndAccumPlan2.pReqBenOptCode ="sample data2";
sendDmndAccumPlan2.pReqSrcSysCode ="sample data2";
sendDmndAccumPlan2.pReqAsOfDate ="sample data2";
sendDmndAccumPlan2.pReqStateCode ="sample data2";
sendDmndAccumPlan2.oOutcomeCode ="sample data2";

var sendDmndAccumPlan3 = new SendDmndAccumPlan();
sendDmndAccumPlan3.pReqGroupNumber ="sample data3";
sendDmndAccumPlan3.pReqBenOptCode ="sample data3";
sendDmndAccumPlan3.pReqSrcSysCode ="sample data3";
sendDmndAccumPlan3.pReqAsOfDate ="sample data3";
sendDmndAccumPlan3.pReqStateCode ="sample data3";
sendDmndAccumPlan3.oOutcomeCode ="sample data3";


export const SendDmndAccumPlans: SendDmndAccumPlan[] = [
    sendDmndAccumPlan1,
    sendDmndAccumPlan2,
    sendDmndAccumPlan3,
];