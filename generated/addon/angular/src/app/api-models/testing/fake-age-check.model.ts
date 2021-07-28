/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AgeCheck} from "../../api-models"

var ageCheck1 = new AgeCheck();
ageCheck1.pAge =123;
ageCheck1.pPkgId ="sample data1";
ageCheck1.pMedDef ="sample data1";
ageCheck1.pAgeType ="sample data1";
ageCheck1.pAgeLimit ="sample data1";

var ageCheck2 = new AgeCheck();
ageCheck2.pAge =123;
ageCheck2.pPkgId ="sample data2";
ageCheck2.pMedDef ="sample data2";
ageCheck2.pAgeType ="sample data2";
ageCheck2.pAgeLimit ="sample data2";

var ageCheck3 = new AgeCheck();
ageCheck3.pAge =123;
ageCheck3.pPkgId ="sample data3";
ageCheck3.pMedDef ="sample data3";
ageCheck3.pAgeType ="sample data3";
ageCheck3.pAgeLimit ="sample data3";


export const AgeChecks: AgeCheck[] = [
    ageCheck1,
    ageCheck2,
    ageCheck3,
];