/* Copyright (c) 2020 . All Rights Reserved. */

import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UntilDestroy } from "@ngneat/until-destroy";
import { GridOptions } from "ag-grid-community";
import { NgbToastType } from "ngb-toast";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/debounceTime";
import { MessageMasterDtl } from "../../../api-models";
import { BenefitRuleSelect } from "../../../api-models/benefit-rule-select.model";
import { DddwDtlService, MessageMasterDtlService, SystemCodesService } from "../../../api-services";
import { BenefitRuleSelectionService } from "../../../api-services/benefit-rule-selection.service";
import { AlertMessage, AlertMessageService } from "../../../shared/components/alert-message";
import { DynamicFormComponent } from "../../../shared/components/dynamic-form/dynamic-form.component";
import { PopUpMessage, PopUpMessageButton } from "../../../shared/components/pop-up-message";
import { PopUpMessageComponent } from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import { PopUpIconType } from "../../../shared/config";
import { BenefitRuleSelectionFields, BenefitRuleSelectionFormConfig } from "../../../shared/models/constants";
import { FormField, FormRow, FORM_FIELD_ACTION_TYPES, Menu, Option } from "../../../shared/models/models";
import { Mask } from "../../../shared/pipes/text-format.pipe";
import { CONSTANTS } from "../../../shared/services/shared.service";
import { ToastService } from "../../../shared/services/toast.service";
import { CustomValidators } from "../../../shared/validators/custom-validator";
import { FormValidation } from "../../../shared/validators/form-validation.pipe";
import { SecWinViewModel } from "../../../view-model/security/sec-win-view-model";


// Use the Component directive to define the BenefitRuleSelectionComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.
@UntilDestroy({ checkProperties: true })
@Component({
	selector: "benefitruleselection",
	styleUrls: ["./benefit-rule-selection.component.scss"],
	templateUrl: "./benefit-rule-selection.component.html",
})
export class BenefitRuleSelectionComponent
	implements OnInit, AfterViewInit {
	@Input() columnName: string;
	@Input() benefitRuleId: string;
	@Input() benefitRuleType: string;
	@Input() isEditState: string;
	@Input() newAddedData: any;
	@Input() isSave: boolean = false;
	@Input() secWin: SecWinViewModel;
	@Output() onBenefitRule = new EventEmitter<any>();
	SubmitButton = false;
	// The form model used by the view per Angular Reactive Forms
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	benefitRuleSelectionForm: FormGroup;
	formValidation: FormValidation;
	alertMessage: AlertMessage;
	displayMessage: any;
	popUpMessage: PopUpMessage;
	dataGridGridOptions: GridOptions;
	dataGridgridApi: any;
	dataGridgridColumnApi: any;
	benefitRuleMaintModel: BenefitRuleSelect[];
	editBenefitRuleSelect: boolean;
	benefitRuleSelect: BenefitRuleSelect;

	benefitRuleSelectState = new Array<FormRow>();
	benefitRuleSelectionFormConfig = BenefitRuleSelectionFormConfig;
	isSaveForm = false;
	selectedIndexes = new Array<Option>();
	isLoading = true;
	// update to true when Get records
	isFilter: boolean = false;
	@Input() showIcon: boolean = false;
	menu: Menu[] = [];
	@ViewChild("popUpMesssage") child: PopUpMessageComponent;
	rules: any;
	@ViewChild('dynamicform', { read: ElementRef }) dynamicform: ElementRef;
	// Use constructor injection to inject an instance of a FormBuilder
	isFormEditable: boolean = false;
	buttonDisabled: boolean = false;
	isSuperUser: boolean = false;
	constructor(
		private formBuilder: FormBuilder,
		private mask: Mask,
		private toastr: ToastService,
		private customValidators: CustomValidators,
		public activeModal: NgbActiveModal,
		private alertMessageService: AlertMessageService,
		private benefitRuleSelectionService: BenefitRuleSelectionService,
		private toastService: ToastService,
		private dddwDtlService: DddwDtlService,
		private modalService: NgbModal,
		private messageService: MessageMasterDtlService,
		private systemCodesService: SystemCodesService,
		private eleRef: ElementRef
	) { }

	// Most initial setup should be done in the ngOnInit() life-cycle hook function
	// rather than in the constructor for this class in order to ensure that the
	// resources are fully loaded before performing the initial setup processing.
	ngOnInit(): void {
		this.createForm();
		this.displayMessage = {};
		this.formValidation = new FormValidation(this.benefitRuleSelectionForm);
		this.checkInsertUpdatePermission();
		this.createDataGrid();
		this.getOperators();
		this.getStates();
	}


	checkInsertUpdatePermission() {
		this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
		if (this.isSuperUser) {
			this.isFormEditable = true;
			this.buttonDisabled = false;
		} else {
			if (this.secWin.hasInsertPermission()) {
				this.isFormEditable = true;
				this.buttonDisabled = false;
			} else {
				this.isFormEditable = true;
				this.buttonDisabled = true;
			}
		}
	}

	ngAfterViewInit() {
		if (this.columnName == "Med Def Filter") {
			this.getStateFieldStatus();
		}
		this.benefitRuleSelectionFormConfig.map((field) =>
			this.columnName != "Med Def Filter" && field.name == "state"
				? (field.hideField = true)
				: (field.hideField = false)
		);
	}

	getStateFieldStatus() {
		if (this.benefitRuleType) {
			this.benefitRuleSelectionService
				.getBenefitRuleSelectStateAllowedStatus(this.benefitRuleType)
				.subscribe((medDefStateStatus: string) => {
					if (medDefStateStatus == "N") {
						this.benefitRuleSelectionFormConfig.map((field) =>
							this.columnName === "Med Def Filter" && field.name == "state"
								? (field.disabled = true)
								: ""
						);
					} else {
						this.benefitRuleSelectionFormConfig.map((field) =>
							this.columnName === "Med Def Filter" && field.name == "state"
								? (field.disabled = false)
								: ""
						);
					}
				});
		}
	}

	showPopUp(message: string, title: string, iconType = PopUpIconType.CLOSE) {
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
			new PopUpMessageButton("Cancel", "Ok", "btn btn-primary"),
		];
		let ref = this.modalService.open(PopUpMessageComponent);
		ref.componentInstance.popupMessage = popUpMessage;
		ref.componentInstance.iconType = iconType;
	}

	popupMessageHandler(button: PopUpMessageButton) {
		if (button.name === "yes") {
			console.log("button yes has been click!");
		}
		if (button.name === "no") {
			console.log("button No has been click!");
		}
	}

	popUpButtonHandler(button: any) {
		if (button.popupMessage.name === "poUpMessageName") {
			this.popupMessageHandler(button);
		}
	}

	dataGridGridOptionsExportCsv() {
		const params = {};
		this.dataGridgridApi.exportDataAsCsv(params);
	}

	createDataGrid(): void {
		this.dataGridGridOptions = {
			paginationPageSize: 50,
		};
		this.dataGridGridOptions.editType = "fullRow";
		this.dataGridGridOptions.columnDefs = [
			{
				headerName: "Operator",
				field: "operator",
				width: 150,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true,
			},
			{
				headerName: "From Value",
				field: "fromValue",
				width: 150,
			},
			{
				headerName: "Thru Value",
				field: "thruValue",
				width: 150,
			},
		];
		if (this.columnName === "Med Def Filter") {
			this.dataGridGridOptions.columnDefs.push({
				headerName: "State",
				field: "state",
				width: 150,
			});
		}
	}

	// Use a FormBuilder to create a FormGroup to define the Form Model for the view
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	createForm() {
		// FormBuilder.group is a factory method that creates a FormGroup
		// FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
		this.benefitRuleSelectionForm = this.formBuilder.group(
			{},
			{ updateOn: "submit" }
		);
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	populateBenefitRuleSelectionGrid() {
		//TODO In case of Pagination use getBenefitRuleSelection(true, 1, 50) as args
		this.benefitRuleSelectionService.findByRuleID(this.benefitRuleId).subscribe((benefitRuleMaintModel) => {
			this.isLoading = false;
			if (this.columnName === "Med Def Filter") {
				this.benefitRuleMaintModel = benefitRuleMaintModel.filter(
					(record: BenefitRuleSelect) =>
						record.columnName === "med_def_filter" &&
						record.columnOccurrence === 1 &&
						record.benefitRuleSelectPrimaryKey.ruleId === this.benefitRuleId
				);
			} else if (this.columnName === "Count Toward Max") {
				this.benefitRuleMaintModel = benefitRuleMaintModel.filter(
					(record: BenefitRuleSelect) =>
						record.columnName === "reason_code" &&
						record.columnOccurrence === 1 &&
						record.benefitRuleSelectPrimaryKey.ruleId === this.benefitRuleId
				);
			} else {
				this.benefitRuleMaintModel = benefitRuleMaintModel.filter(
					(record: BenefitRuleSelect) =>
						record.columnName === "other_med_def_code" &&
						record.columnOccurrence === 2 &&
						record.benefitRuleSelectPrimaryKey.ruleId === this.benefitRuleId
				);
			}

			if (this.benefitRuleMaintModel && this.benefitRuleMaintModel.length > 0) {
				if (this.newAddedData && this.newAddedData.length > 0) {
					this.populateDynamicForm(this.newAddedData);
				} else {
					this.populateDynamicForm(this.benefitRuleMaintModel);
				}
				this.benefitRuleSelect = this.benefitRuleMaintModel[0]; // TODO need to get selected row from dynamic form, when inline grid (?) row selection is done
			} else {
				this.populateDynamicForm(this.newAddedData);
			}
		});
	}

	getOperators() {
		this.dddwDtlService
			.findByColumnNameAndDwname(
				CONSTANTS.OPERATOR,
				CONSTANTS.DW_BRULE_SELECT_DE
			)
			.subscribe((dropdowns) => {
				this.rules = dropdowns;
				var Options: any = [];
				this.rules.forEach(function (index: any) {
					Options.push({
						key: index.dddwDtlPrimaryKey.displayVal,
						value: index.dddwDtlPrimaryKey.dataVal,
					});
				});
				this.benefitRuleSelectionFormConfig[0].options = Options;
			});
	}

	getStates() {
		this.systemCodesService.findBySystemCodeTypeAndSystemCodeActiveAndLanguageIdState("BENEFSTATE", "Y", 0).subscribe((dropdowns) => {
			this.rules = dropdowns;
			var Options: any = [];
			this.rules.forEach(function (index: any) {
				if (index.systemCodeDesc1 != " ") {
					Options.push({
						key: index.systemCodeDesc1,
						value: index.systemCodeDesc1,
					});
				}
			});
			this.benefitRuleSelectionFormConfig[3].options = Options;
			//Becuase of states take time
			if (this.isEditState) {
				// not fetch the data in case of creating new ruleID
				this.populateBenefitRuleSelectionGrid();
			} else {
				if (this.newAddedData.length > 0) {
					this.populateDynamicForm(this.newAddedData);
				} //If newly data added then display it
				this.isLoading = false;
			}
		});
	}

	//-------------------------------------------------- Dynamic for work

	populateDynamicForm(benefitRuleSelect: BenefitRuleSelect[]) {
		if (benefitRuleSelect && benefitRuleSelect.length > 0) {
			benefitRuleSelect.forEach((record: BenefitRuleSelect) => {
				let mockConfig = JSON.parse(
					JSON.stringify(this.benefitRuleSelectionFormConfig)
				); // make a copy of original config
				this.benefitRuleSelectionFormConfig.forEach((field, index) => {
					if (field.name === BenefitRuleSelectionFields.OPERATOR) {
						mockConfig[index].value = record.operator;
					} else if (field.name === BenefitRuleSelectionFields.FROM_VALUE) {
						mockConfig[index].value = record.fromValue;
					} else if (field.name === BenefitRuleSelectionFields.THRU_VALUE) {
						mockConfig[index].value = record.thruValue;
					} else if (field.name === BenefitRuleSelectionFields.STATE) {
						mockConfig[index].value = record.state;
					}
				});

				let formState: FormRow = new FormRow();
				formState.formFields = mockConfig;
				formState.id = {
					ruleId: record.benefitRuleSelectPrimaryKey.ruleId,
					seqBenRuleSel: record.benefitRuleSelectPrimaryKey.seqBenRuleSel,
				};
				this.benefitRuleSelectState.push(formState); // add record
			});
			this.benefitRuleSelectState = JSON.parse(
				JSON.stringify(this.benefitRuleSelectState)
			); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
		} else {
			this.benefitRuleSelectState = [];
			this.benefitRuleSelectState = JSON.parse(JSON.stringify(this.benefitRuleSelectState));
		}
	}

	// -----------------------------  check field validation
	formValueValidationMsg: any = null;
	isValidationCheckFirstTime = true;

	onFieldChange(event: any) { }

	dynamicformChange(event: any) { }

	onKeyUpFieldsChange(data: any) {
		if (data.event.key === "Tab") {
			const index: number = data.i;
			let field: FormField = data.formField;
			let fieldName = field.name + index;
			let fromName = "fromValue" + index;
			if (fieldName == BenefitRuleSelectionFields.OPERATOR + index) {
				if (!data.field.controls[fieldName].value || data.field.controls[fieldName].value == "") {
					this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
						let formValueValidationMsg = message[0].messageText.replace('@1', fieldName);
						this.showPopUp("22027: " + formValueValidationMsg, "Benefit Rule Select");
					});
					let querySelectorName = (fieldName + "select");
					setTimeout(() => {
						document.getElementById(querySelectorName).focus();
					}, 0);
				}
			}
			if (fieldName == BenefitRuleSelectionFields.FROM_VALUE + index) {
				if (!data.field.controls[fieldName].value || data.field.controls[fieldName].value == "") {
					this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
						let formValueValidationMsg = message[0].messageText.replace('@1', 'from_value');
						this.showPopUp("29032: " + formValueValidationMsg, "Benefit Rule Select");
					});
					let querySelectorName = (fieldName + "text");
					setTimeout(() => {
						document.getElementById(querySelectorName).focus();
					}, 0);
				}
			}
			if (fieldName == BenefitRuleSelectionFields.THRU_VALUE + index) {
				let fromValue = data.field.controls[fromName].value;
				let thruValue = data.field.controls[fieldName].value;
				if (thruValue) {
					if (fromValue > thruValue) {
						this.messageService.findByMessageId(22027).subscribe((message: MessageMasterDtl[]) => {
							let formValueValidationMsg = message[0].messageText.replace('@1', fieldName);
							this.showPopUp("22027: " + formValueValidationMsg, "Benefit Rule Select");
						});
						let querySelectorName = (fieldName + "text");
						setTimeout(() => {
							document.getElementById(querySelectorName).focus();
						}, 0);
					}
				}
			}
		}
	}

	/**
	 * On Ok button click emit select benefit rule select value;
	 */
	emitBenefitRuleSelect() {
		if (this.benefitRuleId) {
			this.isSaveForm = true;
		} else {
			this.showPopUp("Benefit Rule Not selected", "Benefit Rule Select");
		}
	}

	populateBenefitRuleSelectField(event: any, action: FORM_FIELD_ACTION_TYPES): BenefitRuleSelect {
		let benefitRuleSelect = new BenefitRuleSelect();
		benefitRuleSelect.operator = event[0].value ? event[0].value : "";
		benefitRuleSelect.fromValue = event[1].value ? event[1].value : "";
		benefitRuleSelect.thruValue = event[2].value ? event[2].value : "";
		benefitRuleSelect.state = event[3] ? event[3].value : "";

		benefitRuleSelect.columnType = "C"; // TODO:: need to make it generic: set the column type to static only for string type id popup,
		if (this.columnName == "Med Def Filter") {
			benefitRuleSelect.columnName = "med_def_filter";
			benefitRuleSelect.columnOccurrence = 1;
		} else if (this.columnName == "Count Toward Max") {
			benefitRuleSelect.columnName = "reason_code";
			benefitRuleSelect.columnOccurrence = 1;
		} else {
			// for:  Other Med Defs
			benefitRuleSelect.columnName = "other_med_def_code";
			benefitRuleSelect.columnOccurrence = 2;
		}
		benefitRuleSelect.action = action;
		return benefitRuleSelect;
	}

	onBenefitRuleSelect: BenefitRuleSelect[] = [];
	saveBenefitSelect(event: any) {

		this.onBenefitRuleSelect = [];
		this.isSaveForm = false;
		const updatedRecords: FormRow[] = this.benefitRuleSelectState.filter(
			(record: any, index) => {
				record.index = index;
				return (
					record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
					record.action === FORM_FIELD_ACTION_TYPES.DELETE
				);
			}
		);
		let benefitRuleSelectCreate: BenefitRuleSelect[] = [];
		let benefitRuleSelectUpdate: BenefitRuleSelect[] = [];
		if (updatedRecords.length > 0) {
			updatedRecords.forEach((preStateRecord: FormRow, index) => {
				if (preStateRecord.action) {
					let updatedRecord = event[preStateRecord.index];
					const pair = Object.keys(updatedRecord).map((k) => ({
						key: k,
						value: updatedRecord[k],
					}));
					let benefitRuleSelect: BenefitRuleSelect = this.populateBenefitRuleSelectField(pair, preStateRecord.action);
					benefitRuleSelect.action = preStateRecord.action;
					benefitRuleSelect.benefitRuleSelectPrimaryKey = preStateRecord.id;
					this.onBenefitRuleSelect.push(benefitRuleSelect);
					benefitRuleSelectUpdate.push(benefitRuleSelect);
				}
			});
		}

		const newRecords = event.slice(this.benefitRuleSelectState.length);
		newRecords.forEach((record: any) => {
			const pair = Object.keys(record).map((k) => ({
				key: k,
				value: record[k],
			}));
			let benefitRuleSelect: BenefitRuleSelect = this.populateBenefitRuleSelectField(pair, FORM_FIELD_ACTION_TYPES.ADD);
			benefitRuleSelect.action = FORM_FIELD_ACTION_TYPES.ADD;
			benefitRuleSelect.benefitRuleSelectPrimaryKey = { ruleId: this.benefitRuleId, };
			this.onBenefitRuleSelect.push(benefitRuleSelect);
			benefitRuleSelectCreate.push(benefitRuleSelect);
		});
		let operatorRequiredFlag: boolean = false;
		let fromValueRequiredFlag: boolean = false;
		let thruValueCheckFlag: boolean = false;
		for (let benefitRuleSelect of this.onBenefitRuleSelect) {
			console.log("benefitRuleSelect", benefitRuleSelect);
			if (!benefitRuleSelect.operator || benefitRuleSelect.operator == "") {
				operatorRequiredFlag = true;
			}
			if (!benefitRuleSelect.fromValue || benefitRuleSelect.fromValue == "") {
				fromValueRequiredFlag = true;
			}
			if (benefitRuleSelect.fromValue && benefitRuleSelect.thruValue) {
				if ((Number(benefitRuleSelect.fromValue) > Number(benefitRuleSelect.thruValue))) {
					thruValueCheckFlag = true;
				}
			}
		}
		if (operatorRequiredFlag || fromValueRequiredFlag) {
			this.messageService.findByMessageId(29034).subscribe((message: MessageMasterDtl[]) => {
				this.showPopUp("29034: " + message[0].messageText, "Benefit Rule Select");
			});
			return;
		}
		if (thruValueCheckFlag) {
			this.messageService.findByMessageId(22027).subscribe((message: MessageMasterDtl[]) => {
				this.showPopUp("22027: " + message[0].messageText, "Benefit Rule Select");
			});
			return;
		}

		this.formValidation.validateForm();

		if (this.benefitRuleSelectionForm.valid) {
			if (benefitRuleSelectCreate.length > 0) {
				if (this.isSuperUser) {
					this.createBenefitRuleSelect(benefitRuleSelectCreate);
				}else{
					if(this.secWin.hasInsertPermission()){
						this.createBenefitRuleSelect(benefitRuleSelectCreate);
					}else{
						this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
							this.form1PopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Benefit Package')
						});
					}
				}

			} else {
				this.activeModal.close()
				this.benefitRuleSelectCreateStatus = true;
			}
			if (benefitRuleSelectUpdate.length > 0) {
				if(this.isSuperUser){
				this.updateBenefitRuleSelect(benefitRuleSelectUpdate);
				}else{
					if(this.secWin.hasUpdatePermission()){
						this.updateBenefitRuleSelect(benefitRuleSelectUpdate);
					}else{
						this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
							this.form1PopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Benefit Package')
						});
					}
				}
			} else {
				this.benefitRuleSelectUpdateStatus = true;
			}
		} else {
			this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
		}
	}

	// -----------------------------------------------------------------------------------------

	
    form1PopupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                if (resp.name === 'Ok') {
                    this.activeModal.close();
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

	benefitRuleSelectCreateStatus: boolean = false;
	benefitRuleSelectUpdateStatus: boolean = false;
	createBenefitRuleSelect(benefitRuleSelectCreate: BenefitRuleSelect[] = []) {
		this.benefitRuleSelectionService.createBenefitRuleSelect(benefitRuleSelectCreate).subscribe((response) => {
			this.benefitRuleSelectCreateStatus = true;
			this.onResultBenefitRuleSelect();
		});
	}

	updateBenefitRuleSelect(benefitRuleSelectCreate: BenefitRuleSelect[] = []) {
		this.benefitRuleSelectionService.updateBenefitRuleSelect(benefitRuleSelectCreate).subscribe((response) => {
			this.benefitRuleSelectUpdateStatus = true;
			this.onResultBenefitRuleSelect();
		});
	}

	onResultBenefitRuleSelect() {
		if (this.benefitRuleSelectCreateStatus && this.benefitRuleSelectUpdateStatus) {
			this.toastr.showToast("Record updated successfully", NgbToastType.Success);
			this.onBenefitRule.emit(this.onBenefitRuleSelect);
			this.activeModal.close("OK");
		}
	}

	deleteBenefitRuleSelect(seqBenRuleSel: string) {
		this.benefitRuleSelectionService.deleteBenefitRuleSelect(seqBenRuleSel).subscribe((response) => {
			this.toastr.showToast("Record successfully deleted", NgbToastType.Success);
		});
	}

	getBenefitRuleSelect(seqBenRuleSel: string) {
		this.benefitRuleSelectionService.getBenefitRuleSelect(seqBenRuleSel).subscribe((benefitRuleSelect) => {
			this.benefitRuleSelect = benefitRuleSelect;
			this.benefitRuleSelectionForm.patchValue({});
		});
	};

	modalClose = () => {
		this.activeModal.close();
	}
}
