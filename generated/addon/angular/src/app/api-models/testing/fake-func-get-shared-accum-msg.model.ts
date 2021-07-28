/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetSharedAccumMsg} from "../../api-models"

var funcGetSharedAccumMsg1 = new FuncGetSharedAccumMsg();
funcGetSharedAccumMsg1.pRuleId ="sample data1";
funcGetSharedAccumMsg1.pReqStcList ="sample data1";

var funcGetSharedAccumMsg2 = new FuncGetSharedAccumMsg();
funcGetSharedAccumMsg2.pRuleId ="sample data2";
funcGetSharedAccumMsg2.pReqStcList ="sample data2";

var funcGetSharedAccumMsg3 = new FuncGetSharedAccumMsg();
funcGetSharedAccumMsg3.pRuleId ="sample data3";
funcGetSharedAccumMsg3.pReqStcList ="sample data3";


export const FuncGetSharedAccumMsgs: FuncGetSharedAccumMsg[] = [
    funcGetSharedAccumMsg1,
    funcGetSharedAccumMsg2,
    funcGetSharedAccumMsg3,
];