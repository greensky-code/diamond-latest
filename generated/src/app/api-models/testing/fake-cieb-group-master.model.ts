/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebGroupMaster} from "../../api-models"

var ciebGroupMaster1 = new CiebGroupMaster();
ciebGroupMaster1.updateProcess ="sample data1";
ciebGroupMaster1.updateUser ="sample data1";
ciebGroupMaster1.updateDatetime =new Date('2010-01-01');
ciebGroupMaster1.insertProcess ="sample data1";
ciebGroupMaster1.insertUser ="sample data1";
ciebGroupMaster1.insertDatetime =new Date('2010-01-01');
ciebGroupMaster1.rxprimeExtractFlag ="sample data1";
ciebGroupMaster1.rxprimeClientId ="sample data1";
ciebGroupMaster1.hsdGroupId ="sample data1";
ciebGroupMaster1.seqGroupId =123;

var ciebGroupMaster2 = new CiebGroupMaster();
ciebGroupMaster2.updateProcess ="sample data2";
ciebGroupMaster2.updateUser ="sample data2";
ciebGroupMaster2.updateDatetime =new Date('2010-01-01');
ciebGroupMaster2.insertProcess ="sample data2";
ciebGroupMaster2.insertUser ="sample data2";
ciebGroupMaster2.insertDatetime =new Date('2010-01-01');
ciebGroupMaster2.rxprimeExtractFlag ="sample data2";
ciebGroupMaster2.rxprimeClientId ="sample data2";
ciebGroupMaster2.hsdGroupId ="sample data2";
ciebGroupMaster2.seqGroupId =123;

var ciebGroupMaster3 = new CiebGroupMaster();
ciebGroupMaster3.updateProcess ="sample data3";
ciebGroupMaster3.updateUser ="sample data3";
ciebGroupMaster3.updateDatetime =new Date('2010-01-01');
ciebGroupMaster3.insertProcess ="sample data3";
ciebGroupMaster3.insertUser ="sample data3";
ciebGroupMaster3.insertDatetime =new Date('2010-01-01');
ciebGroupMaster3.rxprimeExtractFlag ="sample data3";
ciebGroupMaster3.rxprimeClientId ="sample data3";
ciebGroupMaster3.hsdGroupId ="sample data3";
ciebGroupMaster3.seqGroupId =123;


export const CiebGroupMasters: CiebGroupMaster[] = [
    ciebGroupMaster1,
    ciebGroupMaster2,
    ciebGroupMaster3,
];