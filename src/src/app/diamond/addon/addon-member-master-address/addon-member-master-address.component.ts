import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessage, AlertMessageService, } from '../../../shared/components/alert-message';
import { PopUpMessage, PopUpMessageButton } from '../../../shared/components/pop-up-message';
import { PopUpMessageComponent } from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import { AddonMemberMasterControllerComponent } from '../addon-member-master-controller/addon-member-master-controller.component';
import { NGBModalOptions } from '../../../shared/config';
import { CiebEntityMasterService } from '../../../api-services/addon/cieb-entity-master.service';
import { CiebEntityMaster } from '../../../api-models/addon/cieb-entity-master.model';
import { CiebStreetAddressService } from '../../../api-services';
import { CiebStreetAddress } from '../../../api-models';
import { forkJoin } from 'rxjs';

@Component({
  selector: "app-addon-member-master-address",
  templateUrl: "./addon-member-master-address.component.html",
  styleUrls: ["./addon-member-master-address.component.css"],
})
export class AddonMemberMasterAddressComponent implements OnInit {
  @Input() showIcon = true;
  @Input() groupNumber: string;
  @Input() seqGroupId: number;
  @Input() groupName: string;
  @Input() entityType: string = "Subscriber";
  @Input() seqEntityId: number;
  @Input() subscriberId: number;
  @Input() seqMembId: number;
  @Input() seqSubsId: number;
  @Input() seqAddressId: number; // default value for testing
  @Input() isAddressOverRide = false;

  @Input() addressCode:string;

  Name1: string;
  Name2: string;
  NameVal1: string;
  NameVal2: string;
  public popUpMessage: PopUpMessage;
  @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
  public alertMessage: AlertMessage;

  @Input() activeTab = 1;

  private tabSet: NgbNav;

  constructor(
      public alertMessageService: AlertMessageService,
      private modalService: NgbModal,
      public ngbActiveModal: NgbActiveModal,
      public ciebEntityMasterService: CiebEntityMasterService,
      public ciebStreetAddressService: CiebStreetAddressService
  ) {
  }

    ngOnInit(): void {
        this.activeTab = this.isAddressOverRide ? 0 : 1;
        this.OnChange(this.addressCode);
    }

  public AddNewAddress() {
    this.ngbActiveModal.dismiss();
    const ref = this.modalService.open(AddonMemberMasterControllerComponent, {
      size: <any>"xl",
      ...NGBModalOptions,
      windowClass: "dashboard-modal",
    });
    ref.componentInstance.seqMembId = this.seqMembId;
  }

  showPopUp(message: string, title: string) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage(
      "poUpMessageName",
      title,
      message,
      "icon"
    );
    popUpMessage.buttons = [
      new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
    ];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
  }

  popupMessageHandler(button: PopUpMessageButton) {
    if (button.name === "yes") {
      console.log("button yes has been click!");
    }
    if (button.name === "no") {
      console.log("button No has been click!");
    }
  }

  popUpButtonHandler(button: PopUpMessageButton) {
    if (button.popupMessage.name === "poUpMessageName") {
      this.popupMessageHandler(button);
    }
  }

  OnChange(addressCode: string) {
    this.entityType = this.entityType ? this.entityType : "Subscriber";
    forkJoin({
      ciebEntityMaster:
        this.ciebEntityMasterService.getSeqEntityIdBySeqMembIdAndSeqSubsId(
          this.seqMembId,
          this.seqSubsId
        ),
    }).subscribe(
      ({ ciebEntityMaster }) => {
        if (ciebEntityMaster) {
          this.seqEntityId = ciebEntityMaster.seqEntityId;
          this.ciebStreetAddressService
            .getCiebStreetAddressBySeqEntityAndAddressCode(
              this.seqEntityId,
              addressCode
            )
            .subscribe((ciebStreetAddressResponse) => {
              let ciebStreetAddress = new CiebStreetAddress();
              ciebStreetAddress = ciebStreetAddressResponse;
              if (ciebStreetAddress) {
                this.seqAddressId = ciebStreetAddress.seqAddrId;
              } else {
                this.seqAddressId = null;
              }
            });
        } else {
          this.seqEntityId = null;
          this.seqAddressId = null;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
