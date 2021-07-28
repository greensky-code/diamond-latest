import {NgModule} from '@angular/core';
import {SearchboxComponent} from './components/searchbox/searchbox.component';
import {AgGridModule} from 'ag-grid-angular';
import {KeyboardShortcutsModule} from "ng-keyboard-shortcuts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NumberFormatPipe} from "./pipes/number.format.pipe";
import {AngularMyDatePickerModule} from "angular-mydatepicker";
import {TextMaskModule} from "angular2-text-mask";
import {FileUploadModule} from "ng2-file-upload";
import {AlertMessageModule} from "./components/alert-message/alert.message.module";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {DatepickerComponent} from './components/datepicker/datepicker.component';
import {DynamicFormComponent} from './components/dynamic-form/dynamic-form.component';
import {AgDatepickerComponent} from './components/AgComponents/ag-datepicker/ag-datepicker.component';
import {LabelControl} from "./services/shared.service";
import {TablesAndColumnsComponent} from './components/tables-and-columns/tables-and-columns.component';
import {VendorSearchboxComponent} from './components/vendor-searchbox/vendor-searchbox.component';
import {FieldLevelSecDirective} from "./directives/field-level-sec.directive";
import {SecuritySearchboxComponent} from './components/security-searchbox/security-searchbox.component';
import {WinSelPermissionDirective} from './directives/win-sel-permission.directive';
import {AuditDisplayComponent} from './components/audit-display/audit-display.component';
import {NotesComponent} from './components/notes/notes.component';
import {NoteTypeComponent} from './components/note-type/note-type.component';
import {PopUpMessageModule} from './components/pop-up-message/pop-up.message.module';
import {InputComponent} from "./components/input/input.component";
import {DynamicConfigGridComponent} from "./components/dynamic-config-grid/dynamic-config-grid.component";
import {TimestampComponent} from "./components/timestamp/timestamp.component";
import {CountDownPopUpMessageModule} from './components/count-down-pop-up-message/count-down-pop-up-message.module';
import {CountryComponent} from '../diamond/system/country/country.component';
import {LookupComponent} from "./components/lookup/lookup.component";
import {MemberUserDefinedFieldsComponent} from './components/member-user-defined-fields/member-user-defined-fields.component';
import {DynamicUserDefinedFieldsComponent} from './components/dynamic-user-defined-fields/dynamic-user-defined-fields.component';
import {StopvoidComponent} from "./components/stop-void/stopvoid.component";
import { DynamicConfigGridNestedComponent } from './components/dynamic-config-grid-nested/dynamic-config-grid-nested.component';
import { TaxCompanyDetailComponent } from './components/tax-company-detail/tax-company-detail.component';
import {NumericDirective} from "./directives/number-one-dot";
import { NotePriorityHeaderDisplayComponent } from './components/note-priority-header-display/note-priority-header-display.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { ButtonCellComponent } from './components/button-cell/button-cell.component';
import {VendorFirstProviderComponent} from "./components/vendorFirst-provider/vendorFirst-provider.component";

@NgModule({
  declarations: [
    SearchboxComponent,
    NumberFormatPipe,
    MenuBarComponent,
    DatepickerComponent,
    DynamicFormComponent,
    AgDatepickerComponent,
    LabelControl,
    TablesAndColumnsComponent,
    VendorSearchboxComponent,
    VendorFirstProviderComponent,
    FieldLevelSecDirective,
    SecuritySearchboxComponent,
    WinSelPermissionDirective,
    AuditDisplayComponent,
    NotesComponent,
    NoteTypeComponent,
    DynamicConfigGridComponent,
    InputComponent,
    TimestampComponent,
    CountryComponent,
    LookupComponent,
    StopvoidComponent,
    MemberUserDefinedFieldsComponent,
    DynamicUserDefinedFieldsComponent,
    DynamicConfigGridNestedComponent,
    TaxCompanyDetailComponent,
    NumericDirective,
    NotePriorityHeaderDisplayComponent,
    ButtonCellComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([AgDatepickerComponent, ButtonCellComponent]),
    KeyboardShortcutsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    AngularMyDatePickerModule,
    FormsModule,
    TextMaskModule,
    FileUploadModule,
    AlertMessageModule,
    PopUpMessageModule,
    CountDownPopUpMessageModule,
    NgMultiSelectDropDownModule
  ],
  exports: [
    SearchboxComponent,
    NumberFormatPipe,
    MenuBarComponent,
    DatepickerComponent,
    AgGridModule,
    KeyboardShortcutsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    AngularMyDatePickerModule,
    FormsModule,
    TextMaskModule,
    FileUploadModule,
    AlertMessageModule,
    DynamicFormComponent,
    LabelControl,
    TablesAndColumnsComponent,
    VendorSearchboxComponent,
    VendorFirstProviderComponent,
    FieldLevelSecDirective,
    WinSelPermissionDirective,
    AuditDisplayComponent,
    NotesComponent,
    NoteTypeComponent,
    DynamicConfigGridComponent,
    InputComponent,
    TimestampComponent,
    StopvoidComponent,
    LookupComponent,
    MemberUserDefinedFieldsComponent,
    DynamicUserDefinedFieldsComponent,
    DynamicConfigGridNestedComponent,
    NumericDirective,
    NotePriorityHeaderDisplayComponent

  ],
  providers: [CurrencyPipe],
})
export class SharedModule { }
