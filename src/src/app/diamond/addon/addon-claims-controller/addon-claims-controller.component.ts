import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgbModal, NgbActiveModal, NgbNav} from '@ng-bootstrap/ng-bootstrap';
import { MemberMasterService } from '../../../api-services/member-master.service';
import { CiebEntityMasterService } from '../../../api-services/addon';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {MemberMaster, ProfsvcClaimHeader} from '../../../api-models';
import { ClaimCurrencyPaymentService } from '../../../api-services/addon/claim-currency-payment.service';
import { EntityHeader } from '../../../api-models/addon/entity-header.model';

@Component({
    selector: 'app-addon-claims-controller',
    templateUrl: './addon-claims-controller.component.html',
    styleUrls: ['./addon-claims-controller.component.css']
})
export class AddonClaimsControllerComponent implements OnInit {

    @Input() subscriberId: number;
    @Input() seqMembId: number;
    @Input() seqSubsId: number;
    @Input() memberName: string;
    @Input() personNumber: number;
    @Input() profsvcClaimHeader: ProfsvcClaimHeader;
    entityHeader: EntityHeader;

    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;
    public popUpMessage: PopUpMessage;
    public alertMessage: AlertMessage;

    constructor(
        public entityMasterService: CiebEntityMasterService,
        public alertMessageService: AlertMessageService,
        public ngbActiveModal: NgbActiveModal,
        private claimCurrencyPaymentService: ClaimCurrencyPaymentService
    ) { }

    ngOnInit(): void { 
        this.getEntityHeader(this.subscriberId, this.personNumber);
    }

    getEntityHeader(subscriberId: number, personNumber: number) {
        this.claimCurrencyPaymentService.getEntityHeader(subscriberId, personNumber).subscribe((data: EntityHeader) => {
            this.entityHeader = data
            console.log("this.entityHeader",this.entityHeader);
        });
    }

}
