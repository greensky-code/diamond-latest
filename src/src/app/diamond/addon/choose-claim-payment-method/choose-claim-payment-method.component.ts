import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NGBModalOptions} from "../../../shared/config";
import {ProviderAddressInformationComponent} from "../provider-address-information/provider-address-information.component";
import {ProviderAddressesComponent} from "../provider-addresses/provider-addresses.component";

@Component({
    selector: 'choose-claim-payment-method',
    templateUrl: './choose-claim-payment-method.component.html',
    styleUrls: ['./choose-claim-payment-method.component.scss']
})
export class ChooseClaimPaymentMethodComponent implements OnInit {

    @Input() instClaimHeader: any;
    type = 'P';

    @Output() onFormSubmit = new EventEmitter<any>();
    constructor(private modalService: NgbModal, public ngbActiveModal: NgbActiveModal) {
    }

    ngOnInit(): void {

    }

    onSubmit() {
        this.ngbActiveModal.dismiss();
        this.onFormSubmit.emit({paymentMethod: this.type});
        if (this.type === 'P') {
            const ref = this.modalService.open(
                ProviderAddressInformationComponent,
                {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                }
            );
            ref.componentInstance.instClaimHeader = this.instClaimHeader;
            ref.componentInstance.paySubFlg = this.type;
            ref.componentInstance.claimType = 'I';
        } else {
            const ref = this.modalService.open(
                ProviderAddressesComponent,
                {
                    size: <any>"xl",
                    ...NGBModalOptions,
                    windowClass: "dashboard-modal",
                }
            );
            ref.componentInstance.instClaimHeader = this.instClaimHeader;
            ref.componentInstance.paySubFlg = this.type;
            ref.componentInstance.claimType = 'I';
        }
    }
}
