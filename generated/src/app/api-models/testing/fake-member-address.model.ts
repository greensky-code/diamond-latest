/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MemberAddress} from "../../api-models"

var memberAddress1 = new MemberAddress();
memberAddress1.seqMembId =123;
memberAddress1.addressType ="sample data1";
memberAddress1.insertDatetime =new Date('2010-01-01');
memberAddress1.insertUser ="sample data1";
memberAddress1.updateDatetime =new Date('2010-01-01');
memberAddress1.updateUser ="sample data1";
memberAddress1.addressLine1 ="sample data1";
memberAddress1.addressLine2 ="sample data1";
memberAddress1.city ="sample data1";
memberAddress1.state ="sample data1";
memberAddress1.zipCode ="sample data1";
memberAddress1.county ="sample data1";
memberAddress1.country ="sample data1";
memberAddress1.homePhoneNumber ="sample data1";
memberAddress1.fax ="sample data1";
memberAddress1.email ="sample data1";
memberAddress1.busPhoneNumber ="sample data1";
memberAddress1.beneficiaryRelCode ="sample data1";
memberAddress1.beneficiaryDob =new Date('2010-01-01');
memberAddress1.beneficiaryGender ="sample data1";
memberAddress1.memAddrUserDefined1 ="sample data1";
memberAddress1.memAddrUserDefined2 ="sample data1";
memberAddress1.memAddrUserDate1 =new Date('2010-01-01');
memberAddress1.memAddrUserDate2 =new Date('2010-01-01');
memberAddress1.lastName ="sample data1";
memberAddress1.firstName ="sample data1";
memberAddress1.mobilePhone ="sample data1";
memberAddress1.insertProcess ="sample data1";
memberAddress1.updateProcess ="sample data1";
memberAddress1.securityCode ="sample data1";

var memberAddress2 = new MemberAddress();
memberAddress2.seqMembId =123;
memberAddress2.addressType ="sample data2";
memberAddress2.insertDatetime =new Date('2010-01-01');
memberAddress2.insertUser ="sample data2";
memberAddress2.updateDatetime =new Date('2010-01-01');
memberAddress2.updateUser ="sample data2";
memberAddress2.addressLine1 ="sample data2";
memberAddress2.addressLine2 ="sample data2";
memberAddress2.city ="sample data2";
memberAddress2.state ="sample data2";
memberAddress2.zipCode ="sample data2";
memberAddress2.county ="sample data2";
memberAddress2.country ="sample data2";
memberAddress2.homePhoneNumber ="sample data2";
memberAddress2.fax ="sample data2";
memberAddress2.email ="sample data2";
memberAddress2.busPhoneNumber ="sample data2";
memberAddress2.beneficiaryRelCode ="sample data2";
memberAddress2.beneficiaryDob =new Date('2010-01-01');
memberAddress2.beneficiaryGender ="sample data2";
memberAddress2.memAddrUserDefined1 ="sample data2";
memberAddress2.memAddrUserDefined2 ="sample data2";
memberAddress2.memAddrUserDate1 =new Date('2010-01-01');
memberAddress2.memAddrUserDate2 =new Date('2010-01-01');
memberAddress2.lastName ="sample data2";
memberAddress2.firstName ="sample data2";
memberAddress2.mobilePhone ="sample data2";
memberAddress2.insertProcess ="sample data2";
memberAddress2.updateProcess ="sample data2";
memberAddress2.securityCode ="sample data2";

var memberAddress3 = new MemberAddress();
memberAddress3.seqMembId =123;
memberAddress3.addressType ="sample data3";
memberAddress3.insertDatetime =new Date('2010-01-01');
memberAddress3.insertUser ="sample data3";
memberAddress3.updateDatetime =new Date('2010-01-01');
memberAddress3.updateUser ="sample data3";
memberAddress3.addressLine1 ="sample data3";
memberAddress3.addressLine2 ="sample data3";
memberAddress3.city ="sample data3";
memberAddress3.state ="sample data3";
memberAddress3.zipCode ="sample data3";
memberAddress3.county ="sample data3";
memberAddress3.country ="sample data3";
memberAddress3.homePhoneNumber ="sample data3";
memberAddress3.fax ="sample data3";
memberAddress3.email ="sample data3";
memberAddress3.busPhoneNumber ="sample data3";
memberAddress3.beneficiaryRelCode ="sample data3";
memberAddress3.beneficiaryDob =new Date('2010-01-01');
memberAddress3.beneficiaryGender ="sample data3";
memberAddress3.memAddrUserDefined1 ="sample data3";
memberAddress3.memAddrUserDefined2 ="sample data3";
memberAddress3.memAddrUserDate1 =new Date('2010-01-01');
memberAddress3.memAddrUserDate2 =new Date('2010-01-01');
memberAddress3.lastName ="sample data3";
memberAddress3.firstName ="sample data3";
memberAddress3.mobilePhone ="sample data3";
memberAddress3.insertProcess ="sample data3";
memberAddress3.updateProcess ="sample data3";
memberAddress3.securityCode ="sample data3";


export const MemberAddresses: MemberAddress[] = [
    memberAddress1,
    memberAddress2,
    memberAddress3,
];