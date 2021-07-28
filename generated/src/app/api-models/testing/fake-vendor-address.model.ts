/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorAddress} from "../../api-models"

var vendorAddress1 = new VendorAddress();
vendorAddress1.seqVendAddress =123;
vendorAddress1.seqVendId =123;
vendorAddress1.name2 ="sample data1";
vendorAddress1.addressLine1 ="sample data1";
vendorAddress1.addressLine2 ="sample data1";
vendorAddress1.city ="sample data1";
vendorAddress1.state ="sample data1";
vendorAddress1.zipCode ="sample data1";
vendorAddress1.county ="sample data1";
vendorAddress1.securityCode ="sample data1";
vendorAddress1.insertDatetime =new Date('2010-01-01');
vendorAddress1.insertUser ="sample data1";
vendorAddress1.insertProcess ="sample data1";
vendorAddress1.updateDatetime =new Date('2010-01-01');
vendorAddress1.updateUser ="sample data1";
vendorAddress1.updateProcess ="sample data1";
vendorAddress1.userDefined1 ="sample data1";
vendorAddress1.userDefined2 ="sample data1";
vendorAddress1.userDefinedDate =new Date('2010-01-01');
vendorAddress1.seqVendAddrBillOvrd =123;
vendorAddress1.country ="sample data1";
vendorAddress1.primaryAddress ="sample data1";
vendorAddress1.userDate2 =new Date('2010-01-01');

var vendorAddress2 = new VendorAddress();
vendorAddress2.seqVendAddress =123;
vendorAddress2.seqVendId =123;
vendorAddress2.name2 ="sample data2";
vendorAddress2.addressLine1 ="sample data2";
vendorAddress2.addressLine2 ="sample data2";
vendorAddress2.city ="sample data2";
vendorAddress2.state ="sample data2";
vendorAddress2.zipCode ="sample data2";
vendorAddress2.county ="sample data2";
vendorAddress2.securityCode ="sample data2";
vendorAddress2.insertDatetime =new Date('2010-01-01');
vendorAddress2.insertUser ="sample data2";
vendorAddress2.insertProcess ="sample data2";
vendorAddress2.updateDatetime =new Date('2010-01-01');
vendorAddress2.updateUser ="sample data2";
vendorAddress2.updateProcess ="sample data2";
vendorAddress2.userDefined1 ="sample data2";
vendorAddress2.userDefined2 ="sample data2";
vendorAddress2.userDefinedDate =new Date('2010-01-01');
vendorAddress2.seqVendAddrBillOvrd =123;
vendorAddress2.country ="sample data2";
vendorAddress2.primaryAddress ="sample data2";
vendorAddress2.userDate2 =new Date('2010-01-01');

var vendorAddress3 = new VendorAddress();
vendorAddress3.seqVendAddress =123;
vendorAddress3.seqVendId =123;
vendorAddress3.name2 ="sample data3";
vendorAddress3.addressLine1 ="sample data3";
vendorAddress3.addressLine2 ="sample data3";
vendorAddress3.city ="sample data3";
vendorAddress3.state ="sample data3";
vendorAddress3.zipCode ="sample data3";
vendorAddress3.county ="sample data3";
vendorAddress3.securityCode ="sample data3";
vendorAddress3.insertDatetime =new Date('2010-01-01');
vendorAddress3.insertUser ="sample data3";
vendorAddress3.insertProcess ="sample data3";
vendorAddress3.updateDatetime =new Date('2010-01-01');
vendorAddress3.updateUser ="sample data3";
vendorAddress3.updateProcess ="sample data3";
vendorAddress3.userDefined1 ="sample data3";
vendorAddress3.userDefined2 ="sample data3";
vendorAddress3.userDefinedDate =new Date('2010-01-01');
vendorAddress3.seqVendAddrBillOvrd =123;
vendorAddress3.country ="sample data3";
vendorAddress3.primaryAddress ="sample data3";
vendorAddress3.userDate2 =new Date('2010-01-01');


export const VendorAddresses: VendorAddress[] = [
    vendorAddress1,
    vendorAddress2,
    vendorAddress3,
];