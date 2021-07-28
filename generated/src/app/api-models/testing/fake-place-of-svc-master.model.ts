/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PlaceOfSvcMaster} from "../../api-models"

var placeOfSvcMaster1 = new PlaceOfSvcMaster();
placeOfSvcMaster1.placeOfSvcCode ="sample data1";
placeOfSvcMaster1.description ="sample data1";
placeOfSvcMaster1.securityCode ="sample data1";
placeOfSvcMaster1.insertUser ="sample data1";
placeOfSvcMaster1.insertDatetime =new Date('2010-01-01');
placeOfSvcMaster1.insertProcess ="sample data1";
placeOfSvcMaster1.updateUser ="sample data1";
placeOfSvcMaster1.updateDatetime =new Date('2010-01-01');
placeOfSvcMaster1.updateProcess ="sample data1";

var placeOfSvcMaster2 = new PlaceOfSvcMaster();
placeOfSvcMaster2.placeOfSvcCode ="sample data2";
placeOfSvcMaster2.description ="sample data2";
placeOfSvcMaster2.securityCode ="sample data2";
placeOfSvcMaster2.insertUser ="sample data2";
placeOfSvcMaster2.insertDatetime =new Date('2010-01-01');
placeOfSvcMaster2.insertProcess ="sample data2";
placeOfSvcMaster2.updateUser ="sample data2";
placeOfSvcMaster2.updateDatetime =new Date('2010-01-01');
placeOfSvcMaster2.updateProcess ="sample data2";

var placeOfSvcMaster3 = new PlaceOfSvcMaster();
placeOfSvcMaster3.placeOfSvcCode ="sample data3";
placeOfSvcMaster3.description ="sample data3";
placeOfSvcMaster3.securityCode ="sample data3";
placeOfSvcMaster3.insertUser ="sample data3";
placeOfSvcMaster3.insertDatetime =new Date('2010-01-01');
placeOfSvcMaster3.insertProcess ="sample data3";
placeOfSvcMaster3.updateUser ="sample data3";
placeOfSvcMaster3.updateDatetime =new Date('2010-01-01');
placeOfSvcMaster3.updateProcess ="sample data3";


export const PlacesOfSvcMaster: PlaceOfSvcMaster[] = [
    placeOfSvcMaster1,
    placeOfSvcMaster2,
    placeOfSvcMaster3,
];