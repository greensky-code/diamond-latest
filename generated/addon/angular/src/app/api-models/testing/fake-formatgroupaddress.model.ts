/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Formatgroupaddress} from "../../api-models"

var formatgroupaddress1 = new Formatgroupaddress();
formatgroupaddress1.seqmembid =123;
formatgroupaddress1.seqgroupid =123;
formatgroupaddress1.addrline1 ="sample data1";
formatgroupaddress1.addrline2 ="sample data1";
formatgroupaddress1.addrline3 ="sample data1";
formatgroupaddress1.addrline4 ="sample data1";
formatgroupaddress1.addrline5 ="sample data1";
formatgroupaddress1.addrline6 ="sample data1";
formatgroupaddress1.addrline7 ="sample data1";
formatgroupaddress1.addrline8 ="sample data1";

var formatgroupaddress2 = new Formatgroupaddress();
formatgroupaddress2.seqmembid =123;
formatgroupaddress2.seqgroupid =123;
formatgroupaddress2.addrline1 ="sample data2";
formatgroupaddress2.addrline2 ="sample data2";
formatgroupaddress2.addrline3 ="sample data2";
formatgroupaddress2.addrline4 ="sample data2";
formatgroupaddress2.addrline5 ="sample data2";
formatgroupaddress2.addrline6 ="sample data2";
formatgroupaddress2.addrline7 ="sample data2";
formatgroupaddress2.addrline8 ="sample data2";

var formatgroupaddress3 = new Formatgroupaddress();
formatgroupaddress3.seqmembid =123;
formatgroupaddress3.seqgroupid =123;
formatgroupaddress3.addrline1 ="sample data3";
formatgroupaddress3.addrline2 ="sample data3";
formatgroupaddress3.addrline3 ="sample data3";
formatgroupaddress3.addrline4 ="sample data3";
formatgroupaddress3.addrline5 ="sample data3";
formatgroupaddress3.addrline6 ="sample data3";
formatgroupaddress3.addrline7 ="sample data3";
formatgroupaddress3.addrline8 ="sample data3";


export const Formatgroupaddresses: Formatgroupaddress[] = [
    formatgroupaddress1,
    formatgroupaddress2,
    formatgroupaddress3,
];