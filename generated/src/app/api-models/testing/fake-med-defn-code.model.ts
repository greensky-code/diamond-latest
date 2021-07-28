/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefnCode} from "../../api-models"

var medDefnCode1 = new MedDefnCode();
medDefnCode1.medDefCode ="sample data1";
medDefnCode1.description ="sample data1";
medDefnCode1.securityCode ="sample data1";
medDefnCode1.insertDatetime =new Date('2010-01-01');
medDefnCode1.insertUser ="sample data1";
medDefnCode1.insertProcess ="sample data1";
medDefnCode1.updateDatetime =new Date('2010-01-01');
medDefnCode1.updateUser ="sample data1";
medDefnCode1.updateProcess ="sample data1";

var medDefnCode2 = new MedDefnCode();
medDefnCode2.medDefCode ="sample data2";
medDefnCode2.description ="sample data2";
medDefnCode2.securityCode ="sample data2";
medDefnCode2.insertDatetime =new Date('2010-01-01');
medDefnCode2.insertUser ="sample data2";
medDefnCode2.insertProcess ="sample data2";
medDefnCode2.updateDatetime =new Date('2010-01-01');
medDefnCode2.updateUser ="sample data2";
medDefnCode2.updateProcess ="sample data2";

var medDefnCode3 = new MedDefnCode();
medDefnCode3.medDefCode ="sample data3";
medDefnCode3.description ="sample data3";
medDefnCode3.securityCode ="sample data3";
medDefnCode3.insertDatetime =new Date('2010-01-01');
medDefnCode3.insertUser ="sample data3";
medDefnCode3.insertProcess ="sample data3";
medDefnCode3.updateDatetime =new Date('2010-01-01');
medDefnCode3.updateUser ="sample data3";
medDefnCode3.updateProcess ="sample data3";


export const MedDefnCodes: MedDefnCode[] = [
    medDefnCode1,
    medDefnCode2,
    medDefnCode3,
];