/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BankAccount} from "../../api-models"

var bankAccount1 = new BankAccount();
bankAccount1.userDefined2 ="sample data1";
bankAccount1.userDefined1 ="sample data1";
bankAccount1.commissionRaTemplate ="sample data1";
bankAccount1.commissionCheckTemplate ="sample data1";
bankAccount1.accountType ="sample data1";
bankAccount1.abaRoutingNum ="sample data1";
bankAccount1.bankAccountDesc ="sample data1";
bankAccount1.bankAccountNum ="sample data1";
bankAccount1.mediEopTemplate ="sample data1";
bankAccount1.mediEobTemplate ="sample data1";
bankAccount1.updateProcess ="sample data1";
bankAccount1.updateUser ="sample data1";
bankAccount1.updateDatetime =new Date('2010-01-01');
bankAccount1.insertProcess ="sample data1";
bankAccount1.insertUser ="sample data1";
bankAccount1.insertDatetime =new Date('2010-01-01');
bankAccount1.securityCode ="sample data1";
bankAccount1.tradeRaTemplate ="sample data1";
bankAccount1.tradeCheckTemplt ="sample data1";
bankAccount1.tradeFormatCode ="sample data1";
bankAccount1.capRaTemplate ="sample data1";
bankAccount1.capCheckTemplate ="sample data1";
bankAccount1.capFormatCode ="sample data1";
bankAccount1.mediRaTemplate ="sample data1";
bankAccount1.mediCheckTemplate ="sample data1";
bankAccount1.mediFormatCode ="sample data1";
bankAccount1.glCashAccount ="sample data1";
bankAccount1.description ="sample data1";
bankAccount1.bankAccountCode ="sample data1";

var bankAccount2 = new BankAccount();
bankAccount2.userDefined2 ="sample data2";
bankAccount2.userDefined1 ="sample data2";
bankAccount2.commissionRaTemplate ="sample data2";
bankAccount2.commissionCheckTemplate ="sample data2";
bankAccount2.accountType ="sample data2";
bankAccount2.abaRoutingNum ="sample data2";
bankAccount2.bankAccountDesc ="sample data2";
bankAccount2.bankAccountNum ="sample data2";
bankAccount2.mediEopTemplate ="sample data2";
bankAccount2.mediEobTemplate ="sample data2";
bankAccount2.updateProcess ="sample data2";
bankAccount2.updateUser ="sample data2";
bankAccount2.updateDatetime =new Date('2010-01-01');
bankAccount2.insertProcess ="sample data2";
bankAccount2.insertUser ="sample data2";
bankAccount2.insertDatetime =new Date('2010-01-01');
bankAccount2.securityCode ="sample data2";
bankAccount2.tradeRaTemplate ="sample data2";
bankAccount2.tradeCheckTemplt ="sample data2";
bankAccount2.tradeFormatCode ="sample data2";
bankAccount2.capRaTemplate ="sample data2";
bankAccount2.capCheckTemplate ="sample data2";
bankAccount2.capFormatCode ="sample data2";
bankAccount2.mediRaTemplate ="sample data2";
bankAccount2.mediCheckTemplate ="sample data2";
bankAccount2.mediFormatCode ="sample data2";
bankAccount2.glCashAccount ="sample data2";
bankAccount2.description ="sample data2";
bankAccount2.bankAccountCode ="sample data2";

var bankAccount3 = new BankAccount();
bankAccount3.userDefined2 ="sample data3";
bankAccount3.userDefined1 ="sample data3";
bankAccount3.commissionRaTemplate ="sample data3";
bankAccount3.commissionCheckTemplate ="sample data3";
bankAccount3.accountType ="sample data3";
bankAccount3.abaRoutingNum ="sample data3";
bankAccount3.bankAccountDesc ="sample data3";
bankAccount3.bankAccountNum ="sample data3";
bankAccount3.mediEopTemplate ="sample data3";
bankAccount3.mediEobTemplate ="sample data3";
bankAccount3.updateProcess ="sample data3";
bankAccount3.updateUser ="sample data3";
bankAccount3.updateDatetime =new Date('2010-01-01');
bankAccount3.insertProcess ="sample data3";
bankAccount3.insertUser ="sample data3";
bankAccount3.insertDatetime =new Date('2010-01-01');
bankAccount3.securityCode ="sample data3";
bankAccount3.tradeRaTemplate ="sample data3";
bankAccount3.tradeCheckTemplt ="sample data3";
bankAccount3.tradeFormatCode ="sample data3";
bankAccount3.capRaTemplate ="sample data3";
bankAccount3.capCheckTemplate ="sample data3";
bankAccount3.capFormatCode ="sample data3";
bankAccount3.mediRaTemplate ="sample data3";
bankAccount3.mediCheckTemplate ="sample data3";
bankAccount3.mediFormatCode ="sample data3";
bankAccount3.glCashAccount ="sample data3";
bankAccount3.description ="sample data3";
bankAccount3.bankAccountCode ="sample data3";


export const BankAccounts: BankAccount[] = [
    bankAccount1,
    bankAccount2,
    bankAccount3,
];