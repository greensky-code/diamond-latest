/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GroupPanel} from "../../api-models"

var groupPanel1 = new GroupPanel();
groupPanel1.seqGroupPanel =123;
groupPanel1.seqGroupId =123;
groupPanel1.panelId ="sample data1";
groupPanel1.planCode ="sample data1";
groupPanel1.effectiveDate =new Date('2010-01-01');
groupPanel1.termDate =new Date('2010-01-01');
groupPanel1.securityCode ="sample data1";
groupPanel1.insertDatetime =new Date('2010-01-01');
groupPanel1.insertUser ="sample data1";
groupPanel1.insertProcess ="sample data1";
groupPanel1.updateDatetime =new Date('2010-01-01');
groupPanel1.updateUser ="sample data1";
groupPanel1.updateProcess ="sample data1";

var groupPanel2 = new GroupPanel();
groupPanel2.seqGroupPanel =123;
groupPanel2.seqGroupId =123;
groupPanel2.panelId ="sample data2";
groupPanel2.planCode ="sample data2";
groupPanel2.effectiveDate =new Date('2010-01-01');
groupPanel2.termDate =new Date('2010-01-01');
groupPanel2.securityCode ="sample data2";
groupPanel2.insertDatetime =new Date('2010-01-01');
groupPanel2.insertUser ="sample data2";
groupPanel2.insertProcess ="sample data2";
groupPanel2.updateDatetime =new Date('2010-01-01');
groupPanel2.updateUser ="sample data2";
groupPanel2.updateProcess ="sample data2";

var groupPanel3 = new GroupPanel();
groupPanel3.seqGroupPanel =123;
groupPanel3.seqGroupId =123;
groupPanel3.panelId ="sample data3";
groupPanel3.planCode ="sample data3";
groupPanel3.effectiveDate =new Date('2010-01-01');
groupPanel3.termDate =new Date('2010-01-01');
groupPanel3.securityCode ="sample data3";
groupPanel3.insertDatetime =new Date('2010-01-01');
groupPanel3.insertUser ="sample data3";
groupPanel3.insertProcess ="sample data3";
groupPanel3.updateDatetime =new Date('2010-01-01');
groupPanel3.updateUser ="sample data3";
groupPanel3.updateProcess ="sample data3";


export const GroupPanels: GroupPanel[] = [
    groupPanel1,
    groupPanel2,
    groupPanel3,
];