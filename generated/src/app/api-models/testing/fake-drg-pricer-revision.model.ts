/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { DrgPricerRevision} from "../../api-models"

var drgPricerRevision1 = new DrgPricerRevision();
drgPricerRevision1.drgPricerId ="sample data1";
drgPricerRevision1.version ="sample data1";
drgPricerRevision1.revisionLevel ="sample data1";
drgPricerRevision1.description ="sample data1";
drgPricerRevision1.effectiveDate =new Date('2010-01-01');
drgPricerRevision1.termDate =new Date('2010-01-01');
drgPricerRevision1.securityCode ="sample data1";
drgPricerRevision1.insertDatetime =new Date('2010-01-01');
drgPricerRevision1.insertUser ="sample data1";
drgPricerRevision1.insertProcess ="sample data1";
drgPricerRevision1.updateDatetime =new Date('2010-01-01');
drgPricerRevision1.updateUser ="sample data1";
drgPricerRevision1.updateProcess ="sample data1";

var drgPricerRevision2 = new DrgPricerRevision();
drgPricerRevision2.drgPricerId ="sample data2";
drgPricerRevision2.version ="sample data2";
drgPricerRevision2.revisionLevel ="sample data2";
drgPricerRevision2.description ="sample data2";
drgPricerRevision2.effectiveDate =new Date('2010-01-01');
drgPricerRevision2.termDate =new Date('2010-01-01');
drgPricerRevision2.securityCode ="sample data2";
drgPricerRevision2.insertDatetime =new Date('2010-01-01');
drgPricerRevision2.insertUser ="sample data2";
drgPricerRevision2.insertProcess ="sample data2";
drgPricerRevision2.updateDatetime =new Date('2010-01-01');
drgPricerRevision2.updateUser ="sample data2";
drgPricerRevision2.updateProcess ="sample data2";

var drgPricerRevision3 = new DrgPricerRevision();
drgPricerRevision3.drgPricerId ="sample data3";
drgPricerRevision3.version ="sample data3";
drgPricerRevision3.revisionLevel ="sample data3";
drgPricerRevision3.description ="sample data3";
drgPricerRevision3.effectiveDate =new Date('2010-01-01');
drgPricerRevision3.termDate =new Date('2010-01-01');
drgPricerRevision3.securityCode ="sample data3";
drgPricerRevision3.insertDatetime =new Date('2010-01-01');
drgPricerRevision3.insertUser ="sample data3";
drgPricerRevision3.insertProcess ="sample data3";
drgPricerRevision3.updateDatetime =new Date('2010-01-01');
drgPricerRevision3.updateUser ="sample data3";
drgPricerRevision3.updateProcess ="sample data3";


export const DrgPricerRevisions: DrgPricerRevision[] = [
    drgPricerRevision1,
    drgPricerRevision2,
    drgPricerRevision3,
];