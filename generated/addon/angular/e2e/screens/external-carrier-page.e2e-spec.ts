/* Copyright (c) 2021 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('External Carrier Page', function() {

    let saveChangesButton = element(by.css("input[name=saveChanges]"))
    let resetAllButton = element(by.css("input[name=resetAll]"))

    describe('Save Changes Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/externalcarrier');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Reset All Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/externalcarrier');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});