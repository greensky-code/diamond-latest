/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimHoldDeterValues} from "../../api-models"

var claimHoldDeterValues1 = new ClaimHoldDeterValues();
claimHoldDeterValues1.seqClhldRule =123;
claimHoldDeterValues1.determinantColumnNo =123;
claimHoldDeterValues1.determinantValueNo =123;
claimHoldDeterValues1.detFromValue ="sample data1";
claimHoldDeterValues1.detThruValue ="sample data1";
claimHoldDeterValues1.securityCode ="sample data1";
claimHoldDeterValues1.insertDatetime =new Date('2010-01-01');
claimHoldDeterValues1.insertUser ="sample data1";
claimHoldDeterValues1.insertProcess ="sample data1";
claimHoldDeterValues1.updateDatetime =new Date('2010-01-01');
claimHoldDeterValues1.updateUser ="sample data1";
claimHoldDeterValues1.updateProcess ="sample data1";

var claimHoldDeterValues2 = new ClaimHoldDeterValues();
claimHoldDeterValues2.seqClhldRule =123;
claimHoldDeterValues2.determinantColumnNo =123;
claimHoldDeterValues2.determinantValueNo =123;
claimHoldDeterValues2.detFromValue ="sample data2";
claimHoldDeterValues2.detThruValue ="sample data2";
claimHoldDeterValues2.securityCode ="sample data2";
claimHoldDeterValues2.insertDatetime =new Date('2010-01-01');
claimHoldDeterValues2.insertUser ="sample data2";
claimHoldDeterValues2.insertProcess ="sample data2";
claimHoldDeterValues2.updateDatetime =new Date('2010-01-01');
claimHoldDeterValues2.updateUser ="sample data2";
claimHoldDeterValues2.updateProcess ="sample data2";

var claimHoldDeterValues3 = new ClaimHoldDeterValues();
claimHoldDeterValues3.seqClhldRule =123;
claimHoldDeterValues3.determinantColumnNo =123;
claimHoldDeterValues3.determinantValueNo =123;
claimHoldDeterValues3.detFromValue ="sample data3";
claimHoldDeterValues3.detThruValue ="sample data3";
claimHoldDeterValues3.securityCode ="sample data3";
claimHoldDeterValues3.insertDatetime =new Date('2010-01-01');
claimHoldDeterValues3.insertUser ="sample data3";
claimHoldDeterValues3.insertProcess ="sample data3";
claimHoldDeterValues3.updateDatetime =new Date('2010-01-01');
claimHoldDeterValues3.updateUser ="sample data3";
claimHoldDeterValues3.updateProcess ="sample data3";


export const ClaimHoldDeterValueses: ClaimHoldDeterValues[] = [
    claimHoldDeterValues1,
    claimHoldDeterValues2,
    claimHoldDeterValues3,
];