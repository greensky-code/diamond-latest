/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncShowTaxDetail} from "../../api-models"

var funcShowTaxDetail1 = new FuncShowTaxDetail();
funcShowTaxDetail1.pNoteType ="sample data1";

var funcShowTaxDetail2 = new FuncShowTaxDetail();
funcShowTaxDetail2.pNoteType ="sample data2";

var funcShowTaxDetail3 = new FuncShowTaxDetail();
funcShowTaxDetail3.pNoteType ="sample data3";


export const FuncShowTaxDetails: FuncShowTaxDetail[] = [
    funcShowTaxDetail1,
    funcShowTaxDetail2,
    funcShowTaxDetail3,
];