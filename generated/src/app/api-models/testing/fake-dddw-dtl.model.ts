/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DddwDtl} from "../../api-models"

var dddwDtl1 = new DddwDtl();
dddwDtl1.dwName ="sample data1";
dddwDtl1.columnName ="sample data1";
dddwDtl1.displayVal ="sample data1";
dddwDtl1.dataVal ="sample data1";
dddwDtl1.languageId =123;
dddwDtl1.securityCode ="sample data1";
dddwDtl1.insertDatetime =new Date('2010-01-01');
dddwDtl1.insertUser ="sample data1";
dddwDtl1.insertProcess ="sample data1";
dddwDtl1.updateDatetime =new Date('2010-01-01');
dddwDtl1.updateUser ="sample data1";
dddwDtl1.updateProcess ="sample data1";

var dddwDtl2 = new DddwDtl();
dddwDtl2.dwName ="sample data2";
dddwDtl2.columnName ="sample data2";
dddwDtl2.displayVal ="sample data2";
dddwDtl2.dataVal ="sample data2";
dddwDtl2.languageId =123;
dddwDtl2.securityCode ="sample data2";
dddwDtl2.insertDatetime =new Date('2010-01-01');
dddwDtl2.insertUser ="sample data2";
dddwDtl2.insertProcess ="sample data2";
dddwDtl2.updateDatetime =new Date('2010-01-01');
dddwDtl2.updateUser ="sample data2";
dddwDtl2.updateProcess ="sample data2";

var dddwDtl3 = new DddwDtl();
dddwDtl3.dwName ="sample data3";
dddwDtl3.columnName ="sample data3";
dddwDtl3.displayVal ="sample data3";
dddwDtl3.dataVal ="sample data3";
dddwDtl3.languageId =123;
dddwDtl3.securityCode ="sample data3";
dddwDtl3.insertDatetime =new Date('2010-01-01');
dddwDtl3.insertUser ="sample data3";
dddwDtl3.insertProcess ="sample data3";
dddwDtl3.updateDatetime =new Date('2010-01-01');
dddwDtl3.updateUser ="sample data3";
dddwDtl3.updateProcess ="sample data3";


export const DddwDtls: DddwDtl[] = [
    dddwDtl1,
    dddwDtl2,
    dddwDtl3,
];