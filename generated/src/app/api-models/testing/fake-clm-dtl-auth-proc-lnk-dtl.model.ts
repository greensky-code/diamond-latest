/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClmDtlAuthProcLnkDtl} from "../../api-models"

var clmDtlAuthProcLnkDtl1 = new ClmDtlAuthProcLnkDtl();
clmDtlAuthProcLnkDtl1.seqCdaplDtl =123;
clmDtlAuthProcLnkDtl1.seqCdaplHdr =123;
clmDtlAuthProcLnkDtl1.processingOrder =123;
clmDtlAuthProcLnkDtl1.ruleId ="sample data1";
clmDtlAuthProcLnkDtl1.payAction =123;
clmDtlAuthProcLnkDtl1.authProcRangeId ="sample data1";
clmDtlAuthProcLnkDtl1.includeAllRanges ="sample data1";
clmDtlAuthProcLnkDtl1.allowedReason ="sample data1";
clmDtlAuthProcLnkDtl1.hldDenyReason ="sample data1";
clmDtlAuthProcLnkDtl1.effectiveDate =new Date('2010-01-01');
clmDtlAuthProcLnkDtl1.termDate =new Date('2010-01-01');
clmDtlAuthProcLnkDtl1.securityCode ="sample data1";
clmDtlAuthProcLnkDtl1.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkDtl1.insertUser ="sample data1";
clmDtlAuthProcLnkDtl1.insertProcess ="sample data1";
clmDtlAuthProcLnkDtl1.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkDtl1.updateUser ="sample data1";
clmDtlAuthProcLnkDtl1.updateProcess ="sample data1";

var clmDtlAuthProcLnkDtl2 = new ClmDtlAuthProcLnkDtl();
clmDtlAuthProcLnkDtl2.seqCdaplDtl =123;
clmDtlAuthProcLnkDtl2.seqCdaplHdr =123;
clmDtlAuthProcLnkDtl2.processingOrder =123;
clmDtlAuthProcLnkDtl2.ruleId ="sample data2";
clmDtlAuthProcLnkDtl2.payAction =123;
clmDtlAuthProcLnkDtl2.authProcRangeId ="sample data2";
clmDtlAuthProcLnkDtl2.includeAllRanges ="sample data2";
clmDtlAuthProcLnkDtl2.allowedReason ="sample data2";
clmDtlAuthProcLnkDtl2.hldDenyReason ="sample data2";
clmDtlAuthProcLnkDtl2.effectiveDate =new Date('2010-01-01');
clmDtlAuthProcLnkDtl2.termDate =new Date('2010-01-01');
clmDtlAuthProcLnkDtl2.securityCode ="sample data2";
clmDtlAuthProcLnkDtl2.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkDtl2.insertUser ="sample data2";
clmDtlAuthProcLnkDtl2.insertProcess ="sample data2";
clmDtlAuthProcLnkDtl2.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkDtl2.updateUser ="sample data2";
clmDtlAuthProcLnkDtl2.updateProcess ="sample data2";

var clmDtlAuthProcLnkDtl3 = new ClmDtlAuthProcLnkDtl();
clmDtlAuthProcLnkDtl3.seqCdaplDtl =123;
clmDtlAuthProcLnkDtl3.seqCdaplHdr =123;
clmDtlAuthProcLnkDtl3.processingOrder =123;
clmDtlAuthProcLnkDtl3.ruleId ="sample data3";
clmDtlAuthProcLnkDtl3.payAction =123;
clmDtlAuthProcLnkDtl3.authProcRangeId ="sample data3";
clmDtlAuthProcLnkDtl3.includeAllRanges ="sample data3";
clmDtlAuthProcLnkDtl3.allowedReason ="sample data3";
clmDtlAuthProcLnkDtl3.hldDenyReason ="sample data3";
clmDtlAuthProcLnkDtl3.effectiveDate =new Date('2010-01-01');
clmDtlAuthProcLnkDtl3.termDate =new Date('2010-01-01');
clmDtlAuthProcLnkDtl3.securityCode ="sample data3";
clmDtlAuthProcLnkDtl3.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkDtl3.insertUser ="sample data3";
clmDtlAuthProcLnkDtl3.insertProcess ="sample data3";
clmDtlAuthProcLnkDtl3.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkDtl3.updateUser ="sample data3";
clmDtlAuthProcLnkDtl3.updateProcess ="sample data3";


export const ClmDtlAuthProcLnkDtls: ClmDtlAuthProcLnkDtl[] = [
    clmDtlAuthProcLnkDtl1,
    clmDtlAuthProcLnkDtl2,
    clmDtlAuthProcLnkDtl3,
];