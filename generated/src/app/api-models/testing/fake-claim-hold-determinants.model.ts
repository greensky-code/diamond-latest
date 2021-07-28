/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimHoldDeterminants} from "../../api-models"

var claimHoldDeterminants1 = new ClaimHoldDeterminants();
claimHoldDeterminants1.seqClhldRule =123;
claimHoldDeterminants1.determinantColumnNo =123;
claimHoldDeterminants1.determinantTable ="sample data1";
claimHoldDeterminants1.determinant ="sample data1";
claimHoldDeterminants1.operator ="sample data1";
claimHoldDeterminants1.securityCode ="sample data1";
claimHoldDeterminants1.insertDatetime =new Date('2010-01-01');
claimHoldDeterminants1.insertUser ="sample data1";
claimHoldDeterminants1.insertProcess ="sample data1";
claimHoldDeterminants1.updateDatetime =new Date('2010-01-01');
claimHoldDeterminants1.updateUser ="sample data1";
claimHoldDeterminants1.updateProcess ="sample data1";

var claimHoldDeterminants2 = new ClaimHoldDeterminants();
claimHoldDeterminants2.seqClhldRule =123;
claimHoldDeterminants2.determinantColumnNo =123;
claimHoldDeterminants2.determinantTable ="sample data2";
claimHoldDeterminants2.determinant ="sample data2";
claimHoldDeterminants2.operator ="sample data2";
claimHoldDeterminants2.securityCode ="sample data2";
claimHoldDeterminants2.insertDatetime =new Date('2010-01-01');
claimHoldDeterminants2.insertUser ="sample data2";
claimHoldDeterminants2.insertProcess ="sample data2";
claimHoldDeterminants2.updateDatetime =new Date('2010-01-01');
claimHoldDeterminants2.updateUser ="sample data2";
claimHoldDeterminants2.updateProcess ="sample data2";

var claimHoldDeterminants3 = new ClaimHoldDeterminants();
claimHoldDeterminants3.seqClhldRule =123;
claimHoldDeterminants3.determinantColumnNo =123;
claimHoldDeterminants3.determinantTable ="sample data3";
claimHoldDeterminants3.determinant ="sample data3";
claimHoldDeterminants3.operator ="sample data3";
claimHoldDeterminants3.securityCode ="sample data3";
claimHoldDeterminants3.insertDatetime =new Date('2010-01-01');
claimHoldDeterminants3.insertUser ="sample data3";
claimHoldDeterminants3.insertProcess ="sample data3";
claimHoldDeterminants3.updateDatetime =new Date('2010-01-01');
claimHoldDeterminants3.updateUser ="sample data3";
claimHoldDeterminants3.updateProcess ="sample data3";


export const ClaimHoldDeterminantss: ClaimHoldDeterminants[] = [
    claimHoldDeterminants1,
    claimHoldDeterminants2,
    claimHoldDeterminants3,
];