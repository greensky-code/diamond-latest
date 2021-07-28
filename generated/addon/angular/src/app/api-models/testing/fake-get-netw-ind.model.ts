/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetNetwInd} from "../../api-models"

var getNetwInd1 = new GetNetwInd();
getNetwInd1.pType ="sample data1";
getNetwInd1.pOperator ="sample data1";
getNetwInd1.pFromValue ="sample data1";
getNetwInd1.pPnCnt =123;
getNetwInd1.pTypePCnt =123;

var getNetwInd2 = new GetNetwInd();
getNetwInd2.pType ="sample data2";
getNetwInd2.pOperator ="sample data2";
getNetwInd2.pFromValue ="sample data2";
getNetwInd2.pPnCnt =123;
getNetwInd2.pTypePCnt =123;

var getNetwInd3 = new GetNetwInd();
getNetwInd3.pType ="sample data3";
getNetwInd3.pOperator ="sample data3";
getNetwInd3.pFromValue ="sample data3";
getNetwInd3.pPnCnt =123;
getNetwInd3.pTypePCnt =123;


export const GetNetwInds: GetNetwInd[] = [
    getNetwInd1,
    getNetwInd2,
    getNetwInd3,
];