/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberMasterUdArc} from "../../api-models"

var memberMasterUdArc1 = new MemberMasterUdArc();
memberMasterUdArc1.residencyLocationCode ="sample data1";
memberMasterUdArc1.comments ="sample data1";
memberMasterUdArc1.dubaiWorkLocationCode ="sample data1";
memberMasterUdArc1.uaeVisaStartDate =new Date('2010-01-01');
memberMasterUdArc1.updateProcess ="sample data1";
memberMasterUdArc1.updateUser ="sample data1";
memberMasterUdArc1.updateDatetime =new Date('2010-01-01');
memberMasterUdArc1.insertProcess ="sample data1";
memberMasterUdArc1.insertUser ="sample data1";
memberMasterUdArc1.insertDatetime =new Date('2010-01-01');
memberMasterUdArc1.userDate10 =new Date('2010-01-01');
memberMasterUdArc1.userDate9 =new Date('2010-01-01');
memberMasterUdArc1.userDate8 =new Date('2010-01-01');
memberMasterUdArc1.userDate7 =new Date('2010-01-01');
memberMasterUdArc1.userDate6 =new Date('2010-01-01');
memberMasterUdArc1.userDate5 =new Date('2010-01-01');
memberMasterUdArc1.userDate4 =new Date('2010-01-01');
memberMasterUdArc1.userDate3 =new Date('2010-01-01');
memberMasterUdArc1.userDate2 =new Date('2010-01-01');
memberMasterUdArc1.userDate1 =new Date('2010-01-01');
memberMasterUdArc1.userDefined25 ="sample data1";
memberMasterUdArc1.userDefined24 ="sample data1";
memberMasterUdArc1.userDefined23 ="sample data1";
memberMasterUdArc1.userDefined22 ="sample data1";
memberMasterUdArc1.userDefined21 ="sample data1";
memberMasterUdArc1.userDefined20 ="sample data1";
memberMasterUdArc1.userDefined19 ="sample data1";
memberMasterUdArc1.userDefined18 ="sample data1";
memberMasterUdArc1.userDefined17 ="sample data1";
memberMasterUdArc1.userDefined16 ="sample data1";
memberMasterUdArc1.userDefined15 ="sample data1";
memberMasterUdArc1.userDefined14 ="sample data1";
memberMasterUdArc1.userDefined13 ="sample data1";
memberMasterUdArc1.userDefined12 ="sample data1";
memberMasterUdArc1.userDefined11 ="sample data1";
memberMasterUdArc1.userDefined10 ="sample data1";
memberMasterUdArc1.userDefined9 ="sample data1";
memberMasterUdArc1.userDefined8 ="sample data1";
memberMasterUdArc1.userDefined7 ="sample data1";
memberMasterUdArc1.userDefined6 ="sample data1";
memberMasterUdArc1.userDefined5 ="sample data1";
memberMasterUdArc1.userDefined4 ="sample data1";
memberMasterUdArc1.userDefined3 ="sample data1";
memberMasterUdArc1.userDefined2 ="sample data1";
memberMasterUdArc1.userDefined1 ="sample data1";
memberMasterUdArc1.preferredCurrency ="sample data1";
memberMasterUdArc1.ksaProfession ="sample data1";
memberMasterUdArc1.sponsorIdType ="sample data1";
memberMasterUdArc1.sponsorIdIssueLoc ="sample data1";
memberMasterUdArc1.sponsorId ="sample data1";
memberMasterUdArc1.governmentIdType ="sample data1";
memberMasterUdArc1.governmentIdIssueLoc ="sample data1";
memberMasterUdArc1.governmentIdExpireDate =new Date('2010-01-01');
memberMasterUdArc1.governmentId ="sample data1";
memberMasterUdArc1.emirateIdIssueLoc ="sample data1";
memberMasterUdArc1.emirateIdExpireDate =new Date('2010-01-01');
memberMasterUdArc1.emirateIdNo ="sample data1";
memberMasterUdArc1.ksaNationality ="sample data1";
memberMasterUdArc1.passportIssueLoc ="sample data1";
memberMasterUdArc1.passportExpireDate =new Date('2010-01-01');
memberMasterUdArc1.passportNumber ="sample data1";
memberMasterUdArc1.personNumber ="sample data1";
memberMasterUdArc1.subscriberId ="sample data1";
memberMasterUdArc1.seqSubsId =123;
memberMasterUdArc1.seqMembId =123;
memberMasterUdArc1.changeType ="sample data1";
memberMasterUdArc1.changeDateTime =new Date('2010-01-01');

var memberMasterUdArc2 = new MemberMasterUdArc();
memberMasterUdArc2.residencyLocationCode ="sample data2";
memberMasterUdArc2.comments ="sample data2";
memberMasterUdArc2.dubaiWorkLocationCode ="sample data2";
memberMasterUdArc2.uaeVisaStartDate =new Date('2010-01-01');
memberMasterUdArc2.updateProcess ="sample data2";
memberMasterUdArc2.updateUser ="sample data2";
memberMasterUdArc2.updateDatetime =new Date('2010-01-01');
memberMasterUdArc2.insertProcess ="sample data2";
memberMasterUdArc2.insertUser ="sample data2";
memberMasterUdArc2.insertDatetime =new Date('2010-01-01');
memberMasterUdArc2.userDate10 =new Date('2010-01-01');
memberMasterUdArc2.userDate9 =new Date('2010-01-01');
memberMasterUdArc2.userDate8 =new Date('2010-01-01');
memberMasterUdArc2.userDate7 =new Date('2010-01-01');
memberMasterUdArc2.userDate6 =new Date('2010-01-01');
memberMasterUdArc2.userDate5 =new Date('2010-01-01');
memberMasterUdArc2.userDate4 =new Date('2010-01-01');
memberMasterUdArc2.userDate3 =new Date('2010-01-01');
memberMasterUdArc2.userDate2 =new Date('2010-01-01');
memberMasterUdArc2.userDate1 =new Date('2010-01-01');
memberMasterUdArc2.userDefined25 ="sample data2";
memberMasterUdArc2.userDefined24 ="sample data2";
memberMasterUdArc2.userDefined23 ="sample data2";
memberMasterUdArc2.userDefined22 ="sample data2";
memberMasterUdArc2.userDefined21 ="sample data2";
memberMasterUdArc2.userDefined20 ="sample data2";
memberMasterUdArc2.userDefined19 ="sample data2";
memberMasterUdArc2.userDefined18 ="sample data2";
memberMasterUdArc2.userDefined17 ="sample data2";
memberMasterUdArc2.userDefined16 ="sample data2";
memberMasterUdArc2.userDefined15 ="sample data2";
memberMasterUdArc2.userDefined14 ="sample data2";
memberMasterUdArc2.userDefined13 ="sample data2";
memberMasterUdArc2.userDefined12 ="sample data2";
memberMasterUdArc2.userDefined11 ="sample data2";
memberMasterUdArc2.userDefined10 ="sample data2";
memberMasterUdArc2.userDefined9 ="sample data2";
memberMasterUdArc2.userDefined8 ="sample data2";
memberMasterUdArc2.userDefined7 ="sample data2";
memberMasterUdArc2.userDefined6 ="sample data2";
memberMasterUdArc2.userDefined5 ="sample data2";
memberMasterUdArc2.userDefined4 ="sample data2";
memberMasterUdArc2.userDefined3 ="sample data2";
memberMasterUdArc2.userDefined2 ="sample data2";
memberMasterUdArc2.userDefined1 ="sample data2";
memberMasterUdArc2.preferredCurrency ="sample data2";
memberMasterUdArc2.ksaProfession ="sample data2";
memberMasterUdArc2.sponsorIdType ="sample data2";
memberMasterUdArc2.sponsorIdIssueLoc ="sample data2";
memberMasterUdArc2.sponsorId ="sample data2";
memberMasterUdArc2.governmentIdType ="sample data2";
memberMasterUdArc2.governmentIdIssueLoc ="sample data2";
memberMasterUdArc2.governmentIdExpireDate =new Date('2010-01-01');
memberMasterUdArc2.governmentId ="sample data2";
memberMasterUdArc2.emirateIdIssueLoc ="sample data2";
memberMasterUdArc2.emirateIdExpireDate =new Date('2010-01-01');
memberMasterUdArc2.emirateIdNo ="sample data2";
memberMasterUdArc2.ksaNationality ="sample data2";
memberMasterUdArc2.passportIssueLoc ="sample data2";
memberMasterUdArc2.passportExpireDate =new Date('2010-01-01');
memberMasterUdArc2.passportNumber ="sample data2";
memberMasterUdArc2.personNumber ="sample data2";
memberMasterUdArc2.subscriberId ="sample data2";
memberMasterUdArc2.seqSubsId =123;
memberMasterUdArc2.seqMembId =123;
memberMasterUdArc2.changeType ="sample data2";
memberMasterUdArc2.changeDateTime =new Date('2010-01-01');

var memberMasterUdArc3 = new MemberMasterUdArc();
memberMasterUdArc3.residencyLocationCode ="sample data3";
memberMasterUdArc3.comments ="sample data3";
memberMasterUdArc3.dubaiWorkLocationCode ="sample data3";
memberMasterUdArc3.uaeVisaStartDate =new Date('2010-01-01');
memberMasterUdArc3.updateProcess ="sample data3";
memberMasterUdArc3.updateUser ="sample data3";
memberMasterUdArc3.updateDatetime =new Date('2010-01-01');
memberMasterUdArc3.insertProcess ="sample data3";
memberMasterUdArc3.insertUser ="sample data3";
memberMasterUdArc3.insertDatetime =new Date('2010-01-01');
memberMasterUdArc3.userDate10 =new Date('2010-01-01');
memberMasterUdArc3.userDate9 =new Date('2010-01-01');
memberMasterUdArc3.userDate8 =new Date('2010-01-01');
memberMasterUdArc3.userDate7 =new Date('2010-01-01');
memberMasterUdArc3.userDate6 =new Date('2010-01-01');
memberMasterUdArc3.userDate5 =new Date('2010-01-01');
memberMasterUdArc3.userDate4 =new Date('2010-01-01');
memberMasterUdArc3.userDate3 =new Date('2010-01-01');
memberMasterUdArc3.userDate2 =new Date('2010-01-01');
memberMasterUdArc3.userDate1 =new Date('2010-01-01');
memberMasterUdArc3.userDefined25 ="sample data3";
memberMasterUdArc3.userDefined24 ="sample data3";
memberMasterUdArc3.userDefined23 ="sample data3";
memberMasterUdArc3.userDefined22 ="sample data3";
memberMasterUdArc3.userDefined21 ="sample data3";
memberMasterUdArc3.userDefined20 ="sample data3";
memberMasterUdArc3.userDefined19 ="sample data3";
memberMasterUdArc3.userDefined18 ="sample data3";
memberMasterUdArc3.userDefined17 ="sample data3";
memberMasterUdArc3.userDefined16 ="sample data3";
memberMasterUdArc3.userDefined15 ="sample data3";
memberMasterUdArc3.userDefined14 ="sample data3";
memberMasterUdArc3.userDefined13 ="sample data3";
memberMasterUdArc3.userDefined12 ="sample data3";
memberMasterUdArc3.userDefined11 ="sample data3";
memberMasterUdArc3.userDefined10 ="sample data3";
memberMasterUdArc3.userDefined9 ="sample data3";
memberMasterUdArc3.userDefined8 ="sample data3";
memberMasterUdArc3.userDefined7 ="sample data3";
memberMasterUdArc3.userDefined6 ="sample data3";
memberMasterUdArc3.userDefined5 ="sample data3";
memberMasterUdArc3.userDefined4 ="sample data3";
memberMasterUdArc3.userDefined3 ="sample data3";
memberMasterUdArc3.userDefined2 ="sample data3";
memberMasterUdArc3.userDefined1 ="sample data3";
memberMasterUdArc3.preferredCurrency ="sample data3";
memberMasterUdArc3.ksaProfession ="sample data3";
memberMasterUdArc3.sponsorIdType ="sample data3";
memberMasterUdArc3.sponsorIdIssueLoc ="sample data3";
memberMasterUdArc3.sponsorId ="sample data3";
memberMasterUdArc3.governmentIdType ="sample data3";
memberMasterUdArc3.governmentIdIssueLoc ="sample data3";
memberMasterUdArc3.governmentIdExpireDate =new Date('2010-01-01');
memberMasterUdArc3.governmentId ="sample data3";
memberMasterUdArc3.emirateIdIssueLoc ="sample data3";
memberMasterUdArc3.emirateIdExpireDate =new Date('2010-01-01');
memberMasterUdArc3.emirateIdNo ="sample data3";
memberMasterUdArc3.ksaNationality ="sample data3";
memberMasterUdArc3.passportIssueLoc ="sample data3";
memberMasterUdArc3.passportExpireDate =new Date('2010-01-01');
memberMasterUdArc3.passportNumber ="sample data3";
memberMasterUdArc3.personNumber ="sample data3";
memberMasterUdArc3.subscriberId ="sample data3";
memberMasterUdArc3.seqSubsId =123;
memberMasterUdArc3.seqMembId =123;
memberMasterUdArc3.changeType ="sample data3";
memberMasterUdArc3.changeDateTime =new Date('2010-01-01');


export const MemberMasterUdArcs: MemberMasterUdArc[] = [
    memberMasterUdArc1,
    memberMasterUdArc2,
    memberMasterUdArc3,
];