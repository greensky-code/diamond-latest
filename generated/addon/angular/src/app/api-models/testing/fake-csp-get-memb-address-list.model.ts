/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetMembAddressList} from "../../api-models"

var cspGetMembAddressList1 = new CspGetMembAddressList();
cspGetMembAddressList1.pSeqEntityId =123;
cspGetMembAddressList1.pSeqClaimId =123;
cspGetMembAddressList1.pDocCode ="sample data1";
cspGetMembAddressList1.pAddrIdList ="sample data1";
cspGetMembAddressList1.pAddrSourceList ="sample data1";
cspGetMembAddressList1.pAddrCodeList ="sample data1";
cspGetMembAddressList1.pAddrFlagList ="sample data1";

var cspGetMembAddressList2 = new CspGetMembAddressList();
cspGetMembAddressList2.pSeqEntityId =123;
cspGetMembAddressList2.pSeqClaimId =123;
cspGetMembAddressList2.pDocCode ="sample data2";
cspGetMembAddressList2.pAddrIdList ="sample data2";
cspGetMembAddressList2.pAddrSourceList ="sample data2";
cspGetMembAddressList2.pAddrCodeList ="sample data2";
cspGetMembAddressList2.pAddrFlagList ="sample data2";

var cspGetMembAddressList3 = new CspGetMembAddressList();
cspGetMembAddressList3.pSeqEntityId =123;
cspGetMembAddressList3.pSeqClaimId =123;
cspGetMembAddressList3.pDocCode ="sample data3";
cspGetMembAddressList3.pAddrIdList ="sample data3";
cspGetMembAddressList3.pAddrSourceList ="sample data3";
cspGetMembAddressList3.pAddrCodeList ="sample data3";
cspGetMembAddressList3.pAddrFlagList ="sample data3";


export const CspGetMembAddressLists: CspGetMembAddressList[] = [
    cspGetMembAddressList1,
    cspGetMembAddressList2,
    cspGetMembAddressList3,
];