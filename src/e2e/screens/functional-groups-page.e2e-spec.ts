/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Functional Groups Page', function() {

    let closeButton = element(by.css("input[name=close]"))
    let groupWithASingleClickOrTTextbox = element(by.css("input[formControlName=groupWithASingleClickOrT]"))
    let fromTheListTextbox = element(by.css("input[formControlName=fromTheList]"))
    let enterTheFiveCharacterKeywoTextbox = element(by.css("input[formControlName=enterTheFiveCharacterKeywo]"))

    describe('Close Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/functionalgroups');
            groupWithASingleClickOrTTextbox.sendKeys('Test group with a single-click or t');
            fromTheListTextbox.sendKeys('Test from the list');
            enterTheFiveCharacterKeywoTextbox.sendKeys('Test enter the five character keywo');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});