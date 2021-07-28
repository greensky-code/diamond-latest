/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvCredential} from "../../api-models"

var provCredential1 = new ProvCredential();
provCredential1.seqProvCredential =123;
provCredential1.seqProvId =123;
provCredential1.license1 ="sample data1";
provCredential1.state1 ="sample data1";
provCredential1.license1ExpireDt =new Date('2010-01-01');
provCredential1.license2 ="sample data1";
provCredential1.state2 ="sample data1";
provCredential1.license2ExpireDt =new Date('2010-01-01');
provCredential1.deaLicense ="sample data1";
provCredential1.deaExpireDate =new Date('2010-01-01');
provCredential1.insuranceCarrier1 ="sample data1";
provCredential1.insurancePolicy1 ="sample data1";
provCredential1.effectiveFrom1 =new Date('2010-01-01');
provCredential1.effectiveTo1 =new Date('2010-01-01');
provCredential1.claimLimit1 =123;
provCredential1.aggregLimit1 =123;
provCredential1.policyDescr1 ="sample data1";
provCredential1.insuranceCarrier2 ="sample data1";
provCredential1.insurancePolicy2 ="sample data1";
provCredential1.effectiveFrom2 =new Date('2010-01-01');
provCredential1.effectiveTo2 =new Date('2010-01-01');
provCredential1.claimLimit2 =123;
provCredential1.aggregateLimit2 =123;
provCredential1.policyDescr2 ="sample data1";
provCredential1.userDefined1 ="sample data1";
provCredential1.userDefined2 ="sample data1";
provCredential1.userDefined3 ="sample data1";
provCredential1.userDefined4 ="sample data1";
provCredential1.userDefined5 ="sample data1";
provCredential1.userDefined6 ="sample data1";
provCredential1.userDefined7 ="sample data1";
provCredential1.userDefined8 ="sample data1";
provCredential1.comments ="sample data1";
provCredential1.medicalSchool ="sample data1";
provCredential1.medSchoolDate =new Date('2010-01-01');
provCredential1.internship ="sample data1";
provCredential1.internshipDate =new Date('2010-01-01');
provCredential1.residency ="sample data1";
provCredential1.residencyDate =new Date('2010-01-01');
provCredential1.specialtyBoard1 ="sample data1";
provCredential1.board1FromDate =new Date('2010-01-01');
provCredential1.board1ToDate =new Date('2010-01-01');
provCredential1.specialtyBoard2 ="sample data1";
provCredential1.board2FromDate =new Date('2010-01-01');
provCredential1.board2ToDate =new Date('2010-01-01');
provCredential1.includeInDir ="sample data1";
provCredential1.lastPrintDate =new Date('2010-01-01');
provCredential1.securityCode ="sample data1";
provCredential1.insertDatetime =new Date('2010-01-01');
provCredential1.insertUser ="sample data1";
provCredential1.insertProcess ="sample data1";
provCredential1.updateDatetime =new Date('2010-01-01');
provCredential1.updateUser ="sample data1";
provCredential1.updateProcess ="sample data1";
provCredential1.country1 ="sample data1";
provCredential1.country2 ="sample data1";

var provCredential2 = new ProvCredential();
provCredential2.seqProvCredential =123;
provCredential2.seqProvId =123;
provCredential2.license1 ="sample data2";
provCredential2.state1 ="sample data2";
provCredential2.license1ExpireDt =new Date('2010-01-01');
provCredential2.license2 ="sample data2";
provCredential2.state2 ="sample data2";
provCredential2.license2ExpireDt =new Date('2010-01-01');
provCredential2.deaLicense ="sample data2";
provCredential2.deaExpireDate =new Date('2010-01-01');
provCredential2.insuranceCarrier1 ="sample data2";
provCredential2.insurancePolicy1 ="sample data2";
provCredential2.effectiveFrom1 =new Date('2010-01-01');
provCredential2.effectiveTo1 =new Date('2010-01-01');
provCredential2.claimLimit1 =123;
provCredential2.aggregLimit1 =123;
provCredential2.policyDescr1 ="sample data2";
provCredential2.insuranceCarrier2 ="sample data2";
provCredential2.insurancePolicy2 ="sample data2";
provCredential2.effectiveFrom2 =new Date('2010-01-01');
provCredential2.effectiveTo2 =new Date('2010-01-01');
provCredential2.claimLimit2 =123;
provCredential2.aggregateLimit2 =123;
provCredential2.policyDescr2 ="sample data2";
provCredential2.userDefined1 ="sample data2";
provCredential2.userDefined2 ="sample data2";
provCredential2.userDefined3 ="sample data2";
provCredential2.userDefined4 ="sample data2";
provCredential2.userDefined5 ="sample data2";
provCredential2.userDefined6 ="sample data2";
provCredential2.userDefined7 ="sample data2";
provCredential2.userDefined8 ="sample data2";
provCredential2.comments ="sample data2";
provCredential2.medicalSchool ="sample data2";
provCredential2.medSchoolDate =new Date('2010-01-01');
provCredential2.internship ="sample data2";
provCredential2.internshipDate =new Date('2010-01-01');
provCredential2.residency ="sample data2";
provCredential2.residencyDate =new Date('2010-01-01');
provCredential2.specialtyBoard1 ="sample data2";
provCredential2.board1FromDate =new Date('2010-01-01');
provCredential2.board1ToDate =new Date('2010-01-01');
provCredential2.specialtyBoard2 ="sample data2";
provCredential2.board2FromDate =new Date('2010-01-01');
provCredential2.board2ToDate =new Date('2010-01-01');
provCredential2.includeInDir ="sample data2";
provCredential2.lastPrintDate =new Date('2010-01-01');
provCredential2.securityCode ="sample data2";
provCredential2.insertDatetime =new Date('2010-01-01');
provCredential2.insertUser ="sample data2";
provCredential2.insertProcess ="sample data2";
provCredential2.updateDatetime =new Date('2010-01-01');
provCredential2.updateUser ="sample data2";
provCredential2.updateProcess ="sample data2";
provCredential2.country1 ="sample data2";
provCredential2.country2 ="sample data2";

var provCredential3 = new ProvCredential();
provCredential3.seqProvCredential =123;
provCredential3.seqProvId =123;
provCredential3.license1 ="sample data3";
provCredential3.state1 ="sample data3";
provCredential3.license1ExpireDt =new Date('2010-01-01');
provCredential3.license2 ="sample data3";
provCredential3.state2 ="sample data3";
provCredential3.license2ExpireDt =new Date('2010-01-01');
provCredential3.deaLicense ="sample data3";
provCredential3.deaExpireDate =new Date('2010-01-01');
provCredential3.insuranceCarrier1 ="sample data3";
provCredential3.insurancePolicy1 ="sample data3";
provCredential3.effectiveFrom1 =new Date('2010-01-01');
provCredential3.effectiveTo1 =new Date('2010-01-01');
provCredential3.claimLimit1 =123;
provCredential3.aggregLimit1 =123;
provCredential3.policyDescr1 ="sample data3";
provCredential3.insuranceCarrier2 ="sample data3";
provCredential3.insurancePolicy2 ="sample data3";
provCredential3.effectiveFrom2 =new Date('2010-01-01');
provCredential3.effectiveTo2 =new Date('2010-01-01');
provCredential3.claimLimit2 =123;
provCredential3.aggregateLimit2 =123;
provCredential3.policyDescr2 ="sample data3";
provCredential3.userDefined1 ="sample data3";
provCredential3.userDefined2 ="sample data3";
provCredential3.userDefined3 ="sample data3";
provCredential3.userDefined4 ="sample data3";
provCredential3.userDefined5 ="sample data3";
provCredential3.userDefined6 ="sample data3";
provCredential3.userDefined7 ="sample data3";
provCredential3.userDefined8 ="sample data3";
provCredential3.comments ="sample data3";
provCredential3.medicalSchool ="sample data3";
provCredential3.medSchoolDate =new Date('2010-01-01');
provCredential3.internship ="sample data3";
provCredential3.internshipDate =new Date('2010-01-01');
provCredential3.residency ="sample data3";
provCredential3.residencyDate =new Date('2010-01-01');
provCredential3.specialtyBoard1 ="sample data3";
provCredential3.board1FromDate =new Date('2010-01-01');
provCredential3.board1ToDate =new Date('2010-01-01');
provCredential3.specialtyBoard2 ="sample data3";
provCredential3.board2FromDate =new Date('2010-01-01');
provCredential3.board2ToDate =new Date('2010-01-01');
provCredential3.includeInDir ="sample data3";
provCredential3.lastPrintDate =new Date('2010-01-01');
provCredential3.securityCode ="sample data3";
provCredential3.insertDatetime =new Date('2010-01-01');
provCredential3.insertUser ="sample data3";
provCredential3.insertProcess ="sample data3";
provCredential3.updateDatetime =new Date('2010-01-01');
provCredential3.updateUser ="sample data3";
provCredential3.updateProcess ="sample data3";
provCredential3.country1 ="sample data3";
provCredential3.country2 ="sample data3";


export const ProvCredentials: ProvCredential[] = [
    provCredential1,
    provCredential2,
    provCredential3,
];