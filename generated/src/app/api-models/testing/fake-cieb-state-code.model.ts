/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebStateCode} from "../../api-models"

var ciebStateCode1 = new CiebStateCode();
ciebStateCode1.updateUser ="sample data1";
ciebStateCode1.updateProcess ="sample data1";
ciebStateCode1.updateDatetime =new Date('2010-01-01');
ciebStateCode1.insertUser ="sample data1";
ciebStateCode1.insertProcess ="sample data1";
ciebStateCode1.insertDatetime =new Date('2010-01-01');
ciebStateCode1.stateDesc ="sample data1";
ciebStateCode1.stateCode ="sample data1";

var ciebStateCode2 = new CiebStateCode();
ciebStateCode2.updateUser ="sample data2";
ciebStateCode2.updateProcess ="sample data2";
ciebStateCode2.updateDatetime =new Date('2010-01-01');
ciebStateCode2.insertUser ="sample data2";
ciebStateCode2.insertProcess ="sample data2";
ciebStateCode2.insertDatetime =new Date('2010-01-01');
ciebStateCode2.stateDesc ="sample data2";
ciebStateCode2.stateCode ="sample data2";

var ciebStateCode3 = new CiebStateCode();
ciebStateCode3.updateUser ="sample data3";
ciebStateCode3.updateProcess ="sample data3";
ciebStateCode3.updateDatetime =new Date('2010-01-01');
ciebStateCode3.insertUser ="sample data3";
ciebStateCode3.insertProcess ="sample data3";
ciebStateCode3.insertDatetime =new Date('2010-01-01');
ciebStateCode3.stateDesc ="sample data3";
ciebStateCode3.stateCode ="sample data3";


export const CiebStateCodes: CiebStateCode[] = [
    ciebStateCode1,
    ciebStateCode2,
    ciebStateCode3,
];