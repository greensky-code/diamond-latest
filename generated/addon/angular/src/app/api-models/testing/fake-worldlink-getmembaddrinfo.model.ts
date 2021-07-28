/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { WorldlinkGetmembaddrinfo} from "../../api-models"

var worldlinkGetmembaddrinfo1 = new WorldlinkGetmembaddrinfo();
worldlinkGetmembaddrinfo1.pSeqClaimId =123;
worldlinkGetmembaddrinfo1.pDocCode ="sample data1";
worldlinkGetmembaddrinfo1.pCommentDesc ="sample data1";
worldlinkGetmembaddrinfo1.pTimestamp ="sample data1";
worldlinkGetmembaddrinfo1.pUser ="sample data1";
worldlinkGetmembaddrinfo1.pProcess ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine1 ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine2 ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine3 ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine4 ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine5 ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine6 ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine7 ="sample data1";
worldlinkGetmembaddrinfo1.pAddressLine8 ="sample data1";
worldlinkGetmembaddrinfo1.pBankName ="sample data1";
worldlinkGetmembaddrinfo1.pRoutingNum ="sample data1";
worldlinkGetmembaddrinfo1.pAccountNum ="sample data1";
worldlinkGetmembaddrinfo1.pBankAccountCode ="sample data1";
worldlinkGetmembaddrinfo1.pEftStatusCode ="sample data1";
worldlinkGetmembaddrinfo1.pPaymentAdviceCode ="sample data1";
worldlinkGetmembaddrinfo1.pEmailAddress ="sample data1";
worldlinkGetmembaddrinfo1.pFaxNum ="sample data1";
worldlinkGetmembaddrinfo1.pPaymentCode ="sample data1";
worldlinkGetmembaddrinfo1.pCountryCode ="sample data1";
worldlinkGetmembaddrinfo1.pPayeeName ="sample data1";
worldlinkGetmembaddrinfo1.pAddrId =123;
worldlinkGetmembaddrinfo1.pAddrSource ="sample data1";

var worldlinkGetmembaddrinfo2 = new WorldlinkGetmembaddrinfo();
worldlinkGetmembaddrinfo2.pSeqClaimId =123;
worldlinkGetmembaddrinfo2.pDocCode ="sample data2";
worldlinkGetmembaddrinfo2.pCommentDesc ="sample data2";
worldlinkGetmembaddrinfo2.pTimestamp ="sample data2";
worldlinkGetmembaddrinfo2.pUser ="sample data2";
worldlinkGetmembaddrinfo2.pProcess ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine1 ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine2 ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine3 ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine4 ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine5 ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine6 ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine7 ="sample data2";
worldlinkGetmembaddrinfo2.pAddressLine8 ="sample data2";
worldlinkGetmembaddrinfo2.pBankName ="sample data2";
worldlinkGetmembaddrinfo2.pRoutingNum ="sample data2";
worldlinkGetmembaddrinfo2.pAccountNum ="sample data2";
worldlinkGetmembaddrinfo2.pBankAccountCode ="sample data2";
worldlinkGetmembaddrinfo2.pEftStatusCode ="sample data2";
worldlinkGetmembaddrinfo2.pPaymentAdviceCode ="sample data2";
worldlinkGetmembaddrinfo2.pEmailAddress ="sample data2";
worldlinkGetmembaddrinfo2.pFaxNum ="sample data2";
worldlinkGetmembaddrinfo2.pPaymentCode ="sample data2";
worldlinkGetmembaddrinfo2.pCountryCode ="sample data2";
worldlinkGetmembaddrinfo2.pPayeeName ="sample data2";
worldlinkGetmembaddrinfo2.pAddrId =123;
worldlinkGetmembaddrinfo2.pAddrSource ="sample data2";

var worldlinkGetmembaddrinfo3 = new WorldlinkGetmembaddrinfo();
worldlinkGetmembaddrinfo3.pSeqClaimId =123;
worldlinkGetmembaddrinfo3.pDocCode ="sample data3";
worldlinkGetmembaddrinfo3.pCommentDesc ="sample data3";
worldlinkGetmembaddrinfo3.pTimestamp ="sample data3";
worldlinkGetmembaddrinfo3.pUser ="sample data3";
worldlinkGetmembaddrinfo3.pProcess ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine1 ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine2 ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine3 ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine4 ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine5 ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine6 ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine7 ="sample data3";
worldlinkGetmembaddrinfo3.pAddressLine8 ="sample data3";
worldlinkGetmembaddrinfo3.pBankName ="sample data3";
worldlinkGetmembaddrinfo3.pRoutingNum ="sample data3";
worldlinkGetmembaddrinfo3.pAccountNum ="sample data3";
worldlinkGetmembaddrinfo3.pBankAccountCode ="sample data3";
worldlinkGetmembaddrinfo3.pEftStatusCode ="sample data3";
worldlinkGetmembaddrinfo3.pPaymentAdviceCode ="sample data3";
worldlinkGetmembaddrinfo3.pEmailAddress ="sample data3";
worldlinkGetmembaddrinfo3.pFaxNum ="sample data3";
worldlinkGetmembaddrinfo3.pPaymentCode ="sample data3";
worldlinkGetmembaddrinfo3.pCountryCode ="sample data3";
worldlinkGetmembaddrinfo3.pPayeeName ="sample data3";
worldlinkGetmembaddrinfo3.pAddrId =123;
worldlinkGetmembaddrinfo3.pAddrSource ="sample data3";


export const WorldlinkGetmembaddrinfos: WorldlinkGetmembaddrinfo[] = [
    worldlinkGetmembaddrinfo1,
    worldlinkGetmembaddrinfo2,
    worldlinkGetmembaddrinfo3,
];