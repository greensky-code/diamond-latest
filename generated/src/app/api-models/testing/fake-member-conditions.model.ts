/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberConditions} from "../../api-models"

var memberConditions1 = new MemberConditions();
memberConditions1.seqMembId =123;
memberConditions1.seqMcondId =123;
memberConditions1.effectiveDate =new Date('2010-01-01');
memberConditions1.fromValue ="sample data1";
memberConditions1.diagnosisType ="sample data1";
memberConditions1.conditionType ="sample data1";
memberConditions1.claimAction ="sample data1";
memberConditions1.termDate =new Date('2010-01-01');
memberConditions1.thruValue ="sample data1";
memberConditions1.claimReason ="sample data1";
memberConditions1.termReason ="sample data1";
memberConditions1.userDefined1 ="sample data1";
memberConditions1.userDefined2 ="sample data1";
memberConditions1.userDefined3 ="sample data1";
memberConditions1.userDefined4 ="sample data1";
memberConditions1.userDate1 =new Date('2010-01-01');
memberConditions1.userDate2 =new Date('2010-01-01');
memberConditions1.userDate3 =new Date('2010-01-01');
memberConditions1.userDate4 =new Date('2010-01-01');
memberConditions1.securityCode ="sample data1";
memberConditions1.insertDatetime =new Date('2010-01-01');
memberConditions1.insertUser ="sample data1";
memberConditions1.insertProcess ="sample data1";
memberConditions1.updateDatetime =new Date('2010-01-01');
memberConditions1.updateUser ="sample data1";
memberConditions1.updateProcess ="sample data1";

var memberConditions2 = new MemberConditions();
memberConditions2.seqMembId =123;
memberConditions2.seqMcondId =123;
memberConditions2.effectiveDate =new Date('2010-01-01');
memberConditions2.fromValue ="sample data2";
memberConditions2.diagnosisType ="sample data2";
memberConditions2.conditionType ="sample data2";
memberConditions2.claimAction ="sample data2";
memberConditions2.termDate =new Date('2010-01-01');
memberConditions2.thruValue ="sample data2";
memberConditions2.claimReason ="sample data2";
memberConditions2.termReason ="sample data2";
memberConditions2.userDefined1 ="sample data2";
memberConditions2.userDefined2 ="sample data2";
memberConditions2.userDefined3 ="sample data2";
memberConditions2.userDefined4 ="sample data2";
memberConditions2.userDate1 =new Date('2010-01-01');
memberConditions2.userDate2 =new Date('2010-01-01');
memberConditions2.userDate3 =new Date('2010-01-01');
memberConditions2.userDate4 =new Date('2010-01-01');
memberConditions2.securityCode ="sample data2";
memberConditions2.insertDatetime =new Date('2010-01-01');
memberConditions2.insertUser ="sample data2";
memberConditions2.insertProcess ="sample data2";
memberConditions2.updateDatetime =new Date('2010-01-01');
memberConditions2.updateUser ="sample data2";
memberConditions2.updateProcess ="sample data2";

var memberConditions3 = new MemberConditions();
memberConditions3.seqMembId =123;
memberConditions3.seqMcondId =123;
memberConditions3.effectiveDate =new Date('2010-01-01');
memberConditions3.fromValue ="sample data3";
memberConditions3.diagnosisType ="sample data3";
memberConditions3.conditionType ="sample data3";
memberConditions3.claimAction ="sample data3";
memberConditions3.termDate =new Date('2010-01-01');
memberConditions3.thruValue ="sample data3";
memberConditions3.claimReason ="sample data3";
memberConditions3.termReason ="sample data3";
memberConditions3.userDefined1 ="sample data3";
memberConditions3.userDefined2 ="sample data3";
memberConditions3.userDefined3 ="sample data3";
memberConditions3.userDefined4 ="sample data3";
memberConditions3.userDate1 =new Date('2010-01-01');
memberConditions3.userDate2 =new Date('2010-01-01');
memberConditions3.userDate3 =new Date('2010-01-01');
memberConditions3.userDate4 =new Date('2010-01-01');
memberConditions3.securityCode ="sample data3";
memberConditions3.insertDatetime =new Date('2010-01-01');
memberConditions3.insertUser ="sample data3";
memberConditions3.insertProcess ="sample data3";
memberConditions3.updateDatetime =new Date('2010-01-01');
memberConditions3.updateUser ="sample data3";
memberConditions3.updateProcess ="sample data3";


export const MemberConditionss: MemberConditions[] = [
    memberConditions1,
    memberConditions2,
    memberConditions3,
];