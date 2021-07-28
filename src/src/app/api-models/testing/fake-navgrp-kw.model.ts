/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { NavgrpKw} from "../../api-models"

var navgrpKw1 = new NavgrpKw();
navgrpKw1.auditTrail ="sample data1";
navgrpKw1.languageId =123;
navgrpKw1.updateProcess ="sample data1";
navgrpKw1.updateUser ="sample data1";
navgrpKw1.updateDatetime =new Date('2010-01-01');
navgrpKw1.insertProcess ="sample data1";
navgrpKw1.insertUser ="sample data1";
navgrpKw1.insertDatetime =new Date('2010-01-01');
navgrpKw1.winId ="sample data1";
navgrpKw1.navgrpId ="sample data1";

var navgrpKw2 = new NavgrpKw();
navgrpKw2.auditTrail ="sample data2";
navgrpKw2.languageId =123;
navgrpKw2.updateProcess ="sample data2";
navgrpKw2.updateUser ="sample data2";
navgrpKw2.updateDatetime =new Date('2010-01-01');
navgrpKw2.insertProcess ="sample data2";
navgrpKw2.insertUser ="sample data2";
navgrpKw2.insertDatetime =new Date('2010-01-01');
navgrpKw2.winId ="sample data2";
navgrpKw2.navgrpId ="sample data2";

var navgrpKw3 = new NavgrpKw();
navgrpKw3.auditTrail ="sample data3";
navgrpKw3.languageId =123;
navgrpKw3.updateProcess ="sample data3";
navgrpKw3.updateUser ="sample data3";
navgrpKw3.updateDatetime =new Date('2010-01-01');
navgrpKw3.insertProcess ="sample data3";
navgrpKw3.insertUser ="sample data3";
navgrpKw3.insertDatetime =new Date('2010-01-01');
navgrpKw3.winId ="sample data3";
navgrpKw3.navgrpId ="sample data3";


export const NavgrpKws: NavgrpKw[] = [
    navgrpKw1,
    navgrpKw2,
    navgrpKw3,
];