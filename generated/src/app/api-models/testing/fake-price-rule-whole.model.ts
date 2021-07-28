/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PriceRuleWhole} from "../../api-models"

var priceRuleWhole1 = new PriceRuleWhole();
priceRuleWhole1.priceRule ="sample data1";
priceRuleWhole1.seqRuleWhole =123;
priceRuleWhole1.ruleType ="sample data1";
priceRuleWhole1.ruleOrder =123;
priceRuleWhole1.tieredSeqNumber =123;
priceRuleWhole1.effectiveDate =new Date('2010-01-01');
priceRuleWhole1.priceDeterminant ="sample data1";
priceRuleWhole1.termDate =new Date('2010-01-01');
priceRuleWhole1.description ="sample data1";
priceRuleWhole1.ruleFromDays =123;
priceRuleWhole1.ruleThruDays =123;
priceRuleWhole1.daysRangeMethod ="sample data1";
priceRuleWhole1.ruleFromAmt =123;
priceRuleWhole1.ruleThruAmt =123;
priceRuleWhole1.ruleAmtType ="sample data1";
priceRuleWhole1.patientFromAge =123;
priceRuleWhole1.patientThruAge =123;
priceRuleWhole1.threshQty =123;
priceRuleWhole1.threshQtyMethod ="sample data1";
priceRuleWhole1.threshAmt =123;
priceRuleWhole1.threshAmtMethod ="sample data1";
priceRuleWhole1.threshPct =123;
priceRuleWhole1.threshPctMethod ="sample data1";
priceRuleWhole1.capAmt =123;
priceRuleWhole1.capAmtMethod ="sample data1";
priceRuleWhole1.capPct =123;
priceRuleWhole1.capPctMethod ="sample data1";
priceRuleWhole1.calcMethodCode ="sample data1";
priceRuleWhole1.summingDetails ="sample data1";
priceRuleWhole1.allowedReason ="sample data1";
priceRuleWhole1.applyToBucket ="sample data1";
priceRuleWhole1.bucketLogic ="sample data1";
priceRuleWhole1.sysProcedureCode ="sample data1";
priceRuleWhole1.holdReason ="sample data1";
priceRuleWhole1.customPgmName ="sample data1";
priceRuleWhole1.messageToOperator ="sample data1";
priceRuleWhole1.tieredPerdiemDaysFrom =123;
priceRuleWhole1.tieredPerdiemDaysThru =123;
priceRuleWhole1.tieredStoplossAmtFrom =123;
priceRuleWhole1.tieredStoplossAmtThru =123;
priceRuleWhole1.usePctAllowed ="sample data1";
priceRuleWhole1.allowedFactOvr =123;
priceRuleWhole1.securityCode ="sample data1";
priceRuleWhole1.insertDatetime =new Date('2010-01-01');
priceRuleWhole1.insertUser ="sample data1";
priceRuleWhole1.insertProcess ="sample data1";
priceRuleWhole1.updateDatetime =new Date('2010-01-01');
priceRuleWhole1.updateUser ="sample data1";
priceRuleWhole1.updateProcess ="sample data1";

var priceRuleWhole2 = new PriceRuleWhole();
priceRuleWhole2.priceRule ="sample data2";
priceRuleWhole2.seqRuleWhole =123;
priceRuleWhole2.ruleType ="sample data2";
priceRuleWhole2.ruleOrder =123;
priceRuleWhole2.tieredSeqNumber =123;
priceRuleWhole2.effectiveDate =new Date('2010-01-01');
priceRuleWhole2.priceDeterminant ="sample data2";
priceRuleWhole2.termDate =new Date('2010-01-01');
priceRuleWhole2.description ="sample data2";
priceRuleWhole2.ruleFromDays =123;
priceRuleWhole2.ruleThruDays =123;
priceRuleWhole2.daysRangeMethod ="sample data2";
priceRuleWhole2.ruleFromAmt =123;
priceRuleWhole2.ruleThruAmt =123;
priceRuleWhole2.ruleAmtType ="sample data2";
priceRuleWhole2.patientFromAge =123;
priceRuleWhole2.patientThruAge =123;
priceRuleWhole2.threshQty =123;
priceRuleWhole2.threshQtyMethod ="sample data2";
priceRuleWhole2.threshAmt =123;
priceRuleWhole2.threshAmtMethod ="sample data2";
priceRuleWhole2.threshPct =123;
priceRuleWhole2.threshPctMethod ="sample data2";
priceRuleWhole2.capAmt =123;
priceRuleWhole2.capAmtMethod ="sample data2";
priceRuleWhole2.capPct =123;
priceRuleWhole2.capPctMethod ="sample data2";
priceRuleWhole2.calcMethodCode ="sample data2";
priceRuleWhole2.summingDetails ="sample data2";
priceRuleWhole2.allowedReason ="sample data2";
priceRuleWhole2.applyToBucket ="sample data2";
priceRuleWhole2.bucketLogic ="sample data2";
priceRuleWhole2.sysProcedureCode ="sample data2";
priceRuleWhole2.holdReason ="sample data2";
priceRuleWhole2.customPgmName ="sample data2";
priceRuleWhole2.messageToOperator ="sample data2";
priceRuleWhole2.tieredPerdiemDaysFrom =123;
priceRuleWhole2.tieredPerdiemDaysThru =123;
priceRuleWhole2.tieredStoplossAmtFrom =123;
priceRuleWhole2.tieredStoplossAmtThru =123;
priceRuleWhole2.usePctAllowed ="sample data2";
priceRuleWhole2.allowedFactOvr =123;
priceRuleWhole2.securityCode ="sample data2";
priceRuleWhole2.insertDatetime =new Date('2010-01-01');
priceRuleWhole2.insertUser ="sample data2";
priceRuleWhole2.insertProcess ="sample data2";
priceRuleWhole2.updateDatetime =new Date('2010-01-01');
priceRuleWhole2.updateUser ="sample data2";
priceRuleWhole2.updateProcess ="sample data2";

var priceRuleWhole3 = new PriceRuleWhole();
priceRuleWhole3.priceRule ="sample data3";
priceRuleWhole3.seqRuleWhole =123;
priceRuleWhole3.ruleType ="sample data3";
priceRuleWhole3.ruleOrder =123;
priceRuleWhole3.tieredSeqNumber =123;
priceRuleWhole3.effectiveDate =new Date('2010-01-01');
priceRuleWhole3.priceDeterminant ="sample data3";
priceRuleWhole3.termDate =new Date('2010-01-01');
priceRuleWhole3.description ="sample data3";
priceRuleWhole3.ruleFromDays =123;
priceRuleWhole3.ruleThruDays =123;
priceRuleWhole3.daysRangeMethod ="sample data3";
priceRuleWhole3.ruleFromAmt =123;
priceRuleWhole3.ruleThruAmt =123;
priceRuleWhole3.ruleAmtType ="sample data3";
priceRuleWhole3.patientFromAge =123;
priceRuleWhole3.patientThruAge =123;
priceRuleWhole3.threshQty =123;
priceRuleWhole3.threshQtyMethod ="sample data3";
priceRuleWhole3.threshAmt =123;
priceRuleWhole3.threshAmtMethod ="sample data3";
priceRuleWhole3.threshPct =123;
priceRuleWhole3.threshPctMethod ="sample data3";
priceRuleWhole3.capAmt =123;
priceRuleWhole3.capAmtMethod ="sample data3";
priceRuleWhole3.capPct =123;
priceRuleWhole3.capPctMethod ="sample data3";
priceRuleWhole3.calcMethodCode ="sample data3";
priceRuleWhole3.summingDetails ="sample data3";
priceRuleWhole3.allowedReason ="sample data3";
priceRuleWhole3.applyToBucket ="sample data3";
priceRuleWhole3.bucketLogic ="sample data3";
priceRuleWhole3.sysProcedureCode ="sample data3";
priceRuleWhole3.holdReason ="sample data3";
priceRuleWhole3.customPgmName ="sample data3";
priceRuleWhole3.messageToOperator ="sample data3";
priceRuleWhole3.tieredPerdiemDaysFrom =123;
priceRuleWhole3.tieredPerdiemDaysThru =123;
priceRuleWhole3.tieredStoplossAmtFrom =123;
priceRuleWhole3.tieredStoplossAmtThru =123;
priceRuleWhole3.usePctAllowed ="sample data3";
priceRuleWhole3.allowedFactOvr =123;
priceRuleWhole3.securityCode ="sample data3";
priceRuleWhole3.insertDatetime =new Date('2010-01-01');
priceRuleWhole3.insertUser ="sample data3";
priceRuleWhole3.insertProcess ="sample data3";
priceRuleWhole3.updateDatetime =new Date('2010-01-01');
priceRuleWhole3.updateUser ="sample data3";
priceRuleWhole3.updateProcess ="sample data3";


export const PriceRuleWholes: PriceRuleWhole[] = [
    priceRuleWhole1,
    priceRuleWhole2,
    priceRuleWhole3,
];