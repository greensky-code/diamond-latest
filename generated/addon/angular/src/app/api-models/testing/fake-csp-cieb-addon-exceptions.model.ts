/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspCiebAddonExceptions} from "../../api-models"

var cspCiebAddonExceptions1 = new CspCiebAddonExceptions();
cspCiebAddonExceptions1.pProcedureName ="sample data1";
cspCiebAddonExceptions1.pTableName ="sample data1";
cspCiebAddonExceptions1.pUserName ="sample data1";
cspCiebAddonExceptions1.pOsUserName ="sample data1";
cspCiebAddonExceptions1.pErrorCode ="sample data1";
cspCiebAddonExceptions1.pErrorMessage ="sample data1";
cspCiebAddonExceptions1.pErrorDate ="sample data1";
cspCiebAddonExceptions1.pComments ="sample data1";

var cspCiebAddonExceptions2 = new CspCiebAddonExceptions();
cspCiebAddonExceptions2.pProcedureName ="sample data2";
cspCiebAddonExceptions2.pTableName ="sample data2";
cspCiebAddonExceptions2.pUserName ="sample data2";
cspCiebAddonExceptions2.pOsUserName ="sample data2";
cspCiebAddonExceptions2.pErrorCode ="sample data2";
cspCiebAddonExceptions2.pErrorMessage ="sample data2";
cspCiebAddonExceptions2.pErrorDate ="sample data2";
cspCiebAddonExceptions2.pComments ="sample data2";

var cspCiebAddonExceptions3 = new CspCiebAddonExceptions();
cspCiebAddonExceptions3.pProcedureName ="sample data3";
cspCiebAddonExceptions3.pTableName ="sample data3";
cspCiebAddonExceptions3.pUserName ="sample data3";
cspCiebAddonExceptions3.pOsUserName ="sample data3";
cspCiebAddonExceptions3.pErrorCode ="sample data3";
cspCiebAddonExceptions3.pErrorMessage ="sample data3";
cspCiebAddonExceptions3.pErrorDate ="sample data3";
cspCiebAddonExceptions3.pComments ="sample data3";


export const CspCiebAddonException: CspCiebAddonExceptions[] = [
    cspCiebAddonExceptions1,
    cspCiebAddonExceptions2,
    cspCiebAddonExceptions3,
];