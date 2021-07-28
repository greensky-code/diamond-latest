/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcSubgpEtStmndtSave} from "../../api-models"

var procSubgpEtStmndtSave1 = new ProcSubgpEtStmndtSave();
procSubgpEtStmndtSave1.pSeqGpstatId =123;
procSubgpEtStmndtSave1.pSeqGroupId =123;
procSubgpEtStmndtSave1.pState ="sample data1";
procSubgpEtStmndtSave1.pEffectiveDate ="sample data1";
procSubgpEtStmndtSave1.pTermDate ="sample data1";
procSubgpEtStmndtSave1.pTermReason ="sample data1";
procSubgpEtStmndtSave1.pUserId ="sample data1";
procSubgpEtStmndtSave1.oMessageId =123;

var procSubgpEtStmndtSave2 = new ProcSubgpEtStmndtSave();
procSubgpEtStmndtSave2.pSeqGpstatId =123;
procSubgpEtStmndtSave2.pSeqGroupId =123;
procSubgpEtStmndtSave2.pState ="sample data2";
procSubgpEtStmndtSave2.pEffectiveDate ="sample data2";
procSubgpEtStmndtSave2.pTermDate ="sample data2";
procSubgpEtStmndtSave2.pTermReason ="sample data2";
procSubgpEtStmndtSave2.pUserId ="sample data2";
procSubgpEtStmndtSave2.oMessageId =123;

var procSubgpEtStmndtSave3 = new ProcSubgpEtStmndtSave();
procSubgpEtStmndtSave3.pSeqGpstatId =123;
procSubgpEtStmndtSave3.pSeqGroupId =123;
procSubgpEtStmndtSave3.pState ="sample data3";
procSubgpEtStmndtSave3.pEffectiveDate ="sample data3";
procSubgpEtStmndtSave3.pTermDate ="sample data3";
procSubgpEtStmndtSave3.pTermReason ="sample data3";
procSubgpEtStmndtSave3.pUserId ="sample data3";
procSubgpEtStmndtSave3.oMessageId =123;


export const ProcSubgpEtStmndtSaves: ProcSubgpEtStmndtSave[] = [
    procSubgpEtStmndtSave1,
    procSubgpEtStmndtSave2,
    procSubgpEtStmndtSave3,
];