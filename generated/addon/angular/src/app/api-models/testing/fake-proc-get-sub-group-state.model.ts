/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetSubGroupState} from "../../api-models"

var procGetSubGroupState1 = new ProcGetSubGroupState();
procGetSubGroupState1.pGroupId ="sample data1";
procGetSubGroupState1.oSubGroupId ="sample data1";
procGetSubGroupState1.oSubGroupName ="sample data1";
procGetSubGroupState1.oSubSeqGroupId =123;

var procGetSubGroupState2 = new ProcGetSubGroupState();
procGetSubGroupState2.pGroupId ="sample data2";
procGetSubGroupState2.oSubGroupId ="sample data2";
procGetSubGroupState2.oSubGroupName ="sample data2";
procGetSubGroupState2.oSubSeqGroupId =123;

var procGetSubGroupState3 = new ProcGetSubGroupState();
procGetSubGroupState3.pGroupId ="sample data3";
procGetSubGroupState3.oSubGroupId ="sample data3";
procGetSubGroupState3.oSubGroupName ="sample data3";
procGetSubGroupState3.oSubSeqGroupId =123;


export const ProcGetSubGroupStates: ProcGetSubGroupState[] = [
    procGetSubGroupState1,
    procGetSubGroupState2,
    procGetSubGroupState3,
];