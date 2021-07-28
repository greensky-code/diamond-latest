/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcPayerMember} from "../../api-models"

var procPayerMember1 = new ProcPayerMember();
procPayerMember1.pSsnsLimit =123;
procPayerMember1.pRetcode =123;
procPayerMember1.pRetmsg ="sample data1";
procPayerMember1.pSsnAlert ="sample data1";

var procPayerMember2 = new ProcPayerMember();
procPayerMember2.pSsnsLimit =123;
procPayerMember2.pRetcode =123;
procPayerMember2.pRetmsg ="sample data2";
procPayerMember2.pSsnAlert ="sample data2";

var procPayerMember3 = new ProcPayerMember();
procPayerMember3.pSsnsLimit =123;
procPayerMember3.pRetcode =123;
procPayerMember3.pRetmsg ="sample data3";
procPayerMember3.pSsnAlert ="sample data3";


export const ProcPayerMembers: ProcPayerMember[] = [
    procPayerMember1,
    procPayerMember2,
    procPayerMember3,
];