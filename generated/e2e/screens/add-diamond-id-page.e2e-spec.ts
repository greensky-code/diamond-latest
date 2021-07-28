/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Add DIAMOND ID Page', function() {

    let viewButton = element(by.css("input[name=view]"))
    let saveButton = element(by.css("input[name=save]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let diamondIdTextbox = element(by.css("input[formControlName=diamondId]"))

    describe('View Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/adddiamondid');
            diamondIdTextbox.sendKeys('Test DIAMOND ID');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Save Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/adddiamondid');
            diamondIdTextbox.sendKeys('Test DIAMOND ID');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/adddiamondid');
            diamondIdTextbox.sendKeys('Test DIAMOND ID');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});