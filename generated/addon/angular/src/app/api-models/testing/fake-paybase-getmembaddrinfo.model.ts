/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PaybaseGetmembaddrinfo} from "../../api-models"

var paybaseGetmembaddrinfo1 = new PaybaseGetmembaddrinfo();
paybaseGetmembaddrinfo1.pSeqClaimId =123;
paybaseGetmembaddrinfo1.pDocCode ="sample data1";
paybaseGetmembaddrinfo1.pCommentDesc ="sample data1";
paybaseGetmembaddrinfo1.pTimestamp ="sample data1";
paybaseGetmembaddrinfo1.pUser ="sample data1";
paybaseGetmembaddrinfo1.pProcess ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine1 ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine2 ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine3 ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine4 ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine5 ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine6 ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine7 ="sample data1";
paybaseGetmembaddrinfo1.pAddressLine8 ="sample data1";
paybaseGetmembaddrinfo1.pBankName ="sample data1";
paybaseGetmembaddrinfo1.pRoutingNum ="sample data1";
paybaseGetmembaddrinfo1.pAccountNum ="sample data1";
paybaseGetmembaddrinfo1.pBankAccountCode ="sample data1";
paybaseGetmembaddrinfo1.pEftStatusCode ="sample data1";
paybaseGetmembaddrinfo1.pPaymentAdviceCode ="sample data1";
paybaseGetmembaddrinfo1.pEmailAddress ="sample data1";
paybaseGetmembaddrinfo1.pFaxNum ="sample data1";
paybaseGetmembaddrinfo1.pPaymentCode ="sample data1";
paybaseGetmembaddrinfo1.pCountryCode ="sample data1";
paybaseGetmembaddrinfo1.pPayeeName ="sample data1";

var paybaseGetmembaddrinfo2 = new PaybaseGetmembaddrinfo();
paybaseGetmembaddrinfo2.pSeqClaimId =123;
paybaseGetmembaddrinfo2.pDocCode ="sample data2";
paybaseGetmembaddrinfo2.pCommentDesc ="sample data2";
paybaseGetmembaddrinfo2.pTimestamp ="sample data2";
paybaseGetmembaddrinfo2.pUser ="sample data2";
paybaseGetmembaddrinfo2.pProcess ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine1 ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine2 ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine3 ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine4 ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine5 ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine6 ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine7 ="sample data2";
paybaseGetmembaddrinfo2.pAddressLine8 ="sample data2";
paybaseGetmembaddrinfo2.pBankName ="sample data2";
paybaseGetmembaddrinfo2.pRoutingNum ="sample data2";
paybaseGetmembaddrinfo2.pAccountNum ="sample data2";
paybaseGetmembaddrinfo2.pBankAccountCode ="sample data2";
paybaseGetmembaddrinfo2.pEftStatusCode ="sample data2";
paybaseGetmembaddrinfo2.pPaymentAdviceCode ="sample data2";
paybaseGetmembaddrinfo2.pEmailAddress ="sample data2";
paybaseGetmembaddrinfo2.pFaxNum ="sample data2";
paybaseGetmembaddrinfo2.pPaymentCode ="sample data2";
paybaseGetmembaddrinfo2.pCountryCode ="sample data2";
paybaseGetmembaddrinfo2.pPayeeName ="sample data2";

var paybaseGetmembaddrinfo3 = new PaybaseGetmembaddrinfo();
paybaseGetmembaddrinfo3.pSeqClaimId =123;
paybaseGetmembaddrinfo3.pDocCode ="sample data3";
paybaseGetmembaddrinfo3.pCommentDesc ="sample data3";
paybaseGetmembaddrinfo3.pTimestamp ="sample data3";
paybaseGetmembaddrinfo3.pUser ="sample data3";
paybaseGetmembaddrinfo3.pProcess ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine1 ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine2 ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine3 ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine4 ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine5 ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine6 ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine7 ="sample data3";
paybaseGetmembaddrinfo3.pAddressLine8 ="sample data3";
paybaseGetmembaddrinfo3.pBankName ="sample data3";
paybaseGetmembaddrinfo3.pRoutingNum ="sample data3";
paybaseGetmembaddrinfo3.pAccountNum ="sample data3";
paybaseGetmembaddrinfo3.pBankAccountCode ="sample data3";
paybaseGetmembaddrinfo3.pEftStatusCode ="sample data3";
paybaseGetmembaddrinfo3.pPaymentAdviceCode ="sample data3";
paybaseGetmembaddrinfo3.pEmailAddress ="sample data3";
paybaseGetmembaddrinfo3.pFaxNum ="sample data3";
paybaseGetmembaddrinfo3.pPaymentCode ="sample data3";
paybaseGetmembaddrinfo3.pCountryCode ="sample data3";
paybaseGetmembaddrinfo3.pPayeeName ="sample data3";


export const PaybaseGetmembaddrinfos: PaybaseGetmembaddrinfo[] = [
    paybaseGetmembaddrinfo1,
    paybaseGetmembaddrinfo2,
    paybaseGetmembaddrinfo3,
];