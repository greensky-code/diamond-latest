/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncGetClmNetworkType} from "../../api-models"

var funcGetClmNetworkType1 = new FuncGetClmNetworkType();
funcGetClmNetworkType1.pSeqClaimId =123;
funcGetClmNetworkType1.pFileType ="sample data1";

var funcGetClmNetworkType2 = new FuncGetClmNetworkType();
funcGetClmNetworkType2.pSeqClaimId =123;
funcGetClmNetworkType2.pFileType ="sample data2";

var funcGetClmNetworkType3 = new FuncGetClmNetworkType();
funcGetClmNetworkType3.pSeqClaimId =123;
funcGetClmNetworkType3.pFileType ="sample data3";


export const FuncGetClmNetworkTypes: FuncGetClmNetworkType[] = [
    funcGetClmNetworkType1,
    funcGetClmNetworkType2,
    funcGetClmNetworkType3,
];