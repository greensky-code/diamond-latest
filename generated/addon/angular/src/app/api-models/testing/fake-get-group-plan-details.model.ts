/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetGroupPlanDetails} from "../../api-models"

var getGroupPlanDetails1 = new GetGroupPlanDetails();
getGroupPlanDetails1.pGroupId ="sample data1";
getGroupPlanDetails1.oHaadPrdCd ="sample data1";
getGroupPlanDetails1.oDhaPrdCd ="sample data1";
getGroupPlanDetails1.oOtherUaePrdCd ="sample data1";

var getGroupPlanDetails2 = new GetGroupPlanDetails();
getGroupPlanDetails2.pGroupId ="sample data2";
getGroupPlanDetails2.oHaadPrdCd ="sample data2";
getGroupPlanDetails2.oDhaPrdCd ="sample data2";
getGroupPlanDetails2.oOtherUaePrdCd ="sample data2";

var getGroupPlanDetails3 = new GetGroupPlanDetails();
getGroupPlanDetails3.pGroupId ="sample data3";
getGroupPlanDetails3.oHaadPrdCd ="sample data3";
getGroupPlanDetails3.oDhaPrdCd ="sample data3";
getGroupPlanDetails3.oOtherUaePrdCd ="sample data3";


export const GetGroupPlanDetail: GetGroupPlanDetails[] = [
    getGroupPlanDetails1,
    getGroupPlanDetails2,
    getGroupPlanDetails3,
];