/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Group Detail Page', function() {

    let groupIdTextbox = element(by.css("input[formControlName=groupId]"))
    let planriderTextbox = element(by.css("input[formControlName=planrider]"))
    let effDateTextbox = element(by.css("input[formControlName=effDate]"))
    let endDateTextbox = element(by.css("input[formControlName=endDate]"))
    let pbCompcodeTextbox = element(by.css("input[formControlName=pbCompcode]"))
    let pbGlrefTextbox = element(by.css("input[formControlName=pbGlref]"))
    let benefitPkgTextbox = element(by.css("input[formControlName=benefitPkg]"))
    let lobTextbox = element(by.css("input[formControlName=lob]"))
    let profCobCalcTextbox = element(by.css("input[formControlName=profCobCalc]"))
    let instCobCalcTextbox = element(by.css("input[formControlName=instCobCalc]"))
    let dependentDeterminationRuleTextbox = element(by.css("input[formControlName=dependentDeterminationRule]"))
    let dentlCobCalcTextbox = element(by.css("input[formControlName=dentlCobCalc]"))
    let paymentPolicyTextbox = element(by.css("input[formControlName=paymentPolicy]"))
    let excludeCapitatedClaimsTextbox = element(by.css("input[formControlName=excludeCapitatedClaims]"))
    let priceRule1Textbox = element(by.css("input[formControlName=priceRule1]"))
    let priceSchedule1Textbox = element(by.css("input[formControlName=priceSchedule1]"))
    let pctBilledTextbox = element(by.css("input[formControlName=pctBilled]"))
    let groupReqTextbox = element(by.css("input[formControlName=groupReq]"))
    let priceSchedule2Textbox = element(by.css("input[formControlName=priceSchedule2]"))
    let pctAllwdTextbox = element(by.css("input[formControlName=pctAllwd]"))
    let exclusionTypeTextbox = element(by.css("input[formControlName=exclusionType]"))
    let reasonTextbox = element(by.css("input[formControlName=reason]"))
    let exclusionPeriodTextbox = element(by.css("input[formControlName=exclusionPeriod]"))
    let excludeCapitatedClaimLinesTextbox = element(by.css("input[formControlName=excludeCapitatedClaimLines]"))
    let specialProcessingTextbox = element(by.css("input[formControlName=specialProcessing]"))
    let claimFilingIndicatorTextbox = element(by.css("input[formControlName=claimFilingIndicator]"))

});