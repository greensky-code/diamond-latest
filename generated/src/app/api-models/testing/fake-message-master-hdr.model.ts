/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MessageMasterHdr} from "../../api-models"

var messageMasterHdr1 = new MessageMasterHdr();
messageMasterHdr1.messageId =123;
messageMasterHdr1.messageType ="sample data1";
messageMasterHdr1.messageLevel =123;
messageMasterHdr1.frontEndMessage ="sample data1";
messageMasterHdr1.replacementText =123;
messageMasterHdr1.displayMessage ="sample data1";
messageMasterHdr1.retainMessage ="sample data1";
messageMasterHdr1.messageOptions ="sample data1";
messageMasterHdr1.defaultMessage ="sample data1";
messageMasterHdr1.securityCode ="sample data1";
messageMasterHdr1.insertDatetime =new Date('2010-01-01');
messageMasterHdr1.insertUser ="sample data1";
messageMasterHdr1.insertProcess ="sample data1";
messageMasterHdr1.updateDatetime =new Date('2010-01-01');
messageMasterHdr1.updateUser ="sample data1";
messageMasterHdr1.updateProcess ="sample data1";
messageMasterHdr1.uncleanFlag ="sample data1";

var messageMasterHdr2 = new MessageMasterHdr();
messageMasterHdr2.messageId =123;
messageMasterHdr2.messageType ="sample data2";
messageMasterHdr2.messageLevel =123;
messageMasterHdr2.frontEndMessage ="sample data2";
messageMasterHdr2.replacementText =123;
messageMasterHdr2.displayMessage ="sample data2";
messageMasterHdr2.retainMessage ="sample data2";
messageMasterHdr2.messageOptions ="sample data2";
messageMasterHdr2.defaultMessage ="sample data2";
messageMasterHdr2.securityCode ="sample data2";
messageMasterHdr2.insertDatetime =new Date('2010-01-01');
messageMasterHdr2.insertUser ="sample data2";
messageMasterHdr2.insertProcess ="sample data2";
messageMasterHdr2.updateDatetime =new Date('2010-01-01');
messageMasterHdr2.updateUser ="sample data2";
messageMasterHdr2.updateProcess ="sample data2";
messageMasterHdr2.uncleanFlag ="sample data2";

var messageMasterHdr3 = new MessageMasterHdr();
messageMasterHdr3.messageId =123;
messageMasterHdr3.messageType ="sample data3";
messageMasterHdr3.messageLevel =123;
messageMasterHdr3.frontEndMessage ="sample data3";
messageMasterHdr3.replacementText =123;
messageMasterHdr3.displayMessage ="sample data3";
messageMasterHdr3.retainMessage ="sample data3";
messageMasterHdr3.messageOptions ="sample data3";
messageMasterHdr3.defaultMessage ="sample data3";
messageMasterHdr3.securityCode ="sample data3";
messageMasterHdr3.insertDatetime =new Date('2010-01-01');
messageMasterHdr3.insertUser ="sample data3";
messageMasterHdr3.insertProcess ="sample data3";
messageMasterHdr3.updateDatetime =new Date('2010-01-01');
messageMasterHdr3.updateUser ="sample data3";
messageMasterHdr3.updateProcess ="sample data3";
messageMasterHdr3.uncleanFlag ="sample data3";


export const MessageMasterHdrs: MessageMasterHdr[] = [
    messageMasterHdr1,
    messageMasterHdr2,
    messageMasterHdr3,
];