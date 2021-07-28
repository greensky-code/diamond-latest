/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetGroupAddr} from "../../api-models"

var procGetGroupAddr1 = new ProcGetGroupAddr();
procGetGroupAddr1.pGroupId ="sample data1";
procGetGroupAddr1.oProvInd ="sample data1";
procGetGroupAddr1.pGroupName ="sample data1";

var procGetGroupAddr2 = new ProcGetGroupAddr();
procGetGroupAddr2.pGroupId ="sample data2";
procGetGroupAddr2.oProvInd ="sample data2";
procGetGroupAddr2.pGroupName ="sample data2";

var procGetGroupAddr3 = new ProcGetGroupAddr();
procGetGroupAddr3.pGroupId ="sample data3";
procGetGroupAddr3.oProvInd ="sample data3";
procGetGroupAddr3.pGroupName ="sample data3";


export const ProcGetGroupAddrs: ProcGetGroupAddr[] = [
    procGetGroupAddr1,
    procGetGroupAddr2,
    procGetGroupAddr3,
];