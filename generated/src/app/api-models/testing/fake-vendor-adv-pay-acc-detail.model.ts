/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorAdvPayAccDetail} from "../../api-models"

var vendorAdvPayAccDetail1 = new VendorAdvPayAccDetail();
vendorAdvPayAccDetail1.seqVendAdvPayAccDtl =123;
vendorAdvPayAccDetail1.seqVendAdvPayAcc =123;
vendorAdvPayAccDetail1.sequenceNumber =123;
vendorAdvPayAccDetail1.advPayAmount =123;
vendorAdvPayAccDetail1.checkEftType ="sample data1";
vendorAdvPayAccDetail1.checkEftNumber ="sample data1";
vendorAdvPayAccDetail1.checkEftDate =new Date('2010-01-01');
vendorAdvPayAccDetail1.checkEftMethod ="sample data1";
vendorAdvPayAccDetail1.apStatus ="sample data1";
vendorAdvPayAccDetail1.balanceAmount =123;
vendorAdvPayAccDetail1.selectedForPay =123;
vendorAdvPayAccDetail1.seqApTrans =123;
vendorAdvPayAccDetail1.approveStatus ="sample data1";
vendorAdvPayAccDetail1.approveUserId ="sample data1";
vendorAdvPayAccDetail1.approveDate =new Date('2010-01-01');
vendorAdvPayAccDetail1.denyReason ="sample data1";
vendorAdvPayAccDetail1.appUserDefined1 ="sample data1";
vendorAdvPayAccDetail1.appUserDefined2 ="sample data1";
vendorAdvPayAccDetail1.appUserDate1 =new Date('2010-01-01');
vendorAdvPayAccDetail1.appUserDate2 =new Date('2010-01-01');
vendorAdvPayAccDetail1.securityCode ="sample data1";
vendorAdvPayAccDetail1.insertDatetime =new Date('2010-01-01');
vendorAdvPayAccDetail1.insertUser ="sample data1";
vendorAdvPayAccDetail1.insertProcess ="sample data1";
vendorAdvPayAccDetail1.updateDatetime =new Date('2010-01-01');
vendorAdvPayAccDetail1.updateUser ="sample data1";
vendorAdvPayAccDetail1.updateProcess ="sample data1";

var vendorAdvPayAccDetail2 = new VendorAdvPayAccDetail();
vendorAdvPayAccDetail2.seqVendAdvPayAccDtl =123;
vendorAdvPayAccDetail2.seqVendAdvPayAcc =123;
vendorAdvPayAccDetail2.sequenceNumber =123;
vendorAdvPayAccDetail2.advPayAmount =123;
vendorAdvPayAccDetail2.checkEftType ="sample data2";
vendorAdvPayAccDetail2.checkEftNumber ="sample data2";
vendorAdvPayAccDetail2.checkEftDate =new Date('2010-01-01');
vendorAdvPayAccDetail2.checkEftMethod ="sample data2";
vendorAdvPayAccDetail2.apStatus ="sample data2";
vendorAdvPayAccDetail2.balanceAmount =123;
vendorAdvPayAccDetail2.selectedForPay =123;
vendorAdvPayAccDetail2.seqApTrans =123;
vendorAdvPayAccDetail2.approveStatus ="sample data2";
vendorAdvPayAccDetail2.approveUserId ="sample data2";
vendorAdvPayAccDetail2.approveDate =new Date('2010-01-01');
vendorAdvPayAccDetail2.denyReason ="sample data2";
vendorAdvPayAccDetail2.appUserDefined1 ="sample data2";
vendorAdvPayAccDetail2.appUserDefined2 ="sample data2";
vendorAdvPayAccDetail2.appUserDate1 =new Date('2010-01-01');
vendorAdvPayAccDetail2.appUserDate2 =new Date('2010-01-01');
vendorAdvPayAccDetail2.securityCode ="sample data2";
vendorAdvPayAccDetail2.insertDatetime =new Date('2010-01-01');
vendorAdvPayAccDetail2.insertUser ="sample data2";
vendorAdvPayAccDetail2.insertProcess ="sample data2";
vendorAdvPayAccDetail2.updateDatetime =new Date('2010-01-01');
vendorAdvPayAccDetail2.updateUser ="sample data2";
vendorAdvPayAccDetail2.updateProcess ="sample data2";

var vendorAdvPayAccDetail3 = new VendorAdvPayAccDetail();
vendorAdvPayAccDetail3.seqVendAdvPayAccDtl =123;
vendorAdvPayAccDetail3.seqVendAdvPayAcc =123;
vendorAdvPayAccDetail3.sequenceNumber =123;
vendorAdvPayAccDetail3.advPayAmount =123;
vendorAdvPayAccDetail3.checkEftType ="sample data3";
vendorAdvPayAccDetail3.checkEftNumber ="sample data3";
vendorAdvPayAccDetail3.checkEftDate =new Date('2010-01-01');
vendorAdvPayAccDetail3.checkEftMethod ="sample data3";
vendorAdvPayAccDetail3.apStatus ="sample data3";
vendorAdvPayAccDetail3.balanceAmount =123;
vendorAdvPayAccDetail3.selectedForPay =123;
vendorAdvPayAccDetail3.seqApTrans =123;
vendorAdvPayAccDetail3.approveStatus ="sample data3";
vendorAdvPayAccDetail3.approveUserId ="sample data3";
vendorAdvPayAccDetail3.approveDate =new Date('2010-01-01');
vendorAdvPayAccDetail3.denyReason ="sample data3";
vendorAdvPayAccDetail3.appUserDefined1 ="sample data3";
vendorAdvPayAccDetail3.appUserDefined2 ="sample data3";
vendorAdvPayAccDetail3.appUserDate1 =new Date('2010-01-01');
vendorAdvPayAccDetail3.appUserDate2 =new Date('2010-01-01');
vendorAdvPayAccDetail3.securityCode ="sample data3";
vendorAdvPayAccDetail3.insertDatetime =new Date('2010-01-01');
vendorAdvPayAccDetail3.insertUser ="sample data3";
vendorAdvPayAccDetail3.insertProcess ="sample data3";
vendorAdvPayAccDetail3.updateDatetime =new Date('2010-01-01');
vendorAdvPayAccDetail3.updateUser ="sample data3";
vendorAdvPayAccDetail3.updateProcess ="sample data3";


export const VendorAdvPayAccDetails: VendorAdvPayAccDetail[] = [
    vendorAdvPayAccDetail1,
    vendorAdvPayAccDetail2,
    vendorAdvPayAccDetail3,
];