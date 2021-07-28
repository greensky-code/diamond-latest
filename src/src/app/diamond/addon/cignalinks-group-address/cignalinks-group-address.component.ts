/* Copyright (c) 2021 . All Rights Reserved. */

import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {FormValidation} from "../../../shared/validators/form-validation.pipe";
import {AlertMessage, AlertMessageService} from "../../../shared/components/alert-message";
import {PopUpMessage, PopUpMessageButton} from "../../../shared/components/pop-up-message";
import {DatePickerConfig, DatePickerModel} from "../../../shared/config";
import {SecWinViewModel} from "../../../view-model/security/sec-win-view-model";
import {PopUpMessageComponent} from "../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component";
import {CustomValidators} from "../../../shared/validators/custom-validator";
import {DateFormatPipe} from "../../../shared/pipes/date-format.pipe";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SecurityService} from "../../../shared/services/security.service";
import {
    CiebChangeReasonCode,
    CiebEntityCode,
    CiebRestrictedReasonCode,
    CiebStreetAddress,
    GroupMaster,
    SecUser,
    SecWin
} from "../../../api-models";
import {MEM_MODULE_ID} from "../../../shared/app-constants";
import {SecColDetail} from "../../../api-models/security/sec-col-detail.model";
import {SecColDetailService} from "../../../api-services/security/sec-col-detail.service";
import {
    CiebChangeReasonCodeService,
    CiebRestrictedReasonCodeService,
    CiebStreetAddressService,
    GroupMasterService,
    SecUserService
} from "../../../api-services";
import {CiebWebCodeDecodeService} from "../../../api-services/addon/cieb-web-code-decode.service";
import {CiebWebCodeDecode} from "../../../api-models/addon/cieb-web-code-decode.model";
import {CiebAddonMeConfig} from "../../../api-models/addon/cieb-addon-me-config";
import {CiebAddonMeConfigService} from "../../../api-services/addon/cieb-addon-me-config.service";
import {CiebEntityAddressXrefService} from "../../../api-services/addon/cieb-entity-address-xref.service";
import {Form} from "../../../shared/helpers/form.helper";
import {DatePipe} from "@angular/common";
import {RequiredValidator} from "../../../shared/validators/required.validator";
import {CiebEntityCodeService} from "../../../api-services/addon/cieb-entity-code.service";
import {ToastService} from "../../../shared/services/toast.service";
import {NgbToastType} from "ngb-toast";
import {forkJoin} from "rxjs";
import {UntilDestroy} from "@ngneat/until-destroy";
import {AddonAddressComponent} from '../addon-address/addon-address.component';

// Use the Component directive to define the CignalinksGroupAddressComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@UntilDestroy({checkProperties: true})
@Component({
    selector: 'cigna-links-group-address',
    templateUrl: './cignalinks-group-address.component.html',
    providers: [DatePipe]
})
export class CignalinksGroupAddressComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() groupNumber: string;
    @Input() seqGroupId: number;
    @Input() groupName: string;
    @Input() entityType: string;
    @Input() seqEntityId: string;

    @Input() seqAddressId; // todo need to make it dynamice
    public secWin: SecWinViewModel;
    public isSuperUser = false;
    public secProgress = true;
    public userTemplateId: string;
    public secColDetails = new Array<SecColDetail>();

    windowId = 'CIEBAADR';

    addressCode = 'BIL';
    @ViewChild('BILTab') private BILTab: AddonAddressComponent;
    @ViewChild('CLATab') private CLATab: AddonAddressComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(public activeModal: NgbActiveModal,
                private securityService: SecurityService,
                private secUserService: SecUserService,
                private secColDetailService: SecColDetailService,
                private secWinService: SecWinService,
                private modalService: NgbModal
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.hasPermission();
    }


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
            this.getSecColDetails(user);
            this.userTemplateId = user.dfltTemplate;
            this.getSecWin(user.dfltTemplate);
        });
    }

    /**
     * Get Permissions
     * @param secUserId
     */
    getSecWin(secUserId: string) {
        this.secWinService.getSecWin(this.windowId, secUserId).subscribe((secWin: SecWin) => {
            this.secWin = new SecWinViewModel(secWin);
            if (this.secWin.hasSelectPermission()) {
                this.secProgress = false;

                this.initializeComponentState();
            } else {
                this.showPopUp('You are not Permitted to view pcp auto assigned rules', 'Tooth History Permission')
            }
        }, error => {
            this.secProgress = false;
        });
    }

    /**
     * Get Security Column Details
     */
    getSecColDetails(secUser: SecUser) {
        if (!secUser.sfldlId) {
            this.secProgress = false;
            return;
        }
        this.secColDetailService.findByTableNameAndUserId('', secUser.userId).subscribe((resp: SecColDetail[]) => {
            this.secColDetails = resp;
            this.secProgress = false;
            this.secColDetails = JSON.parse(JSON.stringify(resp)); // make copy of array for changes detection in directive
        });
    }

    isGroupAddressTab = false;

    initializeComponentState() {
    }

    showPopUp(message: string, title: string) {
        if (!message) {
            return;
        }
        let popUpMessage = new PopUpMessage('poUpMessageName', title, message, 'icon');
        popUpMessage.buttons = [new PopUpMessageButton('Ok', 'Ok', 'btn btn-primary')];
        let ref = this.modalService.open(PopUpMessageComponent);
        ref.componentInstance.popupMessage = popUpMessage;
    }
}
