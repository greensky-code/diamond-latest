/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFundDtl} from "../../api-models"

var capFundDtl1 = new CapFundDtl();
capFundDtl1.capFundModelId ="sample data1";
capFundDtl1.capFundSubModelId ="sample data1";
capFundDtl1.capFundModelDesc ="sample data1";
capFundDtl1.securityCode ="sample data1";
capFundDtl1.insertDatetime =new Date('2010-01-01');
capFundDtl1.insertUser ="sample data1";
capFundDtl1.insertProcess ="sample data1";
capFundDtl1.updateDatetime =new Date('2010-01-01');
capFundDtl1.updateUser ="sample data1";
capFundDtl1.updateProcess ="sample data1";

var capFundDtl2 = new CapFundDtl();
capFundDtl2.capFundModelId ="sample data2";
capFundDtl2.capFundSubModelId ="sample data2";
capFundDtl2.capFundModelDesc ="sample data2";
capFundDtl2.securityCode ="sample data2";
capFundDtl2.insertDatetime =new Date('2010-01-01');
capFundDtl2.insertUser ="sample data2";
capFundDtl2.insertProcess ="sample data2";
capFundDtl2.updateDatetime =new Date('2010-01-01');
capFundDtl2.updateUser ="sample data2";
capFundDtl2.updateProcess ="sample data2";

var capFundDtl3 = new CapFundDtl();
capFundDtl3.capFundModelId ="sample data3";
capFundDtl3.capFundSubModelId ="sample data3";
capFundDtl3.capFundModelDesc ="sample data3";
capFundDtl3.securityCode ="sample data3";
capFundDtl3.insertDatetime =new Date('2010-01-01');
capFundDtl3.insertUser ="sample data3";
capFundDtl3.insertProcess ="sample data3";
capFundDtl3.updateDatetime =new Date('2010-01-01');
capFundDtl3.updateUser ="sample data3";
capFundDtl3.updateProcess ="sample data3";


export const CapFundDtls: CapFundDtl[] = [
    capFundDtl1,
    capFundDtl2,
    capFundDtl3,
];