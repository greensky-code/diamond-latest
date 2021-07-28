import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMyDateModel, IMySingleDateModel } from 'angular-mydatepicker';
import { NgbToastType } from 'ngb-toast';
import { forkJoin } from 'rxjs';
import { GroupMaster } from '../../../../api-models';
import { GroupStateMandate, TermReasonViewModel } from '../../../../api-models/addon/group-state-mandate.model';
import { GroupMasterService } from '../../../../api-services';
import { GroupStateMandateService } from '../../../../api-services/addon/group-state-mandate.service';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { Form } from "../../../../shared/helpers/form.helper";
import { DynamicConfigFormRow, FormField, FormRow, FORM_FIELD_ACTION_TYPES, Option } from '../../../../shared/models/models';
import { ToastService } from '../../../../shared/services/toast.service';
import {
	StateMandateFields,
	StateMandateGroupFilingsConfig, StateMandateSubGroupConfig, StateMandateSubGroupFields
} from '../../addon.constants';
import { AdministrativeDetailComponent } from '../administrative-detail.component';

@Component({
	selector: "app-state-mandate-detail",
	templateUrl: "./state-mandate-detail.component.html",
	styleUrls: ["./state-mandate-detail.component.css"],
	providers: [DatePipe],
})
export class StateMandateDetailComponent implements OnInit {
	@Input() parentComponent: AdministrativeDetailComponent;

	groupMaster: GroupMaster;
	etStateMandateGroupFilings: GroupStateMandate[] = [];
	etStateMandateGroupFilingsConfig = StateMandateGroupFilingsConfig;
	etStateMandateGroupFilingsFormState = new Array<DynamicConfigFormRow>();
	resetStateMandateGrid = false;

	stateMandateSubFilings: GroupStateMandate[] = [];
	stateMandateSubFilingsConfig = StateMandateSubGroupConfig;
	stateMandateSubFilingsFormState = new Array<DynamicConfigFormRow>();
	resetStateMandateSubGrid = false;

	excludeTypes: string[] = [];
	stateCodes: string[] = [];
	excludeStateList: string[] = [];
	terminateReasons: TermReasonViewModel[] = [];
	SubmitBtn = "Save Changes";

	isInitialDataLoaded = false;
	isInitialSubDataLoaded = false;
	loaderOne: boolean = true;
	loaderTwo: boolean = true;
	constructor(
		private groupStateMandateService: GroupStateMandateService,
		private datePipe: DatePipe,
		public activeModal: NgbActiveModal,
		private modalService: NgbModal,
		private groupMasterService: GroupMasterService,
		private toastService: ToastService
	) { }

	ngOnInit(): void {
		if (this.parentComponent.groupNumber) {
			this.groupMasterService.getGroupMasterByGroupId(this.parentComponent.groupNumber).subscribe((groupMaster: GroupMaster) => {
				this.groupMaster = groupMaster;
				this.loadDropDownValues();
			});
		}

	}

	loadDropDownValues() {
		forkJoin({
			excludeTypes: this.groupStateMandateService.getExcludeType(),
			stateCodes: this.groupStateMandateService.getETStateCodes(),
			excludeStateList: this.groupStateMandateService.getExcludeStateList(
				this.parentComponent.seqGroupId
			),
			terminateReasons: this.groupStateMandateService.getTerminateReasons(),
		}).subscribe(
			({ excludeTypes, stateCodes, excludeStateList, terminateReasons }) => {
				this.excludeTypes = excludeTypes;
				this.stateCodes = stateCodes;
				this.excludeStateList = excludeStateList;
				this.terminateReasons = terminateReasons;
				this.loadGridOneData();
				this.loadGridTwoData();
			});
	}

	loadGridOneData() {
		this.groupStateMandateService.getGroupStateMandates(this.parentComponent.seqGroupId).subscribe((value) => {
			this.etStateMandateGroupFilings = value;
			this.populateEtStateMandateDynamicForm();
		});
	}

	loadGridTwoData() {
		this.groupStateMandateService
			.getGroupStateMandates(this.parentComponent.seqGroupId)
			.subscribe(
				(value) => {
					this.stateMandateSubFilings = value;
					this.populateStateMandateSubGroupDynamicForm();
				});
	}

	populateStateMandateSubGroupDynamicForm() {
		
		const values = this.stateMandateSubFilings;
		// set dynamic grid dropdown values
		this.stateMandateSubFilingsConfig.forEach((field: FormField) => {
			field.options = new Array<Option>();

			if (field.name == StateMandateSubGroupFields.EXCLUDE_TYPE) {
				if (this.excludeTypes && this.excludeTypes.length > 0) {
					this.excludeTypes.forEach((value) => {
						field.options.push({
							key: value,
							value: value,
						});
					});
				}
			} else if (field.name == StateMandateSubGroupFields.ET_STATE) {
				if (this.excludeStateList && this.excludeStateList.length > 0) {
					this.excludeStateList.forEach((value) => {
						field.options.push({
							key: value,
							value: value,
						});
					});
				}
			} else if (field.name == StateMandateSubGroupFields.TERM_REASON) {
				if (this.terminateReasons && this.terminateReasons.length > 0) {
					this.terminateReasons.forEach((value) => {
						field.options.push({
							key: value.termReasonDesc,
							value: value.termReason,
						});
					});
				}
			}
		});

		if (!values || values.length == 0) {
			this.stateMandateSubFilingsFormState = JSON.parse(JSON.stringify(this.stateMandateSubFilingsFormState));
			this.isInitialSubDataLoaded = true;
			this.isSetLoaderIcon();
			return;
		}
		values.forEach((value: GroupStateMandate) => {
			let mockConfig = JSON.parse(
				JSON.stringify(this.stateMandateSubFilingsConfig)
			);
			let formState: FormRow = new FormRow();

			mockConfig.forEach((field: any, index: any) => {
				mockConfig[index].disabled = true;
				if (field.name === StateMandateSubGroupFields.EXCLUDE_TYPE) {
					mockConfig[index].value = value.operator;
				} else if (field.name === StateMandateSubGroupFields.ET_STATE) {
					mockConfig[index].value = value.state;
				} else if (field.name === StateMandateSubGroupFields.EFFECTIVE_DATE) {
					mockConfig[index].value = value.effectiveDate;
				} else if (field.name === StateMandateSubGroupFields.TERM_DATE) {
					mockConfig[index].value = value.termDate;
				} else if (field.name === StateMandateSubGroupFields.TERM_REASON) {
					mockConfig[index].value = value.termReason;
				}
			});

			formState.formFields = mockConfig;
			formState.id = {
				data: value,
			};
			formState.action = null;
			this.stateMandateSubFilingsFormState.push(formState);
		});

		this.stateMandateSubFilingsConfig = JSON.parse(JSON.stringify(this.stateMandateSubFilingsConfig));
		this.stateMandateSubFilingsFormState = JSON.parse(JSON.stringify(this.stateMandateSubFilingsFormState));
		this.isInitialSubDataLoaded = true;
		this.isSetLoaderIcon();
	}

	populateEtStateMandateDynamicForm() {

		const values = this.etStateMandateGroupFilings;
		// set dynamic grid dropdown values
		this.etStateMandateGroupFilingsConfig.forEach((field: FormField) => {
			field.options = new Array<Option>();

			if (field.name == StateMandateFields.ET_STATE) {
				if (this.stateCodes && this.stateCodes.length > 0) {
					this.stateCodes.forEach((value) => {
						field.options.push({
							key: value,
							value: value,
						});
					});
				}
			} else if (field.name == StateMandateFields.TERM_REASON) {
				if (this.terminateReasons && this.terminateReasons.length > 0) {
					this.terminateReasons.forEach((value) => {
						field.options.push({
							key: value.termReasonDesc,
							value: value.termReason,
						});
					});
				}
			}
		});
		
		if (!values || values.length == 0) {
			this.etStateMandateGroupFilingsFormState = JSON.parse(JSON.stringify(this.etStateMandateGroupFilingsFormState));
			this.isInitialDataLoaded = true;
			this.isSetLoaderIcon();
			return;
		}
		values.forEach((value: GroupStateMandate) => {
			let mockConfig = JSON.parse(JSON.stringify(this.etStateMandateGroupFilingsConfig));
			let formState: FormRow = new FormRow();

			mockConfig.forEach((field: any, index: any) => {
				mockConfig[index].disabled = true;
				if (field.name === StateMandateFields.ET_STATE) {
					mockConfig[index].value = value.state;
				} else if (field.name === StateMandateFields.EFFECTIVE_DATE) {
					mockConfig[index].value = value.effectiveDate;
				} else if (field.name === StateMandateFields.TERM_DATE) {
					mockConfig[index].value = value.termDate;
				} else if (field.name === StateMandateFields.TERM_REASON) {
					mockConfig[index].value = value.termReason;
				}
			});

			formState.formFields = mockConfig;
			formState.id = {
				data: value,
			};
			formState.action = null;
			this.etStateMandateGroupFilingsFormState.push(formState);
		});
		this.etStateMandateGroupFilingsConfig = JSON.parse(JSON.stringify(this.etStateMandateGroupFilingsConfig));
		this.etStateMandateGroupFilingsFormState = JSON.parse(JSON.stringify(this.etStateMandateGroupFilingsFormState));
		this.isInitialDataLoaded = true;
		this.isSetLoaderIcon();
	}

	isSetLoaderIcon() {
		if(this.isInitialDataLoaded) {
			this.loaderOne = false;
		}
		if(this.isInitialSubDataLoaded) {
			this.loaderTwo = false;
		}
		
	}

	saveForm(event: any) {
		if (!this.parentComponent.seqGroupId) {
			this.parentComponent.showPopUp(
				"SeqGroupId is not found",
				"Pricing Partner Details"
			);
			return;
		}

		this.etStateMandateGroupFilingsFormState = event.formState;
		event = event.fields;

		let apiValues = new Array<GroupStateMandate>();
		this.etStateMandateGroupFilingsFormState.forEach((record, index) => {
			if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
				let groupStateMandate = new GroupStateMandate();

				let newRecord = event[0];
				const pair = Object.keys(event[0]).map((k) => ({
					key: k,
					value: newRecord[k],
				}));
				let apiValue: GroupStateMandate = this.populateFormFields(
					groupStateMandate,
					pair,
					FORM_FIELD_ACTION_TYPES.ADD
				);
				if (!apiValue.effectiveDate || apiValue.effectiveDate == '') {
					this.parentComponent.alertMessage = this.parentComponent.alertMessageService.error("Effective date is required");
				} else {
					apiValue.stateIndex = index;
					apiValues.push(apiValue);
				}
			}
		});

		apiValues.forEach((value) => {
			if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
				value.insertDatetime = this.datePipe.transform(new Date(),"dd-MM-yyyy HH:mm:ss");
				value.insertDatetime = this.datePipe.transform(new Date(),"dd-MM-yyyy HH:mm:ss");

				value.insertUser = sessionStorage.getItem("user");
				value.insertProcess = "ADDON";
				value.levelCode = this.groupMaster.levelCode;
				value.seqGroupId = this.parentComponent.seqGroupId;
				value.mandateType = "ET";
				value.operator = "INCL";
				this.groupStateMandateService.createGroupStateMandate(value).subscribe((resp) => {
					for(let field of this.etStateMandateGroupFilingsFormState[value.stateIndex].formFields) {
						field.disabled = true;
					}
					this.etStateMandateGroupFilingsFormState[value.stateIndex].id = {data: resp,};
					this.etStateMandateGroupFilingsFormState[value.stateIndex].action = FORM_FIELD_ACTION_TYPES.UPDATE;
					this.etStateMandateGroupFilingsFormState[value.stateIndex].showCancelButton = false;
					this.toastService.showToast("Inserted Successfully", NgbToastType.Success);
				});
			}
		});
	}

	populateFormFields(
		groupStateMandate: GroupStateMandate,
		event: any,
		action: FORM_FIELD_ACTION_TYPES
	): GroupStateMandate {
		groupStateMandate.state = event[0].value;

		groupStateMandate.effectiveDate = event[1].value;
		groupStateMandate.termDate = event[2].value;
		groupStateMandate.termReason = event[3].value;

		// ----------------------- Dates conversion to format
		let termDate = event[2].value.singleDate
			? event[2].value.singleDate.date
			: null;
		if (termDate) {
			groupStateMandate.termDate =
				termDate.year +
				"-" +
				this.addPrefixZero(termDate.month) +
				"-" +
				this.addPrefixZero(termDate.day);
		}

		let effectiveDate = event[1].value.singleDate
			? event[1].value.singleDate.date
			: null;
		if (effectiveDate) {
			groupStateMandate.effectiveDate =
				effectiveDate.year +
				"-" +
				this.addPrefixZero(effectiveDate.month) +
				"-" +
				this.addPrefixZero(effectiveDate.day);
		}

		groupStateMandate.action = action;

		return groupStateMandate;
	}

	onFilingDetailFieldChange($event: any) {
		let field: FormField = $event.formField;
		const index: number = $event.index;
		let form: FormGroup = $event.field;
		let prevState: Array<DynamicConfigFormRow> = $event.prevState;

		prevState[index].showCancelButton = true;
		if (field.name === StateMandateFields.TERM_DATE + index) {
			// pass Term-Field Value , and Effective Date field value
			this.validateTermDate(
				field.value,
				form.controls[StateMandateFields.EFFECTIVE_DATE + index].value
			);
		}
	}

	onFilingDetailNewRowAdded($event: any) {
		const prevState: Array<DynamicConfigFormRow> = $event.prevState;
		prevState[prevState.length - 1].showCancelButton = true;
		$event.form.controls.fields.controls[$event.index - 1].enable();
	}

	validateTermDate(event: IMyDateModel, svcDate: any) {
		if (event && svcDate) {
			let termDate = this.getDate(event.singleDate);
			let effectiveDate = this.getDate(svcDate.singleDate);
			if (this.isValidDate(termDate) && this.isValidDate(effectiveDate)) {
				let isValid = termDate.getTime() == effectiveDate.getTime();
				if (!isValid) {
					this.openDateValidationPopupError(true);
				}
			}
		}
	}

	isValidDate(date: Date): boolean {
		return date instanceof Date && !isNaN(date.valueOf());
	}

	getDate(jsDate: IMySingleDateModel): Date {
		return Form.getDate(jsDate);
	}

	public addPrefixZero(value: any) {
		return value < 10 ? "0" + value : value;
	}

	openDateValidationPopupError(isTermDate = true) {
		let popMsg = new PopUpMessage(
			"Pricing Partner Details",
			"Pricing Partner Details",
			"7777: Dates are overlapping",
			"info",
			[],
			MessageType.ERROR
		);

		popMsg.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
		let ref = this.modalService.open(PopUpMessageComponent);
		ref.componentInstance.showIcon = true;
		ref.componentInstance.popupMessage = popMsg;
	}

	saveSubFillingForm(event: any) {
		if (!this.parentComponent.seqGroupId) {
			this.parentComponent.showPopUp(
				"SeqGroupId is not found",
				"Pricing Partner Details"
			);
			return;
		}

		this.stateMandateSubFilingsFormState = event.formState;
		event = event.fields;

		let apiValues = new Array<GroupStateMandate>();

		this.stateMandateSubFilingsFormState.forEach((record, index) => {
			if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
				let groupStateMandate = new GroupStateMandate();

				let newRecord = event[0];
				const pair = Object.keys(event[0]).map((k) => ({
					key: k,
					value: newRecord[k],
				}));
				let apiValue: GroupStateMandate = this.populateSubFormFields(
					groupStateMandate,
					pair,
					FORM_FIELD_ACTION_TYPES.ADD
				);
				if (!apiValue.effectiveDate || apiValue.effectiveDate == '') {
					this.parentComponent.alertMessage = this.parentComponent.alertMessageService.error("Effective date is required");
				} else {
					apiValue.stateIndex = index;
					apiValues.push(apiValue);
				}
			}
		});

		apiValues.forEach((value) => {
			if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
				value.insertDatetime = this.datePipe.transform(
					new Date(),
					"dd-MM-yyyy HH:mm:ss"
				);
				value.insertDatetime = this.datePipe.transform(
					new Date(),
					"dd-MM-yyyy HH:mm:ss"
				);

				value.insertUser = sessionStorage.getItem("user");
				value.insertProcess = this.parentComponent.windowId;
				value.levelCode = this.groupMaster.levelCode;
				value.seqGroupId = this.parentComponent.seqGroupId;
				value.mandateType = "ET";
				// value.operator = 'EXCL';
				this.groupStateMandateService.createGroupStateMandate(value).subscribe((resp) => {
						for(let field of this.stateMandateSubFilingsFormState[value.stateIndex].formFields) {
							field.disabled = true;
						}
						this.stateMandateSubFilingsFormState[value.stateIndex].id = {data: resp,};
						this.stateMandateSubFilingsFormState[value.stateIndex].action = FORM_FIELD_ACTION_TYPES.UPDATE;
						this.stateMandateSubFilingsFormState[value.stateIndex].showCancelButton = false;
						this.toastService.showToast("Inserted Successfully", NgbToastType.Success);
				});
			}
		});
	}

	populateSubFormFields(groupStateMandate: GroupStateMandate, event: any, action: FORM_FIELD_ACTION_TYPES): GroupStateMandate {
		groupStateMandate.operator = event[0].value;
		groupStateMandate.state = event[1].value;

		groupStateMandate.effectiveDate = event[2].value;
		groupStateMandate.termDate = event[3].value;
		groupStateMandate.termReason = event[4].value;

		// ----------------------- Dates conversion to format
		let termDate = event[3].value.singleDate
			? event[3].value.singleDate.date
			: null;
		if (termDate) {
			groupStateMandate.termDate =
				termDate.year +
				"-" +
				this.addPrefixZero(termDate.month) +
				"-" +
				this.addPrefixZero(termDate.day);
		}

		let effectiveDate = event[2].value.singleDate
			? event[2].value.singleDate.date
			: null;
		if (effectiveDate) {
			groupStateMandate.effectiveDate =
				effectiveDate.year +
				"-" +
				this.addPrefixZero(effectiveDate.month) +
				"-" +
				this.addPrefixZero(effectiveDate.day);
		}

		groupStateMandate.action = action;

		return groupStateMandate;
	}

	onSubStateFieldChange($event: any) {
		let field: FormField = $event.formField;
		const index: number = $event.index;
		let form: FormGroup = $event.field;
		let prevState: Array<DynamicConfigFormRow> = $event.prevState;

		prevState[index].showCancelButton = true;
		if (field.name === StateMandateSubGroupFields.TERM_DATE + index) {
			// pass Term-Field Value , and Effective Date field value
			this.validateTermDate(
				field.value,
				form.controls[StateMandateSubGroupFields.EFFECTIVE_DATE + index].value
			);
		}
	}

	onSubStateNewRowAdded($event: any) {
		const prevState: Array<DynamicConfigFormRow> = $event.prevState;
		prevState[prevState.length - 1].showCancelButton = true;
		$event.form.controls.fields.controls[$event.index - 1].enable();
	}

	CloseEtStateMandate() {
		this.activeModal.close();
	}

	cancleEtStateMandate() {
		this.resetStateMandateGrid = true;
		setTimeout(() => {
			this.resetStateMandateGrid = false;
			this.etStateMandateGroupFilingsConfig = StateMandateGroupFilingsConfig;
			this.etStateMandateGroupFilingsFormState = new Array<DynamicConfigFormRow>();

			// this.loadGridOneData();
		}, 200);
	}

	CloseStateMandateSub() {
		this.activeModal.close();
	}

	cancleStateMandateSub() {
		this.resetStateMandateSubGrid = true;
		setTimeout(() => {
			this.resetStateMandateSubGrid = false;
			this.stateMandateSubFilingsConfig = StateMandateSubGroupConfig;
			this.stateMandateSubFilingsFormState = new Array<DynamicConfigFormRow>();

			this.loadGridTwoData();
		}, 200);
	}
}
