/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CodereviewOutputW} from "../../api-models"

var codereviewOutputW1 = new CodereviewOutputW();
codereviewOutputW1.mod2In ="sample data1";
codereviewOutputW1.mod1In ="sample data1";
codereviewOutputW1.modifier2Out ="sample data1";
codereviewOutputW1.histClaimDtlIn =123;
codereviewOutputW1.histClaimNoIn ="sample data1";
codereviewOutputW1.billedAmt =123;
codereviewOutputW1.codereviewServiceQty =123;
codereviewOutputW1.svcToDate =new Date('2010-01-01');
codereviewOutputW1.svcFromDate =new Date('2010-01-01');
codereviewOutputW1.expandPointer =123;
codereviewOutputW1.crArtificialLineNo =123;
codereviewOutputW1.modifier1Out ="sample data1";
codereviewOutputW1.pmatchMsgCode ="sample data1";
codereviewOutputW1.msgCodeOut ="sample data1";
codereviewOutputW1.codeOut ="sample data1";
codereviewOutputW1.pmatchCodeStatus ="sample data1";
codereviewOutputW1.codeStatusOut ="sample data1";
codereviewOutputW1.outputPointer ="sample data1";
codereviewOutputW1.msgCodeIn ="sample data1";
codereviewOutputW1.codeIn ="sample data1";
codereviewOutputW1.codeStatusIn ="sample data1";
codereviewOutputW1.histChangedFlg ="sample data1";
codereviewOutputW1.histLineNumber =123;
codereviewOutputW1.histClaimNumber ="sample data1";
codereviewOutputW1.lineNumber =123;
codereviewOutputW1.claimNumber ="sample data1";
codereviewOutputW1.loadcount =123;

var codereviewOutputW2 = new CodereviewOutputW();
codereviewOutputW2.mod2In ="sample data2";
codereviewOutputW2.mod1In ="sample data2";
codereviewOutputW2.modifier2Out ="sample data2";
codereviewOutputW2.histClaimDtlIn =123;
codereviewOutputW2.histClaimNoIn ="sample data2";
codereviewOutputW2.billedAmt =123;
codereviewOutputW2.codereviewServiceQty =123;
codereviewOutputW2.svcToDate =new Date('2010-01-01');
codereviewOutputW2.svcFromDate =new Date('2010-01-01');
codereviewOutputW2.expandPointer =123;
codereviewOutputW2.crArtificialLineNo =123;
codereviewOutputW2.modifier1Out ="sample data2";
codereviewOutputW2.pmatchMsgCode ="sample data2";
codereviewOutputW2.msgCodeOut ="sample data2";
codereviewOutputW2.codeOut ="sample data2";
codereviewOutputW2.pmatchCodeStatus ="sample data2";
codereviewOutputW2.codeStatusOut ="sample data2";
codereviewOutputW2.outputPointer ="sample data2";
codereviewOutputW2.msgCodeIn ="sample data2";
codereviewOutputW2.codeIn ="sample data2";
codereviewOutputW2.codeStatusIn ="sample data2";
codereviewOutputW2.histChangedFlg ="sample data2";
codereviewOutputW2.histLineNumber =123;
codereviewOutputW2.histClaimNumber ="sample data2";
codereviewOutputW2.lineNumber =123;
codereviewOutputW2.claimNumber ="sample data2";
codereviewOutputW2.loadcount =123;

var codereviewOutputW3 = new CodereviewOutputW();
codereviewOutputW3.mod2In ="sample data3";
codereviewOutputW3.mod1In ="sample data3";
codereviewOutputW3.modifier2Out ="sample data3";
codereviewOutputW3.histClaimDtlIn =123;
codereviewOutputW3.histClaimNoIn ="sample data3";
codereviewOutputW3.billedAmt =123;
codereviewOutputW3.codereviewServiceQty =123;
codereviewOutputW3.svcToDate =new Date('2010-01-01');
codereviewOutputW3.svcFromDate =new Date('2010-01-01');
codereviewOutputW3.expandPointer =123;
codereviewOutputW3.crArtificialLineNo =123;
codereviewOutputW3.modifier1Out ="sample data3";
codereviewOutputW3.pmatchMsgCode ="sample data3";
codereviewOutputW3.msgCodeOut ="sample data3";
codereviewOutputW3.codeOut ="sample data3";
codereviewOutputW3.pmatchCodeStatus ="sample data3";
codereviewOutputW3.codeStatusOut ="sample data3";
codereviewOutputW3.outputPointer ="sample data3";
codereviewOutputW3.msgCodeIn ="sample data3";
codereviewOutputW3.codeIn ="sample data3";
codereviewOutputW3.codeStatusIn ="sample data3";
codereviewOutputW3.histChangedFlg ="sample data3";
codereviewOutputW3.histLineNumber =123;
codereviewOutputW3.histClaimNumber ="sample data3";
codereviewOutputW3.lineNumber =123;
codereviewOutputW3.claimNumber ="sample data3";
codereviewOutputW3.loadcount =123;


export const CodereviewOutputWs: CodereviewOutputW[] = [
    codereviewOutputW1,
    codereviewOutputW2,
    codereviewOutputW3,
];