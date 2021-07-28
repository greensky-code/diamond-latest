/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetVendAddress} from "../../api-models"

var cspGetVendAddress1 = new CspGetVendAddress();
cspGetVendAddress1.pVendorId ="sample data1";
cspGetVendAddress1.pLastName ="sample data1";
cspGetVendAddress1.pFirstName ="sample data1";
cspGetVendAddress1.pDisplayTerm ="sample data1";

var cspGetVendAddress2 = new CspGetVendAddress();
cspGetVendAddress2.pVendorId ="sample data2";
cspGetVendAddress2.pLastName ="sample data2";
cspGetVendAddress2.pFirstName ="sample data2";
cspGetVendAddress2.pDisplayTerm ="sample data2";

var cspGetVendAddress3 = new CspGetVendAddress();
cspGetVendAddress3.pVendorId ="sample data3";
cspGetVendAddress3.pLastName ="sample data3";
cspGetVendAddress3.pFirstName ="sample data3";
cspGetVendAddress3.pDisplayTerm ="sample data3";


export const CspGetVendAddresses: CspGetVendAddress[] = [
    cspGetVendAddress1,
    cspGetVendAddress2,
    cspGetVendAddress3,
];