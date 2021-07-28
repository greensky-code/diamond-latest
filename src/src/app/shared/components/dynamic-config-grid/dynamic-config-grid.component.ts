import {
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	SimpleChanges,
	ViewChild
} from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DynamicConfigFormRow, FORM_FIELD_ACTION_TYPES, FormField, FormRow } from "../../models/models";
import { DatePickerConfig } from "../../config";
import { faLevelDownAlt, faSave, faTimesCircle, faTrash, faWindowRestore } from "@fortawesome/free-solid-svg-icons";
import { FormValidation } from "../../validators/form-validation.pipe";
import { KeyboardShortcutsComponent, ShortcutInput } from "ng-keyboard-shortcuts";
import { getDynamicConfigFormsShortcutKeys, SharedService } from "../../services/shared.service";
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { RequiredValidator } from "../../validators/required.validator";
import { EMAIL_ADDRESS_PATTERN } from "../../validators/custom-validator";
import { Form } from "../../helpers/form.helper";

@Component({
	selector: "dmnd-dynamic-config-grid",
	templateUrl: "./dynamic-config-grid.component.html",
	styleUrls: ["./dynamic-config-grid.component.css"],
})
export class DynamicConfigGridComponent implements OnInit {
	//TODO     (1) Add pagination with scrollable view,         (2) add rows filtering,

	@Input() title: string;
	@Input() config: Array<FormField>;
	@Input() prevState: Array<DynamicConfigFormRow> = [];
	@Input() submitBtnText: string = "Submit";
	@Input() restoreBtnText: string = "Restore";
	@Input() isResetForm = false;
	@Input() isSaveForm = false;
	@Input() displayCheckBox = false;
	@Input() isFormEditable = true;
	@Input() showRemoveButton = true;
	@Input() isAddNewRow = false;
	@Input() winId: any;
	@Input() showAddNewline = true;
	@Input() showSubmitButton = true;
	@Input() showResetButton = false;
	@Input() showColumnsDefault = false;
	@Input() isAllowAddNewRow = true;
	@Output() formSubmitted = new EventEmitter<any>();

	@Output() onChangeFields = new EventEmitter<any>();
	@Output() displayLookupSearch = new EventEmitter<any>();

	@Output() onNewRowAdded = new EventEmitter<any>();
	@Output() onChangeFieldsIndex = new EventEmitter<any>();
	@Output() onRestoreClick = new EventEmitter<any>();
	@Output() onCancelClick = new EventEmitter<any>();
	@Output() onRowClick = new EventEmitter<any>();
	@Output() onHeaderClick = new EventEmitter<any>();

	datePickerConfig = DatePickerConfig;

	faLevel = faLevelDownAlt;
	faWindowRestore = faWindowRestore;
	faTrash = faTrash;
	faSave = faSave;
	faCancel = faTimesCircle;

	formValidation: FormValidation;
	submitted = false;
	rowsCount = 0;
	form: FormGroup;
	shortcuts: ShortcutInput[] = [];
	@ViewChild(KeyboardShortcutsComponent)
	private keyboard: KeyboardShortcutsComponent;

	totalPrevRecords = 0;
	@Input() AddNewWithShortcut = false;
	constructor(
		private formBuilder: FormBuilder,
		private sharedService: SharedService,
		private cdr: ChangeDetectorRef,
		private dateFormatPipe: DateFormatPipe
	) { }

	ngOnInit() {
		if (!this.form) {
			this.initForm();
		}
		if (!this.submitBtnText) {
			this.submitBtnText = "Submit";
		}
	}

	initForm() {
		this.form = this.formBuilder.group({
			fields: new FormArray([]),
		});
	}

	onFormValueChanges(
		formField: FormField,
		field: any,
		index: number,
		fieldValue?: string
	) {
		if (this.prevState.length > 0 && index < this.totalPrevRecords) {
			// In case of existing field update
			this.prevState[index].action = FORM_FIELD_ACTION_TYPES.UPDATE; // updated the action of updated row
		}

		if (formField && formField.name) {
			const value = field.controls[formField.name]? field.controls[formField.name].value: null;
			if (!field.controls[formField.name].dirty && value) {
				this.onChangeFields.emit({
					formField: formField,
					field: field,
					index: index,
					prevState: this.prevState,
				});
			}
		}
	}

	ngAfterViewInit(): void {
		this.shortcuts.push(...getDynamicConfigFormsShortcutKeys(this));
		this.cdr.detectChanges();
		if (
			this.prevState &&
			this.prevState.length == 0 &&
			this.showColumnsDefault
		) {
			this.addNewRow(this.getConfigCopy(), false);
		}
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
			this.totalPrevRecords = 0;
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

		if (this.prevState && this.prevState.length > 0) {
			if (this.prevState.some((field) => field.action !== null)) {
				return;
			}
			this.totalPrevRecords = this.prevState.length; // set previous records count
			this.prevState.forEach((record: FormRow, index) => {
				this.addNewRow(record.formFields);
			});
		} else if (this.prevState && this.prevState.length === 0) {
			this.resetForm();
		}
	}

	createGroup(config: Array<FormField>) {
		const group = this.formBuilder.group({});
		config.forEach((control: FormField) => {
			group.addControl(
				control.name,
				this.formBuilder.control({ value: control.value, disabled: control.disabled }, control.type !== "hidden" ? this.getControlValidation(control) : [])
			);
		});
		this.addFormFields(group);
	}

	/**
	 * set control validations
	 * @param control
	 */
	getControlValidation(control: any) {
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
		return validations;
	}

	/**
	 * Get Error messages form FormValidation
	 * @param field
	 * @param fieldName
	 * @param index
	 */
	getErrorMessage(field: any, fieldName: any, index: any) {
		this.formValidation = new FormValidation(field);
		return this.formValidation.errorMessage(fieldName);
	}

	/**
	 * Add/Remove Record
	 * @param group
	 */
	addFormFields(group: any) {
		if (this.t && this.t.length < this.rowsCount) {
			this.t.push(group);
		}
	}

	resetForm(isRestoreClick = false) {
		if (!this.t) {
			return;
		}
		if (isRestoreClick) {
			this.onRestoreClick.emit(this.prevState);
		}
		for (let i = this.t.length; i >= 0; i--) {
			this.t.removeAt(i);
		}
		this.rowsCount = 0;
		this.prevState = [];
		this.submitted = false;
	}

	resetRecord(i: number, $event: any, formGroup: any) {
		if (this.prevState[i].action == FORM_FIELD_ACTION_TYPES.ADD) {
			// if new row need to remove
			this.removeRecord(i);
		} else if (this.prevState[i].action == FORM_FIELD_ACTION_TYPES.UPDATE) {
			this.prevState[i].formFields.forEach((field) => {
				if (field.value) {
					formGroup.controls[field.name].patchValue(field.value);
				} else {
					formGroup.controls[field.name].patchValue(null);
				}
			});
		}
		this.onCancelClick.emit({
			form: formGroup,
			index: i,
			prevState: this.prevState,
		});
	}

	removeRecord(index: any) {
		if (
			this.prevState.length > 0 &&
			this.prevState.length > index &&
			this.prevState.length < this.totalPrevRecords
		) {
			// In case of existing field update
			this.prevState[index].action = FORM_FIELD_ACTION_TYPES.DELETE; // updated the action of updated row
		} else {
			this.prevState.splice(index, 1);
			this.t.removeAt(index);
		}
	}

	getConfigCopy() {
		return JSON.parse(JSON.stringify(this.config));
	}

	addNewRow(
		formFields: FormField[],
		isDefaultRow = true,
		isAllowAddNewRow: boolean = true
	) {
		if ((this.form && this.form.invalid) || !isAllowAddNewRow) {
			if (!isAllowAddNewRow) {
				this.onNewRowAdded.emit({
					form: null,
					index: null,
					prevState: null,
				});
			}
			return;
		}
		this.submitted = false;
		let config: Array<FormField> = [];
		let fields: FormField[] = [];
		let hiddenFields: FormField[] = [];
		formFields.forEach((field: FormField) => {
			fields.push(field);
			if (field.type === "select") {
				let copyField = JSON.parse(JSON.stringify(field));
				copyField.type = "hidden";
				let name = copyField.name + "Hidden";
				copyField.name = name;
				let hiddenFieldIndex = formFields.findIndex((f) => f.name === name);
				if (
					hiddenFieldIndex >= 0 &&
					field.value &&
					field.options &&
					field.options.length > 0
				) {
					let optionIndex = field.options.findIndex(
						(f) => f.value === field.value
					);
					if (optionIndex >= 0) {
						let optionValue = field.options[optionIndex];
						copyField[hiddenFieldIndex].value = optionValue.key;
					}
				}
				hiddenFields.push(copyField);
			}
		});
		fields.push(...hiddenFields);
		fields.forEach((field: FormField) => {
			if (field.type === "select") {
				let name = field.name + "Hidden";
				let hiddenFieldIndex = fields.findIndex((f) => f.name === name);
				if (
					hiddenFieldIndex >= 0 &&
					field.value &&
					field.options &&
					field.options.length > 0
				) {
					let optionIndex = field.options.findIndex(
						(f) => f.value === field.value
					);
					if (optionIndex >= 0) {
						let optionValue = field.options[optionIndex];
						fields[hiddenFieldIndex].value = optionValue.key;
					}
				}
			}
		});

		fields.forEach((field: FormField) => {
			field.name = field.name + this.rowsCount;
			if (field.type === "date") {
				field.value = this.dateFormatPipe.defaultDisplayDateFormat(field.value);
			}
			config.push(field);
		});

		this.rowsCount++;

		//  Set Configurations of new Row
		if (
			this.prevState &&
			this.prevState.length > 0 &&
			this.prevState[0].formFields[0].options &&
			this.prevState[0].formFields[0].options.length === 0
		) {
			this.prevState[0].formFields[0].options = this.winId;
		}

		this.createGroup(config);
		if (!isDefaultRow) {
			this.prevState.push(
				new DynamicConfigFormRow(fields, null, FORM_FIELD_ACTION_TYPES.ADD)
			);
			this.onNewRowAdded.emit({
				form: this.form,
				index: this.rowsCount,
				prevState: this.prevState,
			});
		}
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

	getFieldErrors(field: any, fieldName: any, index: any) {
		// fieldName += index;
		return field.controls[fieldName].errors;
	}

	public addPrefixZero(value: any) {
		return value < 10 ? "0" + value : value;
	}

	onFieldChange(
		field: FormField,
		index: any,
		event?: any,
		eventField?: any,
		dateEvent?: any
	) {
		if (field.emitOnChange) {
			this.onFormValueChanges(event, eventField, index);
			let data: any = [];
			data["data"] = this.form.value.fields[index];
			data["index"] = index;
			data["field"] = field;
			data["eventField"] = eventField;
			this.onChangeFields.emit({
				formField: field,
				field: eventField,
				index: index,
				prevState: this.prevState,
				dateEvent: dateEvent,
			});
		}
	}

	openLookup(event: any, field: FormField, eventField: any, index: any) {
		if (event.key == "F5") {
			event.preventDefault();

			this.displayLookupSearch.emit({
				formField: field,
				field: eventField,
				index: index,
				prevState: this.prevState,
			});
		}
	}

	onSubmit() {
		this.submitted = true;
		if (this.form.invalid) {
			return;
		}
		this.formSubmitted.emit({
			fields: this.form.value.fields,
			formState: this.prevState,
		});
	}

	ngOnDestroy() {
		this.resetForm();
	}

	handleDropdownClick(
		field: any,
		formField: FormField,
		i: number,
		option: any
	) {
		field.controls[formField.name].patchValue(option.value);
		let name = formField.name.replace(i + "", "Hidden" + i);
		field.controls[name].patchValue(option.key);
		this.onFormValueChanges(formField, field, i);
	}

	fieldClick(field: FormField, index: any, event?: any, eventField?: any, fromLookup = false) {
		let data: any = [];
		data["data"] = this.form.value.fields[index];
		data["index"] = index;
		data["field"] = field;
		this.onRowClick.emit(data);
	}

	headerClick(field: FormField, event?: any) {
		let data: any = [];
		data["field"] = field;
		data["event"] = event;
		this.onHeaderClick.emit(data);
	}
}
