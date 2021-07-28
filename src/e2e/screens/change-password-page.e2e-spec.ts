/* Copyright (c) 2020 . All Rights Reserved. */

import { browser, element, by } from 'protractor';
describe('Change Password Page', function() {

    let oldPasswordTextbox = element(by.css("input[formControlName=oldPassword]"))
    let newPasswordTextbox = element(by.css("input[formControlName=newPassword]"))
    let confirmPasswordTextbox = element(by.css("input[formControlName=confirmPassword]"))

});