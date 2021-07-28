/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { FuncAbbrvAddressline} from "../../api-models"

var funcAbbrvAddressline1 = new FuncAbbrvAddressline();
funcAbbrvAddressline1.pAddress ="sample data1";
funcAbbrvAddressline1.pAddressLength =123;

var funcAbbrvAddressline2 = new FuncAbbrvAddressline();
funcAbbrvAddressline2.pAddress ="sample data2";
funcAbbrvAddressline2.pAddressLength =123;

var funcAbbrvAddressline3 = new FuncAbbrvAddressline();
funcAbbrvAddressline3.pAddress ="sample data3";
funcAbbrvAddressline3.pAddressLength =123;


export const FuncAbbrvAddresslines: FuncAbbrvAddressline[] = [
    funcAbbrvAddressline1,
    funcAbbrvAddressline2,
    funcAbbrvAddressline3,
];