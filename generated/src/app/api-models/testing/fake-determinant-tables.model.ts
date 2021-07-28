/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantTables} from "../../api-models"

var determinantTables1 = new DeterminantTables();
determinantTables1.keyword ="sample data1";
determinantTables1.seqRuleId =123;
determinantTables1.searchSequence =123;
determinantTables1.determinantTable ="sample data1";
determinantTables1.determinantColumn ="sample data1";
determinantTables1.determinantDatatype ="sample data1";
determinantTables1.subsInd ="sample data1";
determinantTables1.securityCode ="sample data1";
determinantTables1.insertDatetime =new Date('2010-01-01');
determinantTables1.insertUser ="sample data1";
determinantTables1.insertProcess ="sample data1";
determinantTables1.updateDatetime =new Date('2010-01-01');
determinantTables1.updateUser ="sample data1";
determinantTables1.updateProcess ="sample data1";

var determinantTables2 = new DeterminantTables();
determinantTables2.keyword ="sample data2";
determinantTables2.seqRuleId =123;
determinantTables2.searchSequence =123;
determinantTables2.determinantTable ="sample data2";
determinantTables2.determinantColumn ="sample data2";
determinantTables2.determinantDatatype ="sample data2";
determinantTables2.subsInd ="sample data2";
determinantTables2.securityCode ="sample data2";
determinantTables2.insertDatetime =new Date('2010-01-01');
determinantTables2.insertUser ="sample data2";
determinantTables2.insertProcess ="sample data2";
determinantTables2.updateDatetime =new Date('2010-01-01');
determinantTables2.updateUser ="sample data2";
determinantTables2.updateProcess ="sample data2";

var determinantTables3 = new DeterminantTables();
determinantTables3.keyword ="sample data3";
determinantTables3.seqRuleId =123;
determinantTables3.searchSequence =123;
determinantTables3.determinantTable ="sample data3";
determinantTables3.determinantColumn ="sample data3";
determinantTables3.determinantDatatype ="sample data3";
determinantTables3.subsInd ="sample data3";
determinantTables3.securityCode ="sample data3";
determinantTables3.insertDatetime =new Date('2010-01-01');
determinantTables3.insertUser ="sample data3";
determinantTables3.insertProcess ="sample data3";
determinantTables3.updateDatetime =new Date('2010-01-01');
determinantTables3.updateUser ="sample data3";
determinantTables3.updateProcess ="sample data3";


export const DeterminantTableses: DeterminantTables[] = [
    determinantTables1,
    determinantTables2,
    determinantTables3,
];