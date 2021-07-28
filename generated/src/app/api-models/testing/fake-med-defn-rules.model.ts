/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnRules} from "../../api-models"

var medDefnRules1 = new MedDefnRules();
medDefnRules1.claimType ="sample data1";
medDefnRules1.medDefOrder =123;
medDefnRules1.medDefCode ="sample data1";
medDefnRules1.searchSequence =123;
medDefnRules1.determinantTable ="sample data1";
medDefnRules1.determinant ="sample data1";
medDefnRules1.description ="sample data1";
medDefnRules1.operator ="sample data1";
medDefnRules1.detValue1 ="sample data1";
medDefnRules1.detValue2 ="sample data1";
medDefnRules1.detValue3 ="sample data1";
medDefnRules1.detValue4 ="sample data1";
medDefnRules1.detValue5 ="sample data1";
medDefnRules1.detValue6 ="sample data1";
medDefnRules1.detValue7 ="sample data1";
medDefnRules1.detValue8 ="sample data1";
medDefnRules1.detValue9 ="sample data1";
medDefnRules1.detValue10 ="sample data1";
medDefnRules1.securityCode ="sample data1";
medDefnRules1.insertDatetime =new Date('2010-01-01');
medDefnRules1.insertUser ="sample data1";
medDefnRules1.insertProcess ="sample data1";
medDefnRules1.updateDatetime =new Date('2010-01-01');
medDefnRules1.updateUser ="sample data1";
medDefnRules1.updateProcess ="sample data1";
medDefnRules1.globalIncludeFlag ="sample data1";

var medDefnRules2 = new MedDefnRules();
medDefnRules2.claimType ="sample data2";
medDefnRules2.medDefOrder =123;
medDefnRules2.medDefCode ="sample data2";
medDefnRules2.searchSequence =123;
medDefnRules2.determinantTable ="sample data2";
medDefnRules2.determinant ="sample data2";
medDefnRules2.description ="sample data2";
medDefnRules2.operator ="sample data2";
medDefnRules2.detValue1 ="sample data2";
medDefnRules2.detValue2 ="sample data2";
medDefnRules2.detValue3 ="sample data2";
medDefnRules2.detValue4 ="sample data2";
medDefnRules2.detValue5 ="sample data2";
medDefnRules2.detValue6 ="sample data2";
medDefnRules2.detValue7 ="sample data2";
medDefnRules2.detValue8 ="sample data2";
medDefnRules2.detValue9 ="sample data2";
medDefnRules2.detValue10 ="sample data2";
medDefnRules2.securityCode ="sample data2";
medDefnRules2.insertDatetime =new Date('2010-01-01');
medDefnRules2.insertUser ="sample data2";
medDefnRules2.insertProcess ="sample data2";
medDefnRules2.updateDatetime =new Date('2010-01-01');
medDefnRules2.updateUser ="sample data2";
medDefnRules2.updateProcess ="sample data2";
medDefnRules2.globalIncludeFlag ="sample data2";

var medDefnRules3 = new MedDefnRules();
medDefnRules3.claimType ="sample data3";
medDefnRules3.medDefOrder =123;
medDefnRules3.medDefCode ="sample data3";
medDefnRules3.searchSequence =123;
medDefnRules3.determinantTable ="sample data3";
medDefnRules3.determinant ="sample data3";
medDefnRules3.description ="sample data3";
medDefnRules3.operator ="sample data3";
medDefnRules3.detValue1 ="sample data3";
medDefnRules3.detValue2 ="sample data3";
medDefnRules3.detValue3 ="sample data3";
medDefnRules3.detValue4 ="sample data3";
medDefnRules3.detValue5 ="sample data3";
medDefnRules3.detValue6 ="sample data3";
medDefnRules3.detValue7 ="sample data3";
medDefnRules3.detValue8 ="sample data3";
medDefnRules3.detValue9 ="sample data3";
medDefnRules3.detValue10 ="sample data3";
medDefnRules3.securityCode ="sample data3";
medDefnRules3.insertDatetime =new Date('2010-01-01');
medDefnRules3.insertUser ="sample data3";
medDefnRules3.insertProcess ="sample data3";
medDefnRules3.updateDatetime =new Date('2010-01-01');
medDefnRules3.updateUser ="sample data3";
medDefnRules3.updateProcess ="sample data3";
medDefnRules3.globalIncludeFlag ="sample data3";


export const MedDefnRuleses: MedDefnRules[] = [
    medDefnRules1,
    medDefnRules2,
    medDefnRules3,
];