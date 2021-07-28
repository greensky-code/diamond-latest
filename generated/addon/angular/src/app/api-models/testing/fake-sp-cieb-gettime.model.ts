/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SpCiebGettime} from "../../api-models"

var spCiebGettime1 = new SpCiebGettime();
spCiebGettime1.pFromdate ="sample data1";
spCiebGettime1.pTodate ="sample data1";
spCiebGettime1.pProcname ="sample data1";
spCiebGettime1.pInitdate ="sample data1";

var spCiebGettime2 = new SpCiebGettime();
spCiebGettime2.pFromdate ="sample data2";
spCiebGettime2.pTodate ="sample data2";
spCiebGettime2.pProcname ="sample data2";
spCiebGettime2.pInitdate ="sample data2";

var spCiebGettime3 = new SpCiebGettime();
spCiebGettime3.pFromdate ="sample data3";
spCiebGettime3.pTodate ="sample data3";
spCiebGettime3.pProcname ="sample data3";
spCiebGettime3.pInitdate ="sample data3";


export const SpCiebGettimes: SpCiebGettime[] = [
    spCiebGettime1,
    spCiebGettime2,
    spCiebGettime3,
];