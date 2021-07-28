import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormValidation } from "../../validators/form-validation.pipe";
import { getDynamicFormsShortcutKeys, SharedService } from "../../services/shared.service";
import { KeyboardShortcutsComponent, ShortcutInput } from "ng-keyboard-shortcuts";
import { RequiredValidator } from "../../validators/required.validator";
import { FORM_FIELD_ACTION_TYPES, FormField, FormRow } from "../../models/models";
import { EMAIL_ADDRESS_PATTERN } from "../../validators/custom-validator";
import { faLevelDownAlt, faTrash, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { DatePickerConfig } from "../../config";
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { SearchboxComponent } from "../searchbox/searchbox.component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PopUpMessage, PopUpMessageButton } from "../pop-up-message";
import { PopUpMessageComponent } from "../pop-up-message/pop-up-message/pop-up-message.component";
import { Subject } from "rxjs";
import { TablesAndColumnsComponent } from "../tables-and-columns/tables-and-columns.component";
import {MessageMasterDtlService} from "../../../api-services";
import {Mask} from "../../pipes/text-format.pipe";


@Component({
    selector: "dynamic-form",
    styleUrls: ["./dynamic-form.component.scss"],
    templateUrl: "./dynamic-form.component.html",
})
export class DynamicFormComponent
    implements OnInit, AfterViewInit, OnChanges, OnDestroy {
    valueTrue = false;
    @Input() title: string;
    @Input() config: Array<FormField>;
    @Input() prevState: Array<FormRow> = [];
    @Input() addNewDataRow: Array<FormRow> = [];

    @Input() isResetForm = false;
    @Input() isSaveForm = false;
    @Input() displayCheckBox = false;
    @Input() isFormEditable = true;
    @Input() buttonDisabled = false;
    @Input() showRemoveButton = true;
    @Input() isAddNewRow = false;
    @Input() showSubmitButton = false;
    @Input() showAddNewLine = true;
    @Input() showResetButton = false;
    @Input() noOfRecords = null;
    @Output() numberValidation = new EventEmitter<boolean>();
    @Output() formSubmitted = new EventEmitter<any>();
    @Output() onAddRowButton = new EventEmitter<any>();

    @Output() onKeyUpFields = new EventEmitter<any>();
    @Output() onChangeFields = new EventEmitter<any>();
    @Output() onFieldFocusOut = new EventEmitter<any>();
    @Output() onNewRowAdded = new EventEmitter<any>();
    @Output() onRowDeleted = new EventEmitter<any>();
    @Output() onChangeFieldsIndex = new EventEmitter<any>();
    datePickerConfig = DatePickerConfig;
    @Output() displayLookupSearch = new EventEmitter<any>();
    @Output() selectStatus = new EventEmitter<any>();
    @Output() formValueChanged = new EventEmitter<any>();
    @Output() onRestoreClick = new EventEmitter<any>();
    @Output() onRowClick = new EventEmitter<any>();

    faLevel = faLevelDownAlt;
    faWindowRestore = faWindowRestore;
    faTrash = faTrash;

    formValidation: FormValidation;
    submitted = false;
    rowsCount = 0;
    form: FormGroup;
    shortcuts: ShortcutInput[] = [];
    @ViewChild(KeyboardShortcutsComponent)
    private keyboard: KeyboardShortcutsComponent;
    totalPrevRecords: number;
    emitChangeFieldWhenf5: any;

    constructor(
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private sharedService: SharedService,
        private cdr: ChangeDetectorRef,
        private mask: Mask,
        private dateFormatPipe: DateFormatPipe,
        private messageService: MessageMasterDtlService,
    ) {
    }

    ngOnInit() {
        if (!this.form) {
            this.initForm();
        }
    }

    initForm() {
        if (
            this.displayCheckBox &&
            !this.config.some((field) => field.name == "selectedRow")
        ) {
            let field = this.getCheckboxField();
            field.name = "selectedRow";
            this.config.push(field);
        }
        this.form = this.formBuilder.group({
            fields: new FormArray([]),
        });
    }

    onFormValueChanges(formField: any, field, index) {
        if (this.prevState.length > 0 && this.prevState.length > index) {
            // In case of existing field update
            this.prevState[index].action = FORM_FIELD_ACTION_TYPES.UPDATE; // updated the action of updated row
        }
        if (formField && formField.emitOnChange) {
            let data: any = [];
            data["data"] = this.form.value.fields[index];
            data["index"] = index;
            data["field"] = field;
            this.onFieldFocusOut.emit(data);
        }
    }

    onFormValid(event) {
        let value = event.target.value;
        if (value.length === 9 || value.length === 7 || value.length === 0) {
        } else {
            this.valueTrue = true;
        }
    }

    ngAfterViewInit(): void {
        this.shortcuts.push(...getDynamicFormsShortcutKeys(this));
        this.cdr.detectChanges();
    }

    fileNewAddNewRow() {
        this.addNewRow(this.getConfigCopy());
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!this.form) {
            this.initForm();
        }

        // In case of IsSave Form Value changes
        if (changes["isSaveForm"]) {
            if (
                !changes.isSaveForm.currentValue &&
                changes.isSaveForm.previousValue
            ) {
                return;
            } else if (this.isSaveForm) {
                this.isSaveForm = false;
                this.onSubmit();
                return;
            }
        }

        if (this.isResetForm && changes["isResetForm"]) {
            if (changes.isResetForm.currentValue) {
                this.resetForm();
                return;
            }
        } else if (this.isAddNewRow && changes["isAddNewRow"]) {
            if (changes.isAddNewRow.currentValue) {
                this.addNewRow(this.getConfigCopy());
                return;
            }
        }

        if (this.addNewDataRow && changes.addNewDataRow && changes.addNewDataRow.currentValue) {
            changes.addNewDataRow.currentValue.forEach((record: FormRow, index) => {
                this.addNewRow(record.formFields);
            });
            return;
        }

        if (this.prevState && this.prevState.length > 0) {
            this.totalPrevRecords = this.prevState.length; // set previous records count

            this.prevState.forEach((record: FormRow, index) => {
                this.addNewRow(record.formFields);
            });
        } else if (this.prevState && this.prevState.length === 0) {
            this.resetForm();
        }

        this.formValueChanged.emit(true)
    }

    createGroup(config: Array<FormField>) {
        const group = this.formBuilder.group({});
        config.forEach((control: FormField) =>
            group.addControl(
                control.name,
                this.formBuilder.control(
                    { value: control.value, disabled: control.disabled },
                    this.getControlValidation(control)
                )
            )
        );
        this.addFormFields(group);
    }

    /**
     * set control validations
     * @param control
     */
    getControlValidation(control) {
        let validations = [];
        if (control.required) {
            validations.push(Validators.required);
            validations.push(RequiredValidator.cannotContainSpace);
        }
        if (control.minLength) {
            validations.push(Validators.minLength(control.minLength));
        }
        if (control.maxLength) {
            validations.push(Validators.maxLength(control.maxLength));
        }
        if (control.type === "email") {
            validations.push(Validators.pattern(EMAIL_ADDRESS_PATTERN));
        }
        if (control.min) {
            validations.push(Validators.min(control.min));
        }
        if (control.max) {
            validations.push(Validators.max(control.max));
        }
        return validations;
    }

    /**
     * Get Error messages form FormValidation
     * @param field
     * @param fieldName
     * @param index
     */
    getErrorMessage(field, fieldName, index) {
        if (index > -1) {
            fieldName += index;
        }
        this.formValidation = new FormValidation(field);

        return this.formValidation.errorMessage(fieldName);
    }

    /**
     * Add/Remove Record
     * @param group
     */
    addFormFields(group) {
        if (this.t && this.t.length < this.rowsCount) {
            this.t.push(group);
        }
    }

    resetForm() {
        if (!this.t) {
            return;
        }
        this.onRestoreClick.emit(this.prevState);

        for (let i = this.t.length; i >= 0; i--) {
            this.t.removeAt(i);
        }
        this.rowsCount = 0;
        this.prevState = [];
        this.submitted = false;
    }

    removeRecord(index) {
        if (this.prevState.length > 0 && this.prevState.length > index) {
            // In case of existing field update
            this.prevState[index].action = FORM_FIELD_ACTION_TYPES.DELETE; // updated the action of updated row
            this.onRowDeleted.emit(1);
        } else {
            this.t.removeAt(index);
            this.rowsCount--;
            this.cdr.detectChanges();
        }
    }

    getConfigCopy() {
        return JSON.parse(JSON.stringify(this.config));
    }

    addNewRow(fields: FormField[], isDefaultRow = true) {
        this.onAddRowButton.emit(this);
        if (this.form && this.form.invalid) {
            return;
        }
        this.submitted = false;

        let config: Array<FormField> = [];
        if (this.displayCheckBox) {
            config.push(this.getCheckboxField());
        }

        fields.forEach((field: FormField) => {
            field.name = field.name + this.rowsCount;
            if (field.type === "date") {
                field.value = this.dateFormatPipe.defaultDisplayDateFormat(field.value);
            }
            if (field.defaultValue && !field.value) {
                field.value = field.defaultValue;
            }
            if (field.name === ('matrixSeq' + this.rowsCount)) {
                field.value = (this.t.length + 1);
                field.value = (field.value < 10) ? ('0' + field.value) : field.value;
            }
            config.push(field);
        });

        this.rowsCount++;
        if (!isDefaultRow) {
            this.onNewRowAdded.emit(1);
        }
        this.createGroup(config);
    }

    isShowRecord(index: number): boolean {
        if (!this.prevState) {
            return;
        }

        if (index >= this.prevState.length) {
            return true;
        }
        if (!this.prevState[index].action) {
            return true;
        }
        return this.prevState[index].action !== "delete";
    }

    // convenience getters for easy access to form fields
    get f() {
        return this.form && this.form.controls;
    }

    get t() {
        return this.f && (this.f.fields as FormArray);
    }

    getCheckboxField() {
        let field = new FormField();
        field.name = "selectedRow" + this.rowsCount;
        field.label = "";
        field.type = "checkbox";

        return field;
    }

    getFieldErrors(field, fieldName, index) {
        fieldName += index;
        return field.controls[fieldName].errors;
    }

    getControl(field, fieldName, index) {
        fieldName += index;
        if (field.controls[fieldName]) {
            return field.controls[fieldName].value;
        } else {
            return null;
        }
    }

    onFieldChange(field: FormField, index: any, event?, eventField?, fromLookup = false) {
        this.selectStatus.emit(true);
        setTimeout(() => {
             if (fromLookup) {
               this.openTableLookupScreen(field, eventField, index);
             }
            this.onFormValueChanges(event, eventField, index);
            if (field.emitOnChange) {
                let data: any = [];
                data["data"] = this.form.value.fields[index];
                data["index"] = index;
                data["field"] = field;
                this.onChangeFields.emit(data);
               
            }
        }, 1000);

        if (field.name === 'faxNumber') {
            let faxNum = eventField['value']['faxNumber' + index].toString().length;
            if (faxNum === 0 || faxNum === 7 || faxNum === 9 ||
                faxNum === 10 || faxNum === 12 || faxNum === 15 || faxNum === 20) {
                this.numberValidation.emit(true);
            } else {
                this.messageService.findByMessageId(30140).subscribe(resp => {
                    let popMsg = new PopUpMessage(
                        'DIAMOND @ Client/Server System',
                        'DIAMOND @ Client/Server System',
                        '30140: ' + resp[0].messageText.replace("@1", "Phone/Fax Number")
                            .replace("@2", "0, 7, 9, 10, 12, 15, 20"),
                        'icon');
                    popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                    ref.componentInstance.popupMessage = popMsg;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                        if (event.name == "Ok") {
                            this.numberValidation.emit(false);
                        }
                    });
                })
            }
        }
        if (field.name === 'phoneNumber') {
            let phoneNum = eventField['value']['phoneNumber' + index].toString().length;
            if (phoneNum === 0 || phoneNum === 7 || phoneNum === 9 ||
                phoneNum === 10 || phoneNum === 12 || phoneNum === 15 || phoneNum === 20) {
                this.numberValidation.emit(true);
            } else {
                this.messageService.findByMessageId(30140).subscribe(resp => {
                    let popMsg = new PopUpMessage(
                        'DIAMOND @ Client/Server System',
                        'DIAMOND @ Client/Server System',
                        '30140: ' + resp[0].messageText.replace("@1", "Phone/Fax Number")
                            .replace("@2", "0, 7, 9, 10, 12, 15, 20"),
                        'icon');
                    popMsg.buttons = [new PopUpMessageButton('ok', 'Ok', 'btn btn-primary')];
                    let ref = this.modalService.open(PopUpMessageComponent, { size: 'lg' });
                    ref.componentInstance.popupMessage = popMsg;
                    ref.componentInstance.showIcon = true;
                    ref.componentInstance["buttonclickEvent"].subscribe((event: any) => {
                        if (event.name == "Ok") {
                            this.numberValidation.emit(false);
                        }
                    });
                })
            }
        }
    }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.formSubmitted.emit(this.form.getRawValue().fields);
    }

    ngOnDestroy() {
        this.resetForm();
    }

    changeFieldValue(event, formField, field, i) {
        if (
            event.key === "F5" &&
            formField.isLookup &&
            formField.isLookup === true
        ) {
            event.preventDefault();
            this.openLookupScreen(formField, field, i);
        } else if (event.key === 'F5' && formField.isTableLookup && formField.isTableLookup === true) {
            event.preventDefault();
            if (formField.emitChangeFieldWhenf5) {
                this.onFieldChange(formField, i, event, field, true);
            } else {
                this.openTableLookupScreen(formField, field, i);
            }
        } else if (event.key === 'Tab' && formField.isTableLookup && formField.isTableLookup === true) {
            let fieldName = formField.tableNameField + "" + i;
            if (formField.name.toLowerCase().indexOf('table') >= 0 && formField.data) {
                let table = formField.data.filter(f => f.tableName === event.target.value);
                if (table && table.length > 0) {
                } else {
                    this.t.controls[i].get(fieldName).setValue(null);
                }
            }
        } else {
            this.onKeyUpFields.emit({ formField, i, event, field });
        }
    }

    openTableLookupScreen(formField, field, i) {
        let fieldName = formField.tableNameField + "" + i;
        let fieldName1 = formField.columnNameField + "" + i;
        const ref = this.modalService.open(TablesAndColumnsComponent);
        ref.componentInstance.showIcon = true;
        ref.componentInstance.tables = formField.data;
        ref.componentInstance.onRowSelected.subscribe((res: any) => {
            if (res) {
                field.get(fieldName).setValue(res["tableName"]);
                field.get(fieldName1).setValue(res["columnName"]);

            }
        });
    }

    openLookupScreen(formField, field, i) {
        let fieldName = formField.name + "" + i;
        let selectField = this.prevState[0]["formFields"].filter(
            (f) => f.label === formField.label
        );
        if (selectField && selectField[0]) {
            let searchModel = selectField[0].searchModel;
            let ref = this.modalService.open(SearchboxComponent);
            ref.componentInstance.searchModel = searchModel;
            ref.componentInstance.showIcon = true;
            ref.componentInstance.defaultLoad = true;
            ref.componentInstance.onRowSelected.subscribe((resp: any) => {
                field.get(fieldName).setValue(resp[formField["lookupResponseField"]]);
            });
        }
    }

    fieldClick(field: FormField, index: any, event?, eventField?, fromLookup = false) {
        let data: any = [];
        data["data"] = this.form.value.fields[index];
        data["index"] = index;
        data["field"] = field;
        this.onRowClick.emit(data);
    }

}
