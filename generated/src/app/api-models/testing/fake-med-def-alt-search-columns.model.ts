/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MedDefAltSearchColumns} from "../../api-models"

var medDefAltSearchColumns1 = new MedDefAltSearchColumns();
medDefAltSearchColumns1.claimHdrColumns ="sample data1";
medDefAltSearchColumns1.validationTableName ="sample data1";
medDefAltSearchColumns1.validationColumnName ="sample data1";
medDefAltSearchColumns1.medorDisplayColumn ="sample data1";

var medDefAltSearchColumns2 = new MedDefAltSearchColumns();
medDefAltSearchColumns2.claimHdrColumns ="sample data2";
medDefAltSearchColumns2.validationTableName ="sample data2";
medDefAltSearchColumns2.validationColumnName ="sample data2";
medDefAltSearchColumns2.medorDisplayColumn ="sample data2";

var medDefAltSearchColumns3 = new MedDefAltSearchColumns();
medDefAltSearchColumns3.claimHdrColumns ="sample data3";
medDefAltSearchColumns3.validationTableName ="sample data3";
medDefAltSearchColumns3.validationColumnName ="sample data3";
medDefAltSearchColumns3.medorDisplayColumn ="sample data3";


export const MedDefAltSearchColumnss: MedDefAltSearchColumns[] = [
    medDefAltSearchColumns1,
    medDefAltSearchColumns2,
    medDefAltSearchColumns3,
];