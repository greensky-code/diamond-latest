/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFundHdr} from "../../api-models"

var capFundHdr1 = new CapFundHdr();
capFundHdr1.capFundModelId ="sample data1";
capFundHdr1.claimType ="sample data1";
capFundHdr1.allocationMethod =123;
capFundHdr1.minAllocationPct =123;
capFundHdr1.maxAllocationPct =123;
capFundHdr1.capFundModelDesc ="sample data1";
capFundHdr1.securityCode ="sample data1";
capFundHdr1.insertDatetime =new Date('2010-01-01');
capFundHdr1.insertUser ="sample data1";
capFundHdr1.insertProcess ="sample data1";
capFundHdr1.updateDatetime =new Date('2010-01-01');
capFundHdr1.updateUser ="sample data1";
capFundHdr1.updateProcess ="sample data1";

var capFundHdr2 = new CapFundHdr();
capFundHdr2.capFundModelId ="sample data2";
capFundHdr2.claimType ="sample data2";
capFundHdr2.allocationMethod =123;
capFundHdr2.minAllocationPct =123;
capFundHdr2.maxAllocationPct =123;
capFundHdr2.capFundModelDesc ="sample data2";
capFundHdr2.securityCode ="sample data2";
capFundHdr2.insertDatetime =new Date('2010-01-01');
capFundHdr2.insertUser ="sample data2";
capFundHdr2.insertProcess ="sample data2";
capFundHdr2.updateDatetime =new Date('2010-01-01');
capFundHdr2.updateUser ="sample data2";
capFundHdr2.updateProcess ="sample data2";

var capFundHdr3 = new CapFundHdr();
capFundHdr3.capFundModelId ="sample data3";
capFundHdr3.claimType ="sample data3";
capFundHdr3.allocationMethod =123;
capFundHdr3.minAllocationPct =123;
capFundHdr3.maxAllocationPct =123;
capFundHdr3.capFundModelDesc ="sample data3";
capFundHdr3.securityCode ="sample data3";
capFundHdr3.insertDatetime =new Date('2010-01-01');
capFundHdr3.insertUser ="sample data3";
capFundHdr3.insertProcess ="sample data3";
capFundHdr3.updateDatetime =new Date('2010-01-01');
capFundHdr3.updateUser ="sample data3";
capFundHdr3.updateProcess ="sample data3";


export const CapFundHdrs: CapFundHdr[] = [
    capFundHdr1,
    capFundHdr2,
    capFundHdr3,
];