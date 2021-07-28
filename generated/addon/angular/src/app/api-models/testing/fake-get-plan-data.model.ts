/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetPlanData} from "../../api-models"

var getPlanData1 = new GetPlanData();
getPlanData1.pSeqGroupId =123;
getPlanData1.pSvcStartDt ="sample data1";
getPlanData1.oPlanEffDt ="sample data1";
getPlanData1.oPlanTermDt ="sample data1";
getPlanData1.oTermReason ="sample data1";
getPlanData1.oPlanName ="sample data1";

var getPlanData2 = new GetPlanData();
getPlanData2.pSeqGroupId =123;
getPlanData2.pSvcStartDt ="sample data2";
getPlanData2.oPlanEffDt ="sample data2";
getPlanData2.oPlanTermDt ="sample data2";
getPlanData2.oTermReason ="sample data2";
getPlanData2.oPlanName ="sample data2";

var getPlanData3 = new GetPlanData();
getPlanData3.pSeqGroupId =123;
getPlanData3.pSvcStartDt ="sample data3";
getPlanData3.oPlanEffDt ="sample data3";
getPlanData3.oPlanTermDt ="sample data3";
getPlanData3.oTermReason ="sample data3";
getPlanData3.oPlanName ="sample data3";


export const GetPlanDatas: GetPlanData[] = [
    getPlanData1,
    getPlanData2,
    getPlanData3,
];