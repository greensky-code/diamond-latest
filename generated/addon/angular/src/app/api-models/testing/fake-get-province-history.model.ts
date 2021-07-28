/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetProvinceHistory} from "../../api-models"

var getProvinceHistory1 = new GetProvinceHistory();
getProvinceHistory1.pTaxRegion ="sample data1";
getProvinceHistory1.pTaxType ="sample data1";
getProvinceHistory1.pTaxProduct ="sample data1";
getProvinceHistory1.pFundType ="sample data1";

var getProvinceHistory2 = new GetProvinceHistory();
getProvinceHistory2.pTaxRegion ="sample data2";
getProvinceHistory2.pTaxType ="sample data2";
getProvinceHistory2.pTaxProduct ="sample data2";
getProvinceHistory2.pFundType ="sample data2";

var getProvinceHistory3 = new GetProvinceHistory();
getProvinceHistory3.pTaxRegion ="sample data3";
getProvinceHistory3.pTaxType ="sample data3";
getProvinceHistory3.pTaxProduct ="sample data3";
getProvinceHistory3.pFundType ="sample data3";


export const GetProvinceHistorys: GetProvinceHistory[] = [
    getProvinceHistory1,
    getProvinceHistory2,
    getProvinceHistory3,
];