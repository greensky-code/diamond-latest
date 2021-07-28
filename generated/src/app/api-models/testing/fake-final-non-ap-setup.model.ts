/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FinalNonApSetup} from "../../api-models"

var finalNonApSetup1 = new FinalNonApSetup();
finalNonApSetup1.thruReceivedDate =new Date('2010-01-01');
finalNonApSetup1.fromReceivedDate =new Date('2010-01-01');
finalNonApSetup1.companyCode ="sample data1";
finalNonApSetup1.inProcess ="sample data1";
finalNonApSetup1.template ="sample data1";
finalNonApSetup1.updateProcess ="sample data1";
finalNonApSetup1.updateUser ="sample data1";
finalNonApSetup1.updateDatetime =new Date('2010-01-01');
finalNonApSetup1.insertProcess ="sample data1";
finalNonApSetup1.insertUser ="sample data1";
finalNonApSetup1.insertDatetime =new Date('2010-01-01');
finalNonApSetup1.securityCode ="sample data1";
finalNonApSetup1.comments ="sample data1";
finalNonApSetup1.status ="sample data1";
finalNonApSetup1.thruEnteredDate =new Date('2010-01-01');
finalNonApSetup1.fromEnteredDate =new Date('2010-01-01');
finalNonApSetup1.requestType ="sample data1";
finalNonApSetup1.requestDate =new Date('2010-01-01');
finalNonApSetup1.requestUser ="sample data1";
finalNonApSetup1.jobId ="sample data1";
finalNonApSetup1.seqFinalId =123;

var finalNonApSetup2 = new FinalNonApSetup();
finalNonApSetup2.thruReceivedDate =new Date('2010-01-01');
finalNonApSetup2.fromReceivedDate =new Date('2010-01-01');
finalNonApSetup2.companyCode ="sample data2";
finalNonApSetup2.inProcess ="sample data2";
finalNonApSetup2.template ="sample data2";
finalNonApSetup2.updateProcess ="sample data2";
finalNonApSetup2.updateUser ="sample data2";
finalNonApSetup2.updateDatetime =new Date('2010-01-01');
finalNonApSetup2.insertProcess ="sample data2";
finalNonApSetup2.insertUser ="sample data2";
finalNonApSetup2.insertDatetime =new Date('2010-01-01');
finalNonApSetup2.securityCode ="sample data2";
finalNonApSetup2.comments ="sample data2";
finalNonApSetup2.status ="sample data2";
finalNonApSetup2.thruEnteredDate =new Date('2010-01-01');
finalNonApSetup2.fromEnteredDate =new Date('2010-01-01');
finalNonApSetup2.requestType ="sample data2";
finalNonApSetup2.requestDate =new Date('2010-01-01');
finalNonApSetup2.requestUser ="sample data2";
finalNonApSetup2.jobId ="sample data2";
finalNonApSetup2.seqFinalId =123;

var finalNonApSetup3 = new FinalNonApSetup();
finalNonApSetup3.thruReceivedDate =new Date('2010-01-01');
finalNonApSetup3.fromReceivedDate =new Date('2010-01-01');
finalNonApSetup3.companyCode ="sample data3";
finalNonApSetup3.inProcess ="sample data3";
finalNonApSetup3.template ="sample data3";
finalNonApSetup3.updateProcess ="sample data3";
finalNonApSetup3.updateUser ="sample data3";
finalNonApSetup3.updateDatetime =new Date('2010-01-01');
finalNonApSetup3.insertProcess ="sample data3";
finalNonApSetup3.insertUser ="sample data3";
finalNonApSetup3.insertDatetime =new Date('2010-01-01');
finalNonApSetup3.securityCode ="sample data3";
finalNonApSetup3.comments ="sample data3";
finalNonApSetup3.status ="sample data3";
finalNonApSetup3.thruEnteredDate =new Date('2010-01-01');
finalNonApSetup3.fromEnteredDate =new Date('2010-01-01');
finalNonApSetup3.requestType ="sample data3";
finalNonApSetup3.requestDate =new Date('2010-01-01');
finalNonApSetup3.requestUser ="sample data3";
finalNonApSetup3.jobId ="sample data3";
finalNonApSetup3.seqFinalId =123;


export const FinalNonApSetups: FinalNonApSetup[] = [
    finalNonApSetup1,
    finalNonApSetup2,
    finalNonApSetup3,
];