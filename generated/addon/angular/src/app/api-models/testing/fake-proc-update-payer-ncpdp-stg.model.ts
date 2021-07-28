/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcUpdatePayerNcpdpStg} from "../../api-models"

var procUpdatePayerNcpdpStg1 = new ProcUpdatePayerNcpdpStg();
procUpdatePayerNcpdpStg1.poRetcode =123;
procUpdatePayerNcpdpStg1.poRetmsg ="sample data1";

var procUpdatePayerNcpdpStg2 = new ProcUpdatePayerNcpdpStg();
procUpdatePayerNcpdpStg2.poRetcode =123;
procUpdatePayerNcpdpStg2.poRetmsg ="sample data2";

var procUpdatePayerNcpdpStg3 = new ProcUpdatePayerNcpdpStg();
procUpdatePayerNcpdpStg3.poRetcode =123;
procUpdatePayerNcpdpStg3.poRetmsg ="sample data3";


export const ProcUpdatePayerNcpdpStgs: ProcUpdatePayerNcpdpStg[] = [
    procUpdatePayerNcpdpStg1,
    procUpdatePayerNcpdpStg2,
    procUpdatePayerNcpdpStg3,
];