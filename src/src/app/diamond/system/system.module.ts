import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PopUpMessageModule} from '../../shared/components/pop-up-message/pop-up.message.module';
import {AuditTrailMaintenanceComponent} from './audit-trail-maintenance/audit-trail-maintenance.component';
import { CodeTableMaintenanceComponent } from './code-table-maintenance/code-table-maintenance.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import {ParameterComponent} from './parameter/parameter.component';
import {ChangeSubscriberIdComponent} from './change-subscriber-id/change-subscriber-id.component';
import { SystemCodesMaintenanceComponent } from './system-codes-maintenance/system-codes-maintenance.component';
import { SystemCodesMaintenanceSpecialComponent } from './system-codes-maintenance-special/system-codes-maintenance-special.component';
import {ScreenMaintenanceComponent} from './screen-maintenance/screen-maintenance.component';
import {UserDefinedAttributesComponent} from './user-defined-attributes/user-defined-attributes.component';
import {UserDefinedFieldsComponent} from './user-defined-fields/user-defined-fields.component'
import {KeywordMaintenanceComponent} from './keyword-maintenance/keyword-maintenance.component';


const routes: Routes = [
    {path: 'parameter', component: ParameterComponent},
    {path: 'change_subscriber_id', component: ChangeSubscriberIdComponent},
    {path: 'audit-trail-maintenance', component: AuditTrailMaintenanceComponent},
    {path: 'code-table-maintenance', component: CodeTableMaintenanceComponent},
    { path: 'system-codes-maintenance', component: SystemCodesMaintenanceComponent },
    {path: 'screen-maintenance', component: ScreenMaintenanceComponent},
    {path: 'user-defined-fields', component: UserDefinedFieldsComponent},
    {path: 'user-defined-attributes', component: UserDefinedAttributesComponent},
    {path: 'codetablemaintenance', component: CodeTableMaintenanceComponent},
    {path: 'keywordmaintenance', component: KeywordMaintenanceComponent},
];

@NgModule({
    declarations: [
        ParameterComponent,
        AuditTrailMaintenanceComponent,
        ChangeSubscriberIdComponent,
        CodeTableMaintenanceComponent,
        SystemCodesMaintenanceComponent,
        SystemCodesMaintenanceSpecialComponent,
        ScreenMaintenanceComponent,
        UserDefinedAttributesComponent,
        UserDefinedFieldsComponent,
        CodeTableMaintenanceComponent,
        KeywordMaintenanceComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule,
        NgxSpinnerModule,
        AgGridModule.withComponents([])
    ],
    exports: [
        ParameterComponent,
        ChangeSubscriberIdComponent,
        CodeTableMaintenanceComponent,
        AuditTrailMaintenanceComponent,
        SystemCodesMaintenanceComponent,
        ScreenMaintenanceComponent

    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
      NO_ERRORS_SCHEMA,
    ]
})
export class SystemModule {
}
