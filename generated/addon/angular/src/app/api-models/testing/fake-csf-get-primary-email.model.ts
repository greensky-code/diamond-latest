/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetPrimaryEmail} from "../../api-models"

var csfGetPrimaryEmail1 = new CsfGetPrimaryEmail();
csfGetPrimaryEmail1.pSeqEntityId =123;

var csfGetPrimaryEmail2 = new CsfGetPrimaryEmail();
csfGetPrimaryEmail2.pSeqEntityId =123;

var csfGetPrimaryEmail3 = new CsfGetPrimaryEmail();
csfGetPrimaryEmail3.pSeqEntityId =123;


export const CsfGetPrimaryEmails: CsfGetPrimaryEmail[] = [
    csfGetPrimaryEmail1,
    csfGetPrimaryEmail2,
    csfGetPrimaryEmail3,
];