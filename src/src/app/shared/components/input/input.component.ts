import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatePickerConfig } from '../../config';
import { Form } from '../../helpers/form.helper';
import { FormValidation } from '../../validators/form-validation.pipe';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() showIcon: boolean = false;
  @Input() passedType: string;
  @Input() labelText: string;
  @Input() title: string;
  @Input() passedValue: any;
  @Output() buttonclickEvent = new EventEmitter<string>();
  formValidation: FormValidation;
  public inputForm: FormGroup;
  public datePickerConfig = DatePickerConfig;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      inputValue: ['', { updateOn: 'blur', validators: [] }],
    }, { updateOn: 'submit' });
    this.formValidation = new FormValidation(this.inputForm);
    this.inputForm.patchValue({
      'inputValue': this.passedValue
    });
  }

  submit() {
    this.formValidation.validateForm();
    if (this.inputForm.valid) {
      this.buttonclickEvent.next(Form.getDatePickerValue(this.inputForm, 'inputValue'));
      this.activeModal.close();
    }
  }
}
