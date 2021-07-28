/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetHistory} from "../../api-models"

var procGetHistory1 = new ProcGetHistory();
procGetHistory1.pGroupId ="sample data1";

var procGetHistory2 = new ProcGetHistory();
procGetHistory2.pGroupId ="sample data2";

var procGetHistory3 = new ProcGetHistory();
procGetHistory3.pGroupId ="sample data3";


export const ProcGetHistorys: ProcGetHistory[] = [
    procGetHistory1,
    procGetHistory2,
    procGetHistory3,
];