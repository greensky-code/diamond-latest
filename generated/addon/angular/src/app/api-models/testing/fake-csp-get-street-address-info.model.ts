/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetStreetAddressInfo} from "../../api-models"

var cspGetStreetAddressInfo1 = new CspGetStreetAddressInfo();
cspGetStreetAddressInfo1.pSeqAddrId =123;
cspGetStreetAddressInfo1.pSeqEntityId =123;
cspGetStreetAddressInfo1.pAddressCode ="sample data1";
cspGetStreetAddressInfo1.pPaymentCode ="sample data1";
cspGetStreetAddressInfo1.pSeqAccountId =123;
cspGetStreetAddressInfo1.pCountryCode ="sample data1";
cspGetStreetAddressInfo1.pAddrline1 ="sample data1";
cspGetStreetAddressInfo1.pAddrline2 ="sample data1";
cspGetStreetAddressInfo1.pAddrline3 ="sample data1";
cspGetStreetAddressInfo1.pCareof ="sample data1";
cspGetStreetAddressInfo1.pCity ="sample data1";
cspGetStreetAddressInfo1.pState ="sample data1";
cspGetStreetAddressInfo1.pPostalCode ="sample data1";
cspGetStreetAddressInfo1.pDistrict ="sample data1";
cspGetStreetAddressInfo1.pProvince ="sample data1";

var cspGetStreetAddressInfo2 = new CspGetStreetAddressInfo();
cspGetStreetAddressInfo2.pSeqAddrId =123;
cspGetStreetAddressInfo2.pSeqEntityId =123;
cspGetStreetAddressInfo2.pAddressCode ="sample data2";
cspGetStreetAddressInfo2.pPaymentCode ="sample data2";
cspGetStreetAddressInfo2.pSeqAccountId =123;
cspGetStreetAddressInfo2.pCountryCode ="sample data2";
cspGetStreetAddressInfo2.pAddrline1 ="sample data2";
cspGetStreetAddressInfo2.pAddrline2 ="sample data2";
cspGetStreetAddressInfo2.pAddrline3 ="sample data2";
cspGetStreetAddressInfo2.pCareof ="sample data2";
cspGetStreetAddressInfo2.pCity ="sample data2";
cspGetStreetAddressInfo2.pState ="sample data2";
cspGetStreetAddressInfo2.pPostalCode ="sample data2";
cspGetStreetAddressInfo2.pDistrict ="sample data2";
cspGetStreetAddressInfo2.pProvince ="sample data2";

var cspGetStreetAddressInfo3 = new CspGetStreetAddressInfo();
cspGetStreetAddressInfo3.pSeqAddrId =123;
cspGetStreetAddressInfo3.pSeqEntityId =123;
cspGetStreetAddressInfo3.pAddressCode ="sample data3";
cspGetStreetAddressInfo3.pPaymentCode ="sample data3";
cspGetStreetAddressInfo3.pSeqAccountId =123;
cspGetStreetAddressInfo3.pCountryCode ="sample data3";
cspGetStreetAddressInfo3.pAddrline1 ="sample data3";
cspGetStreetAddressInfo3.pAddrline2 ="sample data3";
cspGetStreetAddressInfo3.pAddrline3 ="sample data3";
cspGetStreetAddressInfo3.pCareof ="sample data3";
cspGetStreetAddressInfo3.pCity ="sample data3";
cspGetStreetAddressInfo3.pState ="sample data3";
cspGetStreetAddressInfo3.pPostalCode ="sample data3";
cspGetStreetAddressInfo3.pDistrict ="sample data3";
cspGetStreetAddressInfo3.pProvince ="sample data3";


export const CspGetStreetAddressInfos: CspGetStreetAddressInfo[] = [
    cspGetStreetAddressInfo1,
    cspGetStreetAddressInfo2,
    cspGetStreetAddressInfo3,
];