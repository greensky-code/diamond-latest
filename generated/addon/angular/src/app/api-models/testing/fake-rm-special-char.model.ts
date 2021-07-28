/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { RmSpecialChar} from "../../api-models"

var rmSpecialChar1 = new RmSpecialChar();
rmSpecialChar1.pInputStr ="sample data1";

var rmSpecialChar2 = new RmSpecialChar();
rmSpecialChar2.pInputStr ="sample data2";

var rmSpecialChar3 = new RmSpecialChar();
rmSpecialChar3.pInputStr ="sample data3";


export const RmSpecialChars: RmSpecialChar[] = [
    rmSpecialChar1,
    rmSpecialChar2,
    rmSpecialChar3,
];