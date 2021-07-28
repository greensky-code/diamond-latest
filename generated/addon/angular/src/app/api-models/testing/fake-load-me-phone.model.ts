/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LoadMePhone} from "../../api-models"

var loadMePhone1 = new LoadMePhone();
loadMePhone1.pSeqMembId =123;
loadMePhone1.pSeqSubsId =123;
loadMePhone1.pMeMobileNum ="sample data1";
loadMePhone1.pMeHomeNum ="sample data1";
loadMePhone1.pEntityCode ="sample data1";

var loadMePhone2 = new LoadMePhone();
loadMePhone2.pSeqMembId =123;
loadMePhone2.pSeqSubsId =123;
loadMePhone2.pMeMobileNum ="sample data2";
loadMePhone2.pMeHomeNum ="sample data2";
loadMePhone2.pEntityCode ="sample data2";

var loadMePhone3 = new LoadMePhone();
loadMePhone3.pSeqMembId =123;
loadMePhone3.pSeqSubsId =123;
loadMePhone3.pMeMobileNum ="sample data3";
loadMePhone3.pMeHomeNum ="sample data3";
loadMePhone3.pEntityCode ="sample data3";


export const LoadMePhones: LoadMePhone[] = [
    loadMePhone1,
    loadMePhone2,
    loadMePhone3,
];