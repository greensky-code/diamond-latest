/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncCleanStringField} from "../../api-models"

var funcCleanStringField1 = new FuncCleanStringField();
funcCleanStringField1.pOriginalString ="sample data1";
funcCleanStringField1.pConvertForeign ="sample data1";
funcCleanStringField1.pEliminateControlChars ="sample data1";
funcCleanStringField1.pConvertToUpper ="sample data1";

var funcCleanStringField2 = new FuncCleanStringField();
funcCleanStringField2.pOriginalString ="sample data2";
funcCleanStringField2.pConvertForeign ="sample data2";
funcCleanStringField2.pEliminateControlChars ="sample data2";
funcCleanStringField2.pConvertToUpper ="sample data2";

var funcCleanStringField3 = new FuncCleanStringField();
funcCleanStringField3.pOriginalString ="sample data3";
funcCleanStringField3.pConvertForeign ="sample data3";
funcCleanStringField3.pEliminateControlChars ="sample data3";
funcCleanStringField3.pConvertToUpper ="sample data3";


export const FuncCleanStringFields: FuncCleanStringField[] = [
    funcCleanStringField1,
    funcCleanStringField2,
    funcCleanStringField3,
];