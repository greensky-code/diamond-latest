/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcCarryOver} from "../../api-models"

var procCarryOver1 = new ProcCarryOver();
procCarryOver1.pCoverage ="sample data1";
procCarryOver1.pCaroverType ="sample data1";
procCarryOver1.pBenpkId ="sample data1";
procCarryOver1.pStartDate ="sample data1";
procCarryOver1.pEndDate ="sample data1";
procCarryOver1.stDate ="sample data1";
procCarryOver1.endDate ="sample data1";

var procCarryOver2 = new ProcCarryOver();
procCarryOver2.pCoverage ="sample data2";
procCarryOver2.pCaroverType ="sample data2";
procCarryOver2.pBenpkId ="sample data2";
procCarryOver2.pStartDate ="sample data2";
procCarryOver2.pEndDate ="sample data2";
procCarryOver2.stDate ="sample data2";
procCarryOver2.endDate ="sample data2";

var procCarryOver3 = new ProcCarryOver();
procCarryOver3.pCoverage ="sample data3";
procCarryOver3.pCaroverType ="sample data3";
procCarryOver3.pBenpkId ="sample data3";
procCarryOver3.pStartDate ="sample data3";
procCarryOver3.pEndDate ="sample data3";
procCarryOver3.stDate ="sample data3";
procCarryOver3.endDate ="sample data3";


export const ProcCarryOvers: ProcCarryOver[] = [
    procCarryOver1,
    procCarryOver2,
    procCarryOver3,
];