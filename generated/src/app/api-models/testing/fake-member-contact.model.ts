/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberContact} from "../../api-models"

var memberContact1 = new MemberContact();
memberContact1.seqMembId =123;
memberContact1.contactSource ="sample data1";
memberContact1.primaryDistributionMethod ="sample data1";
memberContact1.emailId ="sample data1";
memberContact1.faxNumber ="sample data1";
memberContact1.securityCode ="sample data1";
memberContact1.insertDatetime =new Date('2010-01-01');
memberContact1.insertUser ="sample data1";
memberContact1.insertProcess ="sample data1";
memberContact1.updateDatetime =new Date('2010-01-01');
memberContact1.updateUser ="sample data1";
memberContact1.updateProcess ="sample data1";

var memberContact2 = new MemberContact();
memberContact2.seqMembId =123;
memberContact2.contactSource ="sample data2";
memberContact2.primaryDistributionMethod ="sample data2";
memberContact2.emailId ="sample data2";
memberContact2.faxNumber ="sample data2";
memberContact2.securityCode ="sample data2";
memberContact2.insertDatetime =new Date('2010-01-01');
memberContact2.insertUser ="sample data2";
memberContact2.insertProcess ="sample data2";
memberContact2.updateDatetime =new Date('2010-01-01');
memberContact2.updateUser ="sample data2";
memberContact2.updateProcess ="sample data2";

var memberContact3 = new MemberContact();
memberContact3.seqMembId =123;
memberContact3.contactSource ="sample data3";
memberContact3.primaryDistributionMethod ="sample data3";
memberContact3.emailId ="sample data3";
memberContact3.faxNumber ="sample data3";
memberContact3.securityCode ="sample data3";
memberContact3.insertDatetime =new Date('2010-01-01');
memberContact3.insertUser ="sample data3";
memberContact3.insertProcess ="sample data3";
memberContact3.updateDatetime =new Date('2010-01-01');
memberContact3.updateUser ="sample data3";
memberContact3.updateProcess ="sample data3";


export const MemberContacts: MemberContact[] = [
    memberContact1,
    memberContact2,
    memberContact3,
];