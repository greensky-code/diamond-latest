/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebAddressCode} from "../../api-models"

var ciebAddressCode1 = new CiebAddressCode();
ciebAddressCode1.addressCode ="sample data1";
ciebAddressCode1.addressDesc ="sample data1";
ciebAddressCode1.insertDatetime =new Date('2010-01-01');
ciebAddressCode1.insertUser ="sample data1";
ciebAddressCode1.insertProcess ="sample data1";
ciebAddressCode1.updateDatetime =new Date('2010-01-01');
ciebAddressCode1.updateUser ="sample data1";
ciebAddressCode1.updateProcess ="sample data1";

var ciebAddressCode2 = new CiebAddressCode();
ciebAddressCode2.addressCode ="sample data2";
ciebAddressCode2.addressDesc ="sample data2";
ciebAddressCode2.insertDatetime =new Date('2010-01-01');
ciebAddressCode2.insertUser ="sample data2";
ciebAddressCode2.insertProcess ="sample data2";
ciebAddressCode2.updateDatetime =new Date('2010-01-01');
ciebAddressCode2.updateUser ="sample data2";
ciebAddressCode2.updateProcess ="sample data2";

var ciebAddressCode3 = new CiebAddressCode();
ciebAddressCode3.addressCode ="sample data3";
ciebAddressCode3.addressDesc ="sample data3";
ciebAddressCode3.insertDatetime =new Date('2010-01-01');
ciebAddressCode3.insertUser ="sample data3";
ciebAddressCode3.insertProcess ="sample data3";
ciebAddressCode3.updateDatetime =new Date('2010-01-01');
ciebAddressCode3.updateUser ="sample data3";
ciebAddressCode3.updateProcess ="sample data3";


export const CiebAddressCodes: CiebAddressCode[] = [
    ciebAddressCode1,
    ciebAddressCode2,
    ciebAddressCode3,
];