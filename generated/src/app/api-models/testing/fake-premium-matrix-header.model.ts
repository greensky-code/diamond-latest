/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremiumMatrixHeader} from "../../api-models"

var premiumMatrixHeader1 = new PremiumMatrixHeader();
premiumMatrixHeader1.matrixDef ="sample data1";
premiumMatrixHeader1.matrixDescription ="sample data1";
premiumMatrixHeader1.matrixCalcMethod ="sample data1";
premiumMatrixHeader1.matrixDeterminant ="sample data1";
premiumMatrixHeader1.securityCode ="sample data1";
premiumMatrixHeader1.insertDatetime =new Date('2010-01-01');
premiumMatrixHeader1.insertUser ="sample data1";
premiumMatrixHeader1.insertProcess ="sample data1";
premiumMatrixHeader1.updateDatetime =new Date('2010-01-01');
premiumMatrixHeader1.updateUser ="sample data1";
premiumMatrixHeader1.updateProcess ="sample data1";

var premiumMatrixHeader2 = new PremiumMatrixHeader();
premiumMatrixHeader2.matrixDef ="sample data2";
premiumMatrixHeader2.matrixDescription ="sample data2";
premiumMatrixHeader2.matrixCalcMethod ="sample data2";
premiumMatrixHeader2.matrixDeterminant ="sample data2";
premiumMatrixHeader2.securityCode ="sample data2";
premiumMatrixHeader2.insertDatetime =new Date('2010-01-01');
premiumMatrixHeader2.insertUser ="sample data2";
premiumMatrixHeader2.insertProcess ="sample data2";
premiumMatrixHeader2.updateDatetime =new Date('2010-01-01');
premiumMatrixHeader2.updateUser ="sample data2";
premiumMatrixHeader2.updateProcess ="sample data2";

var premiumMatrixHeader3 = new PremiumMatrixHeader();
premiumMatrixHeader3.matrixDef ="sample data3";
premiumMatrixHeader3.matrixDescription ="sample data3";
premiumMatrixHeader3.matrixCalcMethod ="sample data3";
premiumMatrixHeader3.matrixDeterminant ="sample data3";
premiumMatrixHeader3.securityCode ="sample data3";
premiumMatrixHeader3.insertDatetime =new Date('2010-01-01');
premiumMatrixHeader3.insertUser ="sample data3";
premiumMatrixHeader3.insertProcess ="sample data3";
premiumMatrixHeader3.updateDatetime =new Date('2010-01-01');
premiumMatrixHeader3.updateUser ="sample data3";
premiumMatrixHeader3.updateProcess ="sample data3";


export const PremiumMatrixHeaders: PremiumMatrixHeader[] = [
    premiumMatrixHeader1,
    premiumMatrixHeader2,
    premiumMatrixHeader3,
];