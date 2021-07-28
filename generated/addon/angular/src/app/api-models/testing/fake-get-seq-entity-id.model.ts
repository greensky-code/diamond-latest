/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetSeqEntityId} from "../../api-models"

var getSeqEntityId1 = new GetSeqEntityId();
getSeqEntityId1.pSeqCompanyId =123;
getSeqEntityId1.pSeqVendAddress =123;
getSeqEntityId1.pEntityCode ="sample data1";
getSeqEntityId1.oSeqEntityId =123;

var getSeqEntityId2 = new GetSeqEntityId();
getSeqEntityId2.pSeqCompanyId =123;
getSeqEntityId2.pSeqVendAddress =123;
getSeqEntityId2.pEntityCode ="sample data2";
getSeqEntityId2.oSeqEntityId =123;

var getSeqEntityId3 = new GetSeqEntityId();
getSeqEntityId3.pSeqCompanyId =123;
getSeqEntityId3.pSeqVendAddress =123;
getSeqEntityId3.pEntityCode ="sample data3";
getSeqEntityId3.oSeqEntityId =123;


export const GetSeqEntityIds: GetSeqEntityId[] = [
    getSeqEntityId1,
    getSeqEntityId2,
    getSeqEntityId3,
];