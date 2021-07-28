/* Copyright (c) 2021 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Pricing Partner Detail Page', function() {

    let addNewButton = element(by.css("input[name=addNew]"))
    let closeButton = element(by.css("input[name=close]"))

    describe('Add New Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/pricingpartnerdetail');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Close Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/pricingpartnerdetail');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});