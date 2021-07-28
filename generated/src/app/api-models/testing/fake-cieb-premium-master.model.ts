/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebPremiumMaster} from "../../api-models"

var ciebPremiumMaster1 = new CiebPremiumMaster();
ciebPremiumMaster1.updateProcess ="sample data1";
ciebPremiumMaster1.updateUser ="sample data1";
ciebPremiumMaster1.updateDatetime =new Date('2010-01-01');
ciebPremiumMaster1.insertProcess ="sample data1";
ciebPremiumMaster1.insertUser ="sample data1";
ciebPremiumMaster1.insertDatetime =new Date('2010-01-01');
ciebPremiumMaster1.rxprimePlancodeFlag ="sample data1";
ciebPremiumMaster1.planEndDate =new Date('2010-01-01');
ciebPremiumMaster1.planEffectiveDate =new Date('2010-01-01');
ciebPremiumMaster1.policyCode ="sample data1";
ciebPremiumMaster1.claimDivision ="sample data1";
ciebPremiumMaster1.rxprimeAcctNum ="sample data1";
ciebPremiumMaster1.hsdPlancode ="sample data1";
ciebPremiumMaster1.seqPremId =123;
ciebPremiumMaster1.seqGroupId =123;

var ciebPremiumMaster2 = new CiebPremiumMaster();
ciebPremiumMaster2.updateProcess ="sample data2";
ciebPremiumMaster2.updateUser ="sample data2";
ciebPremiumMaster2.updateDatetime =new Date('2010-01-01');
ciebPremiumMaster2.insertProcess ="sample data2";
ciebPremiumMaster2.insertUser ="sample data2";
ciebPremiumMaster2.insertDatetime =new Date('2010-01-01');
ciebPremiumMaster2.rxprimePlancodeFlag ="sample data2";
ciebPremiumMaster2.planEndDate =new Date('2010-01-01');
ciebPremiumMaster2.planEffectiveDate =new Date('2010-01-01');
ciebPremiumMaster2.policyCode ="sample data2";
ciebPremiumMaster2.claimDivision ="sample data2";
ciebPremiumMaster2.rxprimeAcctNum ="sample data2";
ciebPremiumMaster2.hsdPlancode ="sample data2";
ciebPremiumMaster2.seqPremId =123;
ciebPremiumMaster2.seqGroupId =123;

var ciebPremiumMaster3 = new CiebPremiumMaster();
ciebPremiumMaster3.updateProcess ="sample data3";
ciebPremiumMaster3.updateUser ="sample data3";
ciebPremiumMaster3.updateDatetime =new Date('2010-01-01');
ciebPremiumMaster3.insertProcess ="sample data3";
ciebPremiumMaster3.insertUser ="sample data3";
ciebPremiumMaster3.insertDatetime =new Date('2010-01-01');
ciebPremiumMaster3.rxprimePlancodeFlag ="sample data3";
ciebPremiumMaster3.planEndDate =new Date('2010-01-01');
ciebPremiumMaster3.planEffectiveDate =new Date('2010-01-01');
ciebPremiumMaster3.policyCode ="sample data3";
ciebPremiumMaster3.claimDivision ="sample data3";
ciebPremiumMaster3.rxprimeAcctNum ="sample data3";
ciebPremiumMaster3.hsdPlancode ="sample data3";
ciebPremiumMaster3.seqPremId =123;
ciebPremiumMaster3.seqGroupId =123;


export const CiebPremiumMasters: CiebPremiumMaster[] = [
    ciebPremiumMaster1,
    ciebPremiumMaster2,
    ciebPremiumMaster3,
];