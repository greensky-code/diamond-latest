/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetSubscriberRs} from "../../api-models"

var getSubscriberRs1 = new GetSubscriberRs();
getSubscriberRs1.pSubscriberId ="sample data1";
getSubscriberRs1.pPersonNumber ="sample data1";

var getSubscriberRs2 = new GetSubscriberRs();
getSubscriberRs2.pSubscriberId ="sample data2";
getSubscriberRs2.pPersonNumber ="sample data2";

var getSubscriberRs3 = new GetSubscriberRs();
getSubscriberRs3.pSubscriberId ="sample data3";
getSubscriberRs3.pPersonNumber ="sample data3";


export const GetSubscriberR: GetSubscriberRs[] = [
    getSubscriberRs1,
    getSubscriberRs2,
    getSubscriberRs3,
];