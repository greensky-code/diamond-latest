/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { SecWinDescr} from "../../api-models"

var secWinDescr1 = new SecWinDescr();
secWinDescr1.winId ="sample data1";
secWinDescr1.sdescr ="sample data1";
secWinDescr1.ldescr ="sample data1";
secWinDescr1.insertDatetime =new Date('2010-01-01');
secWinDescr1.insertUser ="sample data1";
secWinDescr1.insertProcess ="sample data1";
secWinDescr1.updateDatetime =new Date('2010-01-01');
secWinDescr1.updateUser ="sample data1";
secWinDescr1.updateProcess ="sample data1";
secWinDescr1.languageId =123;

var secWinDescr2 = new SecWinDescr();
secWinDescr2.winId ="sample data2";
secWinDescr2.sdescr ="sample data2";
secWinDescr2.ldescr ="sample data2";
secWinDescr2.insertDatetime =new Date('2010-01-01');
secWinDescr2.insertUser ="sample data2";
secWinDescr2.insertProcess ="sample data2";
secWinDescr2.updateDatetime =new Date('2010-01-01');
secWinDescr2.updateUser ="sample data2";
secWinDescr2.updateProcess ="sample data2";
secWinDescr2.languageId =123;

var secWinDescr3 = new SecWinDescr();
secWinDescr3.winId ="sample data3";
secWinDescr3.sdescr ="sample data3";
secWinDescr3.ldescr ="sample data3";
secWinDescr3.insertDatetime =new Date('2010-01-01');
secWinDescr3.insertUser ="sample data3";
secWinDescr3.insertProcess ="sample data3";
secWinDescr3.updateDatetime =new Date('2010-01-01');
secWinDescr3.updateUser ="sample data3";
secWinDescr3.updateProcess ="sample data3";
secWinDescr3.languageId =123;


export const SecWinDescrs: SecWinDescr[] = [
    secWinDescr1,
    secWinDescr2,
    secWinDescr3,
];