/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetCodeDesc} from "../../api-models"

var funcGetCodeDesc1 = new FuncGetCodeDesc();
funcGetCodeDesc1.pCode ="sample data1";
funcGetCodeDesc1.pCodeType ="sample data1";

var funcGetCodeDesc2 = new FuncGetCodeDesc();
funcGetCodeDesc2.pCode ="sample data2";
funcGetCodeDesc2.pCodeType ="sample data2";

var funcGetCodeDesc3 = new FuncGetCodeDesc();
funcGetCodeDesc3.pCode ="sample data3";
funcGetCodeDesc3.pCodeType ="sample data3";


export const FuncGetCodeDescs: FuncGetCodeDesc[] = [
    funcGetCodeDesc1,
    funcGetCodeDesc2,
    funcGetCodeDesc3,
];