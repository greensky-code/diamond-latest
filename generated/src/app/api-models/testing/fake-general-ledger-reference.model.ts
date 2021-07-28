/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GeneralLedgerReference} from "../../api-models"

var generalLedgerReference1 = new GeneralLedgerReference();
generalLedgerReference1.companyCode ="sample data1";
generalLedgerReference1.glRefCode ="sample data1";
generalLedgerReference1.description ="sample data1";
generalLedgerReference1.debitGlNumber1 ="sample data1";
generalLedgerReference1.creditGlNumber1 ="sample data1";
generalLedgerReference1.debitGlNumber2 ="sample data1";
generalLedgerReference1.creditGlNumber2 ="sample data1";
generalLedgerReference1.securityCode ="sample data1";
generalLedgerReference1.insertDatetime =new Date('2010-01-01');
generalLedgerReference1.insertUser ="sample data1";
generalLedgerReference1.insertProcess ="sample data1";
generalLedgerReference1.updateDatetime =new Date('2010-01-01');
generalLedgerReference1.updateUser ="sample data1";
generalLedgerReference1.updateProcess ="sample data1";
generalLedgerReference1.intDebitGlNumber ="sample data1";
generalLedgerReference1.intCreditGlNumber ="sample data1";
generalLedgerReference1.dscntDebitGlNumber ="sample data1";
generalLedgerReference1.dscntCreditGlNumber ="sample data1";
generalLedgerReference1.userDefined1 ="sample data1";
generalLedgerReference1.userDefined2 ="sample data1";
generalLedgerReference1.userDate1 =new Date('2010-01-01');
generalLedgerReference1.userDate2 =new Date('2010-01-01');
generalLedgerReference1.penaltyExpenseAcc ="sample data1";
generalLedgerReference1.penaltyPayableAcc ="sample data1";
generalLedgerReference1.incentiveExpenseAcc ="sample data1";
generalLedgerReference1.incentivePayableAcc ="sample data1";
generalLedgerReference1.advPayPrepaidExpenseAcc ="sample data1";
generalLedgerReference1.advPayPayableAcc ="sample data1";
generalLedgerReference1.admFeeExpenseAcc ="sample data1";
generalLedgerReference1.admFeePayableAcc ="sample data1";
generalLedgerReference1.writeOffAcc ="sample data1";

var generalLedgerReference2 = new GeneralLedgerReference();
generalLedgerReference2.companyCode ="sample data2";
generalLedgerReference2.glRefCode ="sample data2";
generalLedgerReference2.description ="sample data2";
generalLedgerReference2.debitGlNumber1 ="sample data2";
generalLedgerReference2.creditGlNumber1 ="sample data2";
generalLedgerReference2.debitGlNumber2 ="sample data2";
generalLedgerReference2.creditGlNumber2 ="sample data2";
generalLedgerReference2.securityCode ="sample data2";
generalLedgerReference2.insertDatetime =new Date('2010-01-01');
generalLedgerReference2.insertUser ="sample data2";
generalLedgerReference2.insertProcess ="sample data2";
generalLedgerReference2.updateDatetime =new Date('2010-01-01');
generalLedgerReference2.updateUser ="sample data2";
generalLedgerReference2.updateProcess ="sample data2";
generalLedgerReference2.intDebitGlNumber ="sample data2";
generalLedgerReference2.intCreditGlNumber ="sample data2";
generalLedgerReference2.dscntDebitGlNumber ="sample data2";
generalLedgerReference2.dscntCreditGlNumber ="sample data2";
generalLedgerReference2.userDefined1 ="sample data2";
generalLedgerReference2.userDefined2 ="sample data2";
generalLedgerReference2.userDate1 =new Date('2010-01-01');
generalLedgerReference2.userDate2 =new Date('2010-01-01');
generalLedgerReference2.penaltyExpenseAcc ="sample data2";
generalLedgerReference2.penaltyPayableAcc ="sample data2";
generalLedgerReference2.incentiveExpenseAcc ="sample data2";
generalLedgerReference2.incentivePayableAcc ="sample data2";
generalLedgerReference2.advPayPrepaidExpenseAcc ="sample data2";
generalLedgerReference2.advPayPayableAcc ="sample data2";
generalLedgerReference2.admFeeExpenseAcc ="sample data2";
generalLedgerReference2.admFeePayableAcc ="sample data2";
generalLedgerReference2.writeOffAcc ="sample data2";

var generalLedgerReference3 = new GeneralLedgerReference();
generalLedgerReference3.companyCode ="sample data3";
generalLedgerReference3.glRefCode ="sample data3";
generalLedgerReference3.description ="sample data3";
generalLedgerReference3.debitGlNumber1 ="sample data3";
generalLedgerReference3.creditGlNumber1 ="sample data3";
generalLedgerReference3.debitGlNumber2 ="sample data3";
generalLedgerReference3.creditGlNumber2 ="sample data3";
generalLedgerReference3.securityCode ="sample data3";
generalLedgerReference3.insertDatetime =new Date('2010-01-01');
generalLedgerReference3.insertUser ="sample data3";
generalLedgerReference3.insertProcess ="sample data3";
generalLedgerReference3.updateDatetime =new Date('2010-01-01');
generalLedgerReference3.updateUser ="sample data3";
generalLedgerReference3.updateProcess ="sample data3";
generalLedgerReference3.intDebitGlNumber ="sample data3";
generalLedgerReference3.intCreditGlNumber ="sample data3";
generalLedgerReference3.dscntDebitGlNumber ="sample data3";
generalLedgerReference3.dscntCreditGlNumber ="sample data3";
generalLedgerReference3.userDefined1 ="sample data3";
generalLedgerReference3.userDefined2 ="sample data3";
generalLedgerReference3.userDate1 =new Date('2010-01-01');
generalLedgerReference3.userDate2 =new Date('2010-01-01');
generalLedgerReference3.penaltyExpenseAcc ="sample data3";
generalLedgerReference3.penaltyPayableAcc ="sample data3";
generalLedgerReference3.incentiveExpenseAcc ="sample data3";
generalLedgerReference3.incentivePayableAcc ="sample data3";
generalLedgerReference3.advPayPrepaidExpenseAcc ="sample data3";
generalLedgerReference3.advPayPayableAcc ="sample data3";
generalLedgerReference3.admFeeExpenseAcc ="sample data3";
generalLedgerReference3.admFeePayableAcc ="sample data3";
generalLedgerReference3.writeOffAcc ="sample data3";


export const GeneralLedgerReferences: GeneralLedgerReference[] = [
    generalLedgerReference1,
    generalLedgerReference2,
    generalLedgerReference3,
];