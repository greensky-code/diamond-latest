/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetContactHist} from "../../api-models"

var procGetContactHist1 = new ProcGetContactHist();
procGetContactHist1.pSeqEntityId =123;
procGetContactHist1.pPartEffDate ="sample data1";
procGetContactHist1.pPartTermDate ="sample data1";

var procGetContactHist2 = new ProcGetContactHist();
procGetContactHist2.pSeqEntityId =123;
procGetContactHist2.pPartEffDate ="sample data2";
procGetContactHist2.pPartTermDate ="sample data2";

var procGetContactHist3 = new ProcGetContactHist();
procGetContactHist3.pSeqEntityId =123;
procGetContactHist3.pPartEffDate ="sample data3";
procGetContactHist3.pPartTermDate ="sample data3";


export const ProcGetContactHists: ProcGetContactHist[] = [
    procGetContactHist1,
    procGetContactHist2,
    procGetContactHist3,
];