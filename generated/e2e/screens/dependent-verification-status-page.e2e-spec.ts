/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Dependent Verification Status Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let dependentStatusTextbox = element(by.css("input[formControlName=dependentStatus]"))
    let studentStatusDetailCodeTextbox = element(by.css("input[formControlName=studentStatusDetailCode]"))
    let verifiedThruDateTextbox = element(by.css("input[formControlName=verifiedThruDate]"))
    let usrDef1Textbox = element(by.css("input[formControlName=usrDef1]"))
    let usrDat1Textbox = element(by.css("input[formControlName=usrDat1]"))
    let usrDef2Textbox = element(by.css("input[formControlName=usrDef2]"))
    let usrDat2Textbox = element(by.css("input[formControlName=usrDat2]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/dependentverificationstatus');
            dependentStatusTextbox.sendKeys('Test Dependent Status');
            studentStatusDetailCodeTextbox.sendKeys('Test Student Status Detail Code');
            verifiedThruDateTextbox.sendKeys('Test Verified Thru Date');
            usrDef1Textbox.sendKeys('Test UsrDef1');
            usrDat1Textbox.sendKeys('Test UsrDat1');
            usrDef2Textbox.sendKeys('Test UsrDef2');
            usrDat2Textbox.sendKeys('Test UsrDat2');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/dependentverificationstatus');
            dependentStatusTextbox.sendKeys('Test Dependent Status');
            studentStatusDetailCodeTextbox.sendKeys('Test Student Status Detail Code');
            verifiedThruDateTextbox.sendKeys('Test Verified Thru Date');
            usrDef1Textbox.sendKeys('Test UsrDef1');
            usrDat1Textbox.sendKeys('Test UsrDat1');
            usrDef2Textbox.sendKeys('Test UsrDef2');
            usrDat2Textbox.sendKeys('Test UsrDat2');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});