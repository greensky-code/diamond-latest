/* Copyright (c) 2020 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimBenefitAccum} from "../../api-models"

var claimBenefitAccum1 = new ClaimBenefitAccum();
claimBenefitAccum1.seqAccumId =123;
claimBenefitAccum1.seqMembId =123;
claimBenefitAccum1.seqSubsId =123;
claimBenefitAccum1.seqGroupId =123;
claimBenefitAccum1.ruleId ="sample data1";
claimBenefitAccum1.benefitPackageId ="sample data1";
claimBenefitAccum1.detailSvcDate =new Date('2010-01-01');
claimBenefitAccum1.seqClaimId =123;
claimBenefitAccum1.lineNumber =123;
claimBenefitAccum1.subLineCode ="sample data1";
claimBenefitAccum1.claimAmt =123;
claimBenefitAccum1.claimQty =123;
claimBenefitAccum1.relationshipCode ="sample data1";
claimBenefitAccum1.insertDatetime =new Date('2010-01-01');
claimBenefitAccum1.insertUser ="sample data1";
claimBenefitAccum1.insertProcess ="sample data1";
claimBenefitAccum1.updateDatetime =new Date('2010-01-01');
claimBenefitAccum1.updateUser ="sample data1";
claimBenefitAccum1.updateProcess ="sample data1";
claimBenefitAccum1.fileType ="sample data1";
claimBenefitAccum1.admitDate =new Date('2010-01-01');
claimBenefitAccum1.dischargeDate =new Date('2010-01-01');
claimBenefitAccum1.benAccumClaimInd ="sample data1";
claimBenefitAccum1.seqBenPackage =123;
claimBenefitAccum1.weightedQty =123;
claimBenefitAccum1.seqProvId =123;
claimBenefitAccum1.compareDates ="sample data1";
claimBenefitAccum1.userDefined1 ="sample data1";

var claimBenefitAccum2 = new ClaimBenefitAccum();
claimBenefitAccum2.seqAccumId =123;
claimBenefitAccum2.seqMembId =123;
claimBenefitAccum2.seqSubsId =123;
claimBenefitAccum2.seqGroupId =123;
claimBenefitAccum2.ruleId ="sample data2";
claimBenefitAccum2.benefitPackageId ="sample data2";
claimBenefitAccum2.detailSvcDate =new Date('2010-01-01');
claimBenefitAccum2.seqClaimId =123;
claimBenefitAccum2.lineNumber =123;
claimBenefitAccum2.subLineCode ="sample data2";
claimBenefitAccum2.claimAmt =123;
claimBenefitAccum2.claimQty =123;
claimBenefitAccum2.relationshipCode ="sample data2";
claimBenefitAccum2.insertDatetime =new Date('2010-01-01');
claimBenefitAccum2.insertUser ="sample data2";
claimBenefitAccum2.insertProcess ="sample data2";
claimBenefitAccum2.updateDatetime =new Date('2010-01-01');
claimBenefitAccum2.updateUser ="sample data2";
claimBenefitAccum2.updateProcess ="sample data2";
claimBenefitAccum2.fileType ="sample data2";
claimBenefitAccum2.admitDate =new Date('2010-01-01');
claimBenefitAccum2.dischargeDate =new Date('2010-01-01');
claimBenefitAccum2.benAccumClaimInd ="sample data2";
claimBenefitAccum2.seqBenPackage =123;
claimBenefitAccum2.weightedQty =123;
claimBenefitAccum2.seqProvId =123;
claimBenefitAccum2.compareDates ="sample data2";
claimBenefitAccum2.userDefined1 ="sample data2";

var claimBenefitAccum3 = new ClaimBenefitAccum();
claimBenefitAccum3.seqAccumId =123;
claimBenefitAccum3.seqMembId =123;
claimBenefitAccum3.seqSubsId =123;
claimBenefitAccum3.seqGroupId =123;
claimBenefitAccum3.ruleId ="sample data3";
claimBenefitAccum3.benefitPackageId ="sample data3";
claimBenefitAccum3.detailSvcDate =new Date('2010-01-01');
claimBenefitAccum3.seqClaimId =123;
claimBenefitAccum3.lineNumber =123;
claimBenefitAccum3.subLineCode ="sample data3";
claimBenefitAccum3.claimAmt =123;
claimBenefitAccum3.claimQty =123;
claimBenefitAccum3.relationshipCode ="sample data3";
claimBenefitAccum3.insertDatetime =new Date('2010-01-01');
claimBenefitAccum3.insertUser ="sample data3";
claimBenefitAccum3.insertProcess ="sample data3";
claimBenefitAccum3.updateDatetime =new Date('2010-01-01');
claimBenefitAccum3.updateUser ="sample data3";
claimBenefitAccum3.updateProcess ="sample data3";
claimBenefitAccum3.fileType ="sample data3";
claimBenefitAccum3.admitDate =new Date('2010-01-01');
claimBenefitAccum3.dischargeDate =new Date('2010-01-01');
claimBenefitAccum3.benAccumClaimInd ="sample data3";
claimBenefitAccum3.seqBenPackage =123;
claimBenefitAccum3.weightedQty =123;
claimBenefitAccum3.seqProvId =123;
claimBenefitAccum3.compareDates ="sample data3";
claimBenefitAccum3.userDefined1 ="sample data3";


export const ClaimBenefitAccums: ClaimBenefitAccum[] = [
    claimBenefitAccum1,
    claimBenefitAccum2,
    claimBenefitAccum3,
];