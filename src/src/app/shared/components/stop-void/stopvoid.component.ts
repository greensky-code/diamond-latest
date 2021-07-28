import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidation} from "../../validators/form-validation.pipe";
import {DddwDtlService, ReasonCodeMasterService} from "../../../api-services";

@Component({
    selector: 'timestamp',
    templateUrl: './stopvoid.component.html',
    styleUrls: ['./stopvoid.component.css']
})
export class StopvoidComponent implements OnInit, AfterViewInit {

    @Input() title: string;
    @Input() checkNum: any;
    @Input() nowDate: any;

    @Input() showIcon = true;
    public stopVoidForm: FormGroup;
    public formValidation: FormValidation;
    actions: any[];
    reasons: any[];
    constructor(
        public activeModal: NgbActiveModal,
        private dddwDtlService: DddwDtlService,
        private formBuilder: FormBuilder,
        private reasonCodeMasterService: ReasonCodeMasterService,
    ) {}
    ngOnInit(): void {
        this.initializeComponentState();
    }

    ngAfterViewInit(): void {
        this.populateForm()
    }

    private initializeComponentState(): void {
        this.getActions();
        this.getReasons();
        this.createForm();
    }

    modalClose = () => {
        this.activeModal.close();
    };

    private createForm() {
        this.stopVoidForm = this.formBuilder.group({
            checkNumFrom: ['', {validators: []}],
            checkNumTo: ['', {validators: []}],
            date: ['', {validators: []}],
            action: ['', {validators: []}],
            reason: ['', {validators: []}]
        })
    }

    getActions() {
        this.dddwDtlService.findByColumnNameAndDwname('action', 'dw_check_stop_void')
            .subscribe(
                (results) => {
                    this.actions = results;
                }
            );
    }

    getReasons() {
        this.reasonCodeMasterService.getReasonCodeMasterByReasonType('CK')
            .subscribe(
                (results) => {
                    this.reasons = results;
                }
            );
    }

    populateForm = () => {
        this.stopVoidForm.patchValue({
            'checkNumFrom': this.checkNum,
            'checkNumTo': this.checkNum,
            'date': this.nowDate,
        })
    }
}
