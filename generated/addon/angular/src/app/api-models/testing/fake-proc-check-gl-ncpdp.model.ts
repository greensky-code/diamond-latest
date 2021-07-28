/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcCheckGlNcpdp} from "../../api-models"

var procCheckGlNcpdp1 = new ProcCheckGlNcpdp();
procCheckGlNcpdp1.poRetcode =123;
procCheckGlNcpdp1.poRetmsg ="sample data1";

var procCheckGlNcpdp2 = new ProcCheckGlNcpdp();
procCheckGlNcpdp2.poRetcode =123;
procCheckGlNcpdp2.poRetmsg ="sample data2";

var procCheckGlNcpdp3 = new ProcCheckGlNcpdp();
procCheckGlNcpdp3.poRetcode =123;
procCheckGlNcpdp3.poRetmsg ="sample data3";


export const ProcCheckGlNcpdps: ProcCheckGlNcpdp[] = [
    procCheckGlNcpdp1,
    procCheckGlNcpdp2,
    procCheckGlNcpdp3,
];