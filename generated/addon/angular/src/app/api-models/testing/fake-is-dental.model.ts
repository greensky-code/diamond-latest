/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IsDental} from "../../api-models"

var isDental1 = new IsDental();
isDental1.pCode ="sample data1";

var isDental2 = new IsDental();
isDental2.pCode ="sample data2";

var isDental3 = new IsDental();
isDental3.pCode ="sample data3";


export const IsDentals: IsDental[] = [
    isDental1,
    isDental2,
    isDental3,
];