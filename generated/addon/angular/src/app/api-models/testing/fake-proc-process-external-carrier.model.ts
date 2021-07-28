/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProcProcessExternalCarrier} from "../../api-models"

var procProcessExternalCarrier1 = new ProcProcessExternalCarrier();
procProcessExternalCarrier1.pGroupId ="sample data1";
procProcessExternalCarrier1.pPlanCode ="sample data1";
procProcessExternalCarrier1.pPlanEffDate ="sample data1";
procProcessExternalCarrier1.pPlanEndDate ="sample data1";
procProcessExternalCarrier1.pExtnCarrGroupId ="sample data1";
procProcessExternalCarrier1.pProductType ="sample data1";
procProcessExternalCarrier1.pExtnCarrName ="sample data1";
procProcessExternalCarrier1.pExtnCarrId ="sample data1";
procProcessExternalCarrier1.pSharMethod ="sample data1";
procProcessExternalCarrier1.pSharBenType ="sample data1";

var procProcessExternalCarrier2 = new ProcProcessExternalCarrier();
procProcessExternalCarrier2.pGroupId ="sample data2";
procProcessExternalCarrier2.pPlanCode ="sample data2";
procProcessExternalCarrier2.pPlanEffDate ="sample data2";
procProcessExternalCarrier2.pPlanEndDate ="sample data2";
procProcessExternalCarrier2.pExtnCarrGroupId ="sample data2";
procProcessExternalCarrier2.pProductType ="sample data2";
procProcessExternalCarrier2.pExtnCarrName ="sample data2";
procProcessExternalCarrier2.pExtnCarrId ="sample data2";
procProcessExternalCarrier2.pSharMethod ="sample data2";
procProcessExternalCarrier2.pSharBenType ="sample data2";

var procProcessExternalCarrier3 = new ProcProcessExternalCarrier();
procProcessExternalCarrier3.pGroupId ="sample data3";
procProcessExternalCarrier3.pPlanCode ="sample data3";
procProcessExternalCarrier3.pPlanEffDate ="sample data3";
procProcessExternalCarrier3.pPlanEndDate ="sample data3";
procProcessExternalCarrier3.pExtnCarrGroupId ="sample data3";
procProcessExternalCarrier3.pProductType ="sample data3";
procProcessExternalCarrier3.pExtnCarrName ="sample data3";
procProcessExternalCarrier3.pExtnCarrId ="sample data3";
procProcessExternalCarrier3.pSharMethod ="sample data3";
procProcessExternalCarrier3.pSharBenType ="sample data3";


export const ProcProcessExternalCarriers: ProcProcessExternalCarrier[] = [
    procProcessExternalCarrier1,
    procProcessExternalCarrier2,
    procProcessExternalCarrier3,
];