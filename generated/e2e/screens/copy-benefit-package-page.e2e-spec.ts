/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Copy Benefit Package Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let selectAllButton = element(by.css("input[name=selectAll]"))
    let deselectAllButton = element(by.css("input[name=deselectAll]"))
    let textbox001Textbox = element(by.css("input[formControlName=textbox001]"))
    let textbox002Textbox = element(by.css("input[formControlName=textbox002]"))
    let textbox003Textbox = element(by.css("input[formControlName=textbox003]"))
    let selectThePackageAndRulesYTextbox = element(by.css("input[formControlName=selectThePackageAndRulesY]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/copybenefitpackage');
            textbox001Textbox.sendKeys('Test Textbox001');
            textbox002Textbox.sendKeys('Test Textbox002');
            textbox003Textbox.sendKeys('Test Textbox003');
            selectThePackageAndRulesYTextbox.sendKeys('Test Select the package and rules y');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/copybenefitpackage');
            textbox001Textbox.sendKeys('Test Textbox001');
            textbox002Textbox.sendKeys('Test Textbox002');
            textbox003Textbox.sendKeys('Test Textbox003');
            selectThePackageAndRulesYTextbox.sendKeys('Test Select the package and rules y');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Select All Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/copybenefitpackage');
            textbox001Textbox.sendKeys('Test Textbox001');
            textbox002Textbox.sendKeys('Test Textbox002');
            textbox003Textbox.sendKeys('Test Textbox003');
            selectThePackageAndRulesYTextbox.sendKeys('Test Select the package and rules y');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Deselect All Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/copybenefitpackage');
            textbox001Textbox.sendKeys('Test Textbox001');
            textbox002Textbox.sendKeys('Test Textbox002');
            textbox003Textbox.sendKeys('Test Textbox003');
            selectThePackageAndRulesYTextbox.sendKeys('Test Select the package and rules y');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});