/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { VendorCredit} from "../../api-models"

var vendorCredit1 = new VendorCredit();
vendorCredit1.seqVendCredit =123;
vendorCredit1.seqVendId =123;
vendorCredit1.seqVendAddress =123;
vendorCredit1.creditType ="sample data1";
vendorCredit1.seqVendAdvPayAccDtl =123;
vendorCredit1.creditReason ="sample data1";
vendorCredit1.checkEftType ="sample data1";
vendorCredit1.checkEftNumber ="sample data1";
vendorCredit1.checkEftDate =new Date('2010-01-01');
vendorCredit1.checkEftAmount =123;
vendorCredit1.checkEftReceivedDate =new Date('2010-01-01');
vendorCredit1.checkEftCompanyCode ="sample data1";
vendorCredit1.checkEftGlRefCode ="sample data1";
vendorCredit1.offsetFromAmt =123;
vendorCredit1.applyOffsetTo ="sample data1";
vendorCredit1.seqVendAdvPayAcc =123;
vendorCredit1.userDefined1 ="sample data1";
vendorCredit1.userDefined2 ="sample data1";
vendorCredit1.userDate1 =new Date('2010-01-01');
vendorCredit1.userDate2 =new Date('2010-01-01');
vendorCredit1.glMonth =new Date('2010-01-01');
vendorCredit1.applyCredit ="sample data1";
vendorCredit1.creditStatus ="sample data1";
vendorCredit1.denyReason ="sample data1";
vendorCredit1.approveUser ="sample data1";
vendorCredit1.approveDate =new Date('2010-01-01');
vendorCredit1.approveUserDefined1 ="sample data1";
vendorCredit1.approveUserDefined2 ="sample data1";
vendorCredit1.approveUserDate1 =new Date('2010-01-01');
vendorCredit1.approveUserDate2 =new Date('2010-01-01');
vendorCredit1.securityCode ="sample data1";
vendorCredit1.insertDatetime =new Date('2010-01-01');
vendorCredit1.insertUser ="sample data1";
vendorCredit1.insertProcess ="sample data1";
vendorCredit1.updateDatetime =new Date('2010-01-01');
vendorCredit1.updateUser ="sample data1";
vendorCredit1.updateProcess ="sample data1";

var vendorCredit2 = new VendorCredit();
vendorCredit2.seqVendCredit =123;
vendorCredit2.seqVendId =123;
vendorCredit2.seqVendAddress =123;
vendorCredit2.creditType ="sample data2";
vendorCredit2.seqVendAdvPayAccDtl =123;
vendorCredit2.creditReason ="sample data2";
vendorCredit2.checkEftType ="sample data2";
vendorCredit2.checkEftNumber ="sample data2";
vendorCredit2.checkEftDate =new Date('2010-01-01');
vendorCredit2.checkEftAmount =123;
vendorCredit2.checkEftReceivedDate =new Date('2010-01-01');
vendorCredit2.checkEftCompanyCode ="sample data2";
vendorCredit2.checkEftGlRefCode ="sample data2";
vendorCredit2.offsetFromAmt =123;
vendorCredit2.applyOffsetTo ="sample data2";
vendorCredit2.seqVendAdvPayAcc =123;
vendorCredit2.userDefined1 ="sample data2";
vendorCredit2.userDefined2 ="sample data2";
vendorCredit2.userDate1 =new Date('2010-01-01');
vendorCredit2.userDate2 =new Date('2010-01-01');
vendorCredit2.glMonth =new Date('2010-01-01');
vendorCredit2.applyCredit ="sample data2";
vendorCredit2.creditStatus ="sample data2";
vendorCredit2.denyReason ="sample data2";
vendorCredit2.approveUser ="sample data2";
vendorCredit2.approveDate =new Date('2010-01-01');
vendorCredit2.approveUserDefined1 ="sample data2";
vendorCredit2.approveUserDefined2 ="sample data2";
vendorCredit2.approveUserDate1 =new Date('2010-01-01');
vendorCredit2.approveUserDate2 =new Date('2010-01-01');
vendorCredit2.securityCode ="sample data2";
vendorCredit2.insertDatetime =new Date('2010-01-01');
vendorCredit2.insertUser ="sample data2";
vendorCredit2.insertProcess ="sample data2";
vendorCredit2.updateDatetime =new Date('2010-01-01');
vendorCredit2.updateUser ="sample data2";
vendorCredit2.updateProcess ="sample data2";

var vendorCredit3 = new VendorCredit();
vendorCredit3.seqVendCredit =123;
vendorCredit3.seqVendId =123;
vendorCredit3.seqVendAddress =123;
vendorCredit3.creditType ="sample data3";
vendorCredit3.seqVendAdvPayAccDtl =123;
vendorCredit3.creditReason ="sample data3";
vendorCredit3.checkEftType ="sample data3";
vendorCredit3.checkEftNumber ="sample data3";
vendorCredit3.checkEftDate =new Date('2010-01-01');
vendorCredit3.checkEftAmount =123;
vendorCredit3.checkEftReceivedDate =new Date('2010-01-01');
vendorCredit3.checkEftCompanyCode ="sample data3";
vendorCredit3.checkEftGlRefCode ="sample data3";
vendorCredit3.offsetFromAmt =123;
vendorCredit3.applyOffsetTo ="sample data3";
vendorCredit3.seqVendAdvPayAcc =123;
vendorCredit3.userDefined1 ="sample data3";
vendorCredit3.userDefined2 ="sample data3";
vendorCredit3.userDate1 =new Date('2010-01-01');
vendorCredit3.userDate2 =new Date('2010-01-01');
vendorCredit3.glMonth =new Date('2010-01-01');
vendorCredit3.applyCredit ="sample data3";
vendorCredit3.creditStatus ="sample data3";
vendorCredit3.denyReason ="sample data3";
vendorCredit3.approveUser ="sample data3";
vendorCredit3.approveDate =new Date('2010-01-01');
vendorCredit3.approveUserDefined1 ="sample data3";
vendorCredit3.approveUserDefined2 ="sample data3";
vendorCredit3.approveUserDate1 =new Date('2010-01-01');
vendorCredit3.approveUserDate2 =new Date('2010-01-01');
vendorCredit3.securityCode ="sample data3";
vendorCredit3.insertDatetime =new Date('2010-01-01');
vendorCredit3.insertUser ="sample data3";
vendorCredit3.insertProcess ="sample data3";
vendorCredit3.updateDatetime =new Date('2010-01-01');
vendorCredit3.updateUser ="sample data3";
vendorCredit3.updateProcess ="sample data3";


export const VendorCredits: VendorCredit[] = [
    vendorCredit1,
    vendorCredit2,
    vendorCredit3,
];