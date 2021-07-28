/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetGunAddress} from "../../api-models"

var cspGetGunAddress1 = new CspGetGunAddress();
cspGetGunAddress1.pSeqEntityId =123;
cspGetGunAddress1.pAddrline1 ="sample data1";
cspGetGunAddress1.pCity ="sample data1";
cspGetGunAddress1.pState ="sample data1";
cspGetGunAddress1.pPostalCode ="sample data1";
cspGetGunAddress1.pCountryCode ="sample data1";

var cspGetGunAddress2 = new CspGetGunAddress();
cspGetGunAddress2.pSeqEntityId =123;
cspGetGunAddress2.pAddrline1 ="sample data2";
cspGetGunAddress2.pCity ="sample data2";
cspGetGunAddress2.pState ="sample data2";
cspGetGunAddress2.pPostalCode ="sample data2";
cspGetGunAddress2.pCountryCode ="sample data2";

var cspGetGunAddress3 = new CspGetGunAddress();
cspGetGunAddress3.pSeqEntityId =123;
cspGetGunAddress3.pAddrline1 ="sample data3";
cspGetGunAddress3.pCity ="sample data3";
cspGetGunAddress3.pState ="sample data3";
cspGetGunAddress3.pPostalCode ="sample data3";
cspGetGunAddress3.pCountryCode ="sample data3";


export const CspGetGunAddresses: CspGetGunAddress[] = [
    cspGetGunAddress1,
    cspGetGunAddress2,
    cspGetGunAddress3,
];