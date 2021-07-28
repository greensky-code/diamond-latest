/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcInsertVatRegNo} from "../../api-models"

var procInsertVatRegNo1 = new ProcInsertVatRegNo();
procInsertVatRegNo1.pGroupId ="sample data1";
procInsertVatRegNo1.pType ="sample data1";
procInsertVatRegNo1.pRegistrationNo ="sample data1";
procInsertVatRegNo1.pRegistrationName ="sample data1";
procInsertVatRegNo1.pCountryCode ="sample data1";
procInsertVatRegNo1.pRegionCode ="sample data1";
procInsertVatRegNo1.pEffectiveDate ="sample data1";
procInsertVatRegNo1.pTermDate ="sample data1";
procInsertVatRegNo1.pRetMsg ="sample data1";

var procInsertVatRegNo2 = new ProcInsertVatRegNo();
procInsertVatRegNo2.pGroupId ="sample data2";
procInsertVatRegNo2.pType ="sample data2";
procInsertVatRegNo2.pRegistrationNo ="sample data2";
procInsertVatRegNo2.pRegistrationName ="sample data2";
procInsertVatRegNo2.pCountryCode ="sample data2";
procInsertVatRegNo2.pRegionCode ="sample data2";
procInsertVatRegNo2.pEffectiveDate ="sample data2";
procInsertVatRegNo2.pTermDate ="sample data2";
procInsertVatRegNo2.pRetMsg ="sample data2";

var procInsertVatRegNo3 = new ProcInsertVatRegNo();
procInsertVatRegNo3.pGroupId ="sample data3";
procInsertVatRegNo3.pType ="sample data3";
procInsertVatRegNo3.pRegistrationNo ="sample data3";
procInsertVatRegNo3.pRegistrationName ="sample data3";
procInsertVatRegNo3.pCountryCode ="sample data3";
procInsertVatRegNo3.pRegionCode ="sample data3";
procInsertVatRegNo3.pEffectiveDate ="sample data3";
procInsertVatRegNo3.pTermDate ="sample data3";
procInsertVatRegNo3.pRetMsg ="sample data3";


export const ProcInsertVatRegNoes: ProcInsertVatRegNo[] = [
    procInsertVatRegNo1,
    procInsertVatRegNo2,
    procInsertVatRegNo3,
];