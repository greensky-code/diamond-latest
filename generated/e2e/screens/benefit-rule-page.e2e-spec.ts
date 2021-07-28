/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Benefit Rule Page', function() {

    let ruleIdTextbox = element(by.css("input[formControlName=ruleId]"))
    let typeTextbox = element(by.css("input[formControlName=type]"))
    let shortDescTextbox = element(by.css("input[formControlName=shortDesc]"))
    let medDefTextbox = element(by.css("input[formControlName=medDef]"))
    let narrativeTextbox = element(by.css("input[formControlName=narrative]"))
    let holdReasonCodeTextbox = element(by.css("input[formControlName=holdReasonCode]"))
    let messageTextbox = element(by.css("input[formControlName=message]"))

});