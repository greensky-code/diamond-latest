/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { MatrixDetermX} from "../../api-models"

var matrixDetermX1 = new MatrixDetermX();
matrixDetermX1.matrixDeterminant ="sample data1";
matrixDetermX1.matrixSeq =123;
matrixDetermX1.xAxisDescription ="sample data1";
matrixDetermX1.ageFrom =123;
matrixDetermX1.ageThru =123;
matrixDetermX1.gender ="sample data1";
matrixDetermX1.salaryFrom =123;
matrixDetermX1.salaryThru =123;
matrixDetermX1.medicareStatus ="sample data1";
matrixDetermX1.securityCode ="sample data1";
matrixDetermX1.insertDatetime =new Date('2010-01-01');
matrixDetermX1.insertUser ="sample data1";
matrixDetermX1.insertProcess ="sample data1";
matrixDetermX1.updateDatetime =new Date('2010-01-01');
matrixDetermX1.updateUser ="sample data1";
matrixDetermX1.updateProcess ="sample data1";
matrixDetermX1.rateType ="sample data1";

var matrixDetermX2 = new MatrixDetermX();
matrixDetermX2.matrixDeterminant ="sample data2";
matrixDetermX2.matrixSeq =123;
matrixDetermX2.xAxisDescription ="sample data2";
matrixDetermX2.ageFrom =123;
matrixDetermX2.ageThru =123;
matrixDetermX2.gender ="sample data2";
matrixDetermX2.salaryFrom =123;
matrixDetermX2.salaryThru =123;
matrixDetermX2.medicareStatus ="sample data2";
matrixDetermX2.securityCode ="sample data2";
matrixDetermX2.insertDatetime =new Date('2010-01-01');
matrixDetermX2.insertUser ="sample data2";
matrixDetermX2.insertProcess ="sample data2";
matrixDetermX2.updateDatetime =new Date('2010-01-01');
matrixDetermX2.updateUser ="sample data2";
matrixDetermX2.updateProcess ="sample data2";
matrixDetermX2.rateType ="sample data2";

var matrixDetermX3 = new MatrixDetermX();
matrixDetermX3.matrixDeterminant ="sample data3";
matrixDetermX3.matrixSeq =123;
matrixDetermX3.xAxisDescription ="sample data3";
matrixDetermX3.ageFrom =123;
matrixDetermX3.ageThru =123;
matrixDetermX3.gender ="sample data3";
matrixDetermX3.salaryFrom =123;
matrixDetermX3.salaryThru =123;
matrixDetermX3.medicareStatus ="sample data3";
matrixDetermX3.securityCode ="sample data3";
matrixDetermX3.insertDatetime =new Date('2010-01-01');
matrixDetermX3.insertUser ="sample data3";
matrixDetermX3.insertProcess ="sample data3";
matrixDetermX3.updateDatetime =new Date('2010-01-01');
matrixDetermX3.updateUser ="sample data3";
matrixDetermX3.updateProcess ="sample data3";
matrixDetermX3.rateType ="sample data3";


export const MatrixDetermXes: MatrixDetermX[] = [
    matrixDetermX1,
    matrixDetermX2,
    matrixDetermX3,
];