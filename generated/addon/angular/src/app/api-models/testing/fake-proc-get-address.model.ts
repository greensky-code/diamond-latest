/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcGetAddress} from "../../api-models"

var procGetAddress1 = new ProcGetAddress();
procGetAddress1.pSeqMembId =123;
procGetAddress1.pSeqSubsId =123;
procGetAddress1.pSubInd ="sample data1";
procGetAddress1.pRestrictInd ="sample data1";
procGetAddress1.addr1 ="sample data1";
procGetAddress1.addr2 ="sample data1";
procGetAddress1.city ="sample data1";
procGetAddress1.state ="sample data1";
procGetAddress1.zipcode ="sample data1";
procGetAddress1.pAddressError ="sample data1";
procGetAddress1.pFalloutReason ="sample data1";

var procGetAddress2 = new ProcGetAddress();
procGetAddress2.pSeqMembId =123;
procGetAddress2.pSeqSubsId =123;
procGetAddress2.pSubInd ="sample data2";
procGetAddress2.pRestrictInd ="sample data2";
procGetAddress2.addr1 ="sample data2";
procGetAddress2.addr2 ="sample data2";
procGetAddress2.city ="sample data2";
procGetAddress2.state ="sample data2";
procGetAddress2.zipcode ="sample data2";
procGetAddress2.pAddressError ="sample data2";
procGetAddress2.pFalloutReason ="sample data2";

var procGetAddress3 = new ProcGetAddress();
procGetAddress3.pSeqMembId =123;
procGetAddress3.pSeqSubsId =123;
procGetAddress3.pSubInd ="sample data3";
procGetAddress3.pRestrictInd ="sample data3";
procGetAddress3.addr1 ="sample data3";
procGetAddress3.addr2 ="sample data3";
procGetAddress3.city ="sample data3";
procGetAddress3.state ="sample data3";
procGetAddress3.zipcode ="sample data3";
procGetAddress3.pAddressError ="sample data3";
procGetAddress3.pFalloutReason ="sample data3";


export const ProcGetAddresses: ProcGetAddress[] = [
    procGetAddress1,
    procGetAddress2,
    procGetAddress3,
];