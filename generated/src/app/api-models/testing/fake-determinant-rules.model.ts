/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantRules} from "../../api-models"

var determinantRules1 = new DeterminantRules();
determinantRules1.keyword ="sample data1";
determinantRules1.seqRuleId =123;
determinantRules1.ruleOrder =123;
determinantRules1.ruleId ="sample data1";
determinantRules1.fileType ="sample data1";
determinantRules1.actionCode ="sample data1";
determinantRules1.reasonCode ="sample data1";
determinantRules1.description ="sample data1";
determinantRules1.securityCode ="sample data1";
determinantRules1.insertDatetime =new Date('2010-01-01');
determinantRules1.insertUser ="sample data1";
determinantRules1.insertProcess ="sample data1";
determinantRules1.updateDatetime =new Date('2010-01-01');
determinantRules1.updateUser ="sample data1";
determinantRules1.updateProcess ="sample data1";
determinantRules1.activeFlag ="sample data1";
determinantRules1.effectiveDate =new Date('2010-01-01');
determinantRules1.termDate =new Date('2010-01-01');
determinantRules1.resultValue1 ="sample data1";
determinantRules1.resultValue2 ="sample data1";
determinantRules1.resultValue3 ="sample data1";
determinantRules1.resultValue4 ="sample data1";
determinantRules1.resultValue5 ="sample data1";
determinantRules1.resultValue6 ="sample data1";
determinantRules1.resultValue7 ="sample data1";
determinantRules1.resultValue8 ="sample data1";
determinantRules1.resultValue9 ="sample data1";
determinantRules1.resultValue10 ="sample data1";
determinantRules1.resultNumber3 =123;
determinantRules1.resultNumber4 =123;
determinantRules1.resultNumber5 =123;
determinantRules1.termReason ="sample data1";
determinantRules1.resultNumber1 =123;
determinantRules1.resultNumber2 =123;
determinantRules1.userDefined1 ="sample data1";
determinantRules1.userDefined2 ="sample data1";
determinantRules1.userDate1 =new Date('2010-01-01');
determinantRules1.userDate2 =new Date('2010-01-01');

var determinantRules2 = new DeterminantRules();
determinantRules2.keyword ="sample data2";
determinantRules2.seqRuleId =123;
determinantRules2.ruleOrder =123;
determinantRules2.ruleId ="sample data2";
determinantRules2.fileType ="sample data2";
determinantRules2.actionCode ="sample data2";
determinantRules2.reasonCode ="sample data2";
determinantRules2.description ="sample data2";
determinantRules2.securityCode ="sample data2";
determinantRules2.insertDatetime =new Date('2010-01-01');
determinantRules2.insertUser ="sample data2";
determinantRules2.insertProcess ="sample data2";
determinantRules2.updateDatetime =new Date('2010-01-01');
determinantRules2.updateUser ="sample data2";
determinantRules2.updateProcess ="sample data2";
determinantRules2.activeFlag ="sample data2";
determinantRules2.effectiveDate =new Date('2010-01-01');
determinantRules2.termDate =new Date('2010-01-01');
determinantRules2.resultValue1 ="sample data2";
determinantRules2.resultValue2 ="sample data2";
determinantRules2.resultValue3 ="sample data2";
determinantRules2.resultValue4 ="sample data2";
determinantRules2.resultValue5 ="sample data2";
determinantRules2.resultValue6 ="sample data2";
determinantRules2.resultValue7 ="sample data2";
determinantRules2.resultValue8 ="sample data2";
determinantRules2.resultValue9 ="sample data2";
determinantRules2.resultValue10 ="sample data2";
determinantRules2.resultNumber3 =123;
determinantRules2.resultNumber4 =123;
determinantRules2.resultNumber5 =123;
determinantRules2.termReason ="sample data2";
determinantRules2.resultNumber1 =123;
determinantRules2.resultNumber2 =123;
determinantRules2.userDefined1 ="sample data2";
determinantRules2.userDefined2 ="sample data2";
determinantRules2.userDate1 =new Date('2010-01-01');
determinantRules2.userDate2 =new Date('2010-01-01');

var determinantRules3 = new DeterminantRules();
determinantRules3.keyword ="sample data3";
determinantRules3.seqRuleId =123;
determinantRules3.ruleOrder =123;
determinantRules3.ruleId ="sample data3";
determinantRules3.fileType ="sample data3";
determinantRules3.actionCode ="sample data3";
determinantRules3.reasonCode ="sample data3";
determinantRules3.description ="sample data3";
determinantRules3.securityCode ="sample data3";
determinantRules3.insertDatetime =new Date('2010-01-01');
determinantRules3.insertUser ="sample data3";
determinantRules3.insertProcess ="sample data3";
determinantRules3.updateDatetime =new Date('2010-01-01');
determinantRules3.updateUser ="sample data3";
determinantRules3.updateProcess ="sample data3";
determinantRules3.activeFlag ="sample data3";
determinantRules3.effectiveDate =new Date('2010-01-01');
determinantRules3.termDate =new Date('2010-01-01');
determinantRules3.resultValue1 ="sample data3";
determinantRules3.resultValue2 ="sample data3";
determinantRules3.resultValue3 ="sample data3";
determinantRules3.resultValue4 ="sample data3";
determinantRules3.resultValue5 ="sample data3";
determinantRules3.resultValue6 ="sample data3";
determinantRules3.resultValue7 ="sample data3";
determinantRules3.resultValue8 ="sample data3";
determinantRules3.resultValue9 ="sample data3";
determinantRules3.resultValue10 ="sample data3";
determinantRules3.resultNumber3 =123;
determinantRules3.resultNumber4 =123;
determinantRules3.resultNumber5 =123;
determinantRules3.termReason ="sample data3";
determinantRules3.resultNumber1 =123;
determinantRules3.resultNumber2 =123;
determinantRules3.userDefined1 ="sample data3";
determinantRules3.userDefined2 ="sample data3";
determinantRules3.userDate1 =new Date('2010-01-01');
determinantRules3.userDate2 =new Date('2010-01-01');


export const DeterminantRuleses: DeterminantRules[] = [
    determinantRules1,
    determinantRules2,
    determinantRules3,
];