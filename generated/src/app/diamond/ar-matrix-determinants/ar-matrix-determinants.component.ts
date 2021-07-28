/* Copyright (c) 2021 . All Rights Reserved. */

import { Component, OnInit,  ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { GridOptions } from "ag-grid-community";
import { NumberValidators } from '../../shared/validators/number.validator';
import { CustomValidators } from '../../shared/validators/custom-validator';
import { Mask } from '../../shared/pipes/text-format.pipe'
import { FormValidation } from '../../shared/validators/form-validation.pipe'
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe'
import { DatePipe } from '@angular/common';
import { PopUpMessage, PopUpMessageButton } from '../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../shared/config';
import { Form } from '../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  MatrixDetermHeader } from "../../api-models/index"
import {  MatrixDetermHeaderService } from "../../api-services/matrix-determ-header.service"
import {  MatrixDetermX } from "../../api-models/index"
import {  MatrixDetermXService } from "../../api-services/matrix-determ-x.service"
import {  MatrixDetermY } from "../../api-models/index"
import {  MatrixDetermYService } from "../../api-services/matrix-determ-y.service"
import { AlertMessage, AlertMessageService } from '../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';

// Use the Component directive to define the ArMatrixDeterminantsComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'armatrixdeterminants',
    templateUrl: './ar-matrix-determinants.component.html',

})
export class ArMatrixDeterminantsComponent implements OnInit  {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    arMatrixDeterminantsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId: string = '';
    public isSuperUser = false;
    public secProgress = true;

    @ViewChild('popUpMesssage', { static: true }) child: PopUpMessageComponent;

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

editMatrixDetermHeader: boolean;
    matrixDetermHeader: MatrixDetermHeader;
    matrixDetermHeaders: MatrixDetermHeader[];editMatrixDetermX: boolean;
    matrixDetermX: MatrixDetermX;
    matrixDetermXes: MatrixDetermX[];editMatrixDetermY: boolean;
    matrixDetermY: MatrixDetermY;
    matrixDetermYs: MatrixDetermY[];
    if (this.secWin.hasInsertPermission()) {
        createMatrixDetermHeader() {
            this.formValidation.validateForm();
            if(this.arMatrixDeterminantsForm.valid) {
                let matrixDetermHeader = new MatrixDetermHeader();
                matrixDetermHeader.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
                matrixDetermHeader.matrixDescription = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDescription');
                this.matrixDetermHeaderService.createMatrixDetermHeader(matrixDetermHeader).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editMatrixDetermHeader = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateMatrixDetermHeader(matrixDeterminant : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.arMatrixDeterminantsForm.valid) {
            let matrixDetermHeader = new MatrixDetermHeader();
            matrixDetermHeader.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
            matrixDetermHeader.matrixDescription = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDescription');
            this.matrixDetermHeaderService.updateMatrixDetermHeader(matrixDetermHeader, matrixDeterminant).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMatrixDetermHeader = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveMatrixDetermHeader() {
        if(this.editMatrixDetermHeader) {
            this.updateMatrixDetermHeader(this.matrixDetermHeader.matrixDeterminant)
        } else {
            this.createMatrixDetermHeader();
        }
    }    deleteMatrixDetermHeader(matrixDeterminant : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.matrixDetermHeaderService.deleteMatrixDetermHeader(matrixDeterminant).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getMatrixDetermHeader(matrixDeterminant : string) {
        this.matrixDetermHeaderService.getMatrixDetermHeader(matrixDeterminant).subscribe(matrixDetermHeader => {
            this.matrixDetermHeader = matrixDetermHeader;
            this.arMatrixDeterminantsForm.patchValue({
                'matrixDeterminant': this.matrixDetermHeader.matrixDeterminant,
                'matrixDescription': this.matrixDetermHeader.matrixDescription,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMatrixDetermHeaders() {
        this.matrixDetermHeaderService.getMatrixDetermHeaders().subscribe(matrixDetermHeaders => {
        this.matrixDetermHeaders = matrixDetermHeaders;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createMatrixDetermX() {
            this.formValidation.validateForm();
            if(this.arMatrixDeterminantsForm.valid) {
                let matrixDetermX = new MatrixDetermX();
                matrixDetermX.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
                this.matrixDetermXService.createMatrixDetermX(matrixDetermX).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editMatrixDetermX = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateMatrixDetermX(matrixDeterminant : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.arMatrixDeterminantsForm.valid) {
            let matrixDetermX = new MatrixDetermX();
            matrixDetermX.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
            this.matrixDetermXService.updateMatrixDetermX(matrixDetermX, matrixDeterminant).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMatrixDetermX = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveMatrixDetermX() {
        if(this.editMatrixDetermX) {
            this.updateMatrixDetermX(this.matrixDetermX.matrixDeterminant)
        } else {
            this.createMatrixDetermX();
        }
    }    deleteMatrixDetermX(matrixDeterminant : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.matrixDetermXService.deleteMatrixDetermX(matrixDeterminant).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getMatrixDetermX(matrixDeterminant : string) {
        this.matrixDetermXService.getMatrixDetermX(matrixDeterminant).subscribe(matrixDetermX => {
            this.matrixDetermX = matrixDetermX;
            this.arMatrixDeterminantsForm.patchValue({
                'matrixDeterminant': this.matrixDetermX.matrixDeterminant,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMatrixDetermXes() {
        this.matrixDetermXService.getMatrixDetermXes().subscribe(matrixDetermXes => {
        this.matrixDetermXes = matrixDetermXes;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }
    if (this.secWin.hasInsertPermission()) {
        createMatrixDetermY() {
            this.formValidation.validateForm();
            if(this.arMatrixDeterminantsForm.valid) {
                let matrixDetermY = new MatrixDetermY();
                matrixDetermY.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
                this.matrixDetermYService.createMatrixDetermY(matrixDetermY).subscribe(response => {
                    this.alertMessage = this.alertMessageService.info("Record successfully created.");
                    this.editMatrixDetermY = false;
                }, error => {
                    this.alertMessage = this.alertMessageService.error("An Error occurred while creating new record. Please check your entry.");
                });

            } else {
                this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            }
    } else {

    }


    updateMatrixDetermY(matrixDeterminant : string) {
        if (this.secWin && this.secWin.hasUpdatePermission()) {
        this.formValidation.validateForm();
        if(this.arMatrixDeterminantsForm.valid) {
            let matrixDetermY = new MatrixDetermY();
            matrixDetermY.matrixDeterminant = Form.getValue(this.arMatrixDeterminantsForm, 'matrixDeterminant');
            this.matrixDetermYService.updateMatrixDetermY(matrixDetermY, matrixDeterminant).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully updated.");
                this.editMatrixDetermY = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
            });
         } else {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
         }
      } else {
        this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
      }   
    }    saveMatrixDetermY() {
        if(this.editMatrixDetermY) {
            this.updateMatrixDetermY(this.matrixDetermY.matrixDeterminant)
        } else {
            this.createMatrixDetermY();
        }
    }    deleteMatrixDetermY(matrixDeterminant : string) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.matrixDetermYService.deleteMatrixDetermY(matrixDeterminant).subscribe(response => {
                this.alertMessage = this.alertMessageService.info("Record successfully deleted.");
            }, error => {
                this.alertMessage = this.alertMessageService.error("An Error occurred while deleting record.");
            });
       }
    }    getMatrixDetermY(matrixDeterminant : string) {
        this.matrixDetermYService.getMatrixDetermY(matrixDeterminant).subscribe(matrixDetermY => {
            this.matrixDetermY = matrixDetermY;
            this.arMatrixDeterminantsForm.patchValue({
                'matrixDeterminant': this.matrixDetermY.matrixDeterminant,
            });
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving record.");
        });
    }    getMatrixDetermYs() {
        this.matrixDetermYService.getMatrixDetermYs().subscribe(matrixDetermYs => {
        this.matrixDetermYs = matrixDetermYs;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while retrieving records.");
        });
    }

    public dataGrid001GridOptions: GridOptions;
    public dataGrid002GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;

    dataGrid001GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid001gridApi.exportDataAsCsv(params);
    }

    private dataGrid002gridApi: any;
    private dataGrid002gridColumnApi: any;

    dataGrid002GridOptionsExportCsv() {
        var params = {
    };
      this.dataGrid002gridApi.exportDataAsCsv(params);
    }


    createDataGrid001(): void {
      this.dataGrid001GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid001GridOptions.editType = 'fullRow';
      this.dataGrid001GridOptions.columnDefs = [
         {
             headerName: "X Matrix",
             field: "matrixseq",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Description",
             field: "xaxisdescription",
             width: 200         },
         {
             headerName: "Age From",
             field: "agefrom",
             width: 200         },
         {
             headerName: "AgeThrough",
             field: "agethru",
             width: 200         },
         {
             headerName: "Gender",
             field: "gender",
             width: 200         },
         {
             headerName: "Salary From",
             field: "salaryfrom",
             width: 200         },
         {
             headerName: "Salary Thru",
             field: "salarythru",
             width: 200         },
         {
             headerName: "Medicare Status",
             field: "medicarestatus",
             width: 200         },
         {
             headerName: "Rate Type",
             field: "ratetype",
             width: 200         }
      ];
    }
    createDataGrid002(): void {
      this.dataGrid002GridOptions =
      {
        paginationPageSize: 50
      };
      this.dataGrid002GridOptions.editType = 'fullRow';
      this.dataGrid002GridOptions.columnDefs = [
         {
             headerName: "X Matrix",
             field: "matrixseq",
             width: 200,
             headerCheckboxSelection: true,
             headerCheckboxSelectionFilteredOnly: true,
             checkboxSelection: true
         },
         {
             headerName: "Description",
             field: "yaxisdescription",
             width: 200         },
         {
             headerName: "Family Size From",
             field: "familysizefrom",
             width: 200         },
         {
             headerName: "Family Size Through",
             field: "familysizethru",
             width: 200         },
         {
             headerName: "Age From",
             field: "agefrom",
             width: 200         },
         {
             headerName: "Age Thru",
             field: "agethru",
             width: 200         },
         {
             headerName: "Gender",
             field: "gender",
             width: 200         },
         {
             headerName: "Spouse Flag",
             field: "spouseflag",
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
    private modalService: NgbModal,
    private securityService: SecurityService,
     private matrixDetermHeaderService: MatrixDetermHeaderService, private matrixDetermXService: MatrixDetermXService, private matrixDetermYService: MatrixDetermYService) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();

        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.arMatrixDeterminantsForm);
         this.createDataGrid001();
         this.createDataGrid002();
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

    private initializePermission(): void {
        const parsedToken = this.securityService.getCurrentUserToken();
        let useId = null;
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
        this.formValidation = new FormValidation(this.arMatrixDeterminantsForm);
         this.createDataGrid001();
         this.createDataGrid002();
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.arMatrixDeterminantsForm = this.formBuilder.group({
            matrixDeterminant: ['', {updateOn: 'blur', validators: [] }],
            matrixDescription: ['', {updateOn: 'blur', validators: [] }],
            dynamicText001: ['', {updateOn: 'blur', validators: [] }],
            dynamicText002: ['', {updateOn: 'blur', validators: [] }]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }
    
}