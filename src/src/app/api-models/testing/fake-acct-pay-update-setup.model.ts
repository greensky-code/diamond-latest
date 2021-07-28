/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AcctPayUpdateSetup} from "../../api-models"

var acctPayUpdateSetup1 = new AcctPayUpdateSetup();
acctPayUpdateSetup1.seqApupdId =123;
acctPayUpdateSetup1.jobId ="sample data1";
acctPayUpdateSetup1.requestUser ="sample data1";
acctPayUpdateSetup1.requestDate =new Date('2010-01-01');
acctPayUpdateSetup1.requestType ="sample data1";
acctPayUpdateSetup1.action ="sample data1";
acctPayUpdateSetup1.printChoice ="sample data1";
acctPayUpdateSetup1.postMonth =new Date('2010-01-01');
acctPayUpdateSetup1.payableType ="sample data1";
acctPayUpdateSetup1.companyCode ="sample data1";
acctPayUpdateSetup1.seqVendId =123;
acctPayUpdateSetup1.upToAmt =123;
acctPayUpdateSetup1.fromReceivedDate =new Date('2010-01-01');
acctPayUpdateSetup1.thruReceivedDate =new Date('2010-01-01');
acctPayUpdateSetup1.fromEnteredDate =new Date('2010-01-01');
acctPayUpdateSetup1.thruEnteredDate =new Date('2010-01-01');
acctPayUpdateSetup1.fromDueDate =new Date('2010-01-01');
acctPayUpdateSetup1.thruDueDate =new Date('2010-01-01');
acctPayUpdateSetup1.status ="sample data1";
acctPayUpdateSetup1.comments ="sample data1";
acctPayUpdateSetup1.securityCode ="sample data1";
acctPayUpdateSetup1.insertDatetime =new Date('2010-01-01');
acctPayUpdateSetup1.insertUser ="sample data1";
acctPayUpdateSetup1.insertProcess ="sample data1";
acctPayUpdateSetup1.updateDatetime =new Date('2010-01-01');
acctPayUpdateSetup1.updateUser ="sample data1";
acctPayUpdateSetup1.updateProcess ="sample data1";
acctPayUpdateSetup1.template ="sample data1";
acctPayUpdateSetup1.inProcess ="sample data1";
acctPayUpdateSetup1.actionType ="sample data1";
acctPayUpdateSetup1.apupdFlg ="sample data1";
acctPayUpdateSetup1.includeFinal ="sample data1";
acctPayUpdateSetup1.adminFeeInd ="sample data1";

var acctPayUpdateSetup2 = new AcctPayUpdateSetup();
acctPayUpdateSetup2.seqApupdId =123;
acctPayUpdateSetup2.jobId ="sample data2";
acctPayUpdateSetup2.requestUser ="sample data2";
acctPayUpdateSetup2.requestDate =new Date('2010-01-01');
acctPayUpdateSetup2.requestType ="sample data2";
acctPayUpdateSetup2.action ="sample data2";
acctPayUpdateSetup2.printChoice ="sample data2";
acctPayUpdateSetup2.postMonth =new Date('2010-01-01');
acctPayUpdateSetup2.payableType ="sample data2";
acctPayUpdateSetup2.companyCode ="sample data2";
acctPayUpdateSetup2.seqVendId =123;
acctPayUpdateSetup2.upToAmt =123;
acctPayUpdateSetup2.fromReceivedDate =new Date('2010-01-01');
acctPayUpdateSetup2.thruReceivedDate =new Date('2010-01-01');
acctPayUpdateSetup2.fromEnteredDate =new Date('2010-01-01');
acctPayUpdateSetup2.thruEnteredDate =new Date('2010-01-01');
acctPayUpdateSetup2.fromDueDate =new Date('2010-01-01');
acctPayUpdateSetup2.thruDueDate =new Date('2010-01-01');
acctPayUpdateSetup2.status ="sample data2";
acctPayUpdateSetup2.comments ="sample data2";
acctPayUpdateSetup2.securityCode ="sample data2";
acctPayUpdateSetup2.insertDatetime =new Date('2010-01-01');
acctPayUpdateSetup2.insertUser ="sample data2";
acctPayUpdateSetup2.insertProcess ="sample data2";
acctPayUpdateSetup2.updateDatetime =new Date('2010-01-01');
acctPayUpdateSetup2.updateUser ="sample data2";
acctPayUpdateSetup2.updateProcess ="sample data2";
acctPayUpdateSetup2.template ="sample data2";
acctPayUpdateSetup2.inProcess ="sample data2";
acctPayUpdateSetup2.actionType ="sample data2";
acctPayUpdateSetup2.apupdFlg ="sample data2";
acctPayUpdateSetup2.includeFinal ="sample data2";
acctPayUpdateSetup2.adminFeeInd ="sample data2";

var acctPayUpdateSetup3 = new AcctPayUpdateSetup();
acctPayUpdateSetup3.seqApupdId =123;
acctPayUpdateSetup3.jobId ="sample data3";
acctPayUpdateSetup3.requestUser ="sample data3";
acctPayUpdateSetup3.requestDate =new Date('2010-01-01');
acctPayUpdateSetup3.requestType ="sample data3";
acctPayUpdateSetup3.action ="sample data3";
acctPayUpdateSetup3.printChoice ="sample data3";
acctPayUpdateSetup3.postMonth =new Date('2010-01-01');
acctPayUpdateSetup3.payableType ="sample data3";
acctPayUpdateSetup3.companyCode ="sample data3";
acctPayUpdateSetup3.seqVendId =123;
acctPayUpdateSetup3.upToAmt =123;
acctPayUpdateSetup3.fromReceivedDate =new Date('2010-01-01');
acctPayUpdateSetup3.thruReceivedDate =new Date('2010-01-01');
acctPayUpdateSetup3.fromEnteredDate =new Date('2010-01-01');
acctPayUpdateSetup3.thruEnteredDate =new Date('2010-01-01');
acctPayUpdateSetup3.fromDueDate =new Date('2010-01-01');
acctPayUpdateSetup3.thruDueDate =new Date('2010-01-01');
acctPayUpdateSetup3.status ="sample data3";
acctPayUpdateSetup3.comments ="sample data3";
acctPayUpdateSetup3.securityCode ="sample data3";
acctPayUpdateSetup3.insertDatetime =new Date('2010-01-01');
acctPayUpdateSetup3.insertUser ="sample data3";
acctPayUpdateSetup3.insertProcess ="sample data3";
acctPayUpdateSetup3.updateDatetime =new Date('2010-01-01');
acctPayUpdateSetup3.updateUser ="sample data3";
acctPayUpdateSetup3.updateProcess ="sample data3";
acctPayUpdateSetup3.template ="sample data3";
acctPayUpdateSetup3.inProcess ="sample data3";
acctPayUpdateSetup3.actionType ="sample data3";
acctPayUpdateSetup3.apupdFlg ="sample data3";
acctPayUpdateSetup3.includeFinal ="sample data3";
acctPayUpdateSetup3.adminFeeInd ="sample data3";


export const AcctPayUpdateSetups: AcctPayUpdateSetup[] = [
    acctPayUpdateSetup1,
    acctPayUpdateSetup2,
    acctPayUpdateSetup3,
];