/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DddwHdr} from "../../api-models"

var dddwHdr1 = new DddwHdr();
dddwHdr1.dwName ="sample data1";
dddwHdr1.columnName ="sample data1";
dddwHdr1.dwRef ="sample data1";
dddwHdr1.colRef ="sample data1";
dddwHdr1.securityCode ="sample data1";
dddwHdr1.insertDatetime =new Date('2010-01-01');
dddwHdr1.insertUser ="sample data1";
dddwHdr1.insertProcess ="sample data1";
dddwHdr1.updateDatetime =new Date('2010-01-01');
dddwHdr1.updateUser ="sample data1";
dddwHdr1.updateProcess ="sample data1";

var dddwHdr2 = new DddwHdr();
dddwHdr2.dwName ="sample data2";
dddwHdr2.columnName ="sample data2";
dddwHdr2.dwRef ="sample data2";
dddwHdr2.colRef ="sample data2";
dddwHdr2.securityCode ="sample data2";
dddwHdr2.insertDatetime =new Date('2010-01-01');
dddwHdr2.insertUser ="sample data2";
dddwHdr2.insertProcess ="sample data2";
dddwHdr2.updateDatetime =new Date('2010-01-01');
dddwHdr2.updateUser ="sample data2";
dddwHdr2.updateProcess ="sample data2";

var dddwHdr3 = new DddwHdr();
dddwHdr3.dwName ="sample data3";
dddwHdr3.columnName ="sample data3";
dddwHdr3.dwRef ="sample data3";
dddwHdr3.colRef ="sample data3";
dddwHdr3.securityCode ="sample data3";
dddwHdr3.insertDatetime =new Date('2010-01-01');
dddwHdr3.insertUser ="sample data3";
dddwHdr3.insertProcess ="sample data3";
dddwHdr3.updateDatetime =new Date('2010-01-01');
dddwHdr3.updateUser ="sample data3";
dddwHdr3.updateProcess ="sample data3";


export const DddwHdrs: DddwHdr[] = [
    dddwHdr1,
    dddwHdr2,
    dddwHdr3,
];