import { Validators } from '@angular/forms';
import { isNumeric } from 'rxjs/util/isNumeric'
import { Injectable } from "@angular/core";

export var ALPHA_CHARACTER_PATTERN: any = /[A-Za-z]/;
export var TWO_DIGIT_NUMBER_PATTERN: any = /^\d+\.\d{2}$/;
export var SSN: any = /^\d{3}-\d{2}-\d{4}$/;
export var ZIPCODE5DIGIT: any = /^\d{5}$/;
export var FOUR_DIGIT_NUMBER_PATTERN: any = /^\d+\.\d{4}$/;
export var US_PHONE_NUMBER_PATTERN: any = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
export var EMAIL_ADDRESS_PATTERN: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export var POSITIVE_INTEGER: any = /^[-+]?[1-9]\d*\.?[0]*$/;
export var YES_NO_PATTERN: any = /[YN?]/;
export var YES_NO_AN_UNKNOWN_PATTERN: any = /[YN?]/;
export var MALE_AND_FEMALE_PATTERN: any = /[MF?]/;
export var US_DATE_FORMAT: any = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;

@Injectable()
export class CustomValidators {
   public twoDigitDecimalNumber = Validators.pattern(TWO_DIGIT_NUMBER_PATTERN);
   public fourDigitDecimalNumber = Validators.pattern(FOUR_DIGIT_NUMBER_PATTERN);
   public alphaCharacter = Validators.pattern(ALPHA_CHARACTER_PATTERN);
   public usPhoneNumber = Validators.pattern(US_PHONE_NUMBER_PATTERN);
   public emailAddress = Validators.pattern(EMAIL_ADDRESS_PATTERN);
   public ssn = Validators.pattern(SSN);
   public zipcode5DIGIT = Validators.pattern(ZIPCODE5DIGIT);
   public positiveInteger = Validators.pattern(POSITIVE_INTEGER);
   public yesNo = Validators.pattern(YES_NO_PATTERN);
   public yesNoAndUnknown = Validators.pattern(YES_NO_AN_UNKNOWN_PATTERN);
   public gender = Validators.pattern(MALE_AND_FEMALE_PATTERN);
   public USDate = Validators.pattern(US_DATE_FORMAT);

    public number(control: any) {
        if(control.value=='') {
            return null
        }
        if (isNumeric(control.value)) {
            return null;
        }
        else {
            control.value = '';
            return {'numeric': true};
        }
    }

}
