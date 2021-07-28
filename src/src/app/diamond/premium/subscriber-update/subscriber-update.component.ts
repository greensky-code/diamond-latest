/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, Input, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AgGridEvent, GridOptions } from "ag-grid-community";
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
import {  PmbSetup } from "../../../api-models/pmb-setup.model"
import {  PmbSetupService } from "../../../api-services/pmb-setup.service"
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import { SecWinViewModel } from '../../../view-model/security/sec-win-view-model';
import { SecurityService } from '../../../shared/services/security.service';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {SecUser} from '../../../api-models/security/sec-user.model';
import { SecWin } from '../../../api-models/security/sec-win.model';
import { Menu } from '../../../shared/models/models';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {PremiumBillingSetupComponent} from '../premium-billing-setup/premium-billing-setup.component';
import {MessageMasterDtl} from "../../../api-models";


// Use the Component directive to define the SubscriberUpdateComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'subscriber-update',
    templateUrl: './subscriber-update.component.html',
    styleUrls: ['./subscriber-update.component.css'],
    providers: [
        PmbSetupService,
           ]


})
export class SubscriberUpdateComponent implements OnInit  {

    subscriberUpdateForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = 'SUBSC';
    public isSuperUser = false;
    public secProgress = true;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    public dataGridGridOptions: GridOptions;
    private secUser: SecUser;
    public  menu: Menu[] = [];
    isFormEditMode: boolean;
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
  
    @Input() public showIcon: boolean = false;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;
    rowSelection: string;
    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private modalService: NgbModal,
        private securityService: SecurityService,
         private pmbSetupService: PmbSetupService,
         private secUserService: SecUserService,
        private messageService: MessageMasterDtlService,
        
         ) {
        }

  // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.subscriberUpdateForm);
         this.createDataGrid();
         //populategridvew
         this.getPmbSetups();
         this.menuInit();
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

 editPmbSetup: boolean=true;
    pmbSetup: PmbSetup;
    pmbSetups: PmbSetup[];
    
    
    createPmbSetup() {
        this.formValidation.validateForm();
        if(this.subscriberUpdateForm.valid) {
            let pmbSetup = new PmbSetup();
            pmbSetup.jobId = Form.getValue(this.subscriberUpdateForm, 'jobId');
            pmbSetup.requestUser = Form.getValue(this.subscriberUpdateForm, 'requestUser');
            pmbSetup.requestDate = Form.getValue(this.subscriberUpdateForm, 'requestDate');
            pmbSetup.comments = Form.getValue(this.subscriberUpdateForm, 'comments');
            pmbSetup.action = Form.getValue(this.subscriberUpdateForm, 'action');
            pmbSetup.requestType = Form.getValue(this.subscriberUpdateForm, 'requestType');
            
            this.pmbSetupService.createPmbSetup(pmbSetup).subscribe(response => {
                this.toastr.showToast('Record successfully created', NgbToastType.Success);
                this.editPmbSetup = false;
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
        }
}
    
    
    updatePmbSetup(seqGpbilId : number) {
       if (this.secWin ) {
            
        this.formValidation.validateForm();
        if(this.subscriberUpdateForm.valid) {
            let pmbSetup = this.getFormData(this.pmbSetup);           
             this.pmbSetupService.updatePmbSetup(pmbSetup, seqGpbilId).subscribe(response => {
                 this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                if (this.screenCloseRequest === true) {
                    setTimeout(() => {
                        this.activeModal.close()
                    }, 2000);
                }
                this.isFormDataChangeStatus = false;
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }   
     savePmbSetup() {
       if(this.editPmbSetup) {
            this.updatePmbSetup(this.pmbSetup.seqGpbilId)
      } else {
           this.createPmbSetup();
       }
    }  
      deletePmbSetup(seqGpbilId : number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.pmbSetupService.deletePmbSetup(seqGpbilId).subscribe(response => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            });
       }
    }   
   //get values from form
    getFormData(pmbSetup: PmbSetup): PmbSetup {
        this.subscriberUpdateForm.enable();
        pmbSetup.jobId = this.subscriberUpdateForm.value.jobId;
        pmbSetup.requestUser = this.subscriberUpdateForm.value.requestUser;
        pmbSetup.comments= this.subscriberUpdateForm.value.comments;
        pmbSetup.action = this.subscriberUpdateForm.value.action;
        pmbSetup.requestType = this.subscriberUpdateForm.value.requestType;


       this.subscriberUpdateForm.controls['jobId'].disable();
        return pmbSetup;
     }
    
    // getPmbSetup(seqGpbilId : number) {
    //     this.pmbSetupService.getPmbSetup(seqGpbilId).subscribe(pmbSetup => {
    //         this.pmbSetup = pmbSetup;
    //         this.subscriberUpdateForm.patchValue({
    //             'jobId': this.pmbSetup.jobId,
    //             'requestUser': this.pmbSetup.requestUser,
    //             'date': this.dateFormatPipe.defaultDisplayDateFormat(this.pmbSetup.postDate),
    //             'comments': this.pmbSetup.comments,
    //         });
            
    //     }, error => {
    //         this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
    //     });
    
    // }
    
    setpmbSetup(pmbSetup: PmbSetup) {
        this.subscriberUpdateForm.patchValue({
            'jobId': pmbSetup.jobId,
            'requestUser': pmbSetup.requestUser,
            'requestDate': this.dateFormatPipe.defaultDisplayDateFormat(pmbSetup.requestDate),
            'comments': pmbSetup.comments,           
            'action' : pmbSetup.action,
            'requestType' : pmbSetup.requestType
        }, {emitEvent: false});
        setTimeout(() => {
            this.isFormDataModified()
        }, 2000)
    }
 
    //populate gridview
     getPmbSetups() {        
        this.pmbSetupService.getPmbSetups().subscribe(pmbSetups => {          
        this.pmbSetups=pmbSetups.filter(data=>data.template=="N"&&data.subscFlag=="Y")      
        this.dataGridGridOptions.api.setRowData(this.pmbSetups);
                if (this.pmbSetups.length > 0) {
            this.setpmbSetup(this.pmbSetups[0]);
            this.pmbSetup = this.pmbSetups[0];
            this.dataGridGridOptions.api.selectIndex(0, null, null);
        }        
              });
               
    }
     
     onRowSelected(event) {              
        this.pmbSetup = event.data;       
        this.dataGridGridOptions.api.selectIndex(event.rowIndex, null, null);
        this.setpmbSetup(this.pmbSetup);       
    } 
   
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
             headerName: "Job ID",
             field: "jobId",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Request Date",
             field: "requestDate",
             width: 200         },
         {
             headerName: "Action",
             field: "action",
             width: 200         },
         {
             headerName: "Status",
             field: "status",
             width: 200         }
      ];
      this.rowSelection = 'single';
      
    }
 
    onMenuItemClick(event) {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.createForm();
                    break;
                }
                case 'Open': {
                    break;
                }
                case 'Save': {
                    this.savePmbSetup();
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
        } else if(event.menu.menuItem === 'Topic') {
            this.handleTopicMenu(event.action);
        }
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            case 'GPBIL': {
                const ref = this.modalService.open(PremiumBillingSetupComponent, {
                    size: <any>'xl',
                });
                ref.componentInstance.showIcon = true;
                this.activeModal.close();
                break;
            }
        }
    }

    // initialize dropdown menu
    menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [{name: 'New',}, {name: 'Open',disabled: true}, {name: 'Save'}, {name: 'Close'},
                    {isHorizontal: true}, {name: 'Main Menu...'}, {name: 'Shortcut Menu...'},
                    {isHorizontal: true}, {name: 'Print', disabled: true},
                    {isHorizontal: true}, {name: 'Exit'}]
            },
            {
    
                menuItem: 'Edit',
                dropdownItems: [{name: 'Undo', disabled: true}, {isHorizontal: true}, {name: 'Cut', disabled: true},
                    {name: 'Copy', disabled: true}, {name: 'Paste', disabled: true}]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{name: 'GPBIL'},
                    {name: 'SUBSC', disabled: true}]
            },
             {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            }
        ];
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
       // this.secUserService.getSecUser(userId).subscribe((user: SecUser) => {
         //   this.getSecColDetails(user);
         //   this.userTemplateId = user.dfltTemplate;
         //   this.getSecWin(user.dfltTemplate);
        //});
    }

    private initializePermission(): void {
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

    private initializeComponentState(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.subscriberUpdateForm);
         this.createDataGrid();
    }

 // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.subscriberUpdateForm = this.formBuilder.group({
            jobId: [, {updateOn: 'blur', validators: [] }],
            requestUser: ['', {updateOn: 'blur', validators: [] }],
            requestDate: ['', {updateOn: 'blur', validators: [] }],
            action: ['', {updateOn: 'blur', validators: [Validators.required, Validators.maxLength(1)]}],
            requestType: ['', {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(1)]
            }],
            comments: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    // populate grid with value

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Subscriber Update')
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
                    this.savePmbSetup();
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
        this.subscriberUpdateForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
    
}
