import { TitleCasePipe } from "@angular/common";
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserDefinedText } from "../../../api-models/user-defined-text.model";
import { UserDefinedValidateCode } from "../../../api-models/user-defined-validate-code";
import { PmbArCustomerMasterService } from "../../../api-services/pmb-ar-customer-master.service";
import { UserDefinedTextService } from "../../../api-services/user-defined-text.service";
import { UserDefinedValidateCodeService } from "../../../api-services/user-defined-validate-code.service";
import { DatePickerConfig } from "../../config";
import { DateFormatPipe } from "../../pipes/date-format.pipe";
import { FormValidation } from "../../validators/form-validation.pipe";
import { AlertMessage, AlertMessageService } from "../alert-message";
import { PopUpMessage, PopUpMessageButton } from "../pop-up-message";
import { PopUpMessageComponent } from "../pop-up-message/pop-up-message/pop-up-message.component";

@Component({
    selector: "app-dynamic-user-defined-fields",
    templateUrl: "./dynamic-user-defined-fields.component.html",
    providers: [UserDefinedTextService, TitleCasePipe, PmbArCustomerMasterService],
})
export class DynamicUserDefinedFieldsComponent implements OnInit {
    @Input() winID?: string;
    @Input() dataWindowId?: string;
    @Input() billTypeEnable?: boolean;
    @Input() premResetValue?: any;
    @Input() billTypeResetValue?: any;
    @Output() emitResponse = new EventEmitter<any>();
    userDefinedFieldForm: FormGroup;
    nextElement: string[] = [];

    popUpMessage: PopUpMessage;

    @Input() showIcon: boolean = false;
    userDefinedTexts: UserDefinedText[] = [];
    public alertMessage: AlertMessage;
    @ViewChild("popUpMesssage", { static: true }) child: PopUpMessageComponent;
    public datePickerConfig = DatePickerConfig;
    formValidation: FormValidation;
    status: boolean = false;
    billTypeMasters: any[];
    billTypeDefinedValidateCodes: UserDefinedValidateCode[] = [];
    userDefinedValidateCodes: UserDefinedValidateCode[] = [];
    userDefinedValues: any;
    dropdownCount: number = 0;

    constructor(
        private formBuilder: FormBuilder,
        private alertMessageService: AlertMessageService,
        private userDefinedTextService: UserDefinedTextService,
        private activeModal: NgbActiveModal,
        private userDefinedValidateCodeService: UserDefinedValidateCodeService,
        private titlecasePipe: TitleCasePipe,
        private dateFormatPipe: DateFormatPipe,
        private pmbArCustomerMasterService: PmbArCustomerMasterService,
        private element: ElementRef,
    ) {
    }

    ngOnInit(): void {
        if (this.billTypeEnable) {
            this.getBillTypeMasters();
        } else {
            this.getMemberUserDefinedFields();
        }
        this.userDefinedFieldForm = this.formBuilder.group({});
    }

    getMemberUserDefinedFields() {
        this.userDefinedTextService.getUserDefinedTextFields(this.dataWindowId, this.winID).subscribe(
            (userDefinedTexts) => {
                if (userDefinedTexts) {
                    this.userDefinedFieldForm = this.toFormGroup(userDefinedTexts);
                    this.formValidation = new FormValidation(this.userDefinedFieldForm);
                    if (this.billTypeEnable) {
                        if (this.userDefinedFieldForm.get('userDefined1')) this.userDefinedFieldForm.get('userDefined1').setValue(this.premResetValue);
                        if (this.userDefinedFieldForm.get('userDefined2')) this.userDefinedFieldForm.get('userDefined2').setValue(this.billTypeResetValue);
                    }
                }
            }, (error) => {
                this.alertMessage = this.alertMessageService.error(
                    "An Error occurred while retrieving record."
                );
            }
        );
    }

    toFormGroup(userDefinedTexts: UserDefinedText[]) {
        const group: any = {};
        this.dropdownCount += userDefinedTexts.filter(udt => udt.userDefineValidateFlag == "Y").length;
        userDefinedTexts.forEach((obj, index) => {
            let userDefinedTextObj = new UserDefinedText();
            userDefinedTextObj = obj;
            if (userDefinedTextObj.userDefineName) {
                //Setting User Defined Text (Label Name) if it not exist.
                //If label name not exist then field or control name should be used at the place of user defined text
                //Relplace underscore(_) with blank space
                if (userDefinedTextObj.userDefineText) {
                    if (userDefinedTextObj.userDefineText.includes("_")) {
                        let updatedUserDefinedText = userDefinedTextObj.userDefineText.split("_").join(" ");
                        userDefinedTextObj.userDefineText = updatedUserDefinedText.toUpperCase();
                    }
                }
                //Set date flag
                if (userDefinedTextObj.userDefineName) {
                    if (userDefinedTextObj.userDefineName.includes("date")) {
                        userDefinedTextObj.userDefineValidateFlag = "D";
                    }

                    //Change Composition of Column name (eg. user_defined_1 to userDefined1)
                    if (userDefinedTextObj.userDefineName.includes("_")) {
                        userDefinedTextObj.userDefineNameforDropDown = userDefinedTextObj.userDefineName;
                        let columnName = this.changeColumnNameComposition(userDefinedTextObj.userDefineName);
                        userDefinedTextObj.userDefineName = columnName;
                    } else {
                        userDefinedTextObj.userDefineNameforDropDown = userDefinedTextObj.userDefineName;
                    }

                    if (userDefinedTextObj.userDefineRequired == "Y") {
                        group[userDefinedTextObj.userDefineName] = new FormControl("",
                            [Validators.required, Validators.maxLength(userDefinedTextObj.maxLen)]);
                    } else {
                        group[userDefinedTextObj.userDefineName] = new FormControl("",
                            [Validators.maxLength(userDefinedTextObj.maxLen)]);
                    }

                    //Adding drop down values
                    if (userDefinedTextObj.userDefineValidateFlag == "Y") {
                        this.getUserDefinedValidateCode(userDefinedTextObj.userDefineNameforDropDown,
                            userDefinedTextObj.validatedTableName, userDefinedTextObj);
                    }

                    if (this.winID === "GRUPC") {
                        if (index == 8) {
                            let setuUserDefinedText = new UserDefinedText();
                            setuUserDefinedText.userDefineValidateFlag = 'N';
                            setuUserDefinedText.userDefineText = "Student Age From";
                            setuUserDefinedText.userDefineName = "studentAgeFrom";
                            group[setuUserDefinedText.userDefineName] = new FormControl("",{ validators: [] });
                            this.userDefinedTexts.push(setuUserDefinedText);
                            
                            let setuAgeUserDefinedText = new UserDefinedText();
                            setuAgeUserDefinedText.userDefineValidateFlag = 'N';
                            setuAgeUserDefinedText.userDefineText = "Student Age To";
                            setuAgeUserDefinedText.userDefineName = "studentAgeTo";
                            group[setuAgeUserDefinedText.userDefineName] = new FormControl("",{ validators: [] });
                            this.userDefinedTexts.push(setuAgeUserDefinedText);

                            let saleRepUserDefinedText = new UserDefinedText();
                            saleRepUserDefinedText.userDefineValidateFlag = 'N';
                            saleRepUserDefinedText.userDefineText = "Sales Rep";
                            saleRepUserDefinedText.userDefineName = "salespersonName";
                            group[saleRepUserDefinedText.userDefineName] = new FormControl("",{ validators: [] });
                            this.userDefinedTexts.push(saleRepUserDefinedText);

                            let brokerUserDefinedText = new UserDefinedText();
                            brokerUserDefinedText.userDefineValidateFlag = 'N';
                            brokerUserDefinedText.userDefineText = "Broker";
                            brokerUserDefinedText.userDefineName = "brokerName";
                            group[brokerUserDefinedText.userDefineName] = new FormControl("",{ validators: [] });
                            this.userDefinedTexts.push(brokerUserDefinedText);
                        }
                    }

                    this.userDefinedTexts.push(userDefinedTextObj);
                }
            }
            this.nextElement.push(userDefinedTextObj.userDefineName);
        });

        this.status = true;
        return new FormGroup(group);
    }

    changeColumnNameComposition(columnName: string): string {
        let columnNameArray = [];
        columnNameArray = columnName.split("_");
        let actualColumnName: string;
        if (columnNameArray) {
            for (let i = 0; i < columnNameArray.length; i++) {
                if (i == 0) {
                    actualColumnName = columnNameArray[i];
                } else {
                    actualColumnName =
                        actualColumnName + this.titlecasePipe.transform(columnNameArray[i]);
                }
            }
        }
        return actualColumnName;
    }

    getUserDefinedValidateCode(validatedColumnName: string, validatedTableName: string,
        userDefinedTextObj: UserDefinedText) {
        let userDefinedValidateCodesobj: UserDefinedValidateCode[] = [];
        this.userDefinedValidateCodeService.getUserDefinedValidateCode(validatedTableName, validatedColumnName)
            .subscribe(
                (userDefinedValidateCodes) => {
                    userDefinedTextObj.userDefinedValidateCodes = userDefinedValidateCodes;
                    this.dataSetReadyUpdate();
                },
                (error) => {
                    this.dataSetReadyUpdate();
                }
            );
    }

    dataSetReadyUpdate() {
        this.dropdownCount--;
        if (this.dropdownCount == 0) {
            this.updateUserDefinedFieldForm(this.userDefinedFieldForm, this.userDefinedValues);
        }
    }

    popupMessageHandler(button: PopUpMessageButton) {
        if (button.name === "yes") {
            console.log("button yes has been click!");
        }
        if (button.name === "no") {
            console.log("button No has been click!");
        }
    }

    close() {
        this.activeModal.close();
    }

    submit() {
        this.emitResponse.emit(this.userDefinedFieldForm);
    }

    updateUserDefinedValues(userDefined: any) {
        this.userDefinedValues = userDefined;
        this.updateUserDefinedFieldForm(this.userDefinedFieldForm, userDefined);
    }

    updateUserDefinedFieldForm(group: FormGroup, userDefined: any): void {
        if (userDefined) {
            Object.keys(group.controls).forEach((key: string) => {
                this.setFormValue(key, userDefined[key]);
            });
        }
    }

    setFormValue(key: any, value: any) {
        let actualValue;
        if (key.includes("Date")) {
            actualValue = this.dateFormatPipe.defaultDisplayDateFormat(value);
        } else {
            actualValue = value;
        }
        this.userDefinedFieldForm.get(key).setValue(actualValue);
    }

    reset() {
        this.userDefinedFieldForm.reset();
    }

    getBillTypeMasters() {
        this.pmbArCustomerMasterService.getBillTypeMasters().subscribe(billTypeMasters => {
            this.billTypeMasters = billTypeMasters;
            this.getfilteredBillTypeValidateCodes();
            this.getMemberUserDefinedFields();
        });
    }

    getfilteredBillTypeValidateCodes() {
        this.billTypeMasters.forEach((billType) => {
            let billTypeTransfered: any = {
                'userValidCode': billType[0],
                'userValidCodeShortDesc': billType[1]
            };
            this.billTypeDefinedValidateCodes.push(billTypeTransfered);
        });
    }

    nextElementFocus(event: any, currentEle: string) {
        event.preventDefault();
        let curIndex = this.nextElement.findIndex(ele => ele === currentEle);
        let nextEle = this.nextElement[(this.nextElement.length - 1 > curIndex) ? curIndex + 1 : 0];
        this.element.nativeElement.querySelector(`#${nextEle}`).focus();
    }
}
