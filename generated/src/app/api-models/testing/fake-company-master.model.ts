/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CompanyMaster} from "../../api-models"

var companyMaster1 = new CompanyMaster();
companyMaster1.companyCode ="sample data1";
companyMaster1.description ="sample data1";
companyMaster1.name ="sample data1";
companyMaster1.addressLine1 ="sample data1";
companyMaster1.addressLine2 ="sample data1";
companyMaster1.city ="sample data1";
companyMaster1.state ="sample data1";
companyMaster1.zipCode ="sample data1";
companyMaster1.phoneNumber ="sample data1";
companyMaster1.faxNumber ="sample data1";
companyMaster1.medicalPayAcct ="sample data1";
companyMaster1.capPayAcct ="sample data1";
companyMaster1.tradePayAcct ="sample data1";
companyMaster1.irsTaxId ="sample data1";
companyMaster1.securityCode ="sample data1";
companyMaster1.insertDatetime =new Date('2010-01-01');
companyMaster1.insertUser ="sample data1";
companyMaster1.insertProcess ="sample data1";
companyMaster1.updateDatetime =new Date('2010-01-01');
companyMaster1.updateUser ="sample data1";
companyMaster1.updateProcess ="sample data1";
companyMaster1.manMedPayAcct ="sample data1";
companyMaster1.manCapPayAcct ="sample data1";
companyMaster1.country ="sample data1";
companyMaster1.vendorMinCheck =123;
companyMaster1.subscriberMinCheck =123;
companyMaster1.agentCommissionPayAcct ="sample data1";
companyMaster1.userDefined1 ="sample data1";

var companyMaster2 = new CompanyMaster();
companyMaster2.companyCode ="sample data2";
companyMaster2.description ="sample data2";
companyMaster2.name ="sample data2";
companyMaster2.addressLine1 ="sample data2";
companyMaster2.addressLine2 ="sample data2";
companyMaster2.city ="sample data2";
companyMaster2.state ="sample data2";
companyMaster2.zipCode ="sample data2";
companyMaster2.phoneNumber ="sample data2";
companyMaster2.faxNumber ="sample data2";
companyMaster2.medicalPayAcct ="sample data2";
companyMaster2.capPayAcct ="sample data2";
companyMaster2.tradePayAcct ="sample data2";
companyMaster2.irsTaxId ="sample data2";
companyMaster2.securityCode ="sample data2";
companyMaster2.insertDatetime =new Date('2010-01-01');
companyMaster2.insertUser ="sample data2";
companyMaster2.insertProcess ="sample data2";
companyMaster2.updateDatetime =new Date('2010-01-01');
companyMaster2.updateUser ="sample data2";
companyMaster2.updateProcess ="sample data2";
companyMaster2.manMedPayAcct ="sample data2";
companyMaster2.manCapPayAcct ="sample data2";
companyMaster2.country ="sample data2";
companyMaster2.vendorMinCheck =123;
companyMaster2.subscriberMinCheck =123;
companyMaster2.agentCommissionPayAcct ="sample data2";
companyMaster2.userDefined1 ="sample data2";

var companyMaster3 = new CompanyMaster();
companyMaster3.companyCode ="sample data3";
companyMaster3.description ="sample data3";
companyMaster3.name ="sample data3";
companyMaster3.addressLine1 ="sample data3";
companyMaster3.addressLine2 ="sample data3";
companyMaster3.city ="sample data3";
companyMaster3.state ="sample data3";
companyMaster3.zipCode ="sample data3";
companyMaster3.phoneNumber ="sample data3";
companyMaster3.faxNumber ="sample data3";
companyMaster3.medicalPayAcct ="sample data3";
companyMaster3.capPayAcct ="sample data3";
companyMaster3.tradePayAcct ="sample data3";
companyMaster3.irsTaxId ="sample data3";
companyMaster3.securityCode ="sample data3";
companyMaster3.insertDatetime =new Date('2010-01-01');
companyMaster3.insertUser ="sample data3";
companyMaster3.insertProcess ="sample data3";
companyMaster3.updateDatetime =new Date('2010-01-01');
companyMaster3.updateUser ="sample data3";
companyMaster3.updateProcess ="sample data3";
companyMaster3.manMedPayAcct ="sample data3";
companyMaster3.manCapPayAcct ="sample data3";
companyMaster3.country ="sample data3";
companyMaster3.vendorMinCheck =123;
companyMaster3.subscriberMinCheck =123;
companyMaster3.agentCommissionPayAcct ="sample data3";
companyMaster3.userDefined1 ="sample data3";


export const CompanyMasters: CompanyMaster[] = [
    companyMaster1,
    companyMaster2,
    companyMaster3,
];