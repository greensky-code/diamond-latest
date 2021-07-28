/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AccountsPayableDetail} from "../../api-models"

var accountsPayableDetail1 = new AccountsPayableDetail();
accountsPayableDetail1.updateProcess ="sample data1";
accountsPayableDetail1.updateUser ="sample data1";
accountsPayableDetail1.updateDatetime =new Date('2010-01-01');
accountsPayableDetail1.insertProcess ="sample data1";
accountsPayableDetail1.insertUser ="sample data1";
accountsPayableDetail1.insertDatetime =new Date('2010-01-01');
accountsPayableDetail1.offsetSeqVadpyDtl =123;
accountsPayableDetail1.securityCode ="sample data1";
accountsPayableDetail1.checkEftAmount =123;
accountsPayableDetail1.offsetFlag ="sample data1";
accountsPayableDetail1.eftTransNumber ="sample data1";
accountsPayableDetail1.checkNumber ="sample data1";
accountsPayableDetail1.seqApTrans =123;

var accountsPayableDetail2 = new AccountsPayableDetail();
accountsPayableDetail2.updateProcess ="sample data2";
accountsPayableDetail2.updateUser ="sample data2";
accountsPayableDetail2.updateDatetime =new Date('2010-01-01');
accountsPayableDetail2.insertProcess ="sample data2";
accountsPayableDetail2.insertUser ="sample data2";
accountsPayableDetail2.insertDatetime =new Date('2010-01-01');
accountsPayableDetail2.offsetSeqVadpyDtl =123;
accountsPayableDetail2.securityCode ="sample data2";
accountsPayableDetail2.checkEftAmount =123;
accountsPayableDetail2.offsetFlag ="sample data2";
accountsPayableDetail2.eftTransNumber ="sample data2";
accountsPayableDetail2.checkNumber ="sample data2";
accountsPayableDetail2.seqApTrans =123;

var accountsPayableDetail3 = new AccountsPayableDetail();
accountsPayableDetail3.updateProcess ="sample data3";
accountsPayableDetail3.updateUser ="sample data3";
accountsPayableDetail3.updateDatetime =new Date('2010-01-01');
accountsPayableDetail3.insertProcess ="sample data3";
accountsPayableDetail3.insertUser ="sample data3";
accountsPayableDetail3.insertDatetime =new Date('2010-01-01');
accountsPayableDetail3.offsetSeqVadpyDtl =123;
accountsPayableDetail3.securityCode ="sample data3";
accountsPayableDetail3.checkEftAmount =123;
accountsPayableDetail3.offsetFlag ="sample data3";
accountsPayableDetail3.eftTransNumber ="sample data3";
accountsPayableDetail3.checkNumber ="sample data3";
accountsPayableDetail3.seqApTrans =123;


export const AccountsPayableDetails: AccountsPayableDetail[] = [
    accountsPayableDetail1,
    accountsPayableDetail2,
    accountsPayableDetail3,
];