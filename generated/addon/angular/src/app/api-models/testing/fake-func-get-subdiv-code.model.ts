/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetSubdivCode} from "../../api-models"

var funcGetSubdivCode1 = new FuncGetSubdivCode();
funcGetSubdivCode1.pSubscriberId ="sample data1";

var funcGetSubdivCode2 = new FuncGetSubdivCode();
funcGetSubdivCode2.pSubscriberId ="sample data2";

var funcGetSubdivCode3 = new FuncGetSubdivCode();
funcGetSubdivCode3.pSubscriberId ="sample data3";


export const FuncGetSubdivCodes: FuncGetSubdivCode[] = [
    funcGetSubdivCode1,
    funcGetSubdivCode2,
    funcGetSubdivCode3,
];