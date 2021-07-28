/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncExchangeRate} from "../../api-models"

var funcExchangeRate1 = new FuncExchangeRate();
funcExchangeRate1.currencyCode ="sample data1";
funcExchangeRate1.seqGroupId =123;
funcExchangeRate1.dateValid ="sample data1";
funcExchangeRate1.conversionRate =123;
funcExchangeRate1.insertDatetime ="sample data1";
funcExchangeRate1.insertUser ="sample data1";
funcExchangeRate1.insertProcess ="sample data1";
funcExchangeRate1.updateDatetime ="sample data1";
funcExchangeRate1.updateUser ="sample data1";
funcExchangeRate1.updateProcess ="sample data1";
funcExchangeRate1.pDate ="sample data1";
funcExchangeRate1.pCurrencyCode ="sample data1";

var funcExchangeRate2 = new FuncExchangeRate();
funcExchangeRate2.currencyCode ="sample data2";
funcExchangeRate2.seqGroupId =123;
funcExchangeRate2.dateValid ="sample data2";
funcExchangeRate2.conversionRate =123;
funcExchangeRate2.insertDatetime ="sample data2";
funcExchangeRate2.insertUser ="sample data2";
funcExchangeRate2.insertProcess ="sample data2";
funcExchangeRate2.updateDatetime ="sample data2";
funcExchangeRate2.updateUser ="sample data2";
funcExchangeRate2.updateProcess ="sample data2";
funcExchangeRate2.pDate ="sample data2";
funcExchangeRate2.pCurrencyCode ="sample data2";

var funcExchangeRate3 = new FuncExchangeRate();
funcExchangeRate3.currencyCode ="sample data3";
funcExchangeRate3.seqGroupId =123;
funcExchangeRate3.dateValid ="sample data3";
funcExchangeRate3.conversionRate =123;
funcExchangeRate3.insertDatetime ="sample data3";
funcExchangeRate3.insertUser ="sample data3";
funcExchangeRate3.insertProcess ="sample data3";
funcExchangeRate3.updateDatetime ="sample data3";
funcExchangeRate3.updateUser ="sample data3";
funcExchangeRate3.updateProcess ="sample data3";
funcExchangeRate3.pDate ="sample data3";
funcExchangeRate3.pCurrencyCode ="sample data3";


export const FuncExchangeRates: FuncExchangeRate[] = [
    funcExchangeRate1,
    funcExchangeRate2,
    funcExchangeRate3,
];