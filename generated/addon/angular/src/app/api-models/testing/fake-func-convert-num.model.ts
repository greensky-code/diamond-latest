/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncConvertNum} from "../../api-models"

var funcConvertNum1 = new FuncConvertNum();
funcConvertNum1.pStrnum ="sample data1";
funcConvertNum1.pStrformat ="sample data1";

var funcConvertNum2 = new FuncConvertNum();
funcConvertNum2.pStrnum ="sample data2";
funcConvertNum2.pStrformat ="sample data2";

var funcConvertNum3 = new FuncConvertNum();
funcConvertNum3.pStrnum ="sample data3";
funcConvertNum3.pStrformat ="sample data3";


export const FuncConvertNums: FuncConvertNum[] = [
    funcConvertNum1,
    funcConvertNum2,
    funcConvertNum3,
];