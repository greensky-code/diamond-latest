import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../services/toast.service';
import { Form } from '../helpers/form.helper';

export class DateRangeValidator {

    static validate(toastService: ToastService, fromDateField: string, toDateField: string, fromDateLabel: string = 'From',  toDateLabel: string = 'To', errorName: string = 'dateRange'): ValidatorFn {
        return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
            const fromDate = Form.getDatePickerValue(formGroup, fromDateField);
            const toDate = Form.getDatePickerValue(formGroup, toDateField);
            const fromDateMs = Date.parse(fromDate);
            const toDateMs = Date.parse(toDate);
            const blankDate = "";
            if (fromDate !== blankDate && toDate === blankDate) {
                toastService.showToast("This '"+ toDateLabel +"' date range field is missing 'to' date", NgbToastType.Danger);
                return {[errorName]: true};
//                 return {[errorName+'MissingToDate']: true};
            }
            if (fromDate === blankDate && toDate !== blankDate) {
                toastService.showToast("This '"+ fromDateLabel +"' date range field is missing 'from' date", NgbToastType.Danger);
                return {[errorName]: true};
//                 return {[errorName+'MissingFromDate']: true};
            }
            if ((fromDate !== blankDate && toDate !== blankDate) &&  fromDateMs > toDateMs) {
                toastService.showToast("This '"+ toDateLabel +"' date range field has earlier 'to' date", NgbToastType.Danger);
                return {[errorName]: true};
//                 return {[errorName+'EarlierToDate']: true};
            }
            return null;
        };
    }
}
