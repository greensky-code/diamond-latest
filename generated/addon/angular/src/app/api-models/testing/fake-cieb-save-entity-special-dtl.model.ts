/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebSaveEntitySpecialDtl} from "../../api-models"

var ciebSaveEntitySpecialDtl1 = new CiebSaveEntitySpecialDtl();
ciebSaveEntitySpecialDtl1.pSeqEntityId =123;

var ciebSaveEntitySpecialDtl2 = new CiebSaveEntitySpecialDtl();
ciebSaveEntitySpecialDtl2.pSeqEntityId =123;

var ciebSaveEntitySpecialDtl3 = new CiebSaveEntitySpecialDtl();
ciebSaveEntitySpecialDtl3.pSeqEntityId =123;


export const CiebSaveEntitySpecialDtls: CiebSaveEntitySpecialDtl[] = [
    ciebSaveEntitySpecialDtl1,
    ciebSaveEntitySpecialDtl2,
    ciebSaveEntitySpecialDtl3,
];