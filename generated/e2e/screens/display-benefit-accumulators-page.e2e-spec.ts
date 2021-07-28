/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Display Benefit Accumulators Page', function() {

    let selectMbrButton = element(by.css("input[name=selectMbr]"))
    let selectClmButton = element(by.css("input[name=selectClm]"))
    let benefitValueFiltersButton = element(by.css("input[name=benefitValueFilters]"))
    let effectiveDateTextbox = element(by.css("input[formControlName=effectiveDate]"))

    describe('Select Mbr Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/displaybenefitaccumulators');
            effectiveDateTextbox.sendKeys('Test Effective Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Select Clm Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/displaybenefitaccumulators');
            effectiveDateTextbox.sendKeys('Test Effective Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Benefit Value Filters Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/displaybenefitaccumulators');
            effectiveDateTextbox.sendKeys('Test Effective Date');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});