/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetGroupForMember} from "../../api-models"

var csfGetGroupForMember1 = new CsfGetGroupForMember();
csfGetGroupForMember1.pSeqMembId =123;

var csfGetGroupForMember2 = new CsfGetGroupForMember();
csfGetGroupForMember2.pSeqMembId =123;

var csfGetGroupForMember3 = new CsfGetGroupForMember();
csfGetGroupForMember3.pSeqMembId =123;


export const CsfGetGroupForMembers: CsfGetGroupForMember[] = [
    csfGetGroupForMember1,
    csfGetGroupForMember2,
    csfGetGroupForMember3,
];