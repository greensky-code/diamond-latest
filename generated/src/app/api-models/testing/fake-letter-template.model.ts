/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LetterTemplate} from "../../api-models"

var letterTemplate1 = new LetterTemplate();
letterTemplate1.letterId ="sample data1";
letterTemplate1.letterIdSuffix ="sample data1";
letterTemplate1.description ="sample data1";
letterTemplate1.letterType ="sample data1";
letterTemplate1.letterReasonCode ="sample data1";
letterTemplate1.printBatch ="sample data1";
letterTemplate1.addresseeType ="sample data1";
letterTemplate1.promptCode1Name ="sample data1";
letterTemplate1.promptCode2Name ="sample data1";
letterTemplate1.promptCode3Name ="sample data1";
letterTemplate1.promptCode4Name ="sample data1";
letterTemplate1.promptCode5Name ="sample data1";
letterTemplate1.promptCode6Name ="sample data1";
letterTemplate1.promptDate1Name ="sample data1";
letterTemplate1.promptDate2Name ="sample data1";
letterTemplate1.promptText1Name ="sample data1";
letterTemplate1.promptText2Name ="sample data1";
letterTemplate1.securityCode ="sample data1";
letterTemplate1.insertDatetime =new Date('2010-01-01');
letterTemplate1.insertUser ="sample data1";
letterTemplate1.insertProcess ="sample data1";
letterTemplate1.updateDatetime =new Date('2010-01-01');
letterTemplate1.updateUser ="sample data1";
letterTemplate1.updateProcess ="sample data1";

var letterTemplate2 = new LetterTemplate();
letterTemplate2.letterId ="sample data2";
letterTemplate2.letterIdSuffix ="sample data2";
letterTemplate2.description ="sample data2";
letterTemplate2.letterType ="sample data2";
letterTemplate2.letterReasonCode ="sample data2";
letterTemplate2.printBatch ="sample data2";
letterTemplate2.addresseeType ="sample data2";
letterTemplate2.promptCode1Name ="sample data2";
letterTemplate2.promptCode2Name ="sample data2";
letterTemplate2.promptCode3Name ="sample data2";
letterTemplate2.promptCode4Name ="sample data2";
letterTemplate2.promptCode5Name ="sample data2";
letterTemplate2.promptCode6Name ="sample data2";
letterTemplate2.promptDate1Name ="sample data2";
letterTemplate2.promptDate2Name ="sample data2";
letterTemplate2.promptText1Name ="sample data2";
letterTemplate2.promptText2Name ="sample data2";
letterTemplate2.securityCode ="sample data2";
letterTemplate2.insertDatetime =new Date('2010-01-01');
letterTemplate2.insertUser ="sample data2";
letterTemplate2.insertProcess ="sample data2";
letterTemplate2.updateDatetime =new Date('2010-01-01');
letterTemplate2.updateUser ="sample data2";
letterTemplate2.updateProcess ="sample data2";

var letterTemplate3 = new LetterTemplate();
letterTemplate3.letterId ="sample data3";
letterTemplate3.letterIdSuffix ="sample data3";
letterTemplate3.description ="sample data3";
letterTemplate3.letterType ="sample data3";
letterTemplate3.letterReasonCode ="sample data3";
letterTemplate3.printBatch ="sample data3";
letterTemplate3.addresseeType ="sample data3";
letterTemplate3.promptCode1Name ="sample data3";
letterTemplate3.promptCode2Name ="sample data3";
letterTemplate3.promptCode3Name ="sample data3";
letterTemplate3.promptCode4Name ="sample data3";
letterTemplate3.promptCode5Name ="sample data3";
letterTemplate3.promptCode6Name ="sample data3";
letterTemplate3.promptDate1Name ="sample data3";
letterTemplate3.promptDate2Name ="sample data3";
letterTemplate3.promptText1Name ="sample data3";
letterTemplate3.promptText2Name ="sample data3";
letterTemplate3.securityCode ="sample data3";
letterTemplate3.insertDatetime =new Date('2010-01-01');
letterTemplate3.insertUser ="sample data3";
letterTemplate3.insertProcess ="sample data3";
letterTemplate3.updateDatetime =new Date('2010-01-01');
letterTemplate3.updateUser ="sample data3";
letterTemplate3.updateProcess ="sample data3";


export const LetterTemplates: LetterTemplate[] = [
    letterTemplate1,
    letterTemplate2,
    letterTemplate3,
];