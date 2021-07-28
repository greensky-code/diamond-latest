/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { RegionMaster} from "../../api-models"

var regionMaster1 = new RegionMaster();
regionMaster1.regionType ="sample data1";
regionMaster1.regionCode ="sample data1";
regionMaster1.description ="sample data1";
regionMaster1.securityCode ="sample data1";
regionMaster1.insertDatetime =new Date('2010-01-01');
regionMaster1.insertUser ="sample data1";
regionMaster1.insertProcess ="sample data1";
regionMaster1.updateDatetime =new Date('2010-01-01');
regionMaster1.updateUser ="sample data1";
regionMaster1.updateProcess ="sample data1";

var regionMaster2 = new RegionMaster();
regionMaster2.regionType ="sample data2";
regionMaster2.regionCode ="sample data2";
regionMaster2.description ="sample data2";
regionMaster2.securityCode ="sample data2";
regionMaster2.insertDatetime =new Date('2010-01-01');
regionMaster2.insertUser ="sample data2";
regionMaster2.insertProcess ="sample data2";
regionMaster2.updateDatetime =new Date('2010-01-01');
regionMaster2.updateUser ="sample data2";
regionMaster2.updateProcess ="sample data2";

var regionMaster3 = new RegionMaster();
regionMaster3.regionType ="sample data3";
regionMaster3.regionCode ="sample data3";
regionMaster3.description ="sample data3";
regionMaster3.securityCode ="sample data3";
regionMaster3.insertDatetime =new Date('2010-01-01');
regionMaster3.insertUser ="sample data3";
regionMaster3.insertProcess ="sample data3";
regionMaster3.updateDatetime =new Date('2010-01-01');
regionMaster3.updateUser ="sample data3";
regionMaster3.updateProcess ="sample data3";


export const RegionMasters: RegionMaster[] = [
    regionMaster1,
    regionMaster2,
    regionMaster3,
];