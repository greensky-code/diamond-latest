/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CodereviewAuditDetails} from "../../api-models"

var codereviewAuditDetails1 = new CodereviewAuditDetails();
codereviewAuditDetails1.claimNumber ="sample data1";
codereviewAuditDetails1.lineNumber =123;
codereviewAuditDetails1.histClaimNumber ="sample data1";
codereviewAuditDetails1.histLineNumber =123;
codereviewAuditDetails1.insertDatetime =new Date('2010-01-01');
codereviewAuditDetails1.insertUser ="sample data1";
codereviewAuditDetails1.insertProcess ="sample data1";

var codereviewAuditDetails2 = new CodereviewAuditDetails();
codereviewAuditDetails2.claimNumber ="sample data2";
codereviewAuditDetails2.lineNumber =123;
codereviewAuditDetails2.histClaimNumber ="sample data2";
codereviewAuditDetails2.histLineNumber =123;
codereviewAuditDetails2.insertDatetime =new Date('2010-01-01');
codereviewAuditDetails2.insertUser ="sample data2";
codereviewAuditDetails2.insertProcess ="sample data2";

var codereviewAuditDetails3 = new CodereviewAuditDetails();
codereviewAuditDetails3.claimNumber ="sample data3";
codereviewAuditDetails3.lineNumber =123;
codereviewAuditDetails3.histClaimNumber ="sample data3";
codereviewAuditDetails3.histLineNumber =123;
codereviewAuditDetails3.insertDatetime =new Date('2010-01-01');
codereviewAuditDetails3.insertUser ="sample data3";
codereviewAuditDetails3.insertProcess ="sample data3";


export const CodereviewAuditDetailss: CodereviewAuditDetails[] = [
    codereviewAuditDetails1,
    codereviewAuditDetails2,
    codereviewAuditDetails3,
];