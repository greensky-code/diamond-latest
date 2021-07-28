/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcPayerC4Load} from "../../api-models"

var procPayerC4Load1 = new ProcPayerC4Load();
procPayerC4Load1.poRetcode =123;
procPayerC4Load1.poRetmsg ="sample data1";

var procPayerC4Load2 = new ProcPayerC4Load();
procPayerC4Load2.poRetcode =123;
procPayerC4Load2.poRetmsg ="sample data2";

var procPayerC4Load3 = new ProcPayerC4Load();
procPayerC4Load3.poRetcode =123;
procPayerC4Load3.poRetmsg ="sample data3";


export const ProcPayerC4Loads: ProcPayerC4Load[] = [
    procPayerC4Load1,
    procPayerC4Load2,
    procPayerC4Load3,
];