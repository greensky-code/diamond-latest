/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { LineOfBusinessMaster} from "../../api-models"

var lineOfBusinessMaster1 = new LineOfBusinessMaster();
lineOfBusinessMaster1.lineOfBusiness ="sample data1";
lineOfBusinessMaster1.description ="sample data1";
lineOfBusinessMaster1.name ="sample data1";
lineOfBusinessMaster1.addressLine1 ="sample data1";
lineOfBusinessMaster1.addressLine2 ="sample data1";
lineOfBusinessMaster1.city ="sample data1";
lineOfBusinessMaster1.state ="sample data1";
lineOfBusinessMaster1.zipCode ="sample data1";
lineOfBusinessMaster1.phoneNumber ="sample data1";
lineOfBusinessMaster1.faxNumber ="sample data1";
lineOfBusinessMaster1.pricePriorityRule ="sample data1";
lineOfBusinessMaster1.providerDefault =123;
lineOfBusinessMaster1.pcpRequired ="sample data1";
lineOfBusinessMaster1.eobPrintFlag ="sample data1";
lineOfBusinessMaster1.subDepEditSwitch ="sample data1";
lineOfBusinessMaster1.claimDupRule ="sample data1";
lineOfBusinessMaster1.securityCode ="sample data1";
lineOfBusinessMaster1.insertDatetime =new Date('2010-01-01');
lineOfBusinessMaster1.insertUser ="sample data1";
lineOfBusinessMaster1.insertProcess ="sample data1";
lineOfBusinessMaster1.updateDatetime =new Date('2010-01-01');
lineOfBusinessMaster1.updateUser ="sample data1";
lineOfBusinessMaster1.updateProcess ="sample data1";
lineOfBusinessMaster1.performAuthClaimMatch ="sample data1";
lineOfBusinessMaster1.authClaimMatchDaysBefore =123;
lineOfBusinessMaster1.authClaimMatchDaysAfter =123;
lineOfBusinessMaster1.coveringProvInd ="sample data1";
lineOfBusinessMaster1.country ="sample data1";
lineOfBusinessMaster1.inclmSwitch ="sample data1";
lineOfBusinessMaster1.performAuthWaive ="sample data1";
lineOfBusinessMaster1.authLevel ="sample data1";
lineOfBusinessMaster1.allowedGreaterThanBilled ="sample data1";
lineOfBusinessMaster1.targetRevCodeEditFlg ="sample data1";
lineOfBusinessMaster1.targetRevAction ="sample data1";
lineOfBusinessMaster1.targetRevReason ="sample data1";
lineOfBusinessMaster1.parReasonCode ="sample data1";
lineOfBusinessMaster1.nonParReasonCode ="sample data1";
lineOfBusinessMaster1.indPcpMaxEnrollLmt =123;
lineOfBusinessMaster1.indPcpThreshold =123;
lineOfBusinessMaster1.seqDefPcp =123;
lineOfBusinessMaster1.seqFailPcp =123;
lineOfBusinessMaster1.idcardReinstDays =123;
lineOfBusinessMaster1.familyAffiliation ="sample data1";
lineOfBusinessMaster1.useApcEditor ="sample data1";
lineOfBusinessMaster1.editType ="sample data1";
lineOfBusinessMaster1.useApcGrouper ="sample data1";
lineOfBusinessMaster1.grouperAction ="sample data1";
lineOfBusinessMaster1.grouperReasonCode ="sample data1";
lineOfBusinessMaster1.useApcPricer ="sample data1";
lineOfBusinessMaster1.pricerAction ="sample data1";
lineOfBusinessMaster1.pricerReasonCode ="sample data1";
lineOfBusinessMaster1.pricerNotCovReason ="sample data1";
lineOfBusinessMaster1.interestDeterminant ="sample data1";
lineOfBusinessMaster1.useResetDateFlag ="sample data1";
lineOfBusinessMaster1.intDscntPaySub ="sample data1";
lineOfBusinessMaster1.calcIntDscnt ="sample data1";
lineOfBusinessMaster1.applyUncleanInd ="sample data1";
lineOfBusinessMaster1.userDefined1 ="sample data1";
lineOfBusinessMaster1.userDefined2 ="sample data1";
lineOfBusinessMaster1.userDate1 =new Date('2010-01-01');
lineOfBusinessMaster1.userDate2 =new Date('2010-01-01');
lineOfBusinessMaster1.waiveMatchOrder ="sample data1";
lineOfBusinessMaster1.certifiedFlg ="sample data1";
lineOfBusinessMaster1.ageFrom =123;
lineOfBusinessMaster1.ageThrough =123;
lineOfBusinessMaster1.siteFlg ="sample data1";
lineOfBusinessMaster1.mcIndicator ="sample data1";
lineOfBusinessMaster1.dateOfDeathRule ="sample data1";
lineOfBusinessMaster1.penApplyUncleanInd ="sample data1";

var lineOfBusinessMaster2 = new LineOfBusinessMaster();
lineOfBusinessMaster2.lineOfBusiness ="sample data2";
lineOfBusinessMaster2.description ="sample data2";
lineOfBusinessMaster2.name ="sample data2";
lineOfBusinessMaster2.addressLine1 ="sample data2";
lineOfBusinessMaster2.addressLine2 ="sample data2";
lineOfBusinessMaster2.city ="sample data2";
lineOfBusinessMaster2.state ="sample data2";
lineOfBusinessMaster2.zipCode ="sample data2";
lineOfBusinessMaster2.phoneNumber ="sample data2";
lineOfBusinessMaster2.faxNumber ="sample data2";
lineOfBusinessMaster2.pricePriorityRule ="sample data2";
lineOfBusinessMaster2.providerDefault =123;
lineOfBusinessMaster2.pcpRequired ="sample data2";
lineOfBusinessMaster2.eobPrintFlag ="sample data2";
lineOfBusinessMaster2.subDepEditSwitch ="sample data2";
lineOfBusinessMaster2.claimDupRule ="sample data2";
lineOfBusinessMaster2.securityCode ="sample data2";
lineOfBusinessMaster2.insertDatetime =new Date('2010-01-01');
lineOfBusinessMaster2.insertUser ="sample data2";
lineOfBusinessMaster2.insertProcess ="sample data2";
lineOfBusinessMaster2.updateDatetime =new Date('2010-01-01');
lineOfBusinessMaster2.updateUser ="sample data2";
lineOfBusinessMaster2.updateProcess ="sample data2";
lineOfBusinessMaster2.performAuthClaimMatch ="sample data2";
lineOfBusinessMaster2.authClaimMatchDaysBefore =123;
lineOfBusinessMaster2.authClaimMatchDaysAfter =123;
lineOfBusinessMaster2.coveringProvInd ="sample data2";
lineOfBusinessMaster2.country ="sample data2";
lineOfBusinessMaster2.inclmSwitch ="sample data2";
lineOfBusinessMaster2.performAuthWaive ="sample data2";
lineOfBusinessMaster2.authLevel ="sample data2";
lineOfBusinessMaster2.allowedGreaterThanBilled ="sample data2";
lineOfBusinessMaster2.targetRevCodeEditFlg ="sample data2";
lineOfBusinessMaster2.targetRevAction ="sample data2";
lineOfBusinessMaster2.targetRevReason ="sample data2";
lineOfBusinessMaster2.parReasonCode ="sample data2";
lineOfBusinessMaster2.nonParReasonCode ="sample data2";
lineOfBusinessMaster2.indPcpMaxEnrollLmt =123;
lineOfBusinessMaster2.indPcpThreshold =123;
lineOfBusinessMaster2.seqDefPcp =123;
lineOfBusinessMaster2.seqFailPcp =123;
lineOfBusinessMaster2.idcardReinstDays =123;
lineOfBusinessMaster2.familyAffiliation ="sample data2";
lineOfBusinessMaster2.useApcEditor ="sample data2";
lineOfBusinessMaster2.editType ="sample data2";
lineOfBusinessMaster2.useApcGrouper ="sample data2";
lineOfBusinessMaster2.grouperAction ="sample data2";
lineOfBusinessMaster2.grouperReasonCode ="sample data2";
lineOfBusinessMaster2.useApcPricer ="sample data2";
lineOfBusinessMaster2.pricerAction ="sample data2";
lineOfBusinessMaster2.pricerReasonCode ="sample data2";
lineOfBusinessMaster2.pricerNotCovReason ="sample data2";
lineOfBusinessMaster2.interestDeterminant ="sample data2";
lineOfBusinessMaster2.useResetDateFlag ="sample data2";
lineOfBusinessMaster2.intDscntPaySub ="sample data2";
lineOfBusinessMaster2.calcIntDscnt ="sample data2";
lineOfBusinessMaster2.applyUncleanInd ="sample data2";
lineOfBusinessMaster2.userDefined1 ="sample data2";
lineOfBusinessMaster2.userDefined2 ="sample data2";
lineOfBusinessMaster2.userDate1 =new Date('2010-01-01');
lineOfBusinessMaster2.userDate2 =new Date('2010-01-01');
lineOfBusinessMaster2.waiveMatchOrder ="sample data2";
lineOfBusinessMaster2.certifiedFlg ="sample data2";
lineOfBusinessMaster2.ageFrom =123;
lineOfBusinessMaster2.ageThrough =123;
lineOfBusinessMaster2.siteFlg ="sample data2";
lineOfBusinessMaster2.mcIndicator ="sample data2";
lineOfBusinessMaster2.dateOfDeathRule ="sample data2";
lineOfBusinessMaster2.penApplyUncleanInd ="sample data2";

var lineOfBusinessMaster3 = new LineOfBusinessMaster();
lineOfBusinessMaster3.lineOfBusiness ="sample data3";
lineOfBusinessMaster3.description ="sample data3";
lineOfBusinessMaster3.name ="sample data3";
lineOfBusinessMaster3.addressLine1 ="sample data3";
lineOfBusinessMaster3.addressLine2 ="sample data3";
lineOfBusinessMaster3.city ="sample data3";
lineOfBusinessMaster3.state ="sample data3";
lineOfBusinessMaster3.zipCode ="sample data3";
lineOfBusinessMaster3.phoneNumber ="sample data3";
lineOfBusinessMaster3.faxNumber ="sample data3";
lineOfBusinessMaster3.pricePriorityRule ="sample data3";
lineOfBusinessMaster3.providerDefault =123;
lineOfBusinessMaster3.pcpRequired ="sample data3";
lineOfBusinessMaster3.eobPrintFlag ="sample data3";
lineOfBusinessMaster3.subDepEditSwitch ="sample data3";
lineOfBusinessMaster3.claimDupRule ="sample data3";
lineOfBusinessMaster3.securityCode ="sample data3";
lineOfBusinessMaster3.insertDatetime =new Date('2010-01-01');
lineOfBusinessMaster3.insertUser ="sample data3";
lineOfBusinessMaster3.insertProcess ="sample data3";
lineOfBusinessMaster3.updateDatetime =new Date('2010-01-01');
lineOfBusinessMaster3.updateUser ="sample data3";
lineOfBusinessMaster3.updateProcess ="sample data3";
lineOfBusinessMaster3.performAuthClaimMatch ="sample data3";
lineOfBusinessMaster3.authClaimMatchDaysBefore =123;
lineOfBusinessMaster3.authClaimMatchDaysAfter =123;
lineOfBusinessMaster3.coveringProvInd ="sample data3";
lineOfBusinessMaster3.country ="sample data3";
lineOfBusinessMaster3.inclmSwitch ="sample data3";
lineOfBusinessMaster3.performAuthWaive ="sample data3";
lineOfBusinessMaster3.authLevel ="sample data3";
lineOfBusinessMaster3.allowedGreaterThanBilled ="sample data3";
lineOfBusinessMaster3.targetRevCodeEditFlg ="sample data3";
lineOfBusinessMaster3.targetRevAction ="sample data3";
lineOfBusinessMaster3.targetRevReason ="sample data3";
lineOfBusinessMaster3.parReasonCode ="sample data3";
lineOfBusinessMaster3.nonParReasonCode ="sample data3";
lineOfBusinessMaster3.indPcpMaxEnrollLmt =123;
lineOfBusinessMaster3.indPcpThreshold =123;
lineOfBusinessMaster3.seqDefPcp =123;
lineOfBusinessMaster3.seqFailPcp =123;
lineOfBusinessMaster3.idcardReinstDays =123;
lineOfBusinessMaster3.familyAffiliation ="sample data3";
lineOfBusinessMaster3.useApcEditor ="sample data3";
lineOfBusinessMaster3.editType ="sample data3";
lineOfBusinessMaster3.useApcGrouper ="sample data3";
lineOfBusinessMaster3.grouperAction ="sample data3";
lineOfBusinessMaster3.grouperReasonCode ="sample data3";
lineOfBusinessMaster3.useApcPricer ="sample data3";
lineOfBusinessMaster3.pricerAction ="sample data3";
lineOfBusinessMaster3.pricerReasonCode ="sample data3";
lineOfBusinessMaster3.pricerNotCovReason ="sample data3";
lineOfBusinessMaster3.interestDeterminant ="sample data3";
lineOfBusinessMaster3.useResetDateFlag ="sample data3";
lineOfBusinessMaster3.intDscntPaySub ="sample data3";
lineOfBusinessMaster3.calcIntDscnt ="sample data3";
lineOfBusinessMaster3.applyUncleanInd ="sample data3";
lineOfBusinessMaster3.userDefined1 ="sample data3";
lineOfBusinessMaster3.userDefined2 ="sample data3";
lineOfBusinessMaster3.userDate1 =new Date('2010-01-01');
lineOfBusinessMaster3.userDate2 =new Date('2010-01-01');
lineOfBusinessMaster3.waiveMatchOrder ="sample data3";
lineOfBusinessMaster3.certifiedFlg ="sample data3";
lineOfBusinessMaster3.ageFrom =123;
lineOfBusinessMaster3.ageThrough =123;
lineOfBusinessMaster3.siteFlg ="sample data3";
lineOfBusinessMaster3.mcIndicator ="sample data3";
lineOfBusinessMaster3.dateOfDeathRule ="sample data3";
lineOfBusinessMaster3.penApplyUncleanInd ="sample data3";


export const LinesOfBusinessMaster: LineOfBusinessMaster[] = [
    lineOfBusinessMaster1,
    lineOfBusinessMaster2,
    lineOfBusinessMaster3,
];