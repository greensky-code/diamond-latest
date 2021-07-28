/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetMemberUd} from "../../api-models"

var procGetMemberUd1 = new ProcGetMemberUd();
procGetMemberUd1.pSeqEntityId =123;

var procGetMemberUd2 = new ProcGetMemberUd();
procGetMemberUd2.pSeqEntityId =123;

var procGetMemberUd3 = new ProcGetMemberUd();
procGetMemberUd3.pSeqEntityId =123;


export const ProcGetMemberUds: ProcGetMemberUd[] = [
    procGetMemberUd1,
    procGetMemberUd2,
    procGetMemberUd3,
];