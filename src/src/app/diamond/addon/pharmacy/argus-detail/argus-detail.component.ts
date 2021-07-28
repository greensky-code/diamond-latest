import {Component, Input, OnInit} from '@angular/core';
import {GridOptions} from 'ag-grid-community';
import {CiebPremiumMasterService} from '../../../../api-services/addon/cieb-premium-master.service';
import {CiebGroupMaster, CiebPremiumMaster, GroupMaster, SecWin} from '../../../../api-models';
import {ArgusDetailFields, ArgusDetailFieldsConfig} from '../../addon.constants';
import {DynamicConfigFormRow, FORM_FIELD_ACTION_TYPES, FormField, FormRow, Option} from '../../../../shared/models/models';
import {SecurityService} from '../../../../shared/services/security.service';
import {SecUser} from '../../../../api-models/security/sec-user.model';
import {GroupMasterService, SecUserService} from '../../../../api-services';
import {SecColDetail} from '../../../../api-models/security/sec-col-detail.model';
import {SecWinViewModel} from '../../../../view-model/security/sec-win-view-model';
import {SecColDetailService} from '../../../../api-services/security/sec-col-detail.service';
import {SecWinService} from '../../../../api-services/security/sec-win.service';
import {PopUpMessage, PopUpMessageButton} from '../../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbToastType} from 'ngb-toast';
import {ToastService} from '../../../../shared/services/toast.service';
import {CiebGroupMasterService} from '../../../../api-services/cieb-group-master.service';

@Component({
    selector: 'app-argus-detail',
    templateUrl: './argus-detail.component.html',
    styleUrls: ['./argus-detail.component.css']
})
export class ArgusDetailComponent implements OnInit {


    @Input() groupNumber: string ;  // default value for testing.. TODO need to remove test values
    @Input() groupName: string ;
    @Input() seqGroupId: number ;

    private windowId = 'CIEBRXGM';
    public isSuperUser = false;
    public secProgress = true;
    userTemplateId: string;
    secColDetails = new Array<SecColDetail>();
    inProgress = true;
    secWin: SecWinViewModel;
    rxprimeClientId: any;
    rxPrimeDDL:any =[{key:'T', value:'Yes'},{key:'F', value:'No'},]
    ciebGroupMaster: CiebGroupMaster;
    ciebGroupMasterEdit: boolean = false;


    resetInlineGrid = false;
    saveInlineGrid = false;
    SaveBtnText ="Save Changes";
    restoreBtnText='Reset All'

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private ciebPremiumMasterData: CiebPremiumMaster [] = [];
    argusDetailsConfig = ArgusDetailFieldsConfig;
    argusDetailsConfigFormState = new Array<DynamicConfigFormRow>();
    groupMaster: GroupMaster;


    constructor(private secUserService:SecUserService,
        private securityService:SecurityService,
        private ciebPremiumMasterService: CiebPremiumMasterService,
        private secColDetailService:SecColDetailService,
        private secWinService:SecWinService,
        private modalService:NgbModal,
        private toastService: ToastService,
        private groupMasterService: GroupMasterService,
                private ciebGroupMasterService: CiebGroupMasterService
        ) {
    }

    ngOnInit(): void {
       this.hasPermission();


    }
    initializeComponentState(): void{
        this.argusDetailsConfig.map(field => field.disabled = true);
        this.getCiebPremiumMasters();
        this.getgroupMaster();
        //this.createDataGrid();
    }


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

        if (this.groupNumber) {
            this.groupMasterService.getGroupMasterByGroupId(this.groupNumber).subscribe((groupMaster: GroupMaster) => {
                this.groupMaster = groupMaster;
                this.seqGroupId = groupMaster.seqGroupId ;
            });
        }
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
                        'You are not Permitted to view Pricing Partner',
                        'Pricing Partner Permission'
                    );
                }
            }
        );
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        // ------------------------------ TODO need to change tableName------------------------------------------
        this.secColDetailService
            .findByTableNameAndUserId('PROFSVC_CLAIM_HEADER', secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage(
            'poUpMessageName',
            title,
            message,
            'icon'
        );
        popUpMessage.buttons = [
            new PopUpMessageButton('Cancel', 'Cancel', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }


    getCiebPremiumMasters() {
        this.ciebPremiumMasterService.getCiebPremiumMasterFindBySeqGroupId(this.seqGroupId).subscribe(ciebPremiumMaster => {
            this.ciebPremiumMasterData = ciebPremiumMaster;
           this.populateDynamicForm();
        });
    }

    getgroupMaster() {
        this.ciebGroupMasterService.getCiebGroupMaster(this.seqGroupId).subscribe(response => {
            this.ciebGroupMaster = response;
            this.rxprimeClientId = response.rxprimeClientId
        });
    }

    onRxPrimeClientIdChange($event) {
        this.rxprimeClientId = $event;
        this.ciebGroupMaster.rxprimeClientId = $event;
        this.ciebGroupMasterEdit = true;
    }

    updateGroupMaster(ciebGroupMaster: CiebGroupMaster) {
        this.ciebGroupMasterService.updateCiebGroupMaster(ciebGroupMaster, this.seqGroupId).subscribe(result => {
            this.ciebGroupMasterEdit = false;
        });
    }

    saveArgusDetailsRecords(data: CiebPremiumMaster[]) {
        let self = this ;
        self.ciebPremiumMasterService.updateCiebPremiumMasters(data, this.seqGroupId).subscribe(response => {
                self.toastService.showToast("Record updated successfully.", NgbToastType.Success);
            }, error => {
                self.toastService.showToast('An error occurred while updating record.', NgbToastType.Danger);
            }
        );
    }

    populateDynamicForm() {
        const values = this.ciebPremiumMasterData;
        
        // set dynamic grid dropdown values
        this.argusDetailsConfig.forEach((field: FormField) => {
            field.options = new Array<Option>();

            if (field.name == ArgusDetailFields.RXPRIME) {
                this.ciebPremiumMasterData.forEach(value => {
                    field.options = new Array<Option>();
                    field.options.push(
                        {
                            key: "Yes", value: "T"
                        }
                    );
                    field.options.push(
                        {
                            key: "No", value: "F"
                        }
                    );

                });
            }
        });



        values && values.length > 0 && values.forEach((value: CiebPremiumMaster) => {
            let mockConfig = JSON.parse(JSON.stringify(this.argusDetailsConfig));    // make a copy of original config
            let formState: FormRow = new FormRow();

            mockConfig.forEach((field, index) => {

                mockConfig[index].required=false;
                if (field.name === ArgusDetailFields.EFFECTIVE_DATE) {
                    mockConfig[index].type = 'date';
                    mockConfig[index].value = value.planEffectiveDate;
                } else if (field.name === ArgusDetailFields.END_DATE) {
                    mockConfig[index].type = 'date';
                    mockConfig[index].value = value.planEndDate;
                } else if (field.name === ArgusDetailFields.PLAN) {
                    mockConfig[index].type = 'text';
                    mockConfig[index].value = value.hsdPlancode;
                } else if (field.name === ArgusDetailFields.RXPRIME_ACCOUNT) {
                    field.type = 'text';
                    mockConfig[index].disabled=true;
                    mockConfig[index].value = value.rxprimeAcctNum;
                } else if (field.name === ArgusDetailFields.CLAIM_DIVISION) {
                    field.type = 'text';
                    mockConfig[index].disabled=true;
                    mockConfig[index].value = value.claimDivision;
                } else if (field.name === ArgusDetailFields.POLICY_CODE) {
                    field.type = 'text';
                    mockConfig[index].disabled=true;
                    mockConfig[index].value = value.policyCode;
                } else if (field.name === ArgusDetailFields.RXPRIME) {
                    field.type = 'select';
                    mockConfig[index].disabled=false;
                    mockConfig[index].value = value.rxprimePlancodeFlag; // TODO need to fix mapping of changed on date
                }
            });


            formState.formFields = mockConfig;
            formState.id = {
                data: value
            };
            formState.action = null;
            this.argusDetailsConfigFormState.push(formState);          // add record
        });
        this.argusDetailsConfig.map(field => field.name == ArgusDetailFields.PLAN ? field.required = false : '');  // make required to false for hidden fields


        this.argusDetailsConfig = JSON.parse(JSON.stringify(this.argusDetailsConfig));           // copy actual state to new state for form detection (ngOnChanges) in dynamic-form
        this.argusDetailsConfigFormState = JSON.parse(JSON.stringify(this.argusDetailsConfigFormState));          // copy actual state to new state for form detection (ngOnChanges) in dynamic-form

    }

    saveForm(event){
        this.argusDetailsConfigFormState = event.formState ;
        let eventFields = event.fields;

        if (!this.seqGroupId) {
            this.showPopUp('SeqGroupId is not found', 'Pricing Partner Details');
            return;
        }
        if(this.ciebGroupMasterEdit) {
            this.updateGroupMaster(this.ciebGroupMaster);
        }
       
        


        let apiValues: CiebPremiumMaster[] = [];
        let arrIndexes = [] ;
        this.argusDetailsConfigFormState.forEach((arrValue , index) => {
           if( arrValue.action === FORM_FIELD_ACTION_TYPES.UPDATE ){
                arrIndexes.push(index);
           }
        }) ;
        let updatedRecords: FormRow[] = this.argusDetailsConfigFormState.filter(record => record.action === FORM_FIELD_ACTION_TYPES.UPDATE);

        if (updatedRecords.length > 0) {

            updatedRecords.forEach((preStateRecord: FormRow, index) => {

                let indexOfChange = arrIndexes[index] ;
               // if (preStateRecord.action) {
                    let updatedRecord = eventFields[indexOfChange];
                    const pair = Object.keys(updatedRecord).map(k => ({key: k, value: updatedRecord[k]}));

                    let ciebPremiumMaster: CiebPremiumMaster = preStateRecord.id ? preStateRecord.id.data : new CiebPremiumMaster();

                    let apiValue: CiebPremiumMaster = this.populateFormFields(ciebPremiumMaster, pair, preStateRecord.action);
                    apiValues.push(apiValue);
               // }
            });
        }

                this.saveArgusDetailsRecords(apiValues);
    }


    populateFormFields(ciebPricingAccntCodeModel: CiebPremiumMaster, eventFields: any, action: FORM_FIELD_ACTION_TYPES): CiebPremiumMaster {
        ciebPricingAccntCodeModel.rxprimePlancodeFlag = eventFields[0].value;
        ciebPricingAccntCodeModel.action = action;

        return ciebPricingAccntCodeModel;

    }

}
