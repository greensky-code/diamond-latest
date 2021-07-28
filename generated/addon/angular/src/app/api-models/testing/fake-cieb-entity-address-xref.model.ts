/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebEntityAddressXref} from "../../api-models"

var ciebEntityAddressXref1 = new CiebEntityAddressXref();
ciebEntityAddressXref1.addressCode ="sample data1";
ciebEntityAddressXref1.entityCode ="sample data1";
ciebEntityAddressXref1.insertDatetime =new Date('2010-01-01');
ciebEntityAddressXref1.insertUser ="sample data1";
ciebEntityAddressXref1.insertProcess ="sample data1";
ciebEntityAddressXref1.updateDatetime =new Date('2010-01-01');
ciebEntityAddressXref1.updateUser ="sample data1";
ciebEntityAddressXref1.updateProcess ="sample data1";

var ciebEntityAddressXref2 = new CiebEntityAddressXref();
ciebEntityAddressXref2.addressCode ="sample data2";
ciebEntityAddressXref2.entityCode ="sample data2";
ciebEntityAddressXref2.insertDatetime =new Date('2010-01-01');
ciebEntityAddressXref2.insertUser ="sample data2";
ciebEntityAddressXref2.insertProcess ="sample data2";
ciebEntityAddressXref2.updateDatetime =new Date('2010-01-01');
ciebEntityAddressXref2.updateUser ="sample data2";
ciebEntityAddressXref2.updateProcess ="sample data2";

var ciebEntityAddressXref3 = new CiebEntityAddressXref();
ciebEntityAddressXref3.addressCode ="sample data3";
ciebEntityAddressXref3.entityCode ="sample data3";
ciebEntityAddressXref3.insertDatetime =new Date('2010-01-01');
ciebEntityAddressXref3.insertUser ="sample data3";
ciebEntityAddressXref3.insertProcess ="sample data3";
ciebEntityAddressXref3.updateDatetime =new Date('2010-01-01');
ciebEntityAddressXref3.updateUser ="sample data3";
ciebEntityAddressXref3.updateProcess ="sample data3";


export const CiebEntityAddressXrefs: CiebEntityAddressXref[] = [
    ciebEntityAddressXref1,
    ciebEntityAddressXref2,
    ciebEntityAddressXref3,
];