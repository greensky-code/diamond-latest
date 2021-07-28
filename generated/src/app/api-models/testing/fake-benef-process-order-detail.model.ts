/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefProcessOrderDetail} from "../../api-models"

var benefProcessOrderDetail1 = new BenefProcessOrderDetail();
benefProcessOrderDetail1.seqProcessingOrderId =123;
benefProcessOrderDetail1.benefitType ="sample data1";
benefProcessOrderDetail1.processingOrder =123;
benefProcessOrderDetail1.insertDatetime =new Date('2010-01-01');
benefProcessOrderDetail1.insertUser ="sample data1";
benefProcessOrderDetail1.insertProcess ="sample data1";
benefProcessOrderDetail1.updateDatetime =new Date('2010-01-01');
benefProcessOrderDetail1.updateUser ="sample data1";
benefProcessOrderDetail1.updateProcess ="sample data1";

var benefProcessOrderDetail2 = new BenefProcessOrderDetail();
benefProcessOrderDetail2.seqProcessingOrderId =123;
benefProcessOrderDetail2.benefitType ="sample data2";
benefProcessOrderDetail2.processingOrder =123;
benefProcessOrderDetail2.insertDatetime =new Date('2010-01-01');
benefProcessOrderDetail2.insertUser ="sample data2";
benefProcessOrderDetail2.insertProcess ="sample data2";
benefProcessOrderDetail2.updateDatetime =new Date('2010-01-01');
benefProcessOrderDetail2.updateUser ="sample data2";
benefProcessOrderDetail2.updateProcess ="sample data2";

var benefProcessOrderDetail3 = new BenefProcessOrderDetail();
benefProcessOrderDetail3.seqProcessingOrderId =123;
benefProcessOrderDetail3.benefitType ="sample data3";
benefProcessOrderDetail3.processingOrder =123;
benefProcessOrderDetail3.insertDatetime =new Date('2010-01-01');
benefProcessOrderDetail3.insertUser ="sample data3";
benefProcessOrderDetail3.insertProcess ="sample data3";
benefProcessOrderDetail3.updateDatetime =new Date('2010-01-01');
benefProcessOrderDetail3.updateUser ="sample data3";
benefProcessOrderDetail3.updateProcess ="sample data3";


export const BenefProcessOrderDetails: BenefProcessOrderDetail[] = [
    benefProcessOrderDetail1,
    benefProcessOrderDetail2,
    benefProcessOrderDetail3,
];