import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import { PmbSetup } from '../../../api-models/pmb-setup.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { PmbSetupService } from '../../../api-services/pmb-setup.service';
import { Form } from '../../../shared/helpers/form.helper';

@Component({
  selector: 'app-pmb-templateid',
  templateUrl: './pmb-templateid.component.html',
  providers: [PmbSetupService]
})
export class PMBTemplateIdComponent implements OnInit {
  pmpTemplateIdForm: FormGroup;
  pmpTemplateIdformValidation: FormValidation;
  @Input()  pmbSetupRecords: PmbSetup[];
  @Input()  jobId: string;
  @Input()  seqGpbilId: number;
  @Input()  comments: string;

  constructor(private activeModal: NgbActiveModal,private formBuilder: FormBuilder,
    private pmbSetupService: PmbSetupService) { }

  ngOnInit() {
    this.pmpTemplateIdForm = this.formBuilder.group({
        seqGpbilId: ['', {updateOn: 'blur', validators: [] }],
        jobId: ['', {updateOn: 'blur', validators: [] }],
        comments: ['', {updateOn: 'blur', validators: [] }],
        otherComments: ['', {updateOn: 'blur', validators: [] }]
    });
    let otherComments = this.pmbSetupRecords.filter((a) => (a.comments && a.comments.trim().length>0) && a.template=='Y')
        .map((a) => a.comments).join('\r\n');

    this.pmpTemplateIdformValidation = new FormValidation(this.pmpTemplateIdForm);
    this.pmpTemplateIdForm.patchValue({
        seqGpbilId: this.seqGpbilId,
        jobId: this.jobId,
        comments: this.comments,
        otherComments: otherComments
     });
  }

  save() {
    let pmbSetup = new PmbSetup();
    pmbSetup.jobId = this.jobId;
    pmbSetup.seqGpbilId = this.seqGpbilId;
    pmbSetup.comments = this.comments;
    pmbSetup.template ='Y';
    this.pmbSetupService.partiallyUpdatePmbSetup(pmbSetup,this.seqGpbilId).subscribe(
      () => {
        console.log('Template Updated ');
        this.activeModal.close();
      },
      () => {
        console.log('Template Updation Failed');
        this.activeModal.close();      }
    );
  }

  cancel() {
    this.activeModal.close();
  }

}


