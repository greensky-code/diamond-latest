/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebGroupFilingDetail} from "../../api-models"

var ciebGroupFilingDetail1 = new CiebGroupFilingDetail();
ciebGroupFilingDetail1.seqGrpfilingId =123;
ciebGroupFilingDetail1.seqGroupId =123;
ciebGroupFilingDetail1.seqGrpParentId =123;
ciebGroupFilingDetail1.filingType ="sample data1";
ciebGroupFilingDetail1.situsState ="sample data1";
ciebGroupFilingDetail1.effectiveDate =new Date('2010-01-01');
ciebGroupFilingDetail1.termDate =new Date('2010-01-01');
ciebGroupFilingDetail1.changeReason ="sample data1";
ciebGroupFilingDetail1.applyToSubgroup ="sample data1";
ciebGroupFilingDetail1.insertDatetime =new Date('2010-01-01');
ciebGroupFilingDetail1.insertUser ="sample data1";
ciebGroupFilingDetail1.insertProcess ="sample data1";
ciebGroupFilingDetail1.updateDatetime =new Date('2010-01-01');
ciebGroupFilingDetail1.updateUser ="sample data1";
ciebGroupFilingDetail1.updateProcess ="sample data1";

var ciebGroupFilingDetail2 = new CiebGroupFilingDetail();
ciebGroupFilingDetail2.seqGrpfilingId =123;
ciebGroupFilingDetail2.seqGroupId =123;
ciebGroupFilingDetail2.seqGrpParentId =123;
ciebGroupFilingDetail2.filingType ="sample data2";
ciebGroupFilingDetail2.situsState ="sample data2";
ciebGroupFilingDetail2.effectiveDate =new Date('2010-01-01');
ciebGroupFilingDetail2.termDate =new Date('2010-01-01');
ciebGroupFilingDetail2.changeReason ="sample data2";
ciebGroupFilingDetail2.applyToSubgroup ="sample data2";
ciebGroupFilingDetail2.insertDatetime =new Date('2010-01-01');
ciebGroupFilingDetail2.insertUser ="sample data2";
ciebGroupFilingDetail2.insertProcess ="sample data2";
ciebGroupFilingDetail2.updateDatetime =new Date('2010-01-01');
ciebGroupFilingDetail2.updateUser ="sample data2";
ciebGroupFilingDetail2.updateProcess ="sample data2";

var ciebGroupFilingDetail3 = new CiebGroupFilingDetail();
ciebGroupFilingDetail3.seqGrpfilingId =123;
ciebGroupFilingDetail3.seqGroupId =123;
ciebGroupFilingDetail3.seqGrpParentId =123;
ciebGroupFilingDetail3.filingType ="sample data3";
ciebGroupFilingDetail3.situsState ="sample data3";
ciebGroupFilingDetail3.effectiveDate =new Date('2010-01-01');
ciebGroupFilingDetail3.termDate =new Date('2010-01-01');
ciebGroupFilingDetail3.changeReason ="sample data3";
ciebGroupFilingDetail3.applyToSubgroup ="sample data3";
ciebGroupFilingDetail3.insertDatetime =new Date('2010-01-01');
ciebGroupFilingDetail3.insertUser ="sample data3";
ciebGroupFilingDetail3.insertProcess ="sample data3";
ciebGroupFilingDetail3.updateDatetime =new Date('2010-01-01');
ciebGroupFilingDetail3.updateUser ="sample data3";
ciebGroupFilingDetail3.updateProcess ="sample data3";


export const CiebGroupFilingDetails: CiebGroupFilingDetail[] = [
    ciebGroupFilingDetail1,
    ciebGroupFilingDetail2,
    ciebGroupFilingDetail3,
];