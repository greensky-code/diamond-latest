/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProfsvcClaimDetailEdiW} from "../../api-models"

var profsvcClaimDetailEdiW1 = new ProfsvcClaimDetailEdiW();
profsvcClaimDetailEdiW1.familyPlanningIndicator ="sample data1";
profsvcClaimDetailEdiW1.epsdt ="sample data1";
profsvcClaimDetailEdiW1.withholdSurplus =123;
profsvcClaimDetailEdiW1.hcpcsModifier4 ="sample data1";
profsvcClaimDetailEdiW1.hcpcsModifier3 ="sample data1";
profsvcClaimDetailEdiW1.hcpcsModifier2 ="sample data1";
profsvcClaimDetailEdiW1.diagCodePointer4 ="sample data1";
profsvcClaimDetailEdiW1.diagCodePointer3 ="sample data1";
profsvcClaimDetailEdiW1.diagCodePointer2 ="sample data1";
profsvcClaimDetailEdiW1.reservedLocalUseDet ="sample data1";
profsvcClaimDetailEdiW1.cobIndicator ="sample data1";
profsvcClaimDetailEdiW1.emergencyServicesInd ="sample data1";
profsvcClaimDetailEdiW1.epsdtFamilyPlanningInd ="sample data1";
profsvcClaimDetailEdiW1.placeOfService ="sample data1";
profsvcClaimDetailEdiW1.svcToDate =new Date('2010-01-01');
profsvcClaimDetailEdiW1.recInd ="sample data1";
profsvcClaimDetailEdiW1.ediStatus ="sample data1";
profsvcClaimDetailEdiW1.originalClaimNumber ="sample data1";
profsvcClaimDetailEdiW1.typeOfService ="sample data1";
profsvcClaimDetailEdiW1.updateProcess ="sample data1";
profsvcClaimDetailEdiW1.updateUser ="sample data1";
profsvcClaimDetailEdiW1.updateDatetime =new Date('2010-01-01');
profsvcClaimDetailEdiW1.insertProcess ="sample data1";
profsvcClaimDetailEdiW1.insertUser ="sample data1";
profsvcClaimDetailEdiW1.insertDatetime =new Date('2010-01-01');
profsvcClaimDetailEdiW1.securityCode ="sample data1";
profsvcClaimDetailEdiW1.anesTotalTime =123;
profsvcClaimDetailEdiW1.anesEndTime =123;
profsvcClaimDetailEdiW1.anesStartTime =123;
profsvcClaimDetailEdiW1.hiddenUserDef2 =123;
profsvcClaimDetailEdiW1.hiddenUserDef1 ="sample data1";
profsvcClaimDetailEdiW1.seqAuthDetail =123;
profsvcClaimDetailEdiW1.seqApTrans =123;
profsvcClaimDetailEdiW1.raId ="sample data1";
profsvcClaimDetailEdiW1.eobId ="sample data1";
profsvcClaimDetailEdiW1.printFlag ="sample data1";
profsvcClaimDetailEdiW1.glRefCode ="sample data1";
profsvcClaimDetailEdiW1.companyCode ="sample data1";
profsvcClaimDetailEdiW1.checkDate =new Date('2010-01-01');
profsvcClaimDetailEdiW1.postDate =new Date('2010-01-01');
profsvcClaimDetailEdiW1.medDefCode ="sample data1";
profsvcClaimDetailEdiW1.adjudicationMethod ="sample data1";
profsvcClaimDetailEdiW1.processingStatus ="sample data1";
profsvcClaimDetailEdiW1.claimStatus ="sample data1";
profsvcClaimDetailEdiW1.holdReason3 ="sample data1";
profsvcClaimDetailEdiW1.holdReason2 ="sample data1";
profsvcClaimDetailEdiW1.holdReason1 ="sample data1";
profsvcClaimDetailEdiW1.otherCarrierRsn ="sample data1";
profsvcClaimDetailEdiW1.adjustmentReason ="sample data1";
profsvcClaimDetailEdiW1.deductibleReason ="sample data1";
profsvcClaimDetailEdiW1.copay2Reason ="sample data1";
profsvcClaimDetailEdiW1.copay1Reason ="sample data1";
profsvcClaimDetailEdiW1.notCoveredReason ="sample data1";
profsvcClaimDetailEdiW1.allowedReason ="sample data1";
profsvcClaimDetailEdiW1.netAmt =123;
profsvcClaimDetailEdiW1.withholdAmt =123;
profsvcClaimDetailEdiW1.otherCarrierAmt =123;
profsvcClaimDetailEdiW1.deductibleAmt =123;
profsvcClaimDetailEdiW1.copayment2Amt =123;
profsvcClaimDetailEdiW1.copayment1Amt =123;
profsvcClaimDetailEdiW1.notCoveredAmt =123;
profsvcClaimDetailEdiW1.allowedAmt =123;
profsvcClaimDetailEdiW1.allowedFactor =123;
profsvcClaimDetailEdiW1.billedAmt =123;
profsvcClaimDetailEdiW1.quantity =123;
profsvcClaimDetailEdiW1.procedureModifier ="sample data1";
profsvcClaimDetailEdiW1.procedureCode ="sample data1";
profsvcClaimDetailEdiW1.billedAllowedAmt =123;
profsvcClaimDetailEdiW1.billedModifier ="sample data1";
profsvcClaimDetailEdiW1.billedProcedure ="sample data1";
profsvcClaimDetailEdiW1.seqMembId =123;
profsvcClaimDetailEdiW1.seqProvId =123;
profsvcClaimDetailEdiW1.placeServPointer =123;
profsvcClaimDetailEdiW1.diagnosisPointer =123;
profsvcClaimDetailEdiW1.detailSvcDate =new Date('2010-01-01');
profsvcClaimDetailEdiW1.subLineCode ="sample data1";
profsvcClaimDetailEdiW1.lineNumber =123;
profsvcClaimDetailEdiW1.claimNumber ="sample data1";
profsvcClaimDetailEdiW1.seqClaimId =123;
profsvcClaimDetailEdiW1.seqPrediId =123;

var profsvcClaimDetailEdiW2 = new ProfsvcClaimDetailEdiW();
profsvcClaimDetailEdiW2.familyPlanningIndicator ="sample data2";
profsvcClaimDetailEdiW2.epsdt ="sample data2";
profsvcClaimDetailEdiW2.withholdSurplus =123;
profsvcClaimDetailEdiW2.hcpcsModifier4 ="sample data2";
profsvcClaimDetailEdiW2.hcpcsModifier3 ="sample data2";
profsvcClaimDetailEdiW2.hcpcsModifier2 ="sample data2";
profsvcClaimDetailEdiW2.diagCodePointer4 ="sample data2";
profsvcClaimDetailEdiW2.diagCodePointer3 ="sample data2";
profsvcClaimDetailEdiW2.diagCodePointer2 ="sample data2";
profsvcClaimDetailEdiW2.reservedLocalUseDet ="sample data2";
profsvcClaimDetailEdiW2.cobIndicator ="sample data2";
profsvcClaimDetailEdiW2.emergencyServicesInd ="sample data2";
profsvcClaimDetailEdiW2.epsdtFamilyPlanningInd ="sample data2";
profsvcClaimDetailEdiW2.placeOfService ="sample data2";
profsvcClaimDetailEdiW2.svcToDate =new Date('2010-01-01');
profsvcClaimDetailEdiW2.recInd ="sample data2";
profsvcClaimDetailEdiW2.ediStatus ="sample data2";
profsvcClaimDetailEdiW2.originalClaimNumber ="sample data2";
profsvcClaimDetailEdiW2.typeOfService ="sample data2";
profsvcClaimDetailEdiW2.updateProcess ="sample data2";
profsvcClaimDetailEdiW2.updateUser ="sample data2";
profsvcClaimDetailEdiW2.updateDatetime =new Date('2010-01-01');
profsvcClaimDetailEdiW2.insertProcess ="sample data2";
profsvcClaimDetailEdiW2.insertUser ="sample data2";
profsvcClaimDetailEdiW2.insertDatetime =new Date('2010-01-01');
profsvcClaimDetailEdiW2.securityCode ="sample data2";
profsvcClaimDetailEdiW2.anesTotalTime =123;
profsvcClaimDetailEdiW2.anesEndTime =123;
profsvcClaimDetailEdiW2.anesStartTime =123;
profsvcClaimDetailEdiW2.hiddenUserDef2 =123;
profsvcClaimDetailEdiW2.hiddenUserDef1 ="sample data2";
profsvcClaimDetailEdiW2.seqAuthDetail =123;
profsvcClaimDetailEdiW2.seqApTrans =123;
profsvcClaimDetailEdiW2.raId ="sample data2";
profsvcClaimDetailEdiW2.eobId ="sample data2";
profsvcClaimDetailEdiW2.printFlag ="sample data2";
profsvcClaimDetailEdiW2.glRefCode ="sample data2";
profsvcClaimDetailEdiW2.companyCode ="sample data2";
profsvcClaimDetailEdiW2.checkDate =new Date('2010-01-01');
profsvcClaimDetailEdiW2.postDate =new Date('2010-01-01');
profsvcClaimDetailEdiW2.medDefCode ="sample data2";
profsvcClaimDetailEdiW2.adjudicationMethod ="sample data2";
profsvcClaimDetailEdiW2.processingStatus ="sample data2";
profsvcClaimDetailEdiW2.claimStatus ="sample data2";
profsvcClaimDetailEdiW2.holdReason3 ="sample data2";
profsvcClaimDetailEdiW2.holdReason2 ="sample data2";
profsvcClaimDetailEdiW2.holdReason1 ="sample data2";
profsvcClaimDetailEdiW2.otherCarrierRsn ="sample data2";
profsvcClaimDetailEdiW2.adjustmentReason ="sample data2";
profsvcClaimDetailEdiW2.deductibleReason ="sample data2";
profsvcClaimDetailEdiW2.copay2Reason ="sample data2";
profsvcClaimDetailEdiW2.copay1Reason ="sample data2";
profsvcClaimDetailEdiW2.notCoveredReason ="sample data2";
profsvcClaimDetailEdiW2.allowedReason ="sample data2";
profsvcClaimDetailEdiW2.netAmt =123;
profsvcClaimDetailEdiW2.withholdAmt =123;
profsvcClaimDetailEdiW2.otherCarrierAmt =123;
profsvcClaimDetailEdiW2.deductibleAmt =123;
profsvcClaimDetailEdiW2.copayment2Amt =123;
profsvcClaimDetailEdiW2.copayment1Amt =123;
profsvcClaimDetailEdiW2.notCoveredAmt =123;
profsvcClaimDetailEdiW2.allowedAmt =123;
profsvcClaimDetailEdiW2.allowedFactor =123;
profsvcClaimDetailEdiW2.billedAmt =123;
profsvcClaimDetailEdiW2.quantity =123;
profsvcClaimDetailEdiW2.procedureModifier ="sample data2";
profsvcClaimDetailEdiW2.procedureCode ="sample data2";
profsvcClaimDetailEdiW2.billedAllowedAmt =123;
profsvcClaimDetailEdiW2.billedModifier ="sample data2";
profsvcClaimDetailEdiW2.billedProcedure ="sample data2";
profsvcClaimDetailEdiW2.seqMembId =123;
profsvcClaimDetailEdiW2.seqProvId =123;
profsvcClaimDetailEdiW2.placeServPointer =123;
profsvcClaimDetailEdiW2.diagnosisPointer =123;
profsvcClaimDetailEdiW2.detailSvcDate =new Date('2010-01-01');
profsvcClaimDetailEdiW2.subLineCode ="sample data2";
profsvcClaimDetailEdiW2.lineNumber =123;
profsvcClaimDetailEdiW2.claimNumber ="sample data2";
profsvcClaimDetailEdiW2.seqClaimId =123;
profsvcClaimDetailEdiW2.seqPrediId =123;

var profsvcClaimDetailEdiW3 = new ProfsvcClaimDetailEdiW();
profsvcClaimDetailEdiW3.familyPlanningIndicator ="sample data3";
profsvcClaimDetailEdiW3.epsdt ="sample data3";
profsvcClaimDetailEdiW3.withholdSurplus =123;
profsvcClaimDetailEdiW3.hcpcsModifier4 ="sample data3";
profsvcClaimDetailEdiW3.hcpcsModifier3 ="sample data3";
profsvcClaimDetailEdiW3.hcpcsModifier2 ="sample data3";
profsvcClaimDetailEdiW3.diagCodePointer4 ="sample data3";
profsvcClaimDetailEdiW3.diagCodePointer3 ="sample data3";
profsvcClaimDetailEdiW3.diagCodePointer2 ="sample data3";
profsvcClaimDetailEdiW3.reservedLocalUseDet ="sample data3";
profsvcClaimDetailEdiW3.cobIndicator ="sample data3";
profsvcClaimDetailEdiW3.emergencyServicesInd ="sample data3";
profsvcClaimDetailEdiW3.epsdtFamilyPlanningInd ="sample data3";
profsvcClaimDetailEdiW3.placeOfService ="sample data3";
profsvcClaimDetailEdiW3.svcToDate =new Date('2010-01-01');
profsvcClaimDetailEdiW3.recInd ="sample data3";
profsvcClaimDetailEdiW3.ediStatus ="sample data3";
profsvcClaimDetailEdiW3.originalClaimNumber ="sample data3";
profsvcClaimDetailEdiW3.typeOfService ="sample data3";
profsvcClaimDetailEdiW3.updateProcess ="sample data3";
profsvcClaimDetailEdiW3.updateUser ="sample data3";
profsvcClaimDetailEdiW3.updateDatetime =new Date('2010-01-01');
profsvcClaimDetailEdiW3.insertProcess ="sample data3";
profsvcClaimDetailEdiW3.insertUser ="sample data3";
profsvcClaimDetailEdiW3.insertDatetime =new Date('2010-01-01');
profsvcClaimDetailEdiW3.securityCode ="sample data3";
profsvcClaimDetailEdiW3.anesTotalTime =123;
profsvcClaimDetailEdiW3.anesEndTime =123;
profsvcClaimDetailEdiW3.anesStartTime =123;
profsvcClaimDetailEdiW3.hiddenUserDef2 =123;
profsvcClaimDetailEdiW3.hiddenUserDef1 ="sample data3";
profsvcClaimDetailEdiW3.seqAuthDetail =123;
profsvcClaimDetailEdiW3.seqApTrans =123;
profsvcClaimDetailEdiW3.raId ="sample data3";
profsvcClaimDetailEdiW3.eobId ="sample data3";
profsvcClaimDetailEdiW3.printFlag ="sample data3";
profsvcClaimDetailEdiW3.glRefCode ="sample data3";
profsvcClaimDetailEdiW3.companyCode ="sample data3";
profsvcClaimDetailEdiW3.checkDate =new Date('2010-01-01');
profsvcClaimDetailEdiW3.postDate =new Date('2010-01-01');
profsvcClaimDetailEdiW3.medDefCode ="sample data3";
profsvcClaimDetailEdiW3.adjudicationMethod ="sample data3";
profsvcClaimDetailEdiW3.processingStatus ="sample data3";
profsvcClaimDetailEdiW3.claimStatus ="sample data3";
profsvcClaimDetailEdiW3.holdReason3 ="sample data3";
profsvcClaimDetailEdiW3.holdReason2 ="sample data3";
profsvcClaimDetailEdiW3.holdReason1 ="sample data3";
profsvcClaimDetailEdiW3.otherCarrierRsn ="sample data3";
profsvcClaimDetailEdiW3.adjustmentReason ="sample data3";
profsvcClaimDetailEdiW3.deductibleReason ="sample data3";
profsvcClaimDetailEdiW3.copay2Reason ="sample data3";
profsvcClaimDetailEdiW3.copay1Reason ="sample data3";
profsvcClaimDetailEdiW3.notCoveredReason ="sample data3";
profsvcClaimDetailEdiW3.allowedReason ="sample data3";
profsvcClaimDetailEdiW3.netAmt =123;
profsvcClaimDetailEdiW3.withholdAmt =123;
profsvcClaimDetailEdiW3.otherCarrierAmt =123;
profsvcClaimDetailEdiW3.deductibleAmt =123;
profsvcClaimDetailEdiW3.copayment2Amt =123;
profsvcClaimDetailEdiW3.copayment1Amt =123;
profsvcClaimDetailEdiW3.notCoveredAmt =123;
profsvcClaimDetailEdiW3.allowedAmt =123;
profsvcClaimDetailEdiW3.allowedFactor =123;
profsvcClaimDetailEdiW3.billedAmt =123;
profsvcClaimDetailEdiW3.quantity =123;
profsvcClaimDetailEdiW3.procedureModifier ="sample data3";
profsvcClaimDetailEdiW3.procedureCode ="sample data3";
profsvcClaimDetailEdiW3.billedAllowedAmt =123;
profsvcClaimDetailEdiW3.billedModifier ="sample data3";
profsvcClaimDetailEdiW3.billedProcedure ="sample data3";
profsvcClaimDetailEdiW3.seqMembId =123;
profsvcClaimDetailEdiW3.seqProvId =123;
profsvcClaimDetailEdiW3.placeServPointer =123;
profsvcClaimDetailEdiW3.diagnosisPointer =123;
profsvcClaimDetailEdiW3.detailSvcDate =new Date('2010-01-01');
profsvcClaimDetailEdiW3.subLineCode ="sample data3";
profsvcClaimDetailEdiW3.lineNumber =123;
profsvcClaimDetailEdiW3.claimNumber ="sample data3";
profsvcClaimDetailEdiW3.seqClaimId =123;
profsvcClaimDetailEdiW3.seqPrediId =123;


export const ProfsvcClaimDetailEdiWs: ProfsvcClaimDetailEdiW[] = [
    profsvcClaimDetailEdiW1,
    profsvcClaimDetailEdiW2,
    profsvcClaimDetailEdiW3,
];