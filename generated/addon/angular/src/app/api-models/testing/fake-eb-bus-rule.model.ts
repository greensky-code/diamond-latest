/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { EbBusRule} from "../../api-models"

var ebBusRule1 = new EbBusRule();
ebBusRule1.pRuleType ="sample data1";
ebBusRule1.pEbField ="sample data1";
ebBusRule1.pDataElem ="sample data1";

var ebBusRule2 = new EbBusRule();
ebBusRule2.pRuleType ="sample data2";
ebBusRule2.pEbField ="sample data2";
ebBusRule2.pDataElem ="sample data2";

var ebBusRule3 = new EbBusRule();
ebBusRule3.pRuleType ="sample data3";
ebBusRule3.pEbField ="sample data3";
ebBusRule3.pDataElem ="sample data3";


export const EbBusRules: EbBusRule[] = [
    ebBusRule1,
    ebBusRule2,
    ebBusRule3,
];