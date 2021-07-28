/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebExternalCarrier} from "../../api-models"

var ciebExternalCarrier1 = new CiebExternalCarrier();
ciebExternalCarrier1.seqExtnId =123;
ciebExternalCarrier1.seqPremId =123;
ciebExternalCarrier1.extnCarrGroupId ="sample data1";
ciebExternalCarrier1.productType ="sample data1";
ciebExternalCarrier1.extnCarrName ="sample data1";
ciebExternalCarrier1.extnCarrId ="sample data1";
ciebExternalCarrier1.sharMethod ="sample data1";
ciebExternalCarrier1.insertDatetime =new Date('2010-01-01');
ciebExternalCarrier1.insertUser ="sample data1";
ciebExternalCarrier1.insertProcess ="sample data1";
ciebExternalCarrier1.updateDatetime =new Date('2010-01-01');
ciebExternalCarrier1.updateUser ="sample data1";
ciebExternalCarrier1.updateProcess ="sample data1";
ciebExternalCarrier1.sharBenType ="sample data1";

var ciebExternalCarrier2 = new CiebExternalCarrier();
ciebExternalCarrier2.seqExtnId =123;
ciebExternalCarrier2.seqPremId =123;
ciebExternalCarrier2.extnCarrGroupId ="sample data2";
ciebExternalCarrier2.productType ="sample data2";
ciebExternalCarrier2.extnCarrName ="sample data2";
ciebExternalCarrier2.extnCarrId ="sample data2";
ciebExternalCarrier2.sharMethod ="sample data2";
ciebExternalCarrier2.insertDatetime =new Date('2010-01-01');
ciebExternalCarrier2.insertUser ="sample data2";
ciebExternalCarrier2.insertProcess ="sample data2";
ciebExternalCarrier2.updateDatetime =new Date('2010-01-01');
ciebExternalCarrier2.updateUser ="sample data2";
ciebExternalCarrier2.updateProcess ="sample data2";
ciebExternalCarrier2.sharBenType ="sample data2";

var ciebExternalCarrier3 = new CiebExternalCarrier();
ciebExternalCarrier3.seqExtnId =123;
ciebExternalCarrier3.seqPremId =123;
ciebExternalCarrier3.extnCarrGroupId ="sample data3";
ciebExternalCarrier3.productType ="sample data3";
ciebExternalCarrier3.extnCarrName ="sample data3";
ciebExternalCarrier3.extnCarrId ="sample data3";
ciebExternalCarrier3.sharMethod ="sample data3";
ciebExternalCarrier3.insertDatetime =new Date('2010-01-01');
ciebExternalCarrier3.insertUser ="sample data3";
ciebExternalCarrier3.insertProcess ="sample data3";
ciebExternalCarrier3.updateDatetime =new Date('2010-01-01');
ciebExternalCarrier3.updateUser ="sample data3";
ciebExternalCarrier3.updateProcess ="sample data3";
ciebExternalCarrier3.sharBenType ="sample data3";


export const CiebExternalCarriers: CiebExternalCarrier[] = [
    ciebExternalCarrier1,
    ciebExternalCarrier2,
    ciebExternalCarrier3,
];