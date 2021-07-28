/* Copyright (c) 2020 . All Rights Reserved. */

import {ChangeDetectorRef, Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import {DatePipe} from '@angular/common';
import {Mask} from '../../../shared/pipes/text-format.pipe';
import {CustomValidators} from '../../../shared/validators/custom-validator';
import {DateFormatPipe} from '../../../shared/pipes/date-format.pipe';
import {FormValidation} from '../../../shared/validators/form-validation.pipe';
import {PopUpMessage, PopUpMessageButton} from '../../../shared/components/pop-up-message';
import {AlertMessage, AlertMessageService} from '../../../shared/components/alert-message';
import {DatePickerConfig} from '../../../shared/config';
import {PopUpMessageComponent} from '../../../shared/components/pop-up-message/pop-up-message/pop-up-message.component';
import {GridOptions} from 'ag-grid-community';
import {ConversionFactorHdrService} from '../../../api-services/conversion-factor-hdr.service';
import {ConversionFactorHdr} from '../../../api-models/conversion-factor-hdr.model';
import {NgbToastType} from 'ngb-toast';
import {PriceScheduleMasterService} from '../../../api-services/price-schedule-master.service';
import {ConversionFactorTypeService} from '../../../api-services/conversion-factor-type.service';
import {MessageMasterDtlService, RegionMasterService} from '../../../api-services';
import {RvuScaleTypeService} from '../../../api-services/rvu-scale-type.service';
import {ToastService} from '../../../shared/services/toast.service';
import {FormRow, Menu} from '../../../shared/models/models';
import {getCobOrderLiabilityShortcutKeys, getConversionFactorShortcutKeys} from '../../../shared/services/shared.service';
import {ShortcutInput} from 'ng-keyboard-shortcuts';
import {Form} from '../../../shared/helpers/form.helper';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PricingHelpComponent} from "../pricing-help/pricing-help.component";
import {MessageMasterDtl} from "../../../api-models";


// Use the Component directive to define the ConversionFactorComponent as an Angular component
//
// The moduleId property specifies the module id of the module that contains this component
// and is used to resolve relative paths for component specific stylesheets and HTML view templates.
// See also: https://angular.io/docs/ts/latest/cookbook/component-relative-paths.html
//
// The selector property defines the HTML selector that can be used in HTML to link or navigate to this UI component.
//
// The templateUrl specifies a url to a file an HTML file that is rendered by this component.

@Component({

    selector: 'conversionfactor',
    templateUrl: './conversion-factor.component.html',
    providers: [DatePipe,
        Mask,
        CustomValidators,
        DateFormatPipe,
        ConversionFactorHdrService,
        PriceScheduleMasterService,
        ConversionFactorTypeService,
        RegionMasterService,
        RvuScaleTypeService
    ]
})

export class ConversionFactorComponent implements OnInit {
    @Input() showIcon = true;
    public dataGrid001GridOptions: GridOptions;
    private dataGrid001gridApi: any;
    private dataGrid001gridColumnApi: any;
    public alertMessage: AlertMessage;
    public displayMessage: any;
    public popUpMessage: PopUpMessage;
    public datePickerConfig = DatePickerConfig;
    editConversionFactorHdr: boolean;
    conversionFactorHdr: ConversionFactorHdr;
    conversionFactorHdrs: ConversionFactorHdr[];
    conversionFactorForm: FormGroup;
    formValidation: FormValidation;
    priceSchedules: any[] = [];
    priceRegions: any[] = [];
    scaleTypes: any[] = [];
    convFactorIds: any[] = [];
    public shortcuts: ShortcutInput[] = [];
    public menu: Menu[] = [];
    screenCloseRequest: Boolean = false;
    isFormDataChangeStatus: Boolean = false;
    @ViewChild('popUpMesssage', {static: true}) child: PopUpMessageComponent;

    // Use constructor injection to inject an instance of a FormBuilder
    constructor(
        private formBuilder: FormBuilder,
        private mask: Mask,
        private customValidators: CustomValidators,
        private alertMessageService: AlertMessageService,
        private dateFormatPipe: DateFormatPipe,
        private conversionFactorHdrService: ConversionFactorHdrService,
        private priceScheduleMasterService: PriceScheduleMasterService,
        private conversionFactorTypeService: ConversionFactorTypeService,
        private regionMasterService: RegionMasterService,
        private cdr: ChangeDetectorRef,
        private rvuScaleTypeService: RvuScaleTypeService,
        private toastService: ToastService,
        private modalService: NgbModal,
        private messageService: MessageMasterDtlService,
        public activeModal: NgbActiveModal) {
    }

    // Most initial setup should be done in the ngOnInit() life-cycle hook function
    // rather than in the constructor for this class in order to ensure that the
    // resources are fully loaded before performing the initial setup processing.
    ngOnInit(): void {
        this.createForm();
        this.displayMessage = {};
        this.formValidation = new FormValidation(this.conversionFactorForm);
        this.createDataGrid001();
        this.getConversionFactorHdrs();
        this.getPriceSchedules();
        this.getPriceRegions();
        this.getScaleTypes();
        this.getConvFactorIds();
        this.menuInit();
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getConversionFactorShortcutKeys(this));
        this.cdr.detectChanges();
    }

    showPopUp() {
        this.popUpMessage = new PopUpMessage('poUpMessageName', 'Pop-up message title', 'Pop-up message', 'icon');
        this.popUpMessage.buttons = [new PopUpMessageButton('yes', 'Yes', 'btn btn-primary'), new PopUpMessageButton('no', 'No', 'btn btn-primary')];
        this.child.showMesssage()
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name == 'yes') {
            console.log('button yes has been click!');
        }
        if (button.name == 'no') {
            console.log('button No has been click!');
        }
    }

    popUpButtonHandler(button: PopUpMessageButton) {
        if (button.popupMessage.name == 'poUpMessageName') {
            this.popupMessageHandler(button)
        }
    }

    getPriceSchedules() {
        this.priceScheduleMasterService.getPriceScheduleMasters().subscribe(codes => {
            this.priceSchedules = codes;
        });
    }

    getPriceRegions() {
        this.regionMasterService.getRegionMasters().subscribe(codes => {
            this.priceRegions = codes;
        });
    }

    getScaleTypes() {
        this.rvuScaleTypeService.getRvuScaleTypes().subscribe(codes => {
            this.scaleTypes = codes;
        });
    }

    getConvFactorIds() {
        this.conversionFactorTypeService.getConversionFactorTypes().subscribe(codes => {
            this.convFactorIds = codes;
        });
    }

    createConversionFactorHdr() {
        this.formValidation.validateForm();
        if (this.conversionFactorForm.valid) {
            let conversionFactorHdr = new ConversionFactorHdr();
            conversionFactorHdr.priceSchedule = this.conversionFactorForm.get('priceSchedule').value;
            conversionFactorHdr.pricingRegion = this.conversionFactorForm.get('priceRegion').value;
            conversionFactorHdr.effectiveDate = Form.getDatePickerValue(this.conversionFactorForm, 'effectiveDate');
            conversionFactorHdr.scaleType = this.conversionFactorForm.get('scaleType').value;
            conversionFactorHdr.description = this.conversionFactorForm.get('description').value;
            this.conversionFactorHdrService.createConversionFactorHdr(conversionFactorHdr).subscribe(response => {
                this.toastService.showToast('Record successfully created', NgbToastType.Success);
                this.editConversionFactorHdr = false;
            });

        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }

    updateConversionFactorHdr(seqConvFactor: number) {
        this.formValidation.validateForm();
        if (this.conversionFactorForm.valid) {
            let conversionFactorHdr = new ConversionFactorHdr();
            conversionFactorHdr.priceSchedule = this.conversionFactorForm.get('priceSchedule').value;
            conversionFactorHdr.pricingRegion = this.conversionFactorForm.get('priceRegion').value;
            conversionFactorHdr.effectiveDate =  Form.getDatePickerValue(this.conversionFactorForm, 'effectiveDate');
            conversionFactorHdr.scaleType = this.conversionFactorForm.get('scaleType').value;
            conversionFactorHdr.description = this.conversionFactorForm.get('description').value;
            this.conversionFactorHdrService.updateConversionFactorHdr(conversionFactorHdr, seqConvFactor).subscribe(response => {
                this.toastService.showToast('Record successfully updated', NgbToastType.Success);
                this.editConversionFactorHdr = false;
            });
        } else {
            this.alertMessage = this.alertMessageService.error('Some required information is missing or incomplete. Please correct your entries and try again.');
        }
    }


    saveConversionFactorHdr() {
        if (this.editConversionFactorHdr) {
            this.updateConversionFactorHdr(this.conversionFactorHdr.seqConvFactor)
        } else {
            this.createConversionFactorHdr();
        }
    }

    deleteConversionFactorHdr(seqConvFactor: number) {
        this.conversionFactorHdrService.deleteConversionFactorHdr(seqConvFactor).subscribe(response => {
            this.toastService.showToast('Record successfully deleted', NgbToastType.Success);
        });
    }

    getConversionFactorHdr(seqConvFactor: number) {
        this.conversionFactorHdrService.getConversionFactorHdr(seqConvFactor).subscribe(conversionFactorHdr => {
            this.conversionFactorHdr = conversionFactorHdr;
            this.conversionFactorForm.patchValue({
                'priceSchedule': this.conversionFactorHdr.priceSchedule,
                'priceRegion': this.conversionFactorHdr.pricingRegion,
                'effectiveDate': this.dateFormatPipe.defaultDisplayDateFormat(this.conversionFactorHdr.effectiveDate),
                'scaleType': this.conversionFactorHdr.scaleType,
                'description': this.conversionFactorHdr.description,
            }, {emitEvent: false});
            setTimeout(() => {
                this.isFormDataModified()
            }, 2000)
        });
    }

    getConversionFactorHdrs() {
        this.conversionFactorHdrService.getConversionFactorHdrs().subscribe(conversionFactorHdrs => {
            this.conversionFactorHdrs = conversionFactorHdrs;
            this.dataGrid001GridOptions.api.setRowData( this.conversionFactorHdrs);
            this.dataGrid001GridOptions.api.selectIndex(0, false, false);
        });
    }

    onRowSelectedGrid001(event) {
        if (!event.node.selected) {
            return;
        }
        this.editConversionFactorHdr = true;
        this.getConversionFactorHdr(event.data.seqConvFactor);
    }

    createDataGrid001(): void {
        this.dataGrid001GridOptions =
            {
                paginationPageSize: 50
            };
        this.dataGrid001GridOptions.editType = 'fullRow';
        this.dataGrid001GridOptions.columnDefs = [
            {
                headerName: 'Price Sched',
                field: 'priceSchedule',
                width: 200,
                headerCheckboxSelection: true,
                headerCheckboxSelectionFilteredOnly: true,
                checkboxSelection: true
            },
            {
                headerName: 'Price Region',
                field: 'pricingRegion',
                width: 200
            },
            {
                headerName: 'Effective Date',
                field: 'effectiveDate',
                width: 200
            },
            {
                headerName: 'Scale Type',
                field: 'scaleType',
                width: 200
            },
            {
                headerName: 'Description',
                field: 'description',
                width: 200
            }
        ];
    }

// Use a FormBuilder to create a FormGroup to define the Form Model for the view
    // See: https://angular.io/docs/ts/latest/guide/reactive-forms.html#!#intro
    createForm() {
        // FormBuilder.group is a factory method that creates a FormGroup
        // FormBuilder.group takes an object whose keys and values are FormControl names and their definitions.
        this.conversionFactorForm = this.formBuilder.group({
            priceSchedule: ['', {updateOn: 'blur', validators: []}],
            priceRegion: ['', {updateOn: 'blur', validators: []}],
            effectiveDate: ['', {updateOn: 'blur', validators: []}],
            scaleType: ['', {updateOn: 'blur', validators: []}],
            description: ['', {updateOn: 'blur', validators: []}],
            convFactorId: ['', {updateOn: 'blur', validators: []}],
            convFactorName: ['', {updateOn: 'blur', validators: []}],
            factor: ['', {updateOn: 'blur', validators: []}]
        }, {updateOn: 'submit'});
    }

    resolved(captchaResponse: string) {
        console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    private menuInit() {
        this.menu = [
            {
                menuItem: 'File',
                dropdownItems: [
                    {name: 'New', shortcutKey: 'Ctrl+M'},
                    {name: 'Open', shortcutKey: 'Ctrl+O'},
                    {name: 'Save', shortcutKey: 'Ctrl+S'},
                    {name: 'Close', shortcutKey: 'Ctrl+F4'},
                    {isHorizontal: true},
                    {name: 'Main Menu...', shortcutKey: 'F2'},
                    {name: 'Shortcut Menu...', shortcutKey: 'F3'},
                    {isHorizontal: true},
                    {name: 'Print', disabled: true},
                    {isHorizontal: true},
                    {name: 'Exit', shortcutKey: 'Alt+F4'}
                ]
            },
            {
                menuItem: 'Edit',
                dropdownItems: [
                    {name: 'Undo', shortcutKey: 'Ctrl+Z', disabled: true},
                    {isHorizontal: true},
                    {name: 'Cut', shortcutKey: 'Ctrl+X', disabled: true},
                    {name: 'Copy', shortcutKey: 'Ctrl+C', disabled: true},
                    {name: 'Paste', shortcutKey: 'Ctrl+V'},
                    {isHorizontal: true},
                    {name: 'Next', shortcutKey: 'F8'},
                    {name: 'Previous', shortcutKey: 'F7'},
                    {isHorizontal: true},
                    {name: 'Lookup', shortcutKey: 'F5'}
                ]
            },
            {
                menuItem: 'Notes',
                dropdownItems: [
                    {name: 'Notes', shortcutKey: 'F4', disabled: true}
                ]
            },
            {
                menuItem: 'Window',
                dropdownItems: [
                    {name: 'Tile', shortcutKey: 'Shift+Alt+T'},
                    {name: 'Layer', shortcutKey: 'Shift+Alt+L'},
                    {name: 'Cascade', shortcutKey: 'Shift+Alt+C'},
                    {name: 'Arrange Icons', shortcutKey: 'Shift+Alt+I'},
                    {isHorizontal: true},
                    {name: 'Show Timestamp', shortcutKey: 'Shift+Alt+S'},
                    {name: 'Audit Display', shortcutKey: 'Shift+Alt+A'},
                    {isHorizontal: true},
                    {name: '1 Main Menu'},
                    {name: '2 Conversion Factor'}
                ]
            },
            {
                menuItem: 'Help',
                dropdownItems: [
                    {name: 'Contents'},
                    {name: 'Search for Help on...'},
                    {name: 'This Window', shortcutKey: 'F1'},
                    {isHorizontal: true},
                    {name: 'Glossary'},
                    {name: 'Getting Started'},
                    {name: 'How to use Help'},
                    {isHorizontal: true},
                    {name: 'About Diamond Client/Server'}
                ]
            }
        ]
    }

    public onMenuItemClick(event: any) {
        if (event.menu.menuItem === 'Help') {             // handle File actions
            this.helpScreen();
        }
    }

    helpScreen = () => {
        const viewModal = this.modalService.open(PricingHelpComponent, { windowClass: "myCustomModalClass" });
        viewModal.componentInstance.defaultFile = 'CONVF_Conversion_Factors.htm'
    };

    modalClose = () => {
        this.screenCloseRequest = true;
        if (this.isFormDataChangeStatus === true) {
            this.messageService.findByMessageId(29065).subscribe((message: MessageMasterDtl[]) => {
                this.popupAlert(message[0].messageText, 'Conversion Factor')
            })
        } else {
            this.activeModal.close();
        }
    };

    popupAlert = (message: string, title: string) => {
        try {
            if (!message) {
                return;
            }
            let popUpMessage = new PopUpMessage('popUpMessageName', title, message, 'icon');
            popUpMessage.buttons.push(new PopUpMessageButton('Yes', 'Yes', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('No', 'No', ''));
            popUpMessage.buttons.push(new PopUpMessageButton('Cancel', 'Cancel', ''));
            let ref = this.modalService.open(PopUpMessageComponent);
            ref.componentInstance.showIcon = true;
            ref.componentInstance.popupMessage = popUpMessage;
            ref.componentInstance.buttonclickEvent.subscribe((resp) => {
                if (resp.name === 'Yes') {

                } else if (resp.name === 'No') {
                    if (this.screenCloseRequest === true) {
                        this.activeModal.close();
                    }
                }
            })
        } catch (e) {
            console.log(e);
        }
    };

    isFormDataModified() {
        this.conversionFactorForm.valueChanges.subscribe(res => {
            this.isFormDataChangeStatus = true;
        })
    }
}
