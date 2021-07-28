/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CiebCountrySubdivision} from "../../api-models"

var ciebCountrySubdivision1 = new CiebCountrySubdivision();
ciebCountrySubdivision1.countryCode2 ="sample data1";
ciebCountrySubdivision1.countrySubDivCode ="sample data1";
ciebCountrySubdivision1.regionalDivision ="sample data1";
ciebCountrySubdivision1.subDivCategory ="sample data1";
ciebCountrySubdivision1.subDivisionName ="sample data1";
ciebCountrySubdivision1.insertDatetime =new Date('2010-01-01');
ciebCountrySubdivision1.insertUser ="sample data1";
ciebCountrySubdivision1.insertProcess ="sample data1";
ciebCountrySubdivision1.updateDatetime =new Date('2010-01-01');
ciebCountrySubdivision1.updateUser ="sample data1";
ciebCountrySubdivision1.updateProcess ="sample data1";

var ciebCountrySubdivision2 = new CiebCountrySubdivision();
ciebCountrySubdivision2.countryCode2 ="sample data2";
ciebCountrySubdivision2.countrySubDivCode ="sample data2";
ciebCountrySubdivision2.regionalDivision ="sample data2";
ciebCountrySubdivision2.subDivCategory ="sample data2";
ciebCountrySubdivision2.subDivisionName ="sample data2";
ciebCountrySubdivision2.insertDatetime =new Date('2010-01-01');
ciebCountrySubdivision2.insertUser ="sample data2";
ciebCountrySubdivision2.insertProcess ="sample data2";
ciebCountrySubdivision2.updateDatetime =new Date('2010-01-01');
ciebCountrySubdivision2.updateUser ="sample data2";
ciebCountrySubdivision2.updateProcess ="sample data2";

var ciebCountrySubdivision3 = new CiebCountrySubdivision();
ciebCountrySubdivision3.countryCode2 ="sample data3";
ciebCountrySubdivision3.countrySubDivCode ="sample data3";
ciebCountrySubdivision3.regionalDivision ="sample data3";
ciebCountrySubdivision3.subDivCategory ="sample data3";
ciebCountrySubdivision3.subDivisionName ="sample data3";
ciebCountrySubdivision3.insertDatetime =new Date('2010-01-01');
ciebCountrySubdivision3.insertUser ="sample data3";
ciebCountrySubdivision3.insertProcess ="sample data3";
ciebCountrySubdivision3.updateDatetime =new Date('2010-01-01');
ciebCountrySubdivision3.updateUser ="sample data3";
ciebCountrySubdivision3.updateProcess ="sample data3";


export const CiebCountrySubdivisions: CiebCountrySubdivision[] = [
    ciebCountrySubdivision1,
    ciebCountrySubdivision2,
    ciebCountrySubdivision3,
];