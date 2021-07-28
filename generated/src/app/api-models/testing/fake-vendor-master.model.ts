/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorMaster} from "../../api-models"

var vendorMaster1 = new VendorMaster();
vendorMaster1.userDate2 =new Date('2010-01-01');
vendorMaster1.userDate1 =new Date('2010-01-01');
vendorMaster1.userDefined2 ="sample data1";
vendorMaster1.tradingPartnerId ="sample data1";
vendorMaster1.nationalProviderId ="sample data1";
vendorMaster1.vendAccountType ="sample data1";
vendorMaster1.vendAbaRoutingNumber ="sample data1";
vendorMaster1.vendBankAccountDescription ="sample data1";
vendorMaster1.vendBankAccountNumber ="sample data1";
vendorMaster1.eftInd ="sample data1";
vendorMaster1.updateProcess ="sample data1";
vendorMaster1.updateUser ="sample data1";
vendorMaster1.updateDatetime =new Date('2010-01-01');
vendorMaster1.insertProcess ="sample data1";
vendorMaster1.insertUser ="sample data1";
vendorMaster1.insertDatetime =new Date('2010-01-01');
vendorMaster1.securityCode ="sample data1";
vendorMaster1.seqVend1099Addr =123;
vendorMaster1.paymentDelayDays =123;
vendorMaster1.vendor1099Flag ="sample data1";
vendorMaster1.holdPaymentFlag ="sample data1";
vendorMaster1.userDefined ="sample data1";
vendorMaster1.irsTaxId ="sample data1";
vendorMaster1.vendorType ="sample data1";
vendorMaster1.fullName ="sample data1";
vendorMaster1.shortName ="sample data1";
vendorMaster1.vendorId ="sample data1";
vendorMaster1.seqVendId =123;

var vendorMaster2 = new VendorMaster();
vendorMaster2.userDate2 =new Date('2010-01-01');
vendorMaster2.userDate1 =new Date('2010-01-01');
vendorMaster2.userDefined2 ="sample data2";
vendorMaster2.tradingPartnerId ="sample data2";
vendorMaster2.nationalProviderId ="sample data2";
vendorMaster2.vendAccountType ="sample data2";
vendorMaster2.vendAbaRoutingNumber ="sample data2";
vendorMaster2.vendBankAccountDescription ="sample data2";
vendorMaster2.vendBankAccountNumber ="sample data2";
vendorMaster2.eftInd ="sample data2";
vendorMaster2.updateProcess ="sample data2";
vendorMaster2.updateUser ="sample data2";
vendorMaster2.updateDatetime =new Date('2010-01-01');
vendorMaster2.insertProcess ="sample data2";
vendorMaster2.insertUser ="sample data2";
vendorMaster2.insertDatetime =new Date('2010-01-01');
vendorMaster2.securityCode ="sample data2";
vendorMaster2.seqVend1099Addr =123;
vendorMaster2.paymentDelayDays =123;
vendorMaster2.vendor1099Flag ="sample data2";
vendorMaster2.holdPaymentFlag ="sample data2";
vendorMaster2.userDefined ="sample data2";
vendorMaster2.irsTaxId ="sample data2";
vendorMaster2.vendorType ="sample data2";
vendorMaster2.fullName ="sample data2";
vendorMaster2.shortName ="sample data2";
vendorMaster2.vendorId ="sample data2";
vendorMaster2.seqVendId =123;

var vendorMaster3 = new VendorMaster();
vendorMaster3.userDate2 =new Date('2010-01-01');
vendorMaster3.userDate1 =new Date('2010-01-01');
vendorMaster3.userDefined2 ="sample data3";
vendorMaster3.tradingPartnerId ="sample data3";
vendorMaster3.nationalProviderId ="sample data3";
vendorMaster3.vendAccountType ="sample data3";
vendorMaster3.vendAbaRoutingNumber ="sample data3";
vendorMaster3.vendBankAccountDescription ="sample data3";
vendorMaster3.vendBankAccountNumber ="sample data3";
vendorMaster3.eftInd ="sample data3";
vendorMaster3.updateProcess ="sample data3";
vendorMaster3.updateUser ="sample data3";
vendorMaster3.updateDatetime =new Date('2010-01-01');
vendorMaster3.insertProcess ="sample data3";
vendorMaster3.insertUser ="sample data3";
vendorMaster3.insertDatetime =new Date('2010-01-01');
vendorMaster3.securityCode ="sample data3";
vendorMaster3.seqVend1099Addr =123;
vendorMaster3.paymentDelayDays =123;
vendorMaster3.vendor1099Flag ="sample data3";
vendorMaster3.holdPaymentFlag ="sample data3";
vendorMaster3.userDefined ="sample data3";
vendorMaster3.irsTaxId ="sample data3";
vendorMaster3.vendorType ="sample data3";
vendorMaster3.fullName ="sample data3";
vendorMaster3.shortName ="sample data3";
vendorMaster3.vendorId ="sample data3";
vendorMaster3.seqVendId =123;


export const VendorMasters: VendorMaster[] = [
    vendorMaster1,
    vendorMaster2,
    vendorMaster3,
];