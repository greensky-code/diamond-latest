/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetSubdivAddress} from "../../api-models"

var procGetSubdivAddress1 = new ProcGetSubdivAddress();
procGetSubdivAddress1.pSubscriberId ="sample data1";
procGetSubdivAddress1.poAddrline1 ="sample data1";
procGetSubdivAddress1.poAddrline2 ="sample data1";
procGetSubdivAddress1.poCity ="sample data1";
procGetSubdivAddress1.poState ="sample data1";
procGetSubdivAddress1.poDistrict ="sample data1";
procGetSubdivAddress1.poProvince ="sample data1";
procGetSubdivAddress1.poCountryCode ="sample data1";
procGetSubdivAddress1.poSubDivCode ="sample data1";
procGetSubdivAddress1.poPostalCode ="sample data1";

var procGetSubdivAddress2 = new ProcGetSubdivAddress();
procGetSubdivAddress2.pSubscriberId ="sample data2";
procGetSubdivAddress2.poAddrline1 ="sample data2";
procGetSubdivAddress2.poAddrline2 ="sample data2";
procGetSubdivAddress2.poCity ="sample data2";
procGetSubdivAddress2.poState ="sample data2";
procGetSubdivAddress2.poDistrict ="sample data2";
procGetSubdivAddress2.poProvince ="sample data2";
procGetSubdivAddress2.poCountryCode ="sample data2";
procGetSubdivAddress2.poSubDivCode ="sample data2";
procGetSubdivAddress2.poPostalCode ="sample data2";

var procGetSubdivAddress3 = new ProcGetSubdivAddress();
procGetSubdivAddress3.pSubscriberId ="sample data3";
procGetSubdivAddress3.poAddrline1 ="sample data3";
procGetSubdivAddress3.poAddrline2 ="sample data3";
procGetSubdivAddress3.poCity ="sample data3";
procGetSubdivAddress3.poState ="sample data3";
procGetSubdivAddress3.poDistrict ="sample data3";
procGetSubdivAddress3.poProvince ="sample data3";
procGetSubdivAddress3.poCountryCode ="sample data3";
procGetSubdivAddress3.poSubDivCode ="sample data3";
procGetSubdivAddress3.poPostalCode ="sample data3";


export const ProcGetSubdivAddresses: ProcGetSubdivAddress[] = [
    procGetSubdivAddress1,
    procGetSubdivAddress2,
    procGetSubdivAddress3,
];