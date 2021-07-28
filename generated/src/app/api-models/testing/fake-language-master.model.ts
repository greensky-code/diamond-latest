/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LanguageMaster} from "../../api-models"

var languageMaster1 = new LanguageMaster();
languageMaster1.languageCode ="sample data1";
languageMaster1.description ="sample data1";
languageMaster1.securityCode ="sample data1";
languageMaster1.insertDatetime =new Date('2010-01-01');
languageMaster1.insertUser ="sample data1";
languageMaster1.insertProcess ="sample data1";
languageMaster1.updateDatetime =new Date('2010-01-01');
languageMaster1.updateUser ="sample data1";
languageMaster1.updateProcess ="sample data1";
languageMaster1.languageId =123;
languageMaster1.oracleLanguageCode ="sample data1";

var languageMaster2 = new LanguageMaster();
languageMaster2.languageCode ="sample data2";
languageMaster2.description ="sample data2";
languageMaster2.securityCode ="sample data2";
languageMaster2.insertDatetime =new Date('2010-01-01');
languageMaster2.insertUser ="sample data2";
languageMaster2.insertProcess ="sample data2";
languageMaster2.updateDatetime =new Date('2010-01-01');
languageMaster2.updateUser ="sample data2";
languageMaster2.updateProcess ="sample data2";
languageMaster2.languageId =123;
languageMaster2.oracleLanguageCode ="sample data2";

var languageMaster3 = new LanguageMaster();
languageMaster3.languageCode ="sample data3";
languageMaster3.description ="sample data3";
languageMaster3.securityCode ="sample data3";
languageMaster3.insertDatetime =new Date('2010-01-01');
languageMaster3.insertUser ="sample data3";
languageMaster3.insertProcess ="sample data3";
languageMaster3.updateDatetime =new Date('2010-01-01');
languageMaster3.updateUser ="sample data3";
languageMaster3.updateProcess ="sample data3";
languageMaster3.languageId =123;
languageMaster3.oracleLanguageCode ="sample data3";


export const LanguageMasters: LanguageMaster[] = [
    languageMaster1,
    languageMaster2,
    languageMaster3,
];