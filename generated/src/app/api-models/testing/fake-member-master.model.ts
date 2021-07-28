/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberMaster} from "../../api-models"

var memberMaster1 = new MemberMaster();
memberMaster1.seqMembId =123;
memberMaster1.seqSubsId =123;
memberMaster1.subscriberId ="sample data1";
memberMaster1.personNumber ="sample data1";
memberMaster1.lastName ="sample data1";
memberMaster1.firstName ="sample data1";
memberMaster1.middleInitial ="sample data1";
memberMaster1.addressLine1 ="sample data1";
memberMaster1.addressLine2 ="sample data1";
memberMaster1.city ="sample data1";
memberMaster1.state ="sample data1";
memberMaster1.zipCode ="sample data1";
memberMaster1.homePhoneNumber ="sample data1";
memberMaster1.busPhoneNumber ="sample data1";
memberMaster1.contactTitle ="sample data1";
memberMaster1.dateOfBirth =new Date('2010-01-01');
memberMaster1.gender ="sample data1";
memberMaster1.maritalStatus ="sample data1";
memberMaster1.languageCode ="sample data1";
memberMaster1.userDefined1 ="sample data1";
memberMaster1.userDefined2 ="sample data1";
memberMaster1.medicareNo ="sample data1";
memberMaster1.medicaidNo ="sample data1";
memberMaster1.socialSecNo ="sample data1";
memberMaster1.employeeNo ="sample data1";
memberMaster1.medicalRecNo ="sample data1";
memberMaster1.seqAltMembId =123;
memberMaster1.holdReason ="sample data1";
memberMaster1.holdDate =new Date('2010-01-01');
memberMaster1.depVerifStatus ="sample data1";
memberMaster1.akaLastName ="sample data1";
memberMaster1.akaFirstName ="sample data1";
memberMaster1.akaAddressLine1 ="sample data1";
memberMaster1.akaAddressLine2 ="sample data1";
memberMaster1.akaCity ="sample data1";
memberMaster1.akaState ="sample data1";
memberMaster1.akaZipCode ="sample data1";
memberMaster1.akaPhoneNumber ="sample data1";
memberMaster1.respLastName ="sample data1";
memberMaster1.respFirstName ="sample data1";
memberMaster1.respAddressLine1 ="sample data1";
memberMaster1.respAddressLine2 ="sample data1";
memberMaster1.respCity ="sample data1";
memberMaster1.respState ="sample data1";
memberMaster1.respZipCode ="sample data1";
memberMaster1.respPhoneNumber ="sample data1";
memberMaster1.verfiedThruDate =new Date('2010-01-01');
memberMaster1.subsUpdate ="sample data1";
memberMaster1.securityCode ="sample data1";
memberMaster1.insertDatetime =new Date('2010-01-01');
memberMaster1.insertUser ="sample data1";
memberMaster1.insertProcess ="sample data1";
memberMaster1.updateDatetime =new Date('2010-01-01');
memberMaster1.updateUser ="sample data1";
memberMaster1.updateProcess ="sample data1";
memberMaster1.caseManagementSwitch ="sample data1";
memberMaster1.akaCountry ="sample data1";
memberMaster1.respCountry ="sample data1";
memberMaster1.country ="sample data1";
memberMaster1.prevSubscriberId ="sample data1";
memberMaster1.subscIdChangeRequestUser ="sample data1";
memberMaster1.subscIdChangeRequestDate =new Date('2010-01-01');
memberMaster1.diamondId ="sample data1";
memberMaster1.dualCoverageFlag ="sample data1";
memberMaster1.verifOthCoverDate =new Date('2010-01-01');
memberMaster1.verifFollowUpDate =new Date('2010-01-01');
memberMaster1.verifStatusCode ="sample data1";
memberMaster1.employmentStatusCode ="sample data1";
memberMaster1.userDefined3 ="sample data1";
memberMaster1.userDefined4 ="sample data1";
memberMaster1.userDefined5 ="sample data1";
memberMaster1.userDefined6 ="sample data1";
memberMaster1.userDefined7 ="sample data1";
memberMaster1.userDefined8 ="sample data1";
memberMaster1.userDefined9 ="sample data1";
memberMaster1.userDefined10 ="sample data1";
memberMaster1.userDefined11 ="sample data1";
memberMaster1.userDefined12 ="sample data1";
memberMaster1.userDefined13 ="sample data1";
memberMaster1.userDefined14 ="sample data1";
memberMaster1.userDefined15 ="sample data1";
memberMaster1.userDefined16 ="sample data1";
memberMaster1.userDefined17 ="sample data1";
memberMaster1.userDefined18 ="sample data1";
memberMaster1.userDefined19 ="sample data1";
memberMaster1.userDefined20 ="sample data1";
memberMaster1.userDefined21 ="sample data1";
memberMaster1.userDefined22 ="sample data1";
memberMaster1.userDate1 =new Date('2010-01-01');
memberMaster1.userDate2 =new Date('2010-01-01');
memberMaster1.userDate3 =new Date('2010-01-01');
memberMaster1.userDate4 =new Date('2010-01-01');
memberMaster1.userDate5 =new Date('2010-01-01');
memberMaster1.userDate6 =new Date('2010-01-01');
memberMaster1.userDate7 =new Date('2010-01-01');
memberMaster1.userDate8 =new Date('2010-01-01');
memberMaster1.userDate9 =new Date('2010-01-01');
memberMaster1.userDate10 =new Date('2010-01-01');
memberMaster1.userDate11 =new Date('2010-01-01');
memberMaster1.userDate12 =new Date('2010-01-01');
memberMaster1.userDate13 =new Date('2010-01-01');
memberMaster1.userDate14 =new Date('2010-01-01');
memberMaster1.userDate15 =new Date('2010-01-01');
memberMaster1.userDate16 =new Date('2010-01-01');
memberMaster1.userDate17 =new Date('2010-01-01');
memberMaster1.userDate18 =new Date('2010-01-01');
memberMaster1.userDate19 =new Date('2010-01-01');
memberMaster1.userDate20 =new Date('2010-01-01');
memberMaster1.longitude =123;
memberMaster1.latitude =123;
memberMaster1.geoResult ="sample data1";
memberMaster1.privLastName ="sample data1";
memberMaster1.privFirstName ="sample data1";
memberMaster1.privAddressLine1 ="sample data1";
memberMaster1.privAddressLine2 ="sample data1";
memberMaster1.privCity ="sample data1";
memberMaster1.privState ="sample data1";
memberMaster1.privZipCode ="sample data1";
memberMaster1.privPhoneNumber ="sample data1";
memberMaster1.privCountry ="sample data1";
memberMaster1.mcIndicator ="sample data1";
memberMaster1.studentStatusDetail ="sample data1";
memberMaster1.depVerifUserDefined1 ="sample data1";
memberMaster1.depVerifUserDefined2 ="sample data1";
memberMaster1.depVerifUserDate1 =new Date('2010-01-01');
memberMaster1.depVerifUserDate2 =new Date('2010-01-01');
memberMaster1.cobVerifUserDefined1 ="sample data1";
memberMaster1.cobVerifUserDefined2 ="sample data1";
memberMaster1.cobVerifUserDate1 =new Date('2010-01-01');
memberMaster1.cobVerifUserDate2 =new Date('2010-01-01');

var memberMaster2 = new MemberMaster();
memberMaster2.seqMembId =123;
memberMaster2.seqSubsId =123;
memberMaster2.subscriberId ="sample data2";
memberMaster2.personNumber ="sample data2";
memberMaster2.lastName ="sample data2";
memberMaster2.firstName ="sample data2";
memberMaster2.middleInitial ="sample data2";
memberMaster2.addressLine1 ="sample data2";
memberMaster2.addressLine2 ="sample data2";
memberMaster2.city ="sample data2";
memberMaster2.state ="sample data2";
memberMaster2.zipCode ="sample data2";
memberMaster2.homePhoneNumber ="sample data2";
memberMaster2.busPhoneNumber ="sample data2";
memberMaster2.contactTitle ="sample data2";
memberMaster2.dateOfBirth =new Date('2010-01-01');
memberMaster2.gender ="sample data2";
memberMaster2.maritalStatus ="sample data2";
memberMaster2.languageCode ="sample data2";
memberMaster2.userDefined1 ="sample data2";
memberMaster2.userDefined2 ="sample data2";
memberMaster2.medicareNo ="sample data2";
memberMaster2.medicaidNo ="sample data2";
memberMaster2.socialSecNo ="sample data2";
memberMaster2.employeeNo ="sample data2";
memberMaster2.medicalRecNo ="sample data2";
memberMaster2.seqAltMembId =123;
memberMaster2.holdReason ="sample data2";
memberMaster2.holdDate =new Date('2010-01-01');
memberMaster2.depVerifStatus ="sample data2";
memberMaster2.akaLastName ="sample data2";
memberMaster2.akaFirstName ="sample data2";
memberMaster2.akaAddressLine1 ="sample data2";
memberMaster2.akaAddressLine2 ="sample data2";
memberMaster2.akaCity ="sample data2";
memberMaster2.akaState ="sample data2";
memberMaster2.akaZipCode ="sample data2";
memberMaster2.akaPhoneNumber ="sample data2";
memberMaster2.respLastName ="sample data2";
memberMaster2.respFirstName ="sample data2";
memberMaster2.respAddressLine1 ="sample data2";
memberMaster2.respAddressLine2 ="sample data2";
memberMaster2.respCity ="sample data2";
memberMaster2.respState ="sample data2";
memberMaster2.respZipCode ="sample data2";
memberMaster2.respPhoneNumber ="sample data2";
memberMaster2.verfiedThruDate =new Date('2010-01-01');
memberMaster2.subsUpdate ="sample data2";
memberMaster2.securityCode ="sample data2";
memberMaster2.insertDatetime =new Date('2010-01-01');
memberMaster2.insertUser ="sample data2";
memberMaster2.insertProcess ="sample data2";
memberMaster2.updateDatetime =new Date('2010-01-01');
memberMaster2.updateUser ="sample data2";
memberMaster2.updateProcess ="sample data2";
memberMaster2.caseManagementSwitch ="sample data2";
memberMaster2.akaCountry ="sample data2";
memberMaster2.respCountry ="sample data2";
memberMaster2.country ="sample data2";
memberMaster2.prevSubscriberId ="sample data2";
memberMaster2.subscIdChangeRequestUser ="sample data2";
memberMaster2.subscIdChangeRequestDate =new Date('2010-01-01');
memberMaster2.diamondId ="sample data2";
memberMaster2.dualCoverageFlag ="sample data2";
memberMaster2.verifOthCoverDate =new Date('2010-01-01');
memberMaster2.verifFollowUpDate =new Date('2010-01-01');
memberMaster2.verifStatusCode ="sample data2";
memberMaster2.employmentStatusCode ="sample data2";
memberMaster2.userDefined3 ="sample data2";
memberMaster2.userDefined4 ="sample data2";
memberMaster2.userDefined5 ="sample data2";
memberMaster2.userDefined6 ="sample data2";
memberMaster2.userDefined7 ="sample data2";
memberMaster2.userDefined8 ="sample data2";
memberMaster2.userDefined9 ="sample data2";
memberMaster2.userDefined10 ="sample data2";
memberMaster2.userDefined11 ="sample data2";
memberMaster2.userDefined12 ="sample data2";
memberMaster2.userDefined13 ="sample data2";
memberMaster2.userDefined14 ="sample data2";
memberMaster2.userDefined15 ="sample data2";
memberMaster2.userDefined16 ="sample data2";
memberMaster2.userDefined17 ="sample data2";
memberMaster2.userDefined18 ="sample data2";
memberMaster2.userDefined19 ="sample data2";
memberMaster2.userDefined20 ="sample data2";
memberMaster2.userDefined21 ="sample data2";
memberMaster2.userDefined22 ="sample data2";
memberMaster2.userDate1 =new Date('2010-01-01');
memberMaster2.userDate2 =new Date('2010-01-01');
memberMaster2.userDate3 =new Date('2010-01-01');
memberMaster2.userDate4 =new Date('2010-01-01');
memberMaster2.userDate5 =new Date('2010-01-01');
memberMaster2.userDate6 =new Date('2010-01-01');
memberMaster2.userDate7 =new Date('2010-01-01');
memberMaster2.userDate8 =new Date('2010-01-01');
memberMaster2.userDate9 =new Date('2010-01-01');
memberMaster2.userDate10 =new Date('2010-01-01');
memberMaster2.userDate11 =new Date('2010-01-01');
memberMaster2.userDate12 =new Date('2010-01-01');
memberMaster2.userDate13 =new Date('2010-01-01');
memberMaster2.userDate14 =new Date('2010-01-01');
memberMaster2.userDate15 =new Date('2010-01-01');
memberMaster2.userDate16 =new Date('2010-01-01');
memberMaster2.userDate17 =new Date('2010-01-01');
memberMaster2.userDate18 =new Date('2010-01-01');
memberMaster2.userDate19 =new Date('2010-01-01');
memberMaster2.userDate20 =new Date('2010-01-01');
memberMaster2.longitude =123;
memberMaster2.latitude =123;
memberMaster2.geoResult ="sample data2";
memberMaster2.privLastName ="sample data2";
memberMaster2.privFirstName ="sample data2";
memberMaster2.privAddressLine1 ="sample data2";
memberMaster2.privAddressLine2 ="sample data2";
memberMaster2.privCity ="sample data2";
memberMaster2.privState ="sample data2";
memberMaster2.privZipCode ="sample data2";
memberMaster2.privPhoneNumber ="sample data2";
memberMaster2.privCountry ="sample data2";
memberMaster2.mcIndicator ="sample data2";
memberMaster2.studentStatusDetail ="sample data2";
memberMaster2.depVerifUserDefined1 ="sample data2";
memberMaster2.depVerifUserDefined2 ="sample data2";
memberMaster2.depVerifUserDate1 =new Date('2010-01-01');
memberMaster2.depVerifUserDate2 =new Date('2010-01-01');
memberMaster2.cobVerifUserDefined1 ="sample data2";
memberMaster2.cobVerifUserDefined2 ="sample data2";
memberMaster2.cobVerifUserDate1 =new Date('2010-01-01');
memberMaster2.cobVerifUserDate2 =new Date('2010-01-01');

var memberMaster3 = new MemberMaster();
memberMaster3.seqMembId =123;
memberMaster3.seqSubsId =123;
memberMaster3.subscriberId ="sample data3";
memberMaster3.personNumber ="sample data3";
memberMaster3.lastName ="sample data3";
memberMaster3.firstName ="sample data3";
memberMaster3.middleInitial ="sample data3";
memberMaster3.addressLine1 ="sample data3";
memberMaster3.addressLine2 ="sample data3";
memberMaster3.city ="sample data3";
memberMaster3.state ="sample data3";
memberMaster3.zipCode ="sample data3";
memberMaster3.homePhoneNumber ="sample data3";
memberMaster3.busPhoneNumber ="sample data3";
memberMaster3.contactTitle ="sample data3";
memberMaster3.dateOfBirth =new Date('2010-01-01');
memberMaster3.gender ="sample data3";
memberMaster3.maritalStatus ="sample data3";
memberMaster3.languageCode ="sample data3";
memberMaster3.userDefined1 ="sample data3";
memberMaster3.userDefined2 ="sample data3";
memberMaster3.medicareNo ="sample data3";
memberMaster3.medicaidNo ="sample data3";
memberMaster3.socialSecNo ="sample data3";
memberMaster3.employeeNo ="sample data3";
memberMaster3.medicalRecNo ="sample data3";
memberMaster3.seqAltMembId =123;
memberMaster3.holdReason ="sample data3";
memberMaster3.holdDate =new Date('2010-01-01');
memberMaster3.depVerifStatus ="sample data3";
memberMaster3.akaLastName ="sample data3";
memberMaster3.akaFirstName ="sample data3";
memberMaster3.akaAddressLine1 ="sample data3";
memberMaster3.akaAddressLine2 ="sample data3";
memberMaster3.akaCity ="sample data3";
memberMaster3.akaState ="sample data3";
memberMaster3.akaZipCode ="sample data3";
memberMaster3.akaPhoneNumber ="sample data3";
memberMaster3.respLastName ="sample data3";
memberMaster3.respFirstName ="sample data3";
memberMaster3.respAddressLine1 ="sample data3";
memberMaster3.respAddressLine2 ="sample data3";
memberMaster3.respCity ="sample data3";
memberMaster3.respState ="sample data3";
memberMaster3.respZipCode ="sample data3";
memberMaster3.respPhoneNumber ="sample data3";
memberMaster3.verfiedThruDate =new Date('2010-01-01');
memberMaster3.subsUpdate ="sample data3";
memberMaster3.securityCode ="sample data3";
memberMaster3.insertDatetime =new Date('2010-01-01');
memberMaster3.insertUser ="sample data3";
memberMaster3.insertProcess ="sample data3";
memberMaster3.updateDatetime =new Date('2010-01-01');
memberMaster3.updateUser ="sample data3";
memberMaster3.updateProcess ="sample data3";
memberMaster3.caseManagementSwitch ="sample data3";
memberMaster3.akaCountry ="sample data3";
memberMaster3.respCountry ="sample data3";
memberMaster3.country ="sample data3";
memberMaster3.prevSubscriberId ="sample data3";
memberMaster3.subscIdChangeRequestUser ="sample data3";
memberMaster3.subscIdChangeRequestDate =new Date('2010-01-01');
memberMaster3.diamondId ="sample data3";
memberMaster3.dualCoverageFlag ="sample data3";
memberMaster3.verifOthCoverDate =new Date('2010-01-01');
memberMaster3.verifFollowUpDate =new Date('2010-01-01');
memberMaster3.verifStatusCode ="sample data3";
memberMaster3.employmentStatusCode ="sample data3";
memberMaster3.userDefined3 ="sample data3";
memberMaster3.userDefined4 ="sample data3";
memberMaster3.userDefined5 ="sample data3";
memberMaster3.userDefined6 ="sample data3";
memberMaster3.userDefined7 ="sample data3";
memberMaster3.userDefined8 ="sample data3";
memberMaster3.userDefined9 ="sample data3";
memberMaster3.userDefined10 ="sample data3";
memberMaster3.userDefined11 ="sample data3";
memberMaster3.userDefined12 ="sample data3";
memberMaster3.userDefined13 ="sample data3";
memberMaster3.userDefined14 ="sample data3";
memberMaster3.userDefined15 ="sample data3";
memberMaster3.userDefined16 ="sample data3";
memberMaster3.userDefined17 ="sample data3";
memberMaster3.userDefined18 ="sample data3";
memberMaster3.userDefined19 ="sample data3";
memberMaster3.userDefined20 ="sample data3";
memberMaster3.userDefined21 ="sample data3";
memberMaster3.userDefined22 ="sample data3";
memberMaster3.userDate1 =new Date('2010-01-01');
memberMaster3.userDate2 =new Date('2010-01-01');
memberMaster3.userDate3 =new Date('2010-01-01');
memberMaster3.userDate4 =new Date('2010-01-01');
memberMaster3.userDate5 =new Date('2010-01-01');
memberMaster3.userDate6 =new Date('2010-01-01');
memberMaster3.userDate7 =new Date('2010-01-01');
memberMaster3.userDate8 =new Date('2010-01-01');
memberMaster3.userDate9 =new Date('2010-01-01');
memberMaster3.userDate10 =new Date('2010-01-01');
memberMaster3.userDate11 =new Date('2010-01-01');
memberMaster3.userDate12 =new Date('2010-01-01');
memberMaster3.userDate13 =new Date('2010-01-01');
memberMaster3.userDate14 =new Date('2010-01-01');
memberMaster3.userDate15 =new Date('2010-01-01');
memberMaster3.userDate16 =new Date('2010-01-01');
memberMaster3.userDate17 =new Date('2010-01-01');
memberMaster3.userDate18 =new Date('2010-01-01');
memberMaster3.userDate19 =new Date('2010-01-01');
memberMaster3.userDate20 =new Date('2010-01-01');
memberMaster3.longitude =123;
memberMaster3.latitude =123;
memberMaster3.geoResult ="sample data3";
memberMaster3.privLastName ="sample data3";
memberMaster3.privFirstName ="sample data3";
memberMaster3.privAddressLine1 ="sample data3";
memberMaster3.privAddressLine2 ="sample data3";
memberMaster3.privCity ="sample data3";
memberMaster3.privState ="sample data3";
memberMaster3.privZipCode ="sample data3";
memberMaster3.privPhoneNumber ="sample data3";
memberMaster3.privCountry ="sample data3";
memberMaster3.mcIndicator ="sample data3";
memberMaster3.studentStatusDetail ="sample data3";
memberMaster3.depVerifUserDefined1 ="sample data3";
memberMaster3.depVerifUserDefined2 ="sample data3";
memberMaster3.depVerifUserDate1 =new Date('2010-01-01');
memberMaster3.depVerifUserDate2 =new Date('2010-01-01');
memberMaster3.cobVerifUserDefined1 ="sample data3";
memberMaster3.cobVerifUserDefined2 ="sample data3";
memberMaster3.cobVerifUserDate1 =new Date('2010-01-01');
memberMaster3.cobVerifUserDate2 =new Date('2010-01-01');


export const MemberMasters: MemberMaster[] = [
    memberMaster1,
    memberMaster2,
    memberMaster3,
];