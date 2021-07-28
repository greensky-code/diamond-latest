/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Formatstreetaddress} from "../../api-models"

var formatstreetaddress1 = new Formatstreetaddress();
formatstreetaddress1.seqaddrid =123;
formatstreetaddress1.seqentityid =123;
formatstreetaddress1.addrline1 ="sample data1";
formatstreetaddress1.addrline2 ="sample data1";
formatstreetaddress1.addrline3 ="sample data1";
formatstreetaddress1.addrline4 ="sample data1";
formatstreetaddress1.addrline5 ="sample data1";
formatstreetaddress1.addrline6 ="sample data1";
formatstreetaddress1.addrline7 ="sample data1";
formatstreetaddress1.addrline8 ="sample data1";
formatstreetaddress1.pUser ="sample data1";

var formatstreetaddress2 = new Formatstreetaddress();
formatstreetaddress2.seqaddrid =123;
formatstreetaddress2.seqentityid =123;
formatstreetaddress2.addrline1 ="sample data2";
formatstreetaddress2.addrline2 ="sample data2";
formatstreetaddress2.addrline3 ="sample data2";
formatstreetaddress2.addrline4 ="sample data2";
formatstreetaddress2.addrline5 ="sample data2";
formatstreetaddress2.addrline6 ="sample data2";
formatstreetaddress2.addrline7 ="sample data2";
formatstreetaddress2.addrline8 ="sample data2";
formatstreetaddress2.pUser ="sample data2";

var formatstreetaddress3 = new Formatstreetaddress();
formatstreetaddress3.seqaddrid =123;
formatstreetaddress3.seqentityid =123;
formatstreetaddress3.addrline1 ="sample data3";
formatstreetaddress3.addrline2 ="sample data3";
formatstreetaddress3.addrline3 ="sample data3";
formatstreetaddress3.addrline4 ="sample data3";
formatstreetaddress3.addrline5 ="sample data3";
formatstreetaddress3.addrline6 ="sample data3";
formatstreetaddress3.addrline7 ="sample data3";
formatstreetaddress3.addrline8 ="sample data3";
formatstreetaddress3.pUser ="sample data3";


export const Formatstreetaddresses: Formatstreetaddress[] = [
    formatstreetaddress1,
    formatstreetaddress2,
    formatstreetaddress3,
];