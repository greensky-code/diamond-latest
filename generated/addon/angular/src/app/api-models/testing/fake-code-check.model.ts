/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CodeCheck} from "../../api-models"

var codeCheck1 = new CodeCheck();
codeCheck1.pCode ="sample data1";
codeCheck1.pCodeType ="sample data1";

var codeCheck2 = new CodeCheck();
codeCheck2.pCode ="sample data2";
codeCheck2.pCodeType ="sample data2";

var codeCheck3 = new CodeCheck();
codeCheck3.pCode ="sample data3";
codeCheck3.pCodeType ="sample data3";


export const CodeChecks: CodeCheck[] = [
    codeCheck1,
    codeCheck2,
    codeCheck3,
];