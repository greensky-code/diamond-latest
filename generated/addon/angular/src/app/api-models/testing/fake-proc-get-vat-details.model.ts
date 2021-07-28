/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetVatDetails} from "../../api-models"

var procGetVatDetails1 = new ProcGetVatDetails();
procGetVatDetails1.pGroupId ="sample data1";
procGetVatDetails1.pCountryCode ="sample data1";

var procGetVatDetails2 = new ProcGetVatDetails();
procGetVatDetails2.pGroupId ="sample data2";
procGetVatDetails2.pCountryCode ="sample data2";

var procGetVatDetails3 = new ProcGetVatDetails();
procGetVatDetails3.pGroupId ="sample data3";
procGetVatDetails3.pCountryCode ="sample data3";


export const ProcGetVatDetail: ProcGetVatDetails[] = [
    procGetVatDetails1,
    procGetVatDetails2,
    procGetVatDetails3,
];