/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LetterHistory} from "../../api-models"

var letterHistory1 = new LetterHistory();
letterHistory1.seqLetterHist =123;
letterHistory1.letterId ="sample data1";
letterHistory1.letterIdSuffix ="sample data1";
letterHistory1.letterType ="sample data1";
letterHistory1.addresseeType ="sample data1";
letterHistory1.seqMembId =123;
letterHistory1.seqGroupId =123;
letterHistory1.seqProvId =123;
letterHistory1.seqVendId =123;
letterHistory1.printStatus ="sample data1";
letterHistory1.printDate =new Date('2010-01-01');
letterHistory1.printBatch ="sample data1";
letterHistory1.insertDatetime =new Date('2010-01-01');
letterHistory1.insertUser ="sample data1";
letterHistory1.insertProcess ="sample data1";
letterHistory1.seqLtprtId =123;
letterHistory1.addresseeId ="sample data1";
letterHistory1.addresseeName ="sample data1";
letterHistory1.addresseeZipCode ="sample data1";

var letterHistory2 = new LetterHistory();
letterHistory2.seqLetterHist =123;
letterHistory2.letterId ="sample data2";
letterHistory2.letterIdSuffix ="sample data2";
letterHistory2.letterType ="sample data2";
letterHistory2.addresseeType ="sample data2";
letterHistory2.seqMembId =123;
letterHistory2.seqGroupId =123;
letterHistory2.seqProvId =123;
letterHistory2.seqVendId =123;
letterHistory2.printStatus ="sample data2";
letterHistory2.printDate =new Date('2010-01-01');
letterHistory2.printBatch ="sample data2";
letterHistory2.insertDatetime =new Date('2010-01-01');
letterHistory2.insertUser ="sample data2";
letterHistory2.insertProcess ="sample data2";
letterHistory2.seqLtprtId =123;
letterHistory2.addresseeId ="sample data2";
letterHistory2.addresseeName ="sample data2";
letterHistory2.addresseeZipCode ="sample data2";

var letterHistory3 = new LetterHistory();
letterHistory3.seqLetterHist =123;
letterHistory3.letterId ="sample data3";
letterHistory3.letterIdSuffix ="sample data3";
letterHistory3.letterType ="sample data3";
letterHistory3.addresseeType ="sample data3";
letterHistory3.seqMembId =123;
letterHistory3.seqGroupId =123;
letterHistory3.seqProvId =123;
letterHistory3.seqVendId =123;
letterHistory3.printStatus ="sample data3";
letterHistory3.printDate =new Date('2010-01-01');
letterHistory3.printBatch ="sample data3";
letterHistory3.insertDatetime =new Date('2010-01-01');
letterHistory3.insertUser ="sample data3";
letterHistory3.insertProcess ="sample data3";
letterHistory3.seqLtprtId =123;
letterHistory3.addresseeId ="sample data3";
letterHistory3.addresseeName ="sample data3";
letterHistory3.addresseeZipCode ="sample data3";


export const LetterHistorys: LetterHistory[] = [
    letterHistory1,
    letterHistory2,
    letterHistory3,
];