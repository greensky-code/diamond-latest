/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebTransAccumOrigSysLimt} from "../../api-models"

var ciebTransAccumOrigSysLimt1 = new CiebTransAccumOrigSysLimt();
ciebTransAccumOrigSysLimt1.seqSysId =123;
ciebTransAccumOrigSysLimt1.seqTransId =123;
ciebTransAccumOrigSysLimt1.sysLimitName ="sample data1";
ciebTransAccumOrigSysLimt1.sysXLimVal ="sample data1";
ciebTransAccumOrigSysLimt1.sysAccumPeriodTy ="sample data1";
ciebTransAccumOrigSysLimt1.sysCarryoverType ="sample data1";
ciebTransAccumOrigSysLimt1.sysCarryoverValue =123;
ciebTransAccumOrigSysLimt1.cntrDollarInd ="sample data1";
ciebTransAccumOrigSysLimt1.insertDatetime =new Date('2010-01-01');
ciebTransAccumOrigSysLimt1.insertUser ="sample data1";
ciebTransAccumOrigSysLimt1.insertProcess ="sample data1";
ciebTransAccumOrigSysLimt1.updateDatetime =new Date('2010-01-01');
ciebTransAccumOrigSysLimt1.updateUser ="sample data1";
ciebTransAccumOrigSysLimt1.updateProcess ="sample data1";

var ciebTransAccumOrigSysLimt2 = new CiebTransAccumOrigSysLimt();
ciebTransAccumOrigSysLimt2.seqSysId =123;
ciebTransAccumOrigSysLimt2.seqTransId =123;
ciebTransAccumOrigSysLimt2.sysLimitName ="sample data2";
ciebTransAccumOrigSysLimt2.sysXLimVal ="sample data2";
ciebTransAccumOrigSysLimt2.sysAccumPeriodTy ="sample data2";
ciebTransAccumOrigSysLimt2.sysCarryoverType ="sample data2";
ciebTransAccumOrigSysLimt2.sysCarryoverValue =123;
ciebTransAccumOrigSysLimt2.cntrDollarInd ="sample data2";
ciebTransAccumOrigSysLimt2.insertDatetime =new Date('2010-01-01');
ciebTransAccumOrigSysLimt2.insertUser ="sample data2";
ciebTransAccumOrigSysLimt2.insertProcess ="sample data2";
ciebTransAccumOrigSysLimt2.updateDatetime =new Date('2010-01-01');
ciebTransAccumOrigSysLimt2.updateUser ="sample data2";
ciebTransAccumOrigSysLimt2.updateProcess ="sample data2";

var ciebTransAccumOrigSysLimt3 = new CiebTransAccumOrigSysLimt();
ciebTransAccumOrigSysLimt3.seqSysId =123;
ciebTransAccumOrigSysLimt3.seqTransId =123;
ciebTransAccumOrigSysLimt3.sysLimitName ="sample data3";
ciebTransAccumOrigSysLimt3.sysXLimVal ="sample data3";
ciebTransAccumOrigSysLimt3.sysAccumPeriodTy ="sample data3";
ciebTransAccumOrigSysLimt3.sysCarryoverType ="sample data3";
ciebTransAccumOrigSysLimt3.sysCarryoverValue =123;
ciebTransAccumOrigSysLimt3.cntrDollarInd ="sample data3";
ciebTransAccumOrigSysLimt3.insertDatetime =new Date('2010-01-01');
ciebTransAccumOrigSysLimt3.insertUser ="sample data3";
ciebTransAccumOrigSysLimt3.insertProcess ="sample data3";
ciebTransAccumOrigSysLimt3.updateDatetime =new Date('2010-01-01');
ciebTransAccumOrigSysLimt3.updateUser ="sample data3";
ciebTransAccumOrigSysLimt3.updateProcess ="sample data3";


export const CiebTransAccumOrigSysLimts: CiebTransAccumOrigSysLimt[] = [
    ciebTransAccumOrigSysLimt1,
    ciebTransAccumOrigSysLimt2,
    ciebTransAccumOrigSysLimt3,
];