/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LoadPayAddress} from "../../api-models"

var loadPayAddress1 = new LoadPayAddress();
loadPayAddress1.pSeqVenprvId =123;
loadPayAddress1.pSeqVenprvAddrId =123;
loadPayAddress1.pSeqNpiId =123;
loadPayAddress1.pEntityCode ="sample data1";

var loadPayAddress2 = new LoadPayAddress();
loadPayAddress2.pSeqVenprvId =123;
loadPayAddress2.pSeqVenprvAddrId =123;
loadPayAddress2.pSeqNpiId =123;
loadPayAddress2.pEntityCode ="sample data2";

var loadPayAddress3 = new LoadPayAddress();
loadPayAddress3.pSeqVenprvId =123;
loadPayAddress3.pSeqVenprvAddrId =123;
loadPayAddress3.pSeqNpiId =123;
loadPayAddress3.pEntityCode ="sample data3";


export const LoadPayAddresses: LoadPayAddress[] = [
    loadPayAddress1,
    loadPayAddress2,
    loadPayAddress3,
];