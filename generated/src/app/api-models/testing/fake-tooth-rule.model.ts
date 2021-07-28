/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ToothRule} from "../../api-models"

var toothRule1 = new ToothRule();
toothRule1.seqToothRuleId =123;
toothRule1.toothRuleId ="sample data1";
toothRule1.toothNumber ="sample data1";
toothRule1.procedureCode ="sample data1";
toothRule1.description ="sample data1";
toothRule1.effDate =new Date('2010-01-01');
toothRule1.termDate =new Date('2010-01-01');
toothRule1.termReason ="sample data1";
toothRule1.fromAge =123;
toothRule1.toAge =123;
toothRule1.userDefined1 ="sample data1";
toothRule1.userDate1 =new Date('2010-01-01');
toothRule1.userDefined2 ="sample data1";
toothRule1.userDate2 =new Date('2010-01-01');
toothRule1.allSurfaceInd ="sample data1";
toothRule1.allArchInd ="sample data1";
toothRule1.allQuadInd ="sample data1";
toothRule1.allOralInd ="sample data1";
toothRule1.securityCode ="sample data1";
toothRule1.insertDatetime =new Date('2010-01-01');
toothRule1.insertUser ="sample data1";
toothRule1.insertProcess ="sample data1";
toothRule1.updateDatetime =new Date('2010-01-01');
toothRule1.updateUser ="sample data1";
toothRule1.updateProcess ="sample data1";

var toothRule2 = new ToothRule();
toothRule2.seqToothRuleId =123;
toothRule2.toothRuleId ="sample data2";
toothRule2.toothNumber ="sample data2";
toothRule2.procedureCode ="sample data2";
toothRule2.description ="sample data2";
toothRule2.effDate =new Date('2010-01-01');
toothRule2.termDate =new Date('2010-01-01');
toothRule2.termReason ="sample data2";
toothRule2.fromAge =123;
toothRule2.toAge =123;
toothRule2.userDefined1 ="sample data2";
toothRule2.userDate1 =new Date('2010-01-01');
toothRule2.userDefined2 ="sample data2";
toothRule2.userDate2 =new Date('2010-01-01');
toothRule2.allSurfaceInd ="sample data2";
toothRule2.allArchInd ="sample data2";
toothRule2.allQuadInd ="sample data2";
toothRule2.allOralInd ="sample data2";
toothRule2.securityCode ="sample data2";
toothRule2.insertDatetime =new Date('2010-01-01');
toothRule2.insertUser ="sample data2";
toothRule2.insertProcess ="sample data2";
toothRule2.updateDatetime =new Date('2010-01-01');
toothRule2.updateUser ="sample data2";
toothRule2.updateProcess ="sample data2";

var toothRule3 = new ToothRule();
toothRule3.seqToothRuleId =123;
toothRule3.toothRuleId ="sample data3";
toothRule3.toothNumber ="sample data3";
toothRule3.procedureCode ="sample data3";
toothRule3.description ="sample data3";
toothRule3.effDate =new Date('2010-01-01');
toothRule3.termDate =new Date('2010-01-01');
toothRule3.termReason ="sample data3";
toothRule3.fromAge =123;
toothRule3.toAge =123;
toothRule3.userDefined1 ="sample data3";
toothRule3.userDate1 =new Date('2010-01-01');
toothRule3.userDefined2 ="sample data3";
toothRule3.userDate2 =new Date('2010-01-01');
toothRule3.allSurfaceInd ="sample data3";
toothRule3.allArchInd ="sample data3";
toothRule3.allQuadInd ="sample data3";
toothRule3.allOralInd ="sample data3";
toothRule3.securityCode ="sample data3";
toothRule3.insertDatetime =new Date('2010-01-01');
toothRule3.insertUser ="sample data3";
toothRule3.insertProcess ="sample data3";
toothRule3.updateDatetime =new Date('2010-01-01');
toothRule3.updateUser ="sample data3";
toothRule3.updateProcess ="sample data3";


export const ToothRules: ToothRule[] = [
    toothRule1,
    toothRule2,
    toothRule3,
];