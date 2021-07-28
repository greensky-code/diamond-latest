import {DatePipe} from "@angular/common";
import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren
} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {GridOptions} from "ag-grid-community";
import {KeyboardShortcutsComponent, ShortcutInput} from "ng-keyboard-shortcuts";
import {NgbToastType} from "ngb-toast";
import {BenefitPackageMaster, DddwDtl, MessageMasterDtl, PremiumMaster} from "../../../api-models";
import {BenefitPackageCustom, BenefitPackageDetail} from "../../../api-models/benefit-package-detail.model";
import {ClaimBenefitAccum} from "../../../api-models/claim-benefit-accum.model";
import {MemberEligHistory, MemberEligHistoryCustom} from "../../../api-models/member-elig-history.model";
import {MemberMaster} from "../../../api-models/member-master.model";
import {
	BenefitPackageDetailService,
	BenefitPackageMasterService,
	DddwDtlService,
	GroupMasterService,
	MessageMasterDtlService,
	PremiumMasterService
} from "../../../api-services";
import {BenefitRuleService} from "../../../api-services/benefit-rule.service";
import {ClaimBenefitAccumService} from "../../../api-services/claim-benefit-accum.service";
import {MemberEligHistoryService} from "../../../api-services/member-elig-history.service";
import {UserDefinedValidateCodeService} from "../../../api-services/user-defined-validate-code.service";
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {MessageType, PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {DatePickerConfig, datePickerModel, NGBModalOptions} from "../../../shared/config";
import {Form} from "../../../shared/helpers/form.helper";
import {BenefitAccVBFieldNames, BenefitAccVBFormConfig} from "../../../shared/models/constants";
import {FORM_FIELD_ACTION_TYPES, FormRow, Menu, OPERATIONS} from "../../../shared/models/models";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {Mask} from "../../../shared/pipes/text-format.pipe";
import {getBenefitAccumShortcutKeys} from "../../../shared/services/shared.service";
import {ToastService} from "../../../shared/services/toast.service";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {SelectMemberComponent} from "../select-member/select-member.component";
import {HelpComponent} from "../help/help.component";
import {AccumClaimsReportComponent} from "../accum-claims-report/accum-claims-report.component";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import {AuditService} from "../../../shared/services/audit.service";
import {NotesComponent} from "../../../shared/components/notes/notes.component";
import {MenuBarComponent} from "../../../shared/components/menu-bar/menu-bar.component";

@Component({
	selector: "app-benefit-accumulator-base-values",
	templateUrl: "./benefit-accumulator-base-values.component.html",
	providers: [
		DatePipe,
		Mask
	],
})
export class BenefitAccumulatorBaseValuesComponent implements OnInit {
	// The form model used by the view per Angular Reactive Forms
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	benefitAccumulatorBaseValuesForm: FormGroup;
	formValidation: FormValidation;
	public alertMessage: AlertMessage;
	public displayMessage: any;
	public popUpMessage: PopUpMessage;
	noRuleIdError: any;
	showRemoveButton: any;
	public datePickerConfig = DatePickerConfig;
	public datePickerModel = datePickerModel;
	@Input() showIcon: boolean = false;
	@ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
	public menu: Menu[] = [];
	noDateError: any;
	saveForm: any;
	shortNameGroupName: any;
	groupId: any;
	groupStatus: boolean = false;
	premiumMasters: PremiumMaster[] = [];
	benefitPackageMaster: BenefitPackageMaster;
	benefitPackageDetailsCustom: BenefitPackageCustom[] = [];
	dddwDtls: DddwDtl[] = [];
	dddwDtls1: DddwDtl[] = [];
	memberMaster: MemberMaster;
	benefitState: Array<FormRow> = [];
	MbrFbr: DddwDtl[] = [];
	timeFrame: DddwDtl[] = [];
	Carryover: DddwDtl[] = [];
	CLaimType: DddwDtl[] = [];
	AllGroups: DddwDtl[] = [];
	rules: any;
	seedRsn: any;
	compareDates: any;
	shortcuts: ShortcutInput[] = [];
	isAddNewRow: any;
	BenefitAccVBFormConfig = BenefitAccVBFormConfig;
	popupClose: Boolean = false;
	closeStatus: Boolean = false;
	oldPair: { key: string; value: any }[];
	relationCodes: DddwDtl[];
	public dataGrid001GridOptions: GridOptions;
	private dataGrid001gridApi: any;
	relationshipCode: any;
	menuOpened= ""
	@ViewChildren(MenuBarComponent) menuBarComponent: QueryList<MenuBarComponent>;

	valueChanged: Boolean = false;
	editBenefitPackageDetail: boolean;
	benefitPackageDetail: BenefitPackageDetail;
	benefitPackageDetails: BenefitPackageDetail[];
	editMemberEligHistory: boolean;
	memberEligHistory: MemberEligHistory;
	memberEligHistoryss: MemberEligHistoryCustom;
	memberEligHistorys: MemberEligHistory[];
	editClaimBenefitAccum: boolean;
	claimBenefitAccum: ClaimBenefitAccum;
	claimBenefitAccums: ClaimBenefitAccum[];
	isResetForm = false;
	rowCount: any;
	windowId = 'ACCUM';
	selectedClaimBenefitAccum: ClaimBenefitAccum;
	inProgress = true;
	benefitAccumSelectedRowIndex = 0;

	@ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
	@ViewChild('dynamicform', { read: ElementRef }) dynamicform: ElementRef;
	claimUpdateInProgress = false;
	public seqSourceId: number = -1;

	// Use constructor injection to inject an instance of a FormBuilder
	constructor(
		private formBuilder: FormBuilder,
		private mask: Mask,
		private customValidators: CustomValidators,
		private alertMessageService: AlertMessageService,
		private dateFormatPipe: DateFormatPipe,
		private modalService: NgbModal,
		private groupMasterService: GroupMasterService,
		private premiumMasterService: PremiumMasterService,
		private benefitPackageMasterService: BenefitPackageMasterService,
		private dddwDtlService: DddwDtlService,
		private toastService: ToastService,
		public activeModal: NgbActiveModal,
		public router: Router,
		private BenefitRuleService: BenefitRuleService,
		private ClaimBenefitAccumService: ClaimBenefitAccumService,
		public datePipe: DatePipe,
		private cdr: ChangeDetectorRef,
		private UserDefinedValidateCodeService: UserDefinedValidateCodeService,
		private benefitPackageDetailService: BenefitPackageDetailService,
		private memberEligHistoryService: MemberEligHistoryService,
		private claimBenefitAccumService: ClaimBenefitAccumService,
		private messageService: MessageMasterDtlService,
		private auditService: AuditService,
	) { }

	// Most initial setup should be done in the ngOnInit() life-cycle hook function
	// rather than in the constructor for this class in order to ensure that the
	// resources are fully loaded before performing the initial setup processing.
	ngOnInit(): void {
		this.createForm();
		this.menuInit();
		this.displayMessage = {};
		this.formValidation = new FormValidation(
			this.benefitAccumulatorBaseValuesForm
		);

		this.createDataGrid001();
		this.getRelationCodeDetailByCode();
		this.getBenefitRuleTypes();

		this.getBenefitMBr();
		this.getBenefitClaimType();
		this.getBenefitCarryOver();
		this.getBenefitAllGroups();
		this.getBenefitTimeFrame();
		this.getRelationShipCodes();
		this.premiumMasters = [];
		this.benefitPackageMaster = new BenefitPackageMaster();
		this.memberMaster = new MemberMaster();
		setTimeout(() => {
			this.dataGrid001GridOptions.api.setRowData([]);
			this.selectMember();
		});
		this.showRemoveButton = false;
	}


	showPopUp(message: string, title: string, button: string = "Ok") {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton(button, button, 'btn btn-primary')];
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

	ngAfterViewInit(): void {
		this.shortcuts.push(...getBenefitAccumShortcutKeys(this));
		this.cdr.detectChanges();
		this.benefitAccumulatorBaseValuesForm.valueChanges.subscribe(() => {
			this.popupClose = true;
			this.valueChanged = true;
		});
	}

	createBenefitPackageDetail() {
		this.formValidation.validateForm();
		if (this.benefitAccumulatorBaseValuesForm.valid) {
			let benefitPackageDetail = new BenefitPackageDetail();
			this.benefitPackageDetailService
				.createBenefitPackageDetail(benefitPackageDetail)
				.subscribe(
					(response) => {
						this.toastService.showToast('Record successfully created', NgbToastType.Success);
						this.editBenefitPackageDetail = false;
					}
				);
		} else {
			this.alertMessage = this.alertMessageService.error(
				"Some required information is missing or incomplete. Please correct your entries and try again."
			);
		}
	}

	updateBenefitPackageDetail(benefitPackageId: string) {
		this.formValidation.validateForm();
		if (this.benefitAccumulatorBaseValuesForm.valid) {
			let benefitPackageDetail = new BenefitPackageDetail();
			this.benefitPackageDetailService
				.updateBenefitPackageDetail(benefitPackageDetail, benefitPackageId)
				.subscribe(
					(response) => {
						this.toastService.showToast('Record successfully updated', NgbToastType.Success);
						this.editBenefitPackageDetail = false;
					}
				);
		} else {
			this.alertMessage = this.alertMessageService.error(
				"Some required information is missing or incomplete. Please correct your entries and try again."
			);
		}
	}

	saveBenefitPackageDetail() {
		if (this.editBenefitPackageDetail) {
			this.updateBenefitPackageDetail(
				this.benefitPackageDetail.benefitPackageId
			);
		} else {
			this.createBenefitPackageDetail();
		}
	}

	deleteBenefitPackageDetail(benefitPackageId: string) {
		this.benefitPackageDetailService
			.deleteBenefitPackageDetail(benefitPackageId)
			.subscribe(
				(response) => {
					this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
				}
			);
	}

	getBenefitPackageDetail(benefitPackageId: string) {
		this.benefitPackageDetailService
			.getBenefitPackageDetail(benefitPackageId)
			.subscribe(
				(benefitPackageDetail) => {
					this.benefitPackageDetail = benefitPackageDetail;
					this.benefitAccumulatorBaseValuesForm.patchValue({}, { emitEvent: false });
				}
			);
	}

	getBenefitPackageDetails() {
		this.benefitPackageDetailService.getBenefitPackageDetails().subscribe(
			(benefitPackageDetails) => {
				this.benefitPackageDetails = benefitPackageDetails;
			}
		);
	}

	createMemberEligHistory() {
		this.formValidation.validateForm();
		if (this.benefitAccumulatorBaseValuesForm.valid) {
			let memberEligHistory = new MemberEligHistory();
			memberEligHistory.subscriberId = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"subscriberId"
			);
			memberEligHistory.personNumber = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"personNo"
			);
			memberEligHistory.effectiveDate = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"effectiveDate"
			);
			memberEligHistory.termDate = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"termDate"
			);
			memberEligHistory.eligStatus = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"eligStatus"
			);
			memberEligHistory.seqGroupId = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"groupId"
			);
			memberEligHistory.planCode = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"planCode"
			);
			memberEligHistory.benefitStartDate = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"benefitPkgId"
			);
			memberEligHistory.relationshipCode = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"relationshipCode"
			);
			memberEligHistory.riderCode1 = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"riders"
			);
			this.memberEligHistoryService
				.createMemberEligHistory(memberEligHistory)
				.subscribe(
					(response) => {
						this.toastService.showToast('Record successfully created', NgbToastType.Success);
						this.editMemberEligHistory = false;
					}
				);
		} else {
			this.alertMessage = this.alertMessageService.error(
				"Some required information is missing or incomplete. Please correct your entries and try again."
			);
		}
	}

	updateMemberEligHistory(seqEligHist: number) {
		this.formValidation.validateForm();
		if (this.benefitAccumulatorBaseValuesForm.valid) {
			let memberEligHistory = new MemberEligHistory();
			memberEligHistory.subscriberId = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"subscriberId"
			);
			memberEligHistory.personNumber = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"personNo"
			);
			memberEligHistory.effectiveDate = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"effectiveDate"
			);
			memberEligHistory.termDate = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"termDate"
			);
			memberEligHistory.eligStatus = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"eligStatus"
			);
			memberEligHistory.seqGroupId = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"seqGroupId"
			);
			memberEligHistory.planCode = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"planCode"
			);
			memberEligHistory.benefitStartDate = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"benefitPkgId"
			);
			memberEligHistory.relationshipCode = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"relationshipCode"
			);
			memberEligHistory.riderCode1 = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"riders"
			);
			this.memberEligHistoryService
				.updateMemberEligHistoryBySeqEligHist(memberEligHistory, seqEligHist)
				.subscribe(
					(response) => {
						this.toastService.showToast('Record successfully updated', NgbToastType.Success);
						this.editMemberEligHistory = false;
					}
				);
		} else {
			this.alertMessage = this.alertMessageService.error(
				"Some required information is missing or incomplete. Please correct your entries and try again."
			);
		}
	}
	saveMemberEligHistory() {
		if (this.editMemberEligHistory) {
			this.updateMemberEligHistory(this.memberEligHistory.seqEligHist);
		} else {
			this.createMemberEligHistory();
		}
	}
	deleteMemberEligHistory(seqEligHist: number) {
		this.memberEligHistoryService
			.deleteMemberEligHistory(seqEligHist)
			.subscribe(
				(response) => {
					this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
				}
			);
	}
	getMemberEligHistory(seqEligHist: number) {
		this.memberEligHistoryService
			.getMemberEligHistoryBySeqEligHist(seqEligHist)
			.subscribe(
				(memberEligHistory) => {
					this.memberEligHistory = memberEligHistory;
					this.benefitAccumulatorBaseValuesForm.patchValue({
						subscriberId: this.memberEligHistory.subscriberId,
						personNo: this.memberEligHistory.personNumber,
						effectiveDate: this.dateFormatPipe.defaultDisplayDateFormat(
							this.memberEligHistory.effectiveDate
						),
						termDate: this.dateFormatPipe.defaultDisplayDateFormat(
							this.memberEligHistory.termDate
						),
						eligStatus: this.memberEligHistory.eligStatus,
						groupId: this.memberEligHistory.groupId,
						seqGroupId: this.memberEligHistory.seqGroupId,
						planCode: this.memberEligHistory.planCode,
						benefitPkgId: this.dateFormatPipe.defaultDisplayDateFormat(
							this.memberEligHistory.benefitStartDate
						),
						relationshipCode: this.memberEligHistory.relationshipCode,
						riders: this.memberEligHistory.riderCode1,
					}, { emitEvent: false });
				}
			);
	}

	getMemberEligHistorys() {
		this.memberEligHistoryService.getMemberEligHistorys().subscribe(
			(memberEligHistorys) => {
				this.memberEligHistorys = memberEligHistorys;
			}
		);
	}

	createClaimBenefitAccum() {
		this.formValidation.validateForm();
		if (this.benefitAccumulatorBaseValuesForm.valid) {
			let claimBenefitAccum = new ClaimBenefitAccum();
			claimBenefitAccum.seqGroupId = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"seqGroupId"
			);
			claimBenefitAccum.relationshipCode = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"relationshipCode"
			);
			this.claimBenefitAccumService
				.createClaimBenefitAccum(claimBenefitAccum)
				.subscribe(
					(response) => {
						this.toastService.showToast('Record successfully created', NgbToastType.Success);
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
		if (this.benefitAccumulatorBaseValuesForm.valid) {
			let claimBenefitAccum = new ClaimBenefitAccum();
			claimBenefitAccum.seqGroupId = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"seqGroupId"
			);
			claimBenefitAccum.relationshipCode = Form.getValue(
				this.benefitAccumulatorBaseValuesForm,
				"relationshipCode"
			);
			this.claimBenefitAccumService
				.updateClaimBenefitAccum(claimBenefitAccum, seqAccumId)
				.subscribe(
					(response) => {
						this.toastService.showToast('Record successfully updated', NgbToastType.Success);
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
		if (this.editClaimBenefitAccum) {
			this.updateClaimBenefitAccum(this.claimBenefitAccum.seqAccumId);
		} else {
			this.createClaimBenefitAccum();
		}
	}
	deleteClaimBenefitAccum(seqAccumId: number) {
		this.claimBenefitAccumService.deleteClaimBenefitAccum(seqAccumId).subscribe(
			(response) => {
				this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
			}
		);
	}
	getClaimBenefitAccum(seqAccumId: number) {
		this.claimBenefitAccumService.getClaimBenefitAccum(seqAccumId).subscribe(
			(claimBenefitAccum) => {
				this.claimBenefitAccum = claimBenefitAccum;
				this.benefitAccumulatorBaseValuesForm.patchValue({
					groupId: this.claimBenefitAccum.seqGroupId,
					relationshipCode: this.claimBenefitAccum.relationshipCode,
				}, { emitEvent: false });
			}
		);
	}

	dataGrid001GridOptionsExportCsv() {
		var params = {};
		this.dataGrid001gridApi.exportDataAsCsv(params);
	}

	createDataGrid001(): void {
		this.dataGrid001GridOptions = {
			paginationPageSize: 50,
		};
		this.dataGrid001GridOptions.editType = "fullRow";
		this.dataGrid001GridOptions.columnDefs = [
			{
				headerName: "Rule ID",
				field: "benefitRule",
				width: 200,
				headerCheckboxSelection: false,
				headerCheckboxSelectionFilteredOnly: false,
				checkboxSelection: false,
			},
			{
				headerName: "Description/Rule Limit",
				field: "shortDescription",
				width: 200,
			},
			{
				headerName: "Type",
				field: "ruleType",
				width: 200,
			},
			{
				headerName: "Start Date",
				field: "startDate",
				width: 200,
			},
			{
				headerName: "End Date",
				field: "endDate",
				width: 200,
			},
			{
				headerName: "Mbr/Fam",
				field: "attributeChar4",
				width: 200,
			},
			{
				headerName: "Claim Type",
				field: "attributeChar2",
				width: 200,
			},
			{
				headerName: "All Groups",
				field: "attributeChar3",
				width: 200,
			},
			{
				headerName: "Time Frame",
				field: "attributeChar14",
				width: 200,
			},
			{
				headerName: "Carryover",
				field: "attributeChar1",
				width: 200,
			},
			{
				headerName: "Reason Code",
				field: "attributeChar13",
				width: 200,
			},
		];
		this.getCompareDates();
		this.getUserDefined();
	}

	// Use a FormBuilder to create a FormGroup to define the Form Model for the view
	// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
	createForm() {
		// FormBuilder.group is a factory method that creates a FormGroup
		// FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
		this.benefitAccumulatorBaseValuesForm = this.formBuilder.group(
			{
				subscriberId: ["", { updateOn: "blur", validators: [] }],
				personNo: ["", { updateOn: "blur", validators: [] }],
				dynamicText001: ["", { updateOn: "blur", validators: [] }],
				effectiveDate: ["", { updateOn: "blur", validators: [] }],
				termDate: ["", { updateOn: "blur", validators: [] }],
				eligStatus: ["", { updateOn: "blur", validators: [] }],
				groupId: ["", { updateOn: "blur", validators: [] }],
				seqGroupId: ["", { updateOn: "blur", validators: [] }],
				dynamicText002: ["", { updateOn: "blur", validators: [] }],
				planCode: ["", { updateOn: "blur", validators: [] }],
				benefitPkgId: ["", { updateOn: "blur", validators: [] }],
				dynamicText003: ["", { updateOn: "blur", validators: [] }],
				relationshipCode: ["", { updateOn: "blur", validators: [] }],
				riders: ["", { updateOn: "blur", validators: [] }],
			},
			{ updateOn: "submit" }
		);
	}

	resolved(captchaResponse: string) {
		console.log(`Resolved captcha with response: ${captchaResponse}`);
	}

	claimReports() {
		let ref = this.modalService.open(AccumClaimsReportComponent);
	}

	selectMember() {
		let ref = this.modalService.open(SelectMemberComponent);
		ref.componentInstance.showIcon = true;
		ref.componentInstance.membMaster = this.memberMaster;
		ref.componentInstance.memberEligHistory = this.memberEligHistory;
		ref.componentInstance.groupId = this.groupId;
		ref.componentInstance.benefitPackageId = (this.premiumMasters && this.premiumMasters.length > 0) ? this.premiumMasters[0].benefitPackageId : null;
		ref.componentInstance.relationshipCode = this.relationshipCode;
		ref.componentInstance.onRowSelected.subscribe(
			(memberMaster: MemberMaster) => {
				this.memberMaster = memberMaster;
				this.seqSourceId = memberMaster.seqMembId;
				this.isResetForm = true;
				setTimeout(() => {
					this.dataGrid001GridOptions.api.setRowData([]);
					this.dataGrid001GridOptions.api.showLoadingOverlay();
					this.getMemberEligBySubscriberIdAndPersonNo(memberMaster);
				}, 900);
			}
		);
	}

	getMemberEligBySubscriberIdAndPersonNo(memberMaster: MemberMaster) {
		this.memberEligHistoryService
			.getMember_bavc(memberMaster.seqEligHist)
			.subscribe(
				(memberEligHistory) => {
					if (memberEligHistory != null) {
						this.memberEligHistoryss = memberEligHistory;
						// this.getGroupDetialByGroupId(memberEligHistory[0].group_id);
						this.getPremiumMasterBySeqGroupIdAndPlanRiderCode(
							memberEligHistory[0].seq_group_id,
							memberEligHistory[0].plan_code
						);
						memberEligHistory[0].riderCode =
							memberEligHistory[0].riderCode1 +
							" " +
							memberEligHistory[0].riderCode2 +
							" " +
							memberEligHistory[0].riderCode3 +
							" " +
							memberEligHistory[0].riderCode4 +
							" " +
							memberEligHistory[0].riderCode5 +
							" " +
							memberEligHistory[0].riderCode6 +
							" " +
							memberEligHistory[0].riderCode7 +
							" " +
							memberEligHistory[0].riderCode8 +
							" " +
							memberEligHistory[0].riderCode9 +
							" " +
							memberEligHistory[0].riderCode10 +
							" " +
							memberEligHistory[0].riderCode11 +
							" " +
							memberEligHistory[0].riderCode12 +
							" " +
							memberEligHistory[0].riderCode13 +
							" " +
							memberEligHistory[0].riderCode14 +
							" " +
							memberEligHistory[0].riderCode15 +
							" " +
							memberEligHistory[0].riderCode16 +
							" " +
							memberEligHistory[0].riderCode17 +
							" " +
							memberEligHistory[0].riderCode18 +
							" " +
							memberEligHistory[0].riderCode19 +
							" " +
							memberEligHistory[0].riderCode20;
						memberEligHistory[0].riderCode = memberEligHistory[0].riderCode
							.split("null")
							.join("");
						this.benefitAccumulatorBaseValuesForm.patchValue({
							subscriberId: memberEligHistory[0].subscriber_id,
							personNo: memberEligHistory[0].person_number,
							effectiveDate: this.datePipe.transform(
								memberEligHistory[0].effective_date,
								"MM/dd/yyyy"
							),
							termDate: this.datePipe.transform(
								memberEligHistory[0].term_date,
								"MM/dd/yyyy"
							),
							eligStatus: memberEligHistory[0].elig_status,
							groupId: memberEligHistory[0].group_id,
							seqGroupId: memberEligHistory[0].seq_group_id,
							planCode: memberEligHistory[0].plan_code,
							relationshipCode: this.getRelationshipCode(memberEligHistory[0].relationship_code),
							benefitPackageId: memberEligHistory[0].benefit_package_id,
							riders: memberEligHistory[0].riderCode,
							dynamicText003: memberEligHistory[0].short_description,
							dynamicText002: memberEligHistory[0].short_name,
							dynamicText001: memberEligHistory[0].last_name + ', ' + memberEligHistory[0].first_name,
						}, { emitEvent: false });
					} else {
						this.alertMessage = this.alertMessageService.error("No   record.");
					}
				}
			);
	}

	getBenefitRuleID(benefitPackageId: any) {
		this.BenefitRuleService.getRules(benefitPackageId).subscribe((data) => {
			this.rules = data;
			var Options: any = [];
			this.rules.forEach(function (index: any) {
				Options.push({
					key:
						index.benefitRule +
						"        " +
						index.ruleType +
						"         " +
						index.shortDescription +
						"    " +
						index.parProvReq +
						"    " +
						index.parOperator +
						"  " +
						index.authReq +
						"  " +
						index.authOperator +
						"   " +
						index.riderReqFilter +
						"  " +
						index.riderOperator,
					value: index.benefitRule,
				});
			});
			this.BenefitAccVBFormConfig[0].options = Options;
			this.popupClose = false;
			this.valueChanged = false;
		});
	}

	getCompareDates() {
		var Options: any = [];
		Options.push({ key: "C - Compare", value: "C" });
		Options.push({ key: "I - Ignore", value: "I" });
		this.BenefitAccVBFormConfig[4].options = Options;
		this.popupClose = false;
		this.valueChanged = false;
	}

	getUserDefined() {
		this.benefitPackageMasterService.getUserDefined().subscribe(data => {
			var Options: any = [];
			data.forEach((elem) => {
				Options.push({ key: elem[0] + ' - ' + elem[1], value: elem[0] });
			});
			this.BenefitAccVBFormConfig[5].options = Options;
			this.popupClose = false;
			this.valueChanged = false;
		});

	}

	getSeedRsn() {
		this.UserDefinedValidateCodeService.getUserDefinedValidateCode(
			"claim_benefit_accum",
			"user_defined_1"
		).subscribe((data) => {
			this.seedRsn = data;
			var Options: any = [];
			this.seedRsn.forEach(function (index: any) {
				Options.push({
					key:
						index.userValidCode +
						"       " +
						index.userValidCodeShortDesc +
						"        " +
						index.userValidCodeLongDesc,
					value: index.userValidCode,
				});
			});
			this.BenefitAccVBFormConfig[5].options = Options;
		});
	}

	getGroupDetialByGroupId(groupId: any) {
		this.groupMasterService.getGroupMaster(groupId).subscribe(
			(groupMaster) => {
				this.groupId = groupMaster.groupId;
				this.shortNameGroupName = groupMaster.shortName;
			}
		);
	}

	getPremiumMasterBySeqGroupIdAndPlanRiderCode(seqGroupId: any, planRiderCode: any) {
		this.premiumMasterService.findBySeqGroupIdAndPlanRiderCode(seqGroupId, planRiderCode).subscribe((premiumMaster) => {
			this.premiumMasters = premiumMaster;
			if (this.premiumMasters && this.premiumMasters.length > 0) {
				this.getBenefitPackageMasterByPackageId(
					btoa(this.premiumMasters[0].benefitPackageId)
				);
			} else {
				this.dataGrid001GridOptions.api.setRowData([]);
			}
		});
	}

	getBenefitPackageMasterByPackageId(packageId: any) {
		this.benefitPackageMasterService.getBenefitPackageMaster(packageId).subscribe((benefitPackageMaster) => {
			this.benefitPackageMaster = new BenefitPackageMaster();
			this.benefitPackageMaster = benefitPackageMaster;
			this.getBenefitRuleID(btoa(this.benefitPackageMaster.benefitPackageId));
			this.getCompareDates();
			this.getUserDefined();
			this.getBenefitPackageDetailByPackageId(
				btoa(this.benefitPackageMaster.benefitPackageId)
			);
		});
	}

	getRelationCodeDetailByCode() {
		this.dddwDtlService
			.findByColumnNameAndDwname("crelationship_code", "dw_accum_sel_mbr_elig")
			.subscribe(
				(dddwDtls) => {
					this.dddwDtls = dddwDtls;
				}
			);
	}

	getRelationshipCode(relationshipCode: any) {
		if (this.dddwDtls.length > 0) {
			for (let i = 0; i < this.dddwDtls.length; i++) {
				if (relationshipCode === this.dddwDtls[i].dddwDtlPrimaryKey.dataVal) {
					return this.dddwDtls[i].dddwDtlPrimaryKey.displayVal;
				}
			}
		}
	}

	getBenefitPackageDetailByPackageId(benefitPackageId: any) {
		this.benefitPackageDetailService
			.getBenefitPackage_babv(atob(benefitPackageId))
			.subscribe(
				(benefitPackageDetails) => {
					this.benefitPackageDetails = [];
					this.benefitPackageDetailsCustom = benefitPackageDetails;
					this.dataGrid001GridOptions.api.setRowData(
						this.benefitPackageDetailsCustom
					);
					if (this.benefitPackageDetailsCustom.length > 0) {
						for (let i = 0; i < this.benefitPackageDetailsCustom.length; i++) {
							this.benefitPackageDetailsCustom[
								i
							].ruletypeCode = this.benefitPackageDetailsCustom[i].ruleType;
							this.getRuleLimit(
								i,
								this.benefitPackageDetailsCustom[i].attributeChar5,
								this.benefitPackageDetailsCustom[i].ruleType,
								this.benefitPackageDetailsCustom[i].attributeNum4,
								this.benefitPackageDetailsCustom[i].attributeNum3,
								this.benefitPackageDetailsCustom[i].attributeNum2,
								this.benefitPackageDetailsCustom[i].attributeNum1
							);

							this.getRuleTypeByRule(
								this.benefitPackageDetailsCustom[i].ruleType,
								i
							);
							this.getBenefitMbrByColumn(
								this.benefitPackageDetailsCustom[i].attributeChar4,
								i
							);
							// this.getCarryOver(i,this.benefitPackageDetailsCustom[i].attributeChar1)
							(this.benefitPackageDetailsCustom[
								i
							].startDate = this.datePipe.transform(
								this.benefitPackageDetailsCustom[i].startDate,
								"MM/dd/yyyy"
							)),
								(this.benefitPackageDetailsCustom[
									i
								].endDate = this.datePipe.transform(
									this.benefitPackageDetailsCustom[i].endDate,
									"MM/dd/yyyy"
								)),
								this.getBenefitTimeFrameByColumn(
									this.benefitPackageDetailsCustom[i].attributeChar14,
									i
								);
							this.getBenefitCarryByColumn(
								this.benefitPackageDetailsCustom[i].attributeChar1,
								i
							);
							this.getBenefitClaimTypeByColumn(
								this.benefitPackageDetailsCustom[i].attributeChar2,
								i
							);
							this.getBenefitAllGroupsByColumn(
								this.benefitPackageDetailsCustom[i].attributeChar3,
								i
							);
						}
						this.dataGrid001GridOptions.api.setRowData(
							this.benefitPackageDetailsCustom
						);
					}
					// this.getSeedRsn();
					this.getBenefitAccumGrid(
						this.memberMaster.seqMembId,
						atob(benefitPackageId),
						this.memberEligHistoryss[0].seq_group_id
					);

					// this.getAccumulatoreBase(benefitPackageId);
				}
			);
	}
	getRuleLimit(
		i: any,
		limit: any,
		type: any,
		ldec_num_4: any,
		ldec_num_3: any,
		ldec_num_2: any,
		ldec_num_1: any
	) {
		var ldec_limit = "0";
		if (type == "00") {
			// coinsurance
			ldec_limit = ldec_num_4;
		} else if (type == "10") {
			ldec_limit = ldec_num_2;
		} else if (type != "30") {
			ldec_limit = ldec_num_1;
		} else if (ldec_num_1 != null && ldec_num_1 != 0) {
			ldec_limit = ldec_num_1;
		} else {
			ldec_limit = ldec_num_2;
		}

		//
		if (ldec_limit == null || ldec_limit == "0") {
			this.benefitPackageDetailsCustom[i].ruleLimit = "No Limit";
			this.benefitPackageDetailsCustom[i].ruleLimit = null;
		} else {
			if (type == "20" && limit == "Q") {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					String(ldec_limit) + " (qty)";
			} else if (type == "20" && limit == "D") {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					String(ldec_limit) + " (days)";
			} else if ((type = "20" && limit == "A")) {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					"$" + String(ldec_limit) + "(alwd)";
			} else if ((type = "20" && limit == "B")) {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					"$" + String(ldec_limit) + "(bld)";
			} else if ((type = "20" && limit == "N")) {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					"$" + String(ldec_limit) + "(net)";
			} else if (type == "20" && limit == "W") {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					String(ldec_limit) + " (val)";
			} else if (type == "80" && limit == "Q") {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					String(ldec_limit) + " (qty)";
			} else if (type == "80" && limit == "D") {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					String(ldec_limit) + " (days)";
			} else {
				this.benefitPackageDetailsCustom[i].ruleLimit =
					"$" + String(ldec_limit); // dollars
			}
			this.benefitPackageDetailsCustom[i].limitWithoutSign = ldec_limit;
		}
	}

	validateDatesSelection(value: any) {
		if (value == null || value == "") {
			return;
		}
		var ldtt_detail_date = new Date(value);
		//if((ldtt_detail_date <this.memberEligHistoryss[0].effective_date) || 	(ldtt_detail_date > this.memberEligHistoryss[0].term_date &&  not IsNull(ldtt_term_date)
	}
	getBenefitAccumGrid(
		seq_memb_id: any,
		benefit_package_id: any,
		seq_group_id: any
	) {
		this.isResetForm = true;
		this.benefitState = new Array<FormRow>();
		this.claimBenefitAccumService
			.getBenefitClaim(seq_memb_id, benefit_package_id, seq_group_id)
			.subscribe((data) => {
				this.isResetForm = false;
				this.claimBenefitAccums = data;
				this.checkCompareDates();
				this.inProgress = false;
				this.selectedClaimBenefitAccum = this.claimBenefitAccums[0];
			});
	}

	getBenefitRuleTypes() {
		this.dddwDtlService
			.findByColumnNameAndDwname("benefit_rule_rule_type", "dw_accum_dsp_benef")
			.subscribe(
				(dddwDtls) => {
					this.dddwDtls1 = [];
					this.dddwDtls1 = dddwDtls;
				}
			);
	}

	getBenefitTimeFrameByColumn(timeFrame: any, k: any) {
		if (this.timeFrame.length > 0) {
			for (let i = 0; i < this.timeFrame.length; i++) {
				if (timeFrame === this.timeFrame[i].dddwDtlPrimaryKey.dataVal) {
					this.benefitPackageDetailsCustom[k].attributeChar14 = this.timeFrame[
						i
					].dddwDtlPrimaryKey.displayVal;
				}
			}
		}
	}

	getBenefitMbrByColumn(mbr: any, k: any) {
		if (this.MbrFbr.length > 0) {
			for (let i = 0; i < this.MbrFbr.length; i++) {
				if (mbr === this.MbrFbr[i].dddwDtlPrimaryKey.dataVal) {
					this.benefitPackageDetailsCustom[k].attributeChar4 = this.MbrFbr[
						i
					].dddwDtlPrimaryKey.displayVal;
				}
			}
		}
	}
	getBenefitCarryByColumn(carry: any, k: any) {
		if (this.Carryover.length > 0) {
			for (let i = 0; i < this.Carryover.length; i++) {
				if (carry === this.Carryover[i].dddwDtlPrimaryKey.dataVal) {
					this.benefitPackageDetailsCustom[k].attributeChar1 = this.Carryover[
						i
					].dddwDtlPrimaryKey.displayVal;
				} else if (carry == "N") {
					this.benefitPackageDetailsCustom[k].attributeChar1 = "None";
				}
			}
		}
	}
	getBenefitClaimTypeByColumn(CLaimType: any, k: any) {
		if (this.CLaimType.length > 0) {
			for (let i = 0; i < this.CLaimType.length; i++) {
				if (CLaimType === this.CLaimType[i].dddwDtlPrimaryKey.dataVal) {
					this.benefitPackageDetailsCustom[k].attributeChar2 = this.CLaimType[
						i
					].dddwDtlPrimaryKey.displayVal;
				}
			}
		}
	}

	getBenefitAllGroupsByColumn(AllGroups: any, k: any) {
		if (this.AllGroups.length > 0) {
			for (let i = 0; i < this.AllGroups.length; i++) {
				if (AllGroups === this.AllGroups[i].dddwDtlPrimaryKey.dataVal) {
					this.benefitPackageDetailsCustom[k].attributeChar3 = this.AllGroups[
						i
					].dddwDtlPrimaryKey.displayVal;
				}
			}
		}
	}

	getBenefitClaimType() {
		this.dddwDtlService
			.findByColumnNameAndDwname(
				"benefit_rule_attribute_char_2",
				"dw_accum_dsp_benef"
			)
			.subscribe(
				(dddwDtls) => {
					this.CLaimType = [];
					this.CLaimType = dddwDtls;
				}
			);
	}

	getBenefitAllGroups() {
		this.dddwDtlService
			.findByColumnNameAndDwname(
				"benefit_rule_attribute_char_3",
				"dw_accum_dsp_benef"
			)
			.subscribe(
				(dddwDtls) => {
					this.AllGroups = [];
					this.AllGroups = dddwDtls;
				}
			);
	}

	getBenefitCarryOver() {
		this.dddwDtlService
			.findByColumnNameAndDwname(
				"benefit_rule_attribute_char_1",
				"dw_accum_dsp_benef"
			)
			.subscribe(
				(dddwDtls) => {
					this.Carryover = [];
					this.Carryover = dddwDtls;
				}
			);
	}
	getBenefitTimeFrame() {
		this.dddwDtlService
			.findByColumnNameAndDwname(
				"benefit_rule_attribute_char_14",
				"dw_accum_dsp_benef"
			)
			.subscribe(
				(dddwDtls) => {
					this.timeFrame = [];
					this.timeFrame = dddwDtls;
				}
			);
	}

	getBenefitMBr() {
		this.dddwDtlService
			.findByColumnNameAndDwname(
				"benefit_rule_attribute_char_4",
				"dw_accum_dsp_benef"
			)
			.subscribe(
				(dddwDtls) => {
					this.MbrFbr = [];

					this.MbrFbr = dddwDtls;
				}
			);
	}

	getRuleTypeByRule(ruleType: any, k: any) {
		if (this.dddwDtls1.length > 0) {
			for (let i = 0; i < this.dddwDtls1.length; i++) {
				if (ruleType === this.dddwDtls1[i].dddwDtlPrimaryKey.dataVal) {
					this.benefitPackageDetailsCustom[k].ruleType = this.dddwDtls1[
						i
					].dddwDtlPrimaryKey.displayVal;
				}
			}
		}
	}

	disableOREnable(row: any) {
		if (
			(row.ruleType == "20" || row.ruleType == "80") &&
			row.attributeChar5 == "D"
		) {
			this.compareDates = false;
			return false;
		} else {
			this.compareDates = true;
			return true;
		}
	}

	precise_round(num: any, decimals: any) {
		var t = Math.pow(10, decimals);
		return (Math.round((num * t) + (decimals>0?1:0)*(Math.sign(num) * (10 / Math.pow(100, decimals)))) / t).toFixed(decimals);
	}

	populateDynamicForm(accBv: ClaimBenefitAccum[] = []) {
		this.rowCount = 0;
		accBv.forEach((benefit) => {
			this.rowCount += 1;
			let mockConfig = JSON.parse(JSON.stringify(this.BenefitAccVBFormConfig)); // make a copy of original config
			this.BenefitAccVBFormConfig.forEach((field, index) => {
				if (field.name === BenefitAccVBFieldNames.RULE_ID) {
					mockConfig[index].value = benefit.ruleId;
				} else if (field.name === BenefitAccVBFieldNames.DETAIL_DATE) {
					mockConfig[index].value = this.datePipe.transform(
						new Date(benefit.detailSvcDate),
						"yyyy-MM-dd"
					);
				} else if (field.name === BenefitAccVBFieldNames.BASE_AMT) {
					let val = benefit.claimAmt + '';
					if (benefit.claimAmt) {
						let parts = this.precise_round(benefit.claimAmt, 2).toString().split(".");
						val = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
					}
					mockConfig[index].value = val == "undefined" ? "" : ('$' + val);
				} else if (field.name === BenefitAccVBFieldNames.BASE_QTY) {
					mockConfig[index].value = benefit.claimQty ? benefit.claimQty + '.0' : benefit.claimQty;
				} else if (field.name === BenefitAccVBFieldNames.COMPARE_DATES) {
					mockConfig[index].value = benefit.compareDates;
					if (this.disableOREnable(benefit)) {
						mockConfig[index].disabled = true;
					} else {
						mockConfig[index].disabled = false;
					}
				} else if (field.name === BenefitAccVBFieldNames.USER_DEF_1) {
					mockConfig[index].value = benefit.userDefined1;
				}
			});

			let formState: FormRow = new FormRow();
			formState.formFields = mockConfig;
			this.benefitState.push(formState); // add record
		});
		this.benefitState = JSON.parse(JSON.stringify(this.benefitState));
	}

	onChangeFields(event: any) {
		this.popupClose = true;
		this.valueChanged = true;
		let record = event.data;
		var dataIndex = 0;
		const pair = Object.keys(record).map((k) => ({
			key: k,
			value: record[k],
		}));
		let index: any;
		this.benefitPackageDetailsCustom.find(function (item, i) {
			if (item.benefitRule === pair[0].value) {
				index = i;
			}
		});

		if (event.field.name === 'compareDates') {
			event.field.disabled = false;
		}

		if (event.field.name === 'ruleId') {
			let compareDatesEnableOrDisabled: string = "#compareDates" + event.index + "select";
			const element = this.dynamicform.nativeElement.querySelector(compareDatesEnableOrDisabled);
			if ((this.benefitPackageDetailsCustom[index].ruletypeCode == "20" || this.benefitPackageDetailsCustom[index].ruletypeCode == "80") && this.benefitPackageDetailsCustom[index].attributeChar5 == "D") {
				element.removeAttribute('disabled');
			} else {
				element.setAttribute('disabled', true);
			}
			if (this.benefitPackageDetailsCustom[index].attributeNum1 == null && this.benefitPackageDetailsCustom[index].attributeNum2 == null) {
				this.showPopUpD(
					"Benefit Accumulator Base Values",
					"14055 This benefit rule does not have a limit."
				);
				this.noRuleIdError = true;
				return;
			} else {
				this.noRuleIdError = false;
			}
		}

		//Claim amt
		if (event.field.name === 'baseAmt') {
			if (pair[2].value != this.benefitState[dataIndex]["formFields"][2].value) {
				var ls_rule_type = this.benefitPackageDetailsCustom[index].ruletypeCode;
				var ls_limit_type = this.benefitPackageDetailsCustom[index]
					.attributeChar5;
				if (
					ls_rule_type == "20" &&
					(ls_limit_type == "Q" || ls_limit_type == "W")
				) {
					this.showPopUpD(
						"Benefit Accumulator Base Values",
						"14057 This Rule is based on Quantity.  You do not need to enter an Amount"
					);
					return;
				} else if (ls_rule_type == "20" && ls_limit_type == "D") {
					this.showPopUpD(
						"Benefit Accumulator Base Values",
						"14058 This Rule is based on Days.  You do not need to enter an Amount or Quantity."
					);
					return;
				} else if (
					ls_rule_type == "00" &&
					this.benefitPackageDetailsCustom[index].attributeNum4 == null &&
					this.benefitPackageDetailsCustom[index].attributeNum3 != null
				) {
					this.showPopUpD(
						"Benefit Accumulator Base Values",
						"14057 This Rule is based on Quantity.  You do not need to enter an Amount"
					);
					return;
				}

				if (
					this.benefitPackageDetailsCustom[index].limitWithoutSign < pair[2].value
				) {
					this.showPopUpD(
						"Benefit Accumulator Base Values",
						"14060 Claim amount exceeds the rule limit"
					);
					return;
				}
			}
		}


		//Claim qty
		if (event.field.name === 'baseQty') {
			if (pair[3].value != this.benefitState[dataIndex]["formFields"][3].value) {
				var ls_rule_type = this.benefitPackageDetailsCustom[index].ruletypeCode;
				var ls_limit_type = this.benefitPackageDetailsCustom[index]
					.attributeChar5;
				if (
					ls_rule_type == "20" &&
					(ls_limit_type == "Q" || ls_limit_type == "W")
				) {
				} else if (ls_rule_type == "20" && ls_limit_type == "D") {
					this.showPopUpD(
						"14061",
						"This Rule is based on Days.  You do not need to enter Amount or Quantity."
					);
					return;
				} else if (
					ls_rule_type == "00" &&
					this.benefitPackageDetailsCustom[index].attributeNum3 != null
				) {
				} else {
					this.showPopUpD(
						"14062",
						"This Rule is based on Amount.  You do not need to enter Quantity."
					);
					return;
				}
			}
		}

		if (event.field.name === 'detailDate') {
			if (pair[1].value) {
				var ldtt_detail_date;

				if (pair[1].value.singleDate.formatted) {
					ldtt_detail_date = pair[1].value.singleDate.formatted;
					ldtt_detail_date = this.datePipe.transform(
						new Date(ldtt_detail_date),
						"yyyy-MM-dd"
					);
				} else {
					const effd = pair[1].value;
					const newDate =
						effd.singleDate.date.month +
						"/" +
						effd.singleDate.date.day +
						"/" +
						effd.singleDate.date.year;
					ldtt_detail_date = this.datePipe.transform(
						new Date(newDate),
						"yyyy-MM-dd"
					);
				}
				if (ldtt_detail_date != null) {
					var ldtt_eff_date = this.datePipe.transform(
						new Date(this.memberEligHistoryss[0].effective_date),
						"yyyy-MM-dd"
					);
					var ldtt_term_date = this.memberEligHistoryss[0].term_date;
					if (ldtt_term_date) {
						ldtt_term_date = this.datePipe.transform(
							new Date(this.memberEligHistoryss[0].term_date),
							"yyyy-MM-dd"
						);
					}

					if (
						ldtt_detail_date < ldtt_eff_date ||
						(ldtt_detail_date > ldtt_term_date && ldtt_term_date != null)
					) {
						var msg =
							"Detail date must be within the member's eligibility period.";
						this.showPopUpD("Benefit Accumulator Base Values", msg);
						this.noDateError = false;
						return;
					} else {
						this.noDateError = true;
					}
				}
			}
		}
	}

	onSelectedRow(event: any) {
		this.benefitAccumSelectedRowIndex = event.index;
		this.selectedClaimBenefitAccum = this.claimBenefitAccums[event.index];
	}

	onRuleId(event: any) {
		let record = event;
		const pair = Object.keys(record).map((k) => ({
			key: k,
			value: record[k],
		}));
	}
	showPopUpD(title: any, message: any) {
		let popMsg = new PopUpMessage("poUpMessageName", title, message, "icon");
		popMsg.buttons = [new PopUpMessageButton("ok", "Ok", "btn btn-primary")];
		let ref = this.modalService.open(PopUpMessageComponent, { size: "lg" });
		ref.componentInstance.showIcon = true;
		ref.componentInstance.popupMessage = popMsg;
		ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
			this.popUpButtonClicked(event);
		});
	}

	private popUpButtonClicked(button: PopUpMessageButton) {
		if (button.name == "yes") {
			console.log("yes");
		}
		if (button.name == "no") {
		}
	}

	saveBenefitAccBV(event: any) {
		if(event == "") {
			this.saveForm = true;
		}
		if (event) {
			let accBvs = new Array<ClaimBenefitAccum>();
			const updatedRecords: FormRow[] = this.benefitState.filter(
				(record) => record.action
			);
			if (updatedRecords.length > 0) {
				this.benefitState.forEach((preStateRecord: FormRow, index) => {
					if (preStateRecord.action) {
						let updatedRecord = event[index];
						const pair = Object.keys(updatedRecord).map((k) => ({
							key: k,
							value: updatedRecord[k],
						}));
						let selectedClaimBenefitAccum = this.claimBenefitAccums.find(cba => cba.ruleId == pair[0].value);
						let accbv: ClaimBenefitAccum = this.populateBenefitAccumulatorField(
							pair,
							FORM_FIELD_ACTION_TYPES.UPDATE
						);
						Object.assign(selectedClaimBenefitAccum, accbv);
						selectedClaimBenefitAccum.claimAmt = selectedClaimBenefitAccum.claimAmt ?
							parseFloat(selectedClaimBenefitAccum.claimAmt.toString()
								.replace(/\$|,/g, '')) : 0;
						selectedClaimBenefitAccum.claimQty = selectedClaimBenefitAccum.claimQty ?
							parseInt(selectedClaimBenefitAccum.claimQty.toString()) : 0;
						this.auditService.setAuditFields(selectedClaimBenefitAccum, sessionStorage.getItem('user'),
							this.windowId, OPERATIONS.UPDATE);
						accBvs.push(selectedClaimBenefitAccum);
					}
				});
			}

			const newRecords = event.slice(this.benefitState.length);
			newRecords.forEach((record: any, index: any) => {
				const pair = Object.keys(record).map((k) => ({
					key: k,
					value: record[k],
				}));
				var accbv = this.populateBenefitAccumulatorField(
					pair,
					FORM_FIELD_ACTION_TYPES.ADD
				);
				accbv.claimAmt = accbv.claimAmt ? parseFloat(accbv.claimAmt.toString()
					.replace(/\$|,/g, '')) : 0;
				accbv.seqAccumId = newRecords[index].seqAccumId;
				accbv.seqMembId = this.memberMaster.seqMembId;
								accbv.seqSubsId = this.memberMaster.seqMembId;

				accbv.seqGroupId = Form.getValue(this.benefitAccumulatorBaseValuesForm, "seqGroupId");
				accbv.benefitPackageId = Form.getValue(this.benefitAccumulatorBaseValuesForm, "benefitPkgId");
				this.auditService.setAuditFields(accbv, sessionStorage.getItem('user'), this.windowId, OPERATIONS.ADD);
				accBvs.push(accbv);
			});

			if(accBvs.length !== 0 && !this.claimUpdateInProgress) {
				this.claimUpdateInProgress = true;
				this.claimBenefitAccumService.addUpdateContact(accBvs).subscribe(
				(resp) => {
					this.toastService.showToast(
						"Record updated Successfully",
						NgbToastType.Success
					);
					if (this.closeStatus === true) {
						setTimeout(() => {
							this.activeModal.close()
						}, 3000)
					}
					this.saveForm = false;
					this.popupClose = false;
					this.isResetForm = true;
					setTimeout(() => {
						this.dataGrid001GridOptions.api.setRowData([]);
						this.dataGrid001GridOptions.api.showLoadingOverlay();
						this.getMemberEligBySubscriberIdAndPersonNo(this.memberMaster);
						this.claimUpdateInProgress = false;
					}, 900);
				},
				(message) => {
					if (
						message.includes(
							"ContactSourcecom.diamond.member.entities.MemberContactPrimary"
						)
					) {
						// this.showPopUp("Contact Source Already Exits","Contact Source ");
					} else {
						this.toastService.showToast(message, NgbToastType.Danger);
					}
					this.claimUpdateInProgress = false;
				});
			}
		}
	}

	populateBenefitAccumulatorField(event: any, action: FORM_FIELD_ACTION_TYPES) {
		let accbv = new ClaimBenefitAccum();
		accbv.ruleId = event[0].value;
		accbv.detailSvcDate = this.getDatePickValue(event[1].value);
		accbv.claimAmt = event[2].value;
		accbv.claimQty = event[3].value;
		accbv.seqSubsId = this.memberMaster.seqMembId;
		if (event.length == 6) {
			accbv.compareDates = event[4] ? event[4].value : null;
			accbv.userDefined1 = event[5] ? event[5].value : null;
		} else {
			accbv.userDefined1 = accbv.userDefined1 = event[4] ? event[4].value : null;
		}
		accbv.action = action;
		return accbv;
	}

	getDatePickValue(field: any) {
		const date = (field && field.singleDate && field.singleDate.date) ? field.singleDate.date : null;
		if (date) {
			return `${date.year}-${date.month}-${date.day}`;
		} else {
			return "";
		}
	}

	checkCompareDates() {
		if (this.disableOREnable(this.claimBenefitAccums)) {
			this.BenefitAccVBFormConfig[4].disabled = true;
			this.populateDynamicForm(this.claimBenefitAccums);
		} else {
			this.BenefitAccVBFormConfig[4].disabled = false;
			this.populateDynamicForm(this.claimBenefitAccums);
		}
	}

	/**
	 * Handle Menu Actions
	 * @param event: {action: string, menu: MenuItem}
	 */
	public onMenuItemClick(event: any) {
		if (event.menu.menuItem === "File") {
			// handle File actions
			switch (event.action) {
				case "New": {
					this.isAddNewRow = true;
					setTimeout(() => {
						this.isAddNewRow = false;
					}, 200);
					//statements;
					break;
				}
				case "Open": {
					this.selectMember();
					//statements;
					break;
				}
				case "Save": {
					this.saveForm = true;
					break;
				}
				case "Close": {
					this.modalClose();
					break;
				}
				case 'Exit': {
					this.exitScreen();
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
		} else if (event.menu.menuItem === "Special") {
			// handle File actions
			switch (event.action) {
				case "Claims Report..": {
					this.claimReports();
					break;
				}
				default: {
					this.toastService.showToast(
						"Action is in progress",
						NgbToastType.Danger
					);
					break;
				}
			}
		} else if (event.menu.menuItem === "Window") {
			switch (event.action) {
				case "1 Main Menu": {
					this.router.navigate(["diamond/functional-groups"]);
					break;
				}
                case 'Show Timestamp':
                    if (this.benefitAccumulatorBaseValuesForm.get('subscriberId').value) {
                        this.showTimeStamp();
                    } else {
                        this.messageService.findByMessageId(21127).subscribe(res => {
                            this.showPopUp('21127: ' + res[0].messageText.replace('@1', 'Record Timestamp'), 'Record Timestamp')
                        })
                    }
                    break;
				case 'Audit Display':
					this.toastService.showToast('Action was not implemented', NgbToastType.Danger);
					break;
                default : {
                    break;
                }
			}
		} else if (event.menu.menuItem === 'Notes') {
            this.handleNotesMenu(event.action);
		} else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }

		else {
			// handle Edit-Menu Actions
			this.toastService.showToast("Action is in progress", NgbToastType.Danger);
		}
	}

	menuInit() {
		this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M'},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S'},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit'}]
            },
			{
				menuItem: "Special",
				dropdownItems: [{ name: "Claims Report.." }],
			},
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4'}
                ]
            },
			{
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
					{ name: "1 Main Menu" },
					{ name: "2 Benefit Accumulator Base Values" },
				],
			},
			{
				menuItem: "Help",
				dropdownItems: [
					{ name: "Contents" },
					{ name: "Search for Help on..." },
					{ name: "This Window", shortcutKey: 'F1' },
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

	getRelationShipCodes() {
		this.dddwDtlService.findByColumnNameAndDwname('crelationship_code', 'dw_accum_dsp_mbr').subscribe(data => {
			this.relationCodes = data;
		});
	}

	modalClose = () => {
		this.closeStatus = true;
		if (this.valueChanged === true && this.popupClose === true) {
			this.popupAlert();
		} else {
			this.activeModal.close();
		}
	};
	
	handleNotesMenu(action: string) {
        switch (action) {
            case 'Notes': {
                if (this.memberMaster.seqMembId) {
                    this.popUpNotesMenuClicked();
                } else {
                    this.messageService.findByMessageId(29005).subscribe((message: MessageMasterDtl[]) => {
						this.showPopUpD(
							"Benefit Accumulator Base Values",
							"29005: You must select a record before entering notes."
						);
                    });
                }
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

	popUpNotesMenuClicked() {
        let ref = this.modalService.open(NotesComponent, {
            ...NGBModalOptions,
            windowClass: "dashboard-modal",
            size: <any>"xl",
        });
        ref.componentInstance.showIcon = true;
        ref.componentInstance.winId = this.windowId;
        ref.componentInstance.sourceId = this.seqSourceId;
    }

	popupAlert = () => {
		try {
			let popUpMessage = new PopUpMessage(
				'Benefit Accumulator Base Values',
				'Benefit Accumulator Base Values',
				'6128: Data has been modified, press yes to save changes',
				'info',
				[],
				MessageType.SUCCESS
			);
			popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
			popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
			let ref = this.modalService.open(PopUpMessageComponent);
			ref.componentInstance.popupMessage = popUpMessage;
			ref.componentInstance.showIcon = true;
			ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
				if (resp.name === 'Yes') {
					this.saveForm = true;
					// this.saveBenefitAccBV(null);
				} else if (resp.name === 'No') {
					this.activeModal.close()
				} // 3rd case: In case of cancel do nothing
				// this.inputValue = false;
			});
		}
		catch (e) {
			console.log(e);
		}
	};

	helpScreen = () => {
        const viewModal = this.modalService.open(HelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.currentWin = '/ACCUM_Benefit_Accumulator_Base_Value_Entry.htm';
	};

	private showTimeStamp = () => {

		if (this.benefitAccumSelectedRowIndex > -1) {
			this.selectedClaimBenefitAccum = this.claimBenefitAccums[this.benefitAccumSelectedRowIndex];
		}

		let ref = this.modalService.open(TimestampComponent);
		ref.componentInstance.title = "Benefit Accumulator Base Values";
		ref.componentInstance.insertDateTime = this.selectedClaimBenefitAccum.insertDatetime;
		ref.componentInstance.insertProcess = this.selectedClaimBenefitAccum.insertProcess;
		ref.componentInstance.insertUser = this.selectedClaimBenefitAccum.insertUser;
		ref.componentInstance.updateUser = this.selectedClaimBenefitAccum.updateUser;
		ref.componentInstance.updateDateTime = this.selectedClaimBenefitAccum.updateDatetime;
		ref.componentInstance.updateProcess = this.selectedClaimBenefitAccum.updateProcess;
	};

	openFileMenu() {
		document.getElementById("fileDropdownFile").dispatchEvent(new MouseEvent('click'));
		this.menuOpened = "fileDropdownFile"
	}

	openSpecialMenu() {
		event.preventDefault();
		document.getElementById("fileDropdownSpecial").dispatchEvent(new MouseEvent('click'));
		this.menuOpened = "fileDropdownSpecial"
	}

	openWindowsMenu() {
		event.preventDefault();
		document.getElementById("fileDropdownWindow").dispatchEvent(new MouseEvent('click'));
		this.menuOpened = "fileDropdownWindow"
	}

	openHelpMenu() {
		document.getElementById('fileDropdownHelp').dispatchEvent(new MouseEvent('click'));
		this.menuOpened = 'fileDropdownHelp'
	}

	triggerMenus(value: any) {
		let obj = {}
		if (this.menuBarComponent.first.menuOpen) {
			if (this.menuOpened == "fileDropdownFile") {
				switch (value) {
					case 'm':
						obj = {
							menu: {
								menuItem: 'File'
							},
							action: 'New'
						}
						this.onMenuItemClick(obj)
						break;
					case 'o':
						obj = {
							menu: {
								menuItem: 'File'
							},
							action: 'Open'
						}
						this.onMenuItemClick(obj)
						break;
					case 's':
						obj = {
							menu: {
								menuItem: 'File'
							},
							action: 'Save'
						}
						this.onMenuItemClick(obj)
						break;
					case 'c':
						obj = {
							menu: {
								menuItem: 'File'
							},
							action: 'Close'
						}
						this.onMenuItemClick(obj)
						break;
					case 'e':
						obj = {
							menu: {
								menuItem: 'File'
							},
							action: 'Exit'
						}
						this.onMenuItemClick(obj)
						break;
				}
			} else if (this.menuOpened == "fileDropdownSpecial") {
				switch (value) {
					case 'c':
						obj = {
							menu: {
								menuItem: 'Special'
							},
							action: 'Claims Report..'
						}
						this.onMenuItemClick(obj)
						break;
					default:
						break;
				}
			} else if (this.menuOpened == 'fileDropdownWindow') {
				switch (value) {
					case 's':
						obj = {
							menu: {
								menuItem: 'Window'
							},
							action: 'Show Timestamp'
						}
						this.onMenuItemClick(obj)
						break;
					case 'a':
						obj = {
							menu: {
								menuItem: 'Window'
							},
							action: 'Audit Display'
						}
						this.onMenuItemClick(obj)
						break;
					default:
						break;
				}
			} else if (this.menuOpened == 'fileDropdownHelp') {
				switch (value) {
					case 'c':
						obj = {
							menu: {
								menuItem: 'Help'
							},
							action: 'Contents'
						}
						this.onMenuItemClick(obj)
						break;
					case 's':
						obj = {
							menu: {
								menuItem: 'Help'
							},
							action: 'Search for Help on...'
						}
						this.onMenuItemClick(obj)
						break;
					case 't':
						obj = {
							menu: {
								menuItem: 'Help'
							},
							action: 'This Window'
						}
						this.onMenuItemClick(obj)
						break;
					case 'g':
						obj = {
							menu: {
								menuItem: 'Help'
							},
							action: 'Glossary'
						}
						this.onMenuItemClick(obj)
						break;
					case 'd':
						obj = {
							menu: {
								menuItem: 'Help'
							},
							action: 'Getting Started'
						}
						this.onMenuItemClick(obj)
						break;
					case 'h':
						obj = {
							menu: {
								menuItem: 'Help'
							},
							action: 'How to use Help'
						}
						this.onMenuItemClick(obj)
						break;
					case 'a':
						obj = {
							menu: {
								menuItem: 'Help'
							},
							action: 'About Diamond Client/Server'
						}
						this.onMenuItemClick(obj)
						break;
					default:
						break;
				}
			}
		}
	};

	exitScreen = () => {
		this.messageService.findByMessageId(29062).subscribe(res => {
			let popMsg = new PopUpMessage(
				'poUpMessageName',
				'DIAMOND @ Client/Server System',
				res[0].messageText.replace('@1', 'DIAMOND @ Client/Server System'),
				'icon');
			popMsg.buttons = [
				new PopUpMessageButton('Yes', 'Okay', 'btn btn-primary'),
				new PopUpMessageButton('No', 'Cancel', 'btn btn-primary')
			];
			let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
			ref.componentInstance.showIcon = true;
			ref.componentInstance.popupMessage = popMsg;
			ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
				if (resp.name === 'Yes') {
					localStorage.removeItem('oldPassword');
					sessionStorage.removeItem("selectedGroup");
					localStorage.clear();
					setTimeout(() => {
						this.router.navigateByUrl('diamond/user/login', {skipLocationChange: true});
						this.activeModal.close()
					}, 500);
				} else if (resp.name === 'No') {

				}
			});
		})
	};
}
