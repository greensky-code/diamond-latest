/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceDeterminant} from "../../api-models"

var priceDeterminant1 = new PriceDeterminant();
priceDeterminant1.priceDeterminant ="sample data1";
priceDeterminant1.seqPriceDeterm =123;
priceDeterminant1.columnName ="sample data1";
priceDeterminant1.columnOccurrence =123;
priceDeterminant1.operator ="sample data1";
priceDeterminant1.fromValue ="sample data1";
priceDeterminant1.thruValue ="sample data1";
priceDeterminant1.securityCode ="sample data1";
priceDeterminant1.insertDatetime =new Date('2010-01-01');
priceDeterminant1.insertUser ="sample data1";
priceDeterminant1.insertProcess ="sample data1";
priceDeterminant1.updateDatetime =new Date('2010-01-01');
priceDeterminant1.updateUser ="sample data1";
priceDeterminant1.updateProcess ="sample data1";
priceDeterminant1.columnType ="sample data1";
priceDeterminant1.deterFromDate =new Date('2010-01-01');
priceDeterminant1.deterThruDate =new Date('2010-01-01');

var priceDeterminant2 = new PriceDeterminant();
priceDeterminant2.priceDeterminant ="sample data2";
priceDeterminant2.seqPriceDeterm =123;
priceDeterminant2.columnName ="sample data2";
priceDeterminant2.columnOccurrence =123;
priceDeterminant2.operator ="sample data2";
priceDeterminant2.fromValue ="sample data2";
priceDeterminant2.thruValue ="sample data2";
priceDeterminant2.securityCode ="sample data2";
priceDeterminant2.insertDatetime =new Date('2010-01-01');
priceDeterminant2.insertUser ="sample data2";
priceDeterminant2.insertProcess ="sample data2";
priceDeterminant2.updateDatetime =new Date('2010-01-01');
priceDeterminant2.updateUser ="sample data2";
priceDeterminant2.updateProcess ="sample data2";
priceDeterminant2.columnType ="sample data2";
priceDeterminant2.deterFromDate =new Date('2010-01-01');
priceDeterminant2.deterThruDate =new Date('2010-01-01');

var priceDeterminant3 = new PriceDeterminant();
priceDeterminant3.priceDeterminant ="sample data3";
priceDeterminant3.seqPriceDeterm =123;
priceDeterminant3.columnName ="sample data3";
priceDeterminant3.columnOccurrence =123;
priceDeterminant3.operator ="sample data3";
priceDeterminant3.fromValue ="sample data3";
priceDeterminant3.thruValue ="sample data3";
priceDeterminant3.securityCode ="sample data3";
priceDeterminant3.insertDatetime =new Date('2010-01-01');
priceDeterminant3.insertUser ="sample data3";
priceDeterminant3.insertProcess ="sample data3";
priceDeterminant3.updateDatetime =new Date('2010-01-01');
priceDeterminant3.updateUser ="sample data3";
priceDeterminant3.updateProcess ="sample data3";
priceDeterminant3.columnType ="sample data3";
priceDeterminant3.deterFromDate =new Date('2010-01-01');
priceDeterminant3.deterThruDate =new Date('2010-01-01');


export const PriceDeterminants: PriceDeterminant[] = [
    priceDeterminant1,
    priceDeterminant2,
    priceDeterminant3,
];