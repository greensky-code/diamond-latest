/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcUpdateVatRegNo} from "../../api-models"

var procUpdateVatRegNo1 = new ProcUpdateVatRegNo();
procUpdateVatRegNo1.pSeqAddlInfoId =123;
procUpdateVatRegNo1.pRegistrationNo ="sample data1";
procUpdateVatRegNo1.pRegistrationName ="sample data1";
procUpdateVatRegNo1.pEffectiveDate ="sample data1";
procUpdateVatRegNo1.pTermDate ="sample data1";
procUpdateVatRegNo1.pRetMsg ="sample data1";

var procUpdateVatRegNo2 = new ProcUpdateVatRegNo();
procUpdateVatRegNo2.pSeqAddlInfoId =123;
procUpdateVatRegNo2.pRegistrationNo ="sample data2";
procUpdateVatRegNo2.pRegistrationName ="sample data2";
procUpdateVatRegNo2.pEffectiveDate ="sample data2";
procUpdateVatRegNo2.pTermDate ="sample data2";
procUpdateVatRegNo2.pRetMsg ="sample data2";

var procUpdateVatRegNo3 = new ProcUpdateVatRegNo();
procUpdateVatRegNo3.pSeqAddlInfoId =123;
procUpdateVatRegNo3.pRegistrationNo ="sample data3";
procUpdateVatRegNo3.pRegistrationName ="sample data3";
procUpdateVatRegNo3.pEffectiveDate ="sample data3";
procUpdateVatRegNo3.pTermDate ="sample data3";
procUpdateVatRegNo3.pRetMsg ="sample data3";


export const ProcUpdateVatRegNoes: ProcUpdateVatRegNo[] = [
    procUpdateVatRegNo1,
    procUpdateVatRegNo2,
    procUpdateVatRegNo3,
];