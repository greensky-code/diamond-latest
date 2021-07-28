/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetVendAddressCount} from "../../api-models"

var cspGetVendAddressCount1 = new CspGetVendAddressCount();
cspGetVendAddressCount1.pVendorId ="sample data1";
cspGetVendAddressCount1.pLastName ="sample data1";
cspGetVendAddressCount1.pFirstName ="sample data1";
cspGetVendAddressCount1.pDisplayTerm ="sample data1";
cspGetVendAddressCount1.pRecordCount =123;

var cspGetVendAddressCount2 = new CspGetVendAddressCount();
cspGetVendAddressCount2.pVendorId ="sample data2";
cspGetVendAddressCount2.pLastName ="sample data2";
cspGetVendAddressCount2.pFirstName ="sample data2";
cspGetVendAddressCount2.pDisplayTerm ="sample data2";
cspGetVendAddressCount2.pRecordCount =123;

var cspGetVendAddressCount3 = new CspGetVendAddressCount();
cspGetVendAddressCount3.pVendorId ="sample data3";
cspGetVendAddressCount3.pLastName ="sample data3";
cspGetVendAddressCount3.pFirstName ="sample data3";
cspGetVendAddressCount3.pDisplayTerm ="sample data3";
cspGetVendAddressCount3.pRecordCount =123;


export const CspGetVendAddressCounts: CspGetVendAddressCount[] = [
    cspGetVendAddressCount1,
    cspGetVendAddressCount2,
    cspGetVendAddressCount3,
];