/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ArCashReceipt} from "../../api-models"

var arCashReceipt1 = new ArCashReceipt();
arCashReceipt1.seqCashReceipt =123;
arCashReceipt1.customerType ="sample data1";
arCashReceipt1.customerId ="sample data1";
arCashReceipt1.transDate =new Date('2010-01-01');
arCashReceipt1.transNo ="sample data1";
arCashReceipt1.transReceiptDate =new Date('2010-01-01');
arCashReceipt1.transactionType ="sample data1";
arCashReceipt1.companyCode ="sample data1";
arCashReceipt1.glRefCode ="sample data1";
arCashReceipt1.transAmt =123;
arCashReceipt1.subscriberId ="sample data1";
arCashReceipt1.description ="sample data1";
arCashReceipt1.seqCashBatchId =123;
arCashReceipt1.statementStatus ="sample data1";
arCashReceipt1.invoiceNo =123;
arCashReceipt1.postDate =new Date('2010-01-01');
arCashReceipt1.seqGpbilId =123;
arCashReceipt1.securityCode ="sample data1";
arCashReceipt1.insertDatetime =new Date('2010-01-01');
arCashReceipt1.insertUser ="sample data1";
arCashReceipt1.insertProcess ="sample data1";
arCashReceipt1.updateDatetime =new Date('2010-01-01');
arCashReceipt1.updateUser ="sample data1";
arCashReceipt1.updateProcess ="sample data1";

var arCashReceipt2 = new ArCashReceipt();
arCashReceipt2.seqCashReceipt =123;
arCashReceipt2.customerType ="sample data2";
arCashReceipt2.customerId ="sample data2";
arCashReceipt2.transDate =new Date('2010-01-01');
arCashReceipt2.transNo ="sample data2";
arCashReceipt2.transReceiptDate =new Date('2010-01-01');
arCashReceipt2.transactionType ="sample data2";
arCashReceipt2.companyCode ="sample data2";
arCashReceipt2.glRefCode ="sample data2";
arCashReceipt2.transAmt =123;
arCashReceipt2.subscriberId ="sample data2";
arCashReceipt2.description ="sample data2";
arCashReceipt2.seqCashBatchId =123;
arCashReceipt2.statementStatus ="sample data2";
arCashReceipt2.invoiceNo =123;
arCashReceipt2.postDate =new Date('2010-01-01');
arCashReceipt2.seqGpbilId =123;
arCashReceipt2.securityCode ="sample data2";
arCashReceipt2.insertDatetime =new Date('2010-01-01');
arCashReceipt2.insertUser ="sample data2";
arCashReceipt2.insertProcess ="sample data2";
arCashReceipt2.updateDatetime =new Date('2010-01-01');
arCashReceipt2.updateUser ="sample data2";
arCashReceipt2.updateProcess ="sample data2";

var arCashReceipt3 = new ArCashReceipt();
arCashReceipt3.seqCashReceipt =123;
arCashReceipt3.customerType ="sample data3";
arCashReceipt3.customerId ="sample data3";
arCashReceipt3.transDate =new Date('2010-01-01');
arCashReceipt3.transNo ="sample data3";
arCashReceipt3.transReceiptDate =new Date('2010-01-01');
arCashReceipt3.transactionType ="sample data3";
arCashReceipt3.companyCode ="sample data3";
arCashReceipt3.glRefCode ="sample data3";
arCashReceipt3.transAmt =123;
arCashReceipt3.subscriberId ="sample data3";
arCashReceipt3.description ="sample data3";
arCashReceipt3.seqCashBatchId =123;
arCashReceipt3.statementStatus ="sample data3";
arCashReceipt3.invoiceNo =123;
arCashReceipt3.postDate =new Date('2010-01-01');
arCashReceipt3.seqGpbilId =123;
arCashReceipt3.securityCode ="sample data3";
arCashReceipt3.insertDatetime =new Date('2010-01-01');
arCashReceipt3.insertUser ="sample data3";
arCashReceipt3.insertProcess ="sample data3";
arCashReceipt3.updateDatetime =new Date('2010-01-01');
arCashReceipt3.updateUser ="sample data3";
arCashReceipt3.updateProcess ="sample data3";


export const ArCashReceipts: ArCashReceipt[] = [
    arCashReceipt1,
    arCashReceipt2,
    arCashReceipt3,
];