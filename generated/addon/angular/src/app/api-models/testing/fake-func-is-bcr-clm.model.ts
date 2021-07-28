/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncIsBcrClm} from "../../api-models"

var funcIsBcrClm1 = new FuncIsBcrClm();
funcIsBcrClm1.pSeqClaimId =123;
funcIsBcrClm1.pOcCarrierCode ="sample data1";
funcIsBcrClm1.pSeqGroupId =123;
funcIsBcrClm1.pPlanCode ="sample data1";
funcIsBcrClm1.pDetailSvcDate ="sample data1";

var funcIsBcrClm2 = new FuncIsBcrClm();
funcIsBcrClm2.pSeqClaimId =123;
funcIsBcrClm2.pOcCarrierCode ="sample data2";
funcIsBcrClm2.pSeqGroupId =123;
funcIsBcrClm2.pPlanCode ="sample data2";
funcIsBcrClm2.pDetailSvcDate ="sample data2";

var funcIsBcrClm3 = new FuncIsBcrClm();
funcIsBcrClm3.pSeqClaimId =123;
funcIsBcrClm3.pOcCarrierCode ="sample data3";
funcIsBcrClm3.pSeqGroupId =123;
funcIsBcrClm3.pPlanCode ="sample data3";
funcIsBcrClm3.pDetailSvcDate ="sample data3";


export const FuncIsBcrClms: FuncIsBcrClm[] = [
    funcIsBcrClm1,
    funcIsBcrClm2,
    funcIsBcrClm3,
];