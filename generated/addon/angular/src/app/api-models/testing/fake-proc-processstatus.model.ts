/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcProcessstatus} from "../../api-models"

var procProcessstatus1 = new ProcProcessstatus();
procProcessstatus1.pProcessName ="sample data1";
procProcessstatus1.pProcessCode =123;
procProcessstatus1.pStatusDesc ="sample data1";

var procProcessstatus2 = new ProcProcessstatus();
procProcessstatus2.pProcessName ="sample data2";
procProcessstatus2.pProcessCode =123;
procProcessstatus2.pStatusDesc ="sample data2";

var procProcessstatus3 = new ProcProcessstatus();
procProcessstatus3.pProcessName ="sample data3";
procProcessstatus3.pProcessCode =123;
procProcessstatus3.pStatusDesc ="sample data3";


export const ProcProcessstatu: ProcProcessstatus[] = [
    procProcessstatus1,
    procProcessstatus2,
    procProcessstatus3,
];