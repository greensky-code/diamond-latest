/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetGroupForEntity} from "../../api-models"

var csfGetGroupForEntity1 = new CsfGetGroupForEntity();
csfGetGroupForEntity1.pSeqEntityId =123;

var csfGetGroupForEntity2 = new CsfGetGroupForEntity();
csfGetGroupForEntity2.pSeqEntityId =123;

var csfGetGroupForEntity3 = new CsfGetGroupForEntity();
csfGetGroupForEntity3.pSeqEntityId =123;


export const CsfGetGroupForEntitys: CsfGetGroupForEntity[] = [
    csfGetGroupForEntity1,
    csfGetGroupForEntity2,
    csfGetGroupForEntity3,
];