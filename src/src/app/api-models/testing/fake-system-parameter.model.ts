/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SystemParameter} from "../../api-models"

var systemParameter1 = new SystemParameter();
systemParameter1.parameter3 ="sample data1";
systemParameter1.updateProcess ="sample data1";
systemParameter1.updateUser ="sample data1";
systemParameter1.updateDatetime =new Date('2010-01-01');
systemParameter1.insertProcess ="sample data1";
systemParameter1.insertUser ="sample data1";
systemParameter1.insertDatetime =new Date('2010-01-01');
systemParameter1.securityCode ="sample data1";
systemParameter1.description ="sample data1";
systemParameter1.parameter2 ="sample data1";
systemParameter1.parameter1 ="sample data1";
systemParameter1.parameterId ="sample data1";

var systemParameter2 = new SystemParameter();
systemParameter2.parameter3 ="sample data2";
systemParameter2.updateProcess ="sample data2";
systemParameter2.updateUser ="sample data2";
systemParameter2.updateDatetime =new Date('2010-01-01');
systemParameter2.insertProcess ="sample data2";
systemParameter2.insertUser ="sample data2";
systemParameter2.insertDatetime =new Date('2010-01-01');
systemParameter2.securityCode ="sample data2";
systemParameter2.description ="sample data2";
systemParameter2.parameter2 ="sample data2";
systemParameter2.parameter1 ="sample data2";
systemParameter2.parameterId ="sample data2";

var systemParameter3 = new SystemParameter();
systemParameter3.parameter3 ="sample data3";
systemParameter3.updateProcess ="sample data3";
systemParameter3.updateUser ="sample data3";
systemParameter3.updateDatetime =new Date('2010-01-01');
systemParameter3.insertProcess ="sample data3";
systemParameter3.insertUser ="sample data3";
systemParameter3.insertDatetime =new Date('2010-01-01');
systemParameter3.securityCode ="sample data3";
systemParameter3.description ="sample data3";
systemParameter3.parameter2 ="sample data3";
systemParameter3.parameter1 ="sample data3";
systemParameter3.parameterId ="sample data3";


export const SystemParameters: SystemParameter[] = [
    systemParameter1,
    systemParameter2,
    systemParameter3,
];