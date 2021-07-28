/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetBankInfo} from "../../api-models"

var cspGetBankInfo1 = new CspGetBankInfo();
cspGetBankInfo1.pSeqBankId =123;
cspGetBankInfo1.pRoutingNum ="sample data1";
cspGetBankInfo1.pActiveInd ="sample data1";
cspGetBankInfo1.pDirectDepositInd ="sample data1";
cspGetBankInfo1.pAchInd ="sample data1";
cspGetBankInfo1.pBankName ="sample data1";

var cspGetBankInfo2 = new CspGetBankInfo();
cspGetBankInfo2.pSeqBankId =123;
cspGetBankInfo2.pRoutingNum ="sample data2";
cspGetBankInfo2.pActiveInd ="sample data2";
cspGetBankInfo2.pDirectDepositInd ="sample data2";
cspGetBankInfo2.pAchInd ="sample data2";
cspGetBankInfo2.pBankName ="sample data2";

var cspGetBankInfo3 = new CspGetBankInfo();
cspGetBankInfo3.pSeqBankId =123;
cspGetBankInfo3.pRoutingNum ="sample data3";
cspGetBankInfo3.pActiveInd ="sample data3";
cspGetBankInfo3.pDirectDepositInd ="sample data3";
cspGetBankInfo3.pAchInd ="sample data3";
cspGetBankInfo3.pBankName ="sample data3";


export const CspGetBankInfos: CspGetBankInfo[] = [
    cspGetBankInfo1,
    cspGetBankInfo2,
    cspGetBankInfo3,
];