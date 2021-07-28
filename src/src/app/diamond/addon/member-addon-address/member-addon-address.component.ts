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
    selector: 'member-addon-address',
    templateUrl: './member-addon-address.component.html',
    providers: [DatePipe]
})
export class MemberAddonAddressComponent implements OnInit {

    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    @Input() showIcon = true;
    @Input() subscriberId: string;
    
    @Input() entityType: string;
    @Input() activeTab = 1;


    @Input() seqAddressId = 11794296; // todo need to make it dynamice

    seqVendAddr = 1614;
    seqProvAddr = 1001;

    addressCode: string;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(public activeModal: NgbActiveModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {

    }

    isGroupAddressTab = false;

    onTabChange(changeEvent) {
        if (changeEvent.nextId == 'ngb-nav-1') {     // group addresses tab
            this.addressCode = 'PMA';
            return;
        }
        this.addressCode = 'PMA';    // for billing local address
    }


}
