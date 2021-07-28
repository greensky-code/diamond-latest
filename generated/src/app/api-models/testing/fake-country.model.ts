/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Country} from "../../api-models"

var country1 = new Country();
country1.country ="sample data1";
country1.securityCode ="sample data1";
country1.insertDatetime =new Date('2010-01-01');
country1.insertUser ="sample data1";
country1.insertProcess ="sample data1";
country1.updateDatetime =new Date('2010-01-01');
country1.updateUser ="sample data1";
country1.updateProcess ="sample data1";
country1.countryCode ="sample data1";

var country2 = new Country();
country2.country ="sample data2";
country2.securityCode ="sample data2";
country2.insertDatetime =new Date('2010-01-01');
country2.insertUser ="sample data2";
country2.insertProcess ="sample data2";
country2.updateDatetime =new Date('2010-01-01');
country2.updateUser ="sample data2";
country2.updateProcess ="sample data2";
country2.countryCode ="sample data2";

var country3 = new Country();
country3.country ="sample data3";
country3.securityCode ="sample data3";
country3.insertDatetime =new Date('2010-01-01');
country3.insertUser ="sample data3";
country3.insertProcess ="sample data3";
country3.updateDatetime =new Date('2010-01-01');
country3.updateUser ="sample data3";
country3.updateProcess ="sample data3";
country3.countryCode ="sample data3";


export const Countrys: Country[] = [
    country1,
    country2,
    country3,
];