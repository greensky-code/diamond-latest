/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebTransAccumIdent} from "../../api-models"

var ciebTransAccumIdent1 = new CiebTransAccumIdent();
ciebTransAccumIdent1.seqAccumId =123;
ciebTransAccumIdent1.seqTransId =123;
ciebTransAccumIdent1.accumIdName ="sample data1";
ciebTransAccumIdent1.accumAdjType ="sample data1";
ciebTransAccumIdent1.systemType ="sample data1";
ciebTransAccumIdent1.trgtAccumAdjType ="sample data1";
ciebTransAccumIdent1.sysName ="sample data1";
ciebTransAccumIdent1.sysInitAdjName ="sample data1";
ciebTransAccumIdent1.sysAdjAmt =123;
ciebTransAccumIdent1.sysInitBalName ="sample data1";
ciebTransAccumIdent1.sysCombinedBalAmt =123;
ciebTransAccumIdent1.sysPristineBalAmt =123;
ciebTransAccumIdent1.sysAccumPeriodDt ="sample data1";
ciebTransAccumIdent1.insertDatetime =new Date('2010-01-01');
ciebTransAccumIdent1.insertUser ="sample data1";
ciebTransAccumIdent1.insertProcess ="sample data1";
ciebTransAccumIdent1.updateDatetime =new Date('2010-01-01');
ciebTransAccumIdent1.updateUser ="sample data1";
ciebTransAccumIdent1.updateProcess ="sample data1";
ciebTransAccumIdent1.errorCd ="sample data1";

var ciebTransAccumIdent2 = new CiebTransAccumIdent();
ciebTransAccumIdent2.seqAccumId =123;
ciebTransAccumIdent2.seqTransId =123;
ciebTransAccumIdent2.accumIdName ="sample data2";
ciebTransAccumIdent2.accumAdjType ="sample data2";
ciebTransAccumIdent2.systemType ="sample data2";
ciebTransAccumIdent2.trgtAccumAdjType ="sample data2";
ciebTransAccumIdent2.sysName ="sample data2";
ciebTransAccumIdent2.sysInitAdjName ="sample data2";
ciebTransAccumIdent2.sysAdjAmt =123;
ciebTransAccumIdent2.sysInitBalName ="sample data2";
ciebTransAccumIdent2.sysCombinedBalAmt =123;
ciebTransAccumIdent2.sysPristineBalAmt =123;
ciebTransAccumIdent2.sysAccumPeriodDt ="sample data2";
ciebTransAccumIdent2.insertDatetime =new Date('2010-01-01');
ciebTransAccumIdent2.insertUser ="sample data2";
ciebTransAccumIdent2.insertProcess ="sample data2";
ciebTransAccumIdent2.updateDatetime =new Date('2010-01-01');
ciebTransAccumIdent2.updateUser ="sample data2";
ciebTransAccumIdent2.updateProcess ="sample data2";
ciebTransAccumIdent2.errorCd ="sample data2";

var ciebTransAccumIdent3 = new CiebTransAccumIdent();
ciebTransAccumIdent3.seqAccumId =123;
ciebTransAccumIdent3.seqTransId =123;
ciebTransAccumIdent3.accumIdName ="sample data3";
ciebTransAccumIdent3.accumAdjType ="sample data3";
ciebTransAccumIdent3.systemType ="sample data3";
ciebTransAccumIdent3.trgtAccumAdjType ="sample data3";
ciebTransAccumIdent3.sysName ="sample data3";
ciebTransAccumIdent3.sysInitAdjName ="sample data3";
ciebTransAccumIdent3.sysAdjAmt =123;
ciebTransAccumIdent3.sysInitBalName ="sample data3";
ciebTransAccumIdent3.sysCombinedBalAmt =123;
ciebTransAccumIdent3.sysPristineBalAmt =123;
ciebTransAccumIdent3.sysAccumPeriodDt ="sample data3";
ciebTransAccumIdent3.insertDatetime =new Date('2010-01-01');
ciebTransAccumIdent3.insertUser ="sample data3";
ciebTransAccumIdent3.insertProcess ="sample data3";
ciebTransAccumIdent3.updateDatetime =new Date('2010-01-01');
ciebTransAccumIdent3.updateUser ="sample data3";
ciebTransAccumIdent3.updateProcess ="sample data3";
ciebTransAccumIdent3.errorCd ="sample data3";


export const CiebTransAccumIdents: CiebTransAccumIdent[] = [
    ciebTransAccumIdent1,
    ciebTransAccumIdent2,
    ciebTransAccumIdent3,
];