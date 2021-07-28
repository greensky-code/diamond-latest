/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AllTable} from "../../api-models"

var allTable1 = new AllTable();
allTable1.owners ="sample data1";
allTable1.tableName ="sample data1";

var allTable2 = new AllTable();
allTable2.owners ="sample data2";
allTable2.tableName ="sample data2";

var allTable3 = new AllTable();
allTable3.owners ="sample data3";
allTable3.tableName ="sample data3";


export const AllTables: AllTable[] = [
    allTable1,
    allTable2,
    allTable3,
];