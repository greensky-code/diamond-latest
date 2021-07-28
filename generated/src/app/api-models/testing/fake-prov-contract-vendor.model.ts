/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContractVendor} from "../../api-models"

var provContractVendor1 = new ProvContractVendor();
provContractVendor1.seqProvVendId =123;
provContractVendor1.seqProvId =123;
provContractVendor1.seqProvContract =123;
provContractVendor1.seqVendId =123;
provContractVendor1.seqVendAddress =123;
provContractVendor1.securityCode ="sample data1";
provContractVendor1.insertDatetime =new Date('2010-01-01');
provContractVendor1.insertUser ="sample data1";
provContractVendor1.insertProcess ="sample data1";
provContractVendor1.updateDatetime =new Date('2010-01-01');
provContractVendor1.updateUser ="sample data1";
provContractVendor1.updateProcess ="sample data1";
provContractVendor1.directoryInclude ="sample data1";
provContractVendor1.defaultVendorAddr ="sample data1";

var provContractVendor2 = new ProvContractVendor();
provContractVendor2.seqProvVendId =123;
provContractVendor2.seqProvId =123;
provContractVendor2.seqProvContract =123;
provContractVendor2.seqVendId =123;
provContractVendor2.seqVendAddress =123;
provContractVendor2.securityCode ="sample data2";
provContractVendor2.insertDatetime =new Date('2010-01-01');
provContractVendor2.insertUser ="sample data2";
provContractVendor2.insertProcess ="sample data2";
provContractVendor2.updateDatetime =new Date('2010-01-01');
provContractVendor2.updateUser ="sample data2";
provContractVendor2.updateProcess ="sample data2";
provContractVendor2.directoryInclude ="sample data2";
provContractVendor2.defaultVendorAddr ="sample data2";

var provContractVendor3 = new ProvContractVendor();
provContractVendor3.seqProvVendId =123;
provContractVendor3.seqProvId =123;
provContractVendor3.seqProvContract =123;
provContractVendor3.seqVendId =123;
provContractVendor3.seqVendAddress =123;
provContractVendor3.securityCode ="sample data3";
provContractVendor3.insertDatetime =new Date('2010-01-01');
provContractVendor3.insertUser ="sample data3";
provContractVendor3.insertProcess ="sample data3";
provContractVendor3.updateDatetime =new Date('2010-01-01');
provContractVendor3.updateUser ="sample data3";
provContractVendor3.updateProcess ="sample data3";
provContractVendor3.directoryInclude ="sample data3";
provContractVendor3.defaultVendorAddr ="sample data3";


export const ProvContractVendors: ProvContractVendor[] = [
    provContractVendor1,
    provContractVendor2,
    provContractVendor3,
];