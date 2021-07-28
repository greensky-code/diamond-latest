import {AfterViewInit, Component, Input, OnInit} from "@angular/core";
import {CiebAddonMeConfigService} from "../../../api-services/addon/cieb-addon-me-config.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {InstClaimHeaderService} from "../../../api-services/inst-claim-header.service";
import {ProvAddressService} from "../../../api-services/prov-address.service";
import {CiebOutgoingProviderAddressService} from "../../../api-services/addon/cieb-outgoing-provider-address.service";
import {CiebAddressCodeService, CiebEntityMasterService, CiebStreetAddressService} from "../../../api-services/addon";
import {CiebAddressCode, CiebEntityMaster, CiebOutgoingClaimMaster, CiebStreetAddress} from "../../../api-models/addon";
import {CiebOutgoingProviderAddress} from "../../../api-models/addon/cieb-outgoing-provider-address.model";
import {AddonMemberMasterControllerComponent} from "../addon-member-master-controller/addon-member-master-controller.component";
import {NGBModalOptions} from "../../../shared/config";
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {LocalCurrencyConversionComponent} from '../local-currency-conversion/local-currency-conversion.component';
import {NgbToastType} from "ngb-toast";
import {ToastService} from "../../../shared/services/toast.service";


@Component({
    selector: 'provider-addresses',
    templateUrl: './provider-addresses.component.html',
    styleUrls: ['./provider-addresses.component.scss'],
    providers: [InstClaimHeaderService, ProvAddressService]
})
export class ProviderAddressesComponent implements OnInit {
    @Input() instClaimHeader: any;
    @Input() paySubFlg: any;
    @Input() providerAddress: CiebOutgoingProviderAddress;
    memberMaster: any;
    addresses: any [];
    address: any [];
    addressCodes: CiebAddressCode[];
    entityMaster: CiebEntityMaster;
    claimAddress: any;
    childTabs = ['PMA', 'PAY', 'GROUP', 'COR', 'EEA', 'IDC', 'CLA'];

    constructor(public ngbActiveModal: NgbActiveModal, private route: ActivatedRoute , private router: Router ,
                private instClaimHeaderService: InstClaimHeaderService,
                private ciebEntityMasterService: CiebEntityMasterService,
                private ciebStreetAddressService: CiebStreetAddressService,
                private ciebAddressCodeService: CiebAddressCodeService,
                private modalService: NgbModal,
                private toastService: ToastService,
                private ciebOutgoingProviderAddressService: CiebOutgoingProviderAddressService) {
    }

    ngOnInit(): void {
        this.memberMaster = this.instClaimHeader.memberMaster;
        this.getAddressCodes();
        this.getClaimAddress();
    }

    onSubmit() {
        let popUpMessage = new PopUpMessage(
            "poUpMessageName",
            "",
            "Do you want to close this window?",
            "icon"
        );
        popUpMessage.buttons = [
            new PopUpMessageButton("Yes", "Yes", "btn btn-primary"),
            new PopUpMessageButton("No", "No", "btn btn-secondary"),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.buttonclickEvent.subscribe((resp: any) => {
            if (resp.name === 'Yes') {
                this.ngbActiveModal.dismiss();
            }
        });
    }

    getAddressCodes() {
        this.ciebAddressCodeService.getCiebAddressCodes().subscribe((res: CiebAddressCode[]) => {
            this.addressCodes = res;
            this.getAddresses();
        });
    }

    private getAddresses() {
        this.ciebEntityMasterService.getCiebEntityMasterBySeqMembID(this.instClaimHeader.memberMaster.seqMembId).subscribe((res: any) => {
            if (res) {
                this.entityMaster = res;
                this.ciebStreetAddressService.findCiebStreetAddressListByIds(res.seqEntityId, this.instClaimHeader.seqClaimId, this.instClaimHeader.memberMaster.seqMembId).subscribe((addressesRes: any[]) => {
                    this.addresses = addressesRes;
                });
            }
        });
    }
    onClickCurrencyConversion() {
        this.ngbActiveModal.dismiss();
        const ref = this.modalService.open(
            LocalCurrencyConversionComponent,
            {
                size: <any>'xl',
                ...NGBModalOptions,
                windowClass: 'dashboard-modal',
            }
        );
        ref.componentInstance.instClaimHeader = this.instClaimHeader;
        ref.componentInstance.showIcon = true;
        ref.componentInstance.seqClaimId = this.instClaimHeader.seqClaimId;
    }

    getClaimAddress() {
        if (this.providerAddress) {
            this.claimAddress = '<BR>';
            if (this.providerAddress.payeeName) {
                this.claimAddress += this.providerAddress.payeeName + '<BR>';
            }
            if (this.providerAddress.addressLine1) {
                this.claimAddress += this.providerAddress.addressLine1 + '<BR>';
            }
            if (this.providerAddress.addressLine2) {
                this.claimAddress += this.providerAddress.addressLine2 + '<BR>';
            }
            if (this.providerAddress.addressLine3) {
                this.claimAddress += this.providerAddress.addressLine3 + '<BR>';
            }
        } else {
            this.ciebOutgoingProviderAddressService.existsCiebOutgoingProviderAddress(this.instClaimHeader.seqClaimId).subscribe((res: any) => {
                if (res) {
                    this.ciebOutgoingProviderAddressService.getCiebOutgoingProviderAddress(this.instClaimHeader.seqClaimId).subscribe((add: any) => {
                        if (add) {
                            this.claimAddress = '<BR>';
                            if (add.payeeName) {
                                this.claimAddress += add.payeeName + '<BR>';
                            }
                            if (add.addressLine1) {
                                this.claimAddress += add.addressLine1 + '<BR>';
                            }
                            if (add.addressLine2) {
                                this.claimAddress += add.addressLine2 + '<BR>';
                            }
                            if (add.addressLine3) {
                                this.claimAddress += add.addressLine3 + '<BR>';
                            }
                        } else {
                            let primaryAddress = this.instClaimHeader.provAddress ;
                            let firstLine = primaryAddress.addressLine1 ;
                            let lastLine = `${primaryAddress.city} ${primaryAddress.state} ${primaryAddress.zipCode} ${primaryAddress.country}` ;
                            let shortName = this.instClaimHeader.provMasterC.shortName;
                            this.claimAddress = '<BR>' + shortName + '<BR>' + firstLine + '<BR>' + lastLine + '<BR>';
                        }
                    });
                } else {
                    let primaryAddress = this.instClaimHeader.provAddress ;
                    let firstLine = primaryAddress.addressLine1 ;
                    let lastLine = `${primaryAddress.city} ${primaryAddress.state} ${primaryAddress.zipCode} ${primaryAddress.country}` ;
                    let shortName = this.instClaimHeader.provMasterC.shortName;
                    this.claimAddress = '<BR>' + shortName + '<BR>' + firstLine + '<BR>' + lastLine + '<BR>';
                }
            });
        }
    }

    getAddressCodeName(add: any) {
        if (this.addressCodes && this.addressCodes.length > 0) {
            let addressCodeRecord = this.addressCodes.find(a => a.addressCode === add.code);
            if (addressCodeRecord) {
                return addressCodeRecord.addressDesc;
            }
        }
        return '';
    }

    openAddressPage(add: any) {
        this.showAddressScreen(this.entityMaster.seqEntityId, add.code);
    }

    showAddressScreen(seqEntityId: any, addressCode: string) {
        this.ngbActiveModal.dismiss();
        const ref = this.modalService.open(
            AddonMemberMasterControllerComponent,
            // MemberAddonControllerComponent,
            {
                size: <any>'xl',
                ...NGBModalOptions,
                windowClass: 'dashboard-modal',
            }
        );
        ref.componentInstance.showIcon = true;
        ref.componentInstance.activeTab = 1;
        ref.componentInstance.groupNumber = this.memberMaster.subscriberId;
        ref.componentInstance.subscriberId = this.memberMaster.subscriberId;
        ref.componentInstance.lastName = this.memberMaster.lastName;
        ref.componentInstance.firstname = this.memberMaster.firstName;
        ref.componentInstance.groupName = this.memberMaster.firstName + " " + this.memberMaster.lastName;
        ref.componentInstance.entityType = (this.paySubFlg === 'P') ? 'Provider' : 'Subscriber';
        ref.componentInstance.addressCode = addressCode;
        ref.componentInstance.seqEntityId = seqEntityId;
        ref.componentInstance.seqMembId = this.memberMaster.seqMembId;
        ref.componentInstance.seqSubsId = this.memberMaster.seqSubsId;
        let activeChildTabIndex = (this.childTabs.findIndex(t => t === addressCode));
        if (activeChildTabIndex >= 0) {
            ref.componentInstance.childActiveTab = (activeChildTabIndex + 1);
        }
    }

    showPrimaryMailingScreen() {
        if (this.entityMaster && this.entityMaster.seqEntityId) {
            this.showAddressScreen(this.entityMaster.seqEntityId, 'PMA');
        } else {
            this.toastService.showToast('Entity Id not found', NgbToastType.Danger);
        }
    }
}
