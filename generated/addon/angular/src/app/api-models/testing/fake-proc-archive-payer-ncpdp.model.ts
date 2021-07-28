/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcArchivePayerNcpdp} from "../../api-models"

var procArchivePayerNcpdp1 = new ProcArchivePayerNcpdp();
procArchivePayerNcpdp1.poRetcode =123;
procArchivePayerNcpdp1.poRetmsg ="sample data1";

var procArchivePayerNcpdp2 = new ProcArchivePayerNcpdp();
procArchivePayerNcpdp2.poRetcode =123;
procArchivePayerNcpdp2.poRetmsg ="sample data2";

var procArchivePayerNcpdp3 = new ProcArchivePayerNcpdp();
procArchivePayerNcpdp3.poRetcode =123;
procArchivePayerNcpdp3.poRetmsg ="sample data3";


export const ProcArchivePayerNcpdps: ProcArchivePayerNcpdp[] = [
    procArchivePayerNcpdp1,
    procArchivePayerNcpdp2,
    procArchivePayerNcpdp3,
];