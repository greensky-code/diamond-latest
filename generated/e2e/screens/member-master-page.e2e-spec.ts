/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Member Master Page', function() {

    let showFamilyButton = element(by.css("input[name=showFamily]"))
    let diamondIdTextbox = element(by.css("input[formControlName=diamondId]"))
    let subscriberIdTextbox = element(by.css("input[formControlName=subscriberId]"))
    let personNoTextbox = element(by.css("input[formControlName=personNo]"))
    let mcIndTextbox = element(by.css("input[formControlName=mcInd]"))
    let lastNmTextbox = element(by.css("input[formControlName=lastNm]"))
    let firstTextbox = element(by.css("input[formControlName=first]"))
    let empStatTextbox = element(by.css("input[formControlName=empStat]"))
    let salutationTextbox = element(by.css("input[formControlName=salutation]"))
    let dobTextbox = element(by.css("input[formControlName=dob]"))
    let maritalStsTextbox = element(by.css("input[formControlName=maritalSts]"))
    let langTextbox = element(by.css("input[formControlName=lang]"))
    let occupatTextbox = element(by.css("input[formControlName=occupat]"))
    let citizenshipTextbox = element(by.css("input[formControlName=citizenship]"))
    let medicareTextbox = element(by.css("input[formControlName=medicare]"))
    let medicaidTextbox = element(by.css("input[formControlName=medicaid]"))
    let socSecTextbox = element(by.css("input[formControlName=socSec]"))
    let empNoTextbox = element(by.css("input[formControlName=empNo]"))
    let medRecTextbox = element(by.css("input[formControlName=medRec]"))
    let altMembIdTextbox = element(by.css("input[formControlName=altMembId]"))
    let textbox001Textbox = element(by.css("input[formControlName=textbox001]"))
    let effDateTextbox = element(by.css("input[formControlName=effDate]"))
    let termDateTextbox = element(by.css("input[formControlName=termDate]"))
    let termRsnTextbox = element(by.css("input[formControlName=termRsn]"))
    let dateOfDeathTextbox = element(by.css("input[formControlName=dateOfDeath]"))
    let eligStsTextbox = element(by.css("input[formControlName=eligSts]"))
    let relCodeTextbox = element(by.css("input[formControlName=relCode]"))
    let ridersTextbox = element(by.css("input[formControlName=riders]"))
    let textbox002Textbox = element(by.css("input[formControlName=textbox002]"))
    let textbox003Textbox = element(by.css("input[formControlName=textbox003]"))
    let textbox004Textbox = element(by.css("input[formControlName=textbox004]"))
    let textbox005Textbox = element(by.css("input[formControlName=textbox005]"))
    let textbox006Textbox = element(by.css("input[formControlName=textbox006]"))
    let textbox007Textbox = element(by.css("input[formControlName=textbox007]"))
    let textbox008Textbox = element(by.css("input[formControlName=textbox008]"))
    let textbox009Textbox = element(by.css("input[formControlName=textbox009]"))
    let textbox010Textbox = element(by.css("input[formControlName=textbox010]"))
    let groupIdTextbox = element(by.css("input[formControlName=groupId]"))
    let planCodeTextbox = element(by.css("input[formControlName=planCode]"))
    let textbox011Textbox = element(by.css("input[formControlName=textbox011]"))
    let textbox012Textbox = element(by.css("input[formControlName=textbox012]"))
    let textbox013Textbox = element(by.css("input[formControlName=textbox013]"))
    let textbox014Textbox = element(by.css("input[formControlName=textbox014]"))
    let textbox015Textbox = element(by.css("input[formControlName=textbox015]"))
    let textbox016Textbox = element(by.css("input[formControlName=textbox016]"))
    let textbox017Textbox = element(by.css("input[formControlName=textbox017]"))
    let textbox018Textbox = element(by.css("input[formControlName=textbox018]"))
    let textbox019Textbox = element(by.css("input[formControlName=textbox019]"))
    let textbox020Textbox = element(by.css("input[formControlName=textbox020]"))
    let panelIdTextbox = element(by.css("input[formControlName=panelId]"))
    let ipaTextbox = element(by.css("input[formControlName=ipa]"))
    let pcpIdTextbox = element(by.css("input[formControlName=pcpId]"))
    let pcpChngRsnTextbox = element(by.css("input[formControlName=pcpChngRsn]"))
    let prov2Textbox = element(by.css("input[formControlName=prov2]"))
    let rpt1Textbox = element(by.css("input[formControlName=rpt1]"))
    let deptTextbox = element(by.css("input[formControlName=dept]"))
    let locationTextbox = element(by.css("input[formControlName=location]"))
    let hireDateTextbox = element(by.css("input[formControlName=hireDate]"))
    let salaryTextbox = element(by.css("input[formControlName=salary]"))
    let mCareStsTextbox = element(by.css("input[formControlName=mCareSts]"))
    let benStartDateTextbox = element(by.css("input[formControlName=benStartDate]"))
    let otherStsTextbox = element(by.css("input[formControlName=otherSts]"))
    let pecEndDateTextbox = element(by.css("input[formControlName=pecEndDate]"))
    let reasonTextbox = element(by.css("input[formControlName=reason]"))
    let csIndTextbox = element(by.css("input[formControlName=csInd]"))
    let rateTypeTextbox = element(by.css("input[formControlName=rateType]"))
    let rpt2Textbox = element(by.css("input[formControlName=rpt2]"))
    let rpt3Textbox = element(by.css("input[formControlName=rpt3]"))
    let residenceProvTextbox = element(by.css("input[formControlName=residenceProv]"))
    let workProvTextbox = element(by.css("input[formControlName=workProv]"))
    let payrollProvTextbox = element(by.css("input[formControlName=payrollProv]"))
    let taxExemptTextbox = element(by.css("input[formControlName=taxExempt]"))

    describe('Show Family Button', function() {
        it('Should Display Record if Records Found.', function() {
            browser.get('http://localhost:3000/diamond/membermaster');
            diamondIdTextbox.sendKeys('Test DIAMOND ID');
            subscriberIdTextbox.sendKeys('Test Subscriber ID');
            personNoTextbox.sendKeys('Test Person No');
            mcIndTextbox.sendKeys('Test MC Ind');
            lastNmTextbox.sendKeys('Test Last Nm');
            firstTextbox.sendKeys('Test First');
            empStatTextbox.sendKeys('Test Emp Stat');
            salutationTextbox.sendKeys('Test Salutation');
            dobTextbox.sendKeys('Test DOB');
            maritalStsTextbox.sendKeys('Test Marital Sts');
            langTextbox.sendKeys('Test Lang');
            occupatTextbox.sendKeys('Test Occupat.');
            citizenshipTextbox.sendKeys('Test Citizenship');
            medicareTextbox.sendKeys('Test Medicare');
            medicaidTextbox.sendKeys('Test Medicaid');
            socSecTextbox.sendKeys('Test SocSec');
            empNoTextbox.sendKeys('Test EmpNo');
            medRecTextbox.sendKeys('Test MedRec');
            altMembIdTextbox.sendKeys('Test Alt Memb ID');
            textbox001Textbox.sendKeys('Test Textbox001');
            effDateTextbox.sendKeys('Test Eff Date');
            termDateTextbox.sendKeys('Test Term Date');
            termRsnTextbox.sendKeys('Test Term Rsn');
            dateOfDeathTextbox.sendKeys('Test Date of Death');
            eligStsTextbox.sendKeys('Test EligSts');
            relCodeTextbox.sendKeys('Test Rel Code');
            ridersTextbox.sendKeys('Test Riders');
            textbox002Textbox.sendKeys('Test Textbox002');
            textbox003Textbox.sendKeys('Test Textbox003');
            textbox004Textbox.sendKeys('Test Textbox004');
            textbox005Textbox.sendKeys('Test Textbox005');
            textbox006Textbox.sendKeys('Test Textbox006');
            textbox007Textbox.sendKeys('Test Textbox007');
            textbox008Textbox.sendKeys('Test Textbox008');
            textbox009Textbox.sendKeys('Test Textbox009');
            textbox010Textbox.sendKeys('Test Textbox010');
            groupIdTextbox.sendKeys('Test Group ID');
            planCodeTextbox.sendKeys('Test Plan Code');
            textbox011Textbox.sendKeys('Test Textbox011');
            textbox012Textbox.sendKeys('Test Textbox012');
            textbox013Textbox.sendKeys('Test Textbox013');
            textbox014Textbox.sendKeys('Test Textbox014');
            textbox015Textbox.sendKeys('Test Textbox015');
            textbox016Textbox.sendKeys('Test Textbox016');
            textbox017Textbox.sendKeys('Test Textbox017');
            textbox018Textbox.sendKeys('Test Textbox018');
            textbox019Textbox.sendKeys('Test Textbox019');
            textbox020Textbox.sendKeys('Test Textbox020');
            panelIdTextbox.sendKeys('Test Panel ID');
            ipaTextbox.sendKeys('Test IPA');
            pcpIdTextbox.sendKeys('Test PCP ID');
            pcpChngRsnTextbox.sendKeys('Test PCP Chng Rsn');
            prov2Textbox.sendKeys('Test Prov2');
            rpt1Textbox.sendKeys('Test Rpt 1');
            deptTextbox.sendKeys('Test Dept');
            locationTextbox.sendKeys('Test Location');
            hireDateTextbox.sendKeys('Test Hire Date');
            salaryTextbox.sendKeys('Test Salary');
            mCareStsTextbox.sendKeys('Test MCareSts');
            benStartDateTextbox.sendKeys('Test Ben Start Date');
            otherStsTextbox.sendKeys('Test OtherSts');
            pecEndDateTextbox.sendKeys('Test PEC End Date');
            reasonTextbox.sendKeys('Test Reason');
            csIndTextbox.sendKeys('Test CS Ind');
            rateTypeTextbox.sendKeys('Test Rate Type');
            rpt2Textbox.sendKeys('Test Rpt 2');
            rpt3Textbox.sendKeys('Test Rpt 3');
            residenceProvTextbox.sendKeys('Test Residence Prov');
            workProvTextbox.sendKeys('Test Work Prov');
            payrollProvTextbox.sendKeys('Test Payroll Prov');
            taxExemptTextbox.sendKeys('Test Tax Exempt');
             // TODO Manual Finishing: Replace the following with other/additional expect statements
            expect("some value").toEqual("some value");
        });
    });
});