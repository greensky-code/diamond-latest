/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DrgMaster} from "../../api-models"

var drgMaster1 = new DrgMaster();
drgMaster1.drgCode ="sample data1";
drgMaster1.shortDescription ="sample data1";
drgMaster1.description ="sample data1";
drgMaster1.securityCode ="sample data1";
drgMaster1.insertDatetime =new Date('2010-01-01');
drgMaster1.insertUser ="sample data1";
drgMaster1.insertProcess ="sample data1";
drgMaster1.updateDatetime =new Date('2010-01-01');
drgMaster1.updateUser ="sample data1";
drgMaster1.updateProcess ="sample data1";
drgMaster1.mdcCode ="sample data1";

var drgMaster2 = new DrgMaster();
drgMaster2.drgCode ="sample data2";
drgMaster2.shortDescription ="sample data2";
drgMaster2.description ="sample data2";
drgMaster2.securityCode ="sample data2";
drgMaster2.insertDatetime =new Date('2010-01-01');
drgMaster2.insertUser ="sample data2";
drgMaster2.insertProcess ="sample data2";
drgMaster2.updateDatetime =new Date('2010-01-01');
drgMaster2.updateUser ="sample data2";
drgMaster2.updateProcess ="sample data2";
drgMaster2.mdcCode ="sample data2";

var drgMaster3 = new DrgMaster();
drgMaster3.drgCode ="sample data3";
drgMaster3.shortDescription ="sample data3";
drgMaster3.description ="sample data3";
drgMaster3.securityCode ="sample data3";
drgMaster3.insertDatetime =new Date('2010-01-01');
drgMaster3.insertUser ="sample data3";
drgMaster3.insertProcess ="sample data3";
drgMaster3.updateDatetime =new Date('2010-01-01');
drgMaster3.updateUser ="sample data3";
drgMaster3.updateProcess ="sample data3";
drgMaster3.mdcCode ="sample data3";


export const DrgMasters: DrgMaster[] = [
    drgMaster1,
    drgMaster2,
    drgMaster3,
];