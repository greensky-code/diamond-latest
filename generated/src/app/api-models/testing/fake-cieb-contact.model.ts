/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebContact} from "../../api-models"

var ciebContact1 = new CiebContact();
ciebContact1.updateProcess ="sample data1";
ciebContact1.updateUser ="sample data1";
ciebContact1.updateDatetime =new Date('2010-01-01');
ciebContact1.insertProcess ="sample data1";
ciebContact1.insertUser ="sample data1";
ciebContact1.insertDatetime =new Date('2010-01-01');
ciebContact1.termDate =new Date('2010-01-01');
ciebContact1.effDate =new Date('2010-01-01');
ciebContact1.phoneExt ="sample data1";
ciebContact1.phoneNum ="sample data1";
ciebContact1.phonePrefix ="sample data1";
ciebContact1.emailAddress ="sample data1";
ciebContact1.lastName ="sample data1";
ciebContact1.firstName ="sample data1";
ciebContact1.contactCode ="sample data1";
ciebContact1.seqEntityId =123;
ciebContact1.seqContactId =123;

var ciebContact2 = new CiebContact();
ciebContact2.updateProcess ="sample data2";
ciebContact2.updateUser ="sample data2";
ciebContact2.updateDatetime =new Date('2010-01-01');
ciebContact2.insertProcess ="sample data2";
ciebContact2.insertUser ="sample data2";
ciebContact2.insertDatetime =new Date('2010-01-01');
ciebContact2.termDate =new Date('2010-01-01');
ciebContact2.effDate =new Date('2010-01-01');
ciebContact2.phoneExt ="sample data2";
ciebContact2.phoneNum ="sample data2";
ciebContact2.phonePrefix ="sample data2";
ciebContact2.emailAddress ="sample data2";
ciebContact2.lastName ="sample data2";
ciebContact2.firstName ="sample data2";
ciebContact2.contactCode ="sample data2";
ciebContact2.seqEntityId =123;
ciebContact2.seqContactId =123;

var ciebContact3 = new CiebContact();
ciebContact3.updateProcess ="sample data3";
ciebContact3.updateUser ="sample data3";
ciebContact3.updateDatetime =new Date('2010-01-01');
ciebContact3.insertProcess ="sample data3";
ciebContact3.insertUser ="sample data3";
ciebContact3.insertDatetime =new Date('2010-01-01');
ciebContact3.termDate =new Date('2010-01-01');
ciebContact3.effDate =new Date('2010-01-01');
ciebContact3.phoneExt ="sample data3";
ciebContact3.phoneNum ="sample data3";
ciebContact3.phonePrefix ="sample data3";
ciebContact3.emailAddress ="sample data3";
ciebContact3.lastName ="sample data3";
ciebContact3.firstName ="sample data3";
ciebContact3.contactCode ="sample data3";
ciebContact3.seqEntityId =123;
ciebContact3.seqContactId =123;


export const CiebContacts: CiebContact[] = [
    ciebContact1,
    ciebContact2,
    ciebContact3,
];