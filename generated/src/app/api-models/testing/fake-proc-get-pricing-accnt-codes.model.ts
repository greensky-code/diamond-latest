/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetPricingAccntCodes} from "../../api-models"

var procGetPricingAccntCodes1 = new ProcGetPricingAccntCodes();
procGetPricingAccntCodes1.pGroupId ="sample data1";
procGetPricingAccntCodes1.pSeqGroupId =123;
procGetPricingAccntCodes1.pGroupName ="sample data1";
procGetPricingAccntCodes1.pResult ="sample data1";

var procGetPricingAccntCodes2 = new ProcGetPricingAccntCodes();
procGetPricingAccntCodes2.pGroupId ="sample data2";
procGetPricingAccntCodes2.pSeqGroupId =123;
procGetPricingAccntCodes2.pGroupName ="sample data2";
procGetPricingAccntCodes2.pResult ="sample data2";

var procGetPricingAccntCodes3 = new ProcGetPricingAccntCodes();
procGetPricingAccntCodes3.pGroupId ="sample data3";
procGetPricingAccntCodes3.pSeqGroupId =123;
procGetPricingAccntCodes3.pGroupName ="sample data3";
procGetPricingAccntCodes3.pResult ="sample data3";


export const ProcGetPricingAccntCode: ProcGetPricingAccntCodes[] = [
    procGetPricingAccntCodes1,
    procGetPricingAccntCodes2,
    procGetPricingAccntCodes3,
];