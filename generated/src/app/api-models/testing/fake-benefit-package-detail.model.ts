/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitPackageDetail} from "../../api-models"

var benefitPackageDetail1 = new BenefitPackageDetail();
benefitPackageDetail1.benefitPackageId ="sample data1";
benefitPackageDetail1.seqBenPackage =123;
benefitPackageDetail1.benefitRule ="sample data1";
benefitPackageDetail1.startDate =new Date('2010-01-01');
benefitPackageDetail1.endDate =new Date('2010-01-01');
benefitPackageDetail1.parProvReq ="sample data1";
benefitPackageDetail1.authReq ="sample data1";
benefitPackageDetail1.riderReqFilter ="sample data1";
benefitPackageDetail1.supDepRule ="sample data1";
benefitPackageDetail1.noMosContFrom =123;
benefitPackageDetail1.noMosContThru =123;
benefitPackageDetail1.securityCode ="sample data1";
benefitPackageDetail1.insertDatetime =new Date('2010-01-01');
benefitPackageDetail1.insertUser ="sample data1";
benefitPackageDetail1.insertProcess ="sample data1";
benefitPackageDetail1.updateDatetime =new Date('2010-01-01');
benefitPackageDetail1.updateUser ="sample data1";
benefitPackageDetail1.updateProcess ="sample data1";
benefitPackageDetail1.processingOrder =123;
benefitPackageDetail1.riderOperator ="sample data1";
benefitPackageDetail1.adjustForOcPaid ="sample data1";
benefitPackageDetail1.parOperator ="sample data1";
benefitPackageDetail1.authOperator ="sample data1";
benefitPackageDetail1.applyPar ="sample data1";
benefitPackageDetail1.authLevel ="sample data1";
benefitPackageDetail1.applyRider ="sample data1";
benefitPackageDetail1.weightedValueAccum ="sample data1";

var benefitPackageDetail2 = new BenefitPackageDetail();
benefitPackageDetail2.benefitPackageId ="sample data2";
benefitPackageDetail2.seqBenPackage =123;
benefitPackageDetail2.benefitRule ="sample data2";
benefitPackageDetail2.startDate =new Date('2010-01-01');
benefitPackageDetail2.endDate =new Date('2010-01-01');
benefitPackageDetail2.parProvReq ="sample data2";
benefitPackageDetail2.authReq ="sample data2";
benefitPackageDetail2.riderReqFilter ="sample data2";
benefitPackageDetail2.supDepRule ="sample data2";
benefitPackageDetail2.noMosContFrom =123;
benefitPackageDetail2.noMosContThru =123;
benefitPackageDetail2.securityCode ="sample data2";
benefitPackageDetail2.insertDatetime =new Date('2010-01-01');
benefitPackageDetail2.insertUser ="sample data2";
benefitPackageDetail2.insertProcess ="sample data2";
benefitPackageDetail2.updateDatetime =new Date('2010-01-01');
benefitPackageDetail2.updateUser ="sample data2";
benefitPackageDetail2.updateProcess ="sample data2";
benefitPackageDetail2.processingOrder =123;
benefitPackageDetail2.riderOperator ="sample data2";
benefitPackageDetail2.adjustForOcPaid ="sample data2";
benefitPackageDetail2.parOperator ="sample data2";
benefitPackageDetail2.authOperator ="sample data2";
benefitPackageDetail2.applyPar ="sample data2";
benefitPackageDetail2.authLevel ="sample data2";
benefitPackageDetail2.applyRider ="sample data2";
benefitPackageDetail2.weightedValueAccum ="sample data2";

var benefitPackageDetail3 = new BenefitPackageDetail();
benefitPackageDetail3.benefitPackageId ="sample data3";
benefitPackageDetail3.seqBenPackage =123;
benefitPackageDetail3.benefitRule ="sample data3";
benefitPackageDetail3.startDate =new Date('2010-01-01');
benefitPackageDetail3.endDate =new Date('2010-01-01');
benefitPackageDetail3.parProvReq ="sample data3";
benefitPackageDetail3.authReq ="sample data3";
benefitPackageDetail3.riderReqFilter ="sample data3";
benefitPackageDetail3.supDepRule ="sample data3";
benefitPackageDetail3.noMosContFrom =123;
benefitPackageDetail3.noMosContThru =123;
benefitPackageDetail3.securityCode ="sample data3";
benefitPackageDetail3.insertDatetime =new Date('2010-01-01');
benefitPackageDetail3.insertUser ="sample data3";
benefitPackageDetail3.insertProcess ="sample data3";
benefitPackageDetail3.updateDatetime =new Date('2010-01-01');
benefitPackageDetail3.updateUser ="sample data3";
benefitPackageDetail3.updateProcess ="sample data3";
benefitPackageDetail3.processingOrder =123;
benefitPackageDetail3.riderOperator ="sample data3";
benefitPackageDetail3.adjustForOcPaid ="sample data3";
benefitPackageDetail3.parOperator ="sample data3";
benefitPackageDetail3.authOperator ="sample data3";
benefitPackageDetail3.applyPar ="sample data3";
benefitPackageDetail3.authLevel ="sample data3";
benefitPackageDetail3.applyRider ="sample data3";
benefitPackageDetail3.weightedValueAccum ="sample data3";


export const BenefitPackageDetails: BenefitPackageDetail[] = [
    benefitPackageDetail1,
    benefitPackageDetail2,
    benefitPackageDetail3,
];