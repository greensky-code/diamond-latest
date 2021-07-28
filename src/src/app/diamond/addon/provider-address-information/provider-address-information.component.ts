import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NGBModalOptions} from "../../../shared/config";
import {ProviderAddressesComponent} from "../provider-addresses/provider-addresses.component";
import {CiebCountryCode} from "../../../api-models/addon";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {CiebCountryCodeService} from "../../../api-services/addon";
import {ToastService} from "../../../shared/services/toast.service";
import {NgbToastType} from "ngb-toast";
import {CiebOutgoingProviderAddressService} from "../../../api-services/addon/cieb-outgoing-provider-address.service";
import {CiebOutgoingClaimMasterService} from "../../../api-services/addon/cieb-outgoing-claim-master.service";
import {CiebOutgoingClaimMaster} from "../../../api-models/addon/cieb-outgoing-claim-master.model";
import {DatePipe} from "@angular/common";
import {CiebOutgoingProviderAddress} from "../../../api-models/addon/cieb-outgoing-provider-address.model";
import {Form} from "../../../shared/helpers/form.helper";

@Component({
    selector: 'provider-address-information',
    templateUrl: './provider-address-information.component.html',
    styleUrls: ['./provider-address-information.component.scss'],
    providers: [DatePipe]
})
export class ProviderAddressInformationComponent implements OnInit {
    @Input() instClaimHeader: any;
    @Input() paySubFlg: any;
    @Input() claimType: any;
    claimMaster: CiebOutgoingClaimMaster;
    providerAddress: CiebOutgoingProviderAddress;
    countries: CiebCountryCode[] = [];
    addressForm: FormGroup;
    formValidation: FormValidation;
    public displayMessage: any;
    windowId = 'AOCLPPV';
    isExistsProviderAddress = false;
    ignoreCountries = ["CUB", "IRN", "SDN", "YUG", "SCG", "SYR", "SLG", "PRK", "TMP"];
    constructor(private modalService: NgbModal, public ngbActiveModal: NgbActiveModal,
                private ciebCountryCodeService: CiebCountryCodeService,
                private formBuilder: FormBuilder,
                private toastService: ToastService,
                private datePipe: DatePipe,
                private toastr: ToastService,
                private ciebOutgoingProviderAddressService: CiebOutgoingProviderAddressService,
                private ciebOutgoingClaimMasterService: CiebOutgoingClaimMasterService) {
    }

    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.addressForm);
        this.getCountries();
        this.patchDetail();
    }

    createForm() {
        this.addressForm = this.formBuilder.group({
            dynamicText: ['', {updateOn: 'blur', validators: []}],
            payeeName: ['', {validators: [Validators.required, Validators.maxLength(35)]}],
            addressLine1: ['', {validators: [Validators.required, Validators.maxLength(35)]}],
            addressLine2: ['', {validators: [Validators.maxLength(35)]}],
            addressLine3: ['', {validators: [Validators.maxLength(35)]}],
            bankName: ['', {validators: [Validators.maxLength(35)]}],
            routingNum: ['', {validators: [Validators.required, Validators.maxLength(35), Validators.pattern('^[.0-9a-zA-Z\s]+$')]}],
            country: ['', {validators: [Validators.required]}],
            countryCode: [''],
            commentDesc: ['', {validators: Validators.maxLength(255)}],
            bankAddrFlg: ['N'],
            accountNum: ['', {validators: [Validators.maxLength(35), Validators.pattern('^[.0-9a-zA-Z\s]+$')]}]
        });
    }

    patchDetail() {
        this.ciebOutgoingProviderAddressService.existsCiebOutgoingProviderAddress(this.instClaimHeader.seqClaimId).subscribe((res: any) => {
            this.isExistsProviderAddress = res;
            if (res) {
                this.ciebOutgoingProviderAddressService.getCiebOutgoingProviderAddress(this.instClaimHeader.seqClaimId).subscribe((res: any) => {
                   this.addressForm.patchValue(res);
                   this.onChangeIsBankAddress(res.bankAddrFlg);
                });
            } else {
                let primaryAddress = this.instClaimHeader.provAddress ;
                let firstLine = primaryAddress.addressLine1 ;
                let lastLine = `${primaryAddress.city} ${primaryAddress.state} ${primaryAddress.zipCode} ${primaryAddress.country}` ;
                this.addressForm.patchValue({
                    payeeName: this.instClaimHeader.provMasterC.shortName ,
                    addressLine1: firstLine,
                    addressLine2: '',
                    addressLine3: lastLine,
                    countryCode: primaryAddress.country
                });
            }
        });
    }

    getCountries() {
        this.ciebCountryCodeService.getCiebCountryCodes().subscribe((res: any) => {
            this.countries = res;
            if (!this.instClaimHeader.provAddress) {
                this.toastr.showToast('Provider address not selected', NgbToastType.Danger);
                return;
            }
            let primaryAddress = this.instClaimHeader.provAddress ;
            let country = this.countries.find(c => c.countryCode === primaryAddress.country);
            this.addressForm.patchValue({
                country: country.countryDesc
            });
        });
    }

    setFieldValue(fieldName: string, fieldValue: string | number) {
        this.addressForm.controls[fieldName].patchValue(fieldValue);
    }

    onSubmit() {
        let validate = this.validateForm();
        this.formValidation.validateForm();
        if (validate === 0 && this.addressForm.valid) {
            this.ciebOutgoingClaimMasterService.existsCiebOutgoingClaimMaster(this.instClaimHeader.seqClaimId).subscribe((res: any) => {
                if (res) {
                    this.ciebOutgoingClaimMasterService.getCiebOutgoingClaimMaster(this.instClaimHeader.seqClaimId).subscribe((res: any) => {
                        this.claimMaster = res;
                        this.createProviderAddress();
                    });
                } else {
                    this.claimMaster = this.createNewClaimMasterObject();
                    this.ciebOutgoingClaimMasterService.createCiebOutgoingClaimMaster(this.claimMaster).subscribe((res: any) => {
                        this.claimMaster = res;
                        this.createProviderAddress();
                    });
                }
            });
        }
    }

    validateForm() {
        let formVal = this.addressForm.value;
        if (formVal.payeeName.replace(/^\s+|\s+$/g, '').length === 0) {
            this.toastService.showToast('Payee name is required', NgbToastType.Danger);
            return 1;
        }
        return 0;
    }

    onChangeIsBankAddress(value, isShowMessage = false) {
        if (value === 'Y') {
            this.addressForm.controls['accountNum'].setValidators([Validators.required]);
            if (isShowMessage) {
                this.toastService.showToast('Please be sure to enter the complete Bank Address details for payment', NgbToastType.Warning);
            }
        } else {
            this.addressForm.controls['accountNum'].setValidators([]);
        }
        this.addressForm.get('accountNum').updateValueAndValidity({emitEvent: true});
    }

    private createNewClaimMasterObject() {
        let claimMaster = new CiebOutgoingClaimMaster();
        claimMaster.claimType = this.claimType;
        claimMaster.paySubFlg = this.paySubFlg;
        claimMaster.seqClaimId = this.instClaimHeader.seqClaimId;
        let updatedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        let insertUser = sessionStorage.getItem('user');
        let insertProcess = this.windowId;
        claimMaster.insertDatetime = updatedDate;
        claimMaster.insertUser = insertUser
        claimMaster.insertProcess = insertProcess;
        claimMaster.updateDatetime = updatedDate;
        claimMaster.updateUser = insertUser;
        claimMaster.updateProcess = insertProcess;
        return claimMaster;
    }

    createProviderAddress() {
        this.providerAddress = this.createProviderAddressObject();
        if (this.isExistsProviderAddress) {
            this.ciebOutgoingProviderAddressService.updateCiebOutgoingProviderAddress(this.providerAddress,
                this.instClaimHeader.seqClaimId).subscribe((res) => {
               this.openProviderAddressesScreen();
            });
        } else {
            this.ciebOutgoingProviderAddressService.createCiebOutgoingProviderAddress(this.providerAddress).subscribe((res: any) => {
                this.openProviderAddressesScreen();
            });
        }
    }

    openProviderAddressesScreen() {
        this.ngbActiveModal.dismiss();
        const ref = this.modalService.open(
            ProviderAddressesComponent,
            {
                size: <any>"xl",
                ...NGBModalOptions,
                windowClass: "dashboard-modal",
            }
        );
        ref.componentInstance.instClaimHeader = this.instClaimHeader;
        ref.componentInstance.providerAddress = this.providerAddress;
        ref.componentInstance.paySubFlg = this.paySubFlg;
    }

    createProviderAddressObject() {
        let providerAddress = new CiebOutgoingProviderAddress();
        providerAddress.addressLine1 = Form.getValue(this.addressForm, 'addressLine1');
        providerAddress.addressLine2 = Form.getValue(this.addressForm, 'addressLine2');
        providerAddress.addressLine3 = Form.getValue(this.addressForm, 'addressLine3');
        providerAddress.bankName = Form.getValue(this.addressForm, 'bankName');
        providerAddress.accountNum = Form.getValue(this.addressForm, 'accountNum');
        providerAddress.bankAddrFlg = Form.getValue(this.addressForm, 'bankAddrFlg');
        providerAddress.commentDesc = Form.getValue(this.addressForm, 'commentDesc');
        providerAddress.countryCode = Form.getValue(this.addressForm, 'countryCode');
        providerAddress.payeeName = Form.getValue(this.addressForm, 'payeeName');
        providerAddress.routingNum = Form.getValue(this.addressForm, 'routingNum');
        providerAddress.seqClaimId = this.instClaimHeader.seqClaimId;
        let updatedDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');
        let insertUser = sessionStorage.getItem('user');
        let insertProcess = this.windowId;
        providerAddress.insertDatetime = updatedDate;
        providerAddress.insertUser = insertUser
        providerAddress.insertProcess = insertProcess;
        providerAddress.updateDatetime = updatedDate;
        providerAddress.updateUser = insertUser;
        providerAddress.updateProcess = insertProcess;
        return providerAddress;
    }
}
