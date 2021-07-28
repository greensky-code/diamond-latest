/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MatrixDetermY} from "../../api-models"

var matrixDetermY1 = new MatrixDetermY();
matrixDetermY1.matrixDeterminant ="sample data1";
matrixDetermY1.matrixSeq =123;
matrixDetermY1.yAxisDescription ="sample data1";
matrixDetermY1.familySizeFrom =123;
matrixDetermY1.familySizeThru =123;
matrixDetermY1.ageFrom =123;
matrixDetermY1.ageThru =123;
matrixDetermY1.gender ="sample data1";
matrixDetermY1.spouseFlag ="sample data1";
matrixDetermY1.securityCode ="sample data1";
matrixDetermY1.insertDatetime =new Date('2010-01-01');
matrixDetermY1.insertUser ="sample data1";
matrixDetermY1.insertProcess ="sample data1";
matrixDetermY1.updateDatetime =new Date('2010-01-01');
matrixDetermY1.updateUser ="sample data1";
matrixDetermY1.updateProcess ="sample data1";

var matrixDetermY2 = new MatrixDetermY();
matrixDetermY2.matrixDeterminant ="sample data2";
matrixDetermY2.matrixSeq =123;
matrixDetermY2.yAxisDescription ="sample data2";
matrixDetermY2.familySizeFrom =123;
matrixDetermY2.familySizeThru =123;
matrixDetermY2.ageFrom =123;
matrixDetermY2.ageThru =123;
matrixDetermY2.gender ="sample data2";
matrixDetermY2.spouseFlag ="sample data2";
matrixDetermY2.securityCode ="sample data2";
matrixDetermY2.insertDatetime =new Date('2010-01-01');
matrixDetermY2.insertUser ="sample data2";
matrixDetermY2.insertProcess ="sample data2";
matrixDetermY2.updateDatetime =new Date('2010-01-01');
matrixDetermY2.updateUser ="sample data2";
matrixDetermY2.updateProcess ="sample data2";

var matrixDetermY3 = new MatrixDetermY();
matrixDetermY3.matrixDeterminant ="sample data3";
matrixDetermY3.matrixSeq =123;
matrixDetermY3.yAxisDescription ="sample data3";
matrixDetermY3.familySizeFrom =123;
matrixDetermY3.familySizeThru =123;
matrixDetermY3.ageFrom =123;
matrixDetermY3.ageThru =123;
matrixDetermY3.gender ="sample data3";
matrixDetermY3.spouseFlag ="sample data3";
matrixDetermY3.securityCode ="sample data3";
matrixDetermY3.insertDatetime =new Date('2010-01-01');
matrixDetermY3.insertUser ="sample data3";
matrixDetermY3.insertProcess ="sample data3";
matrixDetermY3.updateDatetime =new Date('2010-01-01');
matrixDetermY3.updateUser ="sample data3";
matrixDetermY3.updateProcess ="sample data3";


export const MatrixDetermYs: MatrixDetermY[] = [
    matrixDetermY1,
    matrixDetermY2,
    matrixDetermY3,
];