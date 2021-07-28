/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckClearVoidSetup} from "../../api-models"

var checkClearVoidSetup1 = new CheckClearVoidSetup();
checkClearVoidSetup1.updateProcess ="sample data1";
checkClearVoidSetup1.updateUser ="sample data1";
checkClearVoidSetup1.updateDatetime =new Date('2010-01-01');
checkClearVoidSetup1.insertProcess ="sample data1";
checkClearVoidSetup1.insertUser ="sample data1";
checkClearVoidSetup1.insertDatetime =new Date('2010-01-01');
checkClearVoidSetup1.securityCode ="sample data1";
checkClearVoidSetup1.comments ="sample data1";
checkClearVoidSetup1.status ="sample data1";
checkClearVoidSetup1.daemonRequest ="sample data1";
checkClearVoidSetup1.action ="sample data1";
checkClearVoidSetup1.requestDate =new Date('2010-01-01');
checkClearVoidSetup1.requestUser ="sample data1";
checkClearVoidSetup1.seqCvsupId =123;
checkClearVoidSetup1.jobId ="sample data1";

var checkClearVoidSetup2 = new CheckClearVoidSetup();
checkClearVoidSetup2.updateProcess ="sample data2";
checkClearVoidSetup2.updateUser ="sample data2";
checkClearVoidSetup2.updateDatetime =new Date('2010-01-01');
checkClearVoidSetup2.insertProcess ="sample data2";
checkClearVoidSetup2.insertUser ="sample data2";
checkClearVoidSetup2.insertDatetime =new Date('2010-01-01');
checkClearVoidSetup2.securityCode ="sample data2";
checkClearVoidSetup2.comments ="sample data2";
checkClearVoidSetup2.status ="sample data2";
checkClearVoidSetup2.daemonRequest ="sample data2";
checkClearVoidSetup2.action ="sample data2";
checkClearVoidSetup2.requestDate =new Date('2010-01-01');
checkClearVoidSetup2.requestUser ="sample data2";
checkClearVoidSetup2.seqCvsupId =123;
checkClearVoidSetup2.jobId ="sample data2";

var checkClearVoidSetup3 = new CheckClearVoidSetup();
checkClearVoidSetup3.updateProcess ="sample data3";
checkClearVoidSetup3.updateUser ="sample data3";
checkClearVoidSetup3.updateDatetime =new Date('2010-01-01');
checkClearVoidSetup3.insertProcess ="sample data3";
checkClearVoidSetup3.insertUser ="sample data3";
checkClearVoidSetup3.insertDatetime =new Date('2010-01-01');
checkClearVoidSetup3.securityCode ="sample data3";
checkClearVoidSetup3.comments ="sample data3";
checkClearVoidSetup3.status ="sample data3";
checkClearVoidSetup3.daemonRequest ="sample data3";
checkClearVoidSetup3.action ="sample data3";
checkClearVoidSetup3.requestDate =new Date('2010-01-01');
checkClearVoidSetup3.requestUser ="sample data3";
checkClearVoidSetup3.seqCvsupId =123;
checkClearVoidSetup3.jobId ="sample data3";


export const CheckClearVoidSetups: CheckClearVoidSetup[] = [
    checkClearVoidSetup1,
    checkClearVoidSetup2,
    checkClearVoidSetup3,
];