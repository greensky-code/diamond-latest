/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorTin} from "../../api-models"

var vendorTin1 = new VendorTin();
vendorTin1.updateProcess ="sample data1";
vendorTin1.updateUser ="sample data1";
vendorTin1.updateDatetime =new Date('2010-01-01');
vendorTin1.insertProcess ="sample data1";
vendorTin1.insertUser ="sample data1";
vendorTin1.insertDatetime =new Date('2010-01-01');
vendorTin1.securityCode ="sample data1";
vendorTin1.userDefinedDate =new Date('2010-01-01');
vendorTin1.userDefined2 ="sample data1";
vendorTin1.userDefined1 ="sample data1";
vendorTin1.vendor1099Flag ="sample data1";
vendorTin1.fax ="sample data1";
vendorTin1.ext ="sample data1";
vendorTin1.phone ="sample data1";
vendorTin1.title ="sample data1";
vendorTin1.contact ="sample data1";
vendorTin1.country ="sample data1";
vendorTin1.county ="sample data1";
vendorTin1.zipcode ="sample data1";
vendorTin1.state ="sample data1";
vendorTin1.city ="sample data1";
vendorTin1.address2 ="sample data1";
vendorTin1.address1 ="sample data1";
vendorTin1.taxEntityName ="sample data1";
vendorTin1.irsTaxId ="sample data1";

var vendorTin2 = new VendorTin();
vendorTin2.updateProcess ="sample data2";
vendorTin2.updateUser ="sample data2";
vendorTin2.updateDatetime =new Date('2010-01-01');
vendorTin2.insertProcess ="sample data2";
vendorTin2.insertUser ="sample data2";
vendorTin2.insertDatetime =new Date('2010-01-01');
vendorTin2.securityCode ="sample data2";
vendorTin2.userDefinedDate =new Date('2010-01-01');
vendorTin2.userDefined2 ="sample data2";
vendorTin2.userDefined1 ="sample data2";
vendorTin2.vendor1099Flag ="sample data2";
vendorTin2.fax ="sample data2";
vendorTin2.ext ="sample data2";
vendorTin2.phone ="sample data2";
vendorTin2.title ="sample data2";
vendorTin2.contact ="sample data2";
vendorTin2.country ="sample data2";
vendorTin2.county ="sample data2";
vendorTin2.zipcode ="sample data2";
vendorTin2.state ="sample data2";
vendorTin2.city ="sample data2";
vendorTin2.address2 ="sample data2";
vendorTin2.address1 ="sample data2";
vendorTin2.taxEntityName ="sample data2";
vendorTin2.irsTaxId ="sample data2";

var vendorTin3 = new VendorTin();
vendorTin3.updateProcess ="sample data3";
vendorTin3.updateUser ="sample data3";
vendorTin3.updateDatetime =new Date('2010-01-01');
vendorTin3.insertProcess ="sample data3";
vendorTin3.insertUser ="sample data3";
vendorTin3.insertDatetime =new Date('2010-01-01');
vendorTin3.securityCode ="sample data3";
vendorTin3.userDefinedDate =new Date('2010-01-01');
vendorTin3.userDefined2 ="sample data3";
vendorTin3.userDefined1 ="sample data3";
vendorTin3.vendor1099Flag ="sample data3";
vendorTin3.fax ="sample data3";
vendorTin3.ext ="sample data3";
vendorTin3.phone ="sample data3";
vendorTin3.title ="sample data3";
vendorTin3.contact ="sample data3";
vendorTin3.country ="sample data3";
vendorTin3.county ="sample data3";
vendorTin3.zipcode ="sample data3";
vendorTin3.state ="sample data3";
vendorTin3.city ="sample data3";
vendorTin3.address2 ="sample data3";
vendorTin3.address1 ="sample data3";
vendorTin3.taxEntityName ="sample data3";
vendorTin3.irsTaxId ="sample data3";


export const VendorTins: VendorTin[] = [
    vendorTin1,
    vendorTin2,
    vendorTin3,
];