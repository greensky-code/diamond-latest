/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SubmitterProfileMaster} from "../../api-models"

var submitterProfileMaster1 = new SubmitterProfileMaster();
submitterProfileMaster1.country ="sample data1";
submitterProfileMaster1.userDefined7 ="sample data1";
submitterProfileMaster1.userDefined6 ="sample data1";
submitterProfileMaster1.userDefined5 ="sample data1";
submitterProfileMaster1.userDefined4 ="sample data1";
submitterProfileMaster1.userDefined3 ="sample data1";
submitterProfileMaster1.userDefined2 ="sample data1";
submitterProfileMaster1.userDefined1 ="sample data1";
submitterProfileMaster1.updateProcess ="sample data1";
submitterProfileMaster1.updateUser ="sample data1";
submitterProfileMaster1.updateDatetime =new Date('2010-01-01');
submitterProfileMaster1.insertProcess ="sample data1";
submitterProfileMaster1.insertUser ="sample data1";
submitterProfileMaster1.insertDatetime =new Date('2010-01-01');
submitterProfileMaster1.securityCode ="sample data1";
submitterProfileMaster1.modemSpeed ="sample data1";
submitterProfileMaster1.modemModel ="sample data1";
submitterProfileMaster1.modemMake ="sample data1";
submitterProfileMaster1.computerDialupNo ="sample data1";
submitterProfileMaster1.externalReference ="sample data1";
submitterProfileMaster1.faxNumber ="sample data1";
submitterProfileMaster1.phoneNumber ="sample data1";
submitterProfileMaster1.contactTitle ="sample data1";
submitterProfileMaster1.contactName ="sample data1";
submitterProfileMaster1.zipCode ="sample data1";
submitterProfileMaster1.state ="sample data1";
submitterProfileMaster1.city ="sample data1";
submitterProfileMaster1.addressLine2 ="sample data1";
submitterProfileMaster1.addressLine1 ="sample data1";
submitterProfileMaster1.submitterName ="sample data1";
submitterProfileMaster1.submitterId ="sample data1";

var submitterProfileMaster2 = new SubmitterProfileMaster();
submitterProfileMaster2.country ="sample data2";
submitterProfileMaster2.userDefined7 ="sample data2";
submitterProfileMaster2.userDefined6 ="sample data2";
submitterProfileMaster2.userDefined5 ="sample data2";
submitterProfileMaster2.userDefined4 ="sample data2";
submitterProfileMaster2.userDefined3 ="sample data2";
submitterProfileMaster2.userDefined2 ="sample data2";
submitterProfileMaster2.userDefined1 ="sample data2";
submitterProfileMaster2.updateProcess ="sample data2";
submitterProfileMaster2.updateUser ="sample data2";
submitterProfileMaster2.updateDatetime =new Date('2010-01-01');
submitterProfileMaster2.insertProcess ="sample data2";
submitterProfileMaster2.insertUser ="sample data2";
submitterProfileMaster2.insertDatetime =new Date('2010-01-01');
submitterProfileMaster2.securityCode ="sample data2";
submitterProfileMaster2.modemSpeed ="sample data2";
submitterProfileMaster2.modemModel ="sample data2";
submitterProfileMaster2.modemMake ="sample data2";
submitterProfileMaster2.computerDialupNo ="sample data2";
submitterProfileMaster2.externalReference ="sample data2";
submitterProfileMaster2.faxNumber ="sample data2";
submitterProfileMaster2.phoneNumber ="sample data2";
submitterProfileMaster2.contactTitle ="sample data2";
submitterProfileMaster2.contactName ="sample data2";
submitterProfileMaster2.zipCode ="sample data2";
submitterProfileMaster2.state ="sample data2";
submitterProfileMaster2.city ="sample data2";
submitterProfileMaster2.addressLine2 ="sample data2";
submitterProfileMaster2.addressLine1 ="sample data2";
submitterProfileMaster2.submitterName ="sample data2";
submitterProfileMaster2.submitterId ="sample data2";

var submitterProfileMaster3 = new SubmitterProfileMaster();
submitterProfileMaster3.country ="sample data3";
submitterProfileMaster3.userDefined7 ="sample data3";
submitterProfileMaster3.userDefined6 ="sample data3";
submitterProfileMaster3.userDefined5 ="sample data3";
submitterProfileMaster3.userDefined4 ="sample data3";
submitterProfileMaster3.userDefined3 ="sample data3";
submitterProfileMaster3.userDefined2 ="sample data3";
submitterProfileMaster3.userDefined1 ="sample data3";
submitterProfileMaster3.updateProcess ="sample data3";
submitterProfileMaster3.updateUser ="sample data3";
submitterProfileMaster3.updateDatetime =new Date('2010-01-01');
submitterProfileMaster3.insertProcess ="sample data3";
submitterProfileMaster3.insertUser ="sample data3";
submitterProfileMaster3.insertDatetime =new Date('2010-01-01');
submitterProfileMaster3.securityCode ="sample data3";
submitterProfileMaster3.modemSpeed ="sample data3";
submitterProfileMaster3.modemModel ="sample data3";
submitterProfileMaster3.modemMake ="sample data3";
submitterProfileMaster3.computerDialupNo ="sample data3";
submitterProfileMaster3.externalReference ="sample data3";
submitterProfileMaster3.faxNumber ="sample data3";
submitterProfileMaster3.phoneNumber ="sample data3";
submitterProfileMaster3.contactTitle ="sample data3";
submitterProfileMaster3.contactName ="sample data3";
submitterProfileMaster3.zipCode ="sample data3";
submitterProfileMaster3.state ="sample data3";
submitterProfileMaster3.city ="sample data3";
submitterProfileMaster3.addressLine2 ="sample data3";
submitterProfileMaster3.addressLine1 ="sample data3";
submitterProfileMaster3.submitterName ="sample data3";
submitterProfileMaster3.submitterId ="sample data3";


export const SubmitterProfileMasters: SubmitterProfileMaster[] = [
    submitterProfileMaster1,
    submitterProfileMaster2,
    submitterProfileMaster3,
];