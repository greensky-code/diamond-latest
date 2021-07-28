/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { IdCardSetup} from "../../api-models"

var idCardSetup1 = new IdCardSetup();
idCardSetup1.seqIdprtId =123;
idCardSetup1.jobId ="sample data1";
idCardSetup1.requestUser ="sample data1";
idCardSetup1.requestDate =new Date('2010-01-01');
idCardSetup1.requestType ="sample data1";
idCardSetup1.action ="sample data1";
idCardSetup1.seqNarrativeId =123;
idCardSetup1.idCardTemplate ="sample data1";
idCardSetup1.effectiveDateFrom =new Date('2010-01-01');
idCardSetup1.effectiveDateThru =new Date('2010-01-01');
idCardSetup1.orderType ="sample data1";
idCardSetup1.reprintRequest ="sample data1";
idCardSetup1.reprintDate =new Date('2010-01-01');
idCardSetup1.status ="sample data1";
idCardSetup1.comments ="sample data1";
idCardSetup1.template ="sample data1";
idCardSetup1.securityCode ="sample data1";
idCardSetup1.insertDatetime =new Date('2010-01-01');
idCardSetup1.insertUser ="sample data1";
idCardSetup1.insertProcess ="sample data1";
idCardSetup1.updateDatetime =new Date('2010-01-01');
idCardSetup1.updateUser ="sample data1";
idCardSetup1.updateProcess ="sample data1";
idCardSetup1.inProcess ="sample data1";

var idCardSetup2 = new IdCardSetup();
idCardSetup2.seqIdprtId =123;
idCardSetup2.jobId ="sample data2";
idCardSetup2.requestUser ="sample data2";
idCardSetup2.requestDate =new Date('2010-01-01');
idCardSetup2.requestType ="sample data2";
idCardSetup2.action ="sample data2";
idCardSetup2.seqNarrativeId =123;
idCardSetup2.idCardTemplate ="sample data2";
idCardSetup2.effectiveDateFrom =new Date('2010-01-01');
idCardSetup2.effectiveDateThru =new Date('2010-01-01');
idCardSetup2.orderType ="sample data2";
idCardSetup2.reprintRequest ="sample data2";
idCardSetup2.reprintDate =new Date('2010-01-01');
idCardSetup2.status ="sample data2";
idCardSetup2.comments ="sample data2";
idCardSetup2.template ="sample data2";
idCardSetup2.securityCode ="sample data2";
idCardSetup2.insertDatetime =new Date('2010-01-01');
idCardSetup2.insertUser ="sample data2";
idCardSetup2.insertProcess ="sample data2";
idCardSetup2.updateDatetime =new Date('2010-01-01');
idCardSetup2.updateUser ="sample data2";
idCardSetup2.updateProcess ="sample data2";
idCardSetup2.inProcess ="sample data2";

var idCardSetup3 = new IdCardSetup();
idCardSetup3.seqIdprtId =123;
idCardSetup3.jobId ="sample data3";
idCardSetup3.requestUser ="sample data3";
idCardSetup3.requestDate =new Date('2010-01-01');
idCardSetup3.requestType ="sample data3";
idCardSetup3.action ="sample data3";
idCardSetup3.seqNarrativeId =123;
idCardSetup3.idCardTemplate ="sample data3";
idCardSetup3.effectiveDateFrom =new Date('2010-01-01');
idCardSetup3.effectiveDateThru =new Date('2010-01-01');
idCardSetup3.orderType ="sample data3";
idCardSetup3.reprintRequest ="sample data3";
idCardSetup3.reprintDate =new Date('2010-01-01');
idCardSetup3.status ="sample data3";
idCardSetup3.comments ="sample data3";
idCardSetup3.template ="sample data3";
idCardSetup3.securityCode ="sample data3";
idCardSetup3.insertDatetime =new Date('2010-01-01');
idCardSetup3.insertUser ="sample data3";
idCardSetup3.insertProcess ="sample data3";
idCardSetup3.updateDatetime =new Date('2010-01-01');
idCardSetup3.updateUser ="sample data3";
idCardSetup3.updateProcess ="sample data3";
idCardSetup3.inProcess ="sample data3";


export const IdCardSetups: IdCardSetup[] = [
    idCardSetup1,
    idCardSetup2,
    idCardSetup3,
];