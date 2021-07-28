/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebWebCodeDecode} from "../../api-models"

var ciebWebCodeDecode1 = new CiebWebCodeDecode();
ciebWebCodeDecode1.userDefined6 ="sample data1";
ciebWebCodeDecode1.userDefined5 ="sample data1";
ciebWebCodeDecode1.userDefined4 ="sample data1";
ciebWebCodeDecode1.userDefined3 ="sample data1";
ciebWebCodeDecode1.updateProcess ="sample data1";
ciebWebCodeDecode1.updateUser ="sample data1";
ciebWebCodeDecode1.updateDatetime =new Date('2010-01-01');
ciebWebCodeDecode1.insertProcess ="sample data1";
ciebWebCodeDecode1.insertUser ="sample data1";
ciebWebCodeDecode1.insertDatetime =new Date('2010-01-01');
ciebWebCodeDecode1.userDefined2 ="sample data1";
ciebWebCodeDecode1.userDefined1 ="sample data1";
ciebWebCodeDecode1.decode4 ="sample data1";
ciebWebCodeDecode1.decode3 ="sample data1";
ciebWebCodeDecode1.decode2 ="sample data1";
ciebWebCodeDecode1.decode1 ="sample data1";
ciebWebCodeDecode1.code ="sample data1";
ciebWebCodeDecode1.codeType ="sample data1";
ciebWebCodeDecode1.seqCodeId =123;

var ciebWebCodeDecode2 = new CiebWebCodeDecode();
ciebWebCodeDecode2.userDefined6 ="sample data2";
ciebWebCodeDecode2.userDefined5 ="sample data2";
ciebWebCodeDecode2.userDefined4 ="sample data2";
ciebWebCodeDecode2.userDefined3 ="sample data2";
ciebWebCodeDecode2.updateProcess ="sample data2";
ciebWebCodeDecode2.updateUser ="sample data2";
ciebWebCodeDecode2.updateDatetime =new Date('2010-01-01');
ciebWebCodeDecode2.insertProcess ="sample data2";
ciebWebCodeDecode2.insertUser ="sample data2";
ciebWebCodeDecode2.insertDatetime =new Date('2010-01-01');
ciebWebCodeDecode2.userDefined2 ="sample data2";
ciebWebCodeDecode2.userDefined1 ="sample data2";
ciebWebCodeDecode2.decode4 ="sample data2";
ciebWebCodeDecode2.decode3 ="sample data2";
ciebWebCodeDecode2.decode2 ="sample data2";
ciebWebCodeDecode2.decode1 ="sample data2";
ciebWebCodeDecode2.code ="sample data2";
ciebWebCodeDecode2.codeType ="sample data2";
ciebWebCodeDecode2.seqCodeId =123;

var ciebWebCodeDecode3 = new CiebWebCodeDecode();
ciebWebCodeDecode3.userDefined6 ="sample data3";
ciebWebCodeDecode3.userDefined5 ="sample data3";
ciebWebCodeDecode3.userDefined4 ="sample data3";
ciebWebCodeDecode3.userDefined3 ="sample data3";
ciebWebCodeDecode3.updateProcess ="sample data3";
ciebWebCodeDecode3.updateUser ="sample data3";
ciebWebCodeDecode3.updateDatetime =new Date('2010-01-01');
ciebWebCodeDecode3.insertProcess ="sample data3";
ciebWebCodeDecode3.insertUser ="sample data3";
ciebWebCodeDecode3.insertDatetime =new Date('2010-01-01');
ciebWebCodeDecode3.userDefined2 ="sample data3";
ciebWebCodeDecode3.userDefined1 ="sample data3";
ciebWebCodeDecode3.decode4 ="sample data3";
ciebWebCodeDecode3.decode3 ="sample data3";
ciebWebCodeDecode3.decode2 ="sample data3";
ciebWebCodeDecode3.decode1 ="sample data3";
ciebWebCodeDecode3.code ="sample data3";
ciebWebCodeDecode3.codeType ="sample data3";
ciebWebCodeDecode3.seqCodeId =123;


export const CiebWebCodeDecodes: CiebWebCodeDecode[] = [
    ciebWebCodeDecode1,
    ciebWebCodeDecode2,
    ciebWebCodeDecode3,
];