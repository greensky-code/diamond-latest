/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncConvertShareBenList} from "../../api-models"

var funcConvertShareBenList1 = new FuncConvertShareBenList();
funcConvertShareBenList1.pExternalShareBen ="sample data1";

var funcConvertShareBenList2 = new FuncConvertShareBenList();
funcConvertShareBenList2.pExternalShareBen ="sample data2";

var funcConvertShareBenList3 = new FuncConvertShareBenList();
funcConvertShareBenList3.pExternalShareBen ="sample data3";


export const FuncConvertShareBenLists: FuncConvertShareBenList[] = [
    funcConvertShareBenList1,
    funcConvertShareBenList2,
    funcConvertShareBenList3,
];