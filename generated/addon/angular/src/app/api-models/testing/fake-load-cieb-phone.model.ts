/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LoadCiebPhone} from "../../api-models"

var loadCiebPhone1 = new LoadCiebPhone();
loadCiebPhone1.pSeqEntityId =123;
loadCiebPhone1.pPhoneCode ="sample data1";
loadCiebPhone1.pPhoneNum ="sample data1";

var loadCiebPhone2 = new LoadCiebPhone();
loadCiebPhone2.pSeqEntityId =123;
loadCiebPhone2.pPhoneCode ="sample data2";
loadCiebPhone2.pPhoneNum ="sample data2";

var loadCiebPhone3 = new LoadCiebPhone();
loadCiebPhone3.pSeqEntityId =123;
loadCiebPhone3.pPhoneCode ="sample data3";
loadCiebPhone3.pPhoneNum ="sample data3";


export const LoadCiebPhones: LoadCiebPhone[] = [
    loadCiebPhone1,
    loadCiebPhone2,
    loadCiebPhone3,
];