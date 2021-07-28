/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UpdateStatus} from "../../api-models"

var updateStatus1 = new UpdateStatus();
updateStatus1.pOrigSysTransId ="sample data1";
updateStatus1.pProcessStat ="sample data1";

var updateStatus2 = new UpdateStatus();
updateStatus2.pOrigSysTransId ="sample data2";
updateStatus2.pProcessStat ="sample data2";

var updateStatus3 = new UpdateStatus();
updateStatus3.pOrigSysTransId ="sample data3";
updateStatus3.pProcessStat ="sample data3";


export const UpdateStatu: UpdateStatus[] = [
    updateStatus1,
    updateStatus2,
    updateStatus3,
];