/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcSavePricingAccntCode} from "../../api-models"

var procSavePricingAccntCode1 = new ProcSavePricingAccntCode();
procSavePricingAccntCode1.pPricingAccntCode ="sample data1";
procSavePricingAccntCode1.pSeqGroupId =123;
procSavePricingAccntCode1.pTradingPartner ="sample data1";
procSavePricingAccntCode1.pNewEffDate ="sample data1";
procSavePricingAccntCode1.pNewTermDate ="sample data1";
procSavePricingAccntCode1.pOldSeqPricingAccntId =123;
procSavePricingAccntCode1.pOldChangeReasonCode ="sample data1";
procSavePricingAccntCode1.pLanId ="sample data1";
procSavePricingAccntCode1.pMsg ="sample data1";

var procSavePricingAccntCode2 = new ProcSavePricingAccntCode();
procSavePricingAccntCode2.pPricingAccntCode ="sample data2";
procSavePricingAccntCode2.pSeqGroupId =123;
procSavePricingAccntCode2.pTradingPartner ="sample data2";
procSavePricingAccntCode2.pNewEffDate ="sample data2";
procSavePricingAccntCode2.pNewTermDate ="sample data2";
procSavePricingAccntCode2.pOldSeqPricingAccntId =123;
procSavePricingAccntCode2.pOldChangeReasonCode ="sample data2";
procSavePricingAccntCode2.pLanId ="sample data2";
procSavePricingAccntCode2.pMsg ="sample data2";

var procSavePricingAccntCode3 = new ProcSavePricingAccntCode();
procSavePricingAccntCode3.pPricingAccntCode ="sample data3";
procSavePricingAccntCode3.pSeqGroupId =123;
procSavePricingAccntCode3.pTradingPartner ="sample data3";
procSavePricingAccntCode3.pNewEffDate ="sample data3";
procSavePricingAccntCode3.pNewTermDate ="sample data3";
procSavePricingAccntCode3.pOldSeqPricingAccntId =123;
procSavePricingAccntCode3.pOldChangeReasonCode ="sample data3";
procSavePricingAccntCode3.pLanId ="sample data3";
procSavePricingAccntCode3.pMsg ="sample data3";


export const ProcSavePricingAccntCodes: ProcSavePricingAccntCode[] = [
    procSavePricingAccntCode1,
    procSavePricingAccntCode2,
    procSavePricingAccntCode3,
];