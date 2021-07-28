/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcAddGroupFiling} from "../../api-models"

var procAddGroupFiling1 = new ProcAddGroupFiling();
procAddGroupFiling1.pGroupId ="sample data1";
procAddGroupFiling1.pSeqGrpfilingId =123;
procAddGroupFiling1.pFilingType ="sample data1";
procAddGroupFiling1.pSitusState ="sample data1";
procAddGroupFiling1.pEffectiveDate ="sample data1";
procAddGroupFiling1.pTermDate ="sample data1";
procAddGroupFiling1.pChangeReason ="sample data1";
procAddGroupFiling1.pApplyToSubgroup ="sample data1";
procAddGroupFiling1.pUser ="sample data1";
procAddGroupFiling1.pError ="sample data1";

var procAddGroupFiling2 = new ProcAddGroupFiling();
procAddGroupFiling2.pGroupId ="sample data2";
procAddGroupFiling2.pSeqGrpfilingId =123;
procAddGroupFiling2.pFilingType ="sample data2";
procAddGroupFiling2.pSitusState ="sample data2";
procAddGroupFiling2.pEffectiveDate ="sample data2";
procAddGroupFiling2.pTermDate ="sample data2";
procAddGroupFiling2.pChangeReason ="sample data2";
procAddGroupFiling2.pApplyToSubgroup ="sample data2";
procAddGroupFiling2.pUser ="sample data2";
procAddGroupFiling2.pError ="sample data2";

var procAddGroupFiling3 = new ProcAddGroupFiling();
procAddGroupFiling3.pGroupId ="sample data3";
procAddGroupFiling3.pSeqGrpfilingId =123;
procAddGroupFiling3.pFilingType ="sample data3";
procAddGroupFiling3.pSitusState ="sample data3";
procAddGroupFiling3.pEffectiveDate ="sample data3";
procAddGroupFiling3.pTermDate ="sample data3";
procAddGroupFiling3.pChangeReason ="sample data3";
procAddGroupFiling3.pApplyToSubgroup ="sample data3";
procAddGroupFiling3.pUser ="sample data3";
procAddGroupFiling3.pError ="sample data3";


export const ProcAddGroupFilings: ProcAddGroupFiling[] = [
    procAddGroupFiling1,
    procAddGroupFiling2,
    procAddGroupFiling3,
];