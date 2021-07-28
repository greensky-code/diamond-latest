/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetIndaccm2Fam} from "../../api-models"

var funcGetIndaccm2Fam1 = new FuncGetIndaccm2Fam();
funcGetIndaccm2Fam1.pBenefitPackageId ="sample data1";
funcGetIndaccm2Fam1.pAsOfDate ="sample data1";
funcGetIndaccm2Fam1.pRuleId ="sample data1";
funcGetIndaccm2Fam1.pFamCovgType ="sample data1";

var funcGetIndaccm2Fam2 = new FuncGetIndaccm2Fam();
funcGetIndaccm2Fam2.pBenefitPackageId ="sample data2";
funcGetIndaccm2Fam2.pAsOfDate ="sample data2";
funcGetIndaccm2Fam2.pRuleId ="sample data2";
funcGetIndaccm2Fam2.pFamCovgType ="sample data2";

var funcGetIndaccm2Fam3 = new FuncGetIndaccm2Fam();
funcGetIndaccm2Fam3.pBenefitPackageId ="sample data3";
funcGetIndaccm2Fam3.pAsOfDate ="sample data3";
funcGetIndaccm2Fam3.pRuleId ="sample data3";
funcGetIndaccm2Fam3.pFamCovgType ="sample data3";


export const FuncGetIndaccm2Fams: FuncGetIndaccm2Fam[] = [
    funcGetIndaccm2Fam1,
    funcGetIndaccm2Fam2,
    funcGetIndaccm2Fam3,
];