/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('DRG Pricer Revision Maintenance Page', function() {

    let versionTextbox = element(by.css("input[formControlName=version]"))
    let revisionLevelTextbox = element(by.css("input[formControlName=revisionLevel]"))
    let descriptionTextbox = element(by.css("input[formControlName=description]"))
    let effectiveDateTextbox = element(by.css("input[formControlName=effectiveDate]"))
    let terminationDateTextbox = element(by.css("input[formControlName=terminationDate]"))

});