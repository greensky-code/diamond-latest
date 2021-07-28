/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitRuleMaint} from "../../api-models"

var benefitRuleMaint1 = new BenefitRuleMaint();
benefitRuleMaint1.benefitPackageId ="sample data1";
benefitRuleMaint1.seqBenPackage =123;
benefitRuleMaint1.benefitRule ="sample data1";
benefitRuleMaint1.typex ="sample data1";
benefitRuleMaint1.operator ="sample data1";
benefitRuleMaint1.fromValue ="sample data1";
benefitRuleMaint1.thruValue ="sample data1";
benefitRuleMaint1.securityCode ="sample data1";
benefitRuleMaint1.insertDatetime =new Date('2010-01-01');
benefitRuleMaint1.insertUser ="sample data1";
benefitRuleMaint1.insertProcess ="sample data1";
benefitRuleMaint1.updateDatetime =new Date('2010-01-01');
benefitRuleMaint1.updateUser ="sample data1";
benefitRuleMaint1.updateProcess ="sample data1";

var benefitRuleMaint2 = new BenefitRuleMaint();
benefitRuleMaint2.benefitPackageId ="sample data2";
benefitRuleMaint2.seqBenPackage =123;
benefitRuleMaint2.benefitRule ="sample data2";
benefitRuleMaint2.typex ="sample data2";
benefitRuleMaint2.operator ="sample data2";
benefitRuleMaint2.fromValue ="sample data2";
benefitRuleMaint2.thruValue ="sample data2";
benefitRuleMaint2.securityCode ="sample data2";
benefitRuleMaint2.insertDatetime =new Date('2010-01-01');
benefitRuleMaint2.insertUser ="sample data2";
benefitRuleMaint2.insertProcess ="sample data2";
benefitRuleMaint2.updateDatetime =new Date('2010-01-01');
benefitRuleMaint2.updateUser ="sample data2";
benefitRuleMaint2.updateProcess ="sample data2";

var benefitRuleMaint3 = new BenefitRuleMaint();
benefitRuleMaint3.benefitPackageId ="sample data3";
benefitRuleMaint3.seqBenPackage =123;
benefitRuleMaint3.benefitRule ="sample data3";
benefitRuleMaint3.typex ="sample data3";
benefitRuleMaint3.operator ="sample data3";
benefitRuleMaint3.fromValue ="sample data3";
benefitRuleMaint3.thruValue ="sample data3";
benefitRuleMaint3.securityCode ="sample data3";
benefitRuleMaint3.insertDatetime =new Date('2010-01-01');
benefitRuleMaint3.insertUser ="sample data3";
benefitRuleMaint3.insertProcess ="sample data3";
benefitRuleMaint3.updateDatetime =new Date('2010-01-01');
benefitRuleMaint3.updateUser ="sample data3";
benefitRuleMaint3.updateProcess ="sample data3";


export const BenefitRuleMaints: BenefitRuleMaint[] = [
    benefitRuleMaint1,
    benefitRuleMaint2,
    benefitRuleMaint3,
];