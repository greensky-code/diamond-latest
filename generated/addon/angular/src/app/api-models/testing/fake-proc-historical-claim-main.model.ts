/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcHistoricalClaimMain} from "../../api-models"

var procHistoricalClaimMain1 = new ProcHistoricalClaimMain();
procHistoricalClaimMain1.pProcStartDate ="sample data1";
procHistoricalClaimMain1.pProcEndDate ="sample data1";
procHistoricalClaimMain1.pAllCobClmInd ="sample data1";

var procHistoricalClaimMain2 = new ProcHistoricalClaimMain();
procHistoricalClaimMain2.pProcStartDate ="sample data2";
procHistoricalClaimMain2.pProcEndDate ="sample data2";
procHistoricalClaimMain2.pAllCobClmInd ="sample data2";

var procHistoricalClaimMain3 = new ProcHistoricalClaimMain();
procHistoricalClaimMain3.pProcStartDate ="sample data3";
procHistoricalClaimMain3.pProcEndDate ="sample data3";
procHistoricalClaimMain3.pAllCobClmInd ="sample data3";


export const ProcHistoricalClaimMains: ProcHistoricalClaimMain[] = [
    procHistoricalClaimMain1,
    procHistoricalClaimMain2,
    procHistoricalClaimMain3,
];