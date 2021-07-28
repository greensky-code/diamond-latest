/* Copyright (c) 2021 . All Rights Reserved. */

import { browser, element, by } from 'protractor';

describe('Diamond E2E Tests', function () {

    beforeEach(function () {
        browser.get('');
    });

    it('should display "Diamond" Title', function () {
        expect(browser.getTitle()).toEqual('Diamond');
    });
});