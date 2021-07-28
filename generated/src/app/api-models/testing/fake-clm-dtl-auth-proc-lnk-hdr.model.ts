/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClmDtlAuthProcLnkHdr} from "../../api-models"

var clmDtlAuthProcLnkHdr1 = new ClmDtlAuthProcLnkHdr();
clmDtlAuthProcLnkHdr1.seqCdaplHdr =123;
clmDtlAuthProcLnkHdr1.lineOfBusiness ="sample data1";
clmDtlAuthProcLnkHdr1.authType ="sample data1";
clmDtlAuthProcLnkHdr1.effectiveDate =new Date('2010-01-01');
clmDtlAuthProcLnkHdr1.termDate =new Date('2010-01-01');
clmDtlAuthProcLnkHdr1.description ="sample data1";
clmDtlAuthProcLnkHdr1.tieBrkOnPrice ="sample data1";
clmDtlAuthProcLnkHdr1.tieBrkOnProc ="sample data1";
clmDtlAuthProcLnkHdr1.mtchOnDtlForInp ="sample data1";
clmDtlAuthProcLnkHdr1.exceedDaysAction ="sample data1";
clmDtlAuthProcLnkHdr1.exceedDaysReason ="sample data1";
clmDtlAuthProcLnkHdr1.modifierUsedAction ="sample data1";
clmDtlAuthProcLnkHdr1.modifierUsedReason ="sample data1";
clmDtlAuthProcLnkHdr1.securityCode ="sample data1";
clmDtlAuthProcLnkHdr1.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkHdr1.insertUser ="sample data1";
clmDtlAuthProcLnkHdr1.insertProcess ="sample data1";
clmDtlAuthProcLnkHdr1.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkHdr1.updateUser ="sample data1";
clmDtlAuthProcLnkHdr1.updateProcess ="sample data1";
clmDtlAuthProcLnkHdr1.exceedAmtAction ="sample data1";
clmDtlAuthProcLnkHdr1.exceedAmtReason ="sample data1";

var clmDtlAuthProcLnkHdr2 = new ClmDtlAuthProcLnkHdr();
clmDtlAuthProcLnkHdr2.seqCdaplHdr =123;
clmDtlAuthProcLnkHdr2.lineOfBusiness ="sample data2";
clmDtlAuthProcLnkHdr2.authType ="sample data2";
clmDtlAuthProcLnkHdr2.effectiveDate =new Date('2010-01-01');
clmDtlAuthProcLnkHdr2.termDate =new Date('2010-01-01');
clmDtlAuthProcLnkHdr2.description ="sample data2";
clmDtlAuthProcLnkHdr2.tieBrkOnPrice ="sample data2";
clmDtlAuthProcLnkHdr2.tieBrkOnProc ="sample data2";
clmDtlAuthProcLnkHdr2.mtchOnDtlForInp ="sample data2";
clmDtlAuthProcLnkHdr2.exceedDaysAction ="sample data2";
clmDtlAuthProcLnkHdr2.exceedDaysReason ="sample data2";
clmDtlAuthProcLnkHdr2.modifierUsedAction ="sample data2";
clmDtlAuthProcLnkHdr2.modifierUsedReason ="sample data2";
clmDtlAuthProcLnkHdr2.securityCode ="sample data2";
clmDtlAuthProcLnkHdr2.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkHdr2.insertUser ="sample data2";
clmDtlAuthProcLnkHdr2.insertProcess ="sample data2";
clmDtlAuthProcLnkHdr2.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkHdr2.updateUser ="sample data2";
clmDtlAuthProcLnkHdr2.updateProcess ="sample data2";
clmDtlAuthProcLnkHdr2.exceedAmtAction ="sample data2";
clmDtlAuthProcLnkHdr2.exceedAmtReason ="sample data2";

var clmDtlAuthProcLnkHdr3 = new ClmDtlAuthProcLnkHdr();
clmDtlAuthProcLnkHdr3.seqCdaplHdr =123;
clmDtlAuthProcLnkHdr3.lineOfBusiness ="sample data3";
clmDtlAuthProcLnkHdr3.authType ="sample data3";
clmDtlAuthProcLnkHdr3.effectiveDate =new Date('2010-01-01');
clmDtlAuthProcLnkHdr3.termDate =new Date('2010-01-01');
clmDtlAuthProcLnkHdr3.description ="sample data3";
clmDtlAuthProcLnkHdr3.tieBrkOnPrice ="sample data3";
clmDtlAuthProcLnkHdr3.tieBrkOnProc ="sample data3";
clmDtlAuthProcLnkHdr3.mtchOnDtlForInp ="sample data3";
clmDtlAuthProcLnkHdr3.exceedDaysAction ="sample data3";
clmDtlAuthProcLnkHdr3.exceedDaysReason ="sample data3";
clmDtlAuthProcLnkHdr3.modifierUsedAction ="sample data3";
clmDtlAuthProcLnkHdr3.modifierUsedReason ="sample data3";
clmDtlAuthProcLnkHdr3.securityCode ="sample data3";
clmDtlAuthProcLnkHdr3.insertDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkHdr3.insertUser ="sample data3";
clmDtlAuthProcLnkHdr3.insertProcess ="sample data3";
clmDtlAuthProcLnkHdr3.updateDatetime =new Date('2010-01-01');
clmDtlAuthProcLnkHdr3.updateUser ="sample data3";
clmDtlAuthProcLnkHdr3.updateProcess ="sample data3";
clmDtlAuthProcLnkHdr3.exceedAmtAction ="sample data3";
clmDtlAuthProcLnkHdr3.exceedAmtReason ="sample data3";


export const ClmDtlAuthProcLnkHdrs: ClmDtlAuthProcLnkHdr[] = [
    clmDtlAuthProcLnkHdr1,
    clmDtlAuthProcLnkHdr2,
    clmDtlAuthProcLnkHdr3,
];