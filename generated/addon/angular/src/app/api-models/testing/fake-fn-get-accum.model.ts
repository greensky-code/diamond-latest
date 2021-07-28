/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FnGetAccum} from "../../api-models"

var fnGetAccum1 = new FnGetAccum();
fnGetAccum1.inSeqMembId =123;
fnGetAccum1.inRuleId ="sample data1";
fnGetAccum1.inBenpkId ="sample data1";
fnGetAccum1.inStDate ="sample data1";
fnGetAccum1.inEndDate ="sample data1";
fnGetAccum1.inLimitType ="sample data1";
fnGetAccum1.inAgg ="sample data1";

var fnGetAccum2 = new FnGetAccum();
fnGetAccum2.inSeqMembId =123;
fnGetAccum2.inRuleId ="sample data2";
fnGetAccum2.inBenpkId ="sample data2";
fnGetAccum2.inStDate ="sample data2";
fnGetAccum2.inEndDate ="sample data2";
fnGetAccum2.inLimitType ="sample data2";
fnGetAccum2.inAgg ="sample data2";

var fnGetAccum3 = new FnGetAccum();
fnGetAccum3.inSeqMembId =123;
fnGetAccum3.inRuleId ="sample data3";
fnGetAccum3.inBenpkId ="sample data3";
fnGetAccum3.inStDate ="sample data3";
fnGetAccum3.inEndDate ="sample data3";
fnGetAccum3.inLimitType ="sample data3";
fnGetAccum3.inAgg ="sample data3";


export const FnGetAccums: FnGetAccum[] = [
    fnGetAccum1,
    fnGetAccum2,
    fnGetAccum3,
];