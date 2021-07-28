/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Member Claim Hold Codes Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let claimHoldCodeTextbox = element(by.css("input[formControlName=claimHoldCode]"))
    let claimHoldDateTextbox = element(by.css("input[formControlName=claimHoldDate]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/memberclaimholdcodes');
            claimHoldCodeTextbox.sendKeys('Test Claim Hold Code');
            claimHoldDateTextbox.sendKeys('Test Claim Hold Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/memberclaimholdcodes');
            claimHoldCodeTextbox.sendKeys('Test Claim Hold Code');
            claimHoldDateTextbox.sendKeys('Test Claim Hold Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});