/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('ID Card Print Page', function() {

    let jobIdTextbox = element(by.css("input[formControlName=jobId]"))
    let requestUserTextbox = element(by.css("input[formControlName=requestUser]"))
    let dateTextbox = element(by.css("input[formControlName=date]"))
    let idCardTemplateTextbox = element(by.css("input[formControlName=idCardTemplate]"))
    let oderTypeTextbox = element(by.css("input[formControlName=oderType]"))
    let narrativeTextbox = element(by.css("input[formControlName=narrative]"))
    let effectiveDateFromTextbox = element(by.css("input[formControlName=effectiveDateFrom]"))
    let effectiveDateThroughTextbox = element(by.css("input[formControlName=effectiveDateThrough]"))
    let groupTextbox = element(by.css("input[formControlName=group]"))
    let ipaTextbox = element(by.css("input[formControlName=ipa]"))
    let lobTextbox = element(by.css("input[formControlName=lob]"))
    let planTextbox = element(by.css("input[formControlName=plan]"))
    let panelTextbox = element(by.css("input[formControlName=panel]"))

});