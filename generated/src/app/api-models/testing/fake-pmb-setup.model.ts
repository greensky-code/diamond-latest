/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbSetup} from "../../api-models"

var pmbSetup1 = new PmbSetup();
pmbSetup1.seqGpbilId =123;
pmbSetup1.jobId ="sample data1";
pmbSetup1.requestUser ="sample data1";
pmbSetup1.requestDate =new Date('2010-01-01');
pmbSetup1.requestType ="sample data1";
pmbSetup1.action ="sample data1";
pmbSetup1.billThruRequestDate =new Date('2010-01-01');
pmbSetup1.billingType ="sample data1";
pmbSetup1.billJobType ="sample data1";
pmbSetup1.billingCycle ="sample data1";
pmbSetup1.postDate =new Date('2010-01-01');
pmbSetup1.template ="sample data1";
pmbSetup1.daemonRequest ="sample data1";
pmbSetup1.status ="sample data1";
pmbSetup1.comments ="sample data1";
pmbSetup1.inProcess ="sample data1";
pmbSetup1.securityCode ="sample data1";
pmbSetup1.insertDatetime =new Date('2010-01-01');
pmbSetup1.insertUser ="sample data1";
pmbSetup1.insertProcess ="sample data1";
pmbSetup1.updateDatetime =new Date('2010-01-01');
pmbSetup1.updateUser ="sample data1";
pmbSetup1.updateProcess ="sample data1";
pmbSetup1.subscFlag ="sample data1";

var pmbSetup2 = new PmbSetup();
pmbSetup2.seqGpbilId =123;
pmbSetup2.jobId ="sample data2";
pmbSetup2.requestUser ="sample data2";
pmbSetup2.requestDate =new Date('2010-01-01');
pmbSetup2.requestType ="sample data2";
pmbSetup2.action ="sample data2";
pmbSetup2.billThruRequestDate =new Date('2010-01-01');
pmbSetup2.billingType ="sample data2";
pmbSetup2.billJobType ="sample data2";
pmbSetup2.billingCycle ="sample data2";
pmbSetup2.postDate =new Date('2010-01-01');
pmbSetup2.template ="sample data2";
pmbSetup2.daemonRequest ="sample data2";
pmbSetup2.status ="sample data2";
pmbSetup2.comments ="sample data2";
pmbSetup2.inProcess ="sample data2";
pmbSetup2.securityCode ="sample data2";
pmbSetup2.insertDatetime =new Date('2010-01-01');
pmbSetup2.insertUser ="sample data2";
pmbSetup2.insertProcess ="sample data2";
pmbSetup2.updateDatetime =new Date('2010-01-01');
pmbSetup2.updateUser ="sample data2";
pmbSetup2.updateProcess ="sample data2";
pmbSetup2.subscFlag ="sample data2";

var pmbSetup3 = new PmbSetup();
pmbSetup3.seqGpbilId =123;
pmbSetup3.jobId ="sample data3";
pmbSetup3.requestUser ="sample data3";
pmbSetup3.requestDate =new Date('2010-01-01');
pmbSetup3.requestType ="sample data3";
pmbSetup3.action ="sample data3";
pmbSetup3.billThruRequestDate =new Date('2010-01-01');
pmbSetup3.billingType ="sample data3";
pmbSetup3.billJobType ="sample data3";
pmbSetup3.billingCycle ="sample data3";
pmbSetup3.postDate =new Date('2010-01-01');
pmbSetup3.template ="sample data3";
pmbSetup3.daemonRequest ="sample data3";
pmbSetup3.status ="sample data3";
pmbSetup3.comments ="sample data3";
pmbSetup3.inProcess ="sample data3";
pmbSetup3.securityCode ="sample data3";
pmbSetup3.insertDatetime =new Date('2010-01-01');
pmbSetup3.insertUser ="sample data3";
pmbSetup3.insertProcess ="sample data3";
pmbSetup3.updateDatetime =new Date('2010-01-01');
pmbSetup3.updateUser ="sample data3";
pmbSetup3.updateProcess ="sample data3";
pmbSetup3.subscFlag ="sample data3";


export const PmbSetups: PmbSetup[] = [
    pmbSetup1,
    pmbSetup2,
    pmbSetup3,
];