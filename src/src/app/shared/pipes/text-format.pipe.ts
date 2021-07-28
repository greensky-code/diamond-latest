import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class Mask {
  public zipCode = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/,/\d/,/\d/,/\d/,]
  public phoneNumber = [/\d/, /\d/, /\d/, '-', /\d/,/\d/,/\d/, '-', /\d/,/\d/,/\d/,/\d/]
  public driversLicenseNumber = [/\d/, /\d/, /\d/, '-', /\d/,/\d/,/\d/]

  public removeMaskingFormat(stringInput: any) {
    return stringInput.replace(/(\-)/gm,"");
  }

  public removePercentage(stringInput: any) {
    return stringInput.replace(/\%/g, '');
  }

  public removeDollar(stringInput: any) {
    return stringInput.replace(/\$/g, '');
  }

  public twoDigitDecimal = createNumberMask({
    prefix: '$',
    allowDecimal: true,
    decimalLimit: 2
  });

  public fourDigitDecimal = createNumberMask({
    prefix: '$',
    allowDecimal: true,
    decimalLimit: 4
  });

  public twoDigitPercentage = createNumberMask({
    prefix: '',
    suffix: '%',
    allowDecimal: true,
    separatorLimit:3,
    decimalLimit: 2
  });

  public integer = createNumberMask({
    prefix: '',
    allowDecimal: false,
    decimalLimit: 0,
    includeThousandsSeparator: false,
  });

  public currencyMask = createNumberMask({
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    integerLimit: 16,
    requireDecimal: true,
    allowNegative: false,
    allowLeadingZeroes: false
  });

  public twoDigitDecimalNum = createNumberMask({
    prefix: '$',
    suffix: '',
    includeThousandsSeparator: true,
    thousandsSeparatorSymbol: ',',
    allowDecimal: true,
    decimalSymbol: '.',
    decimalLimit: 2,
    requireDecimal: true
  });
}
