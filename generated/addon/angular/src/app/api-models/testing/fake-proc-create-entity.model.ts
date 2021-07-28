/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcCreateEntity} from "../../api-models"

var procCreateEntity1 = new ProcCreateEntity();
procCreateEntity1.pGroupId ="sample data1";
procCreateEntity1.pSeqCodeId =123;
procCreateEntity1.pUserId ="sample data1";
procCreateEntity1.oSeqEntityId =123;

var procCreateEntity2 = new ProcCreateEntity();
procCreateEntity2.pGroupId ="sample data2";
procCreateEntity2.pSeqCodeId =123;
procCreateEntity2.pUserId ="sample data2";
procCreateEntity2.oSeqEntityId =123;

var procCreateEntity3 = new ProcCreateEntity();
procCreateEntity3.pGroupId ="sample data3";
procCreateEntity3.pSeqCodeId =123;
procCreateEntity3.pUserId ="sample data3";
procCreateEntity3.oSeqEntityId =123;


export const ProcCreateEntitys: ProcCreateEntity[] = [
    procCreateEntity1,
    procCreateEntity2,
    procCreateEntity3,
];