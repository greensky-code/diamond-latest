/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LoadPmaAddress} from "../../api-models"

var loadPmaAddress1 = new LoadPmaAddress();
loadPmaAddress1.pSeqCompanyId =123;
loadPmaAddress1.pSeqVendAddress =123;
loadPmaAddress1.pAddressLine1 ="sample data1";
loadPmaAddress1.pAddressLine2 ="sample data1";
loadPmaAddress1.pCity ="sample data1";
loadPmaAddress1.pState ="sample data1";
loadPmaAddress1.pZipCode ="sample data1";
loadPmaAddress1.pCountry ="sample data1";
loadPmaAddress1.pEntityCode ="sample data1";

var loadPmaAddress2 = new LoadPmaAddress();
loadPmaAddress2.pSeqCompanyId =123;
loadPmaAddress2.pSeqVendAddress =123;
loadPmaAddress2.pAddressLine1 ="sample data2";
loadPmaAddress2.pAddressLine2 ="sample data2";
loadPmaAddress2.pCity ="sample data2";
loadPmaAddress2.pState ="sample data2";
loadPmaAddress2.pZipCode ="sample data2";
loadPmaAddress2.pCountry ="sample data2";
loadPmaAddress2.pEntityCode ="sample data2";

var loadPmaAddress3 = new LoadPmaAddress();
loadPmaAddress3.pSeqCompanyId =123;
loadPmaAddress3.pSeqVendAddress =123;
loadPmaAddress3.pAddressLine1 ="sample data3";
loadPmaAddress3.pAddressLine2 ="sample data3";
loadPmaAddress3.pCity ="sample data3";
loadPmaAddress3.pState ="sample data3";
loadPmaAddress3.pZipCode ="sample data3";
loadPmaAddress3.pCountry ="sample data3";
loadPmaAddress3.pEntityCode ="sample data3";


export const LoadPmaAddresses: LoadPmaAddress[] = [
    loadPmaAddress1,
    loadPmaAddress2,
    loadPmaAddress3,
];