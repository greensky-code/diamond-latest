/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcUpdGrpTestStatus} from "../../api-models"

var procUpdGrpTestStatus1 = new ProcUpdGrpTestStatus();
procUpdGrpTestStatus1.pPayerGroupId ="sample data1";
procUpdGrpTestStatus1.pTestStatus ="sample data1";
procUpdGrpTestStatus1.pErrMsg ="sample data1";

var procUpdGrpTestStatus2 = new ProcUpdGrpTestStatus();
procUpdGrpTestStatus2.pPayerGroupId ="sample data2";
procUpdGrpTestStatus2.pTestStatus ="sample data2";
procUpdGrpTestStatus2.pErrMsg ="sample data2";

var procUpdGrpTestStatus3 = new ProcUpdGrpTestStatus();
procUpdGrpTestStatus3.pPayerGroupId ="sample data3";
procUpdGrpTestStatus3.pTestStatus ="sample data3";
procUpdGrpTestStatus3.pErrMsg ="sample data3";


export const ProcUpdGrpTestStatu: ProcUpdGrpTestStatus[] = [
    procUpdGrpTestStatus1,
    procUpdGrpTestStatus2,
    procUpdGrpTestStatus3,
];