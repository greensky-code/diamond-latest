/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DeterminantValues} from "../../api-models"

var determinantValues1 = new DeterminantValues();
determinantValues1.keyword ="sample data1";
determinantValues1.seqRuleId =123;
determinantValues1.searchSequence =123;
determinantValues1.determinantSequence =123;
determinantValues1.operator ="sample data1";
determinantValues1.valueFrom ="sample data1";
determinantValues1.valueThru ="sample data1";
determinantValues1.secDeterminantTable ="sample data1";
determinantValues1.secDeterminantColumn ="sample data1";
determinantValues1.secDeterminantDatatype ="sample data1";
determinantValues1.securityCode ="sample data1";
determinantValues1.insertDatetime =new Date('2010-01-01');
determinantValues1.insertUser ="sample data1";
determinantValues1.insertProcess ="sample data1";
determinantValues1.updateDatetime =new Date('2010-01-01');
determinantValues1.updateUser ="sample data1";
determinantValues1.updateProcess ="sample data1";

var determinantValues2 = new DeterminantValues();
determinantValues2.keyword ="sample data2";
determinantValues2.seqRuleId =123;
determinantValues2.searchSequence =123;
determinantValues2.determinantSequence =123;
determinantValues2.operator ="sample data2";
determinantValues2.valueFrom ="sample data2";
determinantValues2.valueThru ="sample data2";
determinantValues2.secDeterminantTable ="sample data2";
determinantValues2.secDeterminantColumn ="sample data2";
determinantValues2.secDeterminantDatatype ="sample data2";
determinantValues2.securityCode ="sample data2";
determinantValues2.insertDatetime =new Date('2010-01-01');
determinantValues2.insertUser ="sample data2";
determinantValues2.insertProcess ="sample data2";
determinantValues2.updateDatetime =new Date('2010-01-01');
determinantValues2.updateUser ="sample data2";
determinantValues2.updateProcess ="sample data2";

var determinantValues3 = new DeterminantValues();
determinantValues3.keyword ="sample data3";
determinantValues3.seqRuleId =123;
determinantValues3.searchSequence =123;
determinantValues3.determinantSequence =123;
determinantValues3.operator ="sample data3";
determinantValues3.valueFrom ="sample data3";
determinantValues3.valueThru ="sample data3";
determinantValues3.secDeterminantTable ="sample data3";
determinantValues3.secDeterminantColumn ="sample data3";
determinantValues3.secDeterminantDatatype ="sample data3";
determinantValues3.securityCode ="sample data3";
determinantValues3.insertDatetime =new Date('2010-01-01');
determinantValues3.insertUser ="sample data3";
determinantValues3.insertProcess ="sample data3";
determinantValues3.updateDatetime =new Date('2010-01-01');
determinantValues3.updateUser ="sample data3";
determinantValues3.updateProcess ="sample data3";


export const DeterminantValueses: DeterminantValues[] = [
    determinantValues1,
    determinantValues2,
    determinantValues3,
];