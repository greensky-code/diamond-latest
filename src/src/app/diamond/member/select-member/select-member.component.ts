import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridOptions } from 'ag-grid-community';
import { KeyboardShortcutsComponent, ShortcutInput } from "ng-keyboard-shortcuts";
import { DddwDtl, MemberEligHistory, MemberMaster } from '../../../api-models';
import { DddwDtlService } from '../../../api-services';
import { MemberEligHistoryService } from '../../../api-services/member-elig-history.service';
import { MemberMasterService } from '../../../api-services/member-master.service';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import { Form } from '../../../shared/helpers/form.helper';
import { MemberMasterLookup } from '../../../shared/lookup/member-master-lookup';
import { SearchModel } from '../../../shared/models/models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';
import { getSelectMemberShortcutKeys } from '../../../shared/services/shared.service';
import { ToastService } from '../../../shared/services/toast.service';
import { FormValidation } from '../../../shared/validators/form-validation.pipe';
import {LookupComponent} from "../../../shared/components/lookup/lookup.component";

@Component({
	selector: 'app-select-member',
	templateUrl: './select-member.component.html',
	styleUrls: ['./select-member.component.css'],
	encapsulation: ViewEncapsulation.None,
	providers: [
		MemberMasterService,
		DateFormatPipe,
		MemberEligHistoryService,
		DatePipe,
		DddwDtlService
	]
})
export class SelectMemberComponent implements OnInit {

	@Input() groupId?: string;
	showMembEligError: boolean;
	@Input() benefitPackageId?: string;
	@Input() relationshipCode?: string;
	@Input() membMaster?: MemberMaster;
	@Input() memberEligHistory?: MemberEligHistory;
	@Output() onRowSelected = new EventEmitter<any>();
	relationCodes: DddwDtl[];
	selectMemberForm: FormGroup;
	formValidation: FormValidation;
	public dataGrid001GridOptions: GridOptions;
	public alertMessage: AlertMessage;
	public popUpMessage: PopUpMessage;
	memberMasters: MemberMaster[] = [];
	memberMaster: MemberMaster;
	@ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
	seqEligHist: any;
	shortcuts: ShortcutInput[] = [];
	@ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
	private dataGrid001gridApi: any;
	private dataGrid001gridColumnApi: any;
	selectedRow: any;
	memberEligHistorys: MemberEligHistory[] = [];
	firstName: any;
	lastName: any;
	searchModel = new SearchModel('membermasters/lookup', MemberMasterLookup.MEMBER_MASTER_ALL, MemberMasterLookup.MEMBER_MASTER_DEFAULT, []);

	constructor(
		private formBuilder: FormBuilder,
		private toastService: ToastService,
		public activeModal: NgbActiveModal,
		private alertMessageService: AlertMessageService,
		private memberMasterService: MemberMasterService,
		private dateFormatPipe: DateFormatPipe,
		private modalService: NgbModal,
		private MemberEligHistoryService: MemberEligHistoryService,
		private datePipe: DatePipe,
		private DddwDtlService: DddwDtlService,
		private cdr: ChangeDetectorRef

	) { }

	ngOnInit(): void {
		this.createForm();
		this.formValidation = new FormValidation(this.selectMemberForm);
		this.createDataGrid001();
		this.getRelationShipCode();
		if (this.membMaster.personNumber !== undefined) {
			this.setSearchBoxValue(this.membMaster);
		}
		setTimeout(() => {
			this.dataGrid001GridOptions.api.setRowData([]);
		  });

	}
	ngAfterViewInit(): void {
		this.shortcuts.push(...getSelectMemberShortcutKeys(this));
		this.cdr.detectChanges();
	}


	private createDataGrid001(): void {
		this.dataGrid001GridOptions =
		{
			paginationPageSize: 50
		};
		this.dataGrid001GridOptions.editType = 'fullRow';
		this.dataGrid001GridOptions.columnDefs = [
			{
				headerName: 'Eff Date',
				field: 'effectiveDate',
				width: 150,
				headerCheckboxSelection: true,
				headerCheckboxSelectionFilteredOnly: true,
				checkboxSelection: true
			},
			{
				headerName: 'Term Date',
				field: 'termDate',
				width: 150
			},
			{
				headerName: 'Group ID',
				field: 'groupId',
				width: 150
			},
			{
				headerName: 'Plan Code',
				field: 'planCode',
				width: 150
			},
			{
				headerName: 'Bft Pkg',
				field: 'benefitPackageId',
				width: 150
			},
			{
				headerName: 'LOB',
				field: 'lineOfBusiness',
				width: 150
			},
			{
				headerName: 'Riders 1-20',
				field: 'riderCode',
				width: 400
			},
			{
				headerName: 'Medi Sts',
				field: 'medicareStatusFlg',
				width: 200
			},
			{
				headerName: 'Oth Sts',
				field: 'otherStatusFlag',
				width: 200
			},
			{
				headerName: 'Elig Sts',
				field: 'eligStatus',
				width: 200
			},
			{
				headerName: 'Relationship',
				field: 'relationshipCode',
				width: 200
			}
		];
	}

	createForm() {
		this.selectMemberForm = this.formBuilder.group({
			diamondId: ['', { updateOn: 'blur', validators: [] }],
			subscriberId: ['', { updateOn: 'blur', validators: [Validators.required] }],
			personNo: ['', { updateOn: 'blur', validators: [Validators.required] }],
		}, { updateOn: 'submit' });
	}

	search() {
		this.formValidation.validateForm();
		if (this.selectMemberForm.valid) {
			if (this.showMembEligError) {
				this.showPopUp('Select Member', '14048: You must select an Eligibility History peroid.')
				return;
			}
			let memberMaster = new MemberMaster();
			memberMaster.subscriberId = this.selectMemberForm.get('subscriberId').value;
			memberMaster.personNumber = this.selectMemberForm.get('personNo').value;
			this.memberMasterService.findBySubscriberIdAndPersonNumber(memberMaster.subscriberId, memberMaster.personNumber).subscribe((memberMasters: any) => {
				this.memberMaster = new MemberMaster();
				this.memberMasters = memberMasters;
				if (this.memberMasters !== null) {
					if (this.memberMasters.length > 0) {
						this.MemberEligHistoryService.getMemberSeqEligHist_bavc(this.selectMemberForm.get('subscriberId').value, this.selectMemberForm.get('personNo').value).subscribe(data => {
							console.log(data[0]);
							setTimeout(() => {
								if (data[0]) {
									data = data.reverse();
									this.memberMasters[0].seqEligHist =
										data[this.selectedRow].seq_Elig_hist;
									this.memberMaster = this.memberMasters[0];
									this.onRowSelected.emit(this.memberMaster);
									this.close();
								}
							}, 800);

						})

					}
				} else {
					this.dataGrid001GridOptions.api.setRowData([]);
					this.alertMessage = this.alertMessageService.error('Invalid Subscriber ID or Person No.');
				}

			});
		} else {
			this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
		}
	}

	close() {
		this.activeModal.dismiss();
	}


	setSearchBoxValue(memberMaster: MemberMaster) {
		setTimeout(() => {
			this.selectMemberForm.patchValue({
				'subscriberId': memberMaster.subscriberId,
				'personNo': memberMaster.personNumber,
			});
			setTimeout(() => {
				this.triggerGridPopulate();
			}, 400);
		});
	}

	triggerGridPopulate() {
		this.dataGrid001GridOptions.api.setRowData([]);
		this.dataGrid001GridOptions.api.showLoadingOverlay();
		this.memberMasterService.findBySubscriberIdAndPersonNumber(Form.getValue(this.selectMemberForm, 'subscriberId'), Form.getValue(this.selectMemberForm, 'personNo')).subscribe(data => {
			if (data) {
				console.log(data);
				this.firstName = data[0].firstName;
				this.lastName = data[0].lastName;
				this.selectMemberForm.patchValue({
					diamondId: data[0].diamondId
				})
				this.getMembElgGrid(data[0].seqMembId);
			}
			else {
				this.firstName = null;
				this.lastName = null;
				this.showPopUp('Error', '14344: Specified Member Does not exits')
			}
		})
	}

	onChangePersonId(event: any) {
		this.memberMasterService.findBySubscriberIdAndPersonNumber(Form.getValue(this.selectMemberForm, 'subscriberId'), event.target.value).subscribe(data => {
			if (data) {
				this.firstName = data[0].firstName;
				this.lastName = data[0].lastName;
				this.selectMemberForm.patchValue({
					diamondId: data[0].diamondId
				})
				this.getMembElgGrid(data[0].seqMembId);
			}
			else {
				this.firstName = null;
				this.lastName = null;
				this.showPopUp('Error', '14344: Specified Member Does not exits')
			}
		})
	}

	popUpButtonClicked(button: PopUpMessageButton) {
		if (button.name == 'yes') {
			console.log('button Yes has been click!');
		}
	}

	showPopUp(title: any, message: any) {
		let popMsg = new PopUpMessage('poUpMessageName', title, message, 'icon');
		popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
		let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
		ref.componentInstance.showIcon = true;
		ref.componentInstance.popupMessage = popMsg;
		ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
			this.popUpButtonClicked(event);
		});
	}

	getSeqEligHist() {

	}

	getMembElgGrid(seqMembId: any) {
		this.MemberEligHistoryService.getSelectMemberGrid(seqMembId).subscribe(data => {
			if (data.length > 0) {
				this.showMembEligError = false;
				for (var v = 0; v < data.length; v++) {
					data[v].effectiveDate = this.datePipe.transform(data[v].effectiveDate, 'MM/dd/yyyy');
					data[v].termDate = this.datePipe.transform(data[v].termDate, 'MM/dd/yyyy');
					data[v].riderCode = data[v].riderCode1 + ' ' + data[v].riderCode2 + ' ' + data[v].riderCode3 + ' ' + data[v].riderCode4 + ' ' + data[v].riderCode5 + ' ' + data[v].riderCode6 + ' ' + data[v].riderCode7 + ' ' + data[v].riderCode8 + ' ' + data[v].riderCode9 + ' ' + data[v].riderCode10 + ' ' + data[v].riderCode11 + ' ' + data[v].riderCode12 + ' ' + data[v].riderCode13 + ' ' + data[v].riderCode14 + ' ' + data[v].riderCode15 + ' ' + data[v].riderCode16 + ' ' + data[v].riderCode17 + ' ' + data[v].riderCode18 + ' ' + data[v].riderCode19 + ' ' + data[v].riderCode20;
					this.nullToEmpty(data, v);
					this.assignRelationShipCode(data[v].relationshipCode, data, v);
				}
				this.dataGrid001GridOptions.api.setRowData(data);
				this.dataGrid001GridOptions.api.selectIndex(0, false, false);
			}
			else {
				this.showMembEligError = true;
			}
		});
	}

	nullToEmpty(data: any, i: any) {
		var d = data[i].riderCode.toString();
		d.replaceAll("null", " ")
		data[i].riderCode = d.split("null").join("");
	}

	assignRelationShipCode(code: any, data: any, k: any) {
		if (this.relationCodes.length > 0) {
			for (let i = 0; i < this.relationCodes.length; i++) {
				if (code === this.relationCodes[i].dddwDtlPrimaryKey.dataVal) {
					data[k].relationshipCode = this.relationCodes[i].dddwDtlPrimaryKey.displayVal;
				}
			}
		}
	}

	getRelationShipCode() {
		this.DddwDtlService.findByColumnNameAndDwname('crelationship_code', 'dw_accum_dsp_mbr').subscribe(data => {
			this.relationCodes = data;
		});
	}

	rowSelected(args: any) {
		if (args.node.selected) {
			this.selectedRow = args.rowIndex;
		}
	}

	onSelection() {
		var selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();

	}

	onLookupFieldChange(event: any) {
		if (event.key === 'F5') {
			event.preventDefault();
			this.openLookupPage();
		} else if (event.key === 'Tab') {
			this.selectMemberForm.controls.personNo.setValue("");
			this.dataGrid001GridOptions.api.setRowData([]);
		}
	}

	openLookupPage() {
		let ref = this.modalService.open(LookupComponent);
		ref.componentInstance.searchModel = this.searchModel;
		ref.componentInstance.showIcon = true;
		ref.componentInstance.onRowSelected.subscribe((resp: any) => {
			this.selectMemberForm.patchValue({
				subscriberId: resp.subscriberId,
				diamondId: resp.diamondId,
				personNo: resp.personNumber,
			});
			this.firstName = resp.firstName;
			this.lastName = resp.lastName;
			setTimeout(() => {
				this.triggerGridPopulate();
			}, 400);
		})
	}


}
