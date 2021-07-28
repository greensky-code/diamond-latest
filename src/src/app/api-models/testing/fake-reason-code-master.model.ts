/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ReasonCodeMaster} from "../../api-models"

var reasonCodeMaster1 = new ReasonCodeMaster();
reasonCodeMaster1.rncCode ="sample data1";
reasonCodeMaster1.descInd ="sample data1";
reasonCodeMaster1.eobCalcOption ="sample data1";
reasonCodeMaster1.calcDescription ="sample data1";
reasonCodeMaster1.description2 ="sample data1";
reasonCodeMaster1.userDate2 =new Date('2010-01-01');
reasonCodeMaster1.userDate1 =new Date('2010-01-01');
reasonCodeMaster1.userDefined2 ="sample data1";
reasonCodeMaster1.userDefined1 ="sample data1";
reasonCodeMaster1.uncleanFlag ="sample data1";
reasonCodeMaster1.updateProcess ="sample data1";
reasonCodeMaster1.updateUser ="sample data1";
reasonCodeMaster1.updateDatetime =new Date('2010-01-01');
reasonCodeMaster1.insertProcess ="sample data1";
reasonCodeMaster1.insertUser ="sample data1";
reasonCodeMaster1.insertDatetime =new Date('2010-01-01');
reasonCodeMaster1.securityCode ="sample data1";
reasonCodeMaster1.autoAuditLocCod ="sample data1";
reasonCodeMaster1.description ="sample data1";
reasonCodeMaster1.reasonCodeType ="sample data1";
reasonCodeMaster1.reasonCode ="sample data1";

var reasonCodeMaster2 = new ReasonCodeMaster();
reasonCodeMaster2.rncCode ="sample data2";
reasonCodeMaster2.descInd ="sample data2";
reasonCodeMaster2.eobCalcOption ="sample data2";
reasonCodeMaster2.calcDescription ="sample data2";
reasonCodeMaster2.description2 ="sample data2";
reasonCodeMaster2.userDate2 =new Date('2010-01-01');
reasonCodeMaster2.userDate1 =new Date('2010-01-01');
reasonCodeMaster2.userDefined2 ="sample data2";
reasonCodeMaster2.userDefined1 ="sample data2";
reasonCodeMaster2.uncleanFlag ="sample data2";
reasonCodeMaster2.updateProcess ="sample data2";
reasonCodeMaster2.updateUser ="sample data2";
reasonCodeMaster2.updateDatetime =new Date('2010-01-01');
reasonCodeMaster2.insertProcess ="sample data2";
reasonCodeMaster2.insertUser ="sample data2";
reasonCodeMaster2.insertDatetime =new Date('2010-01-01');
reasonCodeMaster2.securityCode ="sample data2";
reasonCodeMaster2.autoAuditLocCod ="sample data2";
reasonCodeMaster2.description ="sample data2";
reasonCodeMaster2.reasonCodeType ="sample data2";
reasonCodeMaster2.reasonCode ="sample data2";

var reasonCodeMaster3 = new ReasonCodeMaster();
reasonCodeMaster3.rncCode ="sample data3";
reasonCodeMaster3.descInd ="sample data3";
reasonCodeMaster3.eobCalcOption ="sample data3";
reasonCodeMaster3.calcDescription ="sample data3";
reasonCodeMaster3.description2 ="sample data3";
reasonCodeMaster3.userDate2 =new Date('2010-01-01');
reasonCodeMaster3.userDate1 =new Date('2010-01-01');
reasonCodeMaster3.userDefined2 ="sample data3";
reasonCodeMaster3.userDefined1 ="sample data3";
reasonCodeMaster3.uncleanFlag ="sample data3";
reasonCodeMaster3.updateProcess ="sample data3";
reasonCodeMaster3.updateUser ="sample data3";
reasonCodeMaster3.updateDatetime =new Date('2010-01-01');
reasonCodeMaster3.insertProcess ="sample data3";
reasonCodeMaster3.insertUser ="sample data3";
reasonCodeMaster3.insertDatetime =new Date('2010-01-01');
reasonCodeMaster3.securityCode ="sample data3";
reasonCodeMaster3.autoAuditLocCod ="sample data3";
reasonCodeMaster3.description ="sample data3";
reasonCodeMaster3.reasonCodeType ="sample data3";
reasonCodeMaster3.reasonCode ="sample data3";


export const ReasonCodeMasters: ReasonCodeMaster[] = [
    reasonCodeMaster1,
    reasonCodeMaster2,
    reasonCodeMaster3,
];