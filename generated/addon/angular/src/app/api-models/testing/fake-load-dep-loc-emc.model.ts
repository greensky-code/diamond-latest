/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LoadDepLocEmc} from "../../api-models"

var loadDepLocEmc1 = new LoadDepLocEmc();
loadDepLocEmc1.pSeqEntityId =123;
loadDepLocEmc1.pEntityCode ="sample data1";
loadDepLocEmc1.pSubworkloc ="sample data1";
loadDepLocEmc1.pEmiratecd ="sample data1";

var loadDepLocEmc2 = new LoadDepLocEmc();
loadDepLocEmc2.pSeqEntityId =123;
loadDepLocEmc2.pEntityCode ="sample data2";
loadDepLocEmc2.pSubworkloc ="sample data2";
loadDepLocEmc2.pEmiratecd ="sample data2";

var loadDepLocEmc3 = new LoadDepLocEmc();
loadDepLocEmc3.pSeqEntityId =123;
loadDepLocEmc3.pEntityCode ="sample data3";
loadDepLocEmc3.pSubworkloc ="sample data3";
loadDepLocEmc3.pEmiratecd ="sample data3";


export const LoadDepLocEmcs: LoadDepLocEmc[] = [
    loadDepLocEmc1,
    loadDepLocEmc2,
    loadDepLocEmc3,
];