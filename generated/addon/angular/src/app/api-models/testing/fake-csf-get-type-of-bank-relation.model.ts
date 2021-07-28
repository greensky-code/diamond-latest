/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetTypeOfBankRelation} from "../../api-models"

var csfGetTypeOfBankRelation1 = new CsfGetTypeOfBankRelation();
csfGetTypeOfBankRelation1.pSeqAddrId =123;

var csfGetTypeOfBankRelation2 = new CsfGetTypeOfBankRelation();
csfGetTypeOfBankRelation2.pSeqAddrId =123;

var csfGetTypeOfBankRelation3 = new CsfGetTypeOfBankRelation();
csfGetTypeOfBankRelation3.pSeqAddrId =123;


export const CsfGetTypeOfBankRelations: CsfGetTypeOfBankRelation[] = [
    csfGetTypeOfBankRelation1,
    csfGetTypeOfBankRelation2,
    csfGetTypeOfBankRelation3,
];