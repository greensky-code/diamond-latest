/* Copyright (c) 2020 . All Rights Reserved. */

import {AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {GridApi, GridOptions} from "ag-grid-community";
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {Mask} from '../../../shared/pipes/text-format.pipe'
import {FormValidation} from '../../../shared/validators/form-validation.pipe'
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe'
import {DatePipe} from '@angular/common';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message/pop-up.message.model';
import {FunctionalGroupShortCutComponent} from '../functional-group-shortcut/functional-group-shortcut.component';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {Navgrp, NavgrpKw, NavWin, SecUser, SecWinDescr} from "../../../api-models"
import {NavWinService} from "../../../api-services/nav-win.service"
import {NavgrpService} from "../../../api-services/navgrp.service"
import {SecWinDescrService} from "../../../api-services/sec-win-descr.service"
import {NavgrpKwService} from "../../../api-services/navgrp-kw.service"
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message'
import {NgbActiveModal, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AllowIn, KeyboardShortcutsComponent, ShortcutEventOutput, ShortcutInput} from 'ng-keyboard-shortcuts';
import {ScreenMapping} from '../../../view-model/screen-mapping';
import {UntilDestroy} from '@ngneat/until-destroy';
import {getFunctionalGroupsShortcutkeys, SharedService} from '../../../shared/services/shared.service';
import {Router} from '@angular/router';
import {NGBModalOptions} from '../../../shared/config';
import {SecurityService} from '../../../shared/services/security.service';
import {SecWinService} from '../../../api-services/security/sec-win.service';
import {SecWin} from '../../../api-models/security/sec-win.model';
import {SecWinViewModel} from '../../../view-model/security/sec-win-view-model';
import {MessageMasterDtlService, SecUserService} from '../../../api-services';
import {ToastService} from '../../../shared/services/toast.service';
import {NgbToastType} from 'ngb-toast';
import {BenefitsHelpComponent} from "../../benefits/benefits-help/benefits-help.component";
import {MainHelpComponent} from "../main-help/main-help.component";
// Use the Component directive to define the FunctionalGroupsComponent as an Angular component
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
    selector: "functionalgroups",
    templateUrl: "./functional-groups.component.html",
    styleUrls: ["./functional-groups.component.scss"],
    providers: [
        DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        NavWinService,
        NavgrpService,
        SecWinDescrService,
        NavgrpKwService,
    ],
})
export class FunctionalGroupsComponent implements OnInit, AfterViewInit {
    // The form model used by the view per Angular Reactive Forms
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    functionalGroupsForm: FormGroup;
    formValidation: FormValidation;
    public alertMessage: AlertMessage;
    private displayMessage: any;
    public popUpMessage: PopUpMessage;
    private id = 1;
    public rowSelection;

    public dataGridGridOptions: GridOptions;
    private dataGridgridApi: any;
    private dataGridgridColumnApi: any;

    editNavWin: boolean;
    navWin: NavWin;
    navWins: NavWin[];
    editNavgrp: boolean;
    navgrp: Navgrp;
    navgrps: Navgrp[];
    editSecWinDescr: boolean;
    secWinDescr: SecWinDescr;
    secWinDescrs: SecWinDescr[] = [];
    editNavgrpKw: boolean;
    navgrpKw: NavgrpKw;
    navgrpKws: NavgrpKw[];
    navgrpMenues: any;
    shortcuts: ShortcutInput[] = [];
    selectedGroup: any;
    menuKeyInProgress = false;
    gridApi: GridApi;

    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;

    @ViewChild("functionalGroupShortcut")
    functionalGroupShortcut: FunctionalGroupShortCutComponent;
    @ViewChild("popUpMesssage") child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private toastr: ToastService,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private modalService: NgbModal,
        private navWinService: NavWinService,
        private activeModal: NgbActiveModal,
        private navgrpService: NavgrpService,
        private secWinDescrService: SecWinDescrService,
        private navgrpKwService: NavgrpKwService,
        private router: Router,
        private cdr: ChangeDetectorRef,
        private securityService: SecurityService,
        private secWinService: SecWinService,
        private secUserService: SecUserService,
        private sharedService: SharedService,
        private messageService: MessageMasterDtlService,
    ) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.functionalGroupsForm);
        this.createSecWinDescrsGrid();
        this.getNavgrps();
        this.populateSecWinDescrsGrid();
    }

    getRowNodeId(data) {
        return data.win_ID;
    }

    ngAfterViewInit(): void {
        this.selectedGroup = sessionStorage.getItem("selectedGroup");
        if (this.selectedGroup) {
            this.selectedGroup = JSON.parse(this.selectedGroup);
            this.menuKeyInProgress = true;
            this.getShortcutMenuList(this.selectedGroup);
        }

        this.shortcuts.push(...getFunctionalGroupsShortcutkeys(this));
        this.cdr.detectChanges();
    }

    /**
     * On clicking group populate Grid with shortcutMenu
     * @param group: Navgrp
     */
    getShortcutMenuList(group) {
        this.selectedGroup = group;
        this.menuKeyInProgress = true;
        sessionStorage.setItem("selectedGroup", JSON.stringify(this.selectedGroup));
        this.navgrpService
            .getShortcutMenuList(
                group.navgrpPrimaryKey.languageId,
                group.navgrpPrimaryKey.navgrpId
            )
            .subscribe((resp) => {
                this.menuKeyInProgress = false;
                this.dataGridGridOptions.api.setRowData(resp);
                this.dataGridGridOptions.api.selectIndex(0, null, null);
                //   this.gridApi.getRowNode("ACPAY").selectThisNode(true);
            });
    }

    onGridReady(eve) {
        this.gridApi = eve.api;
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button && button.name && button.name === "yes") {
        }
        if (button && button.name && button.name === "no") {
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == "poUpMessageName") {
            this.popupMessageHandler(button);
        }
    }

    dataGridGridOptionsExportCsv() {
        var params = {};
        this.dataGridgridApi.exportDataAsCsv(params);
    }

    createSecWinDescrsGrid(): void {
        this.dataGridGridOptions = {
            paginationPageSize: 50,
        };
        this.dataGridGridOptions.editType = "fullRow";

        this.dataGridGridOptions.columnDefs = [
            {
                headerName: "Win Id",
                field: "win_ID",
                width: 150,
            },
            {
                headerName: "Description",
                field: "sdescr",
                width: 300,
            },
            {
                headerName: "Pwin ID",
                field: "pwin_ID",
                width: 300,
            },
            {
                headerName: "Navgrp ID",
                field: "navgrp_ID",
                width: 300,
            },
        ];

        this.rowSelection = "single";
    }

    getDisablekeysStatus() {
        const value = document.getElementsByTagName('ngb-modal-window');
        const resp = (value.length > 0);
        return resp;

    }

    async secWinGridSelectionChange() {
        var selectedRows = this.dataGridGridOptions.api.getSelectedRows();
        if (selectedRows.length === 1) {
            const component = ScreenMapping.getScreenMapping(selectedRows[0].win_ID);
            let usrAuthorizedToViewScreen = component
                ? await this.usrAuthorizedToViewScreen(selectedRows[0].win_ID)
                : false;

            if (component && usrAuthorizedToViewScreen) {
                if (selectedRows[0].win_ID === 'MCOND') {
                    this.popUpMessage = new PopUpMessage(
                        "poUpMessageName",
                        "Screen not available",
                        "This screen is out of scope",
                        "icon"
                    );
                    this.popUpMessage.buttons = [
                        new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
                    ];
                    const ref = this.modalService.open(PopUpMessageComponent, {
                        size: "lg",
                    });
                    ref.componentInstance.popupMessage = this.popUpMessage;
                    ref.componentInstance.showIcon = true;
                } else {
                    const ref = this.modalService.open(component, {
                        size: <any>"xl",
                        ...NGBModalOptions, windowClass: 'dashboard-modal'
                    });
                    ref.componentInstance.winID = selectedRows[0].win_ID;
                    ref.componentInstance.showIcon = true;
                }

            } else if (component && usrAuthorizedToViewScreen == false) {
                this.messageService.findByMessageId(29055).subscribe(res => {
                    this.popUpMessage = new PopUpMessage(
                        "poUpMessageName",
                        "DIAMOND@ Client/Server System",
                        '29055: ' + res[0].messageText
                            .replace('@1', sessionStorage.getItem('user'))
                            .replace('@2', selectedRows[0].win_ID),
                        "icon"
                    );
                    this.popUpMessage.buttons = [
                        new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
                    ];
                    const ref = this.modalService.open(PopUpMessageComponent, {
                        size: "lg",
                    });
                    ref.componentInstance.popupMessage = this.popUpMessage;
                    ref.componentInstance.showIcon = true;
                });

            } else {
                this.popUpMessage = new PopUpMessage(
                    "poUpMessageName",
                    "Screen not available",
                    "The screen you are looking for is not yet available.",
                    "icon"
                );
                this.popUpMessage.buttons = [
                    new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
                ];
                const ref = this.modalService.open(PopUpMessageComponent, {
                    size: "lg",
                });
                ref.componentInstance.popupMessage = this.popUpMessage;
                ref.componentInstance.showIcon = true;
            }
        }
    }

    createNavWin() {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let navWin = new NavWin();
            navWin.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.navWinService.createNavWin(navWin).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editNavWin = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    updateNavWin(winId: string) {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let navWin = new NavWin();
            navWin.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.navWinService.updateNavWin(navWin, winId).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editNavWin = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    saveNavWin() {
        if (this.editNavWin) {
            this.updateNavWin(this.navWin.winId);
        } else {
            this.createNavWin();
        }
    }

    deleteNavWin(winId: string) {
        this.navWinService.deleteNavWin(winId).subscribe(
            (response) => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    getNavWin(winId: string) {
        this.navWinService.getNavWin(winId).subscribe(
            (navWin) => {
                this.navWin = navWin;
                this.functionalGroupsForm.patchValue({
                    enterTheFiveCharacterKeywo: this.navWin.insertProcess,
                });
            }
        );
    }

    getNavWins() {
        this.navWinService.getNavWins().subscribe(
            (navWins) => {
                this.navWins = navWins;
            }
        );
    }

    createNavgrp() {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let navgrp = new Navgrp();
            navgrp.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.navgrpService.createNavgrp(navgrp).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editNavgrp = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    updateNavgrp(navgrpId: string) {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let navgrp = new Navgrp();
            navgrp.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.navgrpService.updateNavgrp(navgrp, navgrpId).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editNavgrp = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    saveNavgrp() {
        if (this.editNavgrp) {
            this.updateNavgrp(this.navgrp.navgrpId);
        } else {
            this.createNavgrp();
        }
    }

    deleteNavgrp(navgrpId: string) {
        this.navgrpService.deleteNavgrp(this.id).subscribe(
            (response) => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    getNavgrp(navgrpId: string) {
        this.navgrpService.getNavgrp(this.id).subscribe(
            (navgrp) => {
                this.navgrp = navgrp;
                this.functionalGroupsForm.patchValue({
                    enterTheFiveCharacterKeywo: this.navgrp.insertProcess,
                });
            }
        );
    }

    getMaxRow(rowCount: number) {
        return Math.ceil(rowCount);
    }

    getMenus(items: Navgrp[]) {
        const ItemPerRow = 9;
        var newList: any[] = [];
        if (items) {
            var iconPerRow = 0;
            var subItems: any[] = [];
            items.forEach((value, index) => {
                if (iconPerRow == ItemPerRow - 1) {
                    subItems.push(value);
                    newList.push(subItems);
                    subItems = [];
                    iconPerRow = 0;
                } else {
                    subItems.push(value);
                    iconPerRow += 1;
                }
            });
            newList.push(subItems);
        }
        return newList;
    }

    getNavgrps() {
        this.navgrpService.getNavgrps().subscribe(
            async (navgrps) => {
                let data = [];
                for (let item of navgrps) {
                    if (
                      item.sdescr === "Capitation" ||
                      item.sdescr === "IPA" ||
                      item.sdescr === "Interfaces" ||
                      item.sdescr === "Letters" ||
                      item.sdescr === "Service" ||
                      item.sdescr === "Add-On"
                    ) {
                      continue;
                    } else {
                      await new Promise((resolve) => {
                        data.push(item);
                        resolve();
                      });
                    }
                }
                this.navgrps = navgrps;
                this.navgrpMenues = this.getMenus(data);
                if (
                    (!this.selectedGroup ||
                        this.selectedGroup === "" ||
                        this.selectedGroup === null) &&
                    this.navgrpMenues.length > 0
                ) {
                    this.selectedGroup = this.navgrpMenues[0][0]; // select default group
                    this.menuKeyInProgress = true;
                    this.getShortcutMenuList(this.selectedGroup);
                }
            }
        );
    }

    createSecWinDescr() {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let secWinDescr = new SecWinDescr();
            secWinDescr.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.secWinDescrService.createSecWinDescr(secWinDescr).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editSecWinDescr = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    updateSecWinDescr(winId: string) {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let secWinDescr = new SecWinDescr();
            secWinDescr.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.secWinDescrService.updateSecWinDescr(secWinDescr, this.id).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editSecWinDescr = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    saveSecWinDescr() {
        if (this.editSecWinDescr) {
            this.updateSecWinDescr(this.secWinDescr.secWinDescrPrimaryKey.winId);
        } else {
            this.createSecWinDescr();
        }
    }

    deleteSecWinDescr(winId: string) {
        this.secWinDescrService.deleteSecWinDescr(this.id).subscribe(
            (response) => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    getSecWinDescr(winId: string) {
        this.secWinDescrService.getSecWinDescr(this.id).subscribe(
            (secWinDescr) => {
                this.secWinDescr = secWinDescr;
                this.functionalGroupsForm.patchValue({
                    enterTheFiveCharacterKeywo: this.secWinDescr.insertProcess,
                });
            }
        );
    }

    getSecWinDescrs() {
        this.secWinDescrService.getSecWinDescrs().subscribe(
            (secWinDescrs) => {
                this.secWinDescrs = secWinDescrs;
            }
        );
    }

    populateSecWinDescrsGrid() {
        this.secWinDescrService.getSecWinDescrs().subscribe(
            (secWinDescrs: SecWinDescr[]) => {
                if (secWinDescrs && secWinDescrs.length > 0) {
                    this.secWinDescrs = secWinDescrs.filter(
                        (secWin: SecWinDescr) =>
                            secWin.secWinDescrPrimaryKey.winId.indexOf("SHT") === -1
                    );
                } else {
                    this.alertMessage = this.alertMessageService.error(
                        "No records found."
                    );
                }
            }
        );
    }

    createNavgrpKw() {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let navgrpKw = new NavgrpKw();
            navgrpKw.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.navgrpKwService.createNavgrpKw(navgrpKw).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully created', NgbToastType.Success);
                    this.editNavgrpKw = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    updateNavgrpKw(navgrpId: string) {
        this.formValidation.validateForm();
        if (this.functionalGroupsForm.valid) {
            let navgrpKw = new NavgrpKw();
            navgrpKw.insertProcess = this.functionalGroupsForm.get(
                "enterTheFiveCharacterKeywo"
            ).value;
            this.navgrpKwService.updateNavgrpKw(navgrpKw, this.id).subscribe(
                (response) => {
                    this.toastr.showToast('Record successfully updated', NgbToastType.Success);
                    this.editNavgrpKw = false;
                }
            );
        } else {
            this.alertMessage = this.alertMessageService.error(
                "Some required information is missing or incomplete. Please correct your entries and try again."
            );
        }
    }

    saveNavgrpKw() {
        if (this.editNavgrpKw) {
            this.updateNavgrpKw(this.navgrpKw.navgrpId);
        } else {
            this.createNavgrpKw();
        }
    }

    deleteNavgrpKw(navgrpId: string) {
        this.navgrpKwService.deleteNavgrpKw(this.id).subscribe(
            (response) => {
                this.toastr.showToast('Record successfully deleted', NgbToastType.Success);
            }
        );
    }

    getNavgrpKw(navgrpId: string) {
        this.navgrpKwService.getNavgrpKw(this.id).subscribe(
            (navgrpKw) => {
                this.navgrpKw = navgrpKw;
                this.functionalGroupsForm.patchValue({
                    enterTheFiveCharacterKeywo: this.navgrpKw.insertProcess,
                });
            }
        );
    }

    getNavgrpKws() {
        this.navgrpKwService.getNavgrpKws().subscribe(
            (navgrpKws) => {
                this.navgrpKws = navgrpKws;
            }
        );
    }

    openFunctionalGroupShortcut() {
        this.sharedService.shortcutModalState = true;
        const ref = this.modalService.open(FunctionalGroupShortCutComponent, {
            size: "lg"
        });
        ref.componentInstance.showIcon = true;
    }

    // Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.functionalGroupsForm = this.formBuilder.group(
            {
                groupWithASingleClickOrT: ["", {updateOn: "blur", validators: []}],
                fromTheList: ["", {updateOn: "blur", validators: []}],
                enterTheFiveCharacterKeywo: ["", {updateOn: "blur", validators: []}],
                textArea: ["", {updateOn: "blur", validators: []}],
            },
            {updateOn: "submit"}
        );
    }

    resolved(captchaResponse: string) {
    }

    navigateToSelectGroup() {
        const component = ScreenMapping.getScreenMapping(
            this.selectedGroup.navgrpPrimaryKey.navgrpId
        );
        if (component) {
            const ref = this.modalService.open(component, {size: <any>"xl"});
            ref.componentInstance.showIcon = true;
        } else {
            this.popUpMessage = new PopUpMessage(
                "poUpMessageName",
                "Screen not available",
                "The screen you are looking for is not yet avaialble.",
                "icon"
            );
            this.popUpMessage.buttons = [
                new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
            ];
            let ref = this.modalService.open(PopUpMessageComponent, {size: "lg"});
            ref.componentInstance.popupMessage = this.popUpMessage;
            ref.componentInstance.showIcon = true;
            ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                this.popupMessageHandler(event); //< you now have access to the event that was emitted, to pass to your grandfather component.
            });
        }
    }

    private async usrAuthorizedToViewScreen(winID: string): Promise<boolean> {
        const isSuperUser = JSON.parse(sessionStorage.getItem("isSuperUser"));
        if (isSuperUser) {
            return isSuperUser;
        }
        const parsedToken = this.securityService.getCurrentUserToken();
        let userId;
        if (parsedToken) {
            userId = parsedToken.sub;
        }
        let usrAuthorizedToViewScreen = true;

        await this.secUserService
            .getSecUser(userId)
            .toPromise()
            .then(async (user: SecUser) => {
                await this.secWinService
                    .getSecWin(winID, user.dfltTemplate)
                    .toPromise()
                    .then(
                        (secWin: SecWin) => {
                            let secWinViewModel: SecWinViewModel = new SecWinViewModel(
                                secWin
                            );
                            usrAuthorizedToViewScreen = secWinViewModel.hasSelectPermission();
                        },
                        (error) => {
                            usrAuthorizedToViewScreen = false;
                        }
                    )
            });
        return usrAuthorizedToViewScreen;
    }

    helpScreen() {
        const viewModal = this.modalService.open(MainHelpComponent, {windowClass: "myCustomModalClass"});
        viewModal.componentInstance.defaultFile = 'Getting_Started_User_Documentation_Overview.htm'
    }
}
