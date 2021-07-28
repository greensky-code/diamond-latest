import { CalAnimation, IAngularMyDpOptions, IMyDateModel } from 'angular-mydatepicker';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


export const DatePickerConfig: IAngularMyDpOptions = {
    dateRange: false,
    dateFormat: 'mm/dd/yyyy',
    calendarAnimation: {in: CalAnimation.ScaleCenter, out: CalAnimation.Rotate},
    showSelectorArrow: true,
    focusInputOnDateSelect: true,
    inputFieldValidation: true

};

export const datePickerModel: IMyDateModel = { isRange: false, dateRange: null };
export const DatePickerModel: IMyDateModel = { isRange: false, dateRange: null };


export const NGBModalOptions: NgbModalOptions = {
    backdrop : 'static',
    keyboard : false
};

export enum PopUpIconType {
    INFO='info',
    CLOSE = 'close'
}

export const gridPaginationPageSize = 50;
export const gridNoRecordsFoundMessage = 'No more records found';
