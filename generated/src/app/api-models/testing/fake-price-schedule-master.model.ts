/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceScheduleMaster} from "../../api-models"

var priceScheduleMaster1 = new PriceScheduleMaster();
priceScheduleMaster1.priceSchedule ="sample data1";
priceScheduleMaster1.description ="sample data1";
priceScheduleMaster1.securityCode ="sample data1";
priceScheduleMaster1.insertDatetime =new Date('2010-01-01');
priceScheduleMaster1.insertUser ="sample data1";
priceScheduleMaster1.insertProcess ="sample data1";
priceScheduleMaster1.updateDatetime =new Date('2010-01-01');
priceScheduleMaster1.updateUser ="sample data1";
priceScheduleMaster1.updateProcess ="sample data1";

var priceScheduleMaster2 = new PriceScheduleMaster();
priceScheduleMaster2.priceSchedule ="sample data2";
priceScheduleMaster2.description ="sample data2";
priceScheduleMaster2.securityCode ="sample data2";
priceScheduleMaster2.insertDatetime =new Date('2010-01-01');
priceScheduleMaster2.insertUser ="sample data2";
priceScheduleMaster2.insertProcess ="sample data2";
priceScheduleMaster2.updateDatetime =new Date('2010-01-01');
priceScheduleMaster2.updateUser ="sample data2";
priceScheduleMaster2.updateProcess ="sample data2";

var priceScheduleMaster3 = new PriceScheduleMaster();
priceScheduleMaster3.priceSchedule ="sample data3";
priceScheduleMaster3.description ="sample data3";
priceScheduleMaster3.securityCode ="sample data3";
priceScheduleMaster3.insertDatetime =new Date('2010-01-01');
priceScheduleMaster3.insertUser ="sample data3";
priceScheduleMaster3.insertProcess ="sample data3";
priceScheduleMaster3.updateDatetime =new Date('2010-01-01');
priceScheduleMaster3.updateUser ="sample data3";
priceScheduleMaster3.updateProcess ="sample data3";


export const PriceScheduleMasters: PriceScheduleMaster[] = [
    priceScheduleMaster1,
    priceScheduleMaster2,
    priceScheduleMaster3,
];