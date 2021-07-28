/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcedurePrice} from "../../api-models"

var procedurePrice1 = new ProcedurePrice();
procedurePrice1.procedureCode ="sample data1";
procedurePrice1.seqProcPrice =123;
procedurePrice1.priceSchedule ="sample data1";
procedurePrice1.pricingRegion ="sample data1";
procedurePrice1.effectiveDate =new Date('2010-01-01');
procedurePrice1.termDate =new Date('2010-01-01');
procedurePrice1.allowedAmt =123;
procedurePrice1.pctOfBilled =123;
procedurePrice1.withholdPct =123;
procedurePrice1.contractOverride ="sample data1";
procedurePrice1.procedureHold ="sample data1";
procedurePrice1.holdDate =new Date('2010-01-01');
procedurePrice1.perDiemFlag ="sample data1";
procedurePrice1.userDefined1 ="sample data1";
procedurePrice1.userDefined2 ="sample data1";
procedurePrice1.userDefined3 ="sample data1";
procedurePrice1.userDefined4 ="sample data1";
procedurePrice1.userDefined5 ="sample data1";
procedurePrice1.securityCode ="sample data1";
procedurePrice1.insertDatetime =new Date('2010-01-01');
procedurePrice1.insertUser ="sample data1";
procedurePrice1.insertProcess ="sample data1";
procedurePrice1.updateDatetime =new Date('2010-01-01');
procedurePrice1.updateUser ="sample data1";
procedurePrice1.updateProcess ="sample data1";
procedurePrice1.modifierCode ="sample data1";
procedurePrice1.geoZipRegion ="sample data1";

var procedurePrice2 = new ProcedurePrice();
procedurePrice2.procedureCode ="sample data2";
procedurePrice2.seqProcPrice =123;
procedurePrice2.priceSchedule ="sample data2";
procedurePrice2.pricingRegion ="sample data2";
procedurePrice2.effectiveDate =new Date('2010-01-01');
procedurePrice2.termDate =new Date('2010-01-01');
procedurePrice2.allowedAmt =123;
procedurePrice2.pctOfBilled =123;
procedurePrice2.withholdPct =123;
procedurePrice2.contractOverride ="sample data2";
procedurePrice2.procedureHold ="sample data2";
procedurePrice2.holdDate =new Date('2010-01-01');
procedurePrice2.perDiemFlag ="sample data2";
procedurePrice2.userDefined1 ="sample data2";
procedurePrice2.userDefined2 ="sample data2";
procedurePrice2.userDefined3 ="sample data2";
procedurePrice2.userDefined4 ="sample data2";
procedurePrice2.userDefined5 ="sample data2";
procedurePrice2.securityCode ="sample data2";
procedurePrice2.insertDatetime =new Date('2010-01-01');
procedurePrice2.insertUser ="sample data2";
procedurePrice2.insertProcess ="sample data2";
procedurePrice2.updateDatetime =new Date('2010-01-01');
procedurePrice2.updateUser ="sample data2";
procedurePrice2.updateProcess ="sample data2";
procedurePrice2.modifierCode ="sample data2";
procedurePrice2.geoZipRegion ="sample data2";

var procedurePrice3 = new ProcedurePrice();
procedurePrice3.procedureCode ="sample data3";
procedurePrice3.seqProcPrice =123;
procedurePrice3.priceSchedule ="sample data3";
procedurePrice3.pricingRegion ="sample data3";
procedurePrice3.effectiveDate =new Date('2010-01-01');
procedurePrice3.termDate =new Date('2010-01-01');
procedurePrice3.allowedAmt =123;
procedurePrice3.pctOfBilled =123;
procedurePrice3.withholdPct =123;
procedurePrice3.contractOverride ="sample data3";
procedurePrice3.procedureHold ="sample data3";
procedurePrice3.holdDate =new Date('2010-01-01');
procedurePrice3.perDiemFlag ="sample data3";
procedurePrice3.userDefined1 ="sample data3";
procedurePrice3.userDefined2 ="sample data3";
procedurePrice3.userDefined3 ="sample data3";
procedurePrice3.userDefined4 ="sample data3";
procedurePrice3.userDefined5 ="sample data3";
procedurePrice3.securityCode ="sample data3";
procedurePrice3.insertDatetime =new Date('2010-01-01');
procedurePrice3.insertUser ="sample data3";
procedurePrice3.insertProcess ="sample data3";
procedurePrice3.updateDatetime =new Date('2010-01-01');
procedurePrice3.updateUser ="sample data3";
procedurePrice3.updateProcess ="sample data3";
procedurePrice3.modifierCode ="sample data3";
procedurePrice3.geoZipRegion ="sample data3";


export const ProcedurePrices: ProcedurePrice[] = [
    procedurePrice1,
    procedurePrice2,
    procedurePrice3,
];