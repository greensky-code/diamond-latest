/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CheckRegister} from "../../api-models"

var checkRegister1 = new CheckRegister();
checkRegister1.bulkAmt =123;
checkRegister1.remittanceId =123;
checkRegister1.bulkPayInd ="sample data1";
checkRegister1.category ="sample data1";
checkRegister1.crossReference ="sample data1";
checkRegister1.statChngRsnCode ="sample data1";
checkRegister1.statChngDate =new Date('2010-01-01');
checkRegister1.manualCheckFlag ="sample data1";
checkRegister1.eftTransNumber ="sample data1";
checkRegister1.seqCkprtId =123;
checkRegister1.updateProcess ="sample data1";
checkRegister1.updateUser ="sample data1";
checkRegister1.updateDatetime =new Date('2010-01-01');
checkRegister1.insertProcess ="sample data1";
checkRegister1.insertUser ="sample data1";
checkRegister1.insertDatetime =new Date('2010-01-01');
checkRegister1.securityCode ="sample data1";
checkRegister1.comments ="sample data1";
checkRegister1.checkStatus ="sample data1";
checkRegister1.clearDate =new Date('2010-01-01');
checkRegister1.checkAmt =123;
checkRegister1.companyCode ="sample data1";
checkRegister1.seqVendAddress =123;
checkRegister1.seqVendId =123;
checkRegister1.checkDate =new Date('2010-01-01');
checkRegister1.checkNumber ="sample data1";
checkRegister1.bankAccountCode ="sample data1";

var checkRegister2 = new CheckRegister();
checkRegister2.bulkAmt =123;
checkRegister2.remittanceId =123;
checkRegister2.bulkPayInd ="sample data2";
checkRegister2.category ="sample data2";
checkRegister2.crossReference ="sample data2";
checkRegister2.statChngRsnCode ="sample data2";
checkRegister2.statChngDate =new Date('2010-01-01');
checkRegister2.manualCheckFlag ="sample data2";
checkRegister2.eftTransNumber ="sample data2";
checkRegister2.seqCkprtId =123;
checkRegister2.updateProcess ="sample data2";
checkRegister2.updateUser ="sample data2";
checkRegister2.updateDatetime =new Date('2010-01-01');
checkRegister2.insertProcess ="sample data2";
checkRegister2.insertUser ="sample data2";
checkRegister2.insertDatetime =new Date('2010-01-01');
checkRegister2.securityCode ="sample data2";
checkRegister2.comments ="sample data2";
checkRegister2.checkStatus ="sample data2";
checkRegister2.clearDate =new Date('2010-01-01');
checkRegister2.checkAmt =123;
checkRegister2.companyCode ="sample data2";
checkRegister2.seqVendAddress =123;
checkRegister2.seqVendId =123;
checkRegister2.checkDate =new Date('2010-01-01');
checkRegister2.checkNumber ="sample data2";
checkRegister2.bankAccountCode ="sample data2";

var checkRegister3 = new CheckRegister();
checkRegister3.bulkAmt =123;
checkRegister3.remittanceId =123;
checkRegister3.bulkPayInd ="sample data3";
checkRegister3.category ="sample data3";
checkRegister3.crossReference ="sample data3";
checkRegister3.statChngRsnCode ="sample data3";
checkRegister3.statChngDate =new Date('2010-01-01');
checkRegister3.manualCheckFlag ="sample data3";
checkRegister3.eftTransNumber ="sample data3";
checkRegister3.seqCkprtId =123;
checkRegister3.updateProcess ="sample data3";
checkRegister3.updateUser ="sample data3";
checkRegister3.updateDatetime =new Date('2010-01-01');
checkRegister3.insertProcess ="sample data3";
checkRegister3.insertUser ="sample data3";
checkRegister3.insertDatetime =new Date('2010-01-01');
checkRegister3.securityCode ="sample data3";
checkRegister3.comments ="sample data3";
checkRegister3.checkStatus ="sample data3";
checkRegister3.clearDate =new Date('2010-01-01');
checkRegister3.checkAmt =123;
checkRegister3.companyCode ="sample data3";
checkRegister3.seqVendAddress =123;
checkRegister3.seqVendId =123;
checkRegister3.checkDate =new Date('2010-01-01');
checkRegister3.checkNumber ="sample data3";
checkRegister3.bankAccountCode ="sample data3";


export const CheckRegisters: CheckRegister[] = [
    checkRegister1,
    checkRegister2,
    checkRegister3,
];