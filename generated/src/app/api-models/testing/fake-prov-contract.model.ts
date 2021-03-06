/* Copyright (c) 2021 . All Rights Reserved. */

import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ProvContract} from "../../api-models"

var provContract1 = new ProvContract();
provContract1.seqProvContract =123;
provContract1.seqProvId =123;
provContract1.contractType ="sample data1";
provContract1.lineOfBusiness ="sample data1";
provContract1.panelId ="sample data1";
provContract1.effectiveDate =new Date('2010-01-01');
provContract1.termDate =new Date('2010-01-01');
provContract1.termReason ="sample data1";
provContract1.pcpFlag ="sample data1";
provContract1.acceptNewPatients ="sample data1";
provContract1.enrollmentLimit =123;
provContract1.thresholdMet ="sample data1";
provContract1.thresholdMetMonth =new Date('2010-01-01');
provContract1.seqVendId =123;
provContract1.seqVendAddress =123;
provContract1.capModelId ="sample data1";
provContract1.userDefined1 ="sample data1";
provContract1.participationFlag ="sample data1";
provContract1.printRemitAdvice ="sample data1";
provContract1.priceRule1 ="sample data1";
provContract1.priceRule2 ="sample data1";
provContract1.priceSchedule1 ="sample data1";
provContract1.priceSchedule2 ="sample data1";
provContract1.pricingRegion ="sample data1";
provContract1.pctOfBilled =123;
provContract1.pctAllowed =123;
provContract1.pctWithhold =123;
provContract1.pctOfAwp =123;
provContract1.dispensingFee =123;
provContract1.ipaId ="sample data1";
provContract1.serviceRegion ="sample data1";
provContract1.claimHoldReason ="sample data1";
provContract1.claimHoldDate =new Date('2010-01-01');
provContract1.userDefined2 ="sample data1";
provContract1.securityCode ="sample data1";
provContract1.insertDatetime =new Date('2010-01-01');
provContract1.insertUser ="sample data1";
provContract1.insertProcess ="sample data1";
provContract1.updateDatetime =new Date('2010-01-01');
provContract1.updateUser ="sample data1";
provContract1.updateProcess ="sample data1";
provContract1.geographicRegion ="sample data1";
provContract1.drgGrouperId ="sample data1";
provContract1.grouperVersion ="sample data1";
provContract1.drgPricerId ="sample data1";
provContract1.pricerVersion ="sample data1";
provContract1.revisionLevel ="sample data1";
provContract1.drgBaseMult =123;
provContract1.drgOutlierMult =123;
provContract1.drgOutlierPctBilled =123;
provContract1.case2Pct =123;
provContract1.case3Pct =123;
provContract1.pricerFacilityNumber ="sample data1";
provContract1.pricerPaysource ="sample data1";
provContract1.seqCovProvGrp =123;
provContract1.comCobAlwdAmtRule ="sample data1";
provContract1.comCobAlwdAmtRsn ="sample data1";
provContract1.capFundModelId ="sample data1";
provContract1.capFundSubModelId ="sample data1";
provContract1.acceptMedicareAssignFlag ="sample data1";
provContract1.taxId ="sample data1";
provContract1.filingLimitDays =123;
provContract1.apcFacilityNumber ="sample data1";
provContract1.apcPaysource ="sample data1";
provContract1.excludeIncentive ="sample data1";
provContract1.excludeAdminFee ="sample data1";

var provContract2 = new ProvContract();
provContract2.seqProvContract =123;
provContract2.seqProvId =123;
provContract2.contractType ="sample data2";
provContract2.lineOfBusiness ="sample data2";
provContract2.panelId ="sample data2";
provContract2.effectiveDate =new Date('2010-01-01');
provContract2.termDate =new Date('2010-01-01');
provContract2.termReason ="sample data2";
provContract2.pcpFlag ="sample data2";
provContract2.acceptNewPatients ="sample data2";
provContract2.enrollmentLimit =123;
provContract2.thresholdMet ="sample data2";
provContract2.thresholdMetMonth =new Date('2010-01-01');
provContract2.seqVendId =123;
provContract2.seqVendAddress =123;
provContract2.capModelId ="sample data2";
provContract2.userDefined1 ="sample data2";
provContract2.participationFlag ="sample data2";
provContract2.printRemitAdvice ="sample data2";
provContract2.priceRule1 ="sample data2";
provContract2.priceRule2 ="sample data2";
provContract2.priceSchedule1 ="sample data2";
provContract2.priceSchedule2 ="sample data2";
provContract2.pricingRegion ="sample data2";
provContract2.pctOfBilled =123;
provContract2.pctAllowed =123;
provContract2.pctWithhold =123;
provContract2.pctOfAwp =123;
provContract2.dispensingFee =123;
provContract2.ipaId ="sample data2";
provContract2.serviceRegion ="sample data2";
provContract2.claimHoldReason ="sample data2";
provContract2.claimHoldDate =new Date('2010-01-01');
provContract2.userDefined2 ="sample data2";
provContract2.securityCode ="sample data2";
provContract2.insertDatetime =new Date('2010-01-01');
provContract2.insertUser ="sample data2";
provContract2.insertProcess ="sample data2";
provContract2.updateDatetime =new Date('2010-01-01');
provContract2.updateUser ="sample data2";
provContract2.updateProcess ="sample data2";
provContract2.geographicRegion ="sample data2";
provContract2.drgGrouperId ="sample data2";
provContract2.grouperVersion ="sample data2";
provContract2.drgPricerId ="sample data2";
provContract2.pricerVersion ="sample data2";
provContract2.revisionLevel ="sample data2";
provContract2.drgBaseMult =123;
provContract2.drgOutlierMult =123;
provContract2.drgOutlierPctBilled =123;
provContract2.case2Pct =123;
provContract2.case3Pct =123;
provContract2.pricerFacilityNumber ="sample data2";
provContract2.pricerPaysource ="sample data2";
provContract2.seqCovProvGrp =123;
provContract2.comCobAlwdAmtRule ="sample data2";
provContract2.comCobAlwdAmtRsn ="sample data2";
provContract2.capFundModelId ="sample data2";
provContract2.capFundSubModelId ="sample data2";
provContract2.acceptMedicareAssignFlag ="sample data2";
provContract2.taxId ="sample data2";
provContract2.filingLimitDays =123;
provContract2.apcFacilityNumber ="sample data2";
provContract2.apcPaysource ="sample data2";
provContract2.excludeIncentive ="sample data2";
provContract2.excludeAdminFee ="sample data2";

var provContract3 = new ProvContract();
provContract3.seqProvContract =123;
provContract3.seqProvId =123;
provContract3.contractType ="sample data3";
provContract3.lineOfBusiness ="sample data3";
provContract3.panelId ="sample data3";
provContract3.effectiveDate =new Date('2010-01-01');
provContract3.termDate =new Date('2010-01-01');
provContract3.termReason ="sample data3";
provContract3.pcpFlag ="sample data3";
provContract3.acceptNewPatients ="sample data3";
provContract3.enrollmentLimit =123;
provContract3.thresholdMet ="sample data3";
provContract3.thresholdMetMonth =new Date('2010-01-01');
provContract3.seqVendId =123;
provContract3.seqVendAddress =123;
provContract3.capModelId ="sample data3";
provContract3.userDefined1 ="sample data3";
provContract3.participationFlag ="sample data3";
provContract3.printRemitAdvice ="sample data3";
provContract3.priceRule1 ="sample data3";
provContract3.priceRule2 ="sample data3";
provContract3.priceSchedule1 ="sample data3";
provContract3.priceSchedule2 ="sample data3";
provContract3.pricingRegion ="sample data3";
provContract3.pctOfBilled =123;
provContract3.pctAllowed =123;
provContract3.pctWithhold =123;
provContract3.pctOfAwp =123;
provContract3.dispensingFee =123;
provContract3.ipaId ="sample data3";
provContract3.serviceRegion ="sample data3";
provContract3.claimHoldReason ="sample data3";
provContract3.claimHoldDate =new Date('2010-01-01');
provContract3.userDefined2 ="sample data3";
provContract3.securityCode ="sample data3";
provContract3.insertDatetime =new Date('2010-01-01');
provContract3.insertUser ="sample data3";
provContract3.insertProcess ="sample data3";
provContract3.updateDatetime =new Date('2010-01-01');
provContract3.updateUser ="sample data3";
provContract3.updateProcess ="sample data3";
provContract3.geographicRegion ="sample data3";
provContract3.drgGrouperId ="sample data3";
provContract3.grouperVersion ="sample data3";
provContract3.drgPricerId ="sample data3";
provContract3.pricerVersion ="sample data3";
provContract3.revisionLevel ="sample data3";
provContract3.drgBaseMult =123;
provContract3.drgOutlierMult =123;
provContract3.drgOutlierPctBilled =123;
provContract3.case2Pct =123;
provContract3.case3Pct =123;
provContract3.pricerFacilityNumber ="sample data3";
provContract3.pricerPaysource ="sample data3";
provContract3.seqCovProvGrp =123;
provContract3.comCobAlwdAmtRule ="sample data3";
provContract3.comCobAlwdAmtRsn ="sample data3";
provContract3.capFundModelId ="sample data3";
provContract3.capFundSubModelId ="sample data3";
provContract3.acceptMedicareAssignFlag ="sample data3";
provContract3.taxId ="sample data3";
provContract3.filingLimitDays =123;
provContract3.apcFacilityNumber ="sample data3";
provContract3.apcPaysource ="sample data3";
provContract3.excludeIncentive ="sample data3";
provContract3.excludeAdminFee ="sample data3";


export const ProvContracts: ProvContract[] = [
    provContract1,
    provContract2,
    provContract3,
];