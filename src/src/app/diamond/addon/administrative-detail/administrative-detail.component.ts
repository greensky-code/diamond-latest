/* Copyright (c) 2021 . All Rights Reserved. */

import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { NgbToastType } from 'ngb-toast';
import { forkJoin } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { GroupMaster, SecUser, SecWin } from '../../../api-models';
import { CiebWebCodeDecode } from '../../../api-models/addon/cieb-web-code-decode.model';
import { GroupFilingDetailModel } from '../../../api-models/addon/proc-add-group-filing.input-model';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { GroupMasterService, SecUserService } from '../../../api-services';
import { CiebWebCodeDecodeService } from '../../../api-services/addon/cieb-web-code-decode.service';
import { ProcAddGroupFilingService } from '../../../api-services/addon/proc-add-group-filing.stored-procedure.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { ADMINISTRATIVE_DETAILS } from '../../../shared/app-constants';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { MessageType, PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { DynamicConfigFormRow, FormField, FormRow, FORM_FIELD_ACTION_TYPES, Option } from '../../../shared/models/models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { SecurityService } from '../../../shared/services/security.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FillingDetailFields, FillingDetailFieldsConfig } from '../addon.constants';


@Component({
	selector: 'administrativedetail',
	templateUrl: './administrative-detail.component.html',
	providers: [DatePipe],
})
export class AdministrativeDetailComponent implements OnInit {
	@Input() showIcon = true;
	@Input() seqGroupId: number;
	@Input() groupNumber: string;
	@Input() groupName: string;
	SubmitBtn = 'Save Changes';
	groupMaster: GroupMaster;

	@Input() activeTab = 1;
	private tabSet: NgbNav;
	@ViewChild(NgbNav) set content(content: NgbNav) {
		this.tabSet = content;
	};

	// -------------------------------------------- Speciality grid
	procAddGroupFilings: GroupFilingDetailModel[] = [];
	procAddGroupFilingsConfig = FillingDetailFieldsConfig;
	procAddGroupFilingsFormState = new Array<DynamicConfigFormRow>();

	resetInlineGrid = false;

	filingTypes: CiebWebCodeDecode[] = [];
	changeReasons: CiebWebCodeDecode[] = [];
	situsStateDropDowns: any = [];

	administrativeDetailForm: FormGroup;
	formValidation: FormValidation;
	public alertMessage: AlertMessage;
	public displayMessage: any;
	public popUpMessage: PopUpMessage;
	public datePickerConfig = DatePickerConfig;
	public datePickerModel = DatePickerModel;
	public secWin: SecWinViewModel;
	public isSuperUser = false;
	public secProgress = true;
	@ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
	public dataGridGridOptions: GridOptions;
	secColDetails = new Array<SecColDetail>();
	inProgress = true;
	userTemplateId: string;
	memberModuleId = ADMINISTRATIVE_DETAILS;
	windowId = 'CIEBADTL';
    subGroups: any[];
	isInitialDataLoaded = false;
	loader = true;
	showFilling: boolean;
	showState: boolean;
	isAllowAddNewRow = true;
	constructor(
		private toastService: ToastService,
		private formBuilder: FormBuilder,
		private mask: Mask,
		private customValidators: CustomValidators,
		public alertMessageService: AlertMessageService,
		private dateFormatPipe: DateFormatPipe,
		private secWinService: SecWinService,
		private modalService: NgbModal,
		private securityService: SecurityService,
		private secColDetailService: SecColDetailService,
		private ciebWebCodeDecodeService: CiebWebCodeDecodeService,
		public activeModal: NgbActiveModal,
		private secUserService: SecUserService,
		private groupMasterService: GroupMasterService,
		private datePipe: DatePipe,
		private procAddGroupFilingService: ProcAddGroupFilingService
	) { }

	ngOnInit(): void {
		this.hasPermission();
	}

	initializeComponentState(): void {
		this.createForm();
		this.displayMessage = {};
		this.formValidation = new FormValidation(this.administrativeDetailForm);
		if (this.groupNumber) {
			this.loadDropDownValues();
			this.groupMasterService.getGroupMasterByGroupId(this.groupNumber).subscribe((groupMaster: GroupMaster) => {
					if (groupMaster != null) {
						this.groupMasterService.findBySeqParentId(groupMaster.seqParentId).subscribe(
							(groups) => {
								this.subGroups = groups;
							}
						);
					}
					this.groupMaster = groupMaster;
				}, (error) => {
					console.log(error);
				}
			);
		}
	}

	loadDropDownValues() {
		this.loader = true;
		this.showFilling = true;
		this.showState = false;
		forkJoin({
			filingTypes: this.ciebWebCodeDecodeService.getCiebWebCodesByCodeAndCodeTypes(
				'FILINGTYPE',
				'GRPFL'
			),
			changeReasons: this.ciebWebCodeDecodeService.getCiebWebCodesByCodeAndCodeTypes(
				'CHGREASN',
				'GRPFL'
			),
		}).subscribe(
			({ filingTypes, changeReasons }) => {
				let fTypes: any = [];
				filingTypes.forEach(function(item) {
                let i = fTypes.findIndex(x => x.decode2 == item.decode2);
                 if (i <= -1) {
               fTypes.push(item);
            }
            });
				this.filingTypes = fTypes;
				this.changeReasons = changeReasons;
				this.procAddGroupFilingService.getCiebGroupFilingDetails(this.seqGroupId).subscribe((value) => {
						this.procAddGroupFilings = value;
						this.getSitusStateDropDowns();
					});
			}, (error) => {
				console.log(error);
			}
		);
	}

	populateFillingDetailsDynamicForm(situsStateOptionsArray: any = []) {
		const values = this.procAddGroupFilings;
		// set dynamic grid dropdown values
		this.procAddGroupFilingsConfig.forEach((field: FormField) => {
			field.options = new Array<Option>();

			if (field.name === FillingDetailFields.FILING_TYPE) {
				this.filingTypes && this.filingTypes.length > 0
					? this.filingTypes.forEach((value) => {
						field.options.push({
							key: value.decode2,
							value: value.decode1,
						});
					})
					: '';
			} else if (field.name === FillingDetailFields.CHANGE_REASON) {
				this.changeReasons && this.changeReasons.length > 0
					? this.changeReasons.forEach((value) => {
						field.options.push({
							key: value.decode2,
							value: value.decode1,
						});
					})
					: '';
			} else if (field.name === FillingDetailFields.APPLY_TO_ALL_SUBGROUPS) {
				field.options.push(
					{
						key: 'Y',
						value: 'Yes',
					},
					{
						key: 'N',
						value: 'No',
					}
				);
			} else if (field.name === FillingDetailFields.SEQ_GRP_FILING_ID) {
				field.value = -1;
			}
		});
		if (!values || values.length == 0) {
			this.procAddGroupFilingsFormState = JSON.parse(JSON.stringify(this.procAddGroupFilingsFormState));
			this.isInitialDataLoaded = true;
			this.loader = false;
		} else {
			values.forEach((value: GroupFilingDetailModel) => {
				let mockConfig = JSON.parse(
					JSON.stringify(this.procAddGroupFilingsConfig)
				); // make a copy of original config
				let formState: FormRow = new FormRow();

				mockConfig.forEach((field: any, index: any) => {
					if (field.name === FillingDetailFields.FILING_TYPE) {
						for (let i = 0; i < this.filingTypes.length; i++) {
							mockConfig[index].disabled = true;
							if (this.filingTypes[i].decode1 == value.filingType) {
								mockConfig[index].value = this.filingTypes[i].decode2;
							}
						}
					} else if (field.name === FillingDetailFields.SITUS_STATE) {
						mockConfig[index].disabled = true;
						mockConfig[index].value = value.situsState;
					} else if (field.name === FillingDetailFields.EFFECTIVE_DATE) {
						mockConfig[index].disabled = true;
						mockConfig[index].value = value.effectiveDate;
					} else if (field.name === FillingDetailFields.TERM_DATE) {
						mockConfig[index].value = value.termDate;
						if (value.termDate) {
							mockConfig[index].disabled = true;
						} else {
							this.isAllowAddNewRow = false;
						}
					} else if (field.name === FillingDetailFields.CHANGE_REASON) {
						if (value.changeReason) {
							mockConfig[index].disabled = true;
						}
						mockConfig[index].value = value.changeReason;
						for (let i = 0; i < this.changeReasons.length; i++) {
							if (this.changeReasons[i].decode1 == value.changeReason) {
								mockConfig[index].value = this.changeReasons[i].decode2;
							}
						}
					} else if (field.name === FillingDetailFields.APPLY_TO_ALL_SUBGROUPS) {
						mockConfig[index].hideField = true;
						mockConfig[index].value = value.applyToSubgroup;
					} else if (field.name === FillingDetailFields.SEQ_GRP_FILING_ID) {
						mockConfig[index].disabled = true;
						mockConfig[index].value = value.seqGrpfilingId;
					}
				});

				formState.formFields = mockConfig;
				formState.id = {
					provContractSpecialty: value,
				};
				formState.action = null;
				this.procAddGroupFilingsFormState.push(formState); // add record
			});
			this.procAddGroupFilingsFormState.map((record: FormRow, index) => {
				record.formFields.map((field) =>
					field.name === FillingDetailFields.SITUS_STATE
						? (field.options = situsStateOptionsArray[index])
						: ''
				);
			});
			this.situsStateDropDowns = situsStateOptionsArray;
			this.procAddGroupFilingsConfig = JSON.parse(JSON.stringify(this.procAddGroupFilingsConfig));
			this.procAddGroupFilingsFormState = JSON.parse(JSON.stringify(this.procAddGroupFilingsFormState));
			this.isInitialDataLoaded = true;
			this.loader = false;
		}
	}

	getSitusStateDropDowns() {
		const values = this.procAddGroupFilings;
		let apiArray: any = [], situsStateOptionsArray: any = [];
		if (!values || values.length == 0) {
			this.populateFillingDetailsDynamicForm(situsStateOptionsArray);
			return;
		}
		values.forEach((value: GroupFilingDetailModel) => {
			apiArray.push(
				this.ciebWebCodeDecodeService.getCiebWebCodesByCodeAndCodeTypeAndDecode1(
					'FILINGTYPE',
					'GRPFL',
					value.filingType
				)
			);
		});
		forkJoin(apiArray).subscribe((apiResponses: Array<any>) => {
			apiResponses.forEach((ciebWebCodeDecodes: CiebWebCodeDecode[]) => {
				// loop over on all api api's response
				// ------------------------------------- got vendor addresses
				let situsStateOptions = new Array<Option>();
				if (ciebWebCodeDecodes != null) {
					ciebWebCodeDecodes.forEach((ciebWebCodeDecode) => {
						situsStateOptions.push({
							key: ciebWebCodeDecode.decode3,
							value: ciebWebCodeDecode.decode3,
						});
					});
					situsStateOptionsArray.push(situsStateOptions);
				} else {
					situsStateOptions.push({
						key: '',
						value: '',
					});
					situsStateOptionsArray.push(situsStateOptions);
				}
			});
			this.populateFillingDetailsDynamicForm(situsStateOptionsArray);
		});
	}

	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	showAddNewLine = true;
	createForm() {
		// FormBuilder.group is a factory method that creates a FormGroup
		// FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
		this.administrativeDetailForm = this.formBuilder.group(
			{
				dynamicText001: ['', { updateOn: 'blur', validators: [] }],
				dynamicText002: ['', { updateOn: 'blur', validators: [] }],
				textbox: ['', { updateOn: 'blur', validators: [] }],
			},
			{ updateOn: 'submit' }
		);
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	showPopUp(message: string, title: string) {
		if (!message) {
			return;
		}
		let popUpMessage = new PopUpMessage(
			'poUpMessageName',
			title,
			message,
			'icon'
		);
		popUpMessage.buttons = [
			new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
		];
		let ref = this.modalService.open(PopUpMessageComponent);
		ref.componentInstance.popupMessage = popUpMessage;
	}

	showPopUpApplyToAllSubGroup(message: string, title: string) {
		if (!message) {
			return;
		}
		let popUpMessage = new PopUpMessage(
			'poUpMessageName',
			title,
			message,
			'icon'
		);
		popUpMessage.buttons = [
			new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
			new PopUpMessageButton('No', 'No', 'btn btn-secondary'),
		];
		let ref = this.modalService.open(PopUpMessageComponent);
		ref.componentInstance.popupMessage = popUpMessage;
		ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
				console.log('button yes has been click!');
            } else if (resp.name === 'No') {
				console.log('button No has been click!');
            }
        });
	}


	popupMessageHandler(button: PopUpMessageButton) {
		if (button.name === 'Yes') {
			console.log('button yes has been click!');
		}
		if (button.name === 'No') {
			console.log('button No has been click!');
		}
	}

	popUpButtonHandler(button: PopUpMessageButton) {
		if (button.popupMessage.name === 'poUpMessageName') {
			this.popupMessageHandler(button);
		}
	}

	/**
	 * get all user permission for page
	 * if permissions to select exist then initialize page
	 */
	hasPermission() {
		this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));

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
			this.userTemplateId = user.dfltTemplate;
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
					this.secProgress = false;

					this.initializeComponentState();
				} else {
					this.showPopUp(
						'You are not Permitted to view pcp auto assigned rules',
						'Administrative details Permission'
					);
				}
			},
			(error) => {
				this.secProgress = false;
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
		this.secColDetailService
			.findByTableNameAndUserId('', secUser.userId)
			.subscribe((resp: SecColDetail[]) => {
				this.secColDetails = resp;
				this.inProgress = false;
				this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
			});
	}

	saveForm(event: any) {
		if (!this.seqGroupId) {
			this.showPopUp('SeqGroupId is not found', 'Pricing Partner Details');
			return;
		}
		if (!this.isAllowAddNewRow) {
			return;
        }

		this.procAddGroupFilingsFormState = event.formState;
		event = event.fields;

		let apiValues = new Array<GroupFilingDetailModel>();


		const updatedRecords: FormRow[] = this.procAddGroupFilingsFormState.filter(
            (record: any, index) => {
              record.index = index;
              return (
                record.action == FORM_FIELD_ACTION_TYPES.UPDATE ||
                record.action === FORM_FIELD_ACTION_TYPES.DELETE
              );
            }
          );
		let isChangeRsnFlag = false;
		let isEffAndTermDateFlag = false;
        if (updatedRecords.length > 0) {
            updatedRecords.forEach((preStateRecord: FormRow, index) => {
                if (preStateRecord.action) {

                    let updatedRecord = event[preStateRecord.index];
                    const pair = Object.keys(updatedRecord).map(k => ({ key: k, value: updatedRecord[k] }));
                    let groupFilingDetailModel: GroupFilingDetailModel = preStateRecord.id.provContractSpecialty;
                    let apiValue: GroupFilingDetailModel = this.populateFormFields(groupFilingDetailModel, pair, preStateRecord.action, preStateRecord.index);
					if (apiValue.effectiveDate && apiValue.termDate) {
						let effectiveDate: Date = new Date(apiValue.effectiveDate);
						let termDate: Date = new Date(apiValue.termDate);
						if (effectiveDate.getTime() > termDate.getTime()) {
							isEffAndTermDateFlag = true;
						} else if (apiValue.termDate && !apiValue.changeReason) {
							isChangeRsnFlag = true;
						}
					}
					apiValue.stateIndex = preStateRecord.index;
					apiValues.push(apiValue);
                }
            });
        }
		this.procAddGroupFilingsFormState.forEach((record, index) => {
			if (record.action == FORM_FIELD_ACTION_TYPES.ADD || !record.id) {
				let procAddGroupFiling = new GroupFilingDetailModel();
				let newRecord = event[index];
				const pair = Object.keys(event[index]).map((k) => ({key: k, value: newRecord[k]}));
				const apiValue: GroupFilingDetailModel = this.populateFormFields(procAddGroupFiling, pair, FORM_FIELD_ACTION_TYPES.ADD, index);
				if (apiValue.effectiveDate && apiValue.termDate) {
					let effectiveDate: Date = new Date(apiValue.effectiveDate);
					let termDate: Date = new Date(apiValue.termDate);
					if (effectiveDate.getTime() > termDate.getTime()) {
						isEffAndTermDateFlag = true;
					} else if (apiValue.termDate && !apiValue.changeReason) {
						isChangeRsnFlag = true;
					}
				}
				apiValue.stateIndex = index;
				apiValues.push(apiValue);
			}
		});
		if (isEffAndTermDateFlag) {
			this.toastService.showToast('Termination Date cannot be less than the Effective Date', NgbToastType.Danger);
			return;
		} else if (isChangeRsnFlag) {
			this.toastService.showToast('A Change Reason is required when a Termination Date is present', NgbToastType.Danger);
			return;
		}
		let groupFilingDetailModels: GroupFilingDetailModel[] = [];
		apiValues.forEach((value) => {

			if (value.action === FORM_FIELD_ACTION_TYPES.ADD) {

				value.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
				value.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
				value.insertUser = sessionStorage.getItem('user');
				value.insertProcess = 'ADDON';
				value.seqGroupId = this.seqGroupId;
				value.seqGrpParentId = this.groupMaster.seqParentId;
				if (value.applyToSubgroup === 'Yes') {

					if (this.subGroups != null) {
						this.subGroups.forEach((subGroup) => {
							let newGroupFilingDetailModel: GroupFilingDetailModel = new GroupFilingDetailModel();
							newGroupFilingDetailModel.applyToSubgroup = 'Yes';
							newGroupFilingDetailModel.changeReason = value.changeReason;
							newGroupFilingDetailModel.effectiveDate = value.effectiveDate;
							newGroupFilingDetailModel.filingType = value.filingType;
							newGroupFilingDetailModel.situsState =  value.situsState;
							newGroupFilingDetailModel.stateIndex = value.stateIndex;
							newGroupFilingDetailModel.termDate = value.termDate;
							newGroupFilingDetailModel.action = FORM_FIELD_ACTION_TYPES.ADD;
							newGroupFilingDetailModel.insertDatetime = this.datePipe.transform(new Date(), 'dd-MM-yyyy HH:mm:ss');
							newGroupFilingDetailModel.insertUser = sessionStorage.getItem('user');
							newGroupFilingDetailModel.insertProcess = 'ADDON';
							newGroupFilingDetailModel.seqGroupId = subGroup.seqGroupId;
							newGroupFilingDetailModel.seqGrpParentId = subGroup.seqParentId;

							groupFilingDetailModels.push(newGroupFilingDetailModel);
						});
					}
				}

				groupFilingDetailModels.push(value);


			} else {
				groupFilingDetailModels.push(value);
			}
		});
		if (groupFilingDetailModels && groupFilingDetailModels.length > 0) {
			this.createOrUpdateCiebGroupFilingDetail(groupFilingDetailModels, event);
		}
	}

	createOrUpdateCiebGroupFilingDetail(groupFilingDetailModels: GroupFilingDetailModel[] = [], event: any) {
		this.procAddGroupFilingService.createCiebGroupFilingDetail(groupFilingDetailModels).subscribe((resp) => {
			groupFilingDetailModels.forEach((value) => {
				if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
					for (let field of this.procAddGroupFilingsFormState[value.stateIndex].formFields) {
						field.disabled = true;
					}
				} else if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
					for (let field of this.procAddGroupFilingsFormState[value.stateIndex].formFields) {
						let record = event[value.stateIndex];
						if (field.name === (FillingDetailFields.CHANGE_REASON + value.stateIndex)) {
							if (record[(FillingDetailFields.CHANGE_REASON + value.stateIndex)]) {
								field.disabled = true;
							}
						} else if (field.name === (FillingDetailFields.TERM_DATE + value.stateIndex)) {
							if (record[(FillingDetailFields.TERM_DATE + value.stateIndex)].singleDate) {
								field.disabled = true;
							} else {
								this.isAllowAddNewRow = false;
							}
						} else {
							field.disabled = true;
						}
					}
					this.procAddGroupFilingsFormState[value.stateIndex].id = { provContractSpecialty: resp };
					this.procAddGroupFilingsFormState[value.stateIndex].action = FORM_FIELD_ACTION_TYPES.UPDATE;
					this.procAddGroupFilingsFormState[value.stateIndex].showCancelButton = false;
				}
			});
			this.toastService.showToast('Inserted Successfully', NgbToastType.Success);
		});
	}

	mapFillingTypeKey(value: any) {
		for (let i in this.filingTypes) {
			if (this.filingTypes[i].decode2 == value) {
				return this.filingTypes[i].decode1;
			}
		}
		return value;
	}

	populateFormFields(procAddGroupFiling: GroupFilingDetailModel, event: any, action: FORM_FIELD_ACTION_TYPES, stateIndex= 0): GroupFilingDetailModel {
		if (event) {
			event.forEach((event: any, index: any) => {
				if (event.key === (FillingDetailFields.FILING_TYPE + stateIndex)) {
					for (let i = 0; i < this.filingTypes.length; i++) {
						if (this.filingTypes[i].decode2 == event.value) {
							procAddGroupFiling.filingType = this.filingTypes[i].decode1;
						}
					}
				}
				if (event.key === (FillingDetailFields.SITUS_STATE + stateIndex)) {
					procAddGroupFiling.situsState = event.value;
				}
				if (event.key === (FillingDetailFields.TERM_DATE + stateIndex)) {
					const termDate = event.value.singleDate ? event.value.singleDate.date : null;
					if (termDate) {
						procAddGroupFiling.termDate = termDate.year + '-' + this.addPrefixZero(termDate.month) + '-' + this.addPrefixZero(termDate.day);
					}
				}
				if (event.key === (FillingDetailFields.EFFECTIVE_DATE + stateIndex)) {
					const effectiveDate = event.value.singleDate ? event.value.singleDate.date : null;
					if (effectiveDate) {
						procAddGroupFiling.effectiveDate = effectiveDate.year + '-' + this.addPrefixZero(effectiveDate.month) + '-' + this.addPrefixZero(effectiveDate.day);
					}
				}
				if (event.key === (FillingDetailFields.CHANGE_REASON + stateIndex)) {
					for (let i = 0; i < this.changeReasons.length; i++) {
						if (this.changeReasons[i].decode2 == event.value) {
							procAddGroupFiling.changeReason = this.changeReasons[i].decode1;
						}
					}
				}
				if (event.key === (FillingDetailFields.APPLY_TO_ALL_SUBGROUPS + stateIndex)) {
					procAddGroupFiling.applyToSubgroup = event.value;
				}
				procAddGroupFiling.action = action;
			});
		}
		return procAddGroupFiling;
	}

	public addPrefixZero(value: any) {
		return value < 10 ? '0' + value : value;
	}

	onFilingDetailFieldChange(event: any) {
		const field: FormGroup = event.field;
		const formField: FormField = event.formField;
		const index: number = event.index;
		let prevState: Array<DynamicConfigFormRow> = this.procAddGroupFilingsFormState;
		if (prevState[index].action == FORM_FIELD_ACTION_TYPES.UPDATE) {
			if (formField.name === FillingDetailFields.TERM_DATE + index) {
				const termDate = event.dateEvent;
				if (termDate) {
					this.isAllowAddNewRow = true;
				} else {
					this.isAllowAddNewRow = false;
				}
			}
		} else {
			if (formField && formField.name) {
				const defaultValue = field.controls[formField.name].value;
				if (!defaultValue) {
					return;
				}
				prevState[index].showCancelButton = true;
				if (formField.name.includes(FillingDetailFields.FILING_TYPE)) {
					this.procAddGroupFilingsFormState[event.index].formFields.map(
						(subField) => {
							if (
								subField.name ==
								FillingDetailFields.SITUS_STATE + event.index
							) {
								subField.value = '';
								this.ciebWebCodeDecodeService.getCiebWebCodesByCodeAndCodeTypeAndDecode1(
									'FILINGTYPE',
									'GRPFL',
									this.mapFillingTypeKey(event.field.value[FillingDetailFields.FILING_TYPE + event.index])
								).subscribe(cits => {
									subField.options = cits.map(c => {
										return {
											key: c.decode3,
											value: c.decode3,
										}
									})
								})
							}
						}
					);
					for (let i = 0; i < this.filingTypes.length; i++) {
						if (this.filingTypes[i].decode2 == defaultValue) {
							this.populateSitusStateForNewRow(
								this.filingTypes[i].decode1,
								event.index
							);
						}
					}
				} else if (formField.name === (FillingDetailFields.EFFECTIVE_DATE + event.index)) {
					const effDate = event.dateEvent;
					if (!(effDate.singleDate.date.day === 1)) {
						this.toastService.showToast('Effective date should be first date of Month', NgbToastType.Danger);
						return;
					}
					this.setPopupMessage(null);
				} else if (formField.name === (FillingDetailFields.TERM_DATE + event.index)) {
					const termDate = event.dateEvent;
					if (termDate) {
						this.isAllowAddNewRow = true;
					} else {
						this.isAllowAddNewRow = false;
					}
				} else if (formField.name === (FillingDetailFields.APPLY_TO_ALL_SUBGROUPS + event.index)) {
					const applyToAllSubGroup = event.field.controls[(FillingDetailFields.APPLY_TO_ALL_SUBGROUPS + event.index)].value;
					if (applyToAllSubGroup == 'Yes') {
						this.showPopUpApplyToAllSubGroup('Are you sure you want to apply to all subgroups?', '');
						return;
					}

				}
			}
		}
	}

	setPopupMessage(message: string, messageType: MessageType = MessageType.ERROR, title = 'Error') {
		this.popUpMessage = {
			message: message,
			title: title,
			messageType: messageType,
			name: 'error',
			buttons: [],
			buttonHeaderClass: '',
			icon: 'info',
			displayCloseBtn: true
		};
	}

	populateSitusStateForNewRow(filingType: any, index: any) {
		this.ciebWebCodeDecodeService
			.getCiebWebCodesByCodeAndCodeTypeAndDecode1(
				'FILINGTYPE',
				'GRPFL',
				filingType
			)
			.subscribe((ciebWebCodeDecodes: CiebWebCodeDecode[]) => {
				let situsStateOptions = new Array<Option>();

				ciebWebCodeDecodes && ciebWebCodeDecodes.length > 0
					? ciebWebCodeDecodes.forEach((ciebWebCodeDecode) => {
						situsStateOptions.push({
							key: ciebWebCodeDecode.decode3,
							value: ciebWebCodeDecode.decode3,
						});
					})
					: '';
				this.procAddGroupFilingsFormState[index].formFields.map((field) =>
					field.name == FillingDetailFields.SITUS_STATE + index
						? (field.options = situsStateOptions)
						: ''
				);
			});
	}

	onFilingDetailNewRowAdded(event: any) {
		if (!this.isAllowAddNewRow) {
            this.toastService.showToast('New record can be added only after the completing the current record', NgbToastType.Danger);
			return;
        }
		this.procAddGroupFilingsFormState = event.prevState;
		const prevState: Array<DynamicConfigFormRow> = event.prevState;
		prevState[prevState.length - 1].showCancelButton = true;
		//event.form.controls.fields.controls[event.index - 1].enable();
	}

	cancle() {
		this.resetInlineGrid = true;
		setTimeout(() => {
			this.resetInlineGrid = false;
			this.procAddGroupFilingsConfig = FillingDetailFieldsConfig;
			this.procAddGroupFilingsFormState = new Array<DynamicConfigFormRow>();
			this.initializeComponentState();
		}, 200);
	}

	Close() {
		this.activeModal.close();
	}

	OnChange(id: any) {
		if (id == 1 && this.isInitialDataLoaded) {
			this.isInitialDataLoaded = false;
			this.procAddGroupFilingsFormState = [];
			this.loader = true;
			setTimeout(() => {
				this.showFilling = true;
				this.showState = false;
				this.loadDropDownValues();
			}, 500);
		} else {
			setTimeout(() => {
				this.showState = true;
				this.showFilling = false;
			}, 500);
		}
	}
}
