/* Copyright (c) 2020 . All Rights Reserved. */

import { DatePipe } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { KeyboardShortcutsComponent, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbToastType } from 'ngb-toast';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/debounceTime';
import { MessageMasterDtl } from '../../../../../src/app/api-models';
import { MedDefnRulesDeterminant, SecUser } from '../../../api-models';
import { MedDefnRules } from '../../../api-models/med-defn-rules.model';
import { MenuResponse } from '../../../api-models/menu-response';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import {
	DddwDtlService,
	MedDefnCodeService,
	MedDefnRulesDeterminantService,
	MedDefnRulesService,
	MessageMasterDtlService,
	SecUserService,
	SystemCodesService,
	SystemCodeTokenService
} from '../../../api-services';
import { FunctionalLevelSecurityService } from '../../../api-services/security/functional-level-security.service';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { MEDICAL_DEF_MODULE_ID } from '../../../shared/app-constants';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { AuditDisplayComponent } from '../../../shared/components/audit-display/audit-display.component';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {
	MessageType,
	PopUpMessage,
	PopUpMessageButton
} from '../../../shared/components/pop-up-message/pop-up.message.model';
import { TablesAndColumnsComponent } from '../../../shared/components/tables-and-columns/tables-and-columns.component';
import { TimestampComponent } from '../../../shared/components/timestamp/timestamp.component';
import { NGBModalOptions } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { MedDefDetFields, MedDefDetFormConfig } from '../../../shared/models/constants';
import {
	DynamicConfigFormRow,
	FORM_FIELD_ACTION_TYPES,
	FormField,
	FormRow,
	Menu,
	Option,
	OPERATIONS
} from '../../../shared/models/models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { Mask } from '../../../shared/pipes/text-format.pipe';
import { AllTabColumnsService } from '../../../shared/services/all-tab-columns.service';
import { AllTableService } from '../../../shared/services/all-table.service';
import { AuditService } from '../../../shared/services/audit.service';
import { MenuService } from '../../../shared/services/menu.service';
import { SecurityService } from '../../../shared/services/security.service';
import { CONSTANTS, getMedicalDefinitionShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import { RequiredValidator } from '../../../shared/validators/required.validator';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { FunctionalGroupShortCutComponent } from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import { HelpComponent } from '../help/help.component';
import set = Reflect.set;

// Use the Component directive to define the MedicalDefinitionsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({
	selector: "medicaldefinitions",
	templateUrl: "./medical-definitions.component.html",
	providers: [
		DatePipe,
		Mask,
		CustomValidators,
		DateFormatPipe,
		MedDefnRulesService,
		MedDefnRulesDeterminantService,
		SystemCodeTokenService,
		SystemCodesService,
		MedDefnCodeService,
		DddwDtlService,
	],
})
export class MedicalDefinitionsComponent implements OnInit, AfterViewInit {
	// The form model used by the view per Angular Reactive Forms
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	medicalDefinitionsForm: FormGroup;
	formValidation: FormValidation;
	alertMessage: AlertMessage;
	displayMessage: any;
	private components: any;
	popUpMessage: PopUpMessage;
	dataGridGridOptions: GridOptions;
	dataGridgridApi: any;
	dataGridgridColumnApi: any;
	dataGridgridApi1: any;
	dataGridgridColumnApi1: any;
	private defaultColDef: any;
	editMedDef: boolean;
	operator: any;
	// update to true when Get records
	isFilter = false;
	@ViewChild("popUpMesssage") child: PopUpMessageComponent;
	MedDefnRules: MedDefnRules[] = [];
	MedDefnRulesDetData: MedDefnRulesDeterminant[] = [];
	MedDefnRule: MedDefnRules;
	shortcuts: ShortcutInput[] = [];
	menu: Menu[] = [];
	claimType: any;
	selectedclaimType: any;
	selectedsearchSeq: any;
	selectedOrder: any;
	selectedCode: any;
	selectedMedCode: any;
	medDefCode: any;
	newCount = 0;
	totalMedDefDetRules = 0;
	medDefnDeterminantRules: MedDefnRulesDeterminant[];
	allTables: any[] = [];
	@Input() showIcon = false;
	@Input() winID?: string;
	@ViewChild(KeyboardShortcutsComponent)
	private keyboard: KeyboardShortcutsComponent;

	searchStatus = false;
	keyNames = "claim_type:order:med_def_code:search_sequence";
	keyValues: any;
	screenCloseRequest: Boolean = false;
	valueChanged: Boolean = false;

	secWin: SecWinViewModel;
	windowId = "MEDEF";
	userTemplateId: string;
	medicalDefModuleId = MEDICAL_DEF_MODULE_ID;
	secColDetails = new Array<SecColDetail>();
	inProgress = true;
	isSuperUser = false;
	isCSEditable = false;
	secProgress = true;
	stateOptions = new Array<Option>();
	codeTypeOptions = new Array<Option>();
	saveForm: boolean;
	medDefnDeterminantRule: MedDefnRulesDeterminant;
	actionNo = 1;
	claimTypes: any[];
	submitButtonStatus: boolean = false;
	isAllowAddNewRow: boolean = false;
	// Use constructor injection to inject an instance of a FormBuilder
	constructor(
		private auditService: AuditService,
		private datePipe: DatePipe,
		private formBuilder: FormBuilder,
		private cdr: ChangeDetectorRef,
		private toastService: ToastService,
		private medDefnRulesService: MedDefnRulesService,
		private medDefnRulesDeterminantService: MedDefnRulesDeterminantService,
		private systemCodeTokenService: SystemCodeTokenService,
		private systemCodesService: SystemCodesService,
		private modalService: NgbModal,
		public activeModal: NgbActiveModal,
		private ngZone: NgZone,
		private MedDefnCodeService: MedDefnCodeService,
		private DddwDtlService: DddwDtlService,
		private router: Router,
		private functionalLevelSecurityService: FunctionalLevelSecurityService,
		private messageService: MessageMasterDtlService,
		private alertMessageService: AlertMessageService,
		private securityService: SecurityService,
		private secWinService: SecWinService,
		private secColDetailService: SecColDetailService,
		private secUserService: SecUserService,
		public AllTabColumnsService: AllTabColumnsService,
		private allTableService: AllTableService,
		private menuService: MenuService
	) { }

	// Most initial setup should be done in the ngOnInit() life-cycle hook function
	// rather than in the constructor for this class in order to ensure that the
	// resources are fully loaded before performing the initial setup processing.
	// Most initial setup should be done in the ngOnInit() life-cycle hook function
	// rather than in the constructor for this class in order to ensure that the
	// resources are fully loaded before performing the initial setup processing.
	ngOnInit(): void {
		this.hasPermission();
	}

	initializeComponentState() {
		this.createForm();
		this.menuInit();
		this.displayMessage = {};
		this.formValidation = new FormValidation(this.medicalDefinitionsForm);
		this.createDataGrid();
		this.getCodeTypes();
		this.getStates();
		this.getMedDefCode();
		this.getClaimType("CLAIMTYPE", "0");
		this.getOperator();
		this.totalMedDefDet();
		this.getClaimTypes();
		if (this.isSuperUser) {
			this.getMediaclDef();
		} else {
			setTimeout(() => {
				this.getMediaclDef();
			}, 2000);
		}
	}

	private getCodeTypes() {
		this.DddwDtlService.findByColumnNameAndDwnameAndLanguageId(
			"code_type",
			"dw_meddef_determinants",
			0
		).subscribe((res: any) => {
			res.forEach((val: { key: any; value: any }) => {
				this.codeTypeOptions.push({ key: val.key, value: val.value });
			});
		});
	}

	private getStates() {
		this.systemCodesService
			.findBySystemCodeTypeAndSystemCodeActiveAndLanguageIdState(
				"BENEFSTATE",
				"Y",
				0
			)
			.subscribe((dropdowns) => {
				dropdowns.forEach((f: any) => {
					this.stateOptions.push({
						key: f.systemCodeDesc1,
						value: f.systemCodeDesc1,
					});
				});
			});
	}

	/**
	 * get all user permission for page
	 * if permissions to select exist then initialize page
	 */
	hasPermission() {
		this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));

		if (this.isSuperUser) {
			this.secProgress = false;
			this.submitButtonStatus = true;
			this.isAllowAddNewRow = true;
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
		this.secWinService
			.getSecWin(this.windowId, secUserId)
			.subscribe((secWin: SecWin) => {
				this.secWin = new SecWinViewModel(secWin);
				if (this.secWin.hasSelectPermission()) {
					this.initializeComponentState();
					this.secProgress = false;
					//Check Menus Privilege Start
					let menuResponse = new MenuResponse();
					menuResponse = this.menuService.getMenuList([...this.menu], this.secWin);
					if (menuResponse.status) {
						this.menu = [];
						this.menu = [...menuResponse.menus];
					}
					//Check Menus Privilege End 
					if (this.secWin.hasInsertPermission()) {
						this.isAllowAddNewRow = true;
						this.submitButtonStatus = true;
					}
					if (this.secWin.hasUpdatePermission()) {
						this.submitButtonStatus = true;
					}

				} else {
					this.secProgress = false;

					this.showPopUp(
						"You are not Permitted to view Medical Definitions",
						"Medical Definitions Permission"
					);
				}
			});
	}
	disableMenu() {
		if (this.userTemplateId == "UT_VIEW") {
			this.menu[0]["dropdownItems"][0].disabled = true;
			this.menu[0]["dropdownItems"][2].disabled = true;
			this.menu[0]["dropdownItems"][3].disabled = true;
		}
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
			.findByTableNameAndUserId("MED_DEFN_RULES", secUser.userId)
			.subscribe((resp: SecColDetail[]) => {
				this.secColDetails = resp;
				this.inProgress = false;
				this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
			});
	}

	getMediaclDef() {
		this.medDefnRulesService.getMedDefnRuleses().subscribe(
			(medDefnRules: MedDefnRules[] = []) => {
				if (medDefnRules && medDefnRules.length > 0) {
					this.MedDefnRules = medDefnRules;
					medDefnRules.sort((a, b) => {
						return (
							parseInt(a["medDefnRulesPrimaryKey"].medDefCode) -
							parseInt(b["medDefnRulesPrimaryKey"].medDefCode)
						);
					});
					medDefnRules.sort((a, b) => {
						if (
							parseInt(a["medDefnRulesPrimaryKey"].medDefCode) ===
							parseInt(b["medDefnRulesPrimaryKey"].medDefCode) &&
							a["medDefnRulesPrimaryKey"].medDefCode.length ===
							b["medDefnRulesPrimaryKey"].medDefCode.length
						) {
							return (
								parseInt(a["medDefnRulesPrimaryKey"].medDefOrder) -
								parseInt(b["medDefnRulesPrimaryKey"].medDefOrder)
							);
						}
					});
					this.dataGridGridOptions.api.setRowData(this.MedDefnRules);
					this.dataGridGridOptions.api.selectIndex(0, false, false);
					this.keyValues =
						this.MedDefnRules[0].medDefnRulesPrimaryKey.claimType +
						":" +
						this.MedDefnRules[0].medDefnRulesPrimaryKey.medDefOrder +
						":" +
						this.MedDefnRules[0].medDefnRulesPrimaryKey.medDefCode +
						":" +
						this.MedDefnRules[0].medDefnRulesPrimaryKey.searchSequence;
					this.searchStatus = true;
				} else {
					this.dataGridGridOptions.api.setRowData([]);
					this.searchStatus = false;
				}
			},
			(error) => {
				this.searchStatus = false;
			}
		);
	}

	getAllTableLookUp() {
		this.allTables = [];
		let owners = "DORIS";
		const claim = this.medicalDefinitionsForm.get("claimType").value
			? this.medicalDefinitionsForm.get("claimType").value
			: "";

		this.allTableService
			.getMedicalDefinitionDetermTableByOwnerAndClaimType(owners, claim)
			.subscribe((allTables: any) => {
				allTables.forEach((data: any) => {
					let table: any = { tableName: data.key, owner: data.value };
					this.allTables.push(table);
				});
				this.openTableAndColumnModel();
			});
	}

	createMedDefDeterminant() {
		this.formValidation.validateForm();
		if (this.medicalDefinitionsForm.valid) {
			let medDefRules = this.getFormMedDefRulesFields();
			this.auditService.setAuditFields(
				medDefRules,
				sessionStorage.getItem("user"),
				this.windowId,
				OPERATIONS.ADD
			);
			this.medDefnRulesService
				.createMedDefnRules(medDefRules)
				.subscribe((response) => {
					if (response.medDefnRulesPrimaryKey != null) {
						this.selectedclaimType = response.medDefnRulesPrimaryKey.claimType;
						this.selectedsearchSeq = response.medDefnRulesPrimaryKey.searchSequence;
						this.selectedOrder = response.medDefnRulesPrimaryKey.medDefOrder;
						this.selectedCode = response.medDefnRulesPrimaryKey.medDefCode;
						this.getMediaclDef();
						this.toastService.showToast(
							"Record successfully created",
							NgbToastType.Success
						);
						this.MedDefnRule = this.MedDefnRule ? this.MedDefnRule : new MedDefnRules();
						this.auditService.setAuditFieldsAfterSaving(
							medDefRules,
							this.MedDefnRule,
							sessionStorage.getItem("user"),
							this.windowId,
							OPERATIONS.ADD
						);
						this.editMedDef = false;
						this.valueChanged = false;
						this.saveForm = true;
						this.reloadGrid = true;
						if (this.screenCloseRequest === true) {
							setTimeout(() => {
								this.activeModal.close();
							}, 2000);
						}
					} else {
						this.alertMessage = this.alertMessageService.error(response);
					}
				});
		}
	}

	onChangeMedCode(event: any) {
		this.selectedMedCode = event.target.value;
		this.medDefCode.forEach((data: any) => {
			if (data.medDefCode == event.target.value) {
				this.selectedMedCode = data.description;
			}
		});
	}

	//when create new button pressed for bellow grid, it will add new row in grid with primary key data.
	CreateNewMedDefDet() {
		this.newCount += 1;
		if (this.medDefnDeterminantRules) {
			let medDefDetArray = new MedDefnRulesDeterminant();
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"] = {};
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["medDefOrder"] =
				this.selectedOrder;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["medDefCode"] =
				this.selectedCode;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["searchSequence"] =
				this.selectedsearchSeq;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["claimType"] =
				this.selectedclaimType;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"][
				"determinantSequence"
			] = this.totalMedDefDetRules + 1;
			this.medDefnDeterminantRules.splice(0, 0, medDefDetArray);
			this.toastService.showToast(
				"New row added in bellow grid double click to edit.",
				NgbToastType.Info
			);
		} else {
			let medDefDetArray = new MedDefnRulesDeterminant();
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"] = {};
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["medDefOrder"] =
				this.selectedOrder;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["medDefCode"] =
				this.selectedCode;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["searchSequence"] =
				this.selectedsearchSeq;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"]["claimType"] =
				this.selectedclaimType;
			medDefDetArray["medDefnRulesDeterminantPrimaryKey"][
				"determinantSequence"
			] = this.totalMedDefDetRules + 1;

			this.toastService.showToast(
				"New row added in bellow grid double click to edit.",
				NgbToastType.Info
			);
		}
	}

	getFormMedDefRulesFields(): MedDefnRules {
		let medDefRulesD = new MedDefnRules();
		medDefRulesD.medDefnRulesPrimaryKey = {};
		medDefRulesD.medDefnRulesPrimaryKey["claimType"] = Form.getValue(
			this.medicalDefinitionsForm,
			"claimType"
		);
		medDefRulesD.medDefnRulesPrimaryKey["medDefCode"] = Form.getValue(
			this.medicalDefinitionsForm,
			"medDefCode"
		);
		medDefRulesD.medDefnRulesPrimaryKey["searchSequence"] = Form.getValue(
			this.medicalDefinitionsForm,
			"searchSequence"
		);
		medDefRulesD.medDefnRulesPrimaryKey["medDefOrder"] = Form.getValue(
			this.medicalDefinitionsForm,
			"order"
		);
		medDefRulesD.determinantTable = Form.getValue(
			this.medicalDefinitionsForm,
			"determTable"
		);
		medDefRulesD.determinant = Form.getValue(
			this.medicalDefinitionsForm,
			"determinant002"
		);
		medDefRulesD.operator = Form.getValue(
			this.medicalDefinitionsForm,
			"operator_op"
		);
		medDefRulesD.description = Form.getValue(
			this.medicalDefinitionsForm,
			"description"
		);
		medDefRulesD.globalIncludeFlag = Form.getValue(
			this.medicalDefinitionsForm,
			"includeInGlobalSearch"
		);
		medDefRulesD.detValue1 = "0";
		return medDefRulesD;
	}

	disableFields() {
		this.medicalDefinitionsForm.controls["claimType"].disable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["medDefCode"].disable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["searchSequence"].disable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["order"].disable({ emitEvent: false });
		this.medicalDefinitionsForm.controls["determTable"].disable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["determinant002"].disable({
			emitEvent: false,
		});
	}

	enableFields() {
		this.medicalDefinitionsForm.controls["claimType"].enable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["medDefCode"].enable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["searchSequence"].enable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["order"].enable({ emitEvent: false });
		this.medicalDefinitionsForm.controls["determTable"].enable({
			emitEvent: false,
		});
		this.medicalDefinitionsForm.controls["determinant002"].enable({
			emitEvent: false,
		});
	}

	updateDeterminant() {
		let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
		let claimType = selectedRows[0].medDefnRulesPrimaryKey.claimType;
		let searchSeq = selectedRows[0].medDefnRulesPrimaryKey.searchSequence;
		let Order = selectedRows[0].medDefnRulesPrimaryKey.medDefOrder;
		let code = selectedRows[0].medDefnRulesPrimaryKey.medDefCode;
		this.formValidation.validateForm();

		if (this.medicalDefinitionsForm.valid) {
			let medicalDefinitionsForm = selectedRows[0];
			let flag;
			this.auditService.setAuditFields(
				medicalDefinitionsForm,
				sessionStorage.getItem("user"),
				this.windowId,
				OPERATIONS.UPDATE
			);
			medicalDefinitionsForm.determinantTable = Form.getValue(
				this.medicalDefinitionsForm,
				"determTable"
			);
			medicalDefinitionsForm.determinant = Form.getValue(
				this.medicalDefinitionsForm,
				"determinant002"
			);
			medicalDefinitionsForm.description = Form.getValue(
				this.medicalDefinitionsForm,
				"description"
			);
			medicalDefinitionsForm.operator = Form.getValue(
				this.medicalDefinitionsForm,
				"operator_op"
			);
			if (
				Form.getValue(this.medicalDefinitionsForm, "includeInGlobalSearch") ==
				true
			) {
				flag = "Y";
			} else {
				flag = "N";
			}
			medicalDefinitionsForm.globalIncludeFlag = flag;
			if (medicalDefinitionsForm.insertDatetime && medicalDefinitionsForm.insertDatetime.split(' ')[1]) {

			} else {
				medicalDefinitionsForm.insertDatetime = this.datePipe.transform(medicalDefinitionsForm.insertDatetime, "yyyy-MM-dd HH:mm:ss")
			}
			this.medDefnRulesService
				.UpdateMedDefnRulesByPrimary(
					medicalDefinitionsForm,
					claimType,
					Order,
					code,
					searchSeq
				)
				.subscribe((medDefnRules) => {
					let dataFromGirdTwo: any = [];
					this.toastService.showToast(
						"Record successfully updated.",
						NgbToastType.Success
					);
					this.MedDefnRule = this.MedDefnRule ? this.MedDefnRule : new MedDefnRules();
					this.auditService.setAuditFieldsAfterSaving(
						medicalDefinitionsForm,
						this.MedDefnRule,
						sessionStorage.getItem("user"),
						this.windowId,
						OPERATIONS.UPDATE
					);
					this.valueChanged = false;
					this.saveForm = true;
					this.reloadGrid = true;
					if (this.screenCloseRequest === true) {
						setTimeout(() => {
							this.activeModal.close();
						}, 2000);
					}
				});
		}
	}

	ngAfterViewInit(): void {
		this.shortcuts.push(...getMedicalDefinitionShortcutKeys(this));
		this.cdr.detectChanges();
	}

	saveMedicalDefinition() {
		this.medicalDefinitionsForm.markAllAsTouched();
		if (this.editMedDef) {
			if (this.isSuperUser) {
				this.updateDeterminant();
			} else {
				if (this.secWin.hasUpdatePermission()) {
					this.updateDeterminant();
				} else {
					this.messageService.findByMessageId(29057).subscribe((message: MessageMasterDtl[]) => {
						this.formPopupAlert('29057: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")).replace("@2", "SUBMIT"), 'Medical Definitions')
					});
				}
			}
		} else {
			if (this.isSuperUser) {
				this.createMedDefDeterminant();
			} else {
				if (this.secWin.hasInsertPermission()) {
					this.createMedDefDeterminant();
				} else {
					this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
						this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Medical Definitions')
					});
				}
			}

		}
	}

	deleteMedicalDefinitionPopup() {
		if (this.isSuperUser) {
			this.deletePopup();
		} else {
			if (this.secWin.hasDeletePermission()) {
				this.deletePopup();
			} else {
				this.messageService.findByMessageId(29069).subscribe((message: MessageMasterDtl[]) => {
					this.formPopupAlert('29069: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Medical Definitions')
				});
			}
		}
	}

	deletePopup() {
		let popUpMessage = new PopUpMessage(
			"Medical Definitions",
			"Medical Definitions",
			"29070: Press yes to delete this record",
			"info",
			[],
			MessageType.WARNING
		);
		popUpMessage.buttons.push(new PopUpMessageButton("OK", "OK", ""));
		popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
		let ref = this.modalService.open(PopUpMessageComponent);
		ref.componentInstance.popupMessage = popUpMessage;
		ref.componentInstance.showIcon = true;
		ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
			if (resp.name === "OK") {
				if (this.actionNo == 1) {
					this.deleteMedicalDefinition();
				} else if (this.actionNo == 2) {
					this.deleteMedDefDetails();
				}
			}
		});
	}

	deleteMedicalDefinition() {
		let claimType = this.medicalDefinitionsForm.getRawValue().claimType;
		let medDefCode = this.medicalDefinitionsForm.getRawValue().medDefCode;
		let searchSequence =
			this.medicalDefinitionsForm.getRawValue().searchSequence;
		let medDefOrder = this.medicalDefinitionsForm.getRawValue().order;
		this.medDefnRulesService
			.deleteMedDefnRules(searchSequence, medDefCode, medDefOrder, claimType)
			.subscribe((response) => {
				for (let i = 0; i < this.MedDefnRules.length; i++) {
					if (
						this.MedDefnRules[i].claimType == claimType &&
						this.MedDefnRules[i].medDefCode == medDefCode &&
						this.MedDefnRules[i].searchSequence == searchSequence &&
						this.MedDefnRules[i].medDefOrder == medDefOrder
					) {
						this.MedDefnRules.splice(i, 1);
					}
				}
				this.dataGridGridOptions.api.setRowData(this.MedDefnRules);
				this.dataGridGridOptions.api.selectIndex(0, false, false);
				this.toastService.showToast(
					"Record successfully Deleted",
					NgbToastType.Success
				);
				this.getMediaclDef();
			});
	}

	deleteMedDefDetails() {
		if (
			this.medDefnDeterminantRule &&
			this.medDefnDeterminantRule.medDefnRulesDeterminantPrimaryKey
		) {
			let searchSequence =
				this.medDefnDeterminantRule.medDefnRulesDeterminantPrimaryKey
					.searchSequence;
			let medDefCode =
				this.medDefnDeterminantRule.medDefnRulesDeterminantPrimaryKey
					.medDefCode;
			let medDefOrder =
				this.medDefnDeterminantRule.medDefnRulesDeterminantPrimaryKey
					.medDefOrder;
			let claimType =
				this.medDefnDeterminantRule.medDefnRulesDeterminantPrimaryKey.claimType;
			let detValueFrom =
				this.medDefnDeterminantRule.medDefnRulesDeterminantPrimaryKey
					.detValueFrom;
			let determinantSequence =
				this.medDefnDeterminantRule.medDefnRulesDeterminantPrimaryKey
					.determinantSequence;
			this.medDefnRulesDeterminantService
				.deleteMedDefnRulesDeterminant(
					searchSequence,
					medDefCode,
					medDefOrder,
					claimType,
					detValueFrom,
					determinantSequence
				)
				.subscribe((response) => {
					this.resetInlineGrid = true;
					setTimeout(() => {
						this.resetInlineGrid = false;
						this.getMedDefnRulesDeterminantByPrimary();
					}, 200);
					this.toastService.showToast(
						"Record Deleted Successfully",
						NgbToastType.Success
					);
				});
		}
	}

	onRowClickEvent(event: any) {
		if (event.index) {
			this.medDefnDeterminantRule = this.medDefnDeterminantRules ? this.medDefnDeterminantRules[event.index] : null;
		}
	}

	setActionStatus(actionNo: number) {
		this.actionNo = actionNo;
	}

	sortRowsByFromValues(event: any) {
		if (event.field.label === "From") {
			this.medDefnDeterminantRules = this.medDefnDeterminantRules.sort(
				(a, b) => (
					parseInt(a.medDefnRulesDeterminantPrimaryKey.detValueFrom) > parseInt(b.medDefnRulesDeterminantPrimaryKey.detValueFrom)) ? 1 : (
					(parseInt(b.medDefnRulesDeterminantPrimaryKey.detValueFrom) > parseInt(a.medDefnRulesDeterminantPrimaryKey.detValueFrom)) ? -1 : 0));
			this.resetInlineGrid = true;
			setTimeout(() => {
				this.resetInlineGrid = false;
				this.populateMedDefDetailsDynamicForm();
			}, 200);
		}
	}

	createNewDeterminant() {
		this.editMedDef = false;
		if (this.medicalDefinitionsForm.dirty) {
			this.messageService
				.findByMessageId(29065)
				.subscribe((message: MessageMasterDtl[]) => {
					this.popupAlert(
						"29065: " + message[0].messageText,
						"Medical Definitions",
						"dirty"
					);
				});
		} else {
			if (this.isSuperUser) {
				this.createNew();
			} else {
				if (this.secWin.hasInsertPermission()) {
					this.createNew();
				} else {
					this.messageService.findByMessageId(21005).subscribe((message: MessageMasterDtl[]) => {
						this.formPopupAlert('21005: ' + message[0].messageText.replace('@1', sessionStorage.getItem("user")), 'Medical Definitions')
					});
				}
			}
		}
	}


	createNew() {
		this.medicalDefinitionsForm.reset("", {
			onlySelf: true,
			emitEvent: false,
		});
		this.enableFields();
		this.dataGridGridOptions.api.deselectAll();
		this.editMedDef = false;
		this.selectedMedCode = "";
		this.resetInlineGrid = true;
		setTimeout(() => {
			this.resetInlineGrid = false;
			this.medDefDetailsFormConfig = MedDefDetFormConfig;
			this.medDefDetailsFormState = new Array<DynamicConfigFormRow>();
		}, 200);
	}

	onLookupFieldDeterminant(event: any) {
		if (event.key === "F5") {
			event.preventDefault();
			this.getAllTableLookUp();
		}
	}

	openTableAndColumnModel() {
		const ref = this.modalService.open(TablesAndColumnsComponent);
		ref.componentInstance.showIcon = true;
		ref.componentInstance.tables = this.allTables;
		ref.componentInstance.onRowSelected.subscribe((res: any) => {
			if (res) {
				this.medicalDefinitionsForm.patchValue({
					determTable: res.tableName,
					determinant002: res.columnName,
				});
			}
		});
	}

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

	getClaimType(codeType: string, langId: string) {
		this.systemCodesService
			.getSystemCodesByLangAndtype(codeType, langId)
			.subscribe(
				(ClaimType) => {
					this.claimType = ClaimType;
				},
				(error) => { }
			);
	}

	getMedDefCode() {
		this.MedDefnCodeService.getMedDefnCodes().subscribe(
			(code) => {
				code.sort((a, b) => {
					return a.medDefCode > b.medDefCode ? 1 : -1;
				});
				this.medDefCode = code;
			},
			(error) => {
				console.log(error);
			}
		);
	}

	getOperator() {
		this.DddwDtlService.findByColumnNameAndDwname(
			"operator",
			"dw_adrul_deter_values_de"
		).subscribe(
			(operator) => {
				this.operator = operator;
			},
			(error) => { }
		);
	}

	popupMessageHandler(button: PopUpMessageButton) {
		if (button.name === "yes") {
		}
		if (button.name === "no") {
		}
	}

	popUpButtonHandler(button: PopUpMessageButton) {
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
			onGridReady: () => {
				this.dataGridGridOptions.api.showLoadingOverlay();
			},
		};
		this.dataGridGridOptions.editType = "fullRow";
		this.dataGridGridOptions.columnDefs = [
			{
				headerName: "Claim",
				field: "medDefnRulesPrimaryKey.claimType",
				width: 100,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true,
			},
			{
				headerName: "Med Def Code",
				field: "medDefnRulesPrimaryKey.medDefCode",
				width: 150,
			},
			{
				headerName: "Order",
				field: "medDefnRulesPrimaryKey.medDefOrder",
				width: 100,
			},
			{
				headerName: "Search Sequence",
				field: "medDefnRulesPrimaryKey.searchSequence",
				width: 180,
			},
			{
				headerName: "Description",
				field: "description",
				width: 300,
				suppressSizeToFit: true,
			},
		];
		this.defaultColDef = { resizable: true };
	}

	totalMedDefDet() {
		this.medDefnRulesDeterminantService.getMedDefnRulesDeterminants().subscribe(
			(medDefnDeterminantRules: MedDefnRulesDeterminant[] = []) => {
				if (medDefnDeterminantRules) {
					this.totalMedDefDetRules = medDefnDeterminantRules.length;
				}
			},
			(error) => {
				this.toastService.showToast(
					"An Error occurred while retrieving records.",
					NgbToastType.Danger
				);
			}
		);
	}

	showDeterminantThruError(detFromValue: any, ValueNew: any) {
		setTimeout(() => {
			let popMsg;
			popMsg = new PopUpMessage(
				"Medical Mefinitions",
				"Medical Mefinitions",
				`4060: Determinant Value Thru ${detFromValue}  must be greater then Determinant Value From ${ValueNew}  `,
				"info",
				[],
				MessageType.ERROR
			);
			popMsg.buttons.push(new PopUpMessageButton("Ok", "Ok", ""));
			let ref = this.modalService.open(PopUpMessageComponent);
			ref.componentInstance.showIcon = true;
			ref.componentInstance.popupMessage = popMsg;
		}, 500);
	}

	GridSelection() {
		let selectedRows = this.dataGridGridOptions.api.getSelectedRows();
		if (selectedRows[0]) {
			this.searchStatus = true;
			this.keyValues =
				selectedRows[0].medDefnRulesPrimaryKey.claimType +
				":" +
				selectedRows[0].medDefnRulesPrimaryKey.medDefOrder +
				":" +
				selectedRows[0].medDefnRulesPrimaryKey.medDefCode +
				":" +
				selectedRows[0].medDefnRulesPrimaryKey.searchSequence;

			this.editMedDef = true;
			this.disableFields();
			this.selectedclaimType = selectedRows[0].medDefnRulesPrimaryKey.claimType;
			this.selectedsearchSeq =
				selectedRows[0].medDefnRulesPrimaryKey.searchSequence;
			this.selectedOrder = selectedRows[0].medDefnRulesPrimaryKey.medDefOrder;
			this.selectedCode = selectedRows[0].medDefnRulesPrimaryKey.medDefCode;
			this.medDefnRulesService
				.getMedDefnRulesByPrimary(
					this.selectedclaimType,
					this.selectedOrder,
					this.selectedCode,
					this.selectedsearchSeq
				)
				.subscribe((MedDefnRules: any) => {
					this.MedDefnRule = MedDefnRules;
					this.medDefnRulesService
						.getAllowMedDefStateFieldStatus(
							this.MedDefnRule.determinantTable,
							this.MedDefnRule.determinant
						)
						.subscribe((status: string) => {
							if (status == "N") {
								this.isCSEditable = false;
							} else {
								this.isCSEditable = true;
							}
							// this.resetMedDefDetailsGrid();
							this.medicalDefinitionsForm.patchValue(
								{
									claimType:
										this.MedDefnRule["medDefnRulesPrimaryKey"].claimType,
									medDefCode:
										this.MedDefnRule["medDefnRulesPrimaryKey"].medDefCode,
									order: this.MedDefnRule["medDefnRulesPrimaryKey"].medDefOrder,
									searchSequence:
										this.MedDefnRule["medDefnRulesPrimaryKey"].searchSequence,
									determTable: this.MedDefnRule.determinantTable,
									determinant002: this.MedDefnRule.determinant,
									description: this.MedDefnRule.description,
									operator_op: this.MedDefnRule.operator,
									includeInGlobalSearch: this.MedDefnRule.globalIncludeFlag,
									codeType: this.MedDefnRule.claimType,
								},
								{ emitEvent: false }
							);
							this.resetInlineGrid = true;
							setTimeout(() => {
								this.resetInlineGrid = false;
								this.getMedDefnRulesDeterminantByPrimary();
							}, 200);
							this.isFormDataChanged();
						});
				});
		} else {
			this.searchStatus = false;
			this.keyValues = "";
		}
	}

	// -------------------------------------------- Speciality grid
	medDefDetailsFormConfig = MedDefDetFormConfig;
	medDefDetailsFormState = new Array<DynamicConfigFormRow>();
	resetInlineGrid = false;

	/**
	 * form date to grid state
	 */
	populateMedDefDetailsDynamicForm() {
		// this.resetInlineGrid = false;
		const values = this.medDefnDeterminantRules;

		this.medDefDetailsFormState = new Array<DynamicConfigFormRow>();
		this.medDefDetailsFormConfig = MedDefDetFormConfig;
		this.medDefDetailsFormConfig.map((field, index) => {
			if (field.name == MedDefDetFields.CODE_TYPE) {
				if (this.isCSEditable) {
					field.options = this.codeTypeOptions;
					field.disabled = false;
				} else {
					field.options = [];
					field.disabled = true;
				}
			} else if (field.name == MedDefDetFields.STATE) {
				if (this.isCSEditable) {
					field.options = this.stateOptions;
					field.disabled = false;
				} else {
					field.options = [];
					field.disabled = true;
				}
			}
		});

		if (!values || values.length == 0) {
			this.medDefDetailsFormState = JSON.parse(
				JSON.stringify(this.medDefDetailsFormState)
			);
			return;
		}
		this.medDefDetailsFormState = [];
		values.forEach((value: MedDefnRulesDeterminant) => {
			let mockConfig = this.getConfigCopy(this.medDefDetailsFormConfig); // make a copy of original config
			this.medDefDetailsFormConfig.forEach((field, index) => {
				if (field.name === MedDefDetFields.FROM) {
					mockConfig[index].value =
						value.medDefnRulesDeterminantPrimaryKey.detValueFrom;
				} else if (field.name === MedDefDetFields.THRU) {
					mockConfig[index].value = value.detValueThru;
				} else if (field.name === MedDefDetFields.CODE_TYPE) {
					if (this.isCSEditable) {
						mockConfig[index].value = value.codeType;
					} else {
						mockConfig[index].value = "";
					}
				} else if (field.name === MedDefDetFields.STATE) {
					if (this.isCSEditable) {
						mockConfig[index].value = value.state;
					} else {
						mockConfig[index].value = "";
					}
				} else if (field.name === MedDefDetFields.EFF_DATE) {
					if (value.effectiveDate) {
						mockConfig[index].value = value.effectiveDate;
					}
				} else if (field.name === MedDefDetFields.TERM_DATE) {
					if (value.termDate) {
						mockConfig[index].value = value.termDate;
					}
				}
			});

			let formState: FormRow = new FormRow();
			formState.formFields = mockConfig;
			formState.action = null;
			formState.id = { medDefDetail: value };
			this.medDefDetailsFormState.push(formState); // add record
		});
		this.medDefDetailsFormConfig = this.getConfigCopy(
			this.medDefDetailsFormConfig
		);
		this.medDefDetailsFormState = JSON.parse(
			JSON.stringify(this.medDefDetailsFormState)
		); // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
		this.resetInlineGrid = false;
	}

	/**
	 * Vendor New row added
	 */
	onMedDefDetailsNewRowAdded(event: any) { }

	getConfigCopy(config: any): FormField[] {
		return JSON.parse(JSON.stringify(config));
	}

	getMedDefnRulesDeterminantByPrimary() {
		this.medDefnRulesDeterminantService
			.getMedDefnRulesDeterminantByPrimary(
				this.selectedclaimType,
				this.selectedOrder,
				this.selectedCode,
				this.selectedsearchSeq
			)
			.subscribe(
				(medDefnDeterminantRules) => {
					this.medDefnDeterminantRules = medDefnDeterminantRules;
					setTimeout(() => {
						this.populateMedDefDetailsDynamicForm();
					}, 100);
				},
				(error) => {
					this.toastService.showToast(
						"An Error occurred while retrieving records.",
						NgbToastType.Danger
					);
				}
			);
	}

	// Use a FormBuilder to create a FormGroup to define the Form Model for the view
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	createForm() {
		// FormBuilder.group is a factory method that creates a FormGroup
		// FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
		this.medicalDefinitionsForm = this.formBuilder.group(
			{
				claimType: [
					"",
					{
						updateOn: "blur",
						validators: [
							Validators.required,
							RequiredValidator.cannotContainSpace,
						],
					},
				],
				medDefCode: [
					"",
					{
						updateOn: "blur",
						validators: [
							Validators.required,
							RequiredValidator.cannotContainSpace,
						],
					},
				],
				order: [
					"",
					{
						updateOn: "blur",
						validators: [
							Validators.required,
							RequiredValidator.cannotContainSpace,
						],
					},
				],
				searchSequence: [
					"",
					{
						updateOn: "blur",
						validators: [
							Validators.required,
							RequiredValidator.cannotContainSpace,
						],
					},
				],
				determTable: [
					"",
					{
						updateOn: "blur",
						validators: [
							Validators.required,
							RequiredValidator.cannotContainSpace,
						],
					},
				],
				determinant002: [
					"",
					{
						updateOn: "blur",
						validators: [
							Validators.required,
							RequiredValidator.cannotContainSpace,
						],
					},
				],
				operator_op: [
					"",
					{
						updateOn: "blur",
						validators: [
							Validators.required,
							RequiredValidator.cannotContainSpace,
						],
					},
				],
				description: ["", { updateOn: "blur", validators: [] }],
				includeInGlobalSearch: ["", { updateOn: "blur", validators: [] }],
				from: ["", { updateOn: "blur", validators: [] }],
				thru: ["", { updateOn: "blur", validators: [] }],
				codeType: ["", { updateOn: "blur", validators: [] }],
				state: ["", { updateOn: "blur", validators: [] }],
				effDt: ["", { updateOn: "blur", validators: [] }],
				termDt: ["", { updateOn: "blur", validators: [] }],
			},
			{ updateOn: "submit" }
		);
	}

	resolved(captchaResponse: string) { }

	menuInit() {
		this.menu = [
			{
				menuItem: "File",
				dropdownItems: [
					{ name: "New", shortcutKey: "Ctrl+M" },
					{ name: "Open", shortcutKey: "Ctrl+O" },
					{ name: "Delete", shortcutKey: "Ctrl+D" },
					{ name: "Save", shortcutKey: "Ctrl+S" },
					{ isHorizontal: true },
					{ name: "Close", shortcutKey: "Ctrl+F4" },
					{ name: "Main Menu", shortcutKey: "F2" },
					{ name: "Shortcut Menu", shortcutKey: "F3" },
				],
			},
			{
				menuItem: "Edit",
				dropdownItems: [
					{ name: "Undo" },
					{ name: "Cut" },
					{ name: "Copy" },
					{ name: "Paste" },
					{ name: "Next" },
					{ name: "Previous" },
					{ name: "Lookup" },
				],
			},
			{
				menuItem: "Notes",
				dropdownItems: [{ name: "Notes", shortcutKey: "F4", disabled: true }],
			},
			{
				menuItem: "Windows",
				dropdownItems: [
					{ name: "Tile" },
					{ name: "Layer" },
					{ name: "Cascade" },
					{ name: "Arrange Icons" },
					{ isHorizontal: true },
					{ name: "Show Timestamp" },
					{ name: "Audit Display" },
					{ isHorizontal: true },
					{ name: "1 Main Menu" },
					{ name: "2 Medical Definitions" },
				],
			},
			{
				menuItem: "Help",
				dropdownItems: [
					{ name: "Contents" },
					{ name: "Search for Help on..." },
					{ name: "This Window", shortcutKey: "F1" },
					{ isHorizontal: true },
					{ name: "Glossary" },
					{ name: "Getting Started" },
					{ name: "How to use Help" },
					{ isHorizontal: true },
					{ name: "About Diamond Client/Server" },
				],
			},
		];
	}

	/**
	 * Handle Menu Actions
	 * @param event: {action: string, menu: MenuItem}
	 */
	onMenuItemClick(event: any) {
		if (event.menu.menuItem === "File") {
			// handle File actions
			switch (event.action) {
				case "New": {
					this.createNewDeterminant();
					break;
				}
				case "Open": {
					break;
				}
				case "Delete": {
					this.deleteMedicalDefinitionPopup();
					break;
				}
				case "Save": {
					//this.saveForm();
					this.saveMedicalDefinition();
					break;
				}
				case "Close": {
					this.medicalDefinitionsForm.reset();
					break;
				}
				case "Shortcut Menu": {
					const ref = this.modalService.open(FunctionalGroupShortCutComponent);
					ref.componentInstance.showIcon = true;
					break;
				}
				default: {
					this.toastService.showToast(
						"Action is not valid",
						NgbToastType.Danger
					);
					break;
				}
			}
		} else if (event.menu.menuItem === "Edit") {
			// handle Edit-Menu Actions
			// add method to handle Edit actions
		} else if (event.menu.menuItem === "Windows") {
			// handle Edit-Menu Actions
			switch (event.action) {
				case "1 Main Menu": {
					this.router.navigate(["diamond/functional-groups"]);
					break;
				}
				case "Audit Display": {
					if (this.searchStatus) {
						let status = this.functionalLevelSecurityService.isFunctionIdExist(
							CONSTANTS.F_AUDIT,
							this.winID
						);
						if (status) {
							let ref = this.modalService.open(AuditDisplayComponent, {
								size: "lg",
							});
							ref.componentInstance.keyNames = this.keyNames;
							ref.componentInstance.keyValues = this.keyValues;
							ref.componentInstance.winID = this.winID;
							ref.componentInstance.showIcon = true;
						} else {
							this.messageService
								.findByMessageId(11073)
								.subscribe((message: MessageMasterDtl[]) => {
									this.alertMessage = this.alertMessageService.error(
										"11073: " + message[0].messageText
									);
								});
						}
					} else {
						this.messageService
							.findByMessageId(30164)
							.subscribe((message: MessageMasterDtl[]) => {
								this.alertMessage = this.alertMessageService.error(
									"30164: " + message[0].messageText
								);
							});
					}

					break;
				}
				case "Show Timestamp": {
					this.showTimeStamp();
					break;
				}
			}
		} else if (event.menu.menuItem === "Help") {
			// handle special-Menu Actions
			/**
			 * Open help modal
			 */
			this.handleHelpMenu();
		}
	}

	modalClose = () => {
		this.screenCloseRequest = true;
		if (this.valueChanged === true) {
			this.messageService
				.findByMessageId(29065)
				.subscribe((message: MessageMasterDtl[]) => {
					this.popupAlert(
						"29065: " + message[0].messageText,
						"Medical Definitions",
						""
					);
				});
		} else {
			this.activeModal.close();
		}
	};

	popupAlert = (message: string, title: string, value: String) => {
		try {
			if (!message) {
				return;
			}
			let popUpMessage = new PopUpMessage(
				"popUpMessageName",
				title,
				message,
				"icon"
			);
			popUpMessage.buttons.push(new PopUpMessageButton("Yes", "Yes", ""));
			popUpMessage.buttons.push(new PopUpMessageButton("No", "No", ""));
			popUpMessage.buttons.push(new PopUpMessageButton("Cancel", "Cancel", ""));
			let ref = this.modalService.open(PopUpMessageComponent);
			ref.componentInstance.showIcon = true;
			ref.componentInstance.popupMessage = popUpMessage;
			ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
				if (resp.name === "Yes") {
					if (value == "dirty") {
						this.editMedDef = false;
					}
					this.saveMedicalDefinition();
				} else if (resp.name === "No") {
					if (value == "dirty") {
						this.medicalDefinitionsForm.reset("", {
							onlySelf: true,
							emitEvent: false,
						});
						this.enableFields();
						this.selectedMedCode = "";
						this.dataGridGridOptions.api.deselectAll();
						this.editMedDef = false;
					} else {
						this.router.navigateByUrl("/");
						this.activeModal.close();
					}
				}
			});
		} catch (e) {
			console.log(e);
		}
	};

	isFormDataChanged = () => {
		this.medicalDefinitionsForm.valueChanges.subscribe(() => {
			this.valueChanged = true;
		});
	};

	orderKeyPress = (event: any) => {
		if (event.key === "Tab") {
			this.medicalDefinitionsForm.patchValue({
				searchSequence: 10,
			});
		}
	};

	searchSequenceFocus = (event: any) => {
		let matchedPairs: any = [];
		if (
			this.medicalDefinitionsForm.get('claimType').value &&
			this.medicalDefinitionsForm.get('medDefCode').value &&
			this.medicalDefinitionsForm.get('order').value
		) {
			this.MedDefnRules.map((item) => {
				if (item.medDefnRulesPrimaryKey.claimType ===
					this.medicalDefinitionsForm.get('claimType').value &&
					item.medDefnRulesPrimaryKey.medDefCode ===
					this.medicalDefinitionsForm.get('medDefCode').value &&
					item.medDefnRulesPrimaryKey.medDefOrder ===
					Number(this.medicalDefinitionsForm.get('order').value)
				) {
					let searchSeq = item.medDefnRulesPrimaryKey.searchSequence + 10;
					matchedPairs.push(item);
					const maxSearchSeq = matchedPairs.reduce(function (
						prev: any,
						current: any
					) {
						return prev.medDefnRulesPrimaryKey.searchSequence >
							current.medDefnRulesPrimaryKey.searchSequence
							? prev.medDefnRulesPrimaryKey.searchSequence
							: current.medDefnRulesPrimaryKey.searchSequence;
					});
					//iterate over the matchedPair and add all the values
					let finalMaxVal = 0;
					matchedPairs.forEach((matchedPair: any) => {
						finalMaxVal = finalMaxVal + matchedPair.medDefnRulesPrimaryKey.searchSequence;
					});
					console.log('finalMaxVal ==> ', finalMaxVal)
					this.medicalDefinitionsForm.patchValue({
						searchSequence: finalMaxVal,
					});
				}
			});
		}
	};

	handleHelpMenu() {
		const modalRef = this.modalService.open(HelpComponent, {
			windowClass: "myCustomModalClass",
			...NGBModalOptions,
		});

		modalRef.componentInstance.currentWin = "MEDEF_Medical_Definitions.htm";
	}

	saveFormDy(event: any) {
		this.medDefDetailsFormState = event.formState;
		event = event.fields;
		let apiValues = new Array<MedDefnRulesDeterminant>();
		const updatedRecords: FormRow[] = this.medDefDetailsFormState.filter(
			(record: any, index) => {
				record.index = index;
				return record.action == FORM_FIELD_ACTION_TYPES.UPDATE;
			}
		);
		if (updatedRecords.length > 0) {
			updatedRecords.forEach((preStateRecord: FormRow, index) => {
				let updatedRecord = event[preStateRecord.index];
				if (preStateRecord.action && event.length > index) {
					const pair = Object.keys(updatedRecord).map((k) => ({
						key: k,
						value: updatedRecord[k],
					}));
					let med: MedDefnRulesDeterminant = preStateRecord.id?.medDefDetail;
					const apiValue: MedDefnRulesDeterminant = this.populateFormFields(
						med,
						pair,
						preStateRecord.action
					);
					apiValues.push(apiValue);
				}
			});
		}
		const newRecords: FormRow[] = this.medDefDetailsFormState.filter(
			(record) => record.action == FORM_FIELD_ACTION_TYPES.ADD
		);

		newRecords.forEach((record, index) => {
			if (record.action == FORM_FIELD_ACTION_TYPES.ADD) {
				let medDefnRulesDeterminant = new MedDefnRulesDeterminant();

				let newRecord = event[record.index];
				const pair = Object.keys(event[record.index]).map((k) => ({
					key: k,
					value: newRecord[k],
				}));
				let apiValue: MedDefnRulesDeterminant = this.populateFormFields(
					medDefnRulesDeterminant,
					pair,
					FORM_FIELD_ACTION_TYPES.ADD
				);
				apiValues.push(apiValue);
			}
		});
		let addProcSavePricingAccntCodes: MedDefnRulesDeterminant[] = [];
		let updateProcSavePricingAccntCodes: MedDefnRulesDeterminant[] = [];
		apiValues.forEach((value) => {
			let procSavePricingAccntCode = new MedDefnRulesDeterminant();
			procSavePricingAccntCode.detValueFrom = value.detValueFrom;
			procSavePricingAccntCode.detValueThru = value.detValueThru;
			procSavePricingAccntCode.codeType = value.codeType;
			procSavePricingAccntCode.state = value.state;
			if (value.action == "update") {
				procSavePricingAccntCode.medDefnRulesDeterminantPrimaryKey = {
					determinantSequence: value["medDefnRulesDeterminantPrimaryKey"].determinantSequence,
					detValueFrom: value.detValueFrom,
				};
			}
			procSavePricingAccntCode.effectiveDate = value.effectiveDate;
			procSavePricingAccntCode.termDate = value.termDate;
			procSavePricingAccntCode.action = value.action;
			// ----------------- Save form-----------------------------------------------------
			if (value.action == FORM_FIELD_ACTION_TYPES.ADD) {
				// todo need to check do we need save timestamp
				procSavePricingAccntCode.insertDatetime = this.datePipe.transform(
					new Date(),
					"yyyy-MM-dd HH:mm:ss"
				);
				procSavePricingAccntCode.insertDatetime = this.datePipe.transform(
					new Date(),
					"yyyy-MM-dd HH:mm:ss"
				);
				procSavePricingAccntCode.insertUser = sessionStorage.getItem("user");
				procSavePricingAccntCode.insertProcess = this.windowId;

				let seq =
					this.medDefnDeterminantRules &&
						this.medDefnDeterminantRules.length > 0
						? this.medDefnDeterminantRules[
							this.medDefnDeterminantRules.length - 1
						].medDefnRulesDeterminantPrimaryKey.determinantSequence + 1
						: 0;
				procSavePricingAccntCode.medDefnRulesDeterminantPrimaryKey = {
					determinantSequence: seq,
					searchSequence: this.selectedsearchSeq,
					medDefCode: this.selectedCode,
					medDefOrder: this.selectedOrder,
					claimType: this.selectedclaimType,
					detValueFrom: value.detValueFrom,

				};
				procSavePricingAccntCode.securityCode = value.securityCode;

				/**
				 * using stored procedure to save new
				 */
				//this.savePricingPartner(procSavePricingAccntCode);
				addProcSavePricingAccntCodes.push(procSavePricingAccntCode);
			} else if (value.action == FORM_FIELD_ACTION_TYPES.UPDATE) {
				procSavePricingAccntCode.updateDatetime = this.datePipe.transform(
					new Date(),
					"yyyy-MM-dd HH:mm:ss"
				);
				try {
					procSavePricingAccntCode.insertDatetime = this.datePipe.transform(
						new Date(value.insertDatetime),
						"yyyy-MM-dd HH:mm:ss"
					);

				} catch (e) {
					console.log(e);
				}
				procSavePricingAccntCode.updateUser = sessionStorage.getItem("user");
				procSavePricingAccntCode.updateProcess = this.windowId;
				// this.savePricingPartner(procSavePricingAccntCode);
				updateProcSavePricingAccntCodes.push(procSavePricingAccntCode);
			}
		});

		let totalApiRecordSize = apiValues.length;
		let counter = 0;
		let fromValue: string;
		let thruValue: string;
		apiValues.forEach(record => {
			if (record.detValueFrom && record.detValueThru) {
				if ((Number(record.detValueFrom) > Number(record.detValueThru))) {
					fromValue = record.detValueFrom;
					thruValue = record.detValueThru;
					return false;
				} else {
					counter = counter + 1;
				}

			} else {
				counter = counter + 1;
			}
		});
		if (totalApiRecordSize === counter) {
			if (addProcSavePricingAccntCodes.length > 0) {
				this.savePricingPartner(addProcSavePricingAccntCodes, "add");
			} else if (updateProcSavePricingAccntCodes.length > 0) {
				this.savePricingPartner(updateProcSavePricingAccntCodes, "update");
			}
		} else {
			this.messageService.findByMessageId(4060).subscribe((message: MessageMasterDtl[]) => {
				this.showDeterminantThruError(thruValue, fromValue);
			});
		}
	}
	addStatus: boolean = false;
	updateStatus: boolean = false;
	reloadGrid: boolean = false;
	savePricingPartner(procSavePricingAccntCode: MedDefnRulesDeterminant[], action: string = "add") {
		if (action == "add") {
			this.medDefnRulesDeterminantService.createMedDefnRulesDeterminant(procSavePricingAccntCode).subscribe((medDefnDeterminantRules) => {
				this.addStatus = true;
				this.showStatus();
				this.medDefnDeterminantRule = this.medDefnDeterminantRule ? this.medDefnDeterminantRule : new MedDefnRulesDeterminant();
				this.auditService.setAuditFieldsAfterSaving(
					procSavePricingAccntCode,
					this.medDefnDeterminantRule,
					sessionStorage.getItem("user"),
					this.windowId,
					OPERATIONS.ADD
				);

			});
		} else {
			this.addStatus = true;
			this.showStatus();
		}
		if (action == "update") {
			this.medDefnRulesDeterminantService.UpdateMedDefnRulesDeterminantByPrimary(
				procSavePricingAccntCode,
				this.selectedclaimType,
				this.selectedOrder,
				this.selectedCode,
				this.selectedsearchSeq
			).subscribe((medDefnDeterminantRules) => {
				this.updateStatus = true;
				this.showStatus();
				this.medDefnDeterminantRule = this.medDefnDeterminantRule ? this.medDefnDeterminantRule: new MedDefnRulesDeterminant();
				this.auditService.setAuditFieldsAfterSaving(
					procSavePricingAccntCode,
					this.medDefnDeterminantRule,
					sessionStorage.getItem("user"),
					this.windowId,
					OPERATIONS.UPDATE
				);
			});
		} else {
			this.updateStatus = true;
			this.showStatus();
		}
	}

	showStatus() {
		if (this.addStatus && this.updateStatus) {
			this.addStatus = false;
			this.updateStatus = false;
			this.saveForm = false;
			setTimeout(() => {
				if (this.reloadGrid) {
					this.medicalDefinitionsForm.markAsPristine();
					this.getMediaclDef();
					this.reloadGrid = false;
				}

			}, 2000);
			this.toastService.showToast("Determinant rule is updated successfully ", NgbToastType.Success);
		}
	}

	/**
	 * populate fields to models
	 * @param event
	 * @param action
	 */
	populateFormFields(
		ciebPricingAccntCodeModel: MedDefnRulesDeterminant,
		event: any,
		action: FORM_FIELD_ACTION_TYPES
	): MedDefnRulesDeterminant {
		ciebPricingAccntCodeModel.detValueFrom = event[0].value
			? event[0].value
			: "";
		ciebPricingAccntCodeModel.detValueThru = event[1].value
			? event[1].value
			: "";
		if (this.isCSEditable) {
			ciebPricingAccntCodeModel.codeType = event[2].value ? event[2].value : "";
			ciebPricingAccntCodeModel.state = event[3].value ? event[3].value : "";
		} else {
			ciebPricingAccntCodeModel.codeType = "";
			ciebPricingAccntCodeModel.state = "";
		}

		// ----------------------- Dates conversion to format
		let termDate;
		if (this.isCSEditable) {
			if (event[5].value != null) {
				termDate = event[5].value.singleDate
					? event[5].value.singleDate.date
					: null;
			} else {
				termDate = null;
			}
		} else {
			if (event[3].value != null) {
				termDate = event[3].value.singleDate
					? event[3].value.singleDate.date
					: null;
			} else {
				termDate = null;
			}
		}

		if (termDate) {
			ciebPricingAccntCodeModel.termDate =
				termDate.year +
				"-" +
				this.addPrefixZero(termDate.month) +
				"-" +
				this.addPrefixZero(termDate.day);
		}
		let effectiveDate;
		if (this.isCSEditable) {
			if (event[4].value != null) {
				effectiveDate = event[4].value.singleDate
					? event[4].value.singleDate.date
					: null;
			} else {
				effectiveDate = null;
			}
		} else {
			if (event[2].value != null) {
				effectiveDate = event[2].value.singleDate
					? event[2].value.singleDate.date
					: null;
			} else {
				effectiveDate = null;
			}
		}
		if (effectiveDate) {
			ciebPricingAccntCodeModel.effectiveDate =
				effectiveDate.year +
				"-" +
				this.addPrefixZero(effectiveDate.month) +
				"-" +
				this.addPrefixZero(effectiveDate.day);
		}

		//   ciebPricingAccntCodeModel.changedOnDate = event[5].value;    todo need to fix mapping changedOnDate

		ciebPricingAccntCodeModel.action = action;

		return ciebPricingAccntCodeModel;
	}

	public addPrefixZero(value: any) {
		return value < 10 ? "0" + value : value;
	}

	getClaimTypes = () => {
		this.systemCodesService
			.getSystemCodesByLangAndtype("CLAIMTYPE", "0")
			.subscribe((data) => {
				this.claimTypes = data;
			});
	};
	private showTimeStamp = () => {
		let ref = this.modalService.open(TimestampComponent);
		if (this.actionNo == 1) {
			ref.componentInstance.title = "Medical Definition";
			ref.componentInstance.insertDateTime = this.MedDefnRule.insertDatetimeDisplay;
			ref.componentInstance.insertProcess = this.MedDefnRule.insertProcess;
			ref.componentInstance.insertUser = this.MedDefnRule.insertUser;
			ref.componentInstance.updateUser = this.MedDefnRule.updateUser;
			ref.componentInstance.updateDateTime = this.MedDefnRule.updateDatetimeDisplay;
			ref.componentInstance.updateProcess = this.MedDefnRule.updateProcess;
		}
		else {
			ref.componentInstance.title = "Medical Definition";
			ref.componentInstance.insertDateTime = this.medDefnDeterminantRule
				.insertDatetime
				? this.medDefnDeterminantRule.insertDatetime
				: "";
			ref.componentInstance.insertDateTime =
				this.medDefnDeterminantRule.insertDatetimeDisplay;
			ref.componentInstance.insertProcess = this.medDefnDeterminantRule.insertProcess;
			ref.componentInstance.insertUser =
				this.medDefnDeterminantRule.insertUser;
			ref.componentInstance.updateUser = this.medDefnDeterminantRule.updateUser;
			ref.componentInstance.updateDateTime =
				this.medDefnDeterminantRule.updateDatetimeDisplay;
			ref.componentInstance.updateProcess = this.medDefnDeterminantRule.updateProcess;
		}
	};


	formPopupAlert = (message: string, title: string) => {
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
}
