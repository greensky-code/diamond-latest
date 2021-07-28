/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetNetworkType} from "../../api-models"

var funcGetNetworkType1 = new FuncGetNetworkType();
funcGetNetworkType1.pBenefitPackageId ="sample data1";
funcGetNetworkType1.pRuleId ="sample data1";

var funcGetNetworkType2 = new FuncGetNetworkType();
funcGetNetworkType2.pBenefitPackageId ="sample data2";
funcGetNetworkType2.pRuleId ="sample data2";

var funcGetNetworkType3 = new FuncGetNetworkType();
funcGetNetworkType3.pBenefitPackageId ="sample data3";
funcGetNetworkType3.pRuleId ="sample data3";


export const FuncGetNetworkTypes: FuncGetNetworkType[] = [
    funcGetNetworkType1,
    funcGetNetworkType2,
    funcGetNetworkType3,
];