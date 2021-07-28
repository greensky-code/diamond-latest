/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetBalanceAmt} from "../../api-models"

var funcGetBalanceAmt1 = new FuncGetBalanceAmt();
funcGetBalanceAmt1.pSeqMembId =123;
funcGetBalanceAmt1.pSeqSubsId =123;
funcGetBalanceAmt1.pSeqGroupId =123;
funcGetBalanceAmt1.pBenPackId ="sample data1";
funcGetBalanceAmt1.pDos ="sample data1";
funcGetBalanceAmt1.pRuleId ="sample data1";
funcGetBalanceAmt1.pRuleType ="sample data1";
funcGetBalanceAmt1.pLimitType ="sample data1";
funcGetBalanceAmt1.pAgg ="sample data1";
funcGetBalanceAmt1.pRuleAmtM =123;
funcGetBalanceAmt1.pRuleAmtF =123;

var funcGetBalanceAmt2 = new FuncGetBalanceAmt();
funcGetBalanceAmt2.pSeqMembId =123;
funcGetBalanceAmt2.pSeqSubsId =123;
funcGetBalanceAmt2.pSeqGroupId =123;
funcGetBalanceAmt2.pBenPackId ="sample data2";
funcGetBalanceAmt2.pDos ="sample data2";
funcGetBalanceAmt2.pRuleId ="sample data2";
funcGetBalanceAmt2.pRuleType ="sample data2";
funcGetBalanceAmt2.pLimitType ="sample data2";
funcGetBalanceAmt2.pAgg ="sample data2";
funcGetBalanceAmt2.pRuleAmtM =123;
funcGetBalanceAmt2.pRuleAmtF =123;

var funcGetBalanceAmt3 = new FuncGetBalanceAmt();
funcGetBalanceAmt3.pSeqMembId =123;
funcGetBalanceAmt3.pSeqSubsId =123;
funcGetBalanceAmt3.pSeqGroupId =123;
funcGetBalanceAmt3.pBenPackId ="sample data3";
funcGetBalanceAmt3.pDos ="sample data3";
funcGetBalanceAmt3.pRuleId ="sample data3";
funcGetBalanceAmt3.pRuleType ="sample data3";
funcGetBalanceAmt3.pLimitType ="sample data3";
funcGetBalanceAmt3.pAgg ="sample data3";
funcGetBalanceAmt3.pRuleAmtM =123;
funcGetBalanceAmt3.pRuleAmtF =123;


export const FuncGetBalanceAmts: FuncGetBalanceAmt[] = [
    funcGetBalanceAmt1,
    funcGetBalanceAmt2,
    funcGetBalanceAmt3,
];