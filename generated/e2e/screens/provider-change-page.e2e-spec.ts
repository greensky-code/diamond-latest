/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Provider Change Page', function() {

    let okButton = element(by.css("input[name=ok]"))
    let cancelButton = element(by.css("input[name=cancel]"))
    let effectiveDateTextbox = element(by.css("input[formControlName=effectiveDate]"))
    let currentEffectiveDateTextbox = element(by.css("input[formControlName=currentEffectiveDate]"))
    let termDateTextbox = element(by.css("input[formControlName=termDate]"))
    let currentTermDateTextbox = element(by.css("input[formControlName=currentTermDate]"))
    let termReasonTextbox = element(by.css("input[formControlName=termReason]"))
    let pcpChngRsnTextbox = element(by.css("input[formControlName=pcpChngRsn]"))
    let panelTextbox = element(by.css("input[formControlName=panel]"))
    let currentPanelTextbox = element(by.css("input[formControlName=currentPanel]"))
    let ipaTextbox = element(by.css("input[formControlName=ipa]"))
    let currentIpaTextbox = element(by.css("input[formControlName=currentIpa]"))
    let pcpIdTextbox = element(by.css("input[formControlName=pcpId]"))
    let currentPcpIdTextbox = element(by.css("input[formControlName=currentPcpId]"))
    let siteTextbox = element(by.css("input[formControlName=site]"))
    let currentSiteTextbox = element(by.css("input[formControlName=currentSite]"))
    let prov2Textbox = element(by.css("input[formControlName=prov2]"))
    let currentProv2Textbox = element(by.css("input[formControlName=currentProv2]"))

    describe('OK Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/providerchange');
            effectiveDateTextbox.sendKeys('Test Effective Date');
            currentEffectiveDateTextbox.sendKeys('Test Current Effective Date');
            termDateTextbox.sendKeys('Test Term Date');
            currentTermDateTextbox.sendKeys('Test Current Term Date');
            termReasonTextbox.sendKeys('Test Term Reason');
            pcpChngRsnTextbox.sendKeys('Test PCP Chng Rsn');
            panelTextbox.sendKeys('Test Panel');
            currentPanelTextbox.sendKeys('Test Current Panel');
            ipaTextbox.sendKeys('Test IPA');
            currentIpaTextbox.sendKeys('Test Current IPA');
            pcpIdTextbox.sendKeys('Test PCP ID');
            currentPcpIdTextbox.sendKeys('Test Current PCP ID');
            siteTextbox.sendKeys('Test Site');
            currentSiteTextbox.sendKeys('Test Current Site');
            prov2Textbox.sendKeys('Test Prov2');
            currentProv2Textbox.sendKeys('Test Current Prov2');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
    describe('Cancel Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/providerchange');
            effectiveDateTextbox.sendKeys('Test Effective Date');
            currentEffectiveDateTextbox.sendKeys('Test Current Effective Date');
            termDateTextbox.sendKeys('Test Term Date');
            currentTermDateTextbox.sendKeys('Test Current Term Date');
            termReasonTextbox.sendKeys('Test Term Reason');
            pcpChngRsnTextbox.sendKeys('Test PCP Chng Rsn');
            panelTextbox.sendKeys('Test Panel');
            currentPanelTextbox.sendKeys('Test Current Panel');
            ipaTextbox.sendKeys('Test IPA');
            currentIpaTextbox.sendKeys('Test Current IPA');
            pcpIdTextbox.sendKeys('Test PCP ID');
            currentPcpIdTextbox.sendKeys('Test Current PCP ID');
            siteTextbox.sendKeys('Test Site');
            currentSiteTextbox.sendKeys('Test Current Site');
            prov2Textbox.sendKeys('Test Prov2');
            currentProv2Textbox.sendKeys('Test Current Prov2');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});