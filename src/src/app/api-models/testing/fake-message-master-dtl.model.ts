/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MessageMasterDtl} from "../../api-models"

var messageMasterDtl1 = new MessageMasterDtl();
messageMasterDtl1.messageId =123;
messageMasterDtl1.languageId =123;
messageMasterDtl1.messageText ="sample data1";
messageMasterDtl1.securityCode ="sample data1";
messageMasterDtl1.insertDatetime =new Date('2010-01-01');
messageMasterDtl1.insertUser ="sample data1";
messageMasterDtl1.insertProcess ="sample data1";
messageMasterDtl1.updateDatetime =new Date('2010-01-01');
messageMasterDtl1.updateUser ="sample data1";
messageMasterDtl1.updateProcess ="sample data1";

var messageMasterDtl2 = new MessageMasterDtl();
messageMasterDtl2.messageId =123;
messageMasterDtl2.languageId =123;
messageMasterDtl2.messageText ="sample data2";
messageMasterDtl2.securityCode ="sample data2";
messageMasterDtl2.insertDatetime =new Date('2010-01-01');
messageMasterDtl2.insertUser ="sample data2";
messageMasterDtl2.insertProcess ="sample data2";
messageMasterDtl2.updateDatetime =new Date('2010-01-01');
messageMasterDtl2.updateUser ="sample data2";
messageMasterDtl2.updateProcess ="sample data2";

var messageMasterDtl3 = new MessageMasterDtl();
messageMasterDtl3.messageId =123;
messageMasterDtl3.languageId =123;
messageMasterDtl3.messageText ="sample data3";
messageMasterDtl3.securityCode ="sample data3";
messageMasterDtl3.insertDatetime =new Date('2010-01-01');
messageMasterDtl3.insertUser ="sample data3";
messageMasterDtl3.insertProcess ="sample data3";
messageMasterDtl3.updateDatetime =new Date('2010-01-01');
messageMasterDtl3.updateUser ="sample data3";
messageMasterDtl3.updateProcess ="sample data3";


export const MessageMasterDtls: MessageMasterDtl[] = [
    messageMasterDtl1,
    messageMasterDtl2,
    messageMasterDtl3,
];