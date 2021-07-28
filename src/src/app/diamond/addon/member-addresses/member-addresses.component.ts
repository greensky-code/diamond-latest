import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';
import {InstClaimHeaderService} from '../../../api-services/inst-claim-header.service';
import {ProvAddressService} from '../../../api-services/prov-address.service';
import {CiebAddressCodeService, CiebEntityMasterService, CiebStreetAddressService} from '../../../api-services/addon';
import {CiebAddressCode, CiebEntityMaster, CiebStreetAddress} from '../../../api-models/addon';
import {AddonMemberMasterControllerComponent} from '../addon-member-master-controller/addon-member-master-controller.component';
import {NGBModalOptions} from '../../../shared/config';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {MessageMasterDtl} from "../../../api-models";
import {MessageMasterDtlService} from "../../../api-services";

@Component({
    selector: 'provider-addresses',
    templateUrl: './member-addresses.component.html',
    styleUrls: ['./member-addresses.component.scss'],
    providers: [InstClaimHeaderService, ProvAddressService]
})
export class MemberAddressesComponent implements OnInit, AfterViewInit {
    @Input() instClaimHeader: any;
    @Input() paySubFlg: any;
    @Input() seqMembId: number;
    @Input() groupNumber: string;
    @Input() seqGroupId: number;
    @Input() groupName: string;
    memberMaster: any;
    addresses: CiebStreetAddress [] = [];
    address: any [];
    addressCodes: CiebAddressCode[];
    entityMaster: CiebEntityMaster;
    memberAddress: any;
    childTabs = ['PMA', 'PAY', 'GROUP', 'COR', 'EEA', 'IDC', 'CLA'];

    constructor(public ngbActiveModal: NgbActiveModal, private route: ActivatedRoute, private router: Router,
                private instClaimHeaderService: InstClaimHeaderService,
                private ciebEntityMasterService: CiebEntityMasterService,
                private ciebStreetAddressService: CiebStreetAddressService,
                private ciebAddressCodeService: CiebAddressCodeService,
                private modalService: NgbModal,
                private messageService: MessageMasterDtlService,
                private memberMasterService: MemberMasterService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.getMemberMaster(this.seqMembId);
    }

    getMemberMaster(seqMembId: number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(
            (memberMaster) => {
                this.memberMaster = memberMaster;
                this.getMemberAddress();
                this.getAddressCodes();
            }
        );
    }

    onSubmit() {
        let popUpMessage = new PopUpMessage(
            'poUpMessageName',
            '',
            'Do you want to close this window?',
            'icon'
        );
        popUpMessage.buttons = [
            new PopUpMessageButton('Yes', 'Yes', 'btn btn-primary'),
            new PopUpMessageButton('No', 'No', 'btn btn-secondary'),
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
        this.ciebEntityMasterService.getCiebEntityMasterBySeqMembID(this.memberMaster.seqMembId).subscribe((res: any) => {
            if (res) {
                this.entityMaster = res;
                this.ciebStreetAddressService.findCiebStreetAddressListBySeqEntityId(res.seqEntityId).subscribe((addressesRes: CiebStreetAddress[]) => {
                    this.addresses = addressesRes;
                    this.addresses.forEach((address: CiebStreetAddress, index: number) => {
                        const code = this.addressCodes.find(code => code.addressCode === address.addressCode);
                        this.addresses[index]['addressType'] = code.addressDesc;
                    });
                    console.log(addressesRes);
                });
            }
        });
    }

    getMemberAddress() {
        if (this.memberMaster) {

            if (this.memberMaster.firstName) {
                this.memberAddress = this.memberMaster.firstName + ' ' + this.memberMaster.lastName;
            }
            if (this.memberMaster.addressLine1) {
                this.memberAddress += this.memberMaster.addressLine1;
            }
            if (this.memberMaster.addressLine2) {
                this.memberAddress += this.memberMaster.addressLine2;
            }
            if (this.memberMaster.city) {
                this.memberAddress += this.memberMaster.city;
            }
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


    openAddonMemberMaster(isAddressOverRide = false) {
        if (this.memberMaster) {
            const ref = this.modalService.open(AddonMemberMasterControllerComponent, {
                size: <any>'xl',
                ...NGBModalOptions, windowClass: 'dashboard-modal'
            });
            ref.componentInstance.groupNumber = this.memberMaster.subscriberId;
            ref.componentInstance.subscriberId = this.memberMaster.subscriberId;
            ref.componentInstance.seqMembId = this.memberMaster.seqMembId;
            ref.componentInstance.seqSubsId = this.memberMaster.seqSubsId;
            ref.componentInstance.isAddressOverRide = isAddressOverRide;
            ref.componentInstance.groupName = this.memberMaster.firstName ? this.memberMaster.firstName : '' + ' ' +
            this.memberMaster.lastName ? this.memberMaster.lastName : '';
        } else {
            this.messageService
                .findByMessageId(13062)
                .subscribe((message: MessageMasterDtl[]) => {
                    this.showPopUp('Select a member first', 'Member Master Address');
                });
        }
    }


    showPopUp(message: string, title: string, button = 'Cancel') {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [
            new PopUpMessageButton(button, button, 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

}
