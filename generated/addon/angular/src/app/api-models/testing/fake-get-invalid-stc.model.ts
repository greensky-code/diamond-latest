/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetInvalidStc} from "../../api-models"

var getInvalidStc1 = new GetInvalidStc();
getInvalidStc1.pStcInfoList ="sample data1";

var getInvalidStc2 = new GetInvalidStc();
getInvalidStc2.pStcInfoList ="sample data2";

var getInvalidStc3 = new GetInvalidStc();
getInvalidStc3.pStcInfoList ="sample data3";


export const GetInvalidStcs: GetInvalidStc[] = [
    getInvalidStc1,
    getInvalidStc2,
    getInvalidStc3,
];