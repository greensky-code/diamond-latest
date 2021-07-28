import {Component, Input, OnInit} from '@angular/core';
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
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message/pop-up.message.model';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { DatePickerConfig, DatePickerModel } from '../../../shared/config';
import { Form } from '../../../shared/helpers/form.helper';
import { AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput } from 'ng-keyboard-shortcuts';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  CiebGroupMaster , SecUser  } from '../../../api-models/index'
import {  CiebGroupMasterService } from '../../../api-services/cieb-group-master.service'
import { AlertMessage, AlertMessageService } from '../../../shared/components/alert-message/index'
import { SecWinService } from '../../../api-services/security/sec-win.service';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {SecurityService} from '../../../shared/services/security.service';
import {SecUserService} from '../../../api-services';
import { ViewChild } from '@angular/core';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecColDetailService} from '../../../api-services/security/sec-col-detail.service';
import {SecWin} from '../../../api-models';
import { GroupMasterLookup } from '../../../shared/lookup/group-master-lookup';
import { SearchboxComponent } from '../../../shared/components/searchbox/searchbox.component';
import {  SearchModel } from '../../../shared/models/models';






@Component({
  selector: 'app-other-info',
  templateUrl: './other-info.component.html',
  styleUrls: ['./other-info.component.css']
})
export class OtherInfoComponent implements OnInit {

    @Input() groupNumber = '00008A001';  // default value for testing.. TODO need to remove test values
    @Input() groupName = 'DORIS';
    @Input() seqGroupId = 132;

    otherInfoForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    public datePickerModel = DatePickerModel;
    public secWin: SecWinViewModel;
    private windowId = 'CIEBOINM';
    public isSuperUser = false;
    public secProgress = true;
    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    editCiebGroupMaster: boolean;
    ciebGroupMaster: CiebGroupMaster;
    ciebGroupMasters: CiebGroupMaster[];
    searchModel = new SearchModel('groupmasters/lookup',
    GroupMasterLookup.GROUP_MASTER_ALL,
    GroupMasterLookup.GROUP_MASTER_DEFAULT,
    []);
    defaultIndicator: string ;
    isReset = false ;

    @ViewChild('popUpMesssage', {static: true})  child: PopUpMessageComponent;

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
        private ciebGroupMasterService: CiebGroupMasterService) {
        }


        ngOnInit(): void {
            this.initializePermission();
            this.createForm();
            this.displayMessage = {};
            this.formValidation = new FormValidation(this.otherInfoForm);
            this.createDataGrid();
            this.getCiebGroupMaster(this.seqGroupId);
          }




  private initializePermission(): void {
    const parsedToken = this.securityService.getCurrentUserToken();
    let userId = null;
    if (parsedToken) {
        userId = parsedToken.sub;
    }
    this.secWinService.getSecWin(this.windowId, userId).subscribe((secWin) => {
        this.secWin = new SecWinViewModel(secWin);

        if (this.secWin.hasSelectPermission()) {
            this.initializeComponentState();
        } else {
            this.showPopUp('You are not Permitted to view Group Master', 'Window Error')
        }
    });
}

updateCiebGroupMaster (seqGroupId: number) {
    // if (this.secWin && this.secWin.hasUpdatePermission()) {
    this.formValidation.validateForm();
    if (this.otherInfoForm.valid) {
    let ciebGroupMaster = this.ciebGroupMaster;
    if (this.isReset) {
        this.ciebGroupMaster.igoNgoIndicator = this.defaultIndicator ;
    } else {
        ciebGroupMaster.igoNgoIndicator = Form.getValue(this.otherInfoForm, 'indicator');

    }
    console.log(ciebGroupMaster);

    this.ciebGroupMasterService.updateCiebGroupMaster(ciebGroupMaster, seqGroupId).subscribe(response => {
        this.alertMessage = this.alertMessageService.info('Record successfully updated.');
        this.editCiebGroupMaster = false;
        this.isReset = false ;
    }, error => {
        this.alertMessage = this.alertMessageService.error('An Error occurred while updating record. Please check your entry.');
    });
 } else {
    this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
 }
    //   } else {
    //     this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
    //   }
}

saveCiebGroupMaster() {
    this.editCiebGroupMaster = true ;

    if (this.editCiebGroupMaster) {
        this.updateCiebGroupMaster(this.ciebGroupMaster.seqGroupId);
    } else {
        this.createCiebGroupMaster();
        }
 }

createCiebGroupMaster() {
        this.formValidation.validateForm();
        if (this.otherInfoForm.valid) {
            let ciebGroupMaster = new CiebGroupMaster();
            this.ciebGroupMasterService.createCiebGroupMaster(ciebGroupMaster).subscribe(response => {
                this.alertMessage = this.alertMessageService.info('Record successfully created.');
                this.editCiebGroupMaster = false;
            }, error => {
                this.alertMessage = this.alertMessageService.error('An Error occurred while creating new record. Please check your entry.');
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }

    }








    deleteCiebGroupMaster(seqGroupId: number) {

    if (!(this.secWin && this.secWin.hasDeletePermission())) {
        this.showPopUp('Not permitted to delete', 'Group Master Security');
    } else {
        this.ciebGroupMasterService.deleteCiebGroupMaster(seqGroupId).subscribe(response => {
            this.alertMessage = this.alertMessageService.info('Record successfully deleted.');
        }, error => {
            this.alertMessage = this.alertMessageService.error('An Error occurred while deleting record.');
        });
   }
}

getCiebGroupMaster(seqGroupId) {
    this.ciebGroupMasterService.getCiebGroupMaster(seqGroupId).subscribe(ciebGroupMaster => {
        this.ciebGroupMaster = ciebGroupMaster;
        this.defaultIndicator = ciebGroupMaster.igoNgoIndicator;
        console.log(ciebGroupMaster);
        this.otherInfoForm.patchValue({
            indicator: ciebGroupMaster.igoNgoIndicator
        });
    }, error => {
        this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
    });
}

getCiebGroupMasterByHsd(hsdGroupId) {
    this.ciebGroupMasterService.getCiebGroupMasterByHsdGroupId(hsdGroupId).subscribe(ciebGroupMaster => {
        this.ciebGroupMaster = ciebGroupMaster;
        console.log(ciebGroupMaster);
        this.otherInfoForm.patchValue({
        });
    }, error => {
        this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving record.');
    });
}

tabKeyDown(event) {
    console.log(event);


    if (event.key == 'Tab') {
        let xseqGroupId = event.target.value ;
        console.log(event);
        console.log(xseqGroupId);

        this.getCiebGroupMaster(xseqGroupId);
    } else if (event.key == 'F5') {
        event.preventDefault();
        this.openLookupFieldSearchModel();
    }

}
getCiebGroupMasters() {
    this.ciebGroupMasterService.getCiebGroupMasters().subscribe(ciebGroupMasters => {
    this.ciebGroupMasters = ciebGroupMasters;
    }, error => {
        this.alertMessage = this.alertMessageService.error('An Error occurred while retrieving records.');
    });
}



dataGridGridOptionsExportCsv() {
    let params = {
};
  this.dataGridgridApi.exportDataAsCsv(params);
}


createDataGrid() {
  this.dataGridGridOptions = {
    paginationPageSize: 50
  };
  this.dataGridGridOptions.editType = 'fullRow';
  this.dataGridGridOptions.columnDefs = [
     {
         headerName: 'IGO/NGO Indicator',
         field: 'hsdgroupid',
         width: 200,
         headerCheckboxSelection: true,
         headerCheckboxSelectionFilteredOnly: true,
         checkboxSelection: true
     }
  ];
}

// Use constructor injection to inject an instance of a FormBuilder


// Most initial setup should be done in the ngOnInit() life-cycle hook function
// rather than in the constructor for this class in order to ensure that the
// resources are fully loaded before performing the initial setup processing.


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
        console.log(user);
         this.getSecColDetails(user);
         this.userTemplateId = user.dfltTemplate;
        this.getSecWin(user.dfltTemplate);
    });
}
secColDetails = new Array<SecColDetail>();
inProgress = true;
userTemplateId: string;

getSecColDetails(secUser: SecUser) {
    if (!secUser.sfldlId) {
        this.inProgress = false;
        return;
    }
    this.secColDetailService.findByTableNameAndUserId('DENTAL_CLAIM_HEADER', secUser.userId).subscribe((resp: SecColDetail[]) => {
        this.secColDetails = resp;
        this.inProgress = false;
        this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
    });
}

getSecWin(secUserId: string) {
    this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
        this.secWin = new SecWinViewModel(secWin);
        if (this.secWin.hasSelectPermission()) {
            this.secProgress = false;

            this.initializeComponentState();
        } else {
            this.showPopUp('You are not Permitted to view Tooth History', 'Tooth History Permission')
        }
    }, error => {
        this.secProgress = false;
    });
}

private initializeComponentState(): void {
    this.createForm();
    this.displayMessage = {};
    this.formValidation = new FormValidation(this.otherInfoForm);
     this.createDataGrid();
}

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
// See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
createForm() {
    // FormBuilder.group is a factory method that creates a FormGroup
    // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
    this.otherInfoForm = this.formBuilder.group({
        groupNumber: ['', {updateOn: 'blur', validators: [] }],
        groupName: ['', {updateOn: 'blur', validators: [] }],
        indicator: ['', {updateOn: 'blur', validators: [] }]

    }, {updateOn: 'submit'});
}

resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
}

openLookupFieldSearchModel() {
    let ref = this.modalService.open(SearchboxComponent);
    ref.componentInstance.searchModel = this.searchModel;
    ref.componentInstance.showIcon = true;
    ref.componentInstance.onRowSelected.subscribe((res: any) => {
        this.getCiebGroupMaster(res.seqGroupId);
        console.log(res);
        this.otherInfoForm.patchValue({
            groupNumber: res.groupId ,
            groupName: res.groupName1
        }, {emitEvent : false});
    });
}

resetAll() {
    this.isReset = true ;
    this.updateCiebGroupMaster(this.ciebGroupMaster.seqGroupId);

}

}
