/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Address Ripple Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let addr1Textbox = element(by.css("input[formControlName=addr1]"))
    let addr2Textbox = element(by.css("input[formControlName=addr2]"))
    let cityTextbox = element(by.css("input[formControlName=city]"))
    let stateTextbox = element(by.css("input[formControlName=state]"))
    let zipCodeTextbox = element(by.css("input[formControlName=zipCode]"))
    let homePhTextbox = element(by.css("input[formControlName=homePh]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/addressripple');
            addr1Textbox.sendKeys('Test Addr 1');
            addr2Textbox.sendKeys('Test Addr 2');
            cityTextbox.sendKeys('Test City');
            stateTextbox.sendKeys('Test State');
            zipCodeTextbox.sendKeys('Test ZIP Code');
            homePhTextbox.sendKeys('Test Home Ph');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/addressripple');
            addr1Textbox.sendKeys('Test Addr 1');
            addr2Textbox.sendKeys('Test Addr 2');
            cityTextbox.sendKeys('Test City');
            stateTextbox.sendKeys('Test State');
            zipCodeTextbox.sendKeys('Test ZIP Code');
            homePhTextbox.sendKeys('Test Home Ph');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});