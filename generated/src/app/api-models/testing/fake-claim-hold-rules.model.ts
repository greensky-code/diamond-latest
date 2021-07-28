/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimHoldRules} from "../../api-models"

var claimHoldRules1 = new ClaimHoldRules();
claimHoldRules1.seqClhldRule =123;
claimHoldRules1.claimType ="sample data1";
claimHoldRules1.holdRule ="sample data1";
claimHoldRules1.reasonCode ="sample data1";
claimHoldRules1.description ="sample data1";
claimHoldRules1.securityCode ="sample data1";
claimHoldRules1.insertDatetime =new Date('2010-01-01');
claimHoldRules1.insertUser ="sample data1";
claimHoldRules1.insertProcess ="sample data1";
claimHoldRules1.updateDatetime =new Date('2010-01-01');
claimHoldRules1.updateUser ="sample data1";
claimHoldRules1.updateProcess ="sample data1";

var claimHoldRules2 = new ClaimHoldRules();
claimHoldRules2.seqClhldRule =123;
claimHoldRules2.claimType ="sample data2";
claimHoldRules2.holdRule ="sample data2";
claimHoldRules2.reasonCode ="sample data2";
claimHoldRules2.description ="sample data2";
claimHoldRules2.securityCode ="sample data2";
claimHoldRules2.insertDatetime =new Date('2010-01-01');
claimHoldRules2.insertUser ="sample data2";
claimHoldRules2.insertProcess ="sample data2";
claimHoldRules2.updateDatetime =new Date('2010-01-01');
claimHoldRules2.updateUser ="sample data2";
claimHoldRules2.updateProcess ="sample data2";

var claimHoldRules3 = new ClaimHoldRules();
claimHoldRules3.seqClhldRule =123;
claimHoldRules3.claimType ="sample data3";
claimHoldRules3.holdRule ="sample data3";
claimHoldRules3.reasonCode ="sample data3";
claimHoldRules3.description ="sample data3";
claimHoldRules3.securityCode ="sample data3";
claimHoldRules3.insertDatetime =new Date('2010-01-01');
claimHoldRules3.insertUser ="sample data3";
claimHoldRules3.insertProcess ="sample data3";
claimHoldRules3.updateDatetime =new Date('2010-01-01');
claimHoldRules3.updateUser ="sample data3";
claimHoldRules3.updateProcess ="sample data3";


export const ClaimHoldRuleses: ClaimHoldRules[] = [
    claimHoldRules1,
    claimHoldRules2,
    claimHoldRules3,
];