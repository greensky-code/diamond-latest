/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberWorkingAged} from "../../api-models"

var memberWorkingAged1 = new MemberWorkingAged();
memberWorkingAged1.seqMembId =123;
memberWorkingAged1.seqMembWaId =123;
memberWorkingAged1.dateSent =new Date('2010-01-01');
memberWorkingAged1.dateReceived =new Date('2010-01-01');
memberWorkingAged1.memwaUserDefined1 ="sample data1";
memberWorkingAged1.memwaUserDefined2 ="sample data1";
memberWorkingAged1.memwaUserDate1 =new Date('2010-01-01');
memberWorkingAged1.memwaUserDate2 =new Date('2010-01-01');
memberWorkingAged1.surveyEffectiveDate =new Date('2010-01-01');
memberWorkingAged1.surveyTermDate =new Date('2010-01-01');
memberWorkingAged1.insertDatetime =new Date('2010-01-01');
memberWorkingAged1.insertProcess ="sample data1";
memberWorkingAged1.insertUser ="sample data1";
memberWorkingAged1.updateDatetime =new Date('2010-01-01');
memberWorkingAged1.updateProcess ="sample data1";
memberWorkingAged1.updateUser ="sample data1";
memberWorkingAged1.securityCode ="sample data1";

var memberWorkingAged2 = new MemberWorkingAged();
memberWorkingAged2.seqMembId =123;
memberWorkingAged2.seqMembWaId =123;
memberWorkingAged2.dateSent =new Date('2010-01-01');
memberWorkingAged2.dateReceived =new Date('2010-01-01');
memberWorkingAged2.memwaUserDefined1 ="sample data2";
memberWorkingAged2.memwaUserDefined2 ="sample data2";
memberWorkingAged2.memwaUserDate1 =new Date('2010-01-01');
memberWorkingAged2.memwaUserDate2 =new Date('2010-01-01');
memberWorkingAged2.surveyEffectiveDate =new Date('2010-01-01');
memberWorkingAged2.surveyTermDate =new Date('2010-01-01');
memberWorkingAged2.insertDatetime =new Date('2010-01-01');
memberWorkingAged2.insertProcess ="sample data2";
memberWorkingAged2.insertUser ="sample data2";
memberWorkingAged2.updateDatetime =new Date('2010-01-01');
memberWorkingAged2.updateProcess ="sample data2";
memberWorkingAged2.updateUser ="sample data2";
memberWorkingAged2.securityCode ="sample data2";

var memberWorkingAged3 = new MemberWorkingAged();
memberWorkingAged3.seqMembId =123;
memberWorkingAged3.seqMembWaId =123;
memberWorkingAged3.dateSent =new Date('2010-01-01');
memberWorkingAged3.dateReceived =new Date('2010-01-01');
memberWorkingAged3.memwaUserDefined1 ="sample data3";
memberWorkingAged3.memwaUserDefined2 ="sample data3";
memberWorkingAged3.memwaUserDate1 =new Date('2010-01-01');
memberWorkingAged3.memwaUserDate2 =new Date('2010-01-01');
memberWorkingAged3.surveyEffectiveDate =new Date('2010-01-01');
memberWorkingAged3.surveyTermDate =new Date('2010-01-01');
memberWorkingAged3.insertDatetime =new Date('2010-01-01');
memberWorkingAged3.insertProcess ="sample data3";
memberWorkingAged3.insertUser ="sample data3";
memberWorkingAged3.updateDatetime =new Date('2010-01-01');
memberWorkingAged3.updateProcess ="sample data3";
memberWorkingAged3.updateUser ="sample data3";
memberWorkingAged3.securityCode ="sample data3";


export const MemberWorkingAgeds: MemberWorkingAged[] = [
    memberWorkingAged1,
    memberWorkingAged2,
    memberWorkingAged3,
];