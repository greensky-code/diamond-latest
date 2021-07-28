/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetPayeeName} from "../../api-models"

var cspGetPayeeName1 = new CspGetPayeeName();
cspGetPayeeName1.pSeqAddrId =123;
cspGetPayeeName1.pSeqEntityId =123;
cspGetPayeeName1.pPayeeName ="sample data1";

var cspGetPayeeName2 = new CspGetPayeeName();
cspGetPayeeName2.pSeqAddrId =123;
cspGetPayeeName2.pSeqEntityId =123;
cspGetPayeeName2.pPayeeName ="sample data2";

var cspGetPayeeName3 = new CspGetPayeeName();
cspGetPayeeName3.pSeqAddrId =123;
cspGetPayeeName3.pSeqEntityId =123;
cspGetPayeeName3.pPayeeName ="sample data3";


export const CspGetPayeeNames: CspGetPayeeName[] = [
    cspGetPayeeName1,
    cspGetPayeeName2,
    cspGetPayeeName3,
];