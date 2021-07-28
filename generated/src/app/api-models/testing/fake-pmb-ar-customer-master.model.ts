/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbArCustomerMaster} from "../../api-models"

var pmbArCustomerMaster1 = new PmbArCustomerMaster();
pmbArCustomerMaster1.customerType ="sample data1";
pmbArCustomerMaster1.customerId ="sample data1";
pmbArCustomerMaster1.shortName ="sample data1";
pmbArCustomerMaster1.customerName1 ="sample data1";
pmbArCustomerMaster1.customerName2 ="sample data1";
pmbArCustomerMaster1.customerAddrLine1 ="sample data1";
pmbArCustomerMaster1.customerAddrLine2 ="sample data1";
pmbArCustomerMaster1.customerCity ="sample data1";
pmbArCustomerMaster1.customerState ="sample data1";
pmbArCustomerMaster1.customerPostalCode ="sample data1";
pmbArCustomerMaster1.useEftFlg ="sample data1";
pmbArCustomerMaster1.country ="sample data1";
pmbArCustomerMaster1.userDefined1 ="sample data1";
pmbArCustomerMaster1.userDefined2 ="sample data1";
pmbArCustomerMaster1.securityCode ="sample data1";
pmbArCustomerMaster1.insertDatetime =new Date('2010-01-01');
pmbArCustomerMaster1.insertUser ="sample data1";
pmbArCustomerMaster1.insertProcess ="sample data1";
pmbArCustomerMaster1.updateDatetime =new Date('2010-01-01');
pmbArCustomerMaster1.updateUser ="sample data1";
pmbArCustomerMaster1.updateProcess ="sample data1";

var pmbArCustomerMaster2 = new PmbArCustomerMaster();
pmbArCustomerMaster2.customerType ="sample data2";
pmbArCustomerMaster2.customerId ="sample data2";
pmbArCustomerMaster2.shortName ="sample data2";
pmbArCustomerMaster2.customerName1 ="sample data2";
pmbArCustomerMaster2.customerName2 ="sample data2";
pmbArCustomerMaster2.customerAddrLine1 ="sample data2";
pmbArCustomerMaster2.customerAddrLine2 ="sample data2";
pmbArCustomerMaster2.customerCity ="sample data2";
pmbArCustomerMaster2.customerState ="sample data2";
pmbArCustomerMaster2.customerPostalCode ="sample data2";
pmbArCustomerMaster2.useEftFlg ="sample data2";
pmbArCustomerMaster2.country ="sample data2";
pmbArCustomerMaster2.userDefined1 ="sample data2";
pmbArCustomerMaster2.userDefined2 ="sample data2";
pmbArCustomerMaster2.securityCode ="sample data2";
pmbArCustomerMaster2.insertDatetime =new Date('2010-01-01');
pmbArCustomerMaster2.insertUser ="sample data2";
pmbArCustomerMaster2.insertProcess ="sample data2";
pmbArCustomerMaster2.updateDatetime =new Date('2010-01-01');
pmbArCustomerMaster2.updateUser ="sample data2";
pmbArCustomerMaster2.updateProcess ="sample data2";

var pmbArCustomerMaster3 = new PmbArCustomerMaster();
pmbArCustomerMaster3.customerType ="sample data3";
pmbArCustomerMaster3.customerId ="sample data3";
pmbArCustomerMaster3.shortName ="sample data3";
pmbArCustomerMaster3.customerName1 ="sample data3";
pmbArCustomerMaster3.customerName2 ="sample data3";
pmbArCustomerMaster3.customerAddrLine1 ="sample data3";
pmbArCustomerMaster3.customerAddrLine2 ="sample data3";
pmbArCustomerMaster3.customerCity ="sample data3";
pmbArCustomerMaster3.customerState ="sample data3";
pmbArCustomerMaster3.customerPostalCode ="sample data3";
pmbArCustomerMaster3.useEftFlg ="sample data3";
pmbArCustomerMaster3.country ="sample data3";
pmbArCustomerMaster3.userDefined1 ="sample data3";
pmbArCustomerMaster3.userDefined2 ="sample data3";
pmbArCustomerMaster3.securityCode ="sample data3";
pmbArCustomerMaster3.insertDatetime =new Date('2010-01-01');
pmbArCustomerMaster3.insertUser ="sample data3";
pmbArCustomerMaster3.insertProcess ="sample data3";
pmbArCustomerMaster3.updateDatetime =new Date('2010-01-01');
pmbArCustomerMaster3.updateUser ="sample data3";
pmbArCustomerMaster3.updateProcess ="sample data3";


export const PmbArCustomerMasters: PmbArCustomerMaster[] = [
    pmbArCustomerMaster1,
    pmbArCustomerMaster2,
    pmbArCustomerMaster3,
];