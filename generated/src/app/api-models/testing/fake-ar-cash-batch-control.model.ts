/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCashBatchControl} from "../../api-models"

var arCashBatchControl1 = new ArCashBatchControl();
arCashBatchControl1.seqCashBatchId =123;
arCashBatchControl1.itemCount =123;
arCashBatchControl1.batchTotal =123;
arCashBatchControl1.batchStatus ="sample data1";
arCashBatchControl1.securityCode ="sample data1";
arCashBatchControl1.insertDatetime =new Date('2010-01-01');
arCashBatchControl1.insertUser ="sample data1";
arCashBatchControl1.insertProcess ="sample data1";
arCashBatchControl1.updateDatetime =new Date('2010-01-01');
arCashBatchControl1.updateUser ="sample data1";
arCashBatchControl1.updateProcess ="sample data1";

var arCashBatchControl2 = new ArCashBatchControl();
arCashBatchControl2.seqCashBatchId =123;
arCashBatchControl2.itemCount =123;
arCashBatchControl2.batchTotal =123;
arCashBatchControl2.batchStatus ="sample data2";
arCashBatchControl2.securityCode ="sample data2";
arCashBatchControl2.insertDatetime =new Date('2010-01-01');
arCashBatchControl2.insertUser ="sample data2";
arCashBatchControl2.insertProcess ="sample data2";
arCashBatchControl2.updateDatetime =new Date('2010-01-01');
arCashBatchControl2.updateUser ="sample data2";
arCashBatchControl2.updateProcess ="sample data2";

var arCashBatchControl3 = new ArCashBatchControl();
arCashBatchControl3.seqCashBatchId =123;
arCashBatchControl3.itemCount =123;
arCashBatchControl3.batchTotal =123;
arCashBatchControl3.batchStatus ="sample data3";
arCashBatchControl3.securityCode ="sample data3";
arCashBatchControl3.insertDatetime =new Date('2010-01-01');
arCashBatchControl3.insertUser ="sample data3";
arCashBatchControl3.insertProcess ="sample data3";
arCashBatchControl3.updateDatetime =new Date('2010-01-01');
arCashBatchControl3.updateUser ="sample data3";
arCashBatchControl3.updateProcess ="sample data3";


export const ArCashBatchControls: ArCashBatchControl[] = [
    arCashBatchControl1,
    arCashBatchControl2,
    arCashBatchControl3,
];