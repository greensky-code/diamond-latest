import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {GridOptions} from 'ag-grid-community';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {NgbToastType} from 'ngb-toast';
import {ContactTitleMaster, DddwDtl, MessageMasterDtl, SecUser, VendorAddress} from '../../../api-models';
import {IpaMaster} from '../../../api-models/ipa-master.model';
import {LanguageMaster} from '../../../api-models/language-master.model';
import {ProvMaster} from '../../../api-models/prov-master.model';
import {ProvSpecialty} from '../../../api-models/prov-specialty.model';
import {ProvTypeMaster} from '../../../api-models/prov-type-master.model';
import {SecColDetail} from '../../../api-models/security/sec-col-detail.model';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {
    ContactTitleMasterService,
    MessageMasterDtlService,
    SecUserService,
    VendorAddressService
} from '../../../api-services';
import {IpaMasterService} from '../../../api-services/ipa-master.service';
import {LanguageMasterService} from '../../../api-services/language-master.service';
import {DddwDtlService} from '../../../api-services/dddw-dtl.service';
import {ProvMasterService} from '../../../api-services/prov-master.service';
import {ProvSpecialtyService} from '../../../api-services/prov-specialty.service';
import {ProvTypeMasterService} from '../../../api-services/prov-type-master.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Form} from '../../../shared/helpers/form.helper';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CONSTANTS, getProviderMasterShortcutKeys} from "../../../shared/services/shared.service";
import {SecurityService} from '../../../shared/services/security.service';
import {ToastService} from '../../../shared/services/toast.service';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {Menu, SearchModel} from '../../../shared/models/models';
import {SpecialtyType} from './cell-renderers/speciality-type';
import {PrimarySpeciality} from './cell-renderers/primary-speciality';
import {DirectoryInclude} from './cell-renderers/directory-include';
import {BoardStatus} from './cell-renderers/board-status';
import {FunctionalLevelSecurityService} from '../../../api-services/security/functional-level-security.service';
import {ProviderMasterLookup} from '../../../shared/lookup/provider-master-lookup';
import {SearchboxComponent} from '../../../shared/components/searchbox/searchbox.component';
import {ProviderAddressComponent} from '../provider-address/provider-address.component';
import {ProviderContractsComponent} from '../provider-contracts/provider-contracts.component';
import {ProviderCredentialsComponent} from '../provider-credentials/provider-credentials.component';
import {VendorMasterComponent} from '../../vendor/vendor-master/vendor-master.component';
import {ProviderChangeComponent} from '../../member/provider-change/provider-change.component';
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {VendorMaster} from "../../../api-models/vendor-master";
import {VendorMasterLookup} from "../../../shared/lookup/vendor-master-lookup";
import {VendorMasterService} from "../../../api-services/vendor-master.service";
import {ProviderHelpComponent} from "../provider-help/provider-help.component";

@Component({
    selector: 'app-provider-master',
    templateUrl: './provider-master.component.html',
    styleUrls: ['./provider-master.component.scss'],

    providers: [
        Mask,
        CustomValidators,
        DateFormatPipe,
        ProvMasterService,
        ProvSpecialtyService,
        ProvTypeMasterService,
        ContactTitleMasterService,
        IpaMasterService,
        LanguageMasterService,
        DddwDtlService,
        SecWinService,
        SecurityService,
        FunctionalLevelSecurityService,
        MessageMasterDtlService,
        VendorAddressService,
        VendorMasterService
    ]
})
export class ProviderMasterComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() providerId?: string;
    public providerMasterForm: FormGroup;
    public formValidation: FormValidation;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public secWin: SecWinViewModel;
    public dataGridGridOptions: GridOptions;
    public secColDetails = new Array<SecColDetail>();
    public editProvMaster: boolean;
    public showFields: boolean = false;
    public types: ProvTypeMaster[] = [];
    public licenses: ContactTitleMaster[] = [];
    public salutations: ContactTitleMaster[] = [];
    public ipaMasters: IpaMaster[] = [];
    public languageMasters: LanguageMaster[] = [];
    public provTypeMasters: ProvTypeMaster[] = [];
    public primarySpecialities: DddwDtl[] = [];
    public directoryIncludes: DddwDtl[] = [];
    public boardStatuses: DddwDtl[] = [];
    public shortcuts: ShortcutInput[] = [];
    public menu: Menu[] = [];
    addresses: VendorAddress[] = [];
    defaultVendorAddr: any;
    seqVendAddress: any;
    public selectedDiv: string = 'MASTER';

    private windowId: string = 'PROVF';
    private provMaster: ProvMaster;
    private provMasters: ProvMaster[];
    private editProvSpecialty: boolean;
    private provSpecialty: ProvSpecialty = new ProvSpecialty();
    private provSpecialtys: ProvSpecialty[];
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;
    private dataLoadedMap = new Map<string, boolean>();
    private searchModel = new SearchModel(
        'provmasters/lookup',
        ProviderMasterLookup.PROVIDER_MASTER_ALL,
        ProviderMasterLookup.PROVIDER_MASTER_DEFAULT,
        [],
        true
    );
    vendorIdSearchModel = new SearchModel(
        "vendormasters/lookup",
        VendorMasterLookup.VENDOR_MASTER_ALL,
        VendorMasterLookup.VENDOR_MASTER_DEFAULT,
        []
    );
    userTemplateId: string;
    @Input() showIcon: boolean = false;
    @ViewChild('defaultVendorId') defaultVendorIdEle: ElementRef;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    searchStatus: boolean = false;
    public isSuperUser = false;
    public secProgress = true;
    popupClose: Boolean = false;
    closeStatus: Boolean = true;

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private secWinService: SecWinService,
        private provMasterService: ProvMasterService,
        private provSpecialtyService: ProvSpecialtyService,
        private provTypeMasterService: ProvTypeMasterService,
        private vendorAddressService: VendorAddressService,
        private vendorMasterService: VendorMasterService,
        private contactTitleMasterService: ContactTitleMasterService,
        private ipaMasterService: IpaMasterService,
        private languageMasterService: LanguageMasterService,
        private dddwDtlService: DddwDtlService,
        private securityService: SecurityService,
        private modalService: NgbModal,
        private cdr: ChangeDetectorRef,
        private toastService: ToastService,
        private functionalLevelSecurityService: FunctionalLevelSecurityService,
        private messageService: MessageMasterDtlService,
        private secColDetailService: SecColDetailService,
        private secUserService: SecUserService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.initializePermission();
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.providerMasterForm);
        if(this.providerId){
            setTimeout(() => {
                 this.providerMasterForm.patchValue({
                providerId:this.providerId
            })
            }, 100);
            this.setProviderId(this.providerId.toString());
        } else if(localStorage.getItem('providerId')){
            this.setProviderId(localStorage.getItem("providerId").toString());
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getProviderMasterShortcutKeys(this));
        this.cdr.detectChanges();
    }

    returnDesc(){
        let self = this;
        var index = this.types.findIndex(function(item){ return item.typeOrSpecCode == self.providerMasterForm.value.type})
        return self.types[index]?.description
    }

    public get isDataLoaded(): boolean {
        // @ts-ignore
        for (let [key, value] of this.dataLoadedMap) {
            if (!value) {
                return value;
            }
        }
        return true;
    }


    public onClickDiv(selectedDiv: string) {
        this.selectedDiv = selectedDiv;
    }

    onCellValueChanged(event) {
        console.log('Data after change is', event.data);
    }

    onGridReady(params) {

    }

    public addNewData() {
        if (this.secWin && !this.secWin.hasInsertPermission()) {
            return;
        }
        if (this.selectedDiv == 'MASTER') {
            this.resetFrom();
        } else {
            this.insertNewData();
        }
    }

    private initializePermission(): void {
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
                        "You are not Permitted to view Procedure Code Screen",
                        "Procedure Code Permission"
                    );
                }
            }
        );
    }

    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService
            .findByTableNameAndUserId("PROVIDER MASTER", secUser.userId)
            .subscribe((resp: SecColDetail[]) => {
                this.secColDetails = resp;
                this.secProgress = false;
                this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
            });
    }


    private initializeComponentState(): void {
        this.menuInit();
        this.createDataGrid();
        this.getProvTypes();
        this.getLicenses();
        this.getSalutations();
        this.getIpaMasters();
        this.getLanguages();
        this.getProvTypeMasters();
        this.getPrimarySpecialities();
        this.getDirectoryIncludes();
        this.getBoardStatuses();
    }

    private setProviderId(id: string){
        this.providerMasterForm.patchValue({
            'providerId': id.toUpperCase()
        });
        this.findByProviderId(id.toUpperCase());
    }

    public onLookupFieldProvId(event: any, id: string) {
        if (id && event.key === 'Tab') {
            event.preventDefault();
            this.setProviderId(id);
        } else if (event.key === 'Tab') {
            // id = Math.floor(1000 + Math.random() * 9000) + "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
            const lengthOfCode = 4;
            id = this.makeRandom(lengthOfCode, possible);
            this.findByProviderId(id.toUpperCase());
        } else if (event.key === 'F5') {
            event.preventDefault();
            this.openLookupFieldSearchModel();
        }
    }

    makeRandom(lengthOfCode: number, possible: string) {
        let text = "";
        for (let i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    private findByProviderId(providerId: string) {
        this.provMasterService.findByProviderId(providerId).subscribe((provMaster: ProvMaster) => {
            if (provMaster) {
                this.patchPorviderMasterDetail(provMaster);
                this.showFields = true;
                this.editProvMaster = true;
                this.getProvSpecialtysBySeqProvId(provMaster.seqProvId);
                this.searchStatus = true;
            } else {
                let popMsg = new PopUpMessage('ProvNotExistPopup', 'Provider Master', '8075: Entered Provider ID does not exist. Press Yes to create a new Provider ID.', 'icon');
                popMsg.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
                let ref = this.modalService.open(PopUpMessageComponent, {size: 'lg'});
                ref.componentInstance.popupMessage = popMsg;
                ref.componentInstance.showIcon = true;
                ref.componentInstance['buttonclickEvent'].subscribe((button: PopUpMessageButton) => {
                    this.editProvMaster = false;
                    if (button.name === 'yes') {
                        this.showFields = true;
                        this.providerMasterForm.patchValue({
                            'providerId': providerId
                        });
                        this.providerMasterForm.get('providerId').disable();
                    } else {
                        this.showFields = false;
                    }
                });
                this.searchStatus = false;
                this.dataGridGridOptions.api.setRowData([]);

            }
        }, (error: Error) => {
            this.searchStatus = false;
            this.dataGridGridOptions.api.setRowData([]);
            console.log('error', error);
        });
    }

    private openLookupFieldSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.searchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res != null) {
                this.providerMasterForm.patchValue({
                    'providerId': res.PROVIDER_ID
                });
                this.findByProviderId(res.PROVIDER_ID);
            }
        });
    }

    private patchPorviderMasterDetail(provMaster: ProvMaster): void {
        this.provMaster = provMaster;
        this.providerMasterForm.patchValue({
            'dynamicText': this.provMaster.shortName,
            'institutional': this.provMaster.providerCategory == 'Y',
            'lastNm': this.provMaster.lastName,
            'firstNm': this.provMaster.firstName,
            'mi': this.provMaster.middleInitial,
            'shortName': this.provMaster.shortName,
            'type': this.provMaster.providerType,
            'salutation': this.provMaster.salutation,
            'license': this.provMaster.license,
            'xrefId': this.provMaster.seqProvXrefId,
            'userId1': this.provMaster.userId1,
            'userId2': this.provMaster.userId2,
            'userId3': this.provMaster.userId3,
            'nationalProviderId': this.provMaster.nationalProviderId,
            'nonSpecificProv': this.provMaster.nonSpecificProv == 'Y',
            'dateOfBirth': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.dateOfBirth),
            'language1': this.provMaster.language1,
            'language2': this.provMaster.language2,
            'language3': this.provMaster.language3,
            'defaultIpaId': this.provMaster.ipaId,
            'authClass': this.provMaster.authClass,
            'seqVendId': (this.provMaster.vendorMaster ? this.provMaster.vendorMaster.seqVendId : ''),
            'seqVendAddress': (this.provMaster.vendorAddress ? this.provMaster.vendorAddress.seqVendAddress : ''),
            'defaultVendorId': (this.provMaster.vendorMaster ? this.provMaster.vendorMaster.vendorId : ''),
            'defaultVendorAddr': (this.provMaster.vendorAddress ? this.provMaster.vendorAddress.seqVendAddress : ''),
            'maxEnrollLmt': this.provMaster.maxEnrollLmt,
            'accessProgramEligable': this.provMaster.accessProgramEligible == 'Y',
            'userDefDate': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.userDefinedDate),
            'userDefDate2': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.userDefinedDate2),
            'userDefDate3': this.dateFormatPipe.defaultDisplayDateFormat(this.provMaster.userDefinedDate3),
            'wcVindrNo': this.provMaster.userDefined1,
            'rushEob': this.provMaster.userDefined2,
            'userDefined3': this.provMaster.userDefined3,
            'userDefined4': this.provMaster.userDefined4,
            'pymtCur': this.provMaster.userDefined5,
            'userDefined6': this.provMaster.userDefined6,
            'userDefined7': this.provMaster.userDefined7,
            'userDefined8': this.provMaster.userDefined8,
            'userDefined9': this.provMaster.userDefined9,
            'userDefined10': this.provMaster.userDefined10,
            'userDefined11': this.provMaster.userDefined11,
            'userDefined12': this.provMaster.userDefined12,
        }, {emitEvent: false});
        if (this.provMaster.vendorMaster && this.provMaster.vendorMaster.vendorId) {
            this.findVendorMasterByVendorId(this.provMaster.vendorMaster.vendorId);
            this.getVendorAddress(this.provMaster.vendorMaster.seqVendId);
        }
        this.providerMasterForm.get('providerId').disable();
        setTimeout(() => {
            this.formValueChangedStatus();
        }, 2000)
    }

    public popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    private showPopUp(message: string, title: string) {
        this.popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
    }

    private popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log("button yes has been click!");
        }
        if (button.name == 'no') {
            console.log("button No has been click!");
        }
    }

    public saveProvMaster() {
        if (!this.secWin || !this.secWin.hasUpdatePermission()) {
            this.showPopUp('You are not permitted to update Group Master ', 'Group Master Permissions');
            return;
        }
        if (this.editProvMaster) {
            this.updateProvMaster(this.provMaster.seqProvId)
        } else {
            this.createProvMaster();
        }
    }

    private createProvMaster() {
        this.formValidation.validateForm();
        if (!this.providerMasterForm.valid) {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            return;
        }
        let provMaster = new ProvMaster();
        provMaster.providerId = Form.getValue(this.providerMasterForm, 'providerId');
        provMaster.providerCategory = Form.getValue(this.providerMasterForm, 'institutional') == true ? 'Y' : 'N';
        provMaster.lastName = Form.getValue(this.providerMasterForm, 'lastNm');
        provMaster.firstName = Form.getValue(this.providerMasterForm, 'firstNm');
        provMaster.middleInitial = Form.getValue(this.providerMasterForm, 'mi');
        provMaster.shortName = Form.getValue(this.providerMasterForm, 'shortName');
        provMaster.providerType = Form.getValue(this.providerMasterForm, 'type');
        provMaster.salutation = Form.getValue(this.providerMasterForm, 'salutation');
        provMaster.license = Form.getValue(this.providerMasterForm, 'license');
        provMaster.seqProvXrefId = Form.getValue(this.providerMasterForm, 'xrefId');
        provMaster.userId1 = Form.getValue(this.providerMasterForm, 'userId1');
        provMaster.userId2 = Form.getValue(this.providerMasterForm, 'userId2');
        provMaster.userId3 = Form.getValue(this.providerMasterForm, 'userId3');
        provMaster.nationalProviderId = Form.getValue(this.providerMasterForm, 'nationalProviderId');
        provMaster.nonSpecificProv = Form.getValue(this.providerMasterForm, 'nonSpecificProv') == true ? 'Y' : 'N';
        provMaster.dateOfBirth = Form.getDatePickerValue(this.providerMasterForm, 'dateOfBirth');
        provMaster.language1 = Form.getValue(this.providerMasterForm, 'language1');
        provMaster.language2 = Form.getValue(this.providerMasterForm, 'language2');
        provMaster.language3 = Form.getValue(this.providerMasterForm, 'language3');
        provMaster.ipaId = Form.getValue(this.providerMasterForm, 'defaultIpaId');
        provMaster.authClass = Form.getValue(this.providerMasterForm, 'authClass');
        provMaster.seqVendId = Form.getValue(this.providerMasterForm, 'seqVendId');
        provMaster.seqVendAddress = Form.getValue(this.providerMasterForm, 'seqVendAddress');
        provMaster.maxEnrollLmt = Form.getValue(this.providerMasterForm, 'maxEnrollLmt');
        provMaster.accessProgramEligible = Form.getValue(this.providerMasterForm, 'accessProgramEligable') == true ? 'Y' : 'N';
        provMaster.userDefinedDate = Form.getDatePickerValue(this.providerMasterForm, 'userDefDate');
        provMaster.userDefinedDate2 = Form.getDatePickerValue(this.providerMasterForm, 'userDefDate2');
        provMaster.userDefinedDate3 = Form.getDatePickerValue(this.providerMasterForm, 'userDefDate3');
        provMaster.userDefined1 = Form.getValue(this.providerMasterForm, 'wcVindrNo');
        provMaster.userDefined2 = Form.getValue(this.providerMasterForm, 'rushEob');
        provMaster.userDefined3 = Form.getValue(this.providerMasterForm, 'userDefined3');
        provMaster.userDefined4 = Form.getValue(this.providerMasterForm, 'userDefined4');
        provMaster.userDefined5 = Form.getValue(this.providerMasterForm, 'pymtCur');
        provMaster.userDefined6 = Form.getValue(this.providerMasterForm, 'userDefined6');
        provMaster.userDefined7 = Form.getValue(this.providerMasterForm, 'userDefined7');
        provMaster.userDefined8 = Form.getValue(this.providerMasterForm, 'userDefined8');
        provMaster.userDefined9 = Form.getValue(this.providerMasterForm, 'userDefined9');
        provMaster.userDefined10 = Form.getValue(this.providerMasterForm, 'userDefined10');
        provMaster.userDefined11 = Form.getValue(this.providerMasterForm, 'userDefined11');
        provMaster.userDefined12 = Form.getValue(this.providerMasterForm, 'userDefined12');
        this.provMasterService.createProvMaster(provMaster).subscribe((response: ProvMaster) => {
            this.toastService.showToast('Record successfully created', NgbToastType.Success);
            this.provMaster = response;
            if (this.saveProvSpeciality(provMaster.seqProvId)) {
                this.findByProviderId(provMaster.providerId);
            }
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close();
                }, 2000)
            }
            this.popupClose = false;
            this.editProvMaster = true;
        });
    }

    modalClose = () => {
        this.closeStatus = true;
        if (this.popupClose === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Provider Master')
            })
        } else {
            this.activeModal.close();
			localStorage.removeItem('providerId')
        }
    };


    popupAlert = (message: string, title: string) => {
        try{
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
                    this.saveProvMaster()
                }
                else if(resp.name === 'No') {
                    if (this.closeStatus === true) {
                        this.activeModal.close();
                    }
                }
            })
        }
        catch (e) {
            console.log(e);
        }
    };

    private updateProvMaster(seqProvId: number) {

        this.formValidation.validateForm();
        if (!this.providerMasterForm.valid) {
            this.alertMessage = this.alertMessageService.error("Some required information is missing or incomplete. Please correct your entries and try again.");
            return;
        }
        let provMaster = new ProvMaster();
        provMaster.seqProvId = seqProvId;
        provMaster.providerId = Form.getValue(this.providerMasterForm, 'providerId');
        provMaster.providerCategory = Form.getValue(this.providerMasterForm, 'institutional') == true ? 'Y' : 'N';
        provMaster.lastName = Form.getValue(this.providerMasterForm, 'lastNm');
        provMaster.firstName = Form.getValue(this.providerMasterForm, 'firstNm');
        provMaster.middleInitial = Form.getValue(this.providerMasterForm, 'mi');
        provMaster.shortName = Form.getValue(this.providerMasterForm, 'shortName');
        provMaster.providerType = Form.getValue(this.providerMasterForm, 'type');
        provMaster.salutation = Form.getValue(this.providerMasterForm, 'salutation');
        provMaster.license = Form.getValue(this.providerMasterForm, 'license');
        provMaster.seqProvXrefId = Form.getValue(this.providerMasterForm, 'xrefId');
        provMaster.userId1 = Form.getValue(this.providerMasterForm, 'userId1');
        provMaster.userId2 = Form.getValue(this.providerMasterForm, 'userId2');
        provMaster.userId3 = Form.getValue(this.providerMasterForm, 'userId3');
        provMaster.nationalProviderId = Form.getValue(this.providerMasterForm, 'nationalProviderId');
        provMaster.nonSpecificProv = Form.getValue(this.providerMasterForm, 'nonSpecificProv') == true ? 'Y' : 'N';
        provMaster.dateOfBirth = Form.getDatePickerValue(this.providerMasterForm, 'dateOfBirth');
        provMaster.language1 = Form.getValue(this.providerMasterForm, 'language1');
        provMaster.language2 = Form.getValue(this.providerMasterForm, 'language2');
        provMaster.language3 = Form.getValue(this.providerMasterForm, 'language3');
        provMaster.ipaId = Form.getValue(this.providerMasterForm, 'defaultIpaId');
        provMaster.authClass = Form.getValue(this.providerMasterForm, 'authClass');
        provMaster.seqVendId = Form.getValue(this.providerMasterForm, 'seqVendId');
        provMaster.seqVendAddress = Form.getValue(this.providerMasterForm, 'seqVendAddress');
        provMaster.maxEnrollLmt = Form.getValue(this.providerMasterForm, 'maxEnrollLmt');
        provMaster.accessProgramEligible = Form.getValue(this.providerMasterForm, 'accessProgramEligable') == true ? 'Y' : 'N';
        provMaster.userDefinedDate = Form.getDatePickerValue(this.providerMasterForm, 'userDefDate');
        provMaster.userDefinedDate2 = Form.getDatePickerValue(this.providerMasterForm, 'userDefDate2');
        provMaster.userDefinedDate3 = Form.getDatePickerValue(this.providerMasterForm, 'userDefDate3');
        provMaster.userDefined1 = Form.getValue(this.providerMasterForm, 'wcVindrNo');
        provMaster.userDefined2 = Form.getValue(this.providerMasterForm, 'rushEob');
        provMaster.userDefined3 = Form.getValue(this.providerMasterForm, 'userDefined3');
        provMaster.userDefined4 = Form.getValue(this.providerMasterForm, 'userDefined4');
        provMaster.userDefined5 = Form.getValue(this.providerMasterForm, 'pymtCur');
        provMaster.userDefined6 = Form.getValue(this.providerMasterForm, 'userDefined6');
        provMaster.userDefined7 = Form.getValue(this.providerMasterForm, 'userDefined7');
        provMaster.userDefined8 = Form.getValue(this.providerMasterForm, 'userDefined8');
        provMaster.userDefined9 = Form.getValue(this.providerMasterForm, 'userDefined9');
        provMaster.userDefined10 = Form.getValue(this.providerMasterForm, 'userDefined10');
        provMaster.userDefined11 = Form.getValue(this.providerMasterForm, 'userDefined11');
        provMaster.userDefined12 = Form.getValue(this.providerMasterForm, 'userDefined12');
        this.provMasterService.updateProvMaster(provMaster, seqProvId).subscribe(response => {
            this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            this.provMaster = provMaster;
            if (this.saveProvSpeciality(provMaster.seqProvId)) {
                this.findByProviderId(provMaster.providerId);
            }
            if (this.closeStatus === true) {
                setTimeout(() => {
                    this.activeModal.close();
                }, 2000)
            }
            this.popupClose = false;
        }, error => {
            this.alertMessage = this.alertMessageService.error("An Error occurred while updating record. Please check your entry.");
        });
    }

    private deleteProvMaster(seqProvId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provMasterService.deleteProvMaster(seqProvId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    showEditConfirmation() {
        const buttons = [
            new PopUpMessageButton('Save', 'Save', 'btn btn-info'),
            new PopUpMessageButton('Okay', 'Ok', 'btn btn-primary')
        ];
        const popUpMessage = new PopUpMessage('editConfirmation', 'Warning!', 'Data has been modified.', 'icon', buttons, MessageType.WARNING);
        const ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.buttonclickEvent.subscribe(result => {
            if (result && result.name) {
                if (result.name === 'Save') {
                    this.saveProvMaster();
                } else {
                    this.providerMasterForm.reset();
                }
            }
        });
    }

    public onMenuItemClick(event: any): void {
        if (event.menu.menuItem === 'File') {             // handle File actions
            switch (event.action) {
                case 'New': {
                    this.addNewData();
                    break;
                }
                case 'Open': {
                    if (this.providerMasterForm.value.providerId) {
                        this.findByProviderId(this.providerMasterForm.value.providerId.toUpperCase());
                    }
                    break;
                }
                case 'Save': {
                    this.saveProvMaster();
                    break;
                }
                case 'Close': {
                    if (this.providerMasterForm.dirty) {
                        this.showEditConfirmation();
                    } else {
                        this.providerMasterForm.reset();
                    }
                    break;
                }
                case 'Shortcut Menu': {

                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Edit') {             // handle Edit-Menu Actions
            this.handleEditMenu(event.action);
        } else if (event.menu.menuItem === 'Special') {             // handle special-Menu Actions
            switch (event.action) {
                case 'Provider Id Change': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_PROV_ID_CHG);
                    if (status) {
                        if (this.searchStatus) {
                            const ref = this.modalService.open(ProviderChangeComponent, {
                                size: <any>'xl',
                            });
                            ref.componentInstance.showIcon = true;
                        } else {
                            this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageService.findByMessageId(6193).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error("6193: " + message[0].messageText);
                        });
                    }
                    break;
                }
                case 'Vendor Add': {
                    let status = this.functionalLevelSecurityService.isFunctionIdNameExist(CONSTANTS.F_VEND_ADD);
                    if (status) {
                        if (this.searchStatus) {
                            const ref = this.modalService.open(VendorMasterComponent, {size: <any>'xl',});
                            ref.componentInstance.showIcon = true;
                            ref.componentInstance.vid = null;
                        } else {
                            this.messageService.findByMessageId(7136).subscribe((message: MessageMasterDtl[]) => {
                                this.alertMessage = this.alertMessageService.error("7136: " + message[0].messageText);
                            });
                        }
                    } else {
                        this.messageService.findByMessageId(11073).subscribe((message: MessageMasterDtl[]) => {
                            this.alertMessage = this.alertMessageService.error("11073: " + message[0].messageText);
                        });
                    }
                    break;
                }
                case 'Provider Master Lookup': {
                    this.openLookupFieldSearchModel();
                    break;
                }
                default: {
                    this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                    break;
                }
            }
        } else if (event.menu.menuItem === 'Topic') {// handle special-Menu Actions
            this.handleTopicMenu(event.action);

        } else if (event.menu.menuItem === 'Windows') {
            // add method
        } else if (event.menu.menuItem === 'Help') {
            /**
             * Open help modal
             */
            this.handleHelpMenu();
        }
    }

    /**
     * Handle Menu Actions for Special
     * @param action: string
     */
    private handleEditMenu(action: string) {
        switch (action) {
            case 'Lookup': {
                this.openLookupFieldSearchModel();
                break;
            }
            default: {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
        }
    }

    private handleTopicMenu(action: string) {
        switch (action) {
            case "Addresses": {
                const ref = this.modalService.open(ProviderAddressComponent, {size: <any>'xl',});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = this.provMaster.providerId;
                break;
            }
            case "Contracts": {
                const ref = this.modalService.open(ProviderContractsComponent, {size: <any>'xl',});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = this.provMaster.providerId;
                break;
            }
            case "Credentials": {
                const ref = this.modalService.open(ProviderCredentialsComponent, {size: <any>'xl',});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.providerId = this.provMaster.providerId;
                break;
            }
            case "Privileges": {
                this.toastService.showToast('This option is not implemented yet', NgbToastType.Danger);
                break;
            }
            default: {
                this.toastService.showToast('Action is not valid', NgbToastType.Danger);
                break;
            }
        }
    }

    /**
     * Initialize menu
     */
    private menuInit(): void {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S',  disabled: !(this.isSuperUser || (this.secWin && this.secWin.hasInsertPermission()))},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'}]
            },
            {
                menuItem: 'Topic',
                dropdownItems: [{name: 'Master File'}, {name: 'Addresses'}, {name: 'Contracts'},
                    {name: 'Credentials'}, {name: 'Privileges'}, {name: 'Entrollment'}]
            },
            {
                menuItem: 'Special',
                dropdownItems: [
                    {name: 'Provider Master Lookup', shortcutKey: 'Ctrl+M'},
                    {name: 'Vendor Add', shortcutKey: 'Ctrl+E'},
                    {name: 'Provider Id Change', shortcutKey: 'Ctrl+I'}]
            }, {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4'}
                ]
            }, {
                menuItem: 'Windows',
                dropdownItems: [
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Provider Master'}
                ]
            }, {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ];
    }

    private deleteProvSpecialty(seqProvId: number) {
        if (!(this.secWin && this.secWin.hasDeletePermission())) {
            this.showPopUp('Not permitted to delete', 'Group Master Security');
        } else {
            this.provSpecialtyService.deleteProvSpecialty(seqProvId).subscribe(response => {
                this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
            });
        }
    }

    private getProvSpecialtysBySeqProvId(seqProvId: number) {
        this.provSpecialty.seqProvId = seqProvId;
        this.provSpecialty.specialtyType = null;
        this.provSpecialty.primarySpecialty = 'N';
        this.provSpecialty.directoryInclude = 'N';
        let dummyObject = [{
            specialtyType: "Specialty Type",
            primarySpecialty: "Primary",
            directoryInclude: "Directory Incl",
            boardStatus: "Board Status",
        }];
        this.provSpecialtyService.getProvSpecialtysBySeqProvId(seqProvId).subscribe(provSpecialtys => {
            this.provSpecialtys = provSpecialtys;
            this.dataGridGridOptions.api.setRowData(this.provSpecialtys);
        }, error => {
            this.dataGridGridOptions.api.setRowData([]);
        });
    }

    private createDataGrid(): void {
        this.dataGridGridOptions = {
            context: {
                componentParent: this
            },
            paginationPageSize: 50
        };
        this.dataGridGridOptions.editType = 'fullRow';
        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Specialty Type",
                field: "specialtyType",
                flex: 2,
                headerClass: 'clr-blue',
                cellRendererFramework: SpecialtyType
            },
            {
                headerName: "Primary",
                field: "primarySpecialty",
                flex: 1,
                headerClass: 'clr-blue',
                cellRendererFramework: PrimarySpeciality
            },
            {
                headerName: "Directory Incl",
                field: "directoryInclude",
                flex: 1,
                cellRendererFramework: DirectoryInclude
            },
            {
                headerName: "Board Status",
                field: "boardStatus",
                flex: 1,
                cellRendererFramework: BoardStatus
            }
        ];
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    private createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.providerMasterForm = this.formBuilder.group({
            providerId: ['', {validators: [Validators.compose([Validators.required, Validators.maxLength(12)])]}],
            dynamicText: ['', {validators: []}],
            institutional: [false, {validators: [Validators.required]}],
            lastNm: ['', {validators: [Validators.maxLength(40)]}],
            firstNm: ['', {validators: [Validators.maxLength(30)]}],
            mi: ['', {validators: [Validators.maxLength(1)]}],
            shortName: ['', {validators: [Validators.compose([Validators.required, Validators.maxLength(15)])]}],
            type: ['', {validators: [Validators.compose([Validators.required, Validators.maxLength(6)])]}],
            salutation: ['', {validators: [Validators.maxLength(5)]}],
            license: ['', {validators: [Validators.maxLength(5)]}],
            xrefId: ['', {validators: []}],
            userId1: ['', {validators: [Validators.maxLength(15)]}],
            nationalProviderId: ['', {validators: [Validators.maxLength(10)]}],
            userId2: ['', {validators: [Validators.maxLength(15)]}],
            userId3: ['', {validators: [Validators.maxLength(15)]}],
            nonSpecificProv: ['', {validators: [Validators.maxLength(1)]}],
            dateOfBirth: ['', {validators: []}],
            language1: ['', {validators: [Validators.maxLength(5)]}],
            defaultIpaId: ['', {validators: [Validators.maxLength(3)]}],
            authClass: ['', {validators: [Validators.maxLength(3)]}],
            language2: ['', {validators: [Validators.maxLength(5)]}],
            defaultVendorId: ['', {validators: [Validators.required]}],
            defaultVendorAddr: ['', {validators: [Validators.required]}],
            seqVendId: ['', {validators: []}],
            seqVendAddress: ['', {validators: []}],
            language3: ['', {validators: [Validators.maxLength(5)]}],
            maxEnrollLmt: ['', {validators: []}],
            accessProgramEligable: [false, {validators: []}],
            userDefDate: ['', {validators: []}],
            pymtCur: ['', {validators: [Validators.maxLength(15)]}], //userDefined5
            userDefDate2: ['', {validators: []}],
            wcVindrNo: ['', {validators: [Validators.maxLength(15)]}], //userDefined1
            userDefined6: ['', {validators: [Validators.maxLength(15)]}],
            userDefined10: ['', {validators: [Validators.maxLength(15)]}],
            rushEob: ['', {validators: [Validators.maxLength(15)]}], //userDefined2
            userDefined7: ['', {validators: [Validators.maxLength(15)]}],
            userDefined11: ['', {validators: [Validators.maxLength(15)]}],
            userDefined3: ['', {validators: [Validators.maxLength(15)]}],
            userDefined8: ['', {validators: [Validators.maxLength(15)]}],
            userDefined12: ['', {validators: [Validators.maxLength(15)]}],
            userDefined4: ['', {validators: [Validators.maxLength(15)]}],
            userDefined9: ['', {validators: [Validators.maxLength(15)]}],
            userDefDate3: ['', {validators: []}]
        });

    }

    private resetFrom() {
        this.providerMasterForm.get('providerId').enable();
        this.providerMasterForm.reset();
        this.dataGridGridOptions.api.setRowData([]);
        this.editProvMaster = false;
        this.showFields = false;
    }

    private insertNewData() {
        let isInvalid = false;
        this.dataGridGridOptions.api.forEachNode(function (node) {
            let rowData: ProvSpecialty = node.data;
            if (rowData.specialtyType == null || rowData.specialtyType == undefined) {
                isInvalid = true;
                return;
            }
        });
        if (isInvalid) {
            this.showErrorPopUp('requiredSpecialtyType', 'Provider Master', '29032: Speciality type is a required field. Enter something other than blanks.', 'icon');
            return;
        }
        const newItems = [JSON.parse(JSON.stringify(this.provSpecialty))];
        this.dataGridGridOptions.api.applyTransaction({
            add: newItems,
            addIndex: -1,
        });
    }

    private getProvTypes(): void {
        this.dataLoadedMap.set('PROVTYPES', false);
        this.provTypeMasterService.getProvTypeMasterByTypeOrSpecialty('T').subscribe(provTypes => {
            this.dataLoadedMap.set('PROVTYPES', true);
            this.types = provTypes;
        }, error => {
            this.dataLoadedMap.set('PROVTYPES', true);
        });
    }

    private getProvTypeMasters(): void {
        this.dataLoadedMap.set('PROVTYPEMASTERS', false);
        this.provTypeMasterService.getProvTypeMasters().subscribe(provTypeMasters => {
            this.dataLoadedMap.set('PROVTYPEMASTERS', true);
            this.provTypeMasters = provTypeMasters;
        }, error => {
            this.dataLoadedMap.set('PROVTYPEMASTERS', true);

        });
    }

    private getLicenses(): void {
        this.dataLoadedMap.set('LICENSES', false);
        this.contactTitleMasterService.getContactTitleMastersByTitleType('L').subscribe(contactTitleMasters => {
            this.dataLoadedMap.set('LICENSES', true);
            this.licenses = contactTitleMasters;
        }, error => {
            this.dataLoadedMap.set('LICENSES', true);
        });
    }

    private getSalutations(): void {
        this.dataLoadedMap.set('SALUTATIONS', false);
        this.contactTitleMasterService.getContactTitleMastersByTitleType('S').subscribe(contactTitleMasters => {
            this.dataLoadedMap.set('SALUTATIONS', true);
            this.salutations = contactTitleMasters;
        }, error => {
            this.dataLoadedMap.set('SALUTATIONS', true);
        });
    }

    private getIpaMasters(): void {
        this.dataLoadedMap.set('IPAMASTERS', false);
        this.ipaMasterService.getIpaMasters().subscribe(ipaMasters => {
            this.dataLoadedMap.set('IPAMASTERS', true);
            this.ipaMasters = ipaMasters ? ipaMasters : [];
        }, error => {
            this.dataLoadedMap.set('IPAMASTERS', true);
        });
    }

    private getLanguages(): void {
        this.dataLoadedMap.set('LANGUAGES', false);
        this.languageMasterService.getLanguageMasters().subscribe(languageMasters => {
            this.dataLoadedMap.set('LANGUAGES', true);
            this.languageMasters = languageMasters ? languageMasters : [];
        }, error => {
            this.dataLoadedMap.set('LANGUAGES', true);
        });
    }

    private getPrimarySpecialities() {
        this.dataLoadedMap.set('PRIMARYSPEC', false);
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.PRIMARY_SPECIALTY, CONSTANTS.DW_PROVF_SPEC_DE).subscribe(resp => {
            this.dataLoadedMap.set('PRIMARYSPEC', true);
            this.primarySpecialities = resp;
        }, error => {
            this.dataLoadedMap.set('PRIMARYSPEC', true);
        });
    }

    private getDirectoryIncludes() {
        this.dataLoadedMap.set('DIRECTORYINCL', false);
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.DIRECTORY_INCLUDE, CONSTANTS.DW_PROVF_SPEC_DE).subscribe(resp => {
            this.dataLoadedMap.set('DIRECTORYINCL', true);
            this.directoryIncludes = resp;
        }, error => {
            this.dataLoadedMap.set('DIRECTORYINCL', true);
        });
    }

    private getBoardStatuses() {
        this.dataLoadedMap.set('BOARDSTATUS', false);
        this.dddwDtlService.findByColumnNameAndDwname(CONSTANTS.BOARD_STATUS, CONSTANTS.DW_PROVF_SPEC_DE).subscribe(resp => {
            this.dataLoadedMap.set('BOARDSTATUS', true);
            this.boardStatuses = resp;
        }, error => {
            this.dataLoadedMap.set('BOARDSTATUS', true);
        });
    }

    private displaySaveError(error: string) {
        let ref = this.modalService.open(PopUpMessageComponent, {backdrop: false});
        ref.componentInstance.showIcon = true;
        let message: PopUpMessage = new PopUpMessage('Group_master_error', 'Group Master',
            error ? error : 'An Error occurred while creating new record. Please check your entry.',
            'info', [], MessageType.ERROR, false);
        message.buttons.push(new PopUpMessageButton('Ok', 'Ok', ''));
        ref.componentInstance.popupMessage = message;
    }

    public onChangeSpecialtyType(rowIndex: number, newValue: string, oldValue: string) {
        let isDuplicate = false;
        this.dataGridGridOptions.api.forEachNode(function (node) {
            if (node.rowIndex != rowIndex && node.data.specialtyType == newValue) {
                isDuplicate = true;
                return;
            }
        });
        if (isDuplicate) {
            this.showErrorPopUp('duplicateSpecialtyType', 'Provider Master', '7109: A record already exists with this keya value, Enter a new value', 'icon');
        }
    }

    private saveProvSpeciality(seqProvId: number): boolean {
        let saveData: Array<ProvSpecialty> = [];
        let isInvalid = false;
        this.dataGridGridOptions.api.forEachNode(function (node) {
            let rowData: ProvSpecialty = node.data;
            if (rowData.specialtyType == null || rowData.specialtyType == undefined) {
                isInvalid = true;
                return;
            }
            rowData.provSpecialtyPrimaryKey = {specialtyType: rowData.specialtyType, seqProvId: seqProvId};
            saveData.push(rowData);
        });
        if (isInvalid) {
            this.showErrorPopUp('requiredSpecialtyType', 'Provider Master', '29032: Speciality type is a required field. Enter something other than blanks.', 'icon');
            return;
        }
        if (saveData.length == 0) {
            return;
        }
        if (this.isValidSpecialtyTypes(saveData)) {
            this.provSpecialtyService.updateProvSpecialtyList(saveData, seqProvId).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
            });
            return true;
        }
        this.showErrorPopUp('duplicateSpecialtyType', 'Provider Master', '7109: A record already exists with this keya value, Enter a new value', 'icon');
        return false;
    }

    private isValidSpecialtyTypes(saveData: Array<ProvSpecialty>): boolean {
        let tempData: Array<String> = [];
        for (var val of saveData) {
            if (tempData.indexOf(val.specialtyType) !== -1) {
                return false;
            }
            tempData.push(val.specialtyType);
        }
        return true;
    }

    private showErrorPopUp(name: string, title: string, message: string, icon: string) {
        let popMsg = new PopUpMessage(name, title, message, icon, [new PopUpMessageButton('ok', 'OK', 'btn btn-primary')], MessageType.ERROR);
        let ref = this.modalService.open(PopUpMessageComponent, {size: 'md'});
        ref.componentInstance.popupMessage = popMsg;
        ref.componentInstance.showIcon = true;

    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    institutionalChecked() {
        setTimeout(() => {
            if (this.providerMasterForm.value.institutional && this.providerMasterForm.value.institutional === true) {
                this.providerMasterForm.controls['firstNm'].disable();
                this.providerMasterForm.controls['mi'].disable();
                this.providerMasterForm.controls['license'].disable();
                this.providerMasterForm.controls['salutation'].disable();
                this.providerMasterForm.controls['dateOfBirth'].disable();
                this.providerMasterForm.controls['language1'].disable();
                this.providerMasterForm.controls['language2'].disable();
                this.providerMasterForm.controls['language3'].disable();
            } else {
                this.providerMasterForm.controls['firstNm'].enable();
                this.providerMasterForm.controls['mi'].enable();
                this.providerMasterForm.controls['license'].enable();
                this.providerMasterForm.controls['salutation'].enable();
                this.providerMasterForm.controls['dateOfBirth'].enable();
                this.providerMasterForm.controls['language1'].enable();
                this.providerMasterForm.controls['language2'].enable();
                this.providerMasterForm.controls['language3'].enable();
            }
        }, 200);

    }

    onLookupFieldDefaultVendorId(event) {
        this.addresses = [];
        if (event.key === "F5") {
            event.preventDefault();
            this.openLookupFieldVendorIdSearchModel();
        } else if (event.key === 'Tab') {
            this.findVendorMasterByVendorId(event.target.value);
        }
    }

    findVendorMasterByVendorId(vendorId) {
        this.vendorMasterService.findVendorMasterByVendorId(vendorId).subscribe((res) => {
            if (res.seqVendId) {
                this.providerMasterForm.patchValue({
                    defaultVendorId: res.vendorId,
                    seqVendId: res.seqVendId,
                    defaultVendorAddr: '',
                    seqVendAddress: ''
                });
                this.defaultVendorAddr = '';
                this.getVendorAddress(res.seqVendId);
            } else {
                this.providerMasterForm.patchValue({
                    defaultVendorId: '',
                    seqVendId: '',
                    defaultVendorAddr: '',
                    seqVendAddress: ''
                });
                this.defaultVendorAddr = '';
                this.defaultVendorIdEle.nativeElement.focus();
                this.addresses = [];
            }
        }, error => {
            this.providerMasterForm.patchValue({
                defaultVendorId: '',
                seqVendId: '',
                defaultVendorAddr: '',
                seqVendAddress: ''
            });
            this.defaultVendorAddr = '';
            this.defaultVendorIdEle.nativeElement.focus();
            this.addresses = [];
        });
    }

    openLookupFieldVendorIdSearchModel() {
        let ref = this.modalService.open(SearchboxComponent);
        ref.componentInstance.searchModel = this.vendorIdSearchModel;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            console.log(res);
            if (res != null) {
                this.providerMasterForm.patchValue({
                    defaultVendorId: res.vendorId,
                    seqVendId: res.seqVendId,
                    defaultVendorAddr: '',
                    seqVendAddress: ''
                });
                this.defaultVendorAddr = '';
                this.getVendorAddress(res.seqVendId);
            }
        });
    }

    getVendorAddress(id: any) {
        this.vendorAddressService.findBySeqVendId(id).subscribe(
            (data) => {
                this.addresses = (data && data.length > 0) ? data : [];
                if (this.provMaster.vendorAddress && this.provMaster.vendorAddress.seqVendAddress) {
                    this.setVendorAddress1_DROPD(this.provMaster.vendorAddress.seqVendAddress);
                }
            },
            (error) => {
                this.addresses = [];
            }
        );
    }

    onAddressChange(data) {
        this.seqVendAddress = data;
    }

    setVendorAddress1_DROPD(value: any) {
        if (this.addresses.length > 0) {
            for (let i = 0; i < this.addresses.length; i++) {
                if (parseInt(value) === this.addresses[i].seqVendAddress) {
                    this.defaultVendorAddr =
                        this.addresses[i].addressLine1 +
                        "," +
                        this.addresses[i].city +
                        "," +
                        this.addresses[i].state +
                        "," +
                        this.addresses[i].zipCode;
                }
            }
        }
        this.providerMasterForm.patchValue({
            defaultVendorAddr: this.defaultVendorAddr,
            seqVendAddress: value
        });
        this.onAddressChange(value);
    }

    handleHelpMenu() {
        const modalRef = this.modalService.open(ProviderHelpComponent, { windowClass: "myCustomModalClass" });
        modalRef.componentInstance.showIcon = true;
        modalRef.componentInstance.defaultFile = 'PROVF_Provider_Master.htm';
    }

    formValueChangedStatus = () => {
        this.providerMasterForm.valueChanges.subscribe(() => {
            this.popupClose = true;
        })
    }
}
