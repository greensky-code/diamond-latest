/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { OverlapOut} from "../../api-models"

var overlapOut1 = new OverlapOut();
overlapOut1.pDiagCode ="sample data1";
overlapOut1.pServiceDate ="sample data1";

var overlapOut2 = new OverlapOut();
overlapOut2.pDiagCode ="sample data2";
overlapOut2.pServiceDate ="sample data2";

var overlapOut3 = new OverlapOut();
overlapOut3.pDiagCode ="sample data3";
overlapOut3.pServiceDate ="sample data3";


export const OverlapOuts: OverlapOut[] = [
    overlapOut1,
    overlapOut2,
    overlapOut3,
];