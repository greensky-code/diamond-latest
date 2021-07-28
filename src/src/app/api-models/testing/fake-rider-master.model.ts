/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { RiderMaster} from "../../api-models"

var riderMaster1 = new RiderMaster();
riderMaster1.riderCode ="sample data1";
riderMaster1.description ="sample data1";
riderMaster1.securityCode ="sample data1";
riderMaster1.insertDatetime =new Date('2010-01-01');
riderMaster1.insertUser ="sample data1";
riderMaster1.insertProcess ="sample data1";
riderMaster1.updateDatetime =new Date('2010-01-01');
riderMaster1.updateUser ="sample data1";
riderMaster1.updateProcess ="sample data1";

var riderMaster2 = new RiderMaster();
riderMaster2.riderCode ="sample data2";
riderMaster2.description ="sample data2";
riderMaster2.securityCode ="sample data2";
riderMaster2.insertDatetime =new Date('2010-01-01');
riderMaster2.insertUser ="sample data2";
riderMaster2.insertProcess ="sample data2";
riderMaster2.updateDatetime =new Date('2010-01-01');
riderMaster2.updateUser ="sample data2";
riderMaster2.updateProcess ="sample data2";

var riderMaster3 = new RiderMaster();
riderMaster3.riderCode ="sample data3";
riderMaster3.description ="sample data3";
riderMaster3.securityCode ="sample data3";
riderMaster3.insertDatetime =new Date('2010-01-01');
riderMaster3.insertUser ="sample data3";
riderMaster3.insertProcess ="sample data3";
riderMaster3.updateDatetime =new Date('2010-01-01');
riderMaster3.updateUser ="sample data3";
riderMaster3.updateProcess ="sample data3";


export const RiderMasters: RiderMaster[] = [
    riderMaster1,
    riderMaster2,
    riderMaster3,
];