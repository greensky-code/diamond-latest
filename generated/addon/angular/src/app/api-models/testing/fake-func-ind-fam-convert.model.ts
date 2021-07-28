/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncIndFamConvert} from "../../api-models"

var funcIndFamConvert1 = new FuncIndFamConvert();
funcIndFamConvert1.pBenefitPackageId ="sample data1";
funcIndFamConvert1.pAsOfDate ="sample data1";
funcIndFamConvert1.pRuleType ="sample data1";
funcIndFamConvert1.pFamCovgType ="sample data1";

var funcIndFamConvert2 = new FuncIndFamConvert();
funcIndFamConvert2.pBenefitPackageId ="sample data2";
funcIndFamConvert2.pAsOfDate ="sample data2";
funcIndFamConvert2.pRuleType ="sample data2";
funcIndFamConvert2.pFamCovgType ="sample data2";

var funcIndFamConvert3 = new FuncIndFamConvert();
funcIndFamConvert3.pBenefitPackageId ="sample data3";
funcIndFamConvert3.pAsOfDate ="sample data3";
funcIndFamConvert3.pRuleType ="sample data3";
funcIndFamConvert3.pFamCovgType ="sample data3";


export const FuncIndFamConverts: FuncIndFamConvert[] = [
    funcIndFamConvert1,
    funcIndFamConvert2,
    funcIndFamConvert3,
];