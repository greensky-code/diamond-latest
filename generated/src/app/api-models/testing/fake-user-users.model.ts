/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { UserUsers} from "../../api-models"

var userUsers1 = new UserUsers();
userUsers1.username ="sample data1";
userUsers1.userId =123;
userUsers1.accountStatus ="sample data1";
userUsers1.lockDate =new Date('2010-01-01');
userUsers1.expiryDate =new Date('2010-01-01');
userUsers1.defaultTablespace ="sample data1";
userUsers1.temporaryTablespace ="sample data1";
userUsers1.localTempTablespace ="sample data1";
userUsers1.created =new Date('2010-01-01');
userUsers1.initialRsrcConsumerGroup ="sample data1";
userUsers1.externalName ="sample data1";
userUsers1.proxyOnlyConnect ="sample data1";
userUsers1.common ="sample data1";
userUsers1.oracleMaintained ="sample data1";
userUsers1.inherited ="sample data1";
userUsers1.defaultCollation ="sample data1";
userUsers1.implicit ="sample data1";
userUsers1.allShard ="sample data1";

var userUsers2 = new UserUsers();
userUsers2.username ="sample data2";
userUsers2.userId =123;
userUsers2.accountStatus ="sample data2";
userUsers2.lockDate =new Date('2010-01-01');
userUsers2.expiryDate =new Date('2010-01-01');
userUsers2.defaultTablespace ="sample data2";
userUsers2.temporaryTablespace ="sample data2";
userUsers2.localTempTablespace ="sample data2";
userUsers2.created =new Date('2010-01-01');
userUsers2.initialRsrcConsumerGroup ="sample data2";
userUsers2.externalName ="sample data2";
userUsers2.proxyOnlyConnect ="sample data2";
userUsers2.common ="sample data2";
userUsers2.oracleMaintained ="sample data2";
userUsers2.inherited ="sample data2";
userUsers2.defaultCollation ="sample data2";
userUsers2.implicit ="sample data2";
userUsers2.allShard ="sample data2";

var userUsers3 = new UserUsers();
userUsers3.username ="sample data3";
userUsers3.userId =123;
userUsers3.accountStatus ="sample data3";
userUsers3.lockDate =new Date('2010-01-01');
userUsers3.expiryDate =new Date('2010-01-01');
userUsers3.defaultTablespace ="sample data3";
userUsers3.temporaryTablespace ="sample data3";
userUsers3.localTempTablespace ="sample data3";
userUsers3.created =new Date('2010-01-01');
userUsers3.initialRsrcConsumerGroup ="sample data3";
userUsers3.externalName ="sample data3";
userUsers3.proxyOnlyConnect ="sample data3";
userUsers3.common ="sample data3";
userUsers3.oracleMaintained ="sample data3";
userUsers3.inherited ="sample data3";
userUsers3.defaultCollation ="sample data3";
userUsers3.implicit ="sample data3";
userUsers3.allShard ="sample data3";


export const UserUserss: UserUsers[] = [
    userUsers1,
    userUsers2,
    userUsers3,
];