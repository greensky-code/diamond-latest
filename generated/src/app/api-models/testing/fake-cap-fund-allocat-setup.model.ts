/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CapFundAllocatSetup} from "../../api-models"

var capFundAllocatSetup1 = new CapFundAllocatSetup();
capFundAllocatSetup1.seqCfdstId =123;
capFundAllocatSetup1.jobId ="sample data1";
capFundAllocatSetup1.capFundModelId ="sample data1";
capFundAllocatSetup1.capFundMonth =new Date('2010-01-01');
capFundAllocatSetup1.allocationAmt =123;
capFundAllocatSetup1.status ="sample data1";
capFundAllocatSetup1.action ="sample data1";
capFundAllocatSetup1.requestUser ="sample data1";
capFundAllocatSetup1.requestDatetime =new Date('2010-01-01');
capFundAllocatSetup1.requestType ="sample data1";
capFundAllocatSetup1.template ="sample data1";
capFundAllocatSetup1.capRunFromDate =new Date('2010-01-01');
capFundAllocatSetup1.jobRunDate =new Date('2010-01-01');
capFundAllocatSetup1.origNetAmt =123;
capFundAllocatSetup1.allocationPct =123;
capFundAllocatSetup1.allocationMethod =123;
capFundAllocatSetup1.minAllocationPct =123;
capFundAllocatSetup1.maxAllocationPct =123;
capFundAllocatSetup1.comments ="sample data1";
capFundAllocatSetup1.securityCode ="sample data1";
capFundAllocatSetup1.insertDatetime =new Date('2010-01-01');
capFundAllocatSetup1.insertUser ="sample data1";
capFundAllocatSetup1.insertProcess ="sample data1";
capFundAllocatSetup1.updateDatetime =new Date('2010-01-01');
capFundAllocatSetup1.updateUser ="sample data1";
capFundAllocatSetup1.updateProcess ="sample data1";

var capFundAllocatSetup2 = new CapFundAllocatSetup();
capFundAllocatSetup2.seqCfdstId =123;
capFundAllocatSetup2.jobId ="sample data2";
capFundAllocatSetup2.capFundModelId ="sample data2";
capFundAllocatSetup2.capFundMonth =new Date('2010-01-01');
capFundAllocatSetup2.allocationAmt =123;
capFundAllocatSetup2.status ="sample data2";
capFundAllocatSetup2.action ="sample data2";
capFundAllocatSetup2.requestUser ="sample data2";
capFundAllocatSetup2.requestDatetime =new Date('2010-01-01');
capFundAllocatSetup2.requestType ="sample data2";
capFundAllocatSetup2.template ="sample data2";
capFundAllocatSetup2.capRunFromDate =new Date('2010-01-01');
capFundAllocatSetup2.jobRunDate =new Date('2010-01-01');
capFundAllocatSetup2.origNetAmt =123;
capFundAllocatSetup2.allocationPct =123;
capFundAllocatSetup2.allocationMethod =123;
capFundAllocatSetup2.minAllocationPct =123;
capFundAllocatSetup2.maxAllocationPct =123;
capFundAllocatSetup2.comments ="sample data2";
capFundAllocatSetup2.securityCode ="sample data2";
capFundAllocatSetup2.insertDatetime =new Date('2010-01-01');
capFundAllocatSetup2.insertUser ="sample data2";
capFundAllocatSetup2.insertProcess ="sample data2";
capFundAllocatSetup2.updateDatetime =new Date('2010-01-01');
capFundAllocatSetup2.updateUser ="sample data2";
capFundAllocatSetup2.updateProcess ="sample data2";

var capFundAllocatSetup3 = new CapFundAllocatSetup();
capFundAllocatSetup3.seqCfdstId =123;
capFundAllocatSetup3.jobId ="sample data3";
capFundAllocatSetup3.capFundModelId ="sample data3";
capFundAllocatSetup3.capFundMonth =new Date('2010-01-01');
capFundAllocatSetup3.allocationAmt =123;
capFundAllocatSetup3.status ="sample data3";
capFundAllocatSetup3.action ="sample data3";
capFundAllocatSetup3.requestUser ="sample data3";
capFundAllocatSetup3.requestDatetime =new Date('2010-01-01');
capFundAllocatSetup3.requestType ="sample data3";
capFundAllocatSetup3.template ="sample data3";
capFundAllocatSetup3.capRunFromDate =new Date('2010-01-01');
capFundAllocatSetup3.jobRunDate =new Date('2010-01-01');
capFundAllocatSetup3.origNetAmt =123;
capFundAllocatSetup3.allocationPct =123;
capFundAllocatSetup3.allocationMethod =123;
capFundAllocatSetup3.minAllocationPct =123;
capFundAllocatSetup3.maxAllocationPct =123;
capFundAllocatSetup3.comments ="sample data3";
capFundAllocatSetup3.securityCode ="sample data3";
capFundAllocatSetup3.insertDatetime =new Date('2010-01-01');
capFundAllocatSetup3.insertUser ="sample data3";
capFundAllocatSetup3.insertProcess ="sample data3";
capFundAllocatSetup3.updateDatetime =new Date('2010-01-01');
capFundAllocatSetup3.updateUser ="sample data3";
capFundAllocatSetup3.updateProcess ="sample data3";


export const CapFundAllocatSetups: CapFundAllocatSetup[] = [
    capFundAllocatSetup1,
    capFundAllocatSetup2,
    capFundAllocatSetup3,
];