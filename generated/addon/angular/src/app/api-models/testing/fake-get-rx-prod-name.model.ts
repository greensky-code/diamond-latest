/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetRxProdName} from "../../api-models"

var getRxProdName1 = new GetRxProdName();
getRxProdName1.pPackageId ="sample data1";

var getRxProdName2 = new GetRxProdName();
getRxProdName2.pPackageId ="sample data2";

var getRxProdName3 = new GetRxProdName();
getRxProdName3.pPackageId ="sample data3";


export const GetRxProdNames: GetRxProdName[] = [
    getRxProdName1,
    getRxProdName2,
    getRxProdName3,
];