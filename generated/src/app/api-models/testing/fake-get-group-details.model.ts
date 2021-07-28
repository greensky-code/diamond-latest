/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetGroupDetails} from "../../api-models"

var getGroupDetails1 = new GetGroupDetails();
getGroupDetails1.pGroupId ="sample data1";
getGroupDetails1.pGroupName ="sample data1";
getGroupDetails1.pGroupHistTaxExempt ="sample data1";
getGroupDetails1.pGroupCurrentTaxExempt ="sample data1";

var getGroupDetails2 = new GetGroupDetails();
getGroupDetails2.pGroupId ="sample data2";
getGroupDetails2.pGroupName ="sample data2";
getGroupDetails2.pGroupHistTaxExempt ="sample data2";
getGroupDetails2.pGroupCurrentTaxExempt ="sample data2";

var getGroupDetails3 = new GetGroupDetails();
getGroupDetails3.pGroupId ="sample data3";
getGroupDetails3.pGroupName ="sample data3";
getGroupDetails3.pGroupHistTaxExempt ="sample data3";
getGroupDetails3.pGroupCurrentTaxExempt ="sample data3";


export const GetGroupDetail: GetGroupDetails[] = [
    getGroupDetails1,
    getGroupDetails2,
    getGroupDetails3,
];