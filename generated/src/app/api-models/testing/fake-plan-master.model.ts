/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PlanMaster} from "../../api-models"

var planMaster1 = new PlanMaster();
planMaster1.planCode ="sample data1";
planMaster1.description ="sample data1";
planMaster1.autoAuditPlanId ="sample data1";
planMaster1.securityCode ="sample data1";
planMaster1.insertDatetime =new Date('2010-01-01');
planMaster1.insertUser ="sample data1";
planMaster1.insertProcess ="sample data1";
planMaster1.updateDatetime =new Date('2010-01-01');
planMaster1.updateUser ="sample data1";
planMaster1.updateProcess ="sample data1";

var planMaster2 = new PlanMaster();
planMaster2.planCode ="sample data2";
planMaster2.description ="sample data2";
planMaster2.autoAuditPlanId ="sample data2";
planMaster2.securityCode ="sample data2";
planMaster2.insertDatetime =new Date('2010-01-01');
planMaster2.insertUser ="sample data2";
planMaster2.insertProcess ="sample data2";
planMaster2.updateDatetime =new Date('2010-01-01');
planMaster2.updateUser ="sample data2";
planMaster2.updateProcess ="sample data2";

var planMaster3 = new PlanMaster();
planMaster3.planCode ="sample data3";
planMaster3.description ="sample data3";
planMaster3.autoAuditPlanId ="sample data3";
planMaster3.securityCode ="sample data3";
planMaster3.insertDatetime =new Date('2010-01-01');
planMaster3.insertUser ="sample data3";
planMaster3.insertProcess ="sample data3";
planMaster3.updateDatetime =new Date('2010-01-01');
planMaster3.updateUser ="sample data3";
planMaster3.updateProcess ="sample data3";


export const PlanMasters: PlanMaster[] = [
    planMaster1,
    planMaster2,
    planMaster3,
];