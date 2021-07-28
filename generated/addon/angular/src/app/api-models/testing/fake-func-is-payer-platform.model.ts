/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncIsPayerPlatform} from "../../api-models"

var funcIsPayerPlatform1 = new FuncIsPayerPlatform();
funcIsPayerPlatform1.pSeqGroupId =123;

var funcIsPayerPlatform2 = new FuncIsPayerPlatform();
funcIsPayerPlatform2.pSeqGroupId =123;

var funcIsPayerPlatform3 = new FuncIsPayerPlatform();
funcIsPayerPlatform3.pSeqGroupId =123;


export const FuncIsPayerPlatforms: FuncIsPayerPlatform[] = [
    funcIsPayerPlatform1,
    funcIsPayerPlatform2,
    funcIsPayerPlatform3,
];