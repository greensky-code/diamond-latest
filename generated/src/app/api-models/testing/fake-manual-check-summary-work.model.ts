/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ManualCheckSummaryWork} from "../../api-models"

var manualCheckSummaryWork1 = new ManualCheckSummaryWork();
manualCheckSummaryWork1.seqVendAddress =123;
manualCheckSummaryWork1.seqVendId =123;
manualCheckSummaryWork1.companyCode ="sample data1";
manualCheckSummaryWork1.bankAccountCode ="sample data1";
manualCheckSummaryWork1.checkAmt =123;
manualCheckSummaryWork1.checkDate =new Date('2010-01-01');
manualCheckSummaryWork1.checkNumber ="sample data1";
manualCheckSummaryWork1.passNumber =123;
manualCheckSummaryWork1.seqCkprtId =123;

var manualCheckSummaryWork2 = new ManualCheckSummaryWork();
manualCheckSummaryWork2.seqVendAddress =123;
manualCheckSummaryWork2.seqVendId =123;
manualCheckSummaryWork2.companyCode ="sample data2";
manualCheckSummaryWork2.bankAccountCode ="sample data2";
manualCheckSummaryWork2.checkAmt =123;
manualCheckSummaryWork2.checkDate =new Date('2010-01-01');
manualCheckSummaryWork2.checkNumber ="sample data2";
manualCheckSummaryWork2.passNumber =123;
manualCheckSummaryWork2.seqCkprtId =123;

var manualCheckSummaryWork3 = new ManualCheckSummaryWork();
manualCheckSummaryWork3.seqVendAddress =123;
manualCheckSummaryWork3.seqVendId =123;
manualCheckSummaryWork3.companyCode ="sample data3";
manualCheckSummaryWork3.bankAccountCode ="sample data3";
manualCheckSummaryWork3.checkAmt =123;
manualCheckSummaryWork3.checkDate =new Date('2010-01-01');
manualCheckSummaryWork3.checkNumber ="sample data3";
manualCheckSummaryWork3.passNumber =123;
manualCheckSummaryWork3.seqCkprtId =123;


export const ManualCheckSummaryWorks: ManualCheckSummaryWork[] = [
    manualCheckSummaryWork1,
    manualCheckSummaryWork2,
    manualCheckSummaryWork3,
];