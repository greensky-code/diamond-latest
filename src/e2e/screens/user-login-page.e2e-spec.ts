/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('User Login Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let usernameTextbox = element(by.css("input[formControlName=username]"))
    let passwordTextbox = element(by.css("input[formControlName=password]"))
    let allRightsReservedTextbox = element(by.css("input[formControlName=allRightsReserved]"))
    let proprietaryRightsNoticeTextbox = element(by.css("input[formControlName=proprietaryRightsNotice]"))
    let agreementsWhichGrantSpecifiTextbox = element(by.css("input[formControlName=agreementsWhichGrantSpecifi]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/userlogin');
            usernameTextbox.sendKeys('Test Username');
            passwordTextbox.sendKeys('Test Password');
            allRightsReservedTextbox.sendKeys('Test All rights reserved');
            proprietaryRightsNoticeTextbox.sendKeys('Test Proprietary Rights Notice');
            agreementsWhichGrantSpecifiTextbox.sendKeys('Test agreements which grant specifi');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/userlogin');
            usernameTextbox.sendKeys('Test Username');
            passwordTextbox.sendKeys('Test Password');
            allRightsReservedTextbox.sendKeys('Test All rights reserved');
            proprietaryRightsNoticeTextbox.sendKeys('Test Proprietary Rights Notice');
            agreementsWhichGrantSpecifiTextbox.sendKeys('Test agreements which grant specifi');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});