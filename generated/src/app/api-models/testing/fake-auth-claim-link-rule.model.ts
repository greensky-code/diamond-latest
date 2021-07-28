/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthClaimLinkRule} from "../../api-models"

var authClaimLinkRule1 = new AuthClaimLinkRule();
authClaimLinkRule1.lineOfBusiness ="sample data1";
authClaimLinkRule1.seqAuthType =123;
authClaimLinkRule1.authClosedStatus ="sample data1";
authClaimLinkRule1.authClosedReason ="sample data1";
authClaimLinkRule1.authNewStatus ="sample data1";
authClaimLinkRule1.authNewReason ="sample data1";
authClaimLinkRule1.authHeldStatus ="sample data1";
authClaimLinkRule1.authHeldReason ="sample data1";
authClaimLinkRule1.authDeniedStatus ="sample data1";
authClaimLinkRule1.authDeniedReason ="sample data1";
authClaimLinkRule1.authExpiredStatus ="sample data1";
authClaimLinkRule1.authExpiredReason ="sample data1";
authClaimLinkRule1.authQuantityExceededStatus ="sample data1";
authClaimLinkRule1.authQuantityExceededReason ="sample data1";
authClaimLinkRule1.authCostExceededStatus ="sample data1";
authClaimLinkRule1.authCostExceededReason ="sample data1";
authClaimLinkRule1.authDateStatus ="sample data1";
authClaimLinkRule1.authDateReason ="sample data1";
authClaimLinkRule1.authSecOpReqStatus ="sample data1";
authClaimLinkRule1.authSecOpReqReason ="sample data1";
authClaimLinkRule1.authGroupPlanStatus ="sample data1";
authClaimLinkRule1.authGroupPlanReason ="sample data1";
authClaimLinkRule1.securityCode ="sample data1";
authClaimLinkRule1.insertDatetime =new Date('2010-01-01');
authClaimLinkRule1.insertUser ="sample data1";
authClaimLinkRule1.insertProcess ="sample data1";
authClaimLinkRule1.updateDatetime =new Date('2010-01-01');
authClaimLinkRule1.updateUser ="sample data1";
authClaimLinkRule1.updateProcess ="sample data1";

var authClaimLinkRule2 = new AuthClaimLinkRule();
authClaimLinkRule2.lineOfBusiness ="sample data2";
authClaimLinkRule2.seqAuthType =123;
authClaimLinkRule2.authClosedStatus ="sample data2";
authClaimLinkRule2.authClosedReason ="sample data2";
authClaimLinkRule2.authNewStatus ="sample data2";
authClaimLinkRule2.authNewReason ="sample data2";
authClaimLinkRule2.authHeldStatus ="sample data2";
authClaimLinkRule2.authHeldReason ="sample data2";
authClaimLinkRule2.authDeniedStatus ="sample data2";
authClaimLinkRule2.authDeniedReason ="sample data2";
authClaimLinkRule2.authExpiredStatus ="sample data2";
authClaimLinkRule2.authExpiredReason ="sample data2";
authClaimLinkRule2.authQuantityExceededStatus ="sample data2";
authClaimLinkRule2.authQuantityExceededReason ="sample data2";
authClaimLinkRule2.authCostExceededStatus ="sample data2";
authClaimLinkRule2.authCostExceededReason ="sample data2";
authClaimLinkRule2.authDateStatus ="sample data2";
authClaimLinkRule2.authDateReason ="sample data2";
authClaimLinkRule2.authSecOpReqStatus ="sample data2";
authClaimLinkRule2.authSecOpReqReason ="sample data2";
authClaimLinkRule2.authGroupPlanStatus ="sample data2";
authClaimLinkRule2.authGroupPlanReason ="sample data2";
authClaimLinkRule2.securityCode ="sample data2";
authClaimLinkRule2.insertDatetime =new Date('2010-01-01');
authClaimLinkRule2.insertUser ="sample data2";
authClaimLinkRule2.insertProcess ="sample data2";
authClaimLinkRule2.updateDatetime =new Date('2010-01-01');
authClaimLinkRule2.updateUser ="sample data2";
authClaimLinkRule2.updateProcess ="sample data2";

var authClaimLinkRule3 = new AuthClaimLinkRule();
authClaimLinkRule3.lineOfBusiness ="sample data3";
authClaimLinkRule3.seqAuthType =123;
authClaimLinkRule3.authClosedStatus ="sample data3";
authClaimLinkRule3.authClosedReason ="sample data3";
authClaimLinkRule3.authNewStatus ="sample data3";
authClaimLinkRule3.authNewReason ="sample data3";
authClaimLinkRule3.authHeldStatus ="sample data3";
authClaimLinkRule3.authHeldReason ="sample data3";
authClaimLinkRule3.authDeniedStatus ="sample data3";
authClaimLinkRule3.authDeniedReason ="sample data3";
authClaimLinkRule3.authExpiredStatus ="sample data3";
authClaimLinkRule3.authExpiredReason ="sample data3";
authClaimLinkRule3.authQuantityExceededStatus ="sample data3";
authClaimLinkRule3.authQuantityExceededReason ="sample data3";
authClaimLinkRule3.authCostExceededStatus ="sample data3";
authClaimLinkRule3.authCostExceededReason ="sample data3";
authClaimLinkRule3.authDateStatus ="sample data3";
authClaimLinkRule3.authDateReason ="sample data3";
authClaimLinkRule3.authSecOpReqStatus ="sample data3";
authClaimLinkRule3.authSecOpReqReason ="sample data3";
authClaimLinkRule3.authGroupPlanStatus ="sample data3";
authClaimLinkRule3.authGroupPlanReason ="sample data3";
authClaimLinkRule3.securityCode ="sample data3";
authClaimLinkRule3.insertDatetime =new Date('2010-01-01');
authClaimLinkRule3.insertUser ="sample data3";
authClaimLinkRule3.insertProcess ="sample data3";
authClaimLinkRule3.updateDatetime =new Date('2010-01-01');
authClaimLinkRule3.updateUser ="sample data3";
authClaimLinkRule3.updateProcess ="sample data3";


export const AuthClaimLinkRules: AuthClaimLinkRule[] = [
    authClaimLinkRule1,
    authClaimLinkRule2,
    authClaimLinkRule3,
];