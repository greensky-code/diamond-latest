import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {InstClaimHeaderService} from "../../../../api-services/inst-claim-header.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Mask} from "../../../../shared/pipes/text-format.pipe";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {CustomValidators} from "../../../../shared/validators/custom-validator";
import {AlertMessageService} from "../../../../shared/components/alert-message";
import {DateFormatPipe} from "../../../../shared/pipes/date-format.pipe";
import {SecWinService} from "../../../../api-services/security/sec-win.service";
import {SecurityService} from "../../../../shared/services/security.service";
import {SecColDetailService} from "../../../../api-services/security/sec-col-detail.service";
import {SecUserService} from "../../../../api-services";
import {FormValidation} from "../../../../shared/validators/form-validation.pipe";

@Component({
    selector: 'institutionalclaimsmodal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    providers: [InstClaimHeaderService]
})
export class InstitutionalClaimsModalComponent implements OnInit  {

    icModalForm: FormGroup;
    icFormValidation: FormValidation;
    @Output() claimModal = new EventEmitter<any>();

    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private activeModal: NgbActiveModal,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private instClaimHeaderService: InstClaimHeaderService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService) {
        this.icModalForm = this.formBuilder.group({
            batchNumber: ['', [Validators.required]],
            dateReceived: ['', [Validators.required]]
        });
        this.icFormValidation = new FormValidation(this.icModalForm);
    }

    ngOnInit(): void {
    }

    submit() {
        console.log(this.icModalForm.value);
        this.claimModal.emit(this.icModalForm.value);
        this.activeModal.dismiss();
    }
}
