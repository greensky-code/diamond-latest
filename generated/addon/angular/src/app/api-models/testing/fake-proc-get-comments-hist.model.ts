/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetCommentsHist} from "../../api-models"

var procGetCommentsHist1 = new ProcGetCommentsHist();
procGetCommentsHist1.pSeqEntityId =123;

var procGetCommentsHist2 = new ProcGetCommentsHist();
procGetCommentsHist2.pSeqEntityId =123;

var procGetCommentsHist3 = new ProcGetCommentsHist();
procGetCommentsHist3.pSeqEntityId =123;


export const ProcGetCommentsHists: ProcGetCommentsHist[] = [
    procGetCommentsHist1,
    procGetCommentsHist2,
    procGetCommentsHist3,
];