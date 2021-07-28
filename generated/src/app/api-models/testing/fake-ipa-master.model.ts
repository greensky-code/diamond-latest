/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IpaMaster} from "../../api-models"

var ipaMaster1 = new IpaMaster();
ipaMaster1.ipaId ="sample data1";
ipaMaster1.description ="sample data1";
ipaMaster1.name ="sample data1";
ipaMaster1.address1 ="sample data1";
ipaMaster1.address2 ="sample data1";
ipaMaster1.city ="sample data1";
ipaMaster1.state ="sample data1";
ipaMaster1.zipCode ="sample data1";
ipaMaster1.contactName ="sample data1";
ipaMaster1.phoneNumber ="sample data1";
ipaMaster1.faxNumber ="sample data1";
ipaMaster1.securityCode ="sample data1";
ipaMaster1.insertDatetime =new Date('2010-01-01');
ipaMaster1.insertUser ="sample data1";
ipaMaster1.insertProcess ="sample data1";
ipaMaster1.updateDatetime =new Date('2010-01-01');
ipaMaster1.updateUser ="sample data1";
ipaMaster1.updateProcess ="sample data1";
ipaMaster1.ipaParentId ="sample data1";
ipaMaster1.levelCode ="sample data1";
ipaMaster1.ipaVendor =123;
ipaMaster1.country ="sample data1";
ipaMaster1.ipaVendAddress =123;

var ipaMaster2 = new IpaMaster();
ipaMaster2.ipaId ="sample data2";
ipaMaster2.description ="sample data2";
ipaMaster2.name ="sample data2";
ipaMaster2.address1 ="sample data2";
ipaMaster2.address2 ="sample data2";
ipaMaster2.city ="sample data2";
ipaMaster2.state ="sample data2";
ipaMaster2.zipCode ="sample data2";
ipaMaster2.contactName ="sample data2";
ipaMaster2.phoneNumber ="sample data2";
ipaMaster2.faxNumber ="sample data2";
ipaMaster2.securityCode ="sample data2";
ipaMaster2.insertDatetime =new Date('2010-01-01');
ipaMaster2.insertUser ="sample data2";
ipaMaster2.insertProcess ="sample data2";
ipaMaster2.updateDatetime =new Date('2010-01-01');
ipaMaster2.updateUser ="sample data2";
ipaMaster2.updateProcess ="sample data2";
ipaMaster2.ipaParentId ="sample data2";
ipaMaster2.levelCode ="sample data2";
ipaMaster2.ipaVendor =123;
ipaMaster2.country ="sample data2";
ipaMaster2.ipaVendAddress =123;

var ipaMaster3 = new IpaMaster();
ipaMaster3.ipaId ="sample data3";
ipaMaster3.description ="sample data3";
ipaMaster3.name ="sample data3";
ipaMaster3.address1 ="sample data3";
ipaMaster3.address2 ="sample data3";
ipaMaster3.city ="sample data3";
ipaMaster3.state ="sample data3";
ipaMaster3.zipCode ="sample data3";
ipaMaster3.contactName ="sample data3";
ipaMaster3.phoneNumber ="sample data3";
ipaMaster3.faxNumber ="sample data3";
ipaMaster3.securityCode ="sample data3";
ipaMaster3.insertDatetime =new Date('2010-01-01');
ipaMaster3.insertUser ="sample data3";
ipaMaster3.insertProcess ="sample data3";
ipaMaster3.updateDatetime =new Date('2010-01-01');
ipaMaster3.updateUser ="sample data3";
ipaMaster3.updateProcess ="sample data3";
ipaMaster3.ipaParentId ="sample data3";
ipaMaster3.levelCode ="sample data3";
ipaMaster3.ipaVendor =123;
ipaMaster3.country ="sample data3";
ipaMaster3.ipaVendAddress =123;


export const IpaMasters: IpaMaster[] = [
    ipaMaster1,
    ipaMaster2,
    ipaMaster3,
];