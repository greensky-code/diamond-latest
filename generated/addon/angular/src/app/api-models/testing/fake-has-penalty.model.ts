/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { HasPenalty} from "../../api-models"

var hasPenalty1 = new HasPenalty();
hasPenalty1.pPackageId ="sample data1";
hasPenalty1.pSvcStartDt ="sample data1";

var hasPenalty2 = new HasPenalty();
hasPenalty2.pPackageId ="sample data2";
hasPenalty2.pSvcStartDt ="sample data2";

var hasPenalty3 = new HasPenalty();
hasPenalty3.pPackageId ="sample data3";
hasPenalty3.pSvcStartDt ="sample data3";


export const HasPenaltys: HasPenalty[] = [
    hasPenalty1,
    hasPenalty2,
    hasPenalty3,
];