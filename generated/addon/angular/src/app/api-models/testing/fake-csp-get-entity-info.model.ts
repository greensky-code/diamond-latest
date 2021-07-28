/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetEntityInfo} from "../../api-models"

var cspGetEntityInfo1 = new CspGetEntityInfo();
cspGetEntityInfo1.pSeqEntityId =123;
cspGetEntityInfo1.pEntityCode ="sample data1";
cspGetEntityInfo1.pSeqMembId =123;
cspGetEntityInfo1.pSeqSubsId =123;

var cspGetEntityInfo2 = new CspGetEntityInfo();
cspGetEntityInfo2.pSeqEntityId =123;
cspGetEntityInfo2.pEntityCode ="sample data2";
cspGetEntityInfo2.pSeqMembId =123;
cspGetEntityInfo2.pSeqSubsId =123;

var cspGetEntityInfo3 = new CspGetEntityInfo();
cspGetEntityInfo3.pSeqEntityId =123;
cspGetEntityInfo3.pEntityCode ="sample data3";
cspGetEntityInfo3.pSeqMembId =123;
cspGetEntityInfo3.pSeqSubsId =123;


export const CspGetEntityInfos: CspGetEntityInfo[] = [
    cspGetEntityInfo1,
    cspGetEntityInfo2,
    cspGetEntityInfo3,
];