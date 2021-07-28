/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcPayerOopDed} from "../../api-models"

var procPayerOopDed1 = new ProcPayerOopDed();
procPayerOopDed1.pRetcode =123;
procPayerOopDed1.pRetmsg ="sample data1";

var procPayerOopDed2 = new ProcPayerOopDed();
procPayerOopDed2.pRetcode =123;
procPayerOopDed2.pRetmsg ="sample data2";

var procPayerOopDed3 = new ProcPayerOopDed();
procPayerOopDed3.pRetcode =123;
procPayerOopDed3.pRetmsg ="sample data3";


export const ProcPayerOopDeds: ProcPayerOopDed[] = [
    procPayerOopDed1,
    procPayerOopDed2,
    procPayerOopDed3,
];