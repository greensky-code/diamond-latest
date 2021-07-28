/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { PaybaseGetprovaddrinfo} from "../../api-models"

var paybaseGetprovaddrinfo1 = new PaybaseGetprovaddrinfo();
paybaseGetprovaddrinfo1.pSeqClaimId =123;
paybaseGetprovaddrinfo1.pDocCode ="sample data1";
paybaseGetprovaddrinfo1.pCommentDesc ="sample data1";
paybaseGetprovaddrinfo1.pTimestamp ="sample data1";
paybaseGetprovaddrinfo1.pUser ="sample data1";
paybaseGetprovaddrinfo1.pProcess ="sample data1";
paybaseGetprovaddrinfo1.pPayeeName ="sample data1";
paybaseGetprovaddrinfo1.pAddressLine1 ="sample data1";
paybaseGetprovaddrinfo1.pAddressLine2 ="sample data1";
paybaseGetprovaddrinfo1.pAddressLine3 ="sample data1";
paybaseGetprovaddrinfo1.pCountryCode ="sample data1";
paybaseGetprovaddrinfo1.pBankAddrFlg ="sample data1";
paybaseGetprovaddrinfo1.pRoutingNum ="sample data1";
paybaseGetprovaddrinfo1.pAccountNum ="sample data1";
paybaseGetprovaddrinfo1.pBankName ="sample data1";

var paybaseGetprovaddrinfo2 = new PaybaseGetprovaddrinfo();
paybaseGetprovaddrinfo2.pSeqClaimId =123;
paybaseGetprovaddrinfo2.pDocCode ="sample data2";
paybaseGetprovaddrinfo2.pCommentDesc ="sample data2";
paybaseGetprovaddrinfo2.pTimestamp ="sample data2";
paybaseGetprovaddrinfo2.pUser ="sample data2";
paybaseGetprovaddrinfo2.pProcess ="sample data2";
paybaseGetprovaddrinfo2.pPayeeName ="sample data2";
paybaseGetprovaddrinfo2.pAddressLine1 ="sample data2";
paybaseGetprovaddrinfo2.pAddressLine2 ="sample data2";
paybaseGetprovaddrinfo2.pAddressLine3 ="sample data2";
paybaseGetprovaddrinfo2.pCountryCode ="sample data2";
paybaseGetprovaddrinfo2.pBankAddrFlg ="sample data2";
paybaseGetprovaddrinfo2.pRoutingNum ="sample data2";
paybaseGetprovaddrinfo2.pAccountNum ="sample data2";
paybaseGetprovaddrinfo2.pBankName ="sample data2";

var paybaseGetprovaddrinfo3 = new PaybaseGetprovaddrinfo();
paybaseGetprovaddrinfo3.pSeqClaimId =123;
paybaseGetprovaddrinfo3.pDocCode ="sample data3";
paybaseGetprovaddrinfo3.pCommentDesc ="sample data3";
paybaseGetprovaddrinfo3.pTimestamp ="sample data3";
paybaseGetprovaddrinfo3.pUser ="sample data3";
paybaseGetprovaddrinfo3.pProcess ="sample data3";
paybaseGetprovaddrinfo3.pPayeeName ="sample data3";
paybaseGetprovaddrinfo3.pAddressLine1 ="sample data3";
paybaseGetprovaddrinfo3.pAddressLine2 ="sample data3";
paybaseGetprovaddrinfo3.pAddressLine3 ="sample data3";
paybaseGetprovaddrinfo3.pCountryCode ="sample data3";
paybaseGetprovaddrinfo3.pBankAddrFlg ="sample data3";
paybaseGetprovaddrinfo3.pRoutingNum ="sample data3";
paybaseGetprovaddrinfo3.pAccountNum ="sample data3";
paybaseGetprovaddrinfo3.pBankName ="sample data3";


export const PaybaseGetprovaddrinfos: PaybaseGetprovaddrinfo[] = [
    paybaseGetprovaddrinfo1,
    paybaseGetprovaddrinfo2,
    paybaseGetprovaddrinfo3,
];