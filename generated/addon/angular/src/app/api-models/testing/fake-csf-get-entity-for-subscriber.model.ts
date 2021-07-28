/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetEntityForSubscriber} from "../../api-models"

var csfGetEntityForSubscriber1 = new CsfGetEntityForSubscriber();
csfGetEntityForSubscriber1.pSeqSubsId =123;

var csfGetEntityForSubscriber2 = new CsfGetEntityForSubscriber();
csfGetEntityForSubscriber2.pSeqSubsId =123;

var csfGetEntityForSubscriber3 = new CsfGetEntityForSubscriber();
csfGetEntityForSubscriber3.pSeqSubsId =123;


export const CsfGetEntityForSubscribers: CsfGetEntityForSubscriber[] = [
    csfGetEntityForSubscriber1,
    csfGetEntityForSubscriber2,
    csfGetEntityForSubscriber3,
];