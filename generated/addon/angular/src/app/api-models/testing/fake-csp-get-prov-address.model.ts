/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetProvAddress} from "../../api-models"

var cspGetProvAddress1 = new CspGetProvAddress();
cspGetProvAddress1.pSeqClaimId =123;
cspGetProvAddress1.pPayeeName ="sample data1";
cspGetProvAddress1.pAddressLine1 ="sample data1";
cspGetProvAddress1.pAddressLine2 ="sample data1";
cspGetProvAddress1.pAddressLine3 ="sample data1";
cspGetProvAddress1.pCountryCode ="sample data1";
cspGetProvAddress1.pBankAddrFlg ="sample data1";
cspGetProvAddress1.pRoutingNum ="sample data1";
cspGetProvAddress1.pAccountNum ="sample data1";
cspGetProvAddress1.pBankName ="sample data1";

var cspGetProvAddress2 = new CspGetProvAddress();
cspGetProvAddress2.pSeqClaimId =123;
cspGetProvAddress2.pPayeeName ="sample data2";
cspGetProvAddress2.pAddressLine1 ="sample data2";
cspGetProvAddress2.pAddressLine2 ="sample data2";
cspGetProvAddress2.pAddressLine3 ="sample data2";
cspGetProvAddress2.pCountryCode ="sample data2";
cspGetProvAddress2.pBankAddrFlg ="sample data2";
cspGetProvAddress2.pRoutingNum ="sample data2";
cspGetProvAddress2.pAccountNum ="sample data2";
cspGetProvAddress2.pBankName ="sample data2";

var cspGetProvAddress3 = new CspGetProvAddress();
cspGetProvAddress3.pSeqClaimId =123;
cspGetProvAddress3.pPayeeName ="sample data3";
cspGetProvAddress3.pAddressLine1 ="sample data3";
cspGetProvAddress3.pAddressLine2 ="sample data3";
cspGetProvAddress3.pAddressLine3 ="sample data3";
cspGetProvAddress3.pCountryCode ="sample data3";
cspGetProvAddress3.pBankAddrFlg ="sample data3";
cspGetProvAddress3.pRoutingNum ="sample data3";
cspGetProvAddress3.pAccountNum ="sample data3";
cspGetProvAddress3.pBankName ="sample data3";


export const CspGetProvAddresses: CspGetProvAddress[] = [
    cspGetProvAddress1,
    cspGetProvAddress2,
    cspGetProvAddress3,
];