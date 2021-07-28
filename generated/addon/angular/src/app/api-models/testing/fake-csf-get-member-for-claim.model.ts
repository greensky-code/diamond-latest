/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetMemberForClaim} from "../../api-models"

var csfGetMemberForClaim1 = new CsfGetMemberForClaim();
csfGetMemberForClaim1.pSeqClaimId =123;

var csfGetMemberForClaim2 = new CsfGetMemberForClaim();
csfGetMemberForClaim2.pSeqClaimId =123;

var csfGetMemberForClaim3 = new CsfGetMemberForClaim();
csfGetMemberForClaim3.pSeqClaimId =123;


export const CsfGetMemberForClaims: CsfGetMemberForClaim[] = [
    csfGetMemberForClaim1,
    csfGetMemberForClaim2,
    csfGetMemberForClaim3,
];