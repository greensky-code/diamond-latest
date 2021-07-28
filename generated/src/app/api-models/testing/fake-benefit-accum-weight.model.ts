/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitAccumWeight} from "../../api-models"

var benefitAccumWeight1 = new BenefitAccumWeight();
benefitAccumWeight1.accumulatorId ="sample data1";
benefitAccumWeight1.description ="sample data1";
benefitAccumWeight1.securityCode ="sample data1";
benefitAccumWeight1.insertDatetime =new Date('2010-01-01');
benefitAccumWeight1.insertUser ="sample data1";
benefitAccumWeight1.insertProcess ="sample data1";
benefitAccumWeight1.updateDatetime =new Date('2010-01-01');
benefitAccumWeight1.updateUser ="sample data1";
benefitAccumWeight1.updateProcess ="sample data1";

var benefitAccumWeight2 = new BenefitAccumWeight();
benefitAccumWeight2.accumulatorId ="sample data2";
benefitAccumWeight2.description ="sample data2";
benefitAccumWeight2.securityCode ="sample data2";
benefitAccumWeight2.insertDatetime =new Date('2010-01-01');
benefitAccumWeight2.insertUser ="sample data2";
benefitAccumWeight2.insertProcess ="sample data2";
benefitAccumWeight2.updateDatetime =new Date('2010-01-01');
benefitAccumWeight2.updateUser ="sample data2";
benefitAccumWeight2.updateProcess ="sample data2";

var benefitAccumWeight3 = new BenefitAccumWeight();
benefitAccumWeight3.accumulatorId ="sample data3";
benefitAccumWeight3.description ="sample data3";
benefitAccumWeight3.securityCode ="sample data3";
benefitAccumWeight3.insertDatetime =new Date('2010-01-01');
benefitAccumWeight3.insertUser ="sample data3";
benefitAccumWeight3.insertProcess ="sample data3";
benefitAccumWeight3.updateDatetime =new Date('2010-01-01');
benefitAccumWeight3.updateUser ="sample data3";
benefitAccumWeight3.updateProcess ="sample data3";


export const BenefitAccumWeights: BenefitAccumWeight[] = [
    benefitAccumWeight1,
    benefitAccumWeight2,
    benefitAccumWeight3,
];