/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfUpdateList} from "../../api-models"

var csfUpdateList1 = new CsfUpdateList();
csfUpdateList1.pOriginalList ="sample data1";
csfUpdateList1.pNewPart ="sample data1";

var csfUpdateList2 = new CsfUpdateList();
csfUpdateList2.pOriginalList ="sample data2";
csfUpdateList2.pNewPart ="sample data2";

var csfUpdateList3 = new CsfUpdateList();
csfUpdateList3.pOriginalList ="sample data3";
csfUpdateList3.pNewPart ="sample data3";


export const CsfUpdateLists: CsfUpdateList[] = [
    csfUpdateList1,
    csfUpdateList2,
    csfUpdateList3,
];