/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnRulesDeterminant} from "../../api-models"

var medDefnRulesDeterminant1 = new MedDefnRulesDeterminant();
medDefnRulesDeterminant1.claimType ="sample data1";
medDefnRulesDeterminant1.medDefOrder =123;
medDefnRulesDeterminant1.medDefCode ="sample data1";
medDefnRulesDeterminant1.searchSequence =123;
medDefnRulesDeterminant1.determinantSequence =123;
medDefnRulesDeterminant1.detValueFrom ="sample data1";
medDefnRulesDeterminant1.detValueThru ="sample data1";
medDefnRulesDeterminant1.securityCode ="sample data1";
medDefnRulesDeterminant1.insertDatetime =new Date('2010-01-01');
medDefnRulesDeterminant1.insertUser ="sample data1";
medDefnRulesDeterminant1.insertProcess ="sample data1";
medDefnRulesDeterminant1.updateDatetime =new Date('2010-01-01');
medDefnRulesDeterminant1.updateUser ="sample data1";
medDefnRulesDeterminant1.updateProcess ="sample data1";
medDefnRulesDeterminant1.codeType ="sample data1";
medDefnRulesDeterminant1.state ="sample data1";
medDefnRulesDeterminant1.effectiveDate =new Date('2010-01-01');
medDefnRulesDeterminant1.termDate =new Date('2010-01-01');

var medDefnRulesDeterminant2 = new MedDefnRulesDeterminant();
medDefnRulesDeterminant2.claimType ="sample data2";
medDefnRulesDeterminant2.medDefOrder =123;
medDefnRulesDeterminant2.medDefCode ="sample data2";
medDefnRulesDeterminant2.searchSequence =123;
medDefnRulesDeterminant2.determinantSequence =123;
medDefnRulesDeterminant2.detValueFrom ="sample data2";
medDefnRulesDeterminant2.detValueThru ="sample data2";
medDefnRulesDeterminant2.securityCode ="sample data2";
medDefnRulesDeterminant2.insertDatetime =new Date('2010-01-01');
medDefnRulesDeterminant2.insertUser ="sample data2";
medDefnRulesDeterminant2.insertProcess ="sample data2";
medDefnRulesDeterminant2.updateDatetime =new Date('2010-01-01');
medDefnRulesDeterminant2.updateUser ="sample data2";
medDefnRulesDeterminant2.updateProcess ="sample data2";
medDefnRulesDeterminant2.codeType ="sample data2";
medDefnRulesDeterminant2.state ="sample data2";
medDefnRulesDeterminant2.effectiveDate =new Date('2010-01-01');
medDefnRulesDeterminant2.termDate =new Date('2010-01-01');

var medDefnRulesDeterminant3 = new MedDefnRulesDeterminant();
medDefnRulesDeterminant3.claimType ="sample data3";
medDefnRulesDeterminant3.medDefOrder =123;
medDefnRulesDeterminant3.medDefCode ="sample data3";
medDefnRulesDeterminant3.searchSequence =123;
medDefnRulesDeterminant3.determinantSequence =123;
medDefnRulesDeterminant3.detValueFrom ="sample data3";
medDefnRulesDeterminant3.detValueThru ="sample data3";
medDefnRulesDeterminant3.securityCode ="sample data3";
medDefnRulesDeterminant3.insertDatetime =new Date('2010-01-01');
medDefnRulesDeterminant3.insertUser ="sample data3";
medDefnRulesDeterminant3.insertProcess ="sample data3";
medDefnRulesDeterminant3.updateDatetime =new Date('2010-01-01');
medDefnRulesDeterminant3.updateUser ="sample data3";
medDefnRulesDeterminant3.updateProcess ="sample data3";
medDefnRulesDeterminant3.codeType ="sample data3";
medDefnRulesDeterminant3.state ="sample data3";
medDefnRulesDeterminant3.effectiveDate =new Date('2010-01-01');
medDefnRulesDeterminant3.termDate =new Date('2010-01-01');


export const MedDefnRulesDeterminants: MedDefnRulesDeterminant[] = [
    medDefnRulesDeterminant1,
    medDefnRulesDeterminant2,
    medDefnRulesDeterminant3,
];