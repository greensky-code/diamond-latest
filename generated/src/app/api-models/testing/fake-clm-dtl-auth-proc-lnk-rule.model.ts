/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClmDtlAuthProcLnkRule} from "../../api-models"

var clmDtlAuthProcLnkRule1 = new ClmDtlAuthProcLnkRule();
clmDtlAuthProcLnkRule1.ruleId ="sample data1";
clmDtlAuthProcLnkRule1.description ="sample data1";
clmDtlAuthProcLnkRule1.submtVsAuthProcCode ="sample data1";
clmDtlAuthProcLnkRule1.priceOnAuthProcCode ="sample data1";
clmDtlAuthProcLnkRule1.authProcCodeStatus ="sample data1";
clmDtlAuthProcLnkRule1.securityCode ="sample data1";
clmDtlAuthProcLnkRule1.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkRule1.insertUser ="sample data1";
clmDtlAuthProcLnkRule1.insertProcess ="sample data1";
clmDtlAuthProcLnkRule1.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkRule1.updateUser ="sample data1";
clmDtlAuthProcLnkRule1.updateProcess ="sample data1";

var clmDtlAuthProcLnkRule2 = new ClmDtlAuthProcLnkRule();
clmDtlAuthProcLnkRule2.ruleId ="sample data2";
clmDtlAuthProcLnkRule2.description ="sample data2";
clmDtlAuthProcLnkRule2.submtVsAuthProcCode ="sample data2";
clmDtlAuthProcLnkRule2.priceOnAuthProcCode ="sample data2";
clmDtlAuthProcLnkRule2.authProcCodeStatus ="sample data2";
clmDtlAuthProcLnkRule2.securityCode ="sample data2";
clmDtlAuthProcLnkRule2.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkRule2.insertUser ="sample data2";
clmDtlAuthProcLnkRule2.insertProcess ="sample data2";
clmDtlAuthProcLnkRule2.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkRule2.updateUser ="sample data2";
clmDtlAuthProcLnkRule2.updateProcess ="sample data2";

var clmDtlAuthProcLnkRule3 = new ClmDtlAuthProcLnkRule();
clmDtlAuthProcLnkRule3.ruleId ="sample data3";
clmDtlAuthProcLnkRule3.description ="sample data3";
clmDtlAuthProcLnkRule3.submtVsAuthProcCode ="sample data3";
clmDtlAuthProcLnkRule3.priceOnAuthProcCode ="sample data3";
clmDtlAuthProcLnkRule3.authProcCodeStatus ="sample data3";
clmDtlAuthProcLnkRule3.securityCode ="sample data3";
clmDtlAuthProcLnkRule3.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkRule3.insertUser ="sample data3";
clmDtlAuthProcLnkRule3.insertProcess ="sample data3";
clmDtlAuthProcLnkRule3.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkRule3.updateUser ="sample data3";
clmDtlAuthProcLnkRule3.updateProcess ="sample data3";


export const ClmDtlAuthProcLnkRules: ClmDtlAuthProcLnkRule[] = [
    clmDtlAuthProcLnkRule1,
    clmDtlAuthProcLnkRule2,
    clmDtlAuthProcLnkRule3,
];