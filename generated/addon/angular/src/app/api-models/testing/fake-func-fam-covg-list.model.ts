/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncFamCovgList} from "../../api-models"

var funcFamCovgList1 = new FuncFamCovgList();
funcFamCovgList1.pBenefitPackageId ="sample data1";
funcFamCovgList1.pAsOfDate ="sample data1";
funcFamCovgList1.pBenefitType ="sample data1";

var funcFamCovgList2 = new FuncFamCovgList();
funcFamCovgList2.pBenefitPackageId ="sample data2";
funcFamCovgList2.pAsOfDate ="sample data2";
funcFamCovgList2.pBenefitType ="sample data2";

var funcFamCovgList3 = new FuncFamCovgList();
funcFamCovgList3.pBenefitPackageId ="sample data3";
funcFamCovgList3.pAsOfDate ="sample data3";
funcFamCovgList3.pBenefitType ="sample data3";


export const FuncFamCovgLists: FuncFamCovgList[] = [
    funcFamCovgList1,
    funcFamCovgList2,
    funcFamCovgList3,
];