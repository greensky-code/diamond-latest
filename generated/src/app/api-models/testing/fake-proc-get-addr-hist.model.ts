/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetAddrHist} from "../../api-models"

var procGetAddrHist1 = new ProcGetAddrHist();
procGetAddrHist1.pSeqEntityId =123;
procGetAddrHist1.pPartEffDate ="sample data1";
procGetAddrHist1.pPartTermDate ="sample data1";

var procGetAddrHist2 = new ProcGetAddrHist();
procGetAddrHist2.pSeqEntityId =123;
procGetAddrHist2.pPartEffDate ="sample data2";
procGetAddrHist2.pPartTermDate ="sample data2";

var procGetAddrHist3 = new ProcGetAddrHist();
procGetAddrHist3.pSeqEntityId =123;
procGetAddrHist3.pPartEffDate ="sample data3";
procGetAddrHist3.pPartTermDate ="sample data3";


export const ProcGetAddrHists: ProcGetAddrHist[] = [
    procGetAddrHist1,
    procGetAddrHist2,
    procGetAddrHist3,
];