/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetGroupAddressInfo} from "../../api-models"

var cspGetGroupAddressInfo1 = new CspGetGroupAddressInfo();
cspGetGroupAddressInfo1.pSeqGroupId =123;
cspGetGroupAddressInfo1.pAddressLine1 ="sample data1";
cspGetGroupAddressInfo1.pAddressLine2 ="sample data1";
cspGetGroupAddressInfo1.pCity ="sample data1";
cspGetGroupAddressInfo1.pState ="sample data1";
cspGetGroupAddressInfo1.pZipCode ="sample data1";
cspGetGroupAddressInfo1.pCountry ="sample data1";

var cspGetGroupAddressInfo2 = new CspGetGroupAddressInfo();
cspGetGroupAddressInfo2.pSeqGroupId =123;
cspGetGroupAddressInfo2.pAddressLine1 ="sample data2";
cspGetGroupAddressInfo2.pAddressLine2 ="sample data2";
cspGetGroupAddressInfo2.pCity ="sample data2";
cspGetGroupAddressInfo2.pState ="sample data2";
cspGetGroupAddressInfo2.pZipCode ="sample data2";
cspGetGroupAddressInfo2.pCountry ="sample data2";

var cspGetGroupAddressInfo3 = new CspGetGroupAddressInfo();
cspGetGroupAddressInfo3.pSeqGroupId =123;
cspGetGroupAddressInfo3.pAddressLine1 ="sample data3";
cspGetGroupAddressInfo3.pAddressLine2 ="sample data3";
cspGetGroupAddressInfo3.pCity ="sample data3";
cspGetGroupAddressInfo3.pState ="sample data3";
cspGetGroupAddressInfo3.pZipCode ="sample data3";
cspGetGroupAddressInfo3.pCountry ="sample data3";


export const CspGetGroupAddressInfos: CspGetGroupAddressInfo[] = [
    cspGetGroupAddressInfo1,
    cspGetGroupAddressInfo2,
    cspGetGroupAddressInfo3,
];