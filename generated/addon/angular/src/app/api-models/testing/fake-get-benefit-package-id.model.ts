/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetBenefitPackageId} from "../../api-models"

var getBenefitPackageId1 = new GetBenefitPackageId();
getBenefitPackageId1.pSeqGroupId =123;
getBenefitPackageId1.pPlanCode ="sample data1";
getBenefitPackageId1.pSvcStartDt ="sample data1";

var getBenefitPackageId2 = new GetBenefitPackageId();
getBenefitPackageId2.pSeqGroupId =123;
getBenefitPackageId2.pPlanCode ="sample data2";
getBenefitPackageId2.pSvcStartDt ="sample data2";

var getBenefitPackageId3 = new GetBenefitPackageId();
getBenefitPackageId3.pSeqGroupId =123;
getBenefitPackageId3.pPlanCode ="sample data3";
getBenefitPackageId3.pSvcStartDt ="sample data3";


export const GetBenefitPackageIds: GetBenefitPackageId[] = [
    getBenefitPackageId1,
    getBenefitPackageId2,
    getBenefitPackageId3,
];