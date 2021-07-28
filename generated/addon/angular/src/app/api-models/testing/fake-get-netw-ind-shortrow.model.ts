/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetNetwIndShortrow} from "../../api-models"

var getNetwIndShortrow1 = new GetNetwIndShortrow();
getNetwIndShortrow1.pWCnt =123;
getNetwIndShortrow1.pYCnt =123;
getNetwIndShortrow1.pNCnt =123;

var getNetwIndShortrow2 = new GetNetwIndShortrow();
getNetwIndShortrow2.pWCnt =123;
getNetwIndShortrow2.pYCnt =123;
getNetwIndShortrow2.pNCnt =123;

var getNetwIndShortrow3 = new GetNetwIndShortrow();
getNetwIndShortrow3.pWCnt =123;
getNetwIndShortrow3.pYCnt =123;
getNetwIndShortrow3.pNCnt =123;


export const GetNetwIndShortrows: GetNetwIndShortrow[] = [
    getNetwIndShortrow1,
    getNetwIndShortrow2,
    getNetwIndShortrow3,
];