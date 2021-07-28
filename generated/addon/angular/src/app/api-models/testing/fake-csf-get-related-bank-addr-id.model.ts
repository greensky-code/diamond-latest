/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetRelatedBankAddrId} from "../../api-models"

var csfGetRelatedBankAddrId1 = new CsfGetRelatedBankAddrId();
csfGetRelatedBankAddrId1.pSeqAddrId =123;

var csfGetRelatedBankAddrId2 = new CsfGetRelatedBankAddrId();
csfGetRelatedBankAddrId2.pSeqAddrId =123;

var csfGetRelatedBankAddrId3 = new CsfGetRelatedBankAddrId();
csfGetRelatedBankAddrId3.pSeqAddrId =123;


export const CsfGetRelatedBankAddrIds: CsfGetRelatedBankAddrId[] = [
    csfGetRelatedBankAddrId1,
    csfGetRelatedBankAddrId2,
    csfGetRelatedBankAddrId3,
];