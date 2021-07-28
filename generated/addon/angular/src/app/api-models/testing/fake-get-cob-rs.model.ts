/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetCobRs} from "../../api-models"

var getCobRs1 = new GetCobRs();
getCobRs1.pSeqMembId =123;

var getCobRs2 = new GetCobRs();
getCobRs2.pSeqMembId =123;

var getCobRs3 = new GetCobRs();
getCobRs3.pSeqMembId =123;


export const GetCobR: GetCobRs[] = [
    getCobRs1,
    getCobRs2,
    getCobRs3,
];