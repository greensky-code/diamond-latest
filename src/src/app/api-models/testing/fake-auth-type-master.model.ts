/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthTypeMaster} from "../../api-models"

var authTypeMaster1 = new AuthTypeMaster();
authTypeMaster1.seqAuthType =123;
authTypeMaster1.authType ="sample data1";
authTypeMaster1.description ="sample data1";
authTypeMaster1.requestNextReviewDate ="sample data1";
authTypeMaster1.allowNonSystemSubscriberId ="sample data1";
authTypeMaster1.securityCode ="sample data1";
authTypeMaster1.insertDatetime =new Date('2010-01-01');
authTypeMaster1.insertUser ="sample data1";
authTypeMaster1.insertProcess ="sample data1";
authTypeMaster1.updateDatetime =new Date('2010-01-01');
authTypeMaster1.updateUser ="sample data1";
authTypeMaster1.updateProcess ="sample data1";
authTypeMaster1.authExpUpdFlg ="sample data1";
authTypeMaster1.useQuantityMatch ="sample data1";

var authTypeMaster2 = new AuthTypeMaster();
authTypeMaster2.seqAuthType =123;
authTypeMaster2.authType ="sample data2";
authTypeMaster2.description ="sample data2";
authTypeMaster2.requestNextReviewDate ="sample data2";
authTypeMaster2.allowNonSystemSubscriberId ="sample data2";
authTypeMaster2.securityCode ="sample data2";
authTypeMaster2.insertDatetime =new Date('2010-01-01');
authTypeMaster2.insertUser ="sample data2";
authTypeMaster2.insertProcess ="sample data2";
authTypeMaster2.updateDatetime =new Date('2010-01-01');
authTypeMaster2.updateUser ="sample data2";
authTypeMaster2.updateProcess ="sample data2";
authTypeMaster2.authExpUpdFlg ="sample data2";
authTypeMaster2.useQuantityMatch ="sample data2";

var authTypeMaster3 = new AuthTypeMaster();
authTypeMaster3.seqAuthType =123;
authTypeMaster3.authType ="sample data3";
authTypeMaster3.description ="sample data3";
authTypeMaster3.requestNextReviewDate ="sample data3";
authTypeMaster3.allowNonSystemSubscriberId ="sample data3";
authTypeMaster3.securityCode ="sample data3";
authTypeMaster3.insertDatetime =new Date('2010-01-01');
authTypeMaster3.insertUser ="sample data3";
authTypeMaster3.insertProcess ="sample data3";
authTypeMaster3.updateDatetime =new Date('2010-01-01');
authTypeMaster3.updateUser ="sample data3";
authTypeMaster3.updateProcess ="sample data3";
authTypeMaster3.authExpUpdFlg ="sample data3";
authTypeMaster3.useQuantityMatch ="sample data3";


export const AuthTypeMasters: AuthTypeMaster[] = [
    authTypeMaster1,
    authTypeMaster2,
    authTypeMaster3,
];