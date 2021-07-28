/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetEntityForMember} from "../../api-models"

var csfGetEntityForMember1 = new CsfGetEntityForMember();
csfGetEntityForMember1.pSeqMembId =123;

var csfGetEntityForMember2 = new CsfGetEntityForMember();
csfGetEntityForMember2.pSeqMembId =123;

var csfGetEntityForMember3 = new CsfGetEntityForMember();
csfGetEntityForMember3.pSeqMembId =123;


export const CsfGetEntityForMembers: CsfGetEntityForMember[] = [
    csfGetEntityForMember1,
    csfGetEntityForMember2,
    csfGetEntityForMember3,
];