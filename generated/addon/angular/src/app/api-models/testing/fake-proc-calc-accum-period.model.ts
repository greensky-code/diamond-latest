/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcCalcAccumPeriod} from "../../api-models"

var procCalcAccumPeriod1 = new ProcCalcAccumPeriod();
procCalcAccumPeriod1.inRule ="sample data1";
procCalcAccumPeriod1.inStDate ="sample data1";
procCalcAccumPeriod1.inEndDate ="sample data1";
procCalcAccumPeriod1.outStDate ="sample data1";
procCalcAccumPeriod1.inAsOfDate ="sample data1";

var procCalcAccumPeriod2 = new ProcCalcAccumPeriod();
procCalcAccumPeriod2.inRule ="sample data2";
procCalcAccumPeriod2.inStDate ="sample data2";
procCalcAccumPeriod2.inEndDate ="sample data2";
procCalcAccumPeriod2.outStDate ="sample data2";
procCalcAccumPeriod2.inAsOfDate ="sample data2";

var procCalcAccumPeriod3 = new ProcCalcAccumPeriod();
procCalcAccumPeriod3.inRule ="sample data3";
procCalcAccumPeriod3.inStDate ="sample data3";
procCalcAccumPeriod3.inEndDate ="sample data3";
procCalcAccumPeriod3.outStDate ="sample data3";
procCalcAccumPeriod3.inAsOfDate ="sample data3";


export const ProcCalcAccumPeriods: ProcCalcAccumPeriod[] = [
    procCalcAccumPeriod1,
    procCalcAccumPeriod2,
    procCalcAccumPeriod3,
];