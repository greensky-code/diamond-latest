/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitAccumWeightDetail} from "../../api-models"

var benefitAccumWeightDetail1 = new BenefitAccumWeightDetail();
benefitAccumWeightDetail1.accumulatorId ="sample data1";
benefitAccumWeightDetail1.seqAccumId =123;
benefitAccumWeightDetail1.fromValue ="sample data1";
benefitAccumWeightDetail1.thruValue ="sample data1";
benefitAccumWeightDetail1.primaryGroup ="sample data1";
benefitAccumWeightDetail1.secondaryGroup ="sample data1";
benefitAccumWeightDetail1.weightedAccum =123;
benefitAccumWeightDetail1.effectiveDate =new Date('2010-01-01');
benefitAccumWeightDetail1.thruDate =new Date('2010-01-01');
benefitAccumWeightDetail1.securityCode ="sample data1";
benefitAccumWeightDetail1.insertDatetime =new Date('2010-01-01');
benefitAccumWeightDetail1.insertUser ="sample data1";
benefitAccumWeightDetail1.insertProcess ="sample data1";
benefitAccumWeightDetail1.updateDatetime =new Date('2010-01-01');
benefitAccumWeightDetail1.updateUser ="sample data1";
benefitAccumWeightDetail1.updateProcess ="sample data1";

var benefitAccumWeightDetail2 = new BenefitAccumWeightDetail();
benefitAccumWeightDetail2.accumulatorId ="sample data2";
benefitAccumWeightDetail2.seqAccumId =123;
benefitAccumWeightDetail2.fromValue ="sample data2";
benefitAccumWeightDetail2.thruValue ="sample data2";
benefitAccumWeightDetail2.primaryGroup ="sample data2";
benefitAccumWeightDetail2.secondaryGroup ="sample data2";
benefitAccumWeightDetail2.weightedAccum =123;
benefitAccumWeightDetail2.effectiveDate =new Date('2010-01-01');
benefitAccumWeightDetail2.thruDate =new Date('2010-01-01');
benefitAccumWeightDetail2.securityCode ="sample data2";
benefitAccumWeightDetail2.insertDatetime =new Date('2010-01-01');
benefitAccumWeightDetail2.insertUser ="sample data2";
benefitAccumWeightDetail2.insertProcess ="sample data2";
benefitAccumWeightDetail2.updateDatetime =new Date('2010-01-01');
benefitAccumWeightDetail2.updateUser ="sample data2";
benefitAccumWeightDetail2.updateProcess ="sample data2";

var benefitAccumWeightDetail3 = new BenefitAccumWeightDetail();
benefitAccumWeightDetail3.accumulatorId ="sample data3";
benefitAccumWeightDetail3.seqAccumId =123;
benefitAccumWeightDetail3.fromValue ="sample data3";
benefitAccumWeightDetail3.thruValue ="sample data3";
benefitAccumWeightDetail3.primaryGroup ="sample data3";
benefitAccumWeightDetail3.secondaryGroup ="sample data3";
benefitAccumWeightDetail3.weightedAccum =123;
benefitAccumWeightDetail3.effectiveDate =new Date('2010-01-01');
benefitAccumWeightDetail3.thruDate =new Date('2010-01-01');
benefitAccumWeightDetail3.securityCode ="sample data3";
benefitAccumWeightDetail3.insertDatetime =new Date('2010-01-01');
benefitAccumWeightDetail3.insertUser ="sample data3";
benefitAccumWeightDetail3.insertProcess ="sample data3";
benefitAccumWeightDetail3.updateDatetime =new Date('2010-01-01');
benefitAccumWeightDetail3.updateUser ="sample data3";
benefitAccumWeightDetail3.updateProcess ="sample data3";


export const BenefitAccumWeightDetails: BenefitAccumWeightDetail[] = [
    benefitAccumWeightDetail1,
    benefitAccumWeightDetail2,
    benefitAccumWeightDetail3,
];