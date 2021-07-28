/* Copyright (c) 2021 . All Rights Reserved. */

import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridOptions} from 'ag-grid-community';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {DatePickerConfig, DatePickerModel} from '../../../shared/config';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MessageMasterDtl, SecUser, SecWin, SystemCodeToken} from '../../../api-models';
import {MessageMasterDtlService, SecUserService, SecWinDescrService, SystemCodeTokenService} from '../../../api-services';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {KeyboardShortcutsComponent, ShortcutInput} from 'ng-keyboard-shortcuts';
import {getWindowAccessShortcutKeys} from '../../../shared/services/shared.service';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {Menu, SearchModel} from '../../../shared/models/models';
import {WindowAccessLookup} from '../../../shared/lookup/window-access-lookup';
import {FunctionalGroupShortCutComponent} from '../../main-menu/functional-group-shortcut/functional-group-shortcut.component';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../shared/services/toast.service';
import {CheckboxCellComponent} from '../../../shared/components/checkbox-renderer/checkbox-cell.component';
import { FunctionAccessComponent } from '../function-access/function-access.component';
import { UsersComponent } from '../users/users.component';
import {TimestampComponent} from "../../../shared/components/timestamp/timestamp.component";
import { SecFuncService } from '../../../api-services/security/sec-func.service';
import { SecFunc } from '../../../api-models/security/sec-func.model';

@Component({
  selector: 'app-copy-function-access',
  templateUrl: './copy-function-access.component.html'
})
export class CopyFunctionAccessComponent implements OnInit {

  // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() userId?: string;
    @Output() onRowSelected = new EventEmitter<SecFunc>();

    copyFunctionAccessForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public isSuperUser = false;
    public secProgress = true;
    public dataGridGridOptions: GridOptions;
    public shortcuts: ShortcutInput[] = [];
    public menu: Menu[] = [];
    pSel: string;
    pIns: string;
    pUpd: string;
    pDel: string;
    isCopyFunctionAccess: boolean = false;
    secFuncs: SecFunc[] = [];

    editSecUser: boolean = true;
    secUser: SecUser;
    secUsers: SecUser[] = [];
    editSecWin: boolean = true;
    secWin: SecWinViewModel;
    secWins: SecWin[] = [];
    secWinRows: SecWin[] = [];
    systemCodeToken: SystemCodeToken;


    private changedRow: any;
    private prevRow: SecWin = new SecWin();
    private prevRowSec: SecFunc = new SecFunc();

    @Input() winID?: string;
    @Input() showIcon: boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    searchModel = new SearchModel('secusers/lookup',
        WindowAccessLookup.WINDOW_ACCESS_DEFAULT,
        WindowAccessLookup.WINDOW_ACCESS_ALL,
        []);
    private dataGridgridApi: any;
    private userTemplateId: string;
    @ViewChild(KeyboardShortcutsComponent) private keyboard: KeyboardShortcutsComponent;
    isFormModifiedStatus: Boolean = false;
    screenCloseRequested: Boolean = false;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
        private secUserService: SecUserService,
        private secColDetailService: SecColDetailService,
        public activeModal: NgbActiveModal,
        private toastService: ToastService,
        private cdr: ChangeDetectorRef,
        private systemCodeTokenService: SystemCodeTokenService,
        private secWinDescrService: SecWinDescrService,
        private messageService: MessageMasterDtlService,
        private secFuncService: SecFuncService
    ) {}

    ngAfterViewInit(): void {
        this.cdr.detectChanges();
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

    

    getSecUser(userId: string) {
        this.copyFunctionAccessForm.get('userId').disable();
        this.secUserService.getSecUser(userId).subscribe(secUser => {
            this.secUser = secUser;
            if (this.secUser.lname && this.secUser.fname) {
                this.copyFunctionAccessForm.patchValue({
                    name: this.secUser.fname + ' ' + this.secUser.lname,
                });
            }
            else if (this.secUser.lname) {
                this.copyFunctionAccessForm.patchValue({
                    name: this.secUser.lname,
                });
            }
            else if (this.secUser.fname) {
                this.copyFunctionAccessForm.patchValue({
                    name: this.secUser.fname,
                });
            }
            this.copyFunctionAccessForm.patchValue({
                'userId': this.secUser.userId,
                'department': this.secUser.curUsrDept,
                'location': this.secUser.usrLocation,
            });
            this.setUserType(secUser.userType);
            this.userId=userId;
            this.getSecFuncByUser(secUser)
            
        });
    }

    getSecFuncByUser(secUser: SecUser) {
        this.secFuncService.findFuncByUserId(secUser.userId).subscribe(secWins => {
            this.secFuncs = secWins;
            this.dataGridGridOptions.api.setRowData(secWins);
            this.dataGridGridOptions.api.selectIndex(0, false, false);
        });
          
      }
    

    setUserType(userType: any) {
        this.systemCodeToken = new SystemCodeToken();
        this.systemCodeTokenService.getSystemCToken(userType).subscribe(
          (systemCodeToken) => {
            this.systemCodeToken = systemCodeToken;
            this.copyFunctionAccessForm.patchValue({
              'userType': this.systemCodeToken.systemCodeDesc1
            }, {emitEvent: false});
          });
      }

    getSecUsers() {
        this.secUserService.getSecUsers().subscribe(secUsers => {
            this.secUsers = secUsers;
        });
    }


    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    createDataGrid(): void {
        this.dataGridGridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGridGridOptions.singleClickEdit = true;
        this.dataGridGridOptions.editType = 'column';
            this.dataGridGridOptions.rowSelection = 'multiple';
            this.dataGridGridOptions.columnDefs = [
                {
                    headerName: 'User ID',
                    field: '',
                    width: 200,
                    headerClass: 'clr-blue',
                    valueGetter: (data) => {
                        return this.copyFunctionAccessForm.get('userId').value
                    }
                },
                {
                    headerName: 'Function',
                    field: 'secFuncPrimaryKey.funcId',
                    width: 200,
                    headerClass: 'clr-blue',
                    editable: false,
                    
                },
                {
                    headerName: 'Access',
                    field: 'pexe',
                    width: 100,
                    editable: false,
                    cellRendererFramework: CheckboxCellComponent,
                },
                {
                    headerName: 'Ins Dt',
                    field: 'insDt',
                    editable: false,
                    width: 100
                }
            ]
    }

    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.copyFunctionAccessForm);
        this.createDataGrid();
        if (this.userId){
              this.getSecUser(this.userId);
          }
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId('SEC_WIN', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secProgress = false;
            });
    }

    /**
     * get all user permission for page
     * if permissions to select exist then initialize page
     */
    hasPermission() {
        if (this.isSuperUser) {
            this.isSuperUser = JSON.parse(sessionStorage.getItem('isSuperUser'));
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
        });
    }

    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.copyFunctionAccessForm = this.formBuilder.group({
            userId: ['', {updateOn: 'blur', validators: []}],
            name: ['', {updateOn: 'blur', validators: []}],
            userType: ['', {updateOn: 'blur', validators: []}],
            department: ['', {updateOn: 'blur', validators: []}],
            location: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {

            this.secUser = res;
            this.getSecUser(this.secUser.userId);
            this.editSecUser = true;
            this.popUpMessage = null;
            this.copyFunctionAccessForm.patchValue({
                name: res.description,
            });
        })
    }

    createNewRow(): void {
        let row = [{}];
        this.dataGridGridOptions.api.updateRowData({
            add: row,
            addIndex: this.secWinRows.length + 1
        });
    }

   

    private initializePermission(): void {
        this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (this.isSuperUser) {
            this.secProgress = false;
            this.initializeComponentState();
            return;
        }

        const parsedToken = this.securityService.getCurrentUserToken();
        let userId = null;
        if (parsedToken) {
            userId = parsedToken.sub;
        }

        
    }

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.copyFunctionAccessForm);
    }


    onRowValueChange($event: any) {
        this.changedRow = $event.data;
    }

    onRowSelection($event: any) {

        this.prevRowSec = Object.assign(this.dataGridGridOptions.api.getSelectedRows());
        console.log(this.prevRowSec);
    }

    isFormDataModified = () => {
        this.copyFunctionAccessForm.valueChanges.subscribe(() => {
            this.isFormModifiedStatus = true;
        })
    };

    selectRowOnOK = () => {
        this.onRowSelected.emit(this.prevRowSec);
        this.activeModal.close();
       
    };

    modalClose = () => {
        this.activeModal.close();
    };

    showPopupAlert = (message: string, title: string) => {
        let popUpMessage = new PopUpMessage(title, title, message, 'info', [], MessageType.SUCCESS);
        popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
        popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp:any) => {
            if (resp.name === 'Yes') {
             //   this.saveSecWin();
            } else if (resp.name === 'No') {
                if (this.screenCloseRequested === true) {
                    this.activeModal.close();
                }
            } // 3rd case: In case of cancel do nothing
        });
    };

    onKeyDownLookup = (event) => {
        if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel()
        } if (event.target.value && event.key === 'Tab') {
            event.preventDefault();
            this.getSecUser(event.target.value)
        } else if (event.key === 'Tab') {
            event.preventDefault();
            this.userIdEmptyPopup()
        }
    };

    userIdEmptyPopup = () => {
        this.messageService.findByMessageId(11090).subscribe((message: MessageMasterDtl[]) => {
            let popUpMessage = new PopUpMessage('popUpMessageName', 'Windows Access', "11090: " + message[0].messageText, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe(() => {

            });
        });
    };

    private showTimeStamp = () => {
        let ref = this.modalService.open(TimestampComponent);
        ref.componentInstance.title = "Function Access";

        ref.componentInstance.insertDateTime = this.secUser.insertDatetime;
        ref.componentInstance.insertProcess = this.secUser.insertProcess;
        ref.componentInstance.insertUser = this.secUser.insertUser;
        ref.componentInstance.updateUser = this.secUser.updateUser;
        ref.componentInstance.updateDateTime = this.secUser.updateDatetime;
        ref.componentInstance.updateProcess = this.secUser.updateProcess;
    };

    selectAllRow() {
      this.dataGridGridOptions.api.selectAll();
    }

    helpScreen = () => {

    }

    deselectAll() {
      this.dataGridGridOptions.api.deselectAll();
    }


}
