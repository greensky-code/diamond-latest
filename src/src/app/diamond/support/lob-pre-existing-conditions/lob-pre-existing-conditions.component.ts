/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router'; import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from 'ag-grid-community';
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {LobPreExistRulesService} from '../../../api-services/lob-pre-exist-rules.service';
import {LobPreExistRules} from '../../../api-models/lob-pre-exist-rules.model';
import {MessageMasterDtl, SecWin} from '../../../api-models';
import {PreExistRules} from '../../../api-models/pre-exist-rules.model';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import { Menu, SearchModel } from '../../../shared/models/models';
import { LineOFBLookup } from '../../../shared/lookup/line-of-business-lookup';
import {LobPreExistRuleDtlService} from '../../../api-services/lob-pre-exist-rule-dtl.service';
import {SearchService} from "../../../shared/services/search.service";
import {LineOfBusinessMasterService, MessageMasterDtlService} from "../../../api-services";
import {LineOfBusinessMaster} from "../../../api-models/line-of-business-master.model";
import {PreExistRulesService} from "../../../api-services/pre-exist-rules.service";
import {SupportHelpComponent} from "../support-help/support-help.component";
import {
    getClaimInterestCalcRuleShortcutKeys,
    getLobPreExistingConditionsShortcutKeys
} from "../../../shared/services/shared.service";

// Use the Component directive to define the LobPreExistingConditionsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'lobpreexistingconditions',
    templateUrl: './lob-pre-existing-conditions.component.html',
    providers: [
        PreExistRulesService
    ]
})
export class LobPreExistingConditionsComponent implements OnInit  {

    @Input() showIcon = true;
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    lobPreExistingConditionsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = '';
    public isSuperUser = false;
    public secProgress = true;
    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;
    private dataGrid001gridColumnApi: any;
    editLobPreExistRules: boolean;
    lobPreExistRules: LobPreExistRules;
    lobPreExistRuleses: LobPreExistRules[];
    lineOfBusiness: string;
    lineOfBusinessDescription: string;
    lineOfBusinessDescription1: string;
    LobSearchModal = new SearchModel(
        'linesofbusinessmaster/LOB/lookup',
        LineOFBLookup.LINE_OF_B_ALL,
        LineOFBLookup.LINE_OF_B_DEFAULT,
        [],
        false,
        false
    );
    lineOfBusinessMaster: LineOfBusinessMaster;
    displayedDataStatus: Boolean = false;
    resetInlineGrid = false;
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    public menu: Menu[] = [];
    public shortcuts: ShortcutInput[] = [];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private lobPreExistRulesService: LobPreExistRulesService,
        private preExistRulesService: PreExistRulesService,
        private lobPreExistRuleDtlService: LobPreExistRuleDtlService,
        private searchService: SearchService,
        private lineOfBusinessMasterService: LineOfBusinessMasterService,
        private cdr: ChangeDetectorRef,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal) {
    }

    ngOnInit(): void {
        this.initializeComponentState();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.lobPreExistingConditionsForm);
        this.createDataGrid001();
        this.createDataGrid002();
        setTimeout(() => {
            this.dataGrid001GridOptions.api.setRowData([]);
            this.dataGrid002GridOptions.api.setRowData([]);
        }, 100);
    }


    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }


    createLobPreExistRules() {
        if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if (this.lobPreExistingConditionsForm.valid) {
                let lobPreExistRules = new LobPreExistRules();
                lobPreExistRules.lineOfBusiness = Form.getValue(this.lobPreExistingConditionsForm, 'lineOfBusiness');
                lobPreExistRules.applyGroupsInd = Form.getValue(this.lobPreExistingConditionsForm, 'applyToAllGroupsInLob');
                lobPreExistRules.termReason = Form.getValue(this.lobPreExistingConditionsForm, 'termReason');
                this.lobPreExistRulesService.createLobPreExistRules(lobPreExistRules).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info('Record successfully created.');
                    this.editLobPreExistRules = false;
                }, error => {
                    this.alertMessage = this.alertMessageService
                        .error('An Error occurred while creating new record. Please check your entry.');
                });
            } else {
                this.alertMessage = this.alertMessageService
                    .error('Some required information is missing or incomplete. Please correct your entries and try again.');
            }
        } else {

        }
    }


    updateLobPreExistRules(seqLbpecId: number) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if (this.lobPreExistingConditionsForm.valid) {
            let lobPreExistRules = new LobPreExistRules();
            lobPreExistRules.lineOfBusiness = Form.getValue(this.lobPreExistingConditionsForm, 'lineOfBusiness');
            lobPreExistRules.applyGroupsInd = Form.getValue(this.lobPreExistingConditionsForm, 'applyToAllGroupsInLob');
            lobPreExistRules.termReason = Form.getValue(this.lobPreExistingConditionsForm, 'termReason');
            this.lobPreExistRulesService.updateLobPreExistRules(lobPreExistRules, seqLbpecId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully updated.');
                this.editLobPreExistRules = false;
            }, error => {
                this.alertMessage = this.alertMessageService
                    .error('An Error occurred while updating record. Please check your entry.');
            });
         } else {
            this.alertMessage = this.alertMessageService
                .error('Some required information is missing or incomplete. Please correct your entries and try again.');
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }

    saveLobPreExistRules() {
        if (this.editLobPreExistRules) {
            this.updateLobPreExistRules(this.lobPreExistRules.seqLbpecId)
        } else {
            this.createLobPreExistRules();
        }
    }

    deleteLobPreExistRules(seqLbpecId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.lobPreExistRulesService.deleteLobPreExistRules(seqLbpecId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
            });
       }
    }

    getLobPreExistRules(seqLbpecId: number) {

        this.lobPreExistRulesService.getLobPreExistRules(seqLbpecId).subscribe(lobPreExistRules => {
            this.lobPreExistRules = lobPreExistRules;
            this.lobPreExistingConditionsForm.patchValue({
                'dynamicText': this.lineOfBusinessMaster.description,
                'applyToAllGroupsInLob': this.lobPreExistRules.applyGroupsInd !== "N",
                'termReason': this.lobPreExistRules.termReason,
                'termDate': this.dateFormatPipe.defaultDisplayDateFormat(this.lobPreExistRules.termDate),
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.lobPreExistRules.effectiveDate),
                'pecRuleId': this.lobPreExistRules.pecRuleId,
                'description': this.lineOfBusinessDescription1
            }, {emitEvent: false});
            setTimeout(() => {
                this.isFormDataModified()
            }, 2000)
            this.lobPreExistingConditionsForm.get('lineOfBusiness').disable();
            this.lobPreExistingConditionsForm.get('pecRuleId').disable();
            this.lobPreExistingConditionsForm.get('effectiveDate').disable();
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }
    lobPreExistingConditionsFormClear() {
        this.lobPreExistingConditionsForm.reset()
    }

    findByLob(term: string) {
        this.lobPreExistRulesService.findByLineOfBusiness(term).subscribe(lobRuleses => {
            this.preExistRulesService.getPreExistRulesByPECId(lobRuleses[0].pecRuleId).subscribe(preExistRuleses => {
                this.lineOfBusinessDescription1 = preExistRuleses[0].description;
                lobRuleses.map(item => {
                    item.description = this.lineOfBusinessDescription1
                });
                this.dataGrid001GridOptions.api.setRowData(lobRuleses);
            });

        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }
    findBySeqlbpecid(seqlbpecid: number) {
        this.lobPreExistRuleDtlService.findBySeqLbpecId(seqlbpecid).subscribe(lobPreExistRules => {
            this.dataGrid002GridOptions.api.setRowData(lobPreExistRules);
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
        });
    }

    OnChangeGrid001() {
        let selectedRows = this.dataGrid001GridOptions.api.getSelectedRows();
    }
    onReadyGrid001(params: any) {
        this.dataGrid001GridOptions.api.forEachNode(node => node.rowIndex ? 0 : node.setSelected(true));
        params.api.sizeColumnsToFit();
        if (!!this.dataGrid001GridOptions.api.getSelectedRows()[0]) {
            this.getLobPreExistRules(this.dataGrid001GridOptions.api.getSelectedRows()[0].seqLbpecId);
            this.findBySeqlbpecid(this.dataGrid001GridOptions.api.getSelectedRows()[0].seqLbpecId);
        } else {
            this.dataGrid002GridOptions.api.setRowData([]);
        }
    }

    getLobPreExistRuleses() {
        this.lobPreExistRulesService.getLobPreExistRuleses().subscribe(lobPreExistRuleses => {
        this.lobPreExistRuleses = lobPreExistRuleses;
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
        });
    }

    onRowClicked(data: any) {
        this.getLobPreExistRules(data.seqLbpecId);
        this.findBySeqlbpecid(data.seqLbpecId);
    }

    onTabLobPreExisting(event: any) {
        if (event.key === 'F5') {
            event.preventDefault();
            this.onF5KeyLineOfBusiness(event);
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.lineOfBusiness = event.target.value;
            const lob = event.target.value;
            let res = [{'lineOfBusiness': lob}];
            let sm = JSON.parse(JSON.stringify(this.LobSearchModal));
            sm.searchOption = res;
            this.searchService.getSearchResults(sm).subscribe(resp => {
                if (resp == null) {
                    this.lobPreExistingConditionsForm.get('lineOfBusiness').setValue(null);
                    return;
                }
            });
            this.getLineOfBusinessMaster(lob);

        }
        this.lobPreExistingConditionsForm.patchValue({
            'applyToAllGroupsInLob': '',
            'termReason': '',
            'termDate': '',
            'effectiveDate': '',
            'pecRuleId': '',
        });
    }


    dataGrid001GridOptionsExportCsv() {
        let params = ['allColumns'];
        this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    dataGrid002GridOptionsExportCsv() {
        let params = {
    };
      this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions = {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: 'PEC Rule ID',
             field: 'pecRuleId',
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: 'Effective Date',
             field: 'effectiveDate',
             width: 200         },
         {
             headerName: 'Term Date',
             field: 'termDate',
             width: 200         },
         {
             headerName: 'Description',
             field: 'description',
             width: 200,
         }
      ];
    }
    createDataGrid002(): void {
      this.dataGrid002GridOptions = {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: 'Operator',
             field: 'operator',
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true,
             headerClass:'clr-blue'
         },
         {
             headerName: 'Group ID From',
             field: 'fromValue',
             width: 200,
             headerClass:'clr-blue'
                     },
         {
             headerName: 'Group ID Thru',
             field: 'thruValue',
             width: 200         }
      ];
    }



    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.lobPreExistingConditionsForm);
         this.createDataGrid001();
         this.createDataGrid002();
         this.menuInit();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        this.lobPreExistingConditionsForm = this.formBuilder.group({
            lineOfBusiness: ['', {updateOn: 'blur', validators: [] }],
            dynamicText: ['', {updateOn: 'blur', validators: [] }],
            pecRuleId: ['', {updateOn: 'blur', validators: [] }],
            description: [''],
            effectiveDate: ['', {updateOn: 'blur', validators: [] }],
            termDate: ['', {updateOn: 'blur', validators: [] }],
            applyToAllGroupsInLob: ['', {updateOn: 'blur', validators: [] }],
            termReason: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
    }

    lineOfBusinessMasterModel = new SearchModel('linesofbusinessmaster/LOB/lookup',
    LineOFBLookup.LINE_OF_B_DEFAULT,
    LineOFBLookup.LINE_OF_B_ALL,
    []);

onF5KeyLineOfBusiness(e: any) {
    e.preventDefault();
    this.openLookupLineOfBusinessMasterModel();
}

openLookupLineOfBusinessMasterModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.lineOfBusinessMasterModel;
    ref.componentInstance.showIcon = true;

    ref.componentInstance.onRowSelected.subscribe((res: any) => {
        this.lineOfBusiness = res.lineOfBusiness
        this.lineOfBusinessDescription = res.description
        this.findByLob(this.lineOfBusiness)
        this.lobPreExistingConditionsForm.patchValue({
            'statusReason': res.reasonCode
        });
        this.popUpMessage = null;
    })
}

    getLineOfBusinessMaster(lineOfBusiness: string) {
        this.lineOfBusinessMasterService.getLineOfBusinessMaster(lineOfBusiness).subscribe(lineOfBusinessMaster => {
            this.lineOfBusinessMaster = lineOfBusinessMaster;
            this.displayedDataStatus = true;
            this.resetInlineGrid = true;
            setTimeout(() => {
                this.resetInlineGrid = false;
            }, 10);

            this.findByLob(this.lineOfBusiness)
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M'},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S'},
                    {name: 'Close', shortcutKey: 'Close+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}
                ]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}
                ]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [
                    {name: 'Line of Business'},
                    {name: 'Auto Letter Setup'},
                    {name: 'PCP Support Info Details'},
                    {name: 'PCP Auto Assign'},
                    {name: 'APC Setup'},
                    {name: 'Claims Interest/Penalty Calc Rules'},
                    {name: 'Claims Discount Calculation Rules'},
                    {name: 'Pre-Existing Condition Rules'}
                ]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Shift+Alt+T'},
                    {name: 'Layer', shortcutKey: 'Shift+Alt+L'},
                    {name: 'Cascade', shortcutKey: 'Shift+Alt+C'},
                    {name: 'Arrange Icons', shortcutKey: 'Shift+Alt+I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Lob Pre-Existing Conditions'}
                ]
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ]
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === "File") {
            switch (event.action) {
            }
        } else if (event.menu.menuItem == 'Help') {
            /**
             * Open help modal
             */
            this.helpScreen();
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getLobPreExistingConditionsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/LBPEC,_Line_of_Business_Pre-Existing_Conditions.htm';
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'LOB Pre-Existing Conditions')
            })
        } else {
            this.activeModal.close();
        }
    };

    popupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {

                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.lobPreExistingConditionsForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
