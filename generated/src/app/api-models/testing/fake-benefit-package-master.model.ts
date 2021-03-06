/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitPackageMaster} from "../../api-models"

var benefitPackageMaster1 = new BenefitPackageMaster();
benefitPackageMaster1.benefitPackageId ="sample data1";
benefitPackageMaster1.shortDescription ="sample data1";
benefitPackageMaster1.narrative ="sample data1";
benefitPackageMaster1.subPeNotCovDays =123;
benefitPackageMaster1.subPeConditnDays =123;
benefitPackageMaster1.depPeNotCovDays =123;
benefitPackageMaster1.depPeConditnDays =123;
benefitPackageMaster1.securityCode ="sample data1";
benefitPackageMaster1.insertDatetime =new Date('2010-01-01');
benefitPackageMaster1.insertUser ="sample data1";
benefitPackageMaster1.insertProcess ="sample data1";
benefitPackageMaster1.updateDatetime =new Date('2010-01-01');
benefitPackageMaster1.updateUser ="sample data1";
benefitPackageMaster1.updateProcess ="sample data1";
benefitPackageMaster1.seqProcessingOrderId =123;
benefitPackageMaster1.applyPatlibTo ="sample data1";
benefitPackageMaster1.patientLiability ="sample data1";
benefitPackageMaster1.patlibPercent =123;
benefitPackageMaster1.userDate1 =new Date('2010-01-01');
benefitPackageMaster1.userDate2 =new Date('2010-01-01');
benefitPackageMaster1.userDate3 =new Date('2010-01-01');
benefitPackageMaster1.userDate4 =new Date('2010-01-01');
benefitPackageMaster1.userDate5 =new Date('2010-01-01');
benefitPackageMaster1.userDate6 =new Date('2010-01-01');
benefitPackageMaster1.userDate7 =new Date('2010-01-01');
benefitPackageMaster1.userDate8 =new Date('2010-01-01');
benefitPackageMaster1.userDate9 =new Date('2010-01-01');
benefitPackageMaster1.userDate10 =new Date('2010-01-01');
benefitPackageMaster1.userDate11 =new Date('2010-01-01');
benefitPackageMaster1.userDate12 =new Date('2010-01-01');
benefitPackageMaster1.userDate13 =new Date('2010-01-01');
benefitPackageMaster1.userDate14 =new Date('2010-01-01');
benefitPackageMaster1.userDate15 =new Date('2010-01-01');
benefitPackageMaster1.userDate16 =new Date('2010-01-01');
benefitPackageMaster1.userDate17 =new Date('2010-01-01');
benefitPackageMaster1.userDate18 =new Date('2010-01-01');
benefitPackageMaster1.userDate19 =new Date('2010-01-01');
benefitPackageMaster1.userDate20 =new Date('2010-01-01');
benefitPackageMaster1.userDefined1 ="sample data1";
benefitPackageMaster1.userDefined2 ="sample data1";
benefitPackageMaster1.userDefined3 ="sample data1";
benefitPackageMaster1.userDefined4 ="sample data1";
benefitPackageMaster1.userDefined5 ="sample data1";
benefitPackageMaster1.userDefined6 ="sample data1";
benefitPackageMaster1.userDefined7 ="sample data1";
benefitPackageMaster1.userDefined8 ="sample data1";
benefitPackageMaster1.userDefined9 ="sample data1";
benefitPackageMaster1.userDefined10 ="sample data1";
benefitPackageMaster1.userDefined11 ="sample data1";
benefitPackageMaster1.userDefined12 ="sample data1";
benefitPackageMaster1.userDefined13 ="sample data1";
benefitPackageMaster1.userDefined14 ="sample data1";
benefitPackageMaster1.userDefined15 ="sample data1";
benefitPackageMaster1.userDefined16 ="sample data1";
benefitPackageMaster1.userDefined17 ="sample data1";
benefitPackageMaster1.userDefined18 ="sample data1";
benefitPackageMaster1.userDefined19 ="sample data1";
benefitPackageMaster1.userDefined20 ="sample data1";

var benefitPackageMaster2 = new BenefitPackageMaster();
benefitPackageMaster2.benefitPackageId ="sample data2";
benefitPackageMaster2.shortDescription ="sample data2";
benefitPackageMaster2.narrative ="sample data2";
benefitPackageMaster2.subPeNotCovDays =123;
benefitPackageMaster2.subPeConditnDays =123;
benefitPackageMaster2.depPeNotCovDays =123;
benefitPackageMaster2.depPeConditnDays =123;
benefitPackageMaster2.securityCode ="sample data2";
benefitPackageMaster2.insertDatetime =new Date('2010-01-01');
benefitPackageMaster2.insertUser ="sample data2";
benefitPackageMaster2.insertProcess ="sample data2";
benefitPackageMaster2.updateDatetime =new Date('2010-01-01');
benefitPackageMaster2.updateUser ="sample data2";
benefitPackageMaster2.updateProcess ="sample data2";
benefitPackageMaster2.seqProcessingOrderId =123;
benefitPackageMaster2.applyPatlibTo ="sample data2";
benefitPackageMaster2.patientLiability ="sample data2";
benefitPackageMaster2.patlibPercent =123;
benefitPackageMaster2.userDate1 =new Date('2010-01-01');
benefitPackageMaster2.userDate2 =new Date('2010-01-01');
benefitPackageMaster2.userDate3 =new Date('2010-01-01');
benefitPackageMaster2.userDate4 =new Date('2010-01-01');
benefitPackageMaster2.userDate5 =new Date('2010-01-01');
benefitPackageMaster2.userDate6 =new Date('2010-01-01');
benefitPackageMaster2.userDate7 =new Date('2010-01-01');
benefitPackageMaster2.userDate8 =new Date('2010-01-01');
benefitPackageMaster2.userDate9 =new Date('2010-01-01');
benefitPackageMaster2.userDate10 =new Date('2010-01-01');
benefitPackageMaster2.userDate11 =new Date('2010-01-01');
benefitPackageMaster2.userDate12 =new Date('2010-01-01');
benefitPackageMaster2.userDate13 =new Date('2010-01-01');
benefitPackageMaster2.userDate14 =new Date('2010-01-01');
benefitPackageMaster2.userDate15 =new Date('2010-01-01');
benefitPackageMaster2.userDate16 =new Date('2010-01-01');
benefitPackageMaster2.userDate17 =new Date('2010-01-01');
benefitPackageMaster2.userDate18 =new Date('2010-01-01');
benefitPackageMaster2.userDate19 =new Date('2010-01-01');
benefitPackageMaster2.userDate20 =new Date('2010-01-01');
benefitPackageMaster2.userDefined1 ="sample data2";
benefitPackageMaster2.userDefined2 ="sample data2";
benefitPackageMaster2.userDefined3 ="sample data2";
benefitPackageMaster2.userDefined4 ="sample data2";
benefitPackageMaster2.userDefined5 ="sample data2";
benefitPackageMaster2.userDefined6 ="sample data2";
benefitPackageMaster2.userDefined7 ="sample data2";
benefitPackageMaster2.userDefined8 ="sample data2";
benefitPackageMaster2.userDefined9 ="sample data2";
benefitPackageMaster2.userDefined10 ="sample data2";
benefitPackageMaster2.userDefined11 ="sample data2";
benefitPackageMaster2.userDefined12 ="sample data2";
benefitPackageMaster2.userDefined13 ="sample data2";
benefitPackageMaster2.userDefined14 ="sample data2";
benefitPackageMaster2.userDefined15 ="sample data2";
benefitPackageMaster2.userDefined16 ="sample data2";
benefitPackageMaster2.userDefined17 ="sample data2";
benefitPackageMaster2.userDefined18 ="sample data2";
benefitPackageMaster2.userDefined19 ="sample data2";
benefitPackageMaster2.userDefined20 ="sample data2";

var benefitPackageMaster3 = new BenefitPackageMaster();
benefitPackageMaster3.benefitPackageId ="sample data3";
benefitPackageMaster3.shortDescription ="sample data3";
benefitPackageMaster3.narrative ="sample data3";
benefitPackageMaster3.subPeNotCovDays =123;
benefitPackageMaster3.subPeConditnDays =123;
benefitPackageMaster3.depPeNotCovDays =123;
benefitPackageMaster3.depPeConditnDays =123;
benefitPackageMaster3.securityCode ="sample data3";
benefitPackageMaster3.insertDatetime =new Date('2010-01-01');
benefitPackageMaster3.insertUser ="sample data3";
benefitPackageMaster3.insertProcess ="sample data3";
benefitPackageMaster3.updateDatetime =new Date('2010-01-01');
benefitPackageMaster3.updateUser ="sample data3";
benefitPackageMaster3.updateProcess ="sample data3";
benefitPackageMaster3.seqProcessingOrderId =123;
benefitPackageMaster3.applyPatlibTo ="sample data3";
benefitPackageMaster3.patientLiability ="sample data3";
benefitPackageMaster3.patlibPercent =123;
benefitPackageMaster3.userDate1 =new Date('2010-01-01');
benefitPackageMaster3.userDate2 =new Date('2010-01-01');
benefitPackageMaster3.userDate3 =new Date('2010-01-01');
benefitPackageMaster3.userDate4 =new Date('2010-01-01');
benefitPackageMaster3.userDate5 =new Date('2010-01-01');
benefitPackageMaster3.userDate6 =new Date('2010-01-01');
benefitPackageMaster3.userDate7 =new Date('2010-01-01');
benefitPackageMaster3.userDate8 =new Date('2010-01-01');
benefitPackageMaster3.userDate9 =new Date('2010-01-01');
benefitPackageMaster3.userDate10 =new Date('2010-01-01');
benefitPackageMaster3.userDate11 =new Date('2010-01-01');
benefitPackageMaster3.userDate12 =new Date('2010-01-01');
benefitPackageMaster3.userDate13 =new Date('2010-01-01');
benefitPackageMaster3.userDate14 =new Date('2010-01-01');
benefitPackageMaster3.userDate15 =new Date('2010-01-01');
benefitPackageMaster3.userDate16 =new Date('2010-01-01');
benefitPackageMaster3.userDate17 =new Date('2010-01-01');
benefitPackageMaster3.userDate18 =new Date('2010-01-01');
benefitPackageMaster3.userDate19 =new Date('2010-01-01');
benefitPackageMaster3.userDate20 =new Date('2010-01-01');
benefitPackageMaster3.userDefined1 ="sample data3";
benefitPackageMaster3.userDefined2 ="sample data3";
benefitPackageMaster3.userDefined3 ="sample data3";
benefitPackageMaster3.userDefined4 ="sample data3";
benefitPackageMaster3.userDefined5 ="sample data3";
benefitPackageMaster3.userDefined6 ="sample data3";
benefitPackageMaster3.userDefined7 ="sample data3";
benefitPackageMaster3.userDefined8 ="sample data3";
benefitPackageMaster3.userDefined9 ="sample data3";
benefitPackageMaster3.userDefined10 ="sample data3";
benefitPackageMaster3.userDefined11 ="sample data3";
benefitPackageMaster3.userDefined12 ="sample data3";
benefitPackageMaster3.userDefined13 ="sample data3";
benefitPackageMaster3.userDefined14 ="sample data3";
benefitPackageMaster3.userDefined15 ="sample data3";
benefitPackageMaster3.userDefined16 ="sample data3";
benefitPackageMaster3.userDefined17 ="sample data3";
benefitPackageMaster3.userDefined18 ="sample data3";
benefitPackageMaster3.userDefined19 ="sample data3";
benefitPackageMaster3.userDefined20 ="sample data3";


export const BenefitPackageMasters: BenefitPackageMaster[] = [
    benefitPackageMaster1,
    benefitPackageMaster2,
    benefitPackageMaster3,
];