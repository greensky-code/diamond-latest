/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncIsZipValid} from "../../api-models"

var funcIsZipValid1 = new FuncIsZipValid();
funcIsZipValid1.pCountryCode ="sample data1";
funcIsZipValid1.pStateCode ="sample data1";
funcIsZipValid1.pZipCode ="sample data1";

var funcIsZipValid2 = new FuncIsZipValid();
funcIsZipValid2.pCountryCode ="sample data2";
funcIsZipValid2.pStateCode ="sample data2";
funcIsZipValid2.pZipCode ="sample data2";

var funcIsZipValid3 = new FuncIsZipValid();
funcIsZipValid3.pCountryCode ="sample data3";
funcIsZipValid3.pStateCode ="sample data3";
funcIsZipValid3.pZipCode ="sample data3";


export const FuncIsZipValids: FuncIsZipValid[] = [
    funcIsZipValid1,
    funcIsZipValid2,
    funcIsZipValid3,
];