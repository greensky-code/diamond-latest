/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AptaxReportSetup} from "../../api-models"

var aptaxReportSetup1 = new AptaxReportSetup();
aptaxReportSetup1.includeOffsets ="sample data1";
aptaxReportSetup1.includeNochecks ="sample data1";
aptaxReportSetup1.inProcess ="sample data1";
aptaxReportSetup1.template ="sample data1";
aptaxReportSetup1.updateProcess ="sample data1";
aptaxReportSetup1.updateUser ="sample data1";
aptaxReportSetup1.updateDatetime =new Date('2010-01-01');
aptaxReportSetup1.insertProcess ="sample data1";
aptaxReportSetup1.insertUser ="sample data1";
aptaxReportSetup1.insertDatetime =new Date('2010-01-01');
aptaxReportSetup1.securityCode ="sample data1";
aptaxReportSetup1.sortOptions ="sample data1";
aptaxReportSetup1.comments ="sample data1";
aptaxReportSetup1.dollarLimit =123;
aptaxReportSetup1.taxYear =new Date('2010-01-01');
aptaxReportSetup1.taxRepEntity ="sample data1";
aptaxReportSetup1.status ="sample data1";
aptaxReportSetup1.action ="sample data1";
aptaxReportSetup1.reportType ="sample data1";
aptaxReportSetup1.requestType ="sample data1";
aptaxReportSetup1.requestDatetime =new Date('2010-01-01');
aptaxReportSetup1.requestUser ="sample data1";
aptaxReportSetup1.jobId ="sample data1";
aptaxReportSetup1.seqAptaxId =123;

var aptaxReportSetup2 = new AptaxReportSetup();
aptaxReportSetup2.includeOffsets ="sample data2";
aptaxReportSetup2.includeNochecks ="sample data2";
aptaxReportSetup2.inProcess ="sample data2";
aptaxReportSetup2.template ="sample data2";
aptaxReportSetup2.updateProcess ="sample data2";
aptaxReportSetup2.updateUser ="sample data2";
aptaxReportSetup2.updateDatetime =new Date('2010-01-01');
aptaxReportSetup2.insertProcess ="sample data2";
aptaxReportSetup2.insertUser ="sample data2";
aptaxReportSetup2.insertDatetime =new Date('2010-01-01');
aptaxReportSetup2.securityCode ="sample data2";
aptaxReportSetup2.sortOptions ="sample data2";
aptaxReportSetup2.comments ="sample data2";
aptaxReportSetup2.dollarLimit =123;
aptaxReportSetup2.taxYear =new Date('2010-01-01');
aptaxReportSetup2.taxRepEntity ="sample data2";
aptaxReportSetup2.status ="sample data2";
aptaxReportSetup2.action ="sample data2";
aptaxReportSetup2.reportType ="sample data2";
aptaxReportSetup2.requestType ="sample data2";
aptaxReportSetup2.requestDatetime =new Date('2010-01-01');
aptaxReportSetup2.requestUser ="sample data2";
aptaxReportSetup2.jobId ="sample data2";
aptaxReportSetup2.seqAptaxId =123;

var aptaxReportSetup3 = new AptaxReportSetup();
aptaxReportSetup3.includeOffsets ="sample data3";
aptaxReportSetup3.includeNochecks ="sample data3";
aptaxReportSetup3.inProcess ="sample data3";
aptaxReportSetup3.template ="sample data3";
aptaxReportSetup3.updateProcess ="sample data3";
aptaxReportSetup3.updateUser ="sample data3";
aptaxReportSetup3.updateDatetime =new Date('2010-01-01');
aptaxReportSetup3.insertProcess ="sample data3";
aptaxReportSetup3.insertUser ="sample data3";
aptaxReportSetup3.insertDatetime =new Date('2010-01-01');
aptaxReportSetup3.securityCode ="sample data3";
aptaxReportSetup3.sortOptions ="sample data3";
aptaxReportSetup3.comments ="sample data3";
aptaxReportSetup3.dollarLimit =123;
aptaxReportSetup3.taxYear =new Date('2010-01-01');
aptaxReportSetup3.taxRepEntity ="sample data3";
aptaxReportSetup3.status ="sample data3";
aptaxReportSetup3.action ="sample data3";
aptaxReportSetup3.reportType ="sample data3";
aptaxReportSetup3.requestType ="sample data3";
aptaxReportSetup3.requestDatetime =new Date('2010-01-01');
aptaxReportSetup3.requestUser ="sample data3";
aptaxReportSetup3.jobId ="sample data3";
aptaxReportSetup3.seqAptaxId =123;


export const AptaxReportSetups: AptaxReportSetup[] = [
    aptaxReportSetup1,
    aptaxReportSetup2,
    aptaxReportSetup3,
];