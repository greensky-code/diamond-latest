/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbCustFinAccts} from "../../api-models"

var pmbCustFinAccts1 = new PmbCustFinAccts();
pmbCustFinAccts1.customerType ="sample data1";
pmbCustFinAccts1.customerId ="sample data1";
pmbCustFinAccts1.acctNo ="sample data1";
pmbCustFinAccts1.effectiveFromDate =new Date('2010-01-01');
pmbCustFinAccts1.acctUse ="sample data1";
pmbCustFinAccts1.effectiveToDate =new Date('2010-01-01');
pmbCustFinAccts1.acctType ="sample data1";
pmbCustFinAccts1.routingNo =123;
pmbCustFinAccts1.acctStatus ="sample data1";
pmbCustFinAccts1.ccExpireDate =new Date('2010-01-01');
pmbCustFinAccts1.securityCode ="sample data1";
pmbCustFinAccts1.insertDatetime =new Date('2010-01-01');
pmbCustFinAccts1.insertUser ="sample data1";
pmbCustFinAccts1.insertProcess ="sample data1";
pmbCustFinAccts1.updateDatetime =new Date('2010-01-01');
pmbCustFinAccts1.updateUser ="sample data1";
pmbCustFinAccts1.updateProcess ="sample data1";

var pmbCustFinAccts2 = new PmbCustFinAccts();
pmbCustFinAccts2.customerType ="sample data2";
pmbCustFinAccts2.customerId ="sample data2";
pmbCustFinAccts2.acctNo ="sample data2";
pmbCustFinAccts2.effectiveFromDate =new Date('2010-01-01');
pmbCustFinAccts2.acctUse ="sample data2";
pmbCustFinAccts2.effectiveToDate =new Date('2010-01-01');
pmbCustFinAccts2.acctType ="sample data2";
pmbCustFinAccts2.routingNo =123;
pmbCustFinAccts2.acctStatus ="sample data2";
pmbCustFinAccts2.ccExpireDate =new Date('2010-01-01');
pmbCustFinAccts2.securityCode ="sample data2";
pmbCustFinAccts2.insertDatetime =new Date('2010-01-01');
pmbCustFinAccts2.insertUser ="sample data2";
pmbCustFinAccts2.insertProcess ="sample data2";
pmbCustFinAccts2.updateDatetime =new Date('2010-01-01');
pmbCustFinAccts2.updateUser ="sample data2";
pmbCustFinAccts2.updateProcess ="sample data2";

var pmbCustFinAccts3 = new PmbCustFinAccts();
pmbCustFinAccts3.customerType ="sample data3";
pmbCustFinAccts3.customerId ="sample data3";
pmbCustFinAccts3.acctNo ="sample data3";
pmbCustFinAccts3.effectiveFromDate =new Date('2010-01-01');
pmbCustFinAccts3.acctUse ="sample data3";
pmbCustFinAccts3.effectiveToDate =new Date('2010-01-01');
pmbCustFinAccts3.acctType ="sample data3";
pmbCustFinAccts3.routingNo =123;
pmbCustFinAccts3.acctStatus ="sample data3";
pmbCustFinAccts3.ccExpireDate =new Date('2010-01-01');
pmbCustFinAccts3.securityCode ="sample data3";
pmbCustFinAccts3.insertDatetime =new Date('2010-01-01');
pmbCustFinAccts3.insertUser ="sample data3";
pmbCustFinAccts3.insertProcess ="sample data3";
pmbCustFinAccts3.updateDatetime =new Date('2010-01-01');
pmbCustFinAccts3.updateUser ="sample data3";
pmbCustFinAccts3.updateProcess ="sample data3";


export const PmbCustFinAcctss: PmbCustFinAccts[] = [
    pmbCustFinAccts1,
    pmbCustFinAccts2,
    pmbCustFinAccts3,
];