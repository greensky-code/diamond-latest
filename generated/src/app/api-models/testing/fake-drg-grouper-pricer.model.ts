/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DrgGrouperPricer} from "../../api-models"

var drgGrouperPricer1 = new DrgGrouperPricer();
drgGrouperPricer1.drgGrouperPricerId ="sample data1";
drgGrouperPricer1.version ="sample data1";
drgGrouperPricer1.description ="sample data1";
drgGrouperPricer1.programName ="sample data1";
drgGrouperPricer1.grouperPricerCode ="sample data1";
drgGrouperPricer1.payorCode ="sample data1";
drgGrouperPricer1.securityCode ="sample data1";
drgGrouperPricer1.insertDatetime =new Date('2010-01-01');
drgGrouperPricer1.insertUser ="sample data1";
drgGrouperPricer1.insertProcess ="sample data1";
drgGrouperPricer1.updateDatetime =new Date('2010-01-01');
drgGrouperPricer1.updateUser ="sample data1";
drgGrouperPricer1.updateProcess ="sample data1";
drgGrouperPricer1.directoryName ="sample data1";
drgGrouperPricer1.parameterId ="sample data1";
drgGrouperPricer1.pricerStateInput =123;

var drgGrouperPricer2 = new DrgGrouperPricer();
drgGrouperPricer2.drgGrouperPricerId ="sample data2";
drgGrouperPricer2.version ="sample data2";
drgGrouperPricer2.description ="sample data2";
drgGrouperPricer2.programName ="sample data2";
drgGrouperPricer2.grouperPricerCode ="sample data2";
drgGrouperPricer2.payorCode ="sample data2";
drgGrouperPricer2.securityCode ="sample data2";
drgGrouperPricer2.insertDatetime =new Date('2010-01-01');
drgGrouperPricer2.insertUser ="sample data2";
drgGrouperPricer2.insertProcess ="sample data2";
drgGrouperPricer2.updateDatetime =new Date('2010-01-01');
drgGrouperPricer2.updateUser ="sample data2";
drgGrouperPricer2.updateProcess ="sample data2";
drgGrouperPricer2.directoryName ="sample data2";
drgGrouperPricer2.parameterId ="sample data2";
drgGrouperPricer2.pricerStateInput =123;

var drgGrouperPricer3 = new DrgGrouperPricer();
drgGrouperPricer3.drgGrouperPricerId ="sample data3";
drgGrouperPricer3.version ="sample data3";
drgGrouperPricer3.description ="sample data3";
drgGrouperPricer3.programName ="sample data3";
drgGrouperPricer3.grouperPricerCode ="sample data3";
drgGrouperPricer3.payorCode ="sample data3";
drgGrouperPricer3.securityCode ="sample data3";
drgGrouperPricer3.insertDatetime =new Date('2010-01-01');
drgGrouperPricer3.insertUser ="sample data3";
drgGrouperPricer3.insertProcess ="sample data3";
drgGrouperPricer3.updateDatetime =new Date('2010-01-01');
drgGrouperPricer3.updateUser ="sample data3";
drgGrouperPricer3.updateProcess ="sample data3";
drgGrouperPricer3.directoryName ="sample data3";
drgGrouperPricer3.parameterId ="sample data3";
drgGrouperPricer3.pricerStateInput =123;


export const DrgGrouperPricers: DrgGrouperPricer[] = [
    drgGrouperPricer1,
    drgGrouperPricer2,
    drgGrouperPricer3,
];