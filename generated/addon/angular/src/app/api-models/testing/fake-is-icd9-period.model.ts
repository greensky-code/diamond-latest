/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IsIcd9Period} from "../../api-models"

var isIcd9Period1 = new IsIcd9Period();
isIcd9Period1.pServiceDate ="sample data1";

var isIcd9Period2 = new IsIcd9Period();
isIcd9Period2.pServiceDate ="sample data2";

var isIcd9Period3 = new IsIcd9Period();
isIcd9Period3.pServiceDate ="sample data3";


export const IsIcd9Periods: IsIcd9Period[] = [
    isIcd9Period1,
    isIcd9Period2,
    isIcd9Period3,
];