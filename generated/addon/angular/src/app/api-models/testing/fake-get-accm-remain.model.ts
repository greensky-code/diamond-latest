/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetAccmRemain} from "../../api-models"

var getAccmRemain1 = new GetAccmRemain();
getAccmRemain1.pApplyAmt =123;
getAccmRemain1.pAccumAmt =123;

var getAccmRemain2 = new GetAccmRemain();
getAccmRemain2.pApplyAmt =123;
getAccmRemain2.pAccumAmt =123;

var getAccmRemain3 = new GetAccmRemain();
getAccmRemain3.pApplyAmt =123;
getAccmRemain3.pAccumAmt =123;


export const GetAccmRemains: GetAccmRemain[] = [
    getAccmRemain1,
    getAccmRemain2,
    getAccmRemain3,
];