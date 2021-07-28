/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebWlCountryXref} from "../../api-models"

var ciebWlCountryXref1 = new CiebWlCountryXref();
ciebWlCountryXref1.countryCode3 ="sample data1";
ciebWlCountryXref1.countryCode2 ="sample data1";
ciebWlCountryXref1.insertDatetime =new Date('2010-01-01');
ciebWlCountryXref1.insertUser ="sample data1";
ciebWlCountryXref1.insertProcess ="sample data1";
ciebWlCountryXref1.updateDatetime =new Date('2010-01-01');
ciebWlCountryXref1.updateUser ="sample data1";
ciebWlCountryXref1.updateProcess ="sample data1";

var ciebWlCountryXref2 = new CiebWlCountryXref();
ciebWlCountryXref2.countryCode3 ="sample data2";
ciebWlCountryXref2.countryCode2 ="sample data2";
ciebWlCountryXref2.insertDatetime =new Date('2010-01-01');
ciebWlCountryXref2.insertUser ="sample data2";
ciebWlCountryXref2.insertProcess ="sample data2";
ciebWlCountryXref2.updateDatetime =new Date('2010-01-01');
ciebWlCountryXref2.updateUser ="sample data2";
ciebWlCountryXref2.updateProcess ="sample data2";

var ciebWlCountryXref3 = new CiebWlCountryXref();
ciebWlCountryXref3.countryCode3 ="sample data3";
ciebWlCountryXref3.countryCode2 ="sample data3";
ciebWlCountryXref3.insertDatetime =new Date('2010-01-01');
ciebWlCountryXref3.insertUser ="sample data3";
ciebWlCountryXref3.insertProcess ="sample data3";
ciebWlCountryXref3.updateDatetime =new Date('2010-01-01');
ciebWlCountryXref3.updateUser ="sample data3";
ciebWlCountryXref3.updateProcess ="sample data3";


export const CiebWlCountryXrefs: CiebWlCountryXref[] = [
    ciebWlCountryXref1,
    ciebWlCountryXref2,
    ciebWlCountryXref3,
];