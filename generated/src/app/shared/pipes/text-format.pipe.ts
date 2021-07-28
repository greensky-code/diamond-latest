import createNumberMask from 'text-mask-addons/dist/createNumberMask';
import createAutoCorrectedDatePipe from 'text-mask-addons/dist/createAutoCorrectedDatePipe'
import { Injectable } from "@angular/core";
/*
This class is used for masking. for more information visit
https://github.com/text-mask/text-mask/tree/master/addons
*/
@Injectable()
export class Mask {
  public zipCode = [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/,/\d/,/\d/,/\d/,]
  public phoneNumber = [/\d/, /\d/, /\d/, '-', /\d/,/\d/,/\d/, '-', /\d/,/\d/,/\d/,/\d/]
  public driversLicenseNumber = [/\d/, /\d/, /\d/, '-', /\d/,/\d/,/\d/]

  public removeMaskingFormat(stringInput: any) {
    return stringInput.replace(/(\-)/gm,"");
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

  public integer = createNumberMask({
    prefix: '',
    allowDecimal: false,
    decimalLimit: 0,
    includeThousandsSeparator: false,
  });

}
