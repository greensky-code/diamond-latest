import { Injectable } from '@angular/core';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private ngbToastService: NgbToastService) { }

    /**
     *
     * @param message
     * @param type: NgbToastType
     */
    showToast(message: string, type: NgbToastType) {
        const toast: NgbToast = {
            toastType: type,
            text: message,
            dismissible: true,
            timeInSeconds: 5
        };
        this.ngbToastService.show(toast);
    }


}
