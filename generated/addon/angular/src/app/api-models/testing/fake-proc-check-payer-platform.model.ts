/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcCheckPayerPlatform} from "../../api-models"

var procCheckPayerPlatform1 = new ProcCheckPayerPlatform();
procCheckPayerPlatform1.pSeqGroupId =123;
procCheckPayerPlatform1.pDisplay ="sample data1";
procCheckPayerPlatform1.pStartDateFlag ="sample data1";

var procCheckPayerPlatform2 = new ProcCheckPayerPlatform();
procCheckPayerPlatform2.pSeqGroupId =123;
procCheckPayerPlatform2.pDisplay ="sample data2";
procCheckPayerPlatform2.pStartDateFlag ="sample data2";

var procCheckPayerPlatform3 = new ProcCheckPayerPlatform();
procCheckPayerPlatform3.pSeqGroupId =123;
procCheckPayerPlatform3.pDisplay ="sample data3";
procCheckPayerPlatform3.pStartDateFlag ="sample data3";


export const ProcCheckPayerPlatforms: ProcCheckPayerPlatform[] = [
    procCheckPayerPlatform1,
    procCheckPayerPlatform2,
    procCheckPayerPlatform3,
];