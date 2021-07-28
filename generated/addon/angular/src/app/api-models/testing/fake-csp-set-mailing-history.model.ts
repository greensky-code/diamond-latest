/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspSetMailingHistory} from "../../api-models"

var cspSetMailingHistory1 = new CspSetMailingHistory();
cspSetMailingHistory1.pSeqEntityId =123;
cspSetMailingHistory1.pSeqClaimId =123;
cspSetMailingHistory1.pAddrId =123;
cspSetMailingHistory1.pAddrSource ="sample data1";
cspSetMailingHistory1.pDocCode ="sample data1";
cspSetMailingHistory1.pTimestamp ="sample data1";
cspSetMailingHistory1.pCommentDesc ="sample data1";
cspSetMailingHistory1.pUser ="sample data1";
cspSetMailingHistory1.pProcess ="sample data1";

var cspSetMailingHistory2 = new CspSetMailingHistory();
cspSetMailingHistory2.pSeqEntityId =123;
cspSetMailingHistory2.pSeqClaimId =123;
cspSetMailingHistory2.pAddrId =123;
cspSetMailingHistory2.pAddrSource ="sample data2";
cspSetMailingHistory2.pDocCode ="sample data2";
cspSetMailingHistory2.pTimestamp ="sample data2";
cspSetMailingHistory2.pCommentDesc ="sample data2";
cspSetMailingHistory2.pUser ="sample data2";
cspSetMailingHistory2.pProcess ="sample data2";

var cspSetMailingHistory3 = new CspSetMailingHistory();
cspSetMailingHistory3.pSeqEntityId =123;
cspSetMailingHistory3.pSeqClaimId =123;
cspSetMailingHistory3.pAddrId =123;
cspSetMailingHistory3.pAddrSource ="sample data3";
cspSetMailingHistory3.pDocCode ="sample data3";
cspSetMailingHistory3.pTimestamp ="sample data3";
cspSetMailingHistory3.pCommentDesc ="sample data3";
cspSetMailingHistory3.pUser ="sample data3";
cspSetMailingHistory3.pProcess ="sample data3";


export const CspSetMailingHistorys: CspSetMailingHistory[] = [
    cspSetMailingHistory1,
    cspSetMailingHistory2,
    cspSetMailingHistory3,
];