/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcCloneData} from "../../api-models"

var procCloneData1 = new ProcCloneData();
procCloneData1.pGroupId ="sample data1";
procCloneData1.pCountryCode ="sample data1";
procCloneData1.pUserId ="sample data1";

var procCloneData2 = new ProcCloneData();
procCloneData2.pGroupId ="sample data2";
procCloneData2.pCountryCode ="sample data2";
procCloneData2.pUserId ="sample data2";

var procCloneData3 = new ProcCloneData();
procCloneData3.pGroupId ="sample data3";
procCloneData3.pCountryCode ="sample data3";
procCloneData3.pUserId ="sample data3";


export const ProcCloneDatas: ProcCloneData[] = [
    procCloneData1,
    procCloneData2,
    procCloneData3,
];