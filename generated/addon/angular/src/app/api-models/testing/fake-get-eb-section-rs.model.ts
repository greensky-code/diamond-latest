/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { GetEbSectionRs} from "../../api-models"

var getEbSectionRs1 = new GetEbSectionRs();
getEbSectionRs1.pPackageId ="sample data1";
getEbSectionRs1.pSeqMembId =123;
getEbSectionRs1.pSeqSubsId =123;
getEbSectionRs1.pSeqGroupId =123;
getEbSectionRs1.pDob ="sample data1";
getEbSectionRs1.pReqStcInforList ="sample data1";
getEbSectionRs1.pMedCovgStatus ="sample data1";
getEbSectionRs1.pDenCovgStatus ="sample data1";
getEbSectionRs1.pVisCovgStatus ="sample data1";
getEbSectionRs1.pSvcStartDt ="sample data1";
getEbSectionRs1.pContrPlanStartDt ="sample data1";
getEbSectionRs1.pContrPlanEndDt ="sample data1";
getEbSectionRs1.pPlanName ="sample data1";

var getEbSectionRs2 = new GetEbSectionRs();
getEbSectionRs2.pPackageId ="sample data2";
getEbSectionRs2.pSeqMembId =123;
getEbSectionRs2.pSeqSubsId =123;
getEbSectionRs2.pSeqGroupId =123;
getEbSectionRs2.pDob ="sample data2";
getEbSectionRs2.pReqStcInforList ="sample data2";
getEbSectionRs2.pMedCovgStatus ="sample data2";
getEbSectionRs2.pDenCovgStatus ="sample data2";
getEbSectionRs2.pVisCovgStatus ="sample data2";
getEbSectionRs2.pSvcStartDt ="sample data2";
getEbSectionRs2.pContrPlanStartDt ="sample data2";
getEbSectionRs2.pContrPlanEndDt ="sample data2";
getEbSectionRs2.pPlanName ="sample data2";

var getEbSectionRs3 = new GetEbSectionRs();
getEbSectionRs3.pPackageId ="sample data3";
getEbSectionRs3.pSeqMembId =123;
getEbSectionRs3.pSeqSubsId =123;
getEbSectionRs3.pSeqGroupId =123;
getEbSectionRs3.pDob ="sample data3";
getEbSectionRs3.pReqStcInforList ="sample data3";
getEbSectionRs3.pMedCovgStatus ="sample data3";
getEbSectionRs3.pDenCovgStatus ="sample data3";
getEbSectionRs3.pVisCovgStatus ="sample data3";
getEbSectionRs3.pSvcStartDt ="sample data3";
getEbSectionRs3.pContrPlanStartDt ="sample data3";
getEbSectionRs3.pContrPlanEndDt ="sample data3";
getEbSectionRs3.pPlanName ="sample data3";


export const GetEbSectionR: GetEbSectionRs[] = [
    getEbSectionRs1,
    getEbSectionRs2,
    getEbSectionRs3,
];