/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SendDmndAccum} from "../../api-models"

var sendDmndAccum1 = new SendDmndAccum();
sendDmndAccum1.pMaxRecordNum =123;

var sendDmndAccum2 = new SendDmndAccum();
sendDmndAccum2.pMaxRecordNum =123;

var sendDmndAccum3 = new SendDmndAccum();
sendDmndAccum3.pMaxRecordNum =123;


export const SendDmndAccums: SendDmndAccum[] = [
    sendDmndAccum1,
    sendDmndAccum2,
    sendDmndAccum3,
];