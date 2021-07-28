/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetGroupPlanData} from "../../api-models"

var procGetGroupPlanData1 = new ProcGetGroupPlanData();
procGetGroupPlanData1.pSeqGroupId =123;
procGetGroupPlanData1.pSvcStartDt ="sample data1";
procGetGroupPlanData1.oPlanEffDt ="sample data1";
procGetGroupPlanData1.oPlanTermDt ="sample data1";
procGetGroupPlanData1.oTermReason ="sample data1";
procGetGroupPlanData1.oPlanName ="sample data1";

var procGetGroupPlanData2 = new ProcGetGroupPlanData();
procGetGroupPlanData2.pSeqGroupId =123;
procGetGroupPlanData2.pSvcStartDt ="sample data2";
procGetGroupPlanData2.oPlanEffDt ="sample data2";
procGetGroupPlanData2.oPlanTermDt ="sample data2";
procGetGroupPlanData2.oTermReason ="sample data2";
procGetGroupPlanData2.oPlanName ="sample data2";

var procGetGroupPlanData3 = new ProcGetGroupPlanData();
procGetGroupPlanData3.pSeqGroupId =123;
procGetGroupPlanData3.pSvcStartDt ="sample data3";
procGetGroupPlanData3.oPlanEffDt ="sample data3";
procGetGroupPlanData3.oPlanTermDt ="sample data3";
procGetGroupPlanData3.oTermReason ="sample data3";
procGetGroupPlanData3.oPlanName ="sample data3";


export const ProcGetGroupPlanDatas: ProcGetGroupPlanData[] = [
    procGetGroupPlanData1,
    procGetGroupPlanData2,
    procGetGroupPlanData3,
];