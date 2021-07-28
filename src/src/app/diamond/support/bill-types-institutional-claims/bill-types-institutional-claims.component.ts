/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BillTypeMaster, MessageMasterDtl, SecWin} from "../../../api-models/index"
import {BillTypeMasterService} from "../../../api-services/bill-type-master.service";
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message/index'
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUser} from '../../../api-models/security/sec-user.model';
import {SecUserService} from '../../../api-services/security/sec-user.service';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {Menu} from '../../../shared/models/models';
import {SupportHelpComponent} from "../support-help/support-help.component";
import {getBillTypesInstitutionalClaimsShortcutKeys} from "../../../shared/services/shared.service";
import {DddwDtlService, MessageMasterDtlService, PlaceOfSvcMasterService} from "../../../api-services";
import {MenuResponse} from "../../../api-models/menu-response";
import {MenuService} from "../../../shared/services/menu.service";
import {ToastService} from "../../../shared/services/toast.service";
import {NgbToastType} from "ngb-toast";
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";

// Use the Component directive to define the BillTypesInstitutionalClaimsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'billtypesinstitutionalclaims',
    templateUrl: './bill-types-institutional-claims.component.html',

})
export class BillTypesInstitutionalClaimsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    billTypesInstitutionalClaimsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'BLTYP';
    public isSuperUser = false;
    public secProgress = true;
    userTemplateId:string ='';
    secColDetails = new Array<SecColDetail>();
    menu: Menu[] = [];
    showIcon:boolean =false;
    placeOfSvcDes: string;
    public shortcuts: ShortcutInput[] = [];
    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    @ViewChild('inpOutpInd') inpOutpIndElf: ElementRef;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    inpOutPatient: any[];
    billTypeStatus: Boolean = true;
    placeOfService: any;
    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton){
        if(button.name == 'yes'){
            console.log("button yes has been click!");
        }
        if(button.name == 'no'){
            console.log("button No has been click!");
        }
    }

    popUpButtonHandler(button: PopUpMessageButton){
        if(button.popupMessage.name == 'poUpMessageName'){
            this.popupMessageHandler(button)
        }
    }

    editBillTypeMaster: boolean;
    billTypeMaster: BillTypeMaster;
    billTypeMasters: BillTypeMaster[];

        createBillTypeMaster() {
            this.formValidation.validateForm();
            if(this.billTypesInstitutionalClaimsForm.valid) {
                let billTypeMaster = new BillTypeMaster();
                billTypeMaster.inpOutpInd = Form.getValue(this.billTypesInstitutionalClaimsForm, 'inpOutpInd');
                billTypeMaster.placeOfService = Form.getValue(this.billTypesInstitutionalClaimsForm, 'placeOfService');
                this.billTypeMasterService.createBillTypeMaster(billTypeMaster).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editBillTypeMaster = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
        }


    menuInit() {
        this.menu = [
            {
            menuItem: "File",
            dropdownItems: [
                { name: "New", shortcutKey: 'Ctrl+M'},
                { name: "Open", shortcutKey: 'Ctrl+O' },
                { name: 'Delete', shortcutKey: 'Ctrl+D'},
                { name: "Save", shortcutKey: 'Ctrl+S'},
                { name: "Close", shortcutKey: 'Ctrl+F4' },
                {isHorizontal: true},
                { name: "Main Menu...", shortcutKey: 'F2' },
                { name: "Shortcut Menu...", shortcutKey: 'F3' },
                {isHorizontal: true},
                { name: "Print", disabled: true },
                {isHorizontal: true},
                { name: "Exit", shortcutKey: 'Alt+F4' },
            ],
            },
            {
            menuItem: "Edit",
            dropdownItems: [
                { name: "Undo", shortcutKey: 'Ctrl+Z', disabled: true },
                { name: "Cut", shortcutKey: 'Ctrl+X', disabled: true },
                { name: "Copy", shortcutKey: 'Ctrl+C', disabled: true },
                { name: "Paste", shortcutKey: 'Ctrl+V'},
                {isHorizontal: true},
                {name: 'Next', shortcutKey: 'F8'},
                {name: 'Previous', shortcutKey: 'F7'}],
            },
            {
            menuItem: "Notes",
            dropdownItems: [{ name: "Notes", shortcutKey: 'F4', disabled: true }],
            },
            {
            menuItem: "Window",
            dropdownItems: [
                { name: "Show Timestamp", shortcutKey: 'Shift+Alt+S' },
                { name: "Audit Display", shortcutKey: 'Shift+Alt+A' },
                {isHorizontal: true},
                { name: "1 Main Menu" },
                { name: "2 Bill Types-Institutional Claims" },
            ],
            },
            {
            menuItem: "Help",
            dropdownItems: [
                { name: "Contents" },
                { name: "Search for Help on..." },
                { name: "This Window", shortcutKey: 'F1' },
                {isHorizontal: true},
                { name: "Glossary" },
                { name: "Getting Started" },
                { name: "How to use Help" },
                {isHorizontal: true},
                { name: "About Diamond Client/Server" },
            ],
            },
        ];
    }
    onMenuItemClick(event)
    {
        if (event.menu.menuItem === "File") {
            switch (event.action) {
                case "Main Menu": {
                    this.router.navigate(["diamond/functional-groups"]);
                    break;
                }
                case "New" : {
                    this.createNew();
                    break;
                }
                case "Open": {
                    this.openScreen();
                    break;
                }
                case "Delete": {
                    this.deleteRecord();
                    break;
                }
                case "Save": {
                    this.save();
                    break;
                }
                case "Close" : {
                    this.modalClose();
                    break;
                }
                case "Audit Display": {
                }
            }
        } else if (event.menu.menuItem === 'Window') {
            switch (event.action) {
                case 'Show Timestamp': {
                    this.showTimeStamp();
                    break;
                }
                default:
                    break;
            }
        }
        else if (event.menu.menuItem == 'Help') {
             /**
              * Open help modal
              */
            this.helpScreen();
         }
    }

    updateBillTypeMaster(billType:string)
    {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.billTypesInstitutionalClaimsForm.valid) {
            let billTypeMaster = new BillTypeMaster();
            billTypeMaster.inpOutpInd = Form.getValue(this.billTypesInstitutionalClaimsForm, 'inpOutpInd');
            billTypeMaster.placeOfService = Form.getValue(this.billTypesInstitutionalClaimsForm, 'placeOfService');
            this.billTypeMasterService.updateBillTypeMaster(billTypeMaster, billType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editBillTypeMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }
    }

     saveBillTypeMaster() {
        if(this.editBillTypeMaster) {
            this.updateBillTypeMaster(this.billTypeMaster.billType)
        } else {
            this.createBillTypeMaster();
        }
    }    deleteBillTypeMaster(billType : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.billTypeMasterService.deleteBillTypeMaster(billType).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }

    getBillTypeMaster(billType : string) {
        this.billTypeMasterService.getBillTypeMaster(billType).subscribe(billTypeMaster => {
            this.billTypeMaster = billTypeMaster;
            this.billTypesInstitutionalClaimsForm.patchValue({
                'inpOutpInd': this.billTypeMaster.inpOutpInd,
                'placeOfService': this.billTypeMaster.placeOfService,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }
    getBillTypeMasters() {
        this.billTypeMasterService.getBillTypeMasters().subscribe(billTypeMasters => {
        this.billTypeMasters = billTypeMasters;
        this.dataGridGridOptions.api.setRowData(this.billTypeMasters);
        this.dataGridGridOptions.api.selectIndex(0,false,false);
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    dataGridGridOptionsExportCsv() {
        var params = {
    };

      this.dataGridgridApi.exportDataAsCsv(params);
    }


    createDataGrid(): void {
      this.dataGridGridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGridGridOptions.editType = 'fullRow';
      this.dataGridGridOptions.columnDefs = [
         {
             headerName: "Bill Type",
             field: "billType",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "In/Out",
             field: "",
             width: 200,
             valueGetter: (data) => {
                 for (let item of this.inpOutPatient) {
                     if (item.value === data.data.inpOutpInd) {
                         return item.key
                     }
                 }
             }
         },
         {
             headerName: "Plc of Svc",
             field: "placeOfSvcMaster.placeOfSvcCode",
             width: 200
         },
         {
             headerName: "Description",
             field: "description",
             width: 500
         }
      ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private billTypeMasterService: BillTypeMasterService,
    private secUserService: SecUserService,
    private secColDetailService:SecColDetailService,
    private router:Router,
    private cdr: ChangeDetectorRef,
    private messageService: MessageMasterDtlService,
    private menuSerrvice: MenuService,
    private dddwDtlService: DddwDtlService,
    private renderer: Renderer2,
    private toastService: ToastService,
    private placeOfSvcMasterService: PlaceOfSvcMasterService,
     ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.billTypesInstitutionalClaimsForm);
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
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('BENEFIT_RULE', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.secProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
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

                    let menuResponse = new MenuResponse();
                    menuResponse = this.menuSerrvice.getMenuList([...this.menu], this.secWin);
                    if (menuResponse.status) {
                        this.menu = [];
                        this.menu = [...menuResponse.menus];
                    }

                } else {
                    this.secProgress = false;

                    this.showPopUp(
                        'You are not Permitted to view Benefit Ruler',
                        'Benefit Rule Permission'
                    );
                }
            }
        );
    }

    initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);

            if (this.secWin.hasSelectPermission()) {
                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
            }
        });
    }

    initializeComponentState(): void {
        this.menuInit();
        this.inpOutPatientStatus();
        this.getPlaceOfService();
        this.getBillTypeMasters();
        this.createDataGrid();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.billTypesInstitutionalClaimsForm = this.formBuilder.group({
            billType: ['', {updateOn: 'blur', validators: [] }],
            inpOutpInd: ['', {updateOn: 'blur', validators: [] }],
            placeOfService: ['', {updateOn: 'blur', validators: [] }],
            description: ['', {updateOn: 'blur', validators: [] }],
            placeOfSvcDes: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }


    onGridSelectionChange(){
        var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        this.setFormData(selectedRows);
    }

    setFormData(billTypeMaster) {
        this.billTypeMaster = billTypeMaster[0];
        this.billTypesInstitutionalClaimsForm.patchValue({
            'billType': this.billTypeMaster.billType,
            'inpOutpInd': this.billTypeMaster.inpOutpInd?this.billTypeMaster.inpOutpInd:'O',
            'placeOfService':this.billTypeMaster.placeOfSvcMaster?.placeOfSvcCode,
            'placeOfSvcDes': this.billTypeMaster.placeOfSvcMaster?.description,
            'description': this.billTypeMaster.description,
        }, {emitEvent: false});
        this.billTypeStatus = !!(this.billTypeMaster && this.billTypeMaster.billType);
        this.isFormDataModified();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getBillTypesInstitutionalClaimsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(SupportHelpComponent, { windowClass: 'myCustomModalClass' });
        viewModal.componentInstance.showIcon = true;
        viewModal.componentInstance.defaultFile = '/BLTYP_Institutional_Claims_Bill_Types.htm';
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Bill Types-Institutional Claims')
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
        this.billTypesInstitutionalClaimsForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }

    createNew() {
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Bill Types Institutinoal Claims', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.save();
                            setTimeout(() => {
                                this.createNewRecord();
                            }, 1000)
                        }
                        else if (resp.name === 'No') {
                            this.createNewRecord();
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.createNewRecord();
        }
    };

    createNewRecord() {
        let data = [];
        for (let item of this.billTypeMasters) {
            data.push(item)
        }
        data.push([]);
        this.dataGridGridOptions.api.setRowData(data);
        this.dataGridGridOptions.api.selectIndex(data.length - 1,false,false);
        this.billTypesInstitutionalClaimsForm.reset();
        this.billTypeStatus = false;
    }

    openScreen() {
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                try {
                    if (!message) {
                        return;
                    }
                    let popUpMessage = new PopUpMessage('popUpMessageName', 'Bill Types Institutinoal Claims', message[0].messageText, 'icon');
                    popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
                    popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
                    let ref = this.modalService.open(PopUpMessageComponent);
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance.popupMessage = popUpMessage;
                    ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
                        if (resp.name === 'Yes') {
                            this.save();
                            setTimeout(() => {
                                this.openNewScreen();
                            }, 1000)
                        }
                        else if (resp.name === 'No') {
                            this.openNewScreen();
                        }
                    })
                }
                catch (e) {

                }
            })
        } else {
            this.openNewScreen();
        }
    };

    openNewScreen() {
        this.dataGridGridOptions.api.setRowData(this.billTypeMasters);
        this.dataGridGridOptions.api.selectIndex(0,false,false);
    }

    deleteRecord() {
        this.toastService.showToast('This is only view screen', NgbToastType.Danger)
    };

    save() {
        this.toastService.showToast('This is only view screen', NgbToastType.Danger)
    }

    inpOutPatientStatus = () => {
        this.dddwDtlService.findByColumnNameAndDwnameAndLanguageId('inp_outp_ind', 'dw_bltyp_pick' , 0).subscribe(res => {
            this.inpOutPatient = res
        })
    };

    billTypeEvent(billType) {
        if (billType !== '') {
            let record = this.billTypeMasters.filter(f => f.billType == billType);
            if (record && record.length > 0) {
                this.messageService.findByMessageId(7109).subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp(
                        "7109: " + message[0].messageText,
                        "Bill Types-Institutional Claims"
                    );
                    this.billTypesInstitutionalClaimsForm.patchValue({
                        billType: null
                    });
                    this.renderer.selectRootElement("#billType").focus()
                });
            } else {
                this.inpOutpIndElf.nativeElement.focus();
            }
        } else {
            this.messageService.findByMessageId(29032).subscribe((message: MessageMasterDtl[]) => {
                this.showPopUp(
                    "29032: " + message[0].messageText.replace('@1', 'bill_type'),
                    "Bill Types-Institutional Claims"
                );
                this.renderer.selectRootElement("#billType").focus()
            })
        }
    };

    billTypeKeyEvent(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            this.billTypeEvent(event.target.value)
        }
    }

    getPlaceOfService() {
        this.placeOfSvcMasterService.getPlacesOfSvcMaster().subscribe(placesOfSvcMaster => {
            this.placeOfService = placesOfSvcMaster;
        })
    }

    setFieldValue(fieldName: string, fieldValue: string | number, fieldDescription: string) {
        this.billTypesInstitutionalClaimsForm.controls[fieldName].patchValue(
            fieldValue
        );
        this.billTypesInstitutionalClaimsForm.controls['placeOfSvcDes'].patchValue(fieldDescription)
    };

    showTimeStamp() {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Bill Types Institutional Claims";

        ref.componentInstance.insertDateTime = this.billTypeMaster.insertDatetimeDisplay;
        ref.componentInstance.insertProcess = this.billTypeMaster.insertProcess;
        ref.componentInstance.insertUser = this.billTypeMaster.insertUser;
        ref.componentInstance.updateUser = this.billTypeMaster.updateUser;
        ref.componentInstance.updateDateTime = this.billTypeMaster.updateDatetimeDisplay;
        ref.componentInstance.updateProcess = this.billTypeMaster.updateProcess;
    }
}
