/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetCurrentGroupFiling} from "../../api-models"

var procGetCurrentGroupFiling1 = new ProcGetCurrentGroupFiling();
procGetCurrentGroupFiling1.pSeqGroupId =123;
procGetCurrentGroupFiling1.pMatchDate ="sample data1";
procGetCurrentGroupFiling1.seqGrpfilingId =123;
procGetCurrentGroupFiling1.seqGroupId =123;
procGetCurrentGroupFiling1.seqGrpParentId =123;
procGetCurrentGroupFiling1.filingType ="sample data1";
procGetCurrentGroupFiling1.situsState ="sample data1";
procGetCurrentGroupFiling1.effectiveDate ="sample data1";
procGetCurrentGroupFiling1.termDate ="sample data1";
procGetCurrentGroupFiling1.changeReason ="sample data1";
procGetCurrentGroupFiling1.applyToSubgroup ="sample data1";
procGetCurrentGroupFiling1.insertDatetime ="sample data1";
procGetCurrentGroupFiling1.insertUser ="sample data1";
procGetCurrentGroupFiling1.insertProcess ="sample data1";
procGetCurrentGroupFiling1.updateDatetime ="sample data1";
procGetCurrentGroupFiling1.updateUser ="sample data1";
procGetCurrentGroupFiling1.updateProcess ="sample data1";

var procGetCurrentGroupFiling2 = new ProcGetCurrentGroupFiling();
procGetCurrentGroupFiling2.pSeqGroupId =123;
procGetCurrentGroupFiling2.pMatchDate ="sample data2";
procGetCurrentGroupFiling2.seqGrpfilingId =123;
procGetCurrentGroupFiling2.seqGroupId =123;
procGetCurrentGroupFiling2.seqGrpParentId =123;
procGetCurrentGroupFiling2.filingType ="sample data2";
procGetCurrentGroupFiling2.situsState ="sample data2";
procGetCurrentGroupFiling2.effectiveDate ="sample data2";
procGetCurrentGroupFiling2.termDate ="sample data2";
procGetCurrentGroupFiling2.changeReason ="sample data2";
procGetCurrentGroupFiling2.applyToSubgroup ="sample data2";
procGetCurrentGroupFiling2.insertDatetime ="sample data2";
procGetCurrentGroupFiling2.insertUser ="sample data2";
procGetCurrentGroupFiling2.insertProcess ="sample data2";
procGetCurrentGroupFiling2.updateDatetime ="sample data2";
procGetCurrentGroupFiling2.updateUser ="sample data2";
procGetCurrentGroupFiling2.updateProcess ="sample data2";

var procGetCurrentGroupFiling3 = new ProcGetCurrentGroupFiling();
procGetCurrentGroupFiling3.pSeqGroupId =123;
procGetCurrentGroupFiling3.pMatchDate ="sample data3";
procGetCurrentGroupFiling3.seqGrpfilingId =123;
procGetCurrentGroupFiling3.seqGroupId =123;
procGetCurrentGroupFiling3.seqGrpParentId =123;
procGetCurrentGroupFiling3.filingType ="sample data3";
procGetCurrentGroupFiling3.situsState ="sample data3";
procGetCurrentGroupFiling3.effectiveDate ="sample data3";
procGetCurrentGroupFiling3.termDate ="sample data3";
procGetCurrentGroupFiling3.changeReason ="sample data3";
procGetCurrentGroupFiling3.applyToSubgroup ="sample data3";
procGetCurrentGroupFiling3.insertDatetime ="sample data3";
procGetCurrentGroupFiling3.insertUser ="sample data3";
procGetCurrentGroupFiling3.insertProcess ="sample data3";
procGetCurrentGroupFiling3.updateDatetime ="sample data3";
procGetCurrentGroupFiling3.updateUser ="sample data3";
procGetCurrentGroupFiling3.updateProcess ="sample data3";


export const ProcGetCurrentGroupFilings: ProcGetCurrentGroupFiling[] = [
    procGetCurrentGroupFiling1,
    procGetCurrentGroupFiling2,
    procGetCurrentGroupFiling3,
];