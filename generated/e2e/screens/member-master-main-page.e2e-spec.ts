/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Member Master Main Page', function() {

    let showFamilyButton = element(by.css("input[name=showFamily]"))
    let diamondIdTextbox = element(by.css("input[formControlName=diamondId]"))
    let subscriberIdTextbox = element(by.css("input[formControlName=subscriberId]"))

    describe('Show Family Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/membermastermain');
            diamondIdTextbox.sendKeys('Test DIAMOND ID');
            subscriberIdTextbox.sendKeys('Test Subscriber ID');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});