/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PmbArCustBillHistory} from "../../api-models"

var pmbArCustBillHistory1 = new PmbArCustBillHistory();
pmbArCustBillHistory1.customerType ="sample data1";
pmbArCustBillHistory1.customerId ="sample data1";
pmbArCustBillHistory1.invoiceNo =123;
pmbArCustBillHistory1.invoiceDate =new Date('2010-01-01');
pmbArCustBillHistory1.billingDatetime =new Date('2010-01-01');
pmbArCustBillHistory1.periodBilledFromDate =new Date('2010-01-01');
pmbArCustBillHistory1.periodBilledThruDate =new Date('2010-01-01');
pmbArCustBillHistory1.seqGpbilId =123;
pmbArCustBillHistory1.billJobType ="sample data1";
pmbArCustBillHistory1.customerName1 ="sample data1";
pmbArCustBillHistory1.customerName2 ="sample data1";
pmbArCustBillHistory1.customerAddrLine1 ="sample data1";
pmbArCustBillHistory1.customerAddrLine2 ="sample data1";
pmbArCustBillHistory1.customerCity ="sample data1";
pmbArCustBillHistory1.customerState ="sample data1";
pmbArCustBillHistory1.customerPostalCode ="sample data1";
pmbArCustBillHistory1.customerCountry ="sample data1";
pmbArCustBillHistory1.balanceForward =123;
pmbArCustBillHistory1.totalPaymentAmt =123;
pmbArCustBillHistory1.totalAdjustmentAmt =123;
pmbArCustBillHistory1.newChargeAmt =123;
pmbArCustBillHistory1.newBalance =123;
pmbArCustBillHistory1.paymentDueDate =new Date('2010-01-01');
pmbArCustBillHistory1.annualPremiumIncome =123;
pmbArCustBillHistory1.billedStartDate =new Date('2010-01-01');
pmbArCustBillHistory1.invoicePrintFormat ="sample data1";
pmbArCustBillHistory1.securityCode ="sample data1";
pmbArCustBillHistory1.insertDatetime =new Date('2010-01-01');
pmbArCustBillHistory1.insertUser ="sample data1";
pmbArCustBillHistory1.insertProcess ="sample data1";
pmbArCustBillHistory1.updateDatetime =new Date('2010-01-01');
pmbArCustBillHistory1.updateUser ="sample data1";
pmbArCustBillHistory1.updateProcess ="sample data1";
pmbArCustBillHistory1.seqGroupId =123;

var pmbArCustBillHistory2 = new PmbArCustBillHistory();
pmbArCustBillHistory2.customerType ="sample data2";
pmbArCustBillHistory2.customerId ="sample data2";
pmbArCustBillHistory2.invoiceNo =123;
pmbArCustBillHistory2.invoiceDate =new Date('2010-01-01');
pmbArCustBillHistory2.billingDatetime =new Date('2010-01-01');
pmbArCustBillHistory2.periodBilledFromDate =new Date('2010-01-01');
pmbArCustBillHistory2.periodBilledThruDate =new Date('2010-01-01');
pmbArCustBillHistory2.seqGpbilId =123;
pmbArCustBillHistory2.billJobType ="sample data2";
pmbArCustBillHistory2.customerName1 ="sample data2";
pmbArCustBillHistory2.customerName2 ="sample data2";
pmbArCustBillHistory2.customerAddrLine1 ="sample data2";
pmbArCustBillHistory2.customerAddrLine2 ="sample data2";
pmbArCustBillHistory2.customerCity ="sample data2";
pmbArCustBillHistory2.customerState ="sample data2";
pmbArCustBillHistory2.customerPostalCode ="sample data2";
pmbArCustBillHistory2.customerCountry ="sample data2";
pmbArCustBillHistory2.balanceForward =123;
pmbArCustBillHistory2.totalPaymentAmt =123;
pmbArCustBillHistory2.totalAdjustmentAmt =123;
pmbArCustBillHistory2.newChargeAmt =123;
pmbArCustBillHistory2.newBalance =123;
pmbArCustBillHistory2.paymentDueDate =new Date('2010-01-01');
pmbArCustBillHistory2.annualPremiumIncome =123;
pmbArCustBillHistory2.billedStartDate =new Date('2010-01-01');
pmbArCustBillHistory2.invoicePrintFormat ="sample data2";
pmbArCustBillHistory2.securityCode ="sample data2";
pmbArCustBillHistory2.insertDatetime =new Date('2010-01-01');
pmbArCustBillHistory2.insertUser ="sample data2";
pmbArCustBillHistory2.insertProcess ="sample data2";
pmbArCustBillHistory2.updateDatetime =new Date('2010-01-01');
pmbArCustBillHistory2.updateUser ="sample data2";
pmbArCustBillHistory2.updateProcess ="sample data2";
pmbArCustBillHistory2.seqGroupId =123;

var pmbArCustBillHistory3 = new PmbArCustBillHistory();
pmbArCustBillHistory3.customerType ="sample data3";
pmbArCustBillHistory3.customerId ="sample data3";
pmbArCustBillHistory3.invoiceNo =123;
pmbArCustBillHistory3.invoiceDate =new Date('2010-01-01');
pmbArCustBillHistory3.billingDatetime =new Date('2010-01-01');
pmbArCustBillHistory3.periodBilledFromDate =new Date('2010-01-01');
pmbArCustBillHistory3.periodBilledThruDate =new Date('2010-01-01');
pmbArCustBillHistory3.seqGpbilId =123;
pmbArCustBillHistory3.billJobType ="sample data3";
pmbArCustBillHistory3.customerName1 ="sample data3";
pmbArCustBillHistory3.customerName2 ="sample data3";
pmbArCustBillHistory3.customerAddrLine1 ="sample data3";
pmbArCustBillHistory3.customerAddrLine2 ="sample data3";
pmbArCustBillHistory3.customerCity ="sample data3";
pmbArCustBillHistory3.customerState ="sample data3";
pmbArCustBillHistory3.customerPostalCode ="sample data3";
pmbArCustBillHistory3.customerCountry ="sample data3";
pmbArCustBillHistory3.balanceForward =123;
pmbArCustBillHistory3.totalPaymentAmt =123;
pmbArCustBillHistory3.totalAdjustmentAmt =123;
pmbArCustBillHistory3.newChargeAmt =123;
pmbArCustBillHistory3.newBalance =123;
pmbArCustBillHistory3.paymentDueDate =new Date('2010-01-01');
pmbArCustBillHistory3.annualPremiumIncome =123;
pmbArCustBillHistory3.billedStartDate =new Date('2010-01-01');
pmbArCustBillHistory3.invoicePrintFormat ="sample data3";
pmbArCustBillHistory3.securityCode ="sample data3";
pmbArCustBillHistory3.insertDatetime =new Date('2010-01-01');
pmbArCustBillHistory3.insertUser ="sample data3";
pmbArCustBillHistory3.insertProcess ="sample data3";
pmbArCustBillHistory3.updateDatetime =new Date('2010-01-01');
pmbArCustBillHistory3.updateUser ="sample data3";
pmbArCustBillHistory3.updateProcess ="sample data3";
pmbArCustBillHistory3.seqGroupId =123;


export const PmbArCustBillHistorys: PmbArCustBillHistory[] = [
    pmbArCustBillHistory1,
    pmbArCustBillHistory2,
    pmbArCustBillHistory3,
];