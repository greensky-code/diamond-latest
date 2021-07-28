/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetOrigEffDate} from "../../api-models"

var getOrigEffDate1 = new GetOrigEffDate();
getOrigEffDate1.pSeqMembId =123;

var getOrigEffDate2 = new GetOrigEffDate();
getOrigEffDate2.pSeqMembId =123;

var getOrigEffDate3 = new GetOrigEffDate();
getOrigEffDate3.pSeqMembId =123;


export const GetOrigEffDates: GetOrigEffDate[] = [
    getOrigEffDate1,
    getOrigEffDate2,
    getOrigEffDate3,
];