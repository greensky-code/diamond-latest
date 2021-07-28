/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ToothHistory} from "../../api-models"

var toothHistory1 = new ToothHistory();
toothHistory1.seqToothHistoryId =123;
toothHistory1.seqMembId =123;
toothHistory1.dateOfService =new Date('2010-01-01');
toothHistory1.toothNumber ="sample data1";
toothHistory1.procedureCode ="sample data1";
toothHistory1.surface1 ="sample data1";
toothHistory1.surface2 ="sample data1";
toothHistory1.surface3 ="sample data1";
toothHistory1.surface4 ="sample data1";
toothHistory1.surface5 ="sample data1";
toothHistory1.arch ="sample data1";
toothHistory1.quadrant ="sample data1";
toothHistory1.oralCavity ="sample data1";
toothHistory1.toothStatus ="sample data1";
toothHistory1.seqProvId =123;
toothHistory1.benefitPackageId ="sample data1";
toothHistory1.seqClaimId =123;
toothHistory1.lineNumber =123;
toothHistory1.subLineCode ="sample data1";
toothHistory1.sourceType ="sample data1";
toothHistory1.userDefined1 ="sample data1";
toothHistory1.userDate1 =new Date('2010-01-01');
toothHistory1.userDefined2 ="sample data1";
toothHistory1.userDate2 =new Date('2010-01-01');
toothHistory1.securityCode ="sample data1";
toothHistory1.insertDatetime =new Date('2010-01-01');
toothHistory1.insertUser ="sample data1";
toothHistory1.insertProcess ="sample data1";
toothHistory1.updateDatetime =new Date('2010-01-01');
toothHistory1.updateUser ="sample data1";
toothHistory1.updateProcess ="sample data1";
toothHistory1.medDefCode ="sample data1";

var toothHistory2 = new ToothHistory();
toothHistory2.seqToothHistoryId =123;
toothHistory2.seqMembId =123;
toothHistory2.dateOfService =new Date('2010-01-01');
toothHistory2.toothNumber ="sample data2";
toothHistory2.procedureCode ="sample data2";
toothHistory2.surface1 ="sample data2";
toothHistory2.surface2 ="sample data2";
toothHistory2.surface3 ="sample data2";
toothHistory2.surface4 ="sample data2";
toothHistory2.surface5 ="sample data2";
toothHistory2.arch ="sample data2";
toothHistory2.quadrant ="sample data2";
toothHistory2.oralCavity ="sample data2";
toothHistory2.toothStatus ="sample data2";
toothHistory2.seqProvId =123;
toothHistory2.benefitPackageId ="sample data2";
toothHistory2.seqClaimId =123;
toothHistory2.lineNumber =123;
toothHistory2.subLineCode ="sample data2";
toothHistory2.sourceType ="sample data2";
toothHistory2.userDefined1 ="sample data2";
toothHistory2.userDate1 =new Date('2010-01-01');
toothHistory2.userDefined2 ="sample data2";
toothHistory2.userDate2 =new Date('2010-01-01');
toothHistory2.securityCode ="sample data2";
toothHistory2.insertDatetime =new Date('2010-01-01');
toothHistory2.insertUser ="sample data2";
toothHistory2.insertProcess ="sample data2";
toothHistory2.updateDatetime =new Date('2010-01-01');
toothHistory2.updateUser ="sample data2";
toothHistory2.updateProcess ="sample data2";
toothHistory2.medDefCode ="sample data2";

var toothHistory3 = new ToothHistory();
toothHistory3.seqToothHistoryId =123;
toothHistory3.seqMembId =123;
toothHistory3.dateOfService =new Date('2010-01-01');
toothHistory3.toothNumber ="sample data3";
toothHistory3.procedureCode ="sample data3";
toothHistory3.surface1 ="sample data3";
toothHistory3.surface2 ="sample data3";
toothHistory3.surface3 ="sample data3";
toothHistory3.surface4 ="sample data3";
toothHistory3.surface5 ="sample data3";
toothHistory3.arch ="sample data3";
toothHistory3.quadrant ="sample data3";
toothHistory3.oralCavity ="sample data3";
toothHistory3.toothStatus ="sample data3";
toothHistory3.seqProvId =123;
toothHistory3.benefitPackageId ="sample data3";
toothHistory3.seqClaimId =123;
toothHistory3.lineNumber =123;
toothHistory3.subLineCode ="sample data3";
toothHistory3.sourceType ="sample data3";
toothHistory3.userDefined1 ="sample data3";
toothHistory3.userDate1 =new Date('2010-01-01');
toothHistory3.userDefined2 ="sample data3";
toothHistory3.userDate2 =new Date('2010-01-01');
toothHistory3.securityCode ="sample data3";
toothHistory3.insertDatetime =new Date('2010-01-01');
toothHistory3.insertUser ="sample data3";
toothHistory3.insertProcess ="sample data3";
toothHistory3.updateDatetime =new Date('2010-01-01');
toothHistory3.updateUser ="sample data3";
toothHistory3.updateProcess ="sample data3";
toothHistory3.medDefCode ="sample data3";


export const ToothHistorys: ToothHistory[] = [
    toothHistory1,
    toothHistory2,
    toothHistory3,
];