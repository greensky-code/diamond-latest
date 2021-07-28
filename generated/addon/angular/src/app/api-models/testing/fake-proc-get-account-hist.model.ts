/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetAccountHist} from "../../api-models"

var procGetAccountHist1 = new ProcGetAccountHist();
procGetAccountHist1.pSeqEntityId =123;

var procGetAccountHist2 = new ProcGetAccountHist();
procGetAccountHist2.pSeqEntityId =123;

var procGetAccountHist3 = new ProcGetAccountHist();
procGetAccountHist3.pSeqEntityId =123;


export const ProcGetAccountHists: ProcGetAccountHist[] = [
    procGetAccountHist1,
    procGetAccountHist2,
    procGetAccountHist3,
];