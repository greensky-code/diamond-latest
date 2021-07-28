/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArAdjustment} from "../../api-models"

var arAdjustment1 = new ArAdjustment();
arAdjustment1.seqAradjId =123;
arAdjustment1.customerType ="sample data1";
arAdjustment1.customerId ="sample data1";
arAdjustment1.transDate =new Date('2010-01-01');
arAdjustment1.companyCode ="sample data1";
arAdjustment1.glRefCode ="sample data1";
arAdjustment1.transAmt =123;
arAdjustment1.statementStatus ="sample data1";
arAdjustment1.invoiceNo =123;
arAdjustment1.postDate =new Date('2010-01-01');
arAdjustment1.transDesc ="sample data1";
arAdjustment1.adjReason ="sample data1";
arAdjustment1.seqGpbilId =123;
arAdjustment1.securityCode ="sample data1";
arAdjustment1.insertDatetime =new Date('2010-01-01');
arAdjustment1.insertUser ="sample data1";
arAdjustment1.insertProcess ="sample data1";
arAdjustment1.updateDatetime =new Date('2010-01-01');
arAdjustment1.updateUser ="sample data1";
arAdjustment1.updateProcess ="sample data1";

var arAdjustment2 = new ArAdjustment();
arAdjustment2.seqAradjId =123;
arAdjustment2.customerType ="sample data2";
arAdjustment2.customerId ="sample data2";
arAdjustment2.transDate =new Date('2010-01-01');
arAdjustment2.companyCode ="sample data2";
arAdjustment2.glRefCode ="sample data2";
arAdjustment2.transAmt =123;
arAdjustment2.statementStatus ="sample data2";
arAdjustment2.invoiceNo =123;
arAdjustment2.postDate =new Date('2010-01-01');
arAdjustment2.transDesc ="sample data2";
arAdjustment2.adjReason ="sample data2";
arAdjustment2.seqGpbilId =123;
arAdjustment2.securityCode ="sample data2";
arAdjustment2.insertDatetime =new Date('2010-01-01');
arAdjustment2.insertUser ="sample data2";
arAdjustment2.insertProcess ="sample data2";
arAdjustment2.updateDatetime =new Date('2010-01-01');
arAdjustment2.updateUser ="sample data2";
arAdjustment2.updateProcess ="sample data2";

var arAdjustment3 = new ArAdjustment();
arAdjustment3.seqAradjId =123;
arAdjustment3.customerType ="sample data3";
arAdjustment3.customerId ="sample data3";
arAdjustment3.transDate =new Date('2010-01-01');
arAdjustment3.companyCode ="sample data3";
arAdjustment3.glRefCode ="sample data3";
arAdjustment3.transAmt =123;
arAdjustment3.statementStatus ="sample data3";
arAdjustment3.invoiceNo =123;
arAdjustment3.postDate =new Date('2010-01-01');
arAdjustment3.transDesc ="sample data3";
arAdjustment3.adjReason ="sample data3";
arAdjustment3.seqGpbilId =123;
arAdjustment3.securityCode ="sample data3";
arAdjustment3.insertDatetime =new Date('2010-01-01');
arAdjustment3.insertUser ="sample data3";
arAdjustment3.insertProcess ="sample data3";
arAdjustment3.updateDatetime =new Date('2010-01-01');
arAdjustment3.updateUser ="sample data3";
arAdjustment3.updateProcess ="sample data3";


export const ArAdjustments: ArAdjustment[] = [
    arAdjustment1,
    arAdjustment2,
    arAdjustment3,
];