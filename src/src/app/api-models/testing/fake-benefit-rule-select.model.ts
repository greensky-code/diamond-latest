/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitRuleSelect} from "../../api-models"

var benefitRuleSelect1 = new BenefitRuleSelect();
benefitRuleSelect1.ruleId ="sample data1";
benefitRuleSelect1.seqBenRuleSel =123;
benefitRuleSelect1.columnName ="sample data1";
benefitRuleSelect1.columnOccurrence =123;
benefitRuleSelect1.columnType ="sample data1";
benefitRuleSelect1.operator ="sample data1";
benefitRuleSelect1.fromValue ="sample data1";
benefitRuleSelect1.thruValue ="sample data1";
benefitRuleSelect1.securityCode ="sample data1";
benefitRuleSelect1.insertDatetime =new Date('2010-01-01');
benefitRuleSelect1.insertUser ="sample data1";
benefitRuleSelect1.insertProcess ="sample data1";
benefitRuleSelect1.updateDatetime =new Date('2010-01-01');
benefitRuleSelect1.updateUser ="sample data1";
benefitRuleSelect1.updateProcess ="sample data1";
benefitRuleSelect1.state ="sample data1";
benefitRuleSelect1.test =123;

var benefitRuleSelect2 = new BenefitRuleSelect();
benefitRuleSelect2.ruleId ="sample data2";
benefitRuleSelect2.seqBenRuleSel =123;
benefitRuleSelect2.columnName ="sample data2";
benefitRuleSelect2.columnOccurrence =123;
benefitRuleSelect2.columnType ="sample data2";
benefitRuleSelect2.operator ="sample data2";
benefitRuleSelect2.fromValue ="sample data2";
benefitRuleSelect2.thruValue ="sample data2";
benefitRuleSelect2.securityCode ="sample data2";
benefitRuleSelect2.insertDatetime =new Date('2010-01-01');
benefitRuleSelect2.insertUser ="sample data2";
benefitRuleSelect2.insertProcess ="sample data2";
benefitRuleSelect2.updateDatetime =new Date('2010-01-01');
benefitRuleSelect2.updateUser ="sample data2";
benefitRuleSelect2.updateProcess ="sample data2";
benefitRuleSelect2.state ="sample data2";
benefitRuleSelect2.test =123;

var benefitRuleSelect3 = new BenefitRuleSelect();
benefitRuleSelect3.ruleId ="sample data3";
benefitRuleSelect3.seqBenRuleSel =123;
benefitRuleSelect3.columnName ="sample data3";
benefitRuleSelect3.columnOccurrence =123;
benefitRuleSelect3.columnType ="sample data3";
benefitRuleSelect3.operator ="sample data3";
benefitRuleSelect3.fromValue ="sample data3";
benefitRuleSelect3.thruValue ="sample data3";
benefitRuleSelect3.securityCode ="sample data3";
benefitRuleSelect3.insertDatetime =new Date('2010-01-01');
benefitRuleSelect3.insertUser ="sample data3";
benefitRuleSelect3.insertProcess ="sample data3";
benefitRuleSelect3.updateDatetime =new Date('2010-01-01');
benefitRuleSelect3.updateUser ="sample data3";
benefitRuleSelect3.updateProcess ="sample data3";
benefitRuleSelect3.state ="sample data3";
benefitRuleSelect3.test =123;


export const BenefitRuleSelects: BenefitRuleSelect[] = [
    benefitRuleSelect1,
    benefitRuleSelect2,
    benefitRuleSelect3,
];