/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCurrencyCode} from "../../api-models"

var ciebCurrencyCode1 = new CiebCurrencyCode();
ciebCurrencyCode1.djCountryDesc ="sample data1";
ciebCurrencyCode1.defaultTransPaymentCode ="sample data1";
ciebCurrencyCode1.updateProcess ="sample data1";
ciebCurrencyCode1.updateUser ="sample data1";
ciebCurrencyCode1.updateDatetime =new Date('2010-01-01');
ciebCurrencyCode1.insertProcess ="sample data1";
ciebCurrencyCode1.insertUser ="sample data1";
ciebCurrencyCode1.insertDatetime =new Date('2010-01-01');
ciebCurrencyCode1.activeInd ="sample data1";
ciebCurrencyCode1.incomingOnlyInd ="sample data1";
ciebCurrencyCode1.wholeCurrencyInd ="sample data1";
ciebCurrencyCode1.euroInd ="sample data1";
ciebCurrencyCode1.currencyCodeDesc ="sample data1";
ciebCurrencyCode1.currencyCode ="sample data1";

var ciebCurrencyCode2 = new CiebCurrencyCode();
ciebCurrencyCode2.djCountryDesc ="sample data2";
ciebCurrencyCode2.defaultTransPaymentCode ="sample data2";
ciebCurrencyCode2.updateProcess ="sample data2";
ciebCurrencyCode2.updateUser ="sample data2";
ciebCurrencyCode2.updateDatetime =new Date('2010-01-01');
ciebCurrencyCode2.insertProcess ="sample data2";
ciebCurrencyCode2.insertUser ="sample data2";
ciebCurrencyCode2.insertDatetime =new Date('2010-01-01');
ciebCurrencyCode2.activeInd ="sample data2";
ciebCurrencyCode2.incomingOnlyInd ="sample data2";
ciebCurrencyCode2.wholeCurrencyInd ="sample data2";
ciebCurrencyCode2.euroInd ="sample data2";
ciebCurrencyCode2.currencyCodeDesc ="sample data2";
ciebCurrencyCode2.currencyCode ="sample data2";

var ciebCurrencyCode3 = new CiebCurrencyCode();
ciebCurrencyCode3.djCountryDesc ="sample data3";
ciebCurrencyCode3.defaultTransPaymentCode ="sample data3";
ciebCurrencyCode3.updateProcess ="sample data3";
ciebCurrencyCode3.updateUser ="sample data3";
ciebCurrencyCode3.updateDatetime =new Date('2010-01-01');
ciebCurrencyCode3.insertProcess ="sample data3";
ciebCurrencyCode3.insertUser ="sample data3";
ciebCurrencyCode3.insertDatetime =new Date('2010-01-01');
ciebCurrencyCode3.activeInd ="sample data3";
ciebCurrencyCode3.incomingOnlyInd ="sample data3";
ciebCurrencyCode3.wholeCurrencyInd ="sample data3";
ciebCurrencyCode3.euroInd ="sample data3";
ciebCurrencyCode3.currencyCodeDesc ="sample data3";
ciebCurrencyCode3.currencyCode ="sample data3";


export const CiebCurrencyCodes: CiebCurrencyCode[] = [
    ciebCurrencyCode1,
    ciebCurrencyCode2,
    ciebCurrencyCode3,
];