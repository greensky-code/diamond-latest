import {CurrencyPipe, DecimalPipe, formatDate} from '@angular/common';
import {IMySingleDateModel} from "angular-mydatepicker";
import {DateFormatPipe} from "../pipes/date-format.pipe";

export class Form {

    public static getValue(form: any, field: any): any {
        if (form.get(field) === null || form.get(field).value === null) {
            return '';
        } else {
            return form.get(field).value;
        }
    }

    public static getDecimalValue(form: any, field: any): any {
        if (form.get(field) === null || form.get(field).value === null  || form.get(field).value === undefined) {
            return '';
        } else {
            let val = (form.get(field).value).replace('$', '');
            console.log('val',val)
            return  val ;
        }
    }

    public static getDatePickerValue(form: any, field: any): string {
        if (form.get(field) === null || form.get(field).value === undefined ||  form.get(field).value === null || form.get(field).value.date === null) {
            return '';
        } else {
            const date = (form.get(field).value.singleDate) ? form.get(field).value.singleDate.date : null;
            if (date) {
                return formatDate(new Date(date.year, date.month-1, date.day), 'yyyy-MM-dd', 'en');
            } else {
                return '';
            }
        }
    }

    public static getFormattedDateFromStrDate(form: any, field: any): string {
        if ( form.get(field).value === undefined ||  form.get(field) === null || form.get(field).value === null || form.get(field).value.date === null) {
            return '';
        } else {
            const date = (form.get(field).value) ? form.get(field).value : null;
            console.log(date);
            if (date) {
                let dateArr = date.split('/');
                let year = parseInt(dateArr[2] + '');
                let month = parseInt(dateArr[0] + '');
                let day = parseInt(dateArr[1] + '');

                return formatDate(new Date(year, month-1, day), 'yyyy-MM-dd', 'en');
            } else {
                return '';
            }
        }
    }

    public static getDateValue(form: any, field: any): Date {
        if (form.get(field) === null || form.get(field).value === null || form.get(field).value.date === null) {
            return null;
        } else {
            let dateString = (form.get(field).value.singleDate) ? form.get(field).value.singleDate.date : null;
            if (dateString) {
                let date = new Date(dateString.year, dateString.month-1, dateString.day);
                date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
                return date;
            } else {
                return null;
            }
        }
    }

    public static getDate(jsDate: IMySingleDateModel): Date {
        if (jsDate) {
            return new Date(jsDate.date.year, jsDate.date.month-1, jsDate.date.day)
        }
        return null;
    }

    public static getDateGridDisplay(field: any) {
        let result = field.value;
        if(typeof field.value === 'string' || field.value instanceof String){
            let dateParts = field.value.split('-');
            result = `${dateParts[1]}/${dateParts[2]}/${dateParts[0]}`;
        }
        return result;
    }

    public static getDateInputDisplay(dateFormatPipe: DateFormatPipe, field: any) {
        return dateFormatPipe.defaultDisplayDateFormat(field);
    }

    public static getNumber1DecimalGridDisplay(field: any) {
        let result = '0.0';
        if(field.value && !isNaN(field.value)){
            result = Number(field.value).toFixed(1);
        }
        return result;
    }

    public static getNumber1DecimalInputDisplay(decimalPipe: DecimalPipe, field: any) {
        return decimalPipe.transform(field, '1.0-1');
    }

    public static getCurrencyGridDisplay(field: any) {
        let result = '$0.00';
        if(field.value && !isNaN(field.value)){
            result = '$' + Number(field.value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
        return result;
    }

    public static getCurrencyInputDisplay(currencyPipe: CurrencyPipe, field: any) {
        return currencyPipe.transform(field, '$', 'symbol-narrow', '0.2-2');
    }

    public static addPrefixZero(value: any) {
        return (value < 10) ? ('0' + value) : value;
    }
    public static getDatePicker(date: any) {
        if (date === null || date === undefined) {
            return '';
        } else {
            return date.year + '-' + this.addPrefixZero(date.month) + '-' + this.addPrefixZero(date.day);
        }
    }

    public static getObjectReference(object: any) {
        return Object.assign({}, object);
    }

    public static hasChangeField(originalForm: any, updatedForm: any, field: any){
        return originalForm[field] !== updatedForm[field];
    }

    public static hasChanges(originalForm: any, updatedForm: any){
        let hasChanges = false;
        for(let field in updatedForm){
            if(this.hasChangeField(originalForm, updatedForm, field)){
                hasChanges = true;
                break;
            }
        }
        return hasChanges;
    }

}
