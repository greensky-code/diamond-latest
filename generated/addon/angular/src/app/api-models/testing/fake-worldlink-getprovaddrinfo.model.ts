/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { WorldlinkGetprovaddrinfo} from "../../api-models"

var worldlinkGetprovaddrinfo1 = new WorldlinkGetprovaddrinfo();
worldlinkGetprovaddrinfo1.pSeqClaimId =123;
worldlinkGetprovaddrinfo1.pDocCode ="sample data1";
worldlinkGetprovaddrinfo1.pCommentDesc ="sample data1";
worldlinkGetprovaddrinfo1.pTimestamp ="sample data1";
worldlinkGetprovaddrinfo1.pUser ="sample data1";
worldlinkGetprovaddrinfo1.pProcess ="sample data1";
worldlinkGetprovaddrinfo1.pPayeeName ="sample data1";
worldlinkGetprovaddrinfo1.pAddressLine1 ="sample data1";
worldlinkGetprovaddrinfo1.pAddressLine2 ="sample data1";
worldlinkGetprovaddrinfo1.pAddressLine3 ="sample data1";
worldlinkGetprovaddrinfo1.pCountryCode ="sample data1";
worldlinkGetprovaddrinfo1.pBankAddrFlg ="sample data1";
worldlinkGetprovaddrinfo1.pRoutingNum ="sample data1";
worldlinkGetprovaddrinfo1.pAccountNum ="sample data1";
worldlinkGetprovaddrinfo1.pBankName ="sample data1";

var worldlinkGetprovaddrinfo2 = new WorldlinkGetprovaddrinfo();
worldlinkGetprovaddrinfo2.pSeqClaimId =123;
worldlinkGetprovaddrinfo2.pDocCode ="sample data2";
worldlinkGetprovaddrinfo2.pCommentDesc ="sample data2";
worldlinkGetprovaddrinfo2.pTimestamp ="sample data2";
worldlinkGetprovaddrinfo2.pUser ="sample data2";
worldlinkGetprovaddrinfo2.pProcess ="sample data2";
worldlinkGetprovaddrinfo2.pPayeeName ="sample data2";
worldlinkGetprovaddrinfo2.pAddressLine1 ="sample data2";
worldlinkGetprovaddrinfo2.pAddressLine2 ="sample data2";
worldlinkGetprovaddrinfo2.pAddressLine3 ="sample data2";
worldlinkGetprovaddrinfo2.pCountryCode ="sample data2";
worldlinkGetprovaddrinfo2.pBankAddrFlg ="sample data2";
worldlinkGetprovaddrinfo2.pRoutingNum ="sample data2";
worldlinkGetprovaddrinfo2.pAccountNum ="sample data2";
worldlinkGetprovaddrinfo2.pBankName ="sample data2";

var worldlinkGetprovaddrinfo3 = new WorldlinkGetprovaddrinfo();
worldlinkGetprovaddrinfo3.pSeqClaimId =123;
worldlinkGetprovaddrinfo3.pDocCode ="sample data3";
worldlinkGetprovaddrinfo3.pCommentDesc ="sample data3";
worldlinkGetprovaddrinfo3.pTimestamp ="sample data3";
worldlinkGetprovaddrinfo3.pUser ="sample data3";
worldlinkGetprovaddrinfo3.pProcess ="sample data3";
worldlinkGetprovaddrinfo3.pPayeeName ="sample data3";
worldlinkGetprovaddrinfo3.pAddressLine1 ="sample data3";
worldlinkGetprovaddrinfo3.pAddressLine2 ="sample data3";
worldlinkGetprovaddrinfo3.pAddressLine3 ="sample data3";
worldlinkGetprovaddrinfo3.pCountryCode ="sample data3";
worldlinkGetprovaddrinfo3.pBankAddrFlg ="sample data3";
worldlinkGetprovaddrinfo3.pRoutingNum ="sample data3";
worldlinkGetprovaddrinfo3.pAccountNum ="sample data3";
worldlinkGetprovaddrinfo3.pBankName ="sample data3";


export const WorldlinkGetprovaddrinfos: WorldlinkGetprovaddrinfo[] = [
    worldlinkGetprovaddrinfo1,
    worldlinkGetprovaddrinfo2,
    worldlinkGetprovaddrinfo3,
];