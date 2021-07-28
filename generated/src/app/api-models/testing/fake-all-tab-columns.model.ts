/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AllTabColumns} from "../../api-models"

var allTabColumns1 = new AllTabColumns();
allTabColumns1.owners ="sample data1";
allTabColumns1.tableName ="sample data1";
allTabColumns1.columnName ="sample data1";

var allTabColumns2 = new AllTabColumns();
allTabColumns2.owners ="sample data2";
allTabColumns2.tableName ="sample data2";
allTabColumns2.columnName ="sample data2";

var allTabColumns3 = new AllTabColumns();
allTabColumns3.owners ="sample data3";
allTabColumns3.tableName ="sample data3";
allTabColumns3.columnName ="sample data3";


export const AllTabColumnss: AllTabColumns[] = [
    allTabColumns1,
    allTabColumns2,
    allTabColumns3,
];