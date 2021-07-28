/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetCrossAccum} from "../../api-models"

var getCrossAccum1 = new GetCrossAccum();
getCrossAccum1.pRuleId ="sample data1";
getCrossAccum1.pAttrChar13 ="sample data1";

var getCrossAccum2 = new GetCrossAccum();
getCrossAccum2.pRuleId ="sample data2";
getCrossAccum2.pAttrChar13 ="sample data2";

var getCrossAccum3 = new GetCrossAccum();
getCrossAccum3.pRuleId ="sample data3";
getCrossAccum3.pAttrChar13 ="sample data3";


export const GetCrossAccums: GetCrossAccum[] = [
    getCrossAccum1,
    getCrossAccum2,
    getCrossAccum3,
];