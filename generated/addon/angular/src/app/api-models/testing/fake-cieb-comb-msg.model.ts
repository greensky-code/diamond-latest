/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCombMsg} from "../../api-models"

var ciebCombMsg1 = new CiebCombMsg();
ciebCombMsg1.seqMsgId =123;
ciebCombMsg1.msgId ="sample data1";
ciebCombMsg1.message ="sample data1";
ciebCombMsg1.msgIdType ="sample data1";
ciebCombMsg1.insertDatetime =new Date('2010-01-01');
ciebCombMsg1.insertUser ="sample data1";
ciebCombMsg1.insertProcess ="sample data1";
ciebCombMsg1.updateDatetime =new Date('2010-01-01');
ciebCombMsg1.updateUser ="sample data1";
ciebCombMsg1.updateProcess ="sample data1";

var ciebCombMsg2 = new CiebCombMsg();
ciebCombMsg2.seqMsgId =123;
ciebCombMsg2.msgId ="sample data2";
ciebCombMsg2.message ="sample data2";
ciebCombMsg2.msgIdType ="sample data2";
ciebCombMsg2.insertDatetime =new Date('2010-01-01');
ciebCombMsg2.insertUser ="sample data2";
ciebCombMsg2.insertProcess ="sample data2";
ciebCombMsg2.updateDatetime =new Date('2010-01-01');
ciebCombMsg2.updateUser ="sample data2";
ciebCombMsg2.updateProcess ="sample data2";

var ciebCombMsg3 = new CiebCombMsg();
ciebCombMsg3.seqMsgId =123;
ciebCombMsg3.msgId ="sample data3";
ciebCombMsg3.message ="sample data3";
ciebCombMsg3.msgIdType ="sample data3";
ciebCombMsg3.insertDatetime =new Date('2010-01-01');
ciebCombMsg3.insertUser ="sample data3";
ciebCombMsg3.insertProcess ="sample data3";
ciebCombMsg3.updateDatetime =new Date('2010-01-01');
ciebCombMsg3.updateUser ="sample data3";
ciebCombMsg3.updateProcess ="sample data3";


export const CiebCombMsgs: CiebCombMsg[] = [
    ciebCombMsg1,
    ciebCombMsg2,
    ciebCombMsg3,
];