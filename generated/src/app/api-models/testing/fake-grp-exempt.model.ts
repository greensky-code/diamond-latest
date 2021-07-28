/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GrpExempt} from "../../api-models"

var grpExempt1 = new GrpExempt();
grpExempt1.pSeqTaxDetailId =123;
grpExempt1.pGroupId ="sample data1";
grpExempt1.pTaxRegion ="sample data1";
grpExempt1.pTaxType ="sample data1";
grpExempt1.pExemptProduct ="sample data1";
grpExempt1.pEffectiveDate ="sample data1";
grpExempt1.pTermDate ="sample data1";
grpExempt1.pTermReasonCode ="sample data1";
grpExempt1.pApplyRetro ="sample data1";
grpExempt1.pError ="sample data1";

var grpExempt2 = new GrpExempt();
grpExempt2.pSeqTaxDetailId =123;
grpExempt2.pGroupId ="sample data2";
grpExempt2.pTaxRegion ="sample data2";
grpExempt2.pTaxType ="sample data2";
grpExempt2.pExemptProduct ="sample data2";
grpExempt2.pEffectiveDate ="sample data2";
grpExempt2.pTermDate ="sample data2";
grpExempt2.pTermReasonCode ="sample data2";
grpExempt2.pApplyRetro ="sample data2";
grpExempt2.pError ="sample data2";

var grpExempt3 = new GrpExempt();
grpExempt3.pSeqTaxDetailId =123;
grpExempt3.pGroupId ="sample data3";
grpExempt3.pTaxRegion ="sample data3";
grpExempt3.pTaxType ="sample data3";
grpExempt3.pExemptProduct ="sample data3";
grpExempt3.pEffectiveDate ="sample data3";
grpExempt3.pTermDate ="sample data3";
grpExempt3.pTermReasonCode ="sample data3";
grpExempt3.pApplyRetro ="sample data3";
grpExempt3.pError ="sample data3";


export const GrpExempts: GrpExempt[] = [
    grpExempt1,
    grpExempt2,
    grpExempt3,
];