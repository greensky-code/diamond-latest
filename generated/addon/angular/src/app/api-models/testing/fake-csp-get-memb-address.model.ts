/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { CspGetMembAddress} from "../../api-models"

var cspGetMembAddress1 = new CspGetMembAddress();
cspGetMembAddress1.pSeqEntityId =123;
cspGetMembAddress1.pSeqClaimId =123;
cspGetMembAddress1.pDocCode ="sample data1";
cspGetMembAddress1.pAddressLine1 ="sample data1";
cspGetMembAddress1.pAddressLine2 ="sample data1";
cspGetMembAddress1.pAddressLine3 ="sample data1";
cspGetMembAddress1.pAddressLine4 ="sample data1";
cspGetMembAddress1.pAddressLine5 ="sample data1";
cspGetMembAddress1.pAddressLine6 ="sample data1";
cspGetMembAddress1.pAddressLine7 ="sample data1";
cspGetMembAddress1.pAddressLine8 ="sample data1";
cspGetMembAddress1.pBankName ="sample data1";
cspGetMembAddress1.pRoutingNum ="sample data1";
cspGetMembAddress1.pAccountNum ="sample data1";
cspGetMembAddress1.pBankAccountCode ="sample data1";
cspGetMembAddress1.pEftStatusCode ="sample data1";
cspGetMembAddress1.pPaymentAdviceCode ="sample data1";
cspGetMembAddress1.pEmailAddress ="sample data1";
cspGetMembAddress1.pFaxNum ="sample data1";
cspGetMembAddress1.pPaymentCode ="sample data1";
cspGetMembAddress1.pCountryCode ="sample data1";
cspGetMembAddress1.pAddrId =123;
cspGetMembAddress1.pAddrSource ="sample data1";
cspGetMembAddress1.pUser ="sample data1";

var cspGetMembAddress2 = new CspGetMembAddress();
cspGetMembAddress2.pSeqEntityId =123;
cspGetMembAddress2.pSeqClaimId =123;
cspGetMembAddress2.pDocCode ="sample data2";
cspGetMembAddress2.pAddressLine1 ="sample data2";
cspGetMembAddress2.pAddressLine2 ="sample data2";
cspGetMembAddress2.pAddressLine3 ="sample data2";
cspGetMembAddress2.pAddressLine4 ="sample data2";
cspGetMembAddress2.pAddressLine5 ="sample data2";
cspGetMembAddress2.pAddressLine6 ="sample data2";
cspGetMembAddress2.pAddressLine7 ="sample data2";
cspGetMembAddress2.pAddressLine8 ="sample data2";
cspGetMembAddress2.pBankName ="sample data2";
cspGetMembAddress2.pRoutingNum ="sample data2";
cspGetMembAddress2.pAccountNum ="sample data2";
cspGetMembAddress2.pBankAccountCode ="sample data2";
cspGetMembAddress2.pEftStatusCode ="sample data2";
cspGetMembAddress2.pPaymentAdviceCode ="sample data2";
cspGetMembAddress2.pEmailAddress ="sample data2";
cspGetMembAddress2.pFaxNum ="sample data2";
cspGetMembAddress2.pPaymentCode ="sample data2";
cspGetMembAddress2.pCountryCode ="sample data2";
cspGetMembAddress2.pAddrId =123;
cspGetMembAddress2.pAddrSource ="sample data2";
cspGetMembAddress2.pUser ="sample data2";

var cspGetMembAddress3 = new CspGetMembAddress();
cspGetMembAddress3.pSeqEntityId =123;
cspGetMembAddress3.pSeqClaimId =123;
cspGetMembAddress3.pDocCode ="sample data3";
cspGetMembAddress3.pAddressLine1 ="sample data3";
cspGetMembAddress3.pAddressLine2 ="sample data3";
cspGetMembAddress3.pAddressLine3 ="sample data3";
cspGetMembAddress3.pAddressLine4 ="sample data3";
cspGetMembAddress3.pAddressLine5 ="sample data3";
cspGetMembAddress3.pAddressLine6 ="sample data3";
cspGetMembAddress3.pAddressLine7 ="sample data3";
cspGetMembAddress3.pAddressLine8 ="sample data3";
cspGetMembAddress3.pBankName ="sample data3";
cspGetMembAddress3.pRoutingNum ="sample data3";
cspGetMembAddress3.pAccountNum ="sample data3";
cspGetMembAddress3.pBankAccountCode ="sample data3";
cspGetMembAddress3.pEftStatusCode ="sample data3";
cspGetMembAddress3.pPaymentAdviceCode ="sample data3";
cspGetMembAddress3.pEmailAddress ="sample data3";
cspGetMembAddress3.pFaxNum ="sample data3";
cspGetMembAddress3.pPaymentCode ="sample data3";
cspGetMembAddress3.pCountryCode ="sample data3";
cspGetMembAddress3.pAddrId =123;
cspGetMembAddress3.pAddrSource ="sample data3";
cspGetMembAddress3.pUser ="sample data3";


export const CspGetMembAddresses: CspGetMembAddress[] = [
    cspGetMembAddress1,
    cspGetMembAddress2,
    cspGetMembAddress3,
];