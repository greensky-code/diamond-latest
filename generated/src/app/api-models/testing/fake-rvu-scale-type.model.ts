/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { RvuScaleType} from "../../api-models"

var rvuScaleType1 = new RvuScaleType();
rvuScaleType1.rvuScaleId ="sample data1";
rvuScaleType1.description ="sample data1";
rvuScaleType1.securityCode ="sample data1";
rvuScaleType1.insertDatetime =new Date('2010-01-01');
rvuScaleType1.insertUser ="sample data1";
rvuScaleType1.insertProcess ="sample data1";
rvuScaleType1.updateDatetime =new Date('2010-01-01');
rvuScaleType1.updateUser ="sample data1";
rvuScaleType1.updateProcess ="sample data1";

var rvuScaleType2 = new RvuScaleType();
rvuScaleType2.rvuScaleId ="sample data2";
rvuScaleType2.description ="sample data2";
rvuScaleType2.securityCode ="sample data2";
rvuScaleType2.insertDatetime =new Date('2010-01-01');
rvuScaleType2.insertUser ="sample data2";
rvuScaleType2.insertProcess ="sample data2";
rvuScaleType2.updateDatetime =new Date('2010-01-01');
rvuScaleType2.updateUser ="sample data2";
rvuScaleType2.updateProcess ="sample data2";

var rvuScaleType3 = new RvuScaleType();
rvuScaleType3.rvuScaleId ="sample data3";
rvuScaleType3.description ="sample data3";
rvuScaleType3.securityCode ="sample data3";
rvuScaleType3.insertDatetime =new Date('2010-01-01');
rvuScaleType3.insertUser ="sample data3";
rvuScaleType3.insertProcess ="sample data3";
rvuScaleType3.updateDatetime =new Date('2010-01-01');
rvuScaleType3.updateUser ="sample data3";
rvuScaleType3.updateProcess ="sample data3";


export const RvuScaleTypes: RvuScaleType[] = [
    rvuScaleType1,
    rvuScaleType2,
    rvuScaleType3,
];