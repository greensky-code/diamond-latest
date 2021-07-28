/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvSpecialty} from "../../api-models"

var provSpecialty1 = new ProvSpecialty();
provSpecialty1.seqProvId =123;
provSpecialty1.specialtyType ="sample data1";
provSpecialty1.primarySpecialty ="sample data1";
provSpecialty1.boardStatus ="sample data1";
provSpecialty1.directoryInclude ="sample data1";
provSpecialty1.acceptsPatients ="sample data1";
provSpecialty1.securityCode ="sample data1";
provSpecialty1.insertDatetime =new Date('2010-01-01');
provSpecialty1.insertUser ="sample data1";
provSpecialty1.insertProcess ="sample data1";
provSpecialty1.updateDatetime =new Date('2010-01-01');
provSpecialty1.updateUser ="sample data1";
provSpecialty1.updateProcess ="sample data1";

var provSpecialty2 = new ProvSpecialty();
provSpecialty2.seqProvId =123;
provSpecialty2.specialtyType ="sample data2";
provSpecialty2.primarySpecialty ="sample data2";
provSpecialty2.boardStatus ="sample data2";
provSpecialty2.directoryInclude ="sample data2";
provSpecialty2.acceptsPatients ="sample data2";
provSpecialty2.securityCode ="sample data2";
provSpecialty2.insertDatetime =new Date('2010-01-01');
provSpecialty2.insertUser ="sample data2";
provSpecialty2.insertProcess ="sample data2";
provSpecialty2.updateDatetime =new Date('2010-01-01');
provSpecialty2.updateUser ="sample data2";
provSpecialty2.updateProcess ="sample data2";

var provSpecialty3 = new ProvSpecialty();
provSpecialty3.seqProvId =123;
provSpecialty3.specialtyType ="sample data3";
provSpecialty3.primarySpecialty ="sample data3";
provSpecialty3.boardStatus ="sample data3";
provSpecialty3.directoryInclude ="sample data3";
provSpecialty3.acceptsPatients ="sample data3";
provSpecialty3.securityCode ="sample data3";
provSpecialty3.insertDatetime =new Date('2010-01-01');
provSpecialty3.insertUser ="sample data3";
provSpecialty3.insertProcess ="sample data3";
provSpecialty3.updateDatetime =new Date('2010-01-01');
provSpecialty3.updateUser ="sample data3";
provSpecialty3.updateProcess ="sample data3";


export const ProvSpecialtys: ProvSpecialty[] = [
    provSpecialty1,
    provSpecialty2,
    provSpecialty3,
];