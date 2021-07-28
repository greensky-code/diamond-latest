/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefProcessOrderMaster} from "../../api-models"

var benefProcessOrderMaster1 = new BenefProcessOrderMaster();
benefProcessOrderMaster1.seqProcessingOrderId =123;
benefProcessOrderMaster1.processingOrderId ="sample data1";
benefProcessOrderMaster1.description ="sample data1";
benefProcessOrderMaster1.defaultOrder ="sample data1";
benefProcessOrderMaster1.securityCode ="sample data1";
benefProcessOrderMaster1.insertDatetime =new Date('2010-01-01');
benefProcessOrderMaster1.insertUser ="sample data1";
benefProcessOrderMaster1.insertProcess ="sample data1";
benefProcessOrderMaster1.updateDatetime =new Date('2010-01-01');
benefProcessOrderMaster1.updateUser ="sample data1";
benefProcessOrderMaster1.updateProcess ="sample data1";

var benefProcessOrderMaster2 = new BenefProcessOrderMaster();
benefProcessOrderMaster2.seqProcessingOrderId =123;
benefProcessOrderMaster2.processingOrderId ="sample data2";
benefProcessOrderMaster2.description ="sample data2";
benefProcessOrderMaster2.defaultOrder ="sample data2";
benefProcessOrderMaster2.securityCode ="sample data2";
benefProcessOrderMaster2.insertDatetime =new Date('2010-01-01');
benefProcessOrderMaster2.insertUser ="sample data2";
benefProcessOrderMaster2.insertProcess ="sample data2";
benefProcessOrderMaster2.updateDatetime =new Date('2010-01-01');
benefProcessOrderMaster2.updateUser ="sample data2";
benefProcessOrderMaster2.updateProcess ="sample data2";

var benefProcessOrderMaster3 = new BenefProcessOrderMaster();
benefProcessOrderMaster3.seqProcessingOrderId =123;
benefProcessOrderMaster3.processingOrderId ="sample data3";
benefProcessOrderMaster3.description ="sample data3";
benefProcessOrderMaster3.defaultOrder ="sample data3";
benefProcessOrderMaster3.securityCode ="sample data3";
benefProcessOrderMaster3.insertDatetime =new Date('2010-01-01');
benefProcessOrderMaster3.insertUser ="sample data3";
benefProcessOrderMaster3.insertProcess ="sample data3";
benefProcessOrderMaster3.updateDatetime =new Date('2010-01-01');
benefProcessOrderMaster3.updateUser ="sample data3";
benefProcessOrderMaster3.updateProcess ="sample data3";


export const BenefProcessOrderMasters: BenefProcessOrderMaster[] = [
    benefProcessOrderMaster1,
    benefProcessOrderMaster2,
    benefProcessOrderMaster3,
];