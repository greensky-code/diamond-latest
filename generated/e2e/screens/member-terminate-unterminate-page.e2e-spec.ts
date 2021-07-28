/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Member Terminate Unterminate Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let termDateTextbox = element(by.css("input[formControlName=termDate]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/memberterminateunterminate');
            termDateTextbox.sendKeys('Test Term Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/memberterminateunterminate');
            termDateTextbox.sendKeys('Test Term Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});