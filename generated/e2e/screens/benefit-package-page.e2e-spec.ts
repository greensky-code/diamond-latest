/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Benefit Package Page', function() {

    let benefitPackageIdTextbox = element(by.css("input[formControlName=benefitPackageId]"))
    let shortDescriptionTextbox = element(by.css("input[formControlName=shortDescription]"))
    let processingOrderIdTextbox = element(by.css("input[formControlName=processingOrderId]"))
    let applyPatLiabilityToTextbox = element(by.css("input[formControlName=applyPatLiabilityTo]"))
    let copayRestrictionTextbox = element(by.css("input[formControlName=copayRestriction]"))
    let percentageTextbox = element(by.css("input[formControlName=percentage]"))
    let grandfatheredTextbox = element(by.css("input[formControlName=grandfathered]"))
    let gfEffectTextbox = element(by.css("input[formControlName=gfEffect]"))
    let erisaTextbox = element(by.css("input[formControlName=erisa]"))
    let gfTermTextbox = element(by.css("input[formControlName=gfTerm]"))
    let ruleIdTextbox = element(by.css("input[formControlName=ruleId]"))
    let procOrderTextbox = element(by.css("input[formControlName=procOrder]"))
    let procSeqTextbox = element(by.css("input[formControlName=procSeq]"))
    let startDateTextbox = element(by.css("input[formControlName=startDate]"))
    let endDateTextbox = element(by.css("input[formControlName=endDate]"))
    let authReqTextbox = element(by.css("input[formControlName=authReq]"))
    let applyWuthLevelTbApplyParTextbox = element(by.css("input[formControlName=applyWuthLevelTbApplyPar]"))
    let fromMonthsTbThruMonthsTextbox = element(by.css("input[formControlName=fromMonthsTbThruMonths]"))
    let subsFlagTextbox = element(by.css("input[formControlName=subsFlag]"))

});