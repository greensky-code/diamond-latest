/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebStcMapping} from "../../api-models"

var ciebStcMapping1 = new CiebStcMapping();
ciebStcMapping1.seqStcId =123;
ciebStcMapping1.svcTypeCode ="sample data1";
ciebStcMapping1.stcCovgType ="sample data1";
ciebStcMapping1.detailStc ="sample data1";
ciebStcMapping1.ruleGroupId =123;
ciebStcMapping1.ruleLevel =123;
ciebStcMapping1.medDefCode ="sample data1";
ciebStcMapping1.medDefDet ="sample data1";
ciebStcMapping1.medDefOrder ="sample data1";
ciebStcMapping1.shortRow ="sample data1";
ciebStcMapping1.ebQtyQual ="sample data1";
ciebStcMapping1.ebQty ="sample data1";
ciebStcMapping1.benPosCode ="sample data1";
ciebStcMapping1.msgText ="sample data1";
ciebStcMapping1.insertDatetime =new Date('2010-01-01');
ciebStcMapping1.insertUser ="sample data1";
ciebStcMapping1.insertProcess ="sample data1";
ciebStcMapping1.updateDatetime =new Date('2010-01-01');
ciebStcMapping1.updateUser ="sample data1";
ciebStcMapping1.updateProcess ="sample data1";
ciebStcMapping1.ppacaMsgInd ="sample data1";

var ciebStcMapping2 = new CiebStcMapping();
ciebStcMapping2.seqStcId =123;
ciebStcMapping2.svcTypeCode ="sample data2";
ciebStcMapping2.stcCovgType ="sample data2";
ciebStcMapping2.detailStc ="sample data2";
ciebStcMapping2.ruleGroupId =123;
ciebStcMapping2.ruleLevel =123;
ciebStcMapping2.medDefCode ="sample data2";
ciebStcMapping2.medDefDet ="sample data2";
ciebStcMapping2.medDefOrder ="sample data2";
ciebStcMapping2.shortRow ="sample data2";
ciebStcMapping2.ebQtyQual ="sample data2";
ciebStcMapping2.ebQty ="sample data2";
ciebStcMapping2.benPosCode ="sample data2";
ciebStcMapping2.msgText ="sample data2";
ciebStcMapping2.insertDatetime =new Date('2010-01-01');
ciebStcMapping2.insertUser ="sample data2";
ciebStcMapping2.insertProcess ="sample data2";
ciebStcMapping2.updateDatetime =new Date('2010-01-01');
ciebStcMapping2.updateUser ="sample data2";
ciebStcMapping2.updateProcess ="sample data2";
ciebStcMapping2.ppacaMsgInd ="sample data2";

var ciebStcMapping3 = new CiebStcMapping();
ciebStcMapping3.seqStcId =123;
ciebStcMapping3.svcTypeCode ="sample data3";
ciebStcMapping3.stcCovgType ="sample data3";
ciebStcMapping3.detailStc ="sample data3";
ciebStcMapping3.ruleGroupId =123;
ciebStcMapping3.ruleLevel =123;
ciebStcMapping3.medDefCode ="sample data3";
ciebStcMapping3.medDefDet ="sample data3";
ciebStcMapping3.medDefOrder ="sample data3";
ciebStcMapping3.shortRow ="sample data3";
ciebStcMapping3.ebQtyQual ="sample data3";
ciebStcMapping3.ebQty ="sample data3";
ciebStcMapping3.benPosCode ="sample data3";
ciebStcMapping3.msgText ="sample data3";
ciebStcMapping3.insertDatetime =new Date('2010-01-01');
ciebStcMapping3.insertUser ="sample data3";
ciebStcMapping3.insertProcess ="sample data3";
ciebStcMapping3.updateDatetime =new Date('2010-01-01');
ciebStcMapping3.updateUser ="sample data3";
ciebStcMapping3.updateProcess ="sample data3";
ciebStcMapping3.ppacaMsgInd ="sample data3";


export const CiebStcMappings: CiebStcMapping[] = [
    ciebStcMapping1,
    ciebStcMapping2,
    ciebStcMapping3,
];