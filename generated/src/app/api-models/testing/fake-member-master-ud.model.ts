/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberMasterUd} from "../../api-models"

var memberMasterUd1 = new MemberMasterUd();
memberMasterUd1.residencyLocationCode ="sample data1";
memberMasterUd1.comments ="sample data1";
memberMasterUd1.dubaiWorkLocationCode ="sample data1";
memberMasterUd1.uaeVisaStartDate =new Date('2010-01-01');
memberMasterUd1.updateProcess ="sample data1";
memberMasterUd1.updateUser ="sample data1";
memberMasterUd1.updateDatetime =new Date('2010-01-01');
memberMasterUd1.insertProcess ="sample data1";
memberMasterUd1.insertUser ="sample data1";
memberMasterUd1.insertDatetime =new Date('2010-01-01');
memberMasterUd1.userDate10 =new Date('2010-01-01');
memberMasterUd1.userDate9 =new Date('2010-01-01');
memberMasterUd1.userDate8 =new Date('2010-01-01');
memberMasterUd1.userDate7 =new Date('2010-01-01');
memberMasterUd1.userDate6 =new Date('2010-01-01');
memberMasterUd1.userDate5 =new Date('2010-01-01');
memberMasterUd1.userDate4 =new Date('2010-01-01');
memberMasterUd1.userDate3 =new Date('2010-01-01');
memberMasterUd1.userDate2 =new Date('2010-01-01');
memberMasterUd1.userDate1 =new Date('2010-01-01');
memberMasterUd1.userDefined25 ="sample data1";
memberMasterUd1.userDefined24 ="sample data1";
memberMasterUd1.userDefined23 ="sample data1";
memberMasterUd1.userDefined22 ="sample data1";
memberMasterUd1.userDefined21 ="sample data1";
memberMasterUd1.userDefined20 ="sample data1";
memberMasterUd1.userDefined19 ="sample data1";
memberMasterUd1.userDefined18 ="sample data1";
memberMasterUd1.userDefined17 ="sample data1";
memberMasterUd1.userDefined16 ="sample data1";
memberMasterUd1.userDefined15 ="sample data1";
memberMasterUd1.userDefined14 ="sample data1";
memberMasterUd1.userDefined13 ="sample data1";
memberMasterUd1.userDefined12 ="sample data1";
memberMasterUd1.userDefined11 ="sample data1";
memberMasterUd1.userDefined10 ="sample data1";
memberMasterUd1.userDefined9 ="sample data1";
memberMasterUd1.userDefined8 ="sample data1";
memberMasterUd1.userDefined7 ="sample data1";
memberMasterUd1.userDefined6 ="sample data1";
memberMasterUd1.userDefined5 ="sample data1";
memberMasterUd1.userDefined4 ="sample data1";
memberMasterUd1.userDefined3 ="sample data1";
memberMasterUd1.userDefined2 ="sample data1";
memberMasterUd1.userDefined1 ="sample data1";
memberMasterUd1.preferredCurrency ="sample data1";
memberMasterUd1.ksaProfession ="sample data1";
memberMasterUd1.sponsorIdType ="sample data1";
memberMasterUd1.sponsorIdIssueLoc ="sample data1";
memberMasterUd1.sponsorId ="sample data1";
memberMasterUd1.governmentIdType ="sample data1";
memberMasterUd1.governmentIdIssueLoc ="sample data1";
memberMasterUd1.governmentIdExpireDate =new Date('2010-01-01');
memberMasterUd1.governmentId ="sample data1";
memberMasterUd1.emirateIdIssueLoc ="sample data1";
memberMasterUd1.emirateIdExpireDate =new Date('2010-01-01');
memberMasterUd1.emirateIdNo ="sample data1";
memberMasterUd1.ksaNationality ="sample data1";
memberMasterUd1.passportIssueLoc ="sample data1";
memberMasterUd1.passportExpireDate =new Date('2010-01-01');
memberMasterUd1.passportNumber ="sample data1";
memberMasterUd1.personNumber ="sample data1";
memberMasterUd1.subscriberId ="sample data1";
memberMasterUd1.seqSubsId =123;
memberMasterUd1.seqMembId =123;

var memberMasterUd2 = new MemberMasterUd();
memberMasterUd2.residencyLocationCode ="sample data2";
memberMasterUd2.comments ="sample data2";
memberMasterUd2.dubaiWorkLocationCode ="sample data2";
memberMasterUd2.uaeVisaStartDate =new Date('2010-01-01');
memberMasterUd2.updateProcess ="sample data2";
memberMasterUd2.updateUser ="sample data2";
memberMasterUd2.updateDatetime =new Date('2010-01-01');
memberMasterUd2.insertProcess ="sample data2";
memberMasterUd2.insertUser ="sample data2";
memberMasterUd2.insertDatetime =new Date('2010-01-01');
memberMasterUd2.userDate10 =new Date('2010-01-01');
memberMasterUd2.userDate9 =new Date('2010-01-01');
memberMasterUd2.userDate8 =new Date('2010-01-01');
memberMasterUd2.userDate7 =new Date('2010-01-01');
memberMasterUd2.userDate6 =new Date('2010-01-01');
memberMasterUd2.userDate5 =new Date('2010-01-01');
memberMasterUd2.userDate4 =new Date('2010-01-01');
memberMasterUd2.userDate3 =new Date('2010-01-01');
memberMasterUd2.userDate2 =new Date('2010-01-01');
memberMasterUd2.userDate1 =new Date('2010-01-01');
memberMasterUd2.userDefined25 ="sample data2";
memberMasterUd2.userDefined24 ="sample data2";
memberMasterUd2.userDefined23 ="sample data2";
memberMasterUd2.userDefined22 ="sample data2";
memberMasterUd2.userDefined21 ="sample data2";
memberMasterUd2.userDefined20 ="sample data2";
memberMasterUd2.userDefined19 ="sample data2";
memberMasterUd2.userDefined18 ="sample data2";
memberMasterUd2.userDefined17 ="sample data2";
memberMasterUd2.userDefined16 ="sample data2";
memberMasterUd2.userDefined15 ="sample data2";
memberMasterUd2.userDefined14 ="sample data2";
memberMasterUd2.userDefined13 ="sample data2";
memberMasterUd2.userDefined12 ="sample data2";
memberMasterUd2.userDefined11 ="sample data2";
memberMasterUd2.userDefined10 ="sample data2";
memberMasterUd2.userDefined9 ="sample data2";
memberMasterUd2.userDefined8 ="sample data2";
memberMasterUd2.userDefined7 ="sample data2";
memberMasterUd2.userDefined6 ="sample data2";
memberMasterUd2.userDefined5 ="sample data2";
memberMasterUd2.userDefined4 ="sample data2";
memberMasterUd2.userDefined3 ="sample data2";
memberMasterUd2.userDefined2 ="sample data2";
memberMasterUd2.userDefined1 ="sample data2";
memberMasterUd2.preferredCurrency ="sample data2";
memberMasterUd2.ksaProfession ="sample data2";
memberMasterUd2.sponsorIdType ="sample data2";
memberMasterUd2.sponsorIdIssueLoc ="sample data2";
memberMasterUd2.sponsorId ="sample data2";
memberMasterUd2.governmentIdType ="sample data2";
memberMasterUd2.governmentIdIssueLoc ="sample data2";
memberMasterUd2.governmentIdExpireDate =new Date('2010-01-01');
memberMasterUd2.governmentId ="sample data2";
memberMasterUd2.emirateIdIssueLoc ="sample data2";
memberMasterUd2.emirateIdExpireDate =new Date('2010-01-01');
memberMasterUd2.emirateIdNo ="sample data2";
memberMasterUd2.ksaNationality ="sample data2";
memberMasterUd2.passportIssueLoc ="sample data2";
memberMasterUd2.passportExpireDate =new Date('2010-01-01');
memberMasterUd2.passportNumber ="sample data2";
memberMasterUd2.personNumber ="sample data2";
memberMasterUd2.subscriberId ="sample data2";
memberMasterUd2.seqSubsId =123;
memberMasterUd2.seqMembId =123;

var memberMasterUd3 = new MemberMasterUd();
memberMasterUd3.residencyLocationCode ="sample data3";
memberMasterUd3.comments ="sample data3";
memberMasterUd3.dubaiWorkLocationCode ="sample data3";
memberMasterUd3.uaeVisaStartDate =new Date('2010-01-01');
memberMasterUd3.updateProcess ="sample data3";
memberMasterUd3.updateUser ="sample data3";
memberMasterUd3.updateDatetime =new Date('2010-01-01');
memberMasterUd3.insertProcess ="sample data3";
memberMasterUd3.insertUser ="sample data3";
memberMasterUd3.insertDatetime =new Date('2010-01-01');
memberMasterUd3.userDate10 =new Date('2010-01-01');
memberMasterUd3.userDate9 =new Date('2010-01-01');
memberMasterUd3.userDate8 =new Date('2010-01-01');
memberMasterUd3.userDate7 =new Date('2010-01-01');
memberMasterUd3.userDate6 =new Date('2010-01-01');
memberMasterUd3.userDate5 =new Date('2010-01-01');
memberMasterUd3.userDate4 =new Date('2010-01-01');
memberMasterUd3.userDate3 =new Date('2010-01-01');
memberMasterUd3.userDate2 =new Date('2010-01-01');
memberMasterUd3.userDate1 =new Date('2010-01-01');
memberMasterUd3.userDefined25 ="sample data3";
memberMasterUd3.userDefined24 ="sample data3";
memberMasterUd3.userDefined23 ="sample data3";
memberMasterUd3.userDefined22 ="sample data3";
memberMasterUd3.userDefined21 ="sample data3";
memberMasterUd3.userDefined20 ="sample data3";
memberMasterUd3.userDefined19 ="sample data3";
memberMasterUd3.userDefined18 ="sample data3";
memberMasterUd3.userDefined17 ="sample data3";
memberMasterUd3.userDefined16 ="sample data3";
memberMasterUd3.userDefined15 ="sample data3";
memberMasterUd3.userDefined14 ="sample data3";
memberMasterUd3.userDefined13 ="sample data3";
memberMasterUd3.userDefined12 ="sample data3";
memberMasterUd3.userDefined11 ="sample data3";
memberMasterUd3.userDefined10 ="sample data3";
memberMasterUd3.userDefined9 ="sample data3";
memberMasterUd3.userDefined8 ="sample data3";
memberMasterUd3.userDefined7 ="sample data3";
memberMasterUd3.userDefined6 ="sample data3";
memberMasterUd3.userDefined5 ="sample data3";
memberMasterUd3.userDefined4 ="sample data3";
memberMasterUd3.userDefined3 ="sample data3";
memberMasterUd3.userDefined2 ="sample data3";
memberMasterUd3.userDefined1 ="sample data3";
memberMasterUd3.preferredCurrency ="sample data3";
memberMasterUd3.ksaProfession ="sample data3";
memberMasterUd3.sponsorIdType ="sample data3";
memberMasterUd3.sponsorIdIssueLoc ="sample data3";
memberMasterUd3.sponsorId ="sample data3";
memberMasterUd3.governmentIdType ="sample data3";
memberMasterUd3.governmentIdIssueLoc ="sample data3";
memberMasterUd3.governmentIdExpireDate =new Date('2010-01-01');
memberMasterUd3.governmentId ="sample data3";
memberMasterUd3.emirateIdIssueLoc ="sample data3";
memberMasterUd3.emirateIdExpireDate =new Date('2010-01-01');
memberMasterUd3.emirateIdNo ="sample data3";
memberMasterUd3.ksaNationality ="sample data3";
memberMasterUd3.passportIssueLoc ="sample data3";
memberMasterUd3.passportExpireDate =new Date('2010-01-01');
memberMasterUd3.passportNumber ="sample data3";
memberMasterUd3.personNumber ="sample data3";
memberMasterUd3.subscriberId ="sample data3";
memberMasterUd3.seqSubsId =123;
memberMasterUd3.seqMembId =123;


export const MemberMasterUds: MemberMasterUd[] = [
    memberMasterUd1,
    memberMasterUd2,
    memberMasterUd3,
];