/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AdministrativeFee} from "../../api-models"

var administrativeFee1 = new AdministrativeFee();
administrativeFee1.updateProcess ="sample data1";
administrativeFee1.updateUser ="sample data1";
administrativeFee1.updateDatetime =new Date('2010-01-01');
administrativeFee1.insertProcess ="sample data1";
administrativeFee1.insertUser ="sample data1";
administrativeFee1.insertDatetime =new Date('2010-01-01');
administrativeFee1.securityCode ="sample data1";
administrativeFee1.seqApTrans =123;
administrativeFee1.apStatus ="sample data1";
administrativeFee1.printFlag ="sample data1";
administrativeFee1.seqVendAddress =123;
administrativeFee1.seqVendId =123;
administrativeFee1.glRefCode ="sample data1";
administrativeFee1.companyCode ="sample data1";
administrativeFee1.amount =123;
administrativeFee1.reasonCode ="sample data1";
administrativeFee1.ruleId ="sample data1";
administrativeFee1.reverseFlag ="sample data1";
administrativeFee1.claimNumber ="sample data1";
administrativeFee1.subLineCode ="sample data1";
administrativeFee1.lineNumber =123;
administrativeFee1.seqClaimId =123;
administrativeFee1.claimType ="sample data1";
administrativeFee1.seqAdminFee =123;

var administrativeFee2 = new AdministrativeFee();
administrativeFee2.updateProcess ="sample data2";
administrativeFee2.updateUser ="sample data2";
administrativeFee2.updateDatetime =new Date('2010-01-01');
administrativeFee2.insertProcess ="sample data2";
administrativeFee2.insertUser ="sample data2";
administrativeFee2.insertDatetime =new Date('2010-01-01');
administrativeFee2.securityCode ="sample data2";
administrativeFee2.seqApTrans =123;
administrativeFee2.apStatus ="sample data2";
administrativeFee2.printFlag ="sample data2";
administrativeFee2.seqVendAddress =123;
administrativeFee2.seqVendId =123;
administrativeFee2.glRefCode ="sample data2";
administrativeFee2.companyCode ="sample data2";
administrativeFee2.amount =123;
administrativeFee2.reasonCode ="sample data2";
administrativeFee2.ruleId ="sample data2";
administrativeFee2.reverseFlag ="sample data2";
administrativeFee2.claimNumber ="sample data2";
administrativeFee2.subLineCode ="sample data2";
administrativeFee2.lineNumber =123;
administrativeFee2.seqClaimId =123;
administrativeFee2.claimType ="sample data2";
administrativeFee2.seqAdminFee =123;

var administrativeFee3 = new AdministrativeFee();
administrativeFee3.updateProcess ="sample data3";
administrativeFee3.updateUser ="sample data3";
administrativeFee3.updateDatetime =new Date('2010-01-01');
administrativeFee3.insertProcess ="sample data3";
administrativeFee3.insertUser ="sample data3";
administrativeFee3.insertDatetime =new Date('2010-01-01');
administrativeFee3.securityCode ="sample data3";
administrativeFee3.seqApTrans =123;
administrativeFee3.apStatus ="sample data3";
administrativeFee3.printFlag ="sample data3";
administrativeFee3.seqVendAddress =123;
administrativeFee3.seqVendId =123;
administrativeFee3.glRefCode ="sample data3";
administrativeFee3.companyCode ="sample data3";
administrativeFee3.amount =123;
administrativeFee3.reasonCode ="sample data3";
administrativeFee3.ruleId ="sample data3";
administrativeFee3.reverseFlag ="sample data3";
administrativeFee3.claimNumber ="sample data3";
administrativeFee3.subLineCode ="sample data3";
administrativeFee3.lineNumber =123;
administrativeFee3.seqClaimId =123;
administrativeFee3.claimType ="sample data3";
administrativeFee3.seqAdminFee =123;


export const AdministrativeFees: AdministrativeFee[] = [
    administrativeFee1,
    administrativeFee2,
    administrativeFee3,
];