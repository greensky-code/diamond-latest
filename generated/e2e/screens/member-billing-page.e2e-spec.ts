/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Member Billing Page', function() {

    let diamondIdTextbox = element(by.css("input[formControlName=diamondId]"))
    let subscriberIdTextbox = element(by.css("input[formControlName=subscriberId]"))
    let billingBeginTextbox = element(by.css("input[formControlName=billingBegin]"))
    let ovrCodeTextbox = element(by.css("input[formControlName=ovrCode]"))
    let ovrAmountTextbox = element(by.css("input[formControlName=ovrAmount]"))
    let ovrStepTextbox = element(by.css("input[formControlName=ovrStep]"))

});