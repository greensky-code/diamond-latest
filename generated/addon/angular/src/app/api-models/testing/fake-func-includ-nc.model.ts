/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncIncludNc} from "../../api-models"

var funcIncludNc1 = new FuncIncludNc();
funcIncludNc1.pOcAllowedAmt =123;
funcIncludNc1.pOtherCarrierAmt =123;
funcIncludNc1.pNotCoveredAmt =123;
funcIncludNc1.pNotCoveredReason ="sample data1";

var funcIncludNc2 = new FuncIncludNc();
funcIncludNc2.pOcAllowedAmt =123;
funcIncludNc2.pOtherCarrierAmt =123;
funcIncludNc2.pNotCoveredAmt =123;
funcIncludNc2.pNotCoveredReason ="sample data2";

var funcIncludNc3 = new FuncIncludNc();
funcIncludNc3.pOcAllowedAmt =123;
funcIncludNc3.pOtherCarrierAmt =123;
funcIncludNc3.pNotCoveredAmt =123;
funcIncludNc3.pNotCoveredReason ="sample data3";


export const FuncIncludNcs: FuncIncludNc[] = [
    funcIncludNc1,
    funcIncludNc2,
    funcIncludNc3,
];