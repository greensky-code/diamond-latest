/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SystemCodes} from "../../api-models"

var systemCodes1 = new SystemCodes();
systemCodes1.systemCode ="sample data1";
systemCodes1.systemCodeType ="sample data1";
systemCodes1.systemCodeDesc1 ="sample data1";
systemCodes1.systemCodeDesc2 ="sample data1";
systemCodes1.systemCodeParam1 ="sample data1";
systemCodes1.systemCodeParam2 ="sample data1";
systemCodes1.systemCodeUpd ="sample data1";
systemCodes1.systemCodeActive ="sample data1";
systemCodes1.securityCode ="sample data1";
systemCodes1.insertDatetime =new Date('2010-01-01');
systemCodes1.insertUser ="sample data1";
systemCodes1.insertProcess ="sample data1";
systemCodes1.updateDatetime =new Date('2010-01-01');
systemCodes1.updateUser ="sample data1";
systemCodes1.updateProcess ="sample data1";

var systemCodes2 = new SystemCodes();
systemCodes2.systemCode ="sample data2";
systemCodes2.systemCodeType ="sample data2";
systemCodes2.systemCodeDesc1 ="sample data2";
systemCodes2.systemCodeDesc2 ="sample data2";
systemCodes2.systemCodeParam1 ="sample data2";
systemCodes2.systemCodeParam2 ="sample data2";
systemCodes2.systemCodeUpd ="sample data2";
systemCodes2.systemCodeActive ="sample data2";
systemCodes2.securityCode ="sample data2";
systemCodes2.insertDatetime =new Date('2010-01-01');
systemCodes2.insertUser ="sample data2";
systemCodes2.insertProcess ="sample data2";
systemCodes2.updateDatetime =new Date('2010-01-01');
systemCodes2.updateUser ="sample data2";
systemCodes2.updateProcess ="sample data2";

var systemCodes3 = new SystemCodes();
systemCodes3.systemCode ="sample data3";
systemCodes3.systemCodeType ="sample data3";
systemCodes3.systemCodeDesc1 ="sample data3";
systemCodes3.systemCodeDesc2 ="sample data3";
systemCodes3.systemCodeParam1 ="sample data3";
systemCodes3.systemCodeParam2 ="sample data3";
systemCodes3.systemCodeUpd ="sample data3";
systemCodes3.systemCodeActive ="sample data3";
systemCodes3.securityCode ="sample data3";
systemCodes3.insertDatetime =new Date('2010-01-01');
systemCodes3.insertUser ="sample data3";
systemCodes3.insertProcess ="sample data3";
systemCodes3.updateDatetime =new Date('2010-01-01');
systemCodes3.updateUser ="sample data3";
systemCodes3.updateProcess ="sample data3";


export const SystemCodeses: SystemCodes[] = [
    systemCodes1,
    systemCodes2,
    systemCodes3,
];