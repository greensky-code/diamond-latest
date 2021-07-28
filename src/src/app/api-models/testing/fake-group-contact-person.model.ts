/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GroupContactPerson} from "../../api-models"

var groupContactPerson1 = new GroupContactPerson();
groupContactPerson1.emailId ="sample data1";
groupContactPerson1.primaryDistributionMethod ="sample data1";
groupContactPerson1.updateProcess ="sample data1";
groupContactPerson1.updateUser ="sample data1";
groupContactPerson1.updateDatetime =new Date('2010-01-01');
groupContactPerson1.insertProcess ="sample data1";
groupContactPerson1.insertUser ="sample data1";
groupContactPerson1.insertDatetime =new Date('2010-01-01');
groupContactPerson1.securityCode ="sample data1";
groupContactPerson1.faxNumber ="sample data1";
groupContactPerson1.extension ="sample data1";
groupContactPerson1.phoneNumber ="sample data1";
groupContactPerson1.contactTitle ="sample data1";
groupContactPerson1.contactName ="sample data1";
groupContactPerson1.seqGroupId =123;
groupContactPerson1.seqGroupContact =123;

var groupContactPerson2 = new GroupContactPerson();
groupContactPerson2.emailId ="sample data2";
groupContactPerson2.primaryDistributionMethod ="sample data2";
groupContactPerson2.updateProcess ="sample data2";
groupContactPerson2.updateUser ="sample data2";
groupContactPerson2.updateDatetime =new Date('2010-01-01');
groupContactPerson2.insertProcess ="sample data2";
groupContactPerson2.insertUser ="sample data2";
groupContactPerson2.insertDatetime =new Date('2010-01-01');
groupContactPerson2.securityCode ="sample data2";
groupContactPerson2.faxNumber ="sample data2";
groupContactPerson2.extension ="sample data2";
groupContactPerson2.phoneNumber ="sample data2";
groupContactPerson2.contactTitle ="sample data2";
groupContactPerson2.contactName ="sample data2";
groupContactPerson2.seqGroupId =123;
groupContactPerson2.seqGroupContact =123;

var groupContactPerson3 = new GroupContactPerson();
groupContactPerson3.emailId ="sample data3";
groupContactPerson3.primaryDistributionMethod ="sample data3";
groupContactPerson3.updateProcess ="sample data3";
groupContactPerson3.updateUser ="sample data3";
groupContactPerson3.updateDatetime =new Date('2010-01-01');
groupContactPerson3.insertProcess ="sample data3";
groupContactPerson3.insertUser ="sample data3";
groupContactPerson3.insertDatetime =new Date('2010-01-01');
groupContactPerson3.securityCode ="sample data3";
groupContactPerson3.faxNumber ="sample data3";
groupContactPerson3.extension ="sample data3";
groupContactPerson3.phoneNumber ="sample data3";
groupContactPerson3.contactTitle ="sample data3";
groupContactPerson3.contactName ="sample data3";
groupContactPerson3.seqGroupId =123;
groupContactPerson3.seqGroupContact =123;


export const GroupContactPersons: GroupContactPerson[] = [
    groupContactPerson1,
    groupContactPerson2,
    groupContactPerson3,
];