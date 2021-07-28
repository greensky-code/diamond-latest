/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Change Subscriber Designation Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let selectTheMemberYouWishToTextbox = element(by.css("input[formControlName=selectTheMemberYouWishTo]"))
    let clickCancelToReturnWithoutTextbox = element(by.css("input[formControlName=clickCancelToReturnWithout]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/changesubscriberdesignation');
            selectTheMemberYouWishToTextbox.sendKeys('Test Select the member you wish to');
            clickCancelToReturnWithoutTextbox.sendKeys('Test Click CANCEL to return without');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/changesubscriberdesignation');
            selectTheMemberYouWishToTextbox.sendKeys('Test Select the member you wish to');
            clickCancelToReturnWithoutTextbox.sendKeys('Test Click CANCEL to return without');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});