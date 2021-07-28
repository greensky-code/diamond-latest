/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfIsClaimCww} from "../../api-models"

var csfIsClaimCww1 = new CsfIsClaimCww();
csfIsClaimCww1.pSeqClaimId =123;

var csfIsClaimCww2 = new CsfIsClaimCww();
csfIsClaimCww2.pSeqClaimId =123;

var csfIsClaimCww3 = new CsfIsClaimCww();
csfIsClaimCww3.pSeqClaimId =123;


export const CsfIsClaimCwws: CsfIsClaimCww[] = [
    csfIsClaimCww1,
    csfIsClaimCww2,
    csfIsClaimCww3,
];