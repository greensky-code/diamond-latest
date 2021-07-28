/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ResetStcInforList} from "../../api-models"

var resetStcInforList1 = new ResetStcInforList();
resetStcInforList1.pStcInforList ="sample data1";

var resetStcInforList2 = new ResetStcInforList();
resetStcInforList2.pStcInforList ="sample data2";

var resetStcInforList3 = new ResetStcInforList();
resetStcInforList3.pStcInforList ="sample data3";


export const ResetStcInforLists: ResetStcInforList[] = [
    resetStcInforList1,
    resetStcInforList2,
    resetStcInforList3,
];