/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimEvaluationRules} from "../../api-models"

var claimEvaluationRules1 = new ClaimEvaluationRules();
claimEvaluationRules1.seqCerulId =123;
claimEvaluationRules1.primaryMatch ="sample data1";
claimEvaluationRules1.provider ="sample data1";
claimEvaluationRules1.procedureCode ="sample data1";
claimEvaluationRules1.benefitPackage ="sample data1";
claimEvaluationRules1.medicalDefinitions ="sample data1";
claimEvaluationRules1.timeframe ="sample data1";
claimEvaluationRules1.timeUnits =123;
claimEvaluationRules1.securityCode ="sample data1";
claimEvaluationRules1.insertDatetime =new Date('2010-01-01');
claimEvaluationRules1.insertUser ="sample data1";
claimEvaluationRules1.insertProcess ="sample data1";
claimEvaluationRules1.updateDatetime =new Date('2010-01-01');
claimEvaluationRules1.updateUser ="sample data1";
claimEvaluationRules1.updateProcess ="sample data1";

var claimEvaluationRules2 = new ClaimEvaluationRules();
claimEvaluationRules2.seqCerulId =123;
claimEvaluationRules2.primaryMatch ="sample data2";
claimEvaluationRules2.provider ="sample data2";
claimEvaluationRules2.procedureCode ="sample data2";
claimEvaluationRules2.benefitPackage ="sample data2";
claimEvaluationRules2.medicalDefinitions ="sample data2";
claimEvaluationRules2.timeframe ="sample data2";
claimEvaluationRules2.timeUnits =123;
claimEvaluationRules2.securityCode ="sample data2";
claimEvaluationRules2.insertDatetime =new Date('2010-01-01');
claimEvaluationRules2.insertUser ="sample data2";
claimEvaluationRules2.insertProcess ="sample data2";
claimEvaluationRules2.updateDatetime =new Date('2010-01-01');
claimEvaluationRules2.updateUser ="sample data2";
claimEvaluationRules2.updateProcess ="sample data2";

var claimEvaluationRules3 = new ClaimEvaluationRules();
claimEvaluationRules3.seqCerulId =123;
claimEvaluationRules3.primaryMatch ="sample data3";
claimEvaluationRules3.provider ="sample data3";
claimEvaluationRules3.procedureCode ="sample data3";
claimEvaluationRules3.benefitPackage ="sample data3";
claimEvaluationRules3.medicalDefinitions ="sample data3";
claimEvaluationRules3.timeframe ="sample data3";
claimEvaluationRules3.timeUnits =123;
claimEvaluationRules3.securityCode ="sample data3";
claimEvaluationRules3.insertDatetime =new Date('2010-01-01');
claimEvaluationRules3.insertUser ="sample data3";
claimEvaluationRules3.insertProcess ="sample data3";
claimEvaluationRules3.updateDatetime =new Date('2010-01-01');
claimEvaluationRules3.updateUser ="sample data3";
claimEvaluationRules3.updateProcess ="sample data3";


export const ClaimEvaluationRuleses: ClaimEvaluationRules[] = [
    claimEvaluationRules1,
    claimEvaluationRules2,
    claimEvaluationRules3,
];