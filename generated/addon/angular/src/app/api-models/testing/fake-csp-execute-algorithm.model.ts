/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspExecuteAlgorithm} from "../../api-models"

var cspExecuteAlgorithm1 = new CspExecuteAlgorithm();
cspExecuteAlgorithm1.pSeqEntityId =123;
cspExecuteAlgorithm1.pDocCode ="sample data1";
cspExecuteAlgorithm1.pCwwClaimInd =123;
cspExecuteAlgorithm1.pAddrId =123;
cspExecuteAlgorithm1.pAddrSource ="sample data1";
cspExecuteAlgorithm1.pAddrCode ="sample data1";
cspExecuteAlgorithm1.pAddrIdList ="sample data1";
cspExecuteAlgorithm1.pAddrSourceList ="sample data1";
cspExecuteAlgorithm1.pAddrCodeList ="sample data1";
cspExecuteAlgorithm1.pAddrFlagList ="sample data1";

var cspExecuteAlgorithm2 = new CspExecuteAlgorithm();
cspExecuteAlgorithm2.pSeqEntityId =123;
cspExecuteAlgorithm2.pDocCode ="sample data2";
cspExecuteAlgorithm2.pCwwClaimInd =123;
cspExecuteAlgorithm2.pAddrId =123;
cspExecuteAlgorithm2.pAddrSource ="sample data2";
cspExecuteAlgorithm2.pAddrCode ="sample data2";
cspExecuteAlgorithm2.pAddrIdList ="sample data2";
cspExecuteAlgorithm2.pAddrSourceList ="sample data2";
cspExecuteAlgorithm2.pAddrCodeList ="sample data2";
cspExecuteAlgorithm2.pAddrFlagList ="sample data2";

var cspExecuteAlgorithm3 = new CspExecuteAlgorithm();
cspExecuteAlgorithm3.pSeqEntityId =123;
cspExecuteAlgorithm3.pDocCode ="sample data3";
cspExecuteAlgorithm3.pCwwClaimInd =123;
cspExecuteAlgorithm3.pAddrId =123;
cspExecuteAlgorithm3.pAddrSource ="sample data3";
cspExecuteAlgorithm3.pAddrCode ="sample data3";
cspExecuteAlgorithm3.pAddrIdList ="sample data3";
cspExecuteAlgorithm3.pAddrSourceList ="sample data3";
cspExecuteAlgorithm3.pAddrCodeList ="sample data3";
cspExecuteAlgorithm3.pAddrFlagList ="sample data3";


export const CspExecuteAlgorithms: CspExecuteAlgorithm[] = [
    cspExecuteAlgorithm1,
    cspExecuteAlgorithm2,
    cspExecuteAlgorithm3,
];