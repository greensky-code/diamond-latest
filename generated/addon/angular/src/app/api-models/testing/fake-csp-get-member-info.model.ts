/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetMemberInfo} from "../../api-models"

var cspGetMemberInfo1 = new CspGetMemberInfo();
cspGetMemberInfo1.pSeqMembId =123;
cspGetMemberInfo1.pSeqSubsId =123;
cspGetMemberInfo1.pLastName ="sample data1";
cspGetMemberInfo1.pFirstName ="sample data1";
cspGetMemberInfo1.pMiddleInitial ="sample data1";

var cspGetMemberInfo2 = new CspGetMemberInfo();
cspGetMemberInfo2.pSeqMembId =123;
cspGetMemberInfo2.pSeqSubsId =123;
cspGetMemberInfo2.pLastName ="sample data2";
cspGetMemberInfo2.pFirstName ="sample data2";
cspGetMemberInfo2.pMiddleInitial ="sample data2";

var cspGetMemberInfo3 = new CspGetMemberInfo();
cspGetMemberInfo3.pSeqMembId =123;
cspGetMemberInfo3.pSeqSubsId =123;
cspGetMemberInfo3.pLastName ="sample data3";
cspGetMemberInfo3.pFirstName ="sample data3";
cspGetMemberInfo3.pMiddleInitial ="sample data3";


export const CspGetMemberInfos: CspGetMemberInfo[] = [
    cspGetMemberInfo1,
    cspGetMemberInfo2,
    cspGetMemberInfo3,
];