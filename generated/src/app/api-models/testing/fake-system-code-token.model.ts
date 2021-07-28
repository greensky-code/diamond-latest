/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SystemCodeToken} from "../../api-models"

var systemCodeToken1 = new SystemCodeToken();
systemCodeToken1.systemCode ="sample data1";
systemCodeToken1.systemCodeType ="sample data1";
systemCodeToken1.languageId =123;
systemCodeToken1.systemCodeDesc1 ="sample data1";
systemCodeToken1.systemCodeDesc2 ="sample data1";
systemCodeToken1.securityCode ="sample data1";
systemCodeToken1.insertDatetime =new Date('2010-01-01');
systemCodeToken1.insertUser ="sample data1";
systemCodeToken1.insertProcess ="sample data1";
systemCodeToken1.updateDatetime =new Date('2010-01-01');
systemCodeToken1.updateUser ="sample data1";
systemCodeToken1.updateProcess ="sample data1";

var systemCodeToken2 = new SystemCodeToken();
systemCodeToken2.systemCode ="sample data2";
systemCodeToken2.systemCodeType ="sample data2";
systemCodeToken2.languageId =123;
systemCodeToken2.systemCodeDesc1 ="sample data2";
systemCodeToken2.systemCodeDesc2 ="sample data2";
systemCodeToken2.securityCode ="sample data2";
systemCodeToken2.insertDatetime =new Date('2010-01-01');
systemCodeToken2.insertUser ="sample data2";
systemCodeToken2.insertProcess ="sample data2";
systemCodeToken2.updateDatetime =new Date('2010-01-01');
systemCodeToken2.updateUser ="sample data2";
systemCodeToken2.updateProcess ="sample data2";

var systemCodeToken3 = new SystemCodeToken();
systemCodeToken3.systemCode ="sample data3";
systemCodeToken3.systemCodeType ="sample data3";
systemCodeToken3.languageId =123;
systemCodeToken3.systemCodeDesc1 ="sample data3";
systemCodeToken3.systemCodeDesc2 ="sample data3";
systemCodeToken3.securityCode ="sample data3";
systemCodeToken3.insertDatetime =new Date('2010-01-01');
systemCodeToken3.insertUser ="sample data3";
systemCodeToken3.insertProcess ="sample data3";
systemCodeToken3.updateDatetime =new Date('2010-01-01');
systemCodeToken3.updateUser ="sample data3";
systemCodeToken3.updateProcess ="sample data3";


export const SystemCodeTokens: SystemCodeToken[] = [
    systemCodeToken1,
    systemCodeToken2,
    systemCodeToken3,
];