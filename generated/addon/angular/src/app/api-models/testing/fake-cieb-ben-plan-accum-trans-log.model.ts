/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebBenPlanAccumTransLog} from "../../api-models"

var ciebBenPlanAccumTransLog1 = new CiebBenPlanAccumTransLog();
ciebBenPlanAccumTransLog1.seqPlanTransId =123;
ciebBenPlanAccumTransLog1.svcRefId ="sample data1";
ciebBenPlanAccumTransLog1.reqGroupNumber ="sample data1";
ciebBenPlanAccumTransLog1.reqBenOptCode ="sample data1";
ciebBenPlanAccumTransLog1.reqClmSrcSysCode ="sample data1";
ciebBenPlanAccumTransLog1.reqAsOfDate ="sample data1";
ciebBenPlanAccumTransLog1.reqStateCode ="sample data1";
ciebBenPlanAccumTransLog1.invoOutcomCode ="sample data1";
ciebBenPlanAccumTransLog1.insertDatetime =new Date('2010-01-01');
ciebBenPlanAccumTransLog1.insertUser ="sample data1";
ciebBenPlanAccumTransLog1.insertProcess ="sample data1";
ciebBenPlanAccumTransLog1.updateDatetime =new Date('2010-01-01');
ciebBenPlanAccumTransLog1.updateUser ="sample data1";
ciebBenPlanAccumTransLog1.updateProcess ="sample data1";

var ciebBenPlanAccumTransLog2 = new CiebBenPlanAccumTransLog();
ciebBenPlanAccumTransLog2.seqPlanTransId =123;
ciebBenPlanAccumTransLog2.svcRefId ="sample data2";
ciebBenPlanAccumTransLog2.reqGroupNumber ="sample data2";
ciebBenPlanAccumTransLog2.reqBenOptCode ="sample data2";
ciebBenPlanAccumTransLog2.reqClmSrcSysCode ="sample data2";
ciebBenPlanAccumTransLog2.reqAsOfDate ="sample data2";
ciebBenPlanAccumTransLog2.reqStateCode ="sample data2";
ciebBenPlanAccumTransLog2.invoOutcomCode ="sample data2";
ciebBenPlanAccumTransLog2.insertDatetime =new Date('2010-01-01');
ciebBenPlanAccumTransLog2.insertUser ="sample data2";
ciebBenPlanAccumTransLog2.insertProcess ="sample data2";
ciebBenPlanAccumTransLog2.updateDatetime =new Date('2010-01-01');
ciebBenPlanAccumTransLog2.updateUser ="sample data2";
ciebBenPlanAccumTransLog2.updateProcess ="sample data2";

var ciebBenPlanAccumTransLog3 = new CiebBenPlanAccumTransLog();
ciebBenPlanAccumTransLog3.seqPlanTransId =123;
ciebBenPlanAccumTransLog3.svcRefId ="sample data3";
ciebBenPlanAccumTransLog3.reqGroupNumber ="sample data3";
ciebBenPlanAccumTransLog3.reqBenOptCode ="sample data3";
ciebBenPlanAccumTransLog3.reqClmSrcSysCode ="sample data3";
ciebBenPlanAccumTransLog3.reqAsOfDate ="sample data3";
ciebBenPlanAccumTransLog3.reqStateCode ="sample data3";
ciebBenPlanAccumTransLog3.invoOutcomCode ="sample data3";
ciebBenPlanAccumTransLog3.insertDatetime =new Date('2010-01-01');
ciebBenPlanAccumTransLog3.insertUser ="sample data3";
ciebBenPlanAccumTransLog3.insertProcess ="sample data3";
ciebBenPlanAccumTransLog3.updateDatetime =new Date('2010-01-01');
ciebBenPlanAccumTransLog3.updateUser ="sample data3";
ciebBenPlanAccumTransLog3.updateProcess ="sample data3";


export const CiebBenPlanAccumTransLogs: CiebBenPlanAccumTransLog[] = [
    ciebBenPlanAccumTransLog1,
    ciebBenPlanAccumTransLog2,
    ciebBenPlanAccumTransLog3,
];