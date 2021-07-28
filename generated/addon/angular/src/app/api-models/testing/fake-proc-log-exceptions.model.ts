/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcLogExceptions} from "../../api-models"

var procLogExceptions1 = new ProcLogExceptions();
procLogExceptions1.pProcedureName ="sample data1";
procLogExceptions1.pTableName ="sample data1";
procLogExceptions1.pUserName ="sample data1";
procLogExceptions1.pOsUserName ="sample data1";
procLogExceptions1.pErrorCode ="sample data1";
procLogExceptions1.pErrorMessage ="sample data1";
procLogExceptions1.pErrorDate ="sample data1";
procLogExceptions1.pComments ="sample data1";

var procLogExceptions2 = new ProcLogExceptions();
procLogExceptions2.pProcedureName ="sample data2";
procLogExceptions2.pTableName ="sample data2";
procLogExceptions2.pUserName ="sample data2";
procLogExceptions2.pOsUserName ="sample data2";
procLogExceptions2.pErrorCode ="sample data2";
procLogExceptions2.pErrorMessage ="sample data2";
procLogExceptions2.pErrorDate ="sample data2";
procLogExceptions2.pComments ="sample data2";

var procLogExceptions3 = new ProcLogExceptions();
procLogExceptions3.pProcedureName ="sample data3";
procLogExceptions3.pTableName ="sample data3";
procLogExceptions3.pUserName ="sample data3";
procLogExceptions3.pOsUserName ="sample data3";
procLogExceptions3.pErrorCode ="sample data3";
procLogExceptions3.pErrorMessage ="sample data3";
procLogExceptions3.pErrorDate ="sample data3";
procLogExceptions3.pComments ="sample data3";


export const ProcLogException: ProcLogExceptions[] = [
    procLogExceptions1,
    procLogExceptions2,
    procLogExceptions3,
];