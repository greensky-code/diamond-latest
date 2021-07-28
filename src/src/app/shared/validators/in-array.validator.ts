import { AbstractControl, ValidatorFn } from '@angular/forms';
import { NgbToastType } from 'ngb-toast';
import { ToastService } from '../services/toast.service';
import { Form } from '../helpers/form.helper';

export class InArrayValidator {

    // TODO: fix array not receiving updated data
    static validate(toastService: ToastService, array: any[], arrayElement: string, targetField: String,
                    errorName: string = 'notInArrayError', errorDescription: string = 'value not present in the given array'): ValidatorFn {
        return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
            const targetValue = Form.getValue(formGroup, targetField);
            let hasError = true;
            let byPath = (obj, path) => path
                .replace(/\[(\w+)\]/g, '.$1')
                .replace(/^\./, '')
                .split(/\./g)
                .reduce((ref, key) => key in ref ? ref[key] : ref, obj)
            console.log(array)
            for(let arr of array){
                console.log(byPath(arr, arrayElement))
                if(byPath(arr, arrayElement) === targetValue){
                    hasError = false;
                    break;
                }
            }
            if(hasError){
                toastService.showToast(targetField + " " + errorDescription, NgbToastType.Danger);
                return {[errorName]: true}
            }else{
                return null;
            }
        };
    }
}
