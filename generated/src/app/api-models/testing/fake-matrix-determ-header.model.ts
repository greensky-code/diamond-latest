/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MatrixDetermHeader} from "../../api-models"

var matrixDetermHeader1 = new MatrixDetermHeader();
matrixDetermHeader1.matrixDeterminant ="sample data1";
matrixDetermHeader1.matrixDescription ="sample data1";
matrixDetermHeader1.securityCode ="sample data1";
matrixDetermHeader1.insertDatetime =new Date('2010-01-01');
matrixDetermHeader1.insertUser ="sample data1";
matrixDetermHeader1.insertProcess ="sample data1";
matrixDetermHeader1.updateDatetime =new Date('2010-01-01');
matrixDetermHeader1.updateUser ="sample data1";
matrixDetermHeader1.updateProcess ="sample data1";

var matrixDetermHeader2 = new MatrixDetermHeader();
matrixDetermHeader2.matrixDeterminant ="sample data2";
matrixDetermHeader2.matrixDescription ="sample data2";
matrixDetermHeader2.securityCode ="sample data2";
matrixDetermHeader2.insertDatetime =new Date('2010-01-01');
matrixDetermHeader2.insertUser ="sample data2";
matrixDetermHeader2.insertProcess ="sample data2";
matrixDetermHeader2.updateDatetime =new Date('2010-01-01');
matrixDetermHeader2.updateUser ="sample data2";
matrixDetermHeader2.updateProcess ="sample data2";

var matrixDetermHeader3 = new MatrixDetermHeader();
matrixDetermHeader3.matrixDeterminant ="sample data3";
matrixDetermHeader3.matrixDescription ="sample data3";
matrixDetermHeader3.securityCode ="sample data3";
matrixDetermHeader3.insertDatetime =new Date('2010-01-01');
matrixDetermHeader3.insertUser ="sample data3";
matrixDetermHeader3.insertProcess ="sample data3";
matrixDetermHeader3.updateDatetime =new Date('2010-01-01');
matrixDetermHeader3.updateUser ="sample data3";
matrixDetermHeader3.updateProcess ="sample data3";


export const MatrixDetermHeaders: MatrixDetermHeader[] = [
    matrixDetermHeader1,
    matrixDetermHeader2,
    matrixDetermHeader3,
];