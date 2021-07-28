/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetVendorPaymentType} from "../../api-models"

var csfGetVendorPaymentType1 = new CsfGetVendorPaymentType();
csfGetVendorPaymentType1.pSeqVendId =123;
csfGetVendorPaymentType1.pSeqVendAddress =123;
csfGetVendorPaymentType1.pSeqProvId =123;

var csfGetVendorPaymentType2 = new CsfGetVendorPaymentType();
csfGetVendorPaymentType2.pSeqVendId =123;
csfGetVendorPaymentType2.pSeqVendAddress =123;
csfGetVendorPaymentType2.pSeqProvId =123;

var csfGetVendorPaymentType3 = new CsfGetVendorPaymentType();
csfGetVendorPaymentType3.pSeqVendId =123;
csfGetVendorPaymentType3.pSeqVendAddress =123;
csfGetVendorPaymentType3.pSeqProvId =123;


export const CsfGetVendorPaymentTypes: CsfGetVendorPaymentType[] = [
    csfGetVendorPaymentType1,
    csfGetVendorPaymentType2,
    csfGetVendorPaymentType3,
];