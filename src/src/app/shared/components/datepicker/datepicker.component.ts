import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {DatePipe} from '@angular/common';
import {Mask} from '../../pipes/text-format.pipe';
import {CustomValidators} from '../../validators/custom-validator';
import {DateFormatPipe} from '../../pipes/date-format.pipe';
import {GroupMasterService, MessageMasterDtlService} from '../../../api-services';
import {DatePickerConfig} from '../../config';
import {FormValidation} from '../../validators/form-validation.pipe';
import {FormGroup} from '@angular/forms';
import {CommonService} from "../../services/common.service";
import {AngularMyDatePickerDirective, IMyDateModel} from 'angular-mydatepicker';
import {PopUpMessage, PopUpMessageButton} from "../pop-up-message";
import {PopUpMessageComponent} from "../pop-up-message/pop-up-message/pop-up-message.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        GroupMasterService
    ]
})
export class DatepickerComponent implements OnInit, AfterViewInit{

    public datePickerConfig = DatePickerConfig;
    msgTitle: string = 'DIAMOND @ Client/Server System';
    @Input() formValidation: FormValidation;
    @Input() formGroup: FormGroup;
    @Input() field: string;
    @Input() isRequired: boolean = false;
    @Input() isBoldText: boolean = false;
    @Input() showLabel: string;
    @Input() disabled: boolean = false;
    @Input() readonly : boolean = false;
    @Input() labelText: string;
    @Input() showClearButton = true;
    @Input() tabIndex: any;
    @Input() isDatePickerTabEvent: boolean;
    @Input() consultantStatus: Boolean = false;
    @Output() onDateChanged = new EventEmitter<IMyDateModel>();
    @Output() dateValueStatus = new EventEmitter();
    @Output() onManualInput = new EventEmitter<any>();
    @ViewChild("dp") myDp: AngularMyDatePickerDirective;
    @ViewChild('mydatePickerElf') mouseFocus: any;
    validNum: boolean = true;
    onCalenderDateChanged(event: IMyDateModel) {
        this.onDateChanged.emit(event);
    }

    constructor(
        public commonService: CommonService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        private modalService: NgbModal,
        ) {
    }

    toggleCalendar(): void {
        this.cdr.detectChanges();
        this.myDp.toggleCalendar();
    }

    ngOnInit() {
        if (this.consultantStatus) {
            setTimeout(() => {
                this.mouseFocus.nativeElement.focus();
            }, 2000)
        }
    }


    ngAfterViewInit() {
    }

    inputValueChange = (event) => {
       if (event.key === 'Tab' && this.isDatePickerTabEvent) {
           event.preventDefault();
           this.dateValueStatus.emit(this.formValidation.isValidField(this.field))
       } else if (event.key === 'Tab') {
           let code;
           let date = event.target.value;
           let dateVal = date.split('/').join('');
           if (!isNaN(Date.parse(date))) {
               date = date.split('.').join('/').split('-').join('/').split(',').join('/');
               dateVal = date.split('/').join('');
               this.mouseFocus.nativeElement.value = date;
               if (dateVal.length === 6 && date.length === 6) {
                   this.convert6Value(date);
                   this.validationPopup();
               } else if (dateVal.length === 6 && date.length === 8) {
                   this.add0Value(date)
               } else if (dateVal.length === 7 && date.length === 9) {
                   this.convert7Value(date);
               }
               this.dateValueStatus.emit(this.formValidation.isValidField(this.field))
           } else {
               for (let i = 0, len = dateVal.length; i < len; i++) {
                   code = dateVal.charCodeAt(i);
                   this.validNum = code > 47 && code < 58;
               }
               if (!this.validNum) {
                   this.formatErrorPopup();
               } else {
                   if (dateVal.length !== 0 && dateVal.length !== 6 && dateVal.length !== 8) {
                       this.formatErrorPopup();
                   } else {
                       if (date.length === 7 || date.length === 9) {
                           this.formatErrorPopup();
                       } else {
                           if (dateVal.length === 8 && date.length === 8) {
                               this.convert8Value(date);
                               this.validationPopup();
                           } else if (dateVal.length === 8 && date.length === 10) {
                               this.formatErrorPopup();
                           } else if (dateVal.length === 6 && date.length === 6) {
                               this.convert6Value(date)
                               this.validationPopup();
                           }
                       }
                   }
               }
           }
       }
    };

    popupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
        } catch (e) {
            console.log(e);
        }
    };

    formatErrorPopup() {
        this.messageService.findByMessageId(29031).subscribe(message => {
            this.popupAlert('29031: ' + message[0].messageText.replace('@1', 'M/d/yyyy'), this.msgTitle)
            setTimeout(() => {
                this.mouseFocus.nativeElement.focus();
                this.formGroup.get(this.field).setValue('')
            }, 2000)
        })
    }

    convert8Value(date) {
        let mm = date.slice(0, 2);
        let dd = date.slice(2, 4);
        let yyyy = date.slice(4, 8);
        this.mouseFocus.nativeElement.value = mm + '/' + dd + '/' + yyyy;
    }

    convert6Value(date) {
        let mm = date.slice(0, 1);
        let dd = date.slice(1, 2);
        let yyyy = date.slice(2, 6);
        this.mouseFocus.nativeElement.value = '0' +  mm + '/0' + dd + '/' + yyyy;
    };

    validationPopup() {
        if (isNaN(Date.parse(this.mouseFocus.nativeElement.value))) {
            this.formatErrorPopup()
        } else {
            this.cdr.detectChanges();
            this.dateValueStatus.emit(this.formValidation.isValidField(this.field))
        }
    };

    convert7Value(date) {
        let mm, ddYYYY;
        if (date.split('/')[0].length === 1) {
            mm = '0' + date.slice(0, 1);
            ddYYYY =date.slice(2, 9);
        } else if (date.split('/')[0].length === 2) {
            mm = date.slice(0, 2);
            ddYYYY = '0' + date.slice(3, 9);
        }
        this.mouseFocus.nativeElement.value = mm + '/' + ddYYYY;
    }

    add0Value(date) {
        let mm = '0' + date.slice(0, 1);
        let dd = '0' + date.slice(2, 3);
        let yyyy = date.slice(4, 8);
        this.mouseFocus.nativeElement.value = mm + '/' + dd + '/' + yyyy;
    }
}
