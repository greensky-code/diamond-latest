/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Benefit Accumulator Base Values Page', function() {

    let selectMbrButton = element(by.css("input[name=selectMbr]"))
    let effectiveDateTextbox = element(by.css("input[formControlName=effectiveDate]"))
    let termDateTextbox = element(by.css("input[formControlName=termDate]"))

    describe('Select Mbr Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/benefitaccumulatorbasevalues');
            effectiveDateTextbox.sendKeys('Test Effective Date');
            termDateTextbox.sendKeys('Test Term Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});