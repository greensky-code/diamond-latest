/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetBcrPaidAmt} from "../../api-models"

var funcGetBcrPaidAmt1 = new FuncGetBcrPaidAmt();
funcGetBcrPaidAmt1.pSeqClaimId =123;
funcGetBcrPaidAmt1.pLineNumber =123;
funcGetBcrPaidAmt1.pSubLineCode ="sample data1";

var funcGetBcrPaidAmt2 = new FuncGetBcrPaidAmt();
funcGetBcrPaidAmt2.pSeqClaimId =123;
funcGetBcrPaidAmt2.pLineNumber =123;
funcGetBcrPaidAmt2.pSubLineCode ="sample data2";

var funcGetBcrPaidAmt3 = new FuncGetBcrPaidAmt();
funcGetBcrPaidAmt3.pSeqClaimId =123;
funcGetBcrPaidAmt3.pLineNumber =123;
funcGetBcrPaidAmt3.pSubLineCode ="sample data3";


export const FuncGetBcrPaidAmts: FuncGetBcrPaidAmt[] = [
    funcGetBcrPaidAmt1,
    funcGetBcrPaidAmt2,
    funcGetBcrPaidAmt3,
];