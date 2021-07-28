/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetGroupTestStatus} from "../../api-models"

var procGetGroupTestStatus1 = new ProcGetGroupTestStatus();
procGetGroupTestStatus1.pSeqGroupId =123;
procGetGroupTestStatus1.pShowField ="sample data1";
procGetGroupTestStatus1.pShowValue ="sample data1";

var procGetGroupTestStatus2 = new ProcGetGroupTestStatus();
procGetGroupTestStatus2.pSeqGroupId =123;
procGetGroupTestStatus2.pShowField ="sample data2";
procGetGroupTestStatus2.pShowValue ="sample data2";

var procGetGroupTestStatus3 = new ProcGetGroupTestStatus();
procGetGroupTestStatus3.pSeqGroupId =123;
procGetGroupTestStatus3.pShowField ="sample data3";
procGetGroupTestStatus3.pShowValue ="sample data3";


export const ProcGetGroupTestStatu: ProcGetGroupTestStatus[] = [
    procGetGroupTestStatus1,
    procGetGroupTestStatus2,
    procGetGroupTestStatus3,
];