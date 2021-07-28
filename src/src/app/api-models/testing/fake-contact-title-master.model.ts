/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ContactTitleMaster} from "../../api-models"

var contactTitleMaster1 = new ContactTitleMaster();
contactTitleMaster1.titleType ="sample data1";
contactTitleMaster1.updateProcess ="sample data1";
contactTitleMaster1.updateUser ="sample data1";
contactTitleMaster1.updateDatetime =new Date('2010-01-01');
contactTitleMaster1.insertProcess ="sample data1";
contactTitleMaster1.insertUser ="sample data1";
contactTitleMaster1.insertDatetime =new Date('2010-01-01');
contactTitleMaster1.securityCode ="sample data1";
contactTitleMaster1.description ="sample data1";
contactTitleMaster1.contactTitle ="sample data1";

var contactTitleMaster2 = new ContactTitleMaster();
contactTitleMaster2.titleType ="sample data2";
contactTitleMaster2.updateProcess ="sample data2";
contactTitleMaster2.updateUser ="sample data2";
contactTitleMaster2.updateDatetime =new Date('2010-01-01');
contactTitleMaster2.insertProcess ="sample data2";
contactTitleMaster2.insertUser ="sample data2";
contactTitleMaster2.insertDatetime =new Date('2010-01-01');
contactTitleMaster2.securityCode ="sample data2";
contactTitleMaster2.description ="sample data2";
contactTitleMaster2.contactTitle ="sample data2";

var contactTitleMaster3 = new ContactTitleMaster();
contactTitleMaster3.titleType ="sample data3";
contactTitleMaster3.updateProcess ="sample data3";
contactTitleMaster3.updateUser ="sample data3";
contactTitleMaster3.updateDatetime =new Date('2010-01-01');
contactTitleMaster3.insertProcess ="sample data3";
contactTitleMaster3.insertUser ="sample data3";
contactTitleMaster3.insertDatetime =new Date('2010-01-01');
contactTitleMaster3.securityCode ="sample data3";
contactTitleMaster3.description ="sample data3";
contactTitleMaster3.contactTitle ="sample data3";


export const ContactTitleMasters: ContactTitleMaster[] = [
    contactTitleMaster1,
    contactTitleMaster2,
    contactTitleMaster3,
];