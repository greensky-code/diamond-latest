/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfIsValidAddress} from "../../api-models"

var csfIsValidAddress1 = new CsfIsValidAddress();
csfIsValidAddress1.pSeqAddrId =123;
csfIsValidAddress1.pDocCode ="sample data1";
csfIsValidAddress1.pCwwClaimInd =123;

var csfIsValidAddress2 = new CsfIsValidAddress();
csfIsValidAddress2.pSeqAddrId =123;
csfIsValidAddress2.pDocCode ="sample data2";
csfIsValidAddress2.pCwwClaimInd =123;

var csfIsValidAddress3 = new CsfIsValidAddress();
csfIsValidAddress3.pSeqAddrId =123;
csfIsValidAddress3.pDocCode ="sample data3";
csfIsValidAddress3.pCwwClaimInd =123;


export const CsfIsValidAddresses: CsfIsValidAddress[] = [
    csfIsValidAddress1,
    csfIsValidAddress2,
    csfIsValidAddress3,
];