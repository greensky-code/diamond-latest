/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGpEtStmndtValidate} from "../../api-models"

var procGpEtStmndtValidate1 = new ProcGpEtStmndtValidate();
procGpEtStmndtValidate1.pSeqGpstatId =123;
procGpEtStmndtValidate1.pSeqGroupId =123;
procGpEtStmndtValidate1.pState ="sample data1";
procGpEtStmndtValidate1.pEffectiveDate ="sample data1";
procGpEtStmndtValidate1.pTermDate ="sample data1";
procGpEtStmndtValidate1.pTermReason ="sample data1";
procGpEtStmndtValidate1.oValidResult ="sample data1";

var procGpEtStmndtValidate2 = new ProcGpEtStmndtValidate();
procGpEtStmndtValidate2.pSeqGpstatId =123;
procGpEtStmndtValidate2.pSeqGroupId =123;
procGpEtStmndtValidate2.pState ="sample data2";
procGpEtStmndtValidate2.pEffectiveDate ="sample data2";
procGpEtStmndtValidate2.pTermDate ="sample data2";
procGpEtStmndtValidate2.pTermReason ="sample data2";
procGpEtStmndtValidate2.oValidResult ="sample data2";

var procGpEtStmndtValidate3 = new ProcGpEtStmndtValidate();
procGpEtStmndtValidate3.pSeqGpstatId =123;
procGpEtStmndtValidate3.pSeqGroupId =123;
procGpEtStmndtValidate3.pState ="sample data3";
procGpEtStmndtValidate3.pEffectiveDate ="sample data3";
procGpEtStmndtValidate3.pTermDate ="sample data3";
procGpEtStmndtValidate3.pTermReason ="sample data3";
procGpEtStmndtValidate3.oValidResult ="sample data3";


export const ProcGpEtStmndtValidates: ProcGpEtStmndtValidate[] = [
    procGpEtStmndtValidate1,
    procGpEtStmndtValidate2,
    procGpEtStmndtValidate3,
];