/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Icd9ToIcd10} from "../../api-models"

var icd9ToIcd101 = new Icd9ToIcd10();
icd9ToIcd101.pDiagCode ="sample data1";

var icd9ToIcd102 = new Icd9ToIcd10();
icd9ToIcd102.pDiagCode ="sample data2";

var icd9ToIcd103 = new Icd9ToIcd10();
icd9ToIcd103.pDiagCode ="sample data3";


export const Icd9ToIcd10S: Icd9ToIcd10[] = [
    icd9ToIcd101,
    icd9ToIcd102,
    icd9ToIcd103,
];