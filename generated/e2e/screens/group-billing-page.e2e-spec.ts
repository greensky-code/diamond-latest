/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Group Billing Page', function() {

    let groupIdTextbox = element(by.css("input[formControlName=groupId]"))
    let frequencyTextbox = element(by.css("input[formControlName=frequency]"))
    let graceTextbox = element(by.css("input[formControlName=grace]"))
    let rateFreezeCalcTextbox = element(by.css("input[formControlName=rateFreezeCalc]"))
    let prorationTextbox = element(by.css("input[formControlName=proration]"))
    let adultDepAgeTextbox = element(by.css("input[formControlName=adultDepAge]"))
    let retroMonthsTextbox = element(by.css("input[formControlName=retroMonths]"))
    let commonBillingDateTextbox = element(by.css("input[formControlName=commonBillingDate]"))
    let maxNoDepsTextbox = element(by.css("input[formControlName=maxNoDeps]"))
    let cycleTextbox = element(by.css("input[formControlName=cycle]"))
    let reportPrintFormatTextbox = element(by.css("input[formControlName=reportPrintFormat]"))
    let tierringMthdTextbox = element(by.css("input[formControlName=tierringMthd]"))
    let rate1Textbox = element(by.css("input[formControlName=rate1]"))
    let rate2Textbox = element(by.css("input[formControlName=rate2]"))
    let rate3Textbox = element(by.css("input[formControlName=rate3]"))
    let rate4Textbox = element(by.css("input[formControlName=rate4]"))
    let matrixDefTextbox = element(by.css("input[formControlName=matrixDef]"))
    let rate5Textbox = element(by.css("input[formControlName=rate5]"))

});