/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetAccountInfo} from "../../api-models"

var cspGetAccountInfo1 = new CspGetAccountInfo();
cspGetAccountInfo1.pSeqAccountId =123;
cspGetAccountInfo1.pBankAcctCode ="sample data1";
cspGetAccountInfo1.pEftStatusCode ="sample data1";
cspGetAccountInfo1.pSeqBankId =123;
cspGetAccountInfo1.pSeqEntityId =123;
cspGetAccountInfo1.pAccountNum ="sample data1";
cspGetAccountInfo1.pCareOf ="sample data1";

var cspGetAccountInfo2 = new CspGetAccountInfo();
cspGetAccountInfo2.pSeqAccountId =123;
cspGetAccountInfo2.pBankAcctCode ="sample data2";
cspGetAccountInfo2.pEftStatusCode ="sample data2";
cspGetAccountInfo2.pSeqBankId =123;
cspGetAccountInfo2.pSeqEntityId =123;
cspGetAccountInfo2.pAccountNum ="sample data2";
cspGetAccountInfo2.pCareOf ="sample data2";

var cspGetAccountInfo3 = new CspGetAccountInfo();
cspGetAccountInfo3.pSeqAccountId =123;
cspGetAccountInfo3.pBankAcctCode ="sample data3";
cspGetAccountInfo3.pEftStatusCode ="sample data3";
cspGetAccountInfo3.pSeqBankId =123;
cspGetAccountInfo3.pSeqEntityId =123;
cspGetAccountInfo3.pAccountNum ="sample data3";
cspGetAccountInfo3.pCareOf ="sample data3";


export const CspGetAccountInfos: CspGetAccountInfo[] = [
    cspGetAccountInfo1,
    cspGetAccountInfo2,
    cspGetAccountInfo3,
];