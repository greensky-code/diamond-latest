/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcLoadNote} from "../../api-models"

var procLoadNote1 = new ProcLoadNote();
procLoadNote1.pGroupId ="sample data1";
procLoadNote1.pProvInd ="sample data1";
procLoadNote1.pUserId ="sample data1";

var procLoadNote2 = new ProcLoadNote();
procLoadNote2.pGroupId ="sample data2";
procLoadNote2.pProvInd ="sample data2";
procLoadNote2.pUserId ="sample data2";

var procLoadNote3 = new ProcLoadNote();
procLoadNote3.pGroupId ="sample data3";
procLoadNote3.pProvInd ="sample data3";
procLoadNote3.pUserId ="sample data3";


export const ProcLoadNotes: ProcLoadNote[] = [
    procLoadNote1,
    procLoadNote2,
    procLoadNote3,
];