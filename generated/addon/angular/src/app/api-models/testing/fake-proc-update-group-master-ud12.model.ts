/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcUpdateGroupMasterUd12} from "../../api-models"

var procUpdateGroupMasterUd121 = new ProcUpdateGroupMasterUd12();
procUpdateGroupMasterUd121.pRetcode =123;
procUpdateGroupMasterUd121.pRetmsg ="sample data1";

var procUpdateGroupMasterUd122 = new ProcUpdateGroupMasterUd12();
procUpdateGroupMasterUd122.pRetcode =123;
procUpdateGroupMasterUd122.pRetmsg ="sample data2";

var procUpdateGroupMasterUd123 = new ProcUpdateGroupMasterUd12();
procUpdateGroupMasterUd123.pRetcode =123;
procUpdateGroupMasterUd123.pRetmsg ="sample data3";


export const ProcUpdateGroupMasterUd12S: ProcUpdateGroupMasterUd12[] = [
    procUpdateGroupMasterUd121,
    procUpdateGroupMasterUd122,
    procUpdateGroupMasterUd123,
];