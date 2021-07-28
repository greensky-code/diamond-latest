/* Copyright (c) 2020 . All Rights Reserved. */

import {BankAccount} from '../bank-account.model';
import {CompanyMaster} from '../company-master.model';
import {CheckPrintSetup} from './check-print-setup.model';
import {VendorMaster} from '../vendor-master.model';

export class    CheckRegister {
    bankAccountCode: string;
    checkNumber: string;
    checkDate: string;
    seqVendId: number;
    seqVendAddress: number;
    companyCode: string;
    checkAmt: number;
    clearDate: string;
    checkStatus: string;
    comments: string;
    securityCode: string;
    insertDatetime: string;
    insertUser: string;
    insertProcess: string;
    updateDatetime: string;
    updateUser: string;
    updateProcess: string;
    seqCkprtId: number;
    eftTransNumber: string;
    manualCheckFlag: string;
    statChngDate: string;
    statChngRsnCode: string;
    crossReference: string;
    category: string;
    bulkPayInd: string;
    remittanceId: number;
    bulkAmt: number;

    bankAccount?: BankAccount;
    companyMaster?: CompanyMaster;
    checkPrintSetup?: CheckPrintSetup;
    vendorMaster?: VendorMaster;
    checkRegisterPrimaryKey?;
}

export class CheckRegisterSearchModel {
    bankAccountCode: string;
    checkType: string;
    from: string;
    thru: string;
    paymentDate: string;
    remittanceId: string;
    checkStatus: string;
    vendorId: string;
}
