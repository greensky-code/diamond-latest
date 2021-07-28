/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnAltSearch} from "../../api-models"

var medDefnAltSearch1 = new MedDefnAltSearch();
medDefnAltSearch1.claimType ="sample data1";
medDefnAltSearch1.criteriaSrchPriority =123;
medDefnAltSearch1.altSrchCritValue ="sample data1";
medDefnAltSearch1.criteriaSrchOrder =123;
medDefnAltSearch1.medDefOrder =123;
medDefnAltSearch1.medDefCode ="sample data1";
medDefnAltSearch1.securityCode ="sample data1";
medDefnAltSearch1.insertDatetime =new Date('2010-01-01');
medDefnAltSearch1.insertUser ="sample data1";
medDefnAltSearch1.insertProcess ="sample data1";
medDefnAltSearch1.updateDatetime =new Date('2010-01-01');
medDefnAltSearch1.updateUser ="sample data1";
medDefnAltSearch1.updateProcess ="sample data1";
medDefnAltSearch1.medorDisplayValue ="sample data1";

var medDefnAltSearch2 = new MedDefnAltSearch();
medDefnAltSearch2.claimType ="sample data2";
medDefnAltSearch2.criteriaSrchPriority =123;
medDefnAltSearch2.altSrchCritValue ="sample data2";
medDefnAltSearch2.criteriaSrchOrder =123;
medDefnAltSearch2.medDefOrder =123;
medDefnAltSearch2.medDefCode ="sample data2";
medDefnAltSearch2.securityCode ="sample data2";
medDefnAltSearch2.insertDatetime =new Date('2010-01-01');
medDefnAltSearch2.insertUser ="sample data2";
medDefnAltSearch2.insertProcess ="sample data2";
medDefnAltSearch2.updateDatetime =new Date('2010-01-01');
medDefnAltSearch2.updateUser ="sample data2";
medDefnAltSearch2.updateProcess ="sample data2";
medDefnAltSearch2.medorDisplayValue ="sample data2";

var medDefnAltSearch3 = new MedDefnAltSearch();
medDefnAltSearch3.claimType ="sample data3";
medDefnAltSearch3.criteriaSrchPriority =123;
medDefnAltSearch3.altSrchCritValue ="sample data3";
medDefnAltSearch3.criteriaSrchOrder =123;
medDefnAltSearch3.medDefOrder =123;
medDefnAltSearch3.medDefCode ="sample data3";
medDefnAltSearch3.securityCode ="sample data3";
medDefnAltSearch3.insertDatetime =new Date('2010-01-01');
medDefnAltSearch3.insertUser ="sample data3";
medDefnAltSearch3.insertProcess ="sample data3";
medDefnAltSearch3.updateDatetime =new Date('2010-01-01');
medDefnAltSearch3.updateUser ="sample data3";
medDefnAltSearch3.updateProcess ="sample data3";
medDefnAltSearch3.medorDisplayValue ="sample data3";


export const MedDefnAltSearches: MedDefnAltSearch[] = [
    medDefnAltSearch1,
    medDefnAltSearch2,
    medDefnAltSearch3,
];