/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncChkPlanCode} from "../../api-models"

var funcChkPlanCode1 = new FuncChkPlanCode();
funcChkPlanCode1.pGroupId ="sample data1";

var funcChkPlanCode2 = new FuncChkPlanCode();
funcChkPlanCode2.pGroupId ="sample data2";

var funcChkPlanCode3 = new FuncChkPlanCode();
funcChkPlanCode3.pGroupId ="sample data3";


export const FuncChkPlanCodes: FuncChkPlanCode[] = [
    funcChkPlanCode1,
    funcChkPlanCode2,
    funcChkPlanCode3,
];