/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Member COB Verification Information Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let verificationDateTextbox = element(by.css("input[formControlName=verificationDate]"))
    let followupDateTextbox = element(by.css("input[formControlName=followupDate]"))
    let statusTextbox = element(by.css("input[formControlName=status]"))
    let userDefined1Textbox = element(by.css("input[formControlName=userDefined1]"))
    let userDate1Textbox = element(by.css("input[formControlName=userDate1]"))
    let userDefined2Textbox = element(by.css("input[formControlName=userDefined2]"))
    let userDate2Textbox = element(by.css("input[formControlName=userDate2]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/membercobverificationinformation');
            verificationDateTextbox.sendKeys('Test Verification Date');
            followupDateTextbox.sendKeys('Test Followup Date');
            statusTextbox.sendKeys('Test Status');
            userDefined1Textbox.sendKeys('Test User Defined 1');
            userDate1Textbox.sendKeys('Test User Date 1');
            userDefined2Textbox.sendKeys('Test User Defined 2');
            userDate2Textbox.sendKeys('Test User Date 2');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/membercobverificationinformation');
            verificationDateTextbox.sendKeys('Test Verification Date');
            followupDateTextbox.sendKeys('Test Followup Date');
            statusTextbox.sendKeys('Test Status');
            userDefined1Textbox.sendKeys('Test User Defined 1');
            userDate1Textbox.sendKeys('Test User Date 1');
            userDefined2Textbox.sendKeys('Test User Defined 2');
            userDate2Textbox.sendKeys('Test User Date 2');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});