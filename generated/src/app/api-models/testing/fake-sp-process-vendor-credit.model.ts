/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SpProcessVendorCredit} from "../../api-models"

var spProcessVendorCredit1 = new SpProcessVendorCredit();
spProcessVendorCredit1.piSeqVendCredit ="sample data1";
spProcessVendorCredit1.poNReturnCode =123;
spProcessVendorCredit1.poNErrCode =123;
spProcessVendorCredit1.poSSubs1 ="sample data1";
spProcessVendorCredit1.poSSubs2 ="sample data1";

var spProcessVendorCredit2 = new SpProcessVendorCredit();
spProcessVendorCredit2.piSeqVendCredit ="sample data2";
spProcessVendorCredit2.poNReturnCode =123;
spProcessVendorCredit2.poNErrCode =123;
spProcessVendorCredit2.poSSubs1 ="sample data2";
spProcessVendorCredit2.poSSubs2 ="sample data2";

var spProcessVendorCredit3 = new SpProcessVendorCredit();
spProcessVendorCredit3.piSeqVendCredit ="sample data3";
spProcessVendorCredit3.poNReturnCode =123;
spProcessVendorCredit3.poNErrCode =123;
spProcessVendorCredit3.poSSubs1 ="sample data3";
spProcessVendorCredit3.poSSubs2 ="sample data3";


export const SpProcessVendorCredits: SpProcessVendorCredit[] = [
    spProcessVendorCredit1,
    spProcessVendorCredit2,
    spProcessVendorCredit3,
];