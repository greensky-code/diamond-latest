/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Select Member Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let subscriberIdTextbox = element(by.css("input[formControlName=subscriberId]"))
    let personNumberTextbox = element(by.css("input[formControlName=personNumber]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/selectmember');
            subscriberIdTextbox.sendKeys('Test Subscriber ID');
            personNumberTextbox.sendKeys('Test Person Number');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/selectmember');
            subscriberIdTextbox.sendKeys('Test Subscriber ID');
            personNumberTextbox.sendKeys('Test Person Number');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});