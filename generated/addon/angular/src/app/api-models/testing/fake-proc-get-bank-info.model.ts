/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetBankInfo} from "../../api-models"

var procGetBankInfo1 = new ProcGetBankInfo();
procGetBankInfo1.pRoutingNum ="sample data1";
procGetBankInfo1.pBankName ="sample data1";
procGetBankInfo1.pCity ="sample data1";
procGetBankInfo1.pState ="sample data1";
procGetBankInfo1.pPostalCode ="sample data1";
procGetBankInfo1.pCountryCode ="sample data1";
procGetBankInfo1.pEntityCode ="sample data1";
procGetBankInfo1.pPaymentType ="sample data1";

var procGetBankInfo2 = new ProcGetBankInfo();
procGetBankInfo2.pRoutingNum ="sample data2";
procGetBankInfo2.pBankName ="sample data2";
procGetBankInfo2.pCity ="sample data2";
procGetBankInfo2.pState ="sample data2";
procGetBankInfo2.pPostalCode ="sample data2";
procGetBankInfo2.pCountryCode ="sample data2";
procGetBankInfo2.pEntityCode ="sample data2";
procGetBankInfo2.pPaymentType ="sample data2";

var procGetBankInfo3 = new ProcGetBankInfo();
procGetBankInfo3.pRoutingNum ="sample data3";
procGetBankInfo3.pBankName ="sample data3";
procGetBankInfo3.pCity ="sample data3";
procGetBankInfo3.pState ="sample data3";
procGetBankInfo3.pPostalCode ="sample data3";
procGetBankInfo3.pCountryCode ="sample data3";
procGetBankInfo3.pEntityCode ="sample data3";
procGetBankInfo3.pPaymentType ="sample data3";


export const ProcGetBankInfos: ProcGetBankInfo[] = [
    procGetBankInfo1,
    procGetBankInfo2,
    procGetBankInfo3,
];