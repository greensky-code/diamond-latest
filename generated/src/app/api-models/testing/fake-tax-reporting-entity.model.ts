/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { TaxReportingEntity} from "../../api-models"

var taxReportingEntity1 = new TaxReportingEntity();
taxReportingEntity1.taxRepEntity ="sample data1";
taxReportingEntity1.description ="sample data1";
taxReportingEntity1.payerName1 ="sample data1";
taxReportingEntity1.payerName2 ="sample data1";
taxReportingEntity1.payerAddress ="sample data1";
taxReportingEntity1.payerCity ="sample data1";
taxReportingEntity1.payerState ="sample data1";
taxReportingEntity1.payerZipCode ="sample data1";
taxReportingEntity1.transControlCode ="sample data1";
taxReportingEntity1.transName ="sample data1";
taxReportingEntity1.transAddress ="sample data1";
taxReportingEntity1.transCity ="sample data1";
taxReportingEntity1.transState ="sample data1";
taxReportingEntity1.transZipCode ="sample data1";
taxReportingEntity1.securityCode ="sample data1";
taxReportingEntity1.insertDatetime =new Date('2010-01-01');
taxReportingEntity1.insertUser ="sample data1";
taxReportingEntity1.insertProcess ="sample data1";
taxReportingEntity1.updateDatetime =new Date('2010-01-01');
taxReportingEntity1.updateUser ="sample data1";
taxReportingEntity1.updateProcess ="sample data1";
taxReportingEntity1.payerCountry ="sample data1";
taxReportingEntity1.transCountry ="sample data1";
taxReportingEntity1.payerPhone ="sample data1";

var taxReportingEntity2 = new TaxReportingEntity();
taxReportingEntity2.taxRepEntity ="sample data2";
taxReportingEntity2.description ="sample data2";
taxReportingEntity2.payerName1 ="sample data2";
taxReportingEntity2.payerName2 ="sample data2";
taxReportingEntity2.payerAddress ="sample data2";
taxReportingEntity2.payerCity ="sample data2";
taxReportingEntity2.payerState ="sample data2";
taxReportingEntity2.payerZipCode ="sample data2";
taxReportingEntity2.transControlCode ="sample data2";
taxReportingEntity2.transName ="sample data2";
taxReportingEntity2.transAddress ="sample data2";
taxReportingEntity2.transCity ="sample data2";
taxReportingEntity2.transState ="sample data2";
taxReportingEntity2.transZipCode ="sample data2";
taxReportingEntity2.securityCode ="sample data2";
taxReportingEntity2.insertDatetime =new Date('2010-01-01');
taxReportingEntity2.insertUser ="sample data2";
taxReportingEntity2.insertProcess ="sample data2";
taxReportingEntity2.updateDatetime =new Date('2010-01-01');
taxReportingEntity2.updateUser ="sample data2";
taxReportingEntity2.updateProcess ="sample data2";
taxReportingEntity2.payerCountry ="sample data2";
taxReportingEntity2.transCountry ="sample data2";
taxReportingEntity2.payerPhone ="sample data2";

var taxReportingEntity3 = new TaxReportingEntity();
taxReportingEntity3.taxRepEntity ="sample data3";
taxReportingEntity3.description ="sample data3";
taxReportingEntity3.payerName1 ="sample data3";
taxReportingEntity3.payerName2 ="sample data3";
taxReportingEntity3.payerAddress ="sample data3";
taxReportingEntity3.payerCity ="sample data3";
taxReportingEntity3.payerState ="sample data3";
taxReportingEntity3.payerZipCode ="sample data3";
taxReportingEntity3.transControlCode ="sample data3";
taxReportingEntity3.transName ="sample data3";
taxReportingEntity3.transAddress ="sample data3";
taxReportingEntity3.transCity ="sample data3";
taxReportingEntity3.transState ="sample data3";
taxReportingEntity3.transZipCode ="sample data3";
taxReportingEntity3.securityCode ="sample data3";
taxReportingEntity3.insertDatetime =new Date('2010-01-01');
taxReportingEntity3.insertUser ="sample data3";
taxReportingEntity3.insertProcess ="sample data3";
taxReportingEntity3.updateDatetime =new Date('2010-01-01');
taxReportingEntity3.updateUser ="sample data3";
taxReportingEntity3.updateProcess ="sample data3";
taxReportingEntity3.payerCountry ="sample data3";
taxReportingEntity3.transCountry ="sample data3";
taxReportingEntity3.payerPhone ="sample data3";


export const TaxReportingEntitys: TaxReportingEntity[] = [
    taxReportingEntity1,
    taxReportingEntity2,
    taxReportingEntity3,
];