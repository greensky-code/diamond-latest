/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnAltSrchParams} from "../../api-models"

var medDefnAltSrchParams1 = new MedDefnAltSrchParams();
medDefnAltSrchParams1.criteriaSrchPriority =123;
medDefnAltSrchParams1.altSrchCriteria ="sample data1";
medDefnAltSrchParams1.securityCode ="sample data1";
medDefnAltSrchParams1.insertDatetime =new Date('2010-01-01');
medDefnAltSrchParams1.insertUser ="sample data1";
medDefnAltSrchParams1.insertProcess ="sample data1";
medDefnAltSrchParams1.updateDatetime =new Date('2010-01-01');
medDefnAltSrchParams1.updateUser ="sample data1";
medDefnAltSrchParams1.updateProcess ="sample data1";
medDefnAltSrchParams1.medorDisplayColumn ="sample data1";

var medDefnAltSrchParams2 = new MedDefnAltSrchParams();
medDefnAltSrchParams2.criteriaSrchPriority =123;
medDefnAltSrchParams2.altSrchCriteria ="sample data2";
medDefnAltSrchParams2.securityCode ="sample data2";
medDefnAltSrchParams2.insertDatetime =new Date('2010-01-01');
medDefnAltSrchParams2.insertUser ="sample data2";
medDefnAltSrchParams2.insertProcess ="sample data2";
medDefnAltSrchParams2.updateDatetime =new Date('2010-01-01');
medDefnAltSrchParams2.updateUser ="sample data2";
medDefnAltSrchParams2.updateProcess ="sample data2";
medDefnAltSrchParams2.medorDisplayColumn ="sample data2";

var medDefnAltSrchParams3 = new MedDefnAltSrchParams();
medDefnAltSrchParams3.criteriaSrchPriority =123;
medDefnAltSrchParams3.altSrchCriteria ="sample data3";
medDefnAltSrchParams3.securityCode ="sample data3";
medDefnAltSrchParams3.insertDatetime =new Date('2010-01-01');
medDefnAltSrchParams3.insertUser ="sample data3";
medDefnAltSrchParams3.insertProcess ="sample data3";
medDefnAltSrchParams3.updateDatetime =new Date('2010-01-01');
medDefnAltSrchParams3.updateUser ="sample data3";
medDefnAltSrchParams3.updateProcess ="sample data3";
medDefnAltSrchParams3.medorDisplayColumn ="sample data3";


export const MedDefnAltSrchParamss: MedDefnAltSrchParams[] = [
    medDefnAltSrchParams1,
    medDefnAltSrchParams2,
    medDefnAltSrchParams3,
];