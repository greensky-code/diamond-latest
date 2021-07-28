import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbToastType } from 'ngb-toast';
import { AlertMessage, AlertMessageService } from '../components/alert-message';
import { ToastService } from './toast.service';


@Injectable({
    providedIn: 'root'
})
export class CommonService {

    public alertMessage: AlertMessage;
    constructor(private toastService: ToastService,
        private alertMessageService: AlertMessageService
    ) { }

    isFieldEmptyAndNull(form: FormGroup, field: string) {
        return form.get(field).value == null || (typeof form.get(field).value === 'string' && form.get(field).value.trim().length === 0);
    }



}
