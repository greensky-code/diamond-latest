/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcUpdPharmacyPartnerInd} from "../../api-models"

var procUpdPharmacyPartnerInd1 = new ProcUpdPharmacyPartnerInd();
procUpdPharmacyPartnerInd1.pGroupId ="sample data1";
procUpdPharmacyPartnerInd1.pPartnerInd ="sample data1";
procUpdPharmacyPartnerInd1.poRetcode =123;
procUpdPharmacyPartnerInd1.poRetmsg ="sample data1";

var procUpdPharmacyPartnerInd2 = new ProcUpdPharmacyPartnerInd();
procUpdPharmacyPartnerInd2.pGroupId ="sample data2";
procUpdPharmacyPartnerInd2.pPartnerInd ="sample data2";
procUpdPharmacyPartnerInd2.poRetcode =123;
procUpdPharmacyPartnerInd2.poRetmsg ="sample data2";

var procUpdPharmacyPartnerInd3 = new ProcUpdPharmacyPartnerInd();
procUpdPharmacyPartnerInd3.pGroupId ="sample data3";
procUpdPharmacyPartnerInd3.pPartnerInd ="sample data3";
procUpdPharmacyPartnerInd3.poRetcode =123;
procUpdPharmacyPartnerInd3.poRetmsg ="sample data3";


export const ProcUpdPharmacyPartnerInds: ProcUpdPharmacyPartnerInd[] = [
    procUpdPharmacyPartnerInd1,
    procUpdPharmacyPartnerInd2,
    procUpdPharmacyPartnerInd3,
];