/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetMessageDesc} from "../../api-models"

var funcGetMessageDesc1 = new FuncGetMessageDesc();
funcGetMessageDesc1.pErrCode ="sample data1";

var funcGetMessageDesc2 = new FuncGetMessageDesc();
funcGetMessageDesc2.pErrCode ="sample data2";

var funcGetMessageDesc3 = new FuncGetMessageDesc();
funcGetMessageDesc3.pErrCode ="sample data3";


export const FuncGetMessageDescs: FuncGetMessageDesc[] = [
    funcGetMessageDesc1,
    funcGetMessageDesc2,
    funcGetMessageDesc3,
];