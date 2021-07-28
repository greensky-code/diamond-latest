/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetEntityForAddrCode} from "../../api-models"

var csfGetEntityForAddrCode1 = new CsfGetEntityForAddrCode();
csfGetEntityForAddrCode1.pSeqEntityId =123;
csfGetEntityForAddrCode1.pAddrCode ="sample data1";

var csfGetEntityForAddrCode2 = new CsfGetEntityForAddrCode();
csfGetEntityForAddrCode2.pSeqEntityId =123;
csfGetEntityForAddrCode2.pAddrCode ="sample data2";

var csfGetEntityForAddrCode3 = new CsfGetEntityForAddrCode();
csfGetEntityForAddrCode3.pSeqEntityId =123;
csfGetEntityForAddrCode3.pAddrCode ="sample data3";


export const CsfGetEntityForAddrCodes: CsfGetEntityForAddrCode[] = [
    csfGetEntityForAddrCode1,
    csfGetEntityForAddrCode2,
    csfGetEntityForAddrCode3,
];