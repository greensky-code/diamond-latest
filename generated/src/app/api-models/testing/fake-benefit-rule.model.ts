/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitRule} from "../../api-models"

var benefitRule1 = new BenefitRule();
benefitRule1.ruleId ="sample data1";
benefitRule1.ruleType ="sample data1";
benefitRule1.shortDescription ="sample data1";
benefitRule1.medDefFilter ="sample data1";
benefitRule1.narrative ="sample data1";
benefitRule1.attributeChar1 ="sample data1";
benefitRule1.attributeChar2 ="sample data1";
benefitRule1.attributeChar3 ="sample data1";
benefitRule1.attributeChar4 ="sample data1";
benefitRule1.attributeChar5 ="sample data1";
benefitRule1.attributeChar6 ="sample data1";
benefitRule1.attributeChar7 ="sample data1";
benefitRule1.attributeChar8 ="sample data1";
benefitRule1.attributeChar9 ="sample data1";
benefitRule1.attributeChar10 ="sample data1";
benefitRule1.attributeChar11 ="sample data1";
benefitRule1.attributeChar12 ="sample data1";
benefitRule1.attributeChar13 ="sample data1";
benefitRule1.attributeChar14 ="sample data1";
benefitRule1.attributeChar15 ="sample data1";
benefitRule1.attributeNum1 =123;
benefitRule1.attributeNum2 =123;
benefitRule1.attributeNum3 =123;
benefitRule1.attributeNum4 =123;
benefitRule1.attributeNum5 =123;
benefitRule1.attributeNum6 =123;
benefitRule1.attributeNum7 =123;
benefitRule1.attributeNum8 =123;
benefitRule1.attributeNum9 =123;
benefitRule1.attributeNum10 =123;
benefitRule1.attributeDate1 =new Date('2010-01-01');
benefitRule1.attributeDate2 =new Date('2010-01-01');
benefitRule1.securityCode ="sample data1";
benefitRule1.insertDatetime =new Date('2010-01-01');
benefitRule1.insertUser ="sample data1";
benefitRule1.insertProcess ="sample data1";
benefitRule1.updateDatetime =new Date('2010-01-01');
benefitRule1.updateUser ="sample data1";
benefitRule1.updateProcess ="sample data1";
benefitRule1.multiplyByQty ="sample data1";

var benefitRule2 = new BenefitRule();
benefitRule2.ruleId ="sample data2";
benefitRule2.ruleType ="sample data2";
benefitRule2.shortDescription ="sample data2";
benefitRule2.medDefFilter ="sample data2";
benefitRule2.narrative ="sample data2";
benefitRule2.attributeChar1 ="sample data2";
benefitRule2.attributeChar2 ="sample data2";
benefitRule2.attributeChar3 ="sample data2";
benefitRule2.attributeChar4 ="sample data2";
benefitRule2.attributeChar5 ="sample data2";
benefitRule2.attributeChar6 ="sample data2";
benefitRule2.attributeChar7 ="sample data2";
benefitRule2.attributeChar8 ="sample data2";
benefitRule2.attributeChar9 ="sample data2";
benefitRule2.attributeChar10 ="sample data2";
benefitRule2.attributeChar11 ="sample data2";
benefitRule2.attributeChar12 ="sample data2";
benefitRule2.attributeChar13 ="sample data2";
benefitRule2.attributeChar14 ="sample data2";
benefitRule2.attributeChar15 ="sample data2";
benefitRule2.attributeNum1 =123;
benefitRule2.attributeNum2 =123;
benefitRule2.attributeNum3 =123;
benefitRule2.attributeNum4 =123;
benefitRule2.attributeNum5 =123;
benefitRule2.attributeNum6 =123;
benefitRule2.attributeNum7 =123;
benefitRule2.attributeNum8 =123;
benefitRule2.attributeNum9 =123;
benefitRule2.attributeNum10 =123;
benefitRule2.attributeDate1 =new Date('2010-01-01');
benefitRule2.attributeDate2 =new Date('2010-01-01');
benefitRule2.securityCode ="sample data2";
benefitRule2.insertDatetime =new Date('2010-01-01');
benefitRule2.insertUser ="sample data2";
benefitRule2.insertProcess ="sample data2";
benefitRule2.updateDatetime =new Date('2010-01-01');
benefitRule2.updateUser ="sample data2";
benefitRule2.updateProcess ="sample data2";
benefitRule2.multiplyByQty ="sample data2";

var benefitRule3 = new BenefitRule();
benefitRule3.ruleId ="sample data3";
benefitRule3.ruleType ="sample data3";
benefitRule3.shortDescription ="sample data3";
benefitRule3.medDefFilter ="sample data3";
benefitRule3.narrative ="sample data3";
benefitRule3.attributeChar1 ="sample data3";
benefitRule3.attributeChar2 ="sample data3";
benefitRule3.attributeChar3 ="sample data3";
benefitRule3.attributeChar4 ="sample data3";
benefitRule3.attributeChar5 ="sample data3";
benefitRule3.attributeChar6 ="sample data3";
benefitRule3.attributeChar7 ="sample data3";
benefitRule3.attributeChar8 ="sample data3";
benefitRule3.attributeChar9 ="sample data3";
benefitRule3.attributeChar10 ="sample data3";
benefitRule3.attributeChar11 ="sample data3";
benefitRule3.attributeChar12 ="sample data3";
benefitRule3.attributeChar13 ="sample data3";
benefitRule3.attributeChar14 ="sample data3";
benefitRule3.attributeChar15 ="sample data3";
benefitRule3.attributeNum1 =123;
benefitRule3.attributeNum2 =123;
benefitRule3.attributeNum3 =123;
benefitRule3.attributeNum4 =123;
benefitRule3.attributeNum5 =123;
benefitRule3.attributeNum6 =123;
benefitRule3.attributeNum7 =123;
benefitRule3.attributeNum8 =123;
benefitRule3.attributeNum9 =123;
benefitRule3.attributeNum10 =123;
benefitRule3.attributeDate1 =new Date('2010-01-01');
benefitRule3.attributeDate2 =new Date('2010-01-01');
benefitRule3.securityCode ="sample data3";
benefitRule3.insertDatetime =new Date('2010-01-01');
benefitRule3.insertUser ="sample data3";
benefitRule3.insertProcess ="sample data3";
benefitRule3.updateDatetime =new Date('2010-01-01');
benefitRule3.updateUser ="sample data3";
benefitRule3.updateProcess ="sample data3";
benefitRule3.multiplyByQty ="sample data3";


export const BenefitRules: BenefitRule[] = [
    benefitRule1,
    benefitRule2,
    benefitRule3,
];