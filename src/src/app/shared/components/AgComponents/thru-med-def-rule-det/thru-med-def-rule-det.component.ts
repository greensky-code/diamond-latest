import { Component, OnInit,Input, ViewContainerRef, ViewChild } from '@angular/core';
import { ICellEditorAngularComp, ICellRendererAngularComp } from 'ag-grid-angular';
import { DatePipe } from '@angular/common';
import { Mask } from '../../../pipes/text-format.pipe';
import { CustomValidators } from '../../../validators/custom-validator';
import { DateFormatPipe } from '../../../pipes/date-format.pipe';
import { GroupMasterService } from '../../../../api-services';
import { DatePickerConfig } from '../../../config';
import { FormValidation } from '../../../validators/form-validation.pipe';
import { FormGroup, NgModel } from '@angular/forms';
import { CommonService } from "../../../services/common.service";
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../pop-up-message';
import { PopUpMessageComponent } from '../../pop-up-message/pop-up-message/pop-up-message.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-thru-med-def-rule-det',
  templateUrl: './thru-med-def-rule-det.component.html',
  styleUrls: ['./thru-med-def-rule-det.component.css']
})
export class ThruMedDefRuleDetComponent implements  ICellEditorAngularComp{ 
 public datePickerConfig = DatePickerConfig;

    private params: any;
    public value: any;
  constructor(private datePipe:DatePipe,private modalService:NgbModal){}

  @ViewChild('input', { read: ViewContainerRef }) public input;


  agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;

  }

  getValue(): any {
    return this.value;
  }

  isPopup(): boolean {
    return true;
  }
  ngAfterViewInit() {
  }




}
