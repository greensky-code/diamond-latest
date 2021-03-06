/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SiteAddress} from "../../api-models"

var siteAddress1 = new SiteAddress();
siteAddress1.siteCode ="sample data1";
siteAddress1.seqSiteAddressId =123;
siteAddress1.termReasonCode ="sample data1";
siteAddress1.name1 ="sample data1";
siteAddress1.name2 ="sample data1";
siteAddress1.addressLine1 ="sample data1";
siteAddress1.addressLine2 ="sample data1";
siteAddress1.city ="sample data1";
siteAddress1.county ="sample data1";
siteAddress1.state ="sample data1";
siteAddress1.zipCode ="sample data1";
siteAddress1.sundayHours ="sample data1";
siteAddress1.mondayHours ="sample data1";
siteAddress1.tuesdayHours ="sample data1";
siteAddress1.wednesdayHours ="sample data1";
siteAddress1.thursdayHours ="sample data1";
siteAddress1.fridayHours ="sample data1";
siteAddress1.saturdayHours ="sample data1";
siteAddress1.mailingAddressLine1 ="sample data1";
siteAddress1.mailingAddressLine2 ="sample data1";
siteAddress1.mailingCity ="sample data1";
siteAddress1.mailingCounty ="sample data1";
siteAddress1.mailingState ="sample data1";
siteAddress1.mailingZipCode ="sample data1";
siteAddress1.siteaUserDefined1 ="sample data1";
siteAddress1.siteaUserDefined2 ="sample data1";
siteAddress1.siteaUserDate1 =new Date('2010-01-01');
siteAddress1.siteaUserDate2 =new Date('2010-01-01');
siteAddress1.insertProcess ="sample data1";
siteAddress1.insertUser ="sample data1";
siteAddress1.insertDatetime =new Date('2010-01-01');
siteAddress1.updateProcess ="sample data1";
siteAddress1.updateUser ="sample data1";
siteAddress1.updateDatetime =new Date('2010-01-01');
siteAddress1.securityCode ="sample data1";
siteAddress1.certifiedFlg ="sample data1";
siteAddress1.effectiveDate =new Date('2010-01-01');
siteAddress1.termDate =new Date('2010-01-01');
siteAddress1.primaryAddressFlg ="sample data1";

var siteAddress2 = new SiteAddress();
siteAddress2.siteCode ="sample data2";
siteAddress2.seqSiteAddressId =123;
siteAddress2.termReasonCode ="sample data2";
siteAddress2.name1 ="sample data2";
siteAddress2.name2 ="sample data2";
siteAddress2.addressLine1 ="sample data2";
siteAddress2.addressLine2 ="sample data2";
siteAddress2.city ="sample data2";
siteAddress2.county ="sample data2";
siteAddress2.state ="sample data2";
siteAddress2.zipCode ="sample data2";
siteAddress2.sundayHours ="sample data2";
siteAddress2.mondayHours ="sample data2";
siteAddress2.tuesdayHours ="sample data2";
siteAddress2.wednesdayHours ="sample data2";
siteAddress2.thursdayHours ="sample data2";
siteAddress2.fridayHours ="sample data2";
siteAddress2.saturdayHours ="sample data2";
siteAddress2.mailingAddressLine1 ="sample data2";
siteAddress2.mailingAddressLine2 ="sample data2";
siteAddress2.mailingCity ="sample data2";
siteAddress2.mailingCounty ="sample data2";
siteAddress2.mailingState ="sample data2";
siteAddress2.mailingZipCode ="sample data2";
siteAddress2.siteaUserDefined1 ="sample data2";
siteAddress2.siteaUserDefined2 ="sample data2";
siteAddress2.siteaUserDate1 =new Date('2010-01-01');
siteAddress2.siteaUserDate2 =new Date('2010-01-01');
siteAddress2.insertProcess ="sample data2";
siteAddress2.insertUser ="sample data2";
siteAddress2.insertDatetime =new Date('2010-01-01');
siteAddress2.updateProcess ="sample data2";
siteAddress2.updateUser ="sample data2";
siteAddress2.updateDatetime =new Date('2010-01-01');
siteAddress2.securityCode ="sample data2";
siteAddress2.certifiedFlg ="sample data2";
siteAddress2.effectiveDate =new Date('2010-01-01');
siteAddress2.termDate =new Date('2010-01-01');
siteAddress2.primaryAddressFlg ="sample data2";

var siteAddress3 = new SiteAddress();
siteAddress3.siteCode ="sample data3";
siteAddress3.seqSiteAddressId =123;
siteAddress3.termReasonCode ="sample data3";
siteAddress3.name1 ="sample data3";
siteAddress3.name2 ="sample data3";
siteAddress3.addressLine1 ="sample data3";
siteAddress3.addressLine2 ="sample data3";
siteAddress3.city ="sample data3";
siteAddress3.county ="sample data3";
siteAddress3.state ="sample data3";
siteAddress3.zipCode ="sample data3";
siteAddress3.sundayHours ="sample data3";
siteAddress3.mondayHours ="sample data3";
siteAddress3.tuesdayHours ="sample data3";
siteAddress3.wednesdayHours ="sample data3";
siteAddress3.thursdayHours ="sample data3";
siteAddress3.fridayHours ="sample data3";
siteAddress3.saturdayHours ="sample data3";
siteAddress3.mailingAddressLine1 ="sample data3";
siteAddress3.mailingAddressLine2 ="sample data3";
siteAddress3.mailingCity ="sample data3";
siteAddress3.mailingCounty ="sample data3";
siteAddress3.mailingState ="sample data3";
siteAddress3.mailingZipCode ="sample data3";
siteAddress3.siteaUserDefined1 ="sample data3";
siteAddress3.siteaUserDefined2 ="sample data3";
siteAddress3.siteaUserDate1 =new Date('2010-01-01');
siteAddress3.siteaUserDate2 =new Date('2010-01-01');
siteAddress3.insertProcess ="sample data3";
siteAddress3.insertUser ="sample data3";
siteAddress3.insertDatetime =new Date('2010-01-01');
siteAddress3.updateProcess ="sample data3";
siteAddress3.updateUser ="sample data3";
siteAddress3.updateDatetime =new Date('2010-01-01');
siteAddress3.securityCode ="sample data3";
siteAddress3.certifiedFlg ="sample data3";
siteAddress3.effectiveDate =new Date('2010-01-01');
siteAddress3.termDate =new Date('2010-01-01');
siteAddress3.primaryAddressFlg ="sample data3";


export const SiteAddresses: SiteAddress[] = [
    siteAddress1,
    siteAddress2,
    siteAddress3,
];