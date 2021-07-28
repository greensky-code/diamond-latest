import {AbstractControl, ValidationErrors} from '@angular/forms';

export class RequiredValidator {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        // @ In case of data-picker no need to check the init-space
        if (control.value === "" || !control.value) {
            return null;
        } else if (control.value.hasOwnProperty("singleDate")) {
            return null;
        } else if ((control.value.toString()).indexOf(' ') === 0) {
            return {cannotContainSpace: true}
        }

        return null;
    }
}
