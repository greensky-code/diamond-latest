/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { TerminatePayAddr} from "../../api-models"

var terminatePayAddr1 = new TerminatePayAddr();
terminatePayAddr1.pSeqEntityId =123;
terminatePayAddr1.pEntityCode ="sample data1";
terminatePayAddr1.pTermDate ="sample data1";

var terminatePayAddr2 = new TerminatePayAddr();
terminatePayAddr2.pSeqEntityId =123;
terminatePayAddr2.pEntityCode ="sample data2";
terminatePayAddr2.pTermDate ="sample data2";

var terminatePayAddr3 = new TerminatePayAddr();
terminatePayAddr3.pSeqEntityId =123;
terminatePayAddr3.pEntityCode ="sample data3";
terminatePayAddr3.pTermDate ="sample data3";


export const TerminatePayAddrs: TerminatePayAddr[] = [
    terminatePayAddr1,
    terminatePayAddr2,
    terminatePayAddr3,
];