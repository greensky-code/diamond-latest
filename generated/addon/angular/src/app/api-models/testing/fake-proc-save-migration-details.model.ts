/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcSaveMigrationDetails} from "../../api-models"

var procSaveMigrationDetails1 = new ProcSaveMigrationDetails();
procSaveMigrationDetails1.pSeqGroupId =123;
procSaveMigrationDetails1.pStartDate ="sample data1";
procSaveMigrationDetails1.pErrMsg ="sample data1";

var procSaveMigrationDetails2 = new ProcSaveMigrationDetails();
procSaveMigrationDetails2.pSeqGroupId =123;
procSaveMigrationDetails2.pStartDate ="sample data2";
procSaveMigrationDetails2.pErrMsg ="sample data2";

var procSaveMigrationDetails3 = new ProcSaveMigrationDetails();
procSaveMigrationDetails3.pSeqGroupId =123;
procSaveMigrationDetails3.pStartDate ="sample data3";
procSaveMigrationDetails3.pErrMsg ="sample data3";


export const ProcSaveMigrationDetail: ProcSaveMigrationDetails[] = [
    procSaveMigrationDetails1,
    procSaveMigrationDetails2,
    procSaveMigrationDetails3,
];