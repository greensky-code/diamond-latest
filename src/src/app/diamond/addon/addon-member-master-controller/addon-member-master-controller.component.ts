import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbActiveModal, NgbModal, NgbNav} from '@ng-bootstrap/ng-bootstrap';
import {MemberMasterService} from '../../../api-services/member-master.service';
import {CiebEntityMasterService} from '../../../api-services/addon';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {MemberMaster} from '../../../api-models';

@Component({
    selector: 'app-addon-member-master-controller',
    templateUrl: './addon-member-master-controller.component.html',
    styleUrls: ['./addon-member-master-controller.component.css']
})
export class AddonMemberMasterControllerComponent implements OnInit {

    @Input() showIcon = true;
    @Input() groupNumber: string;
    @Input() seqGroupId: number;
    @Input() groupName: string;
    @Input() entityType = 'Subscriber';
    @Input() seqEntityId: number;
    @Input() subscriberId: number;
    @Input() seqMembId: number;
    @Input() seqSubsId: number;
    @Input() isAddressOverRide = false;

    @Input() seqAddressId: number;   // default value for testing

    @Input() addressCode = 'BIL'

    @Input() activeTab = 1;

    @Input() childActiveTab = 1;


    Name1 = 'HENRY THJ';
    Name2 = 'CHARLES HENRY';
    NameVal1 = '000000081';
    NameVal2 = '00159A999';
    public popUpMessage: PopUpMessage;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    public alertMessage: AlertMessage;


    private tabSet: NgbNav;
    memberMaster: MemberMaster;

    @ViewChild(NgbNav) set content(content: NgbNav) {
        this.tabSet = content;
    };

    constructor(
        public entityMasterService: CiebEntityMasterService,
        public alertMessageService: AlertMessageService,
        private modalService: NgbModal,
        public ngbActiveModal: NgbActiveModal,
        private memberMasterService: MemberMasterService
    ) {
    }

    ngOnInit(): void {
                 this.getSeqEntityId();
    }

    ngAfterViewInit() {
        this.tabSet.select(this.activeTab);
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
            new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary'),
        ];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name === 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name === 'poUpMessageName') {
            this.popupMessageHandler(button);
        }
    }

    getSeqEntityId() {
        this.entityMasterService.getCiebEntityMasterBySeqMembID(this.seqMembId).subscribe((data) => {
              this.seqEntityId = data.seqEntityId;
            });
    }

    getMemberMaster(seqMembId: number) {
        this.memberMasterService.getMemberMaster(seqMembId).subscribe(
            (memberMaster) => {
                this.memberMaster = memberMaster;
                this.Name1 = this.memberMaster.firstName + ' ' + this.memberMaster.lastName;
                this.NameVal1 = this.memberMaster.subscriberId;
            }
        );
    }
}
