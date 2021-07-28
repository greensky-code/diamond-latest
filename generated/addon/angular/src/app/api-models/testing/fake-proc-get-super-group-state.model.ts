/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetSuperGroupState} from "../../api-models"

var procGetSuperGroupState1 = new ProcGetSuperGroupState();
procGetSuperGroupState1.pGroupId ="sample data1";
procGetSuperGroupState1.oSuperGroupId ="sample data1";
procGetSuperGroupState1.oSuperGroupName ="sample data1";
procGetSuperGroupState1.oSuperSeqGroupId =123;

var procGetSuperGroupState2 = new ProcGetSuperGroupState();
procGetSuperGroupState2.pGroupId ="sample data2";
procGetSuperGroupState2.oSuperGroupId ="sample data2";
procGetSuperGroupState2.oSuperGroupName ="sample data2";
procGetSuperGroupState2.oSuperSeqGroupId =123;

var procGetSuperGroupState3 = new ProcGetSuperGroupState();
procGetSuperGroupState3.pGroupId ="sample data3";
procGetSuperGroupState3.oSuperGroupId ="sample data3";
procGetSuperGroupState3.oSuperGroupName ="sample data3";
procGetSuperGroupState3.oSuperSeqGroupId =123;


export const ProcGetSuperGroupStates: ProcGetSuperGroupState[] = [
    procGetSuperGroupState1,
    procGetSuperGroupState2,
    procGetSuperGroupState3,
];