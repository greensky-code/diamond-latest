/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetGroupFiling} from "../../api-models"

var procGetGroupFiling1 = new ProcGetGroupFiling();
procGetGroupFiling1.pGroupId ="sample data1";
procGetGroupFiling1.pGroupName ="sample data1";
procGetGroupFiling1.pResult ="sample data1";

var procGetGroupFiling2 = new ProcGetGroupFiling();
procGetGroupFiling2.pGroupId ="sample data2";
procGetGroupFiling2.pGroupName ="sample data2";
procGetGroupFiling2.pResult ="sample data2";

var procGetGroupFiling3 = new ProcGetGroupFiling();
procGetGroupFiling3.pGroupId ="sample data3";
procGetGroupFiling3.pGroupName ="sample data3";
procGetGroupFiling3.pResult ="sample data3";


export const ProcGetGroupFilings: ProcGetGroupFiling[] = [
    procGetGroupFiling1,
    procGetGroupFiling2,
    procGetGroupFiling3,
];