/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../../shared/validators/number.validator';
import { CustomValidators } from '../../../shared/validators/custom-validator';
import { Mask } from '../../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  SecWin, SystemCodeToken } from "../../../api-models/index"
import {  SystemCodeTokenService } from "../../../api-services/system-code-token.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import { SecUser } from '../../../api-models/security/sec-user.model';
import { SecUserService } from '../../../api-services';
import { SecColDetailService } from '../../../api-services/security/sec-col-detail.service';
import { SecColDetail } from '../../../api-models/security/sec-col-detail.model';
import { Menu, SearchModel } from '../../../shared/models/models';
import { CodeTableMaintenanceLookup } from '../../../shared/lookup/code-table-maintenance-lookup';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';

// Use the Component directive to define the CodeTableMaintenanceComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'code-table-maintenance',
    templateUrl: './code-table-maintenance.component.html',
    providers: [
        SystemCodeTokenService,
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
   
    ]

})
export class CodeTableMaintenanceComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    codeTableMaintenanceForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'CDTMT';
    public isSuperUser = false;
    public secProgress = true;
    public menu: Menu[] = [];
    @Input() showIcon = false;
    currentSysCode:string;



    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

    searchCodeModal = new SearchModel('systemcodetokens/lookup',
        CodeTableMaintenanceLookup.SYSTEM_CODE_TOKEN_ALL,
        CodeTableMaintenanceLookup.SYSTEM_CODE_TOKEN_DEFAULT,

        [], true
        );

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

editSystemCodeToken: boolean;
    systemCodeToken: SystemCodeToken;
    systemCodeTokens: SystemCodeToken[];
    
        createSystemCodeToken() {
            if (this.secWin.hasInsertPermission()) {
            this.formValidation.validateForm();
            if(this.codeTableMaintenanceForm.valid) {
                let systemCodeToken = new SystemCodeToken();
                systemCodeToken.systemCodeType = Form.getValue(this.codeTableMaintenanceForm, 'systemCodeType');
                systemCodeToken.languageId = Form.getValue(this.codeTableMaintenanceForm, 'languageCode');
                this.systemCodeTokenService.createSystemCodeToken(systemCodeToken).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editSystemCodeToken = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }
}


    updateSystemCodeToken(languageId : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.codeTableMaintenanceForm.valid) {
            let systemCodeToken = new SystemCodeToken();
            systemCodeToken.systemCodeType = Form.getValue(this.codeTableMaintenanceForm, 'systemCodeType');
            systemCodeToken.languageId = Form.getValue(this.codeTableMaintenanceForm, 'languageCode');
            this.systemCodeTokenService.updateSystemCodeToken(systemCodeToken, languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editSystemCodeToken = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveSystemCodeToken() {
        if(this.editSystemCodeToken) {
            this.updateSystemCodeToken(this.systemCodeToken.languageId.toString())
        } else {
            this.createSystemCodeToken();
        }
    }    deleteSystemCodeToken(languageId : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.systemCodeTokenService.deleteSystemCodeToken(languageId).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getSystemCodeToken(languageId : string) {
        this.systemCodeTokenService.getSystemCodeToken(languageId).subscribe(systemCodeToken => {
            this.systemCodeToken = systemCodeToken;
            this.codeTableMaintenanceForm.patchValue({
                'systemCodeType': this.systemCodeToken.systemCodeType,
                'languageCode': this.systemCodeToken.languageId,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getSystemCodeTokens() {
        this.systemCodeTokenService.getSystemCodeTokens().subscribe(systemCodeTokens => {
        this.systemCodeTokens = systemCodeTokens;
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
             headerName: "Description 1",
             field: "systemCodeDesc1",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Description 2",
             field: "systemCodeDesc2",
             width: 200         }
      ];
    }

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
    private formBuilder: FormBuilder,
    private mask: Mask,
    private customValidators: CustomValidators,
    private alertMessageService: AlertMessageService,
    private dateFormatPipe: DateFormatPipe,
    private secWinService: SecWinService,
    private secUserService: SecUserService,
    private modalService: NgbModal,
    private securityService: SecurityService,
    private secColDetailService: SecColDetailService,
     private systemCodeTokenService: SystemCodeTokenService,
     public activeModal: NgbActiveModal,
     ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }

    /**
    * get all user permission for page
    * if permissions to select exist then initialize page
    */
   hasPermission() {
    this.isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"))
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

    

    private initializeComponentState(): void {
        this.createForm();
        this.menuInit();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.codeTableMaintenanceForm);
         this.createDataGrid();
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
                        'You are not Permitted to view code Table Maintenance',
                        'Code Table Maintenance Permission'
                    );
                }
            }
        );
    }

    lookupCodeTableMaintenance(event, id: string) {
      if (event.key === 'F5') {
          event.preventDefault();
          let ref = this.modalService.open(SearchboxComponent);
          ref.componentInstance.searchModel = this.searchCodeModal;
          ref.componentInstance.showIcon = true;
          
          ref.componentInstance.onRowSelected.subscribe((res: any) => {
              if (res != null) {
                  this.findBySysCodeType(res.systemCodeTokenPrimaryKey.systemCodeType);
              }
          });
       }
      else if (event.key === 'Tab') {
        event.preventDefault();
        this.findBySysCodeType(id);
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
            .findByTableNameAndUserId('MEMBER_MASTER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
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
        this.codeTableMaintenanceForm = this.formBuilder.group({
            systemCodeType: ['', {updateOn: 'blur', validators: [] }],
            languageCode: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    private menuInit() {
        this.menu = [
          {
            menuItem: 'File',
            dropdownItems: [{name: 'New'}, {name: 'Open'}, {name: 'Save'}, {name: 'Close'},
              {name: '-'}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
              {name: 'Print', disabled: true},
              {isHorizontal: true}, {name: 'Exit'}]
          },
          {
            menuItem: 'Edit',
            dropdownItems: [{name: 'Undo', disabled: true}, {isHorizontal: true},
              {name: 'Cut', disabled: true}, {name: 'Copy', disabled: true},
              {name: 'Paste', disabled: true}, {isHorizontal: true}, {name: 'Next'}, {name: 'Previous'}]
          },
          {
            menuItem: 'Notes',
            dropdownItems: [
              {name: 'Notes', shortcutKey: 'F4', disabled: true}
            ]
          }, {
            menuItem: 'Windows',
            dropdownItems: [
              {name: 'Tile'}, {name: 'Layer'}, {name: 'Cascade'}, {name: 'Arrange Icons'},
              {isHorizontal: true}, {name: 'Show Timestamp'}, {isHorizontal: true}, {name: '1 Main Menu'},
              {name: '2 Benefit Processing Order'}
            ]
          }, {
            menuItem: 'Help',
            dropdownItems: [
              {name: 'Contents'}, {name: 'Search for Help on...'}, {name: 'This Window'}, {isHorizontal: true},
              {name: 'Glossary'}, {name: 'Getting Started'}, {name: 'How to use Help'}, {isHorizontal: true},
              {name: 'About Diamond Client/Server'}
            ]
          }
        ];
      }

      public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'File') {             // handle File actions
          switch (event.action) {
            case 'New': {
              break;
            }
            case 'Open': {
              // statements;
              break;
            }
            case 'Save': {
              break;
            }
            case 'Close': {
              break;
            }
            case 'Shortcut Menu': {
             
              break;
            }
            default: {
              break;
            }
          }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
          // add method to handle Edit actions
        } else if (event.menu.menuItem === 'Topic') {             // handle Topic-Menu Actions
    
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
    
        } else if (event.menu.menuItem === 'Windows') {
          switch (event.action) {
            case '1 Main Menu': {
              break;
            }
          }
        }
      }

      public findBySysCodeType(sysCode: string) {
        this.currentSysCode = sysCode;
        this.systemCodeTokenService.getByCodeType(sysCode).subscribe((systemCodeTokens:SystemCodeToken[])=>{
          this.codeTableMaintenanceForm.patchValue({
            'systemCodeType':this.currentSysCode,
            
          })
          if (systemCodeTokens[0].systemCodeTokenPrimaryKey.languageId===0){this.codeTableMaintenanceForm.patchValue({
            
            languageCode:'AMERI'
            
          })

          }
          this.codeTableMaintenanceForm.get('systemCodeType').disable();

          this.getGridData(systemCodeTokens);
        },
        (error: Error) => {
          console.log('error', error);
          this.alertMessage = this.alertMessageService.error("30135 Code Type Does Not Exist.");
          
        }
        );
        

      }

      getGridData(systemCodeTokens:SystemCodeToken[]){
        
        this.dataGridGridOptions.api.setRowData(systemCodeTokens);
     }
    


    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}
