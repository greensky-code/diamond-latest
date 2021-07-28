/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcSupgpEtStmndtSave} from "../../api-models"

var procSupgpEtStmndtSave1 = new ProcSupgpEtStmndtSave();
procSupgpEtStmndtSave1.pSeqGpstatId =123;
procSupgpEtStmndtSave1.pSeqGroupId =123;
procSupgpEtStmndtSave1.pState ="sample data1";
procSupgpEtStmndtSave1.pEffectiveDate ="sample data1";
procSupgpEtStmndtSave1.pTermDate ="sample data1";
procSupgpEtStmndtSave1.pTermReason ="sample data1";
procSupgpEtStmndtSave1.pUserId ="sample data1";
procSupgpEtStmndtSave1.oMessageId =123;

var procSupgpEtStmndtSave2 = new ProcSupgpEtStmndtSave();
procSupgpEtStmndtSave2.pSeqGpstatId =123;
procSupgpEtStmndtSave2.pSeqGroupId =123;
procSupgpEtStmndtSave2.pState ="sample data2";
procSupgpEtStmndtSave2.pEffectiveDate ="sample data2";
procSupgpEtStmndtSave2.pTermDate ="sample data2";
procSupgpEtStmndtSave2.pTermReason ="sample data2";
procSupgpEtStmndtSave2.pUserId ="sample data2";
procSupgpEtStmndtSave2.oMessageId =123;

var procSupgpEtStmndtSave3 = new ProcSupgpEtStmndtSave();
procSupgpEtStmndtSave3.pSeqGpstatId =123;
procSupgpEtStmndtSave3.pSeqGroupId =123;
procSupgpEtStmndtSave3.pState ="sample data3";
procSupgpEtStmndtSave3.pEffectiveDate ="sample data3";
procSupgpEtStmndtSave3.pTermDate ="sample data3";
procSupgpEtStmndtSave3.pTermReason ="sample data3";
procSupgpEtStmndtSave3.pUserId ="sample data3";
procSupgpEtStmndtSave3.oMessageId =123;


export const ProcSupgpEtStmndtSaves: ProcSupgpEtStmndtSave[] = [
    procSupgpEtStmndtSave1,
    procSupgpEtStmndtSave2,
    procSupgpEtStmndtSave3,
];