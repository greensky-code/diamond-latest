/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetSharedBenefit} from "../../api-models"

var funcGetSharedBenefit1 = new FuncGetSharedBenefit();
funcGetSharedBenefit1.pBenefitPackageId ="sample data1";
funcGetSharedBenefit1.pStartDate ="sample data1";
funcGetSharedBenefit1.pEndDate ="sample data1";

var funcGetSharedBenefit2 = new FuncGetSharedBenefit();
funcGetSharedBenefit2.pBenefitPackageId ="sample data2";
funcGetSharedBenefit2.pStartDate ="sample data2";
funcGetSharedBenefit2.pEndDate ="sample data2";

var funcGetSharedBenefit3 = new FuncGetSharedBenefit();
funcGetSharedBenefit3.pBenefitPackageId ="sample data3";
funcGetSharedBenefit3.pStartDate ="sample data3";
funcGetSharedBenefit3.pEndDate ="sample data3";


export const FuncGetSharedBenefits: FuncGetSharedBenefit[] = [
    funcGetSharedBenefit1,
    funcGetSharedBenefit2,
    funcGetSharedBenefit3,
];