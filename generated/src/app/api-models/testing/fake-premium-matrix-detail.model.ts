/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PremiumMatrixDetail} from "../../api-models"

var premiumMatrixDetail1 = new PremiumMatrixDetail();
premiumMatrixDetail1.matrixDef ="sample data1";
premiumMatrixDetail1.matrixXSeq =123;
premiumMatrixDetail1.matrixYSeq =123;
premiumMatrixDetail1.matrixRate =123;
premiumMatrixDetail1.matrixPct =123;
premiumMatrixDetail1.securityCode ="sample data1";
premiumMatrixDetail1.insertDatetime =new Date('2010-01-01');
premiumMatrixDetail1.insertUser ="sample data1";
premiumMatrixDetail1.insertProcess ="sample data1";
premiumMatrixDetail1.updateDatetime =new Date('2010-01-01');
premiumMatrixDetail1.updateUser ="sample data1";
premiumMatrixDetail1.updateProcess ="sample data1";

var premiumMatrixDetail2 = new PremiumMatrixDetail();
premiumMatrixDetail2.matrixDef ="sample data2";
premiumMatrixDetail2.matrixXSeq =123;
premiumMatrixDetail2.matrixYSeq =123;
premiumMatrixDetail2.matrixRate =123;
premiumMatrixDetail2.matrixPct =123;
premiumMatrixDetail2.securityCode ="sample data2";
premiumMatrixDetail2.insertDatetime =new Date('2010-01-01');
premiumMatrixDetail2.insertUser ="sample data2";
premiumMatrixDetail2.insertProcess ="sample data2";
premiumMatrixDetail2.updateDatetime =new Date('2010-01-01');
premiumMatrixDetail2.updateUser ="sample data2";
premiumMatrixDetail2.updateProcess ="sample data2";

var premiumMatrixDetail3 = new PremiumMatrixDetail();
premiumMatrixDetail3.matrixDef ="sample data3";
premiumMatrixDetail3.matrixXSeq =123;
premiumMatrixDetail3.matrixYSeq =123;
premiumMatrixDetail3.matrixRate =123;
premiumMatrixDetail3.matrixPct =123;
premiumMatrixDetail3.securityCode ="sample data3";
premiumMatrixDetail3.insertDatetime =new Date('2010-01-01');
premiumMatrixDetail3.insertUser ="sample data3";
premiumMatrixDetail3.insertProcess ="sample data3";
premiumMatrixDetail3.updateDatetime =new Date('2010-01-01');
premiumMatrixDetail3.updateUser ="sample data3";
premiumMatrixDetail3.updateProcess ="sample data3";


export const PremiumMatrixDetails: PremiumMatrixDetail[] = [
    premiumMatrixDetail1,
    premiumMatrixDetail2,
    premiumMatrixDetail3,
];