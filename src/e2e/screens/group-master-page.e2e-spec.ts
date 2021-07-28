/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Group Master Page', function() {

    let groupIdTextbox = element(by.css("input[formControlName=groupId]"))
    let parentTextbox = element(by.css("input[formControlName=parent]"))
    let nationalEmployerIdTextbox = element(by.css("input[formControlName=nationalEmployerId]"))
    let federalTaxIdTextbox = element(by.css("input[formControlName=federalTaxId]"))
    let name1Textbox = element(by.css("input[formControlName=name1]"))
    let holdRsnTextbox = element(by.css("input[formControlName=holdRsn]"))
    let dateTextbox = element(by.css("input[formControlName=date]"))
    let name2Textbox = element(by.css("input[formControlName=name2]"))
    let nextOeStartTextbox = element(by.css("input[formControlName=nextOeStart]"))
    let shortNameTextbox = element(by.css("input[formControlName=shortName]"))
    let nextOeEndTextbox = element(by.css("input[formControlName=nextOeEnd]"))
    let address1Textbox = element(by.css("input[formControlName=address1]"))
    let sicCodeTextbox = element(by.css("input[formControlName=sicCode]"))
    let address2Textbox = element(by.css("input[formControlName=address2]"))
    let claimsTeamTextbox = element(by.css("input[formControlName=claimsTeam]"))
    let cityTextbox = element(by.css("input[formControlName=city]"))
    let wcGroupIdTextbox = element(by.css("input[formControlName=wcGroupId]"))
    let stateProvTextbox = element(by.css("input[formControlName=stateProv]"))
    let zippostTextbox = element(by.css("input[formControlName=zippost]"))
    let groupTypeTextbox = element(by.css("input[formControlName=groupType]"))
    let countryTextbox = element(by.css("input[formControlName=country]"))
    let dueDateRuleTextbox = element(by.css("input[formControlName=dueDateRule]"))
    let calcDaysTextbox = element(by.css("input[formControlName=calcDays]"))
    let ptdThresholdPercentTextbox = element(by.css("input[formControlName=ptdThresholdPercent]"))
    let claimHoldReasonCodeTextbox = element(by.css("input[formControlName=claimHoldReasonCode]"))
    let phoneNumberPhExtAlDistTextbox = element(by.css("input[formControlName=phoneNumberPhExtAlDist]"))

});