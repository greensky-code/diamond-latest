/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ModifierCodeMaster} from "../../api-models"

var modifierCodeMaster1 = new ModifierCodeMaster();
modifierCodeMaster1.modifierCode ="sample data1";
modifierCodeMaster1.description ="sample data1";
modifierCodeMaster1.anesthesiaInd ="sample data1";
modifierCodeMaster1.securityCode ="sample data1";
modifierCodeMaster1.insertDatetime =new Date('2010-01-01');
modifierCodeMaster1.insertUser ="sample data1";
modifierCodeMaster1.insertProcess ="sample data1";
modifierCodeMaster1.updateDatetime =new Date('2010-01-01');
modifierCodeMaster1.updateUser ="sample data1";
modifierCodeMaster1.updateProcess ="sample data1";
modifierCodeMaster1.informationalFlag ="sample data1";
modifierCodeMaster1.userDefined1 ="sample data1";
modifierCodeMaster1.userDefined2 ="sample data1";
modifierCodeMaster1.userDefined3 ="sample data1";
modifierCodeMaster1.userDefined4 ="sample data1";
modifierCodeMaster1.effectiveDate =new Date('2010-01-01');
modifierCodeMaster1.termDate =new Date('2010-01-01');

var modifierCodeMaster2 = new ModifierCodeMaster();
modifierCodeMaster2.modifierCode ="sample data2";
modifierCodeMaster2.description ="sample data2";
modifierCodeMaster2.anesthesiaInd ="sample data2";
modifierCodeMaster2.securityCode ="sample data2";
modifierCodeMaster2.insertDatetime =new Date('2010-01-01');
modifierCodeMaster2.insertUser ="sample data2";
modifierCodeMaster2.insertProcess ="sample data2";
modifierCodeMaster2.updateDatetime =new Date('2010-01-01');
modifierCodeMaster2.updateUser ="sample data2";
modifierCodeMaster2.updateProcess ="sample data2";
modifierCodeMaster2.informationalFlag ="sample data2";
modifierCodeMaster2.userDefined1 ="sample data2";
modifierCodeMaster2.userDefined2 ="sample data2";
modifierCodeMaster2.userDefined3 ="sample data2";
modifierCodeMaster2.userDefined4 ="sample data2";
modifierCodeMaster2.effectiveDate =new Date('2010-01-01');
modifierCodeMaster2.termDate =new Date('2010-01-01');

var modifierCodeMaster3 = new ModifierCodeMaster();
modifierCodeMaster3.modifierCode ="sample data3";
modifierCodeMaster3.description ="sample data3";
modifierCodeMaster3.anesthesiaInd ="sample data3";
modifierCodeMaster3.securityCode ="sample data3";
modifierCodeMaster3.insertDatetime =new Date('2010-01-01');
modifierCodeMaster3.insertUser ="sample data3";
modifierCodeMaster3.insertProcess ="sample data3";
modifierCodeMaster3.updateDatetime =new Date('2010-01-01');
modifierCodeMaster3.updateUser ="sample data3";
modifierCodeMaster3.updateProcess ="sample data3";
modifierCodeMaster3.informationalFlag ="sample data3";
modifierCodeMaster3.userDefined1 ="sample data3";
modifierCodeMaster3.userDefined2 ="sample data3";
modifierCodeMaster3.userDefined3 ="sample data3";
modifierCodeMaster3.userDefined4 ="sample data3";
modifierCodeMaster3.effectiveDate =new Date('2010-01-01');
modifierCodeMaster3.termDate =new Date('2010-01-01');


export const ModifierCodeMasters: ModifierCodeMaster[] = [
    modifierCodeMaster1,
    modifierCodeMaster2,
    modifierCodeMaster3,
];