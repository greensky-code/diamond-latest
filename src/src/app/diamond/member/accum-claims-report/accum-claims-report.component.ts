/* Copyright (c) 2020 . All Rights Reserved. */

import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbToastType } from 'ngb-toast';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { ClaimAccumtProc, ClaimBenefitAccum, SecUser } from "../../../api-models/index";
import { SecColDetail } from "../../../api-models/security/sec-col-detail.model";
import { SecWin } from "../../../api-models/security/sec-win.model";
import { SecUserService } from "../../../api-services";
import { ClaimBenefitAccumService } from "../../../api-services/claim-benefit-accum.service";
import { SecColDetailService } from "../../../api-services/security/sec-col-detail.service";
import { SecWinService } from "../../../api-services/security/sec-win.service";
import { MEM_MODULE_ID } from "../../../shared/app-constants";
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { Form } from '../../../shared/helpers/form.helper';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from "../../../shared/services/security.service";
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";

// Use the Component directive to define the AccumClaimsReportComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
	selector: "accumclaimsreport",
	templateUrl: "./accum-claims-report.component.html",
	providers: [
		DatePipe,
		Mask,
		CustomValidators,
		DateFormatPipe,
		ClaimBenefitAccumService,
	],
})
export class AccumClaimsReportComponent implements OnInit {
	// The form model used by the view per Angular Reactive Forms
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	accumClaimsReportForm: FormGroup;
	formValidation: FormValidation;
	public alertMessage: AlertMessage;
	public displayMessage: any;
	public popUpMessage: PopUpMessage;

	@ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;

	secWin: SecWinViewModel;
	windowId = 'MEMBR';
	userTemplateId: string;
	memberModuleId = MEM_MODULE_ID;
	secColDetails = new Array<SecColDetail>();
	inProgress = true;
	isSuperUser = false;
	secProgress = true;

	showPopUp(message: string, title: string) {
		if (!message) {
			return;
		}
		let popUpMessage = new PopUpMessage(
			"poUpMessageName",
			title,
			message,
			"icon"
		);
		popUpMessage.buttons = [
			new PopUpMessageButton("Cancel", "Cancel", "btn btn-primary"),
		];
		let ref = this.modalService.open(PopUpMessageComponent);
		ref.componentInstance.popupMessage = popUpMessage;
	}

	popupMessageHandler(button: PopUpMessageButton) {
		if (button.name == "yes") {
			console.log("button yes has been click!");
		}
		if (button.name == "no") {
			console.log("button No has been click!");
		}
	}

	popUpButtonHandler(button: PopUpMessageButton) {
		if (button.popupMessage.name == "poUpMessageName") {
			this.popupMessageHandler(button);
		}
	}

	editClaimBenefitAccum: boolean;
	claimBenefitAccum: ClaimBenefitAccum;
	claimBenefitAccums: ClaimBenefitAccum[];
	createClaimBenefitAccum() {
		this.formValidation.validateForm();
		if (this.accumClaimsReportForm.valid) {
			let claimBenefitAccum = new ClaimBenefitAccum();
			claimBenefitAccum.compareDates = Form.getValue(
				this.accumClaimsReportForm,
				"fromDate"
			);
			claimBenefitAccum.admitDate = Form.getValue(
				this.accumClaimsReportForm,
				"thruDate"
			);
			this.claimBenefitAccumService
				.createClaimBenefitAccum(claimBenefitAccum)
				.subscribe(
					(response) => {
						this.toastr.showToast('Record successfully created', NgbToastType.Success);
						this.editClaimBenefitAccum = false;
					}
				);
		} else {
			this.alertMessage = this.alertMessageService.error(
				"Some required information is missing or incomplete. Please correct your entries and try again."
			);
		}
	}

	updateClaimBenefitAccum(seqAccumId: number) {
		this.formValidation.validateForm();
		if (this.accumClaimsReportForm.valid) {
			let claimBenefitAccum = new ClaimBenefitAccum();
			claimBenefitAccum.compareDates = Form.getValue(
				this.accumClaimsReportForm,
				"fromDate"
			);
			claimBenefitAccum.admitDate = Form.getValue(
				this.accumClaimsReportForm,
				"thruDate"
			);
			this.claimBenefitAccumService
				.updateClaimBenefitAccum(claimBenefitAccum, seqAccumId)
				.subscribe(
					(response) => {
						this.toastr.showToast('Record successfully updated', NgbToastType.Success);
						this.editClaimBenefitAccum = false;
					}
				);
		} else {
			this.alertMessage = this.alertMessageService.error(
				"Some required information is missing or incomplete. Please correct your entries and try again."
			);
		}
	}
	saveClaimBenefitAccum() {
		if (this.securityService.checkInsertUpdatePermissions(this.editClaimBenefitAccum, this.secWin)) {
			if (this.editClaimBenefitAccum) {
				this.updateClaimBenefitAccum(this.claimBenefitAccum.seqAccumId);
			} else {
				this.createClaimBenefitAccum();
			}
		}
	}
	deleteClaimBenefitAccum(seqAccumId: number) {
		if (!(this.secWin.hasDeletePermission())) {
			return;
		}
		this.claimBenefitAccumService.deleteClaimBenefitAccum(seqAccumId).subscribe(
			(response) => {
				this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
			}
		);
	}
	getClaimBenefitAccum(seqAccumId: number) {
		this.claimBenefitAccumService.getClaimBenefitAccum(seqAccumId).subscribe(
			(claimBenefitAccum) => {
				this.claimBenefitAccum = claimBenefitAccum;
				this.accumClaimsReportForm.patchValue({
					fromDate: this.claimBenefitAccum.compareDates,
					thruDate: this.dateFormatPipe.defaultDisplayDateFormat(
						this.claimBenefitAccum.admitDate
					),
				});
			}
		);
	}
	getClaimBenefitAccums() {
		this.claimBenefitAccumService.getClaimBenefitAccums().subscribe(
			(claimBenefitAccums) => {
				this.claimBenefitAccums = claimBenefitAccums;
			}
		);
	}

	// Use constructor injection to inject an instance of a FormBuilder
	constructor(
		private formBuilder: FormBuilder,
		private mask: Mask,
		private toastr: ToastService,
		private modalService: NgbModal,
		private customValidators: CustomValidators,
		private alertMessageService: AlertMessageService,
		private dateFormatPipe: DateFormatPipe,
		private claimBenefitAccumService: ClaimBenefitAccumService,
		private securityService: SecurityService,
		private secWinService: SecWinService,
		private secColDetailService: SecColDetailService,
		private secUserService: SecUserService,
		public activeModal: NgbActiveModal
	) { }

	// Most initial setup should be done in the ngOnInit() life-cycle hook function
	// rather than in the constructor for this class in order to ensure that the
	// resources are fully loaded before performing the initial setup processing.
	ngOnInit(): void {
		this.hasPermission();
	}

	initializeComponentState() {
		this.createForm();
		this.displayMessage = {};
		this.formValidation = new FormValidation(this.accumClaimsReportForm);
		this.getProc();
	}

	/**
	 * get all user permission for page
	 * if permissions to select exist then initialize page
	 */
	hasPermission() {

		this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));

		if (this.isSuperUser) {
			this.secProgress = false;
			this.initializeComponentState();
			return;
		}

		let userId = null;

		const parsedToken = this.securityService.getCurrentUserToken();
		if (parsedToken) {
			userId = parsedToken.sub;
		}
		this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
			this.getSecColDetails(user);
			this.userTemplateId = user.dfltTemplate
			this.getSecWin(user.dfltTemplate);
		});
	}

	/**
	 * Get Permissions
	 * @param secUserId
	 */
	getSecWin(secUserId: string) {
		this.secWinService.getSecWin(this.windowId, secUserId).subscribe(
			(secWin: SecWin) => {
				this.secWin = new SecWinViewModel(secWin);
				if (this.secWin.hasSelectPermission()) {
					this.initializeComponentState();
					this.secProgress = false;

				} else {
					this.secProgress = false;

					this.showPopUp(
						'You are not Permitted to view Accum Claims Report',
						'Accum Claims Report Permission'
					);
				}
			}
		);
	}

	/**
	 * Get Security Column Details
	 */
	getSecColDetails(secUser: SecUser) {
		if (!secUser.sfldlId) {
			this.inProgress = false;
			return;
		}
		this.secColDetailService.findByTableNameAndUserId('MEMBER_MASTER', secUser.userId).subscribe((resp: SecColDetail[]) => {
			this.secColDetails = resp;
			this.inProgress = false;
			this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
		});

	}

	// Use a FormBuilder to create a FormGroup to define the Form Model for the view
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	createForm() {
		// FormBuilder.group is a factory method that creates a FormGroup
		// FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
		this.accumClaimsReportForm = this.formBuilder.group(
			{
				fromDate: ["", { updateOn: "blur", validators: [] }],
				thruDate: ["", { updateOn: "blur", validators: [] }],
			},
			{ updateOn: "submit" }
		);
	}

	getProc() { }

	checkDates() {
		this.accumClaimsReportForm
			.get("thruDate")
			.valueChanges.subscribe((value) => {
				const fromDate = this.accumClaimsReportForm.value.fromDate;
				if (fromDate && fromDate !== "") {
					const fromdate = new Date(fromDate.singleDate.jsDate);
					const thruDate = new Date(value.singleDate.jsDate);
					if (value && fromdate && thruDate < fromdate) {
						this.showPopUp(
							"14078:Through Date must be greater than or equal to From Date.",
							"Accum Claim Report"
						);
					} else {
					}
				}
			});

		this.accumClaimsReportForm
			.get("fromDate")
			.valueChanges.subscribe((value) => {
				const thrudate = this.accumClaimsReportForm.value.fromDate;
				if (thrudate && thrudate !== "") {
					const thruDate = new Date(thrudate.singleDate.jsDate);
					const fromDate = new Date(value.singleDate.jsDate);
					if (value && thruDate && thruDate < fromDate) {
						this.showPopUp(
							"14078:From Date must be less than or equal to Through Date.",
							"Accum Claim Report"
						);
					} else {
					}
				}
			});
	}

	getReport() {
		this.formValidation.validateForm();
		if (this.accumClaimsReportForm.valid) {
			var PROC = new ClaimAccumtProc();
			PROC.selectFromDate = Form.getDatePickerValue(this.accumClaimsReportForm,"fromDate");
			PROC.SelectThruDate = Form.getDatePickerValue(this.accumClaimsReportForm,"thruDate");
			//Get Report Id
			this.claimBenefitAccumService.getReportId().subscribe((id) => {
				PROC.seqReportId = id;
				this.claimBenefitAccumService.ProcRun(PROC).subscribe((data) => {
					if (data[0].poReturnVal == 1) {
						this.getReportFromQuery(1);
					}
				});
			});
		}
	}

	getReportFromQuery(reportID: any) {
		this.claimBenefitAccumService.getAccumReport(reportID).subscribe((data) => {
			if (data.length > 0) {

			}
		});
	}
	
	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	cancelReport() {
		this.activeModal.close();
	}
}
