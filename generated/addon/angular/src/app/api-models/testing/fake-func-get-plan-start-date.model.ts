/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetPlanStartDate} from "../../api-models"

var funcGetPlanStartDate1 = new FuncGetPlanStartDate();
funcGetPlanStartDate1.pSeqGroupId =123;
funcGetPlanStartDate1.pSvcStartDt ="sample data1";

var funcGetPlanStartDate2 = new FuncGetPlanStartDate();
funcGetPlanStartDate2.pSeqGroupId =123;
funcGetPlanStartDate2.pSvcStartDt ="sample data2";

var funcGetPlanStartDate3 = new FuncGetPlanStartDate();
funcGetPlanStartDate3.pSeqGroupId =123;
funcGetPlanStartDate3.pSvcStartDt ="sample data3";


export const FuncGetPlanStartDates: FuncGetPlanStartDate[] = [
    funcGetPlanStartDate1,
    funcGetPlanStartDate2,
    funcGetPlanStartDate3,
];