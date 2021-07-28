/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CsfGetStrAddrByEntAndCd} from "../../api-models"

var csfGetStrAddrByEntAndCd1 = new CsfGetStrAddrByEntAndCd();
csfGetStrAddrByEntAndCd1.pSeqEntityId =123;
csfGetStrAddrByEntAndCd1.pAddressCode ="sample data1";

var csfGetStrAddrByEntAndCd2 = new CsfGetStrAddrByEntAndCd();
csfGetStrAddrByEntAndCd2.pSeqEntityId =123;
csfGetStrAddrByEntAndCd2.pAddressCode ="sample data2";

var csfGetStrAddrByEntAndCd3 = new CsfGetStrAddrByEntAndCd();
csfGetStrAddrByEntAndCd3.pSeqEntityId =123;
csfGetStrAddrByEntAndCd3.pAddressCode ="sample data3";


export const CsfGetStrAddrByEntAndCds: CsfGetStrAddrByEntAndCd[] = [
    csfGetStrAddrByEntAndCd1,
    csfGetStrAddrByEntAndCd2,
    csfGetStrAddrByEntAndCd3,
];