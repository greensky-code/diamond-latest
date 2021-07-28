/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PanelMaster} from "../../api-models"

var panelMaster1 = new PanelMaster();
panelMaster1.panelId ="sample data1";
panelMaster1.description ="sample data1";
panelMaster1.dfltProvContReq ="sample data1";
panelMaster1.securityCode ="sample data1";
panelMaster1.insertDatetime =new Date('2010-01-01');
panelMaster1.insertUser ="sample data1";
panelMaster1.insertProcess ="sample data1";
panelMaster1.updateDatetime =new Date('2010-01-01');
panelMaster1.updateUser ="sample data1";
panelMaster1.updateProcess ="sample data1";

var panelMaster2 = new PanelMaster();
panelMaster2.panelId ="sample data2";
panelMaster2.description ="sample data2";
panelMaster2.dfltProvContReq ="sample data2";
panelMaster2.securityCode ="sample data2";
panelMaster2.insertDatetime =new Date('2010-01-01');
panelMaster2.insertUser ="sample data2";
panelMaster2.insertProcess ="sample data2";
panelMaster2.updateDatetime =new Date('2010-01-01');
panelMaster2.updateUser ="sample data2";
panelMaster2.updateProcess ="sample data2";

var panelMaster3 = new PanelMaster();
panelMaster3.panelId ="sample data3";
panelMaster3.description ="sample data3";
panelMaster3.dfltProvContReq ="sample data3";
panelMaster3.securityCode ="sample data3";
panelMaster3.insertDatetime =new Date('2010-01-01');
panelMaster3.insertUser ="sample data3";
panelMaster3.insertProcess ="sample data3";
panelMaster3.updateDatetime =new Date('2010-01-01');
panelMaster3.updateUser ="sample data3";
panelMaster3.updateProcess ="sample data3";


export const PanelMasters: PanelMaster[] = [
    panelMaster1,
    panelMaster2,
    panelMaster3,
];