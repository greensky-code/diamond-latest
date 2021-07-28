/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetInclInOopCalcInd} from "../../api-models"

var funcGetInclInOopCalcInd1 = new FuncGetInclInOopCalcInd();
funcGetInclInOopCalcInd1.pPackageId ="sample data1";
funcGetInclInOopCalcInd1.pSvcDate ="sample data1";

var funcGetInclInOopCalcInd2 = new FuncGetInclInOopCalcInd();
funcGetInclInOopCalcInd2.pPackageId ="sample data2";
funcGetInclInOopCalcInd2.pSvcDate ="sample data2";

var funcGetInclInOopCalcInd3 = new FuncGetInclInOopCalcInd();
funcGetInclInOopCalcInd3.pPackageId ="sample data3";
funcGetInclInOopCalcInd3.pSvcDate ="sample data3";


export const FuncGetInclInOopCalcInds: FuncGetInclInOopCalcInd[] = [
    funcGetInclInOopCalcInd1,
    funcGetInclInOopCalcInd2,
    funcGetInclInOopCalcInd3,
];