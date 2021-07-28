/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { OverlapIn} from "../../api-models"

var overlapIn1 = new OverlapIn();
overlapIn1.pDiagCode ="sample data1";
overlapIn1.pServiceDate ="sample data1";

var overlapIn2 = new OverlapIn();
overlapIn2.pDiagCode ="sample data2";
overlapIn2.pServiceDate ="sample data2";

var overlapIn3 = new OverlapIn();
overlapIn3.pDiagCode ="sample data3";
overlapIn3.pServiceDate ="sample data3";


export const OverlapIns: OverlapIn[] = [
    overlapIn1,
    overlapIn2,
    overlapIn3,
];