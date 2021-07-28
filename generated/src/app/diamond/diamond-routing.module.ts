/* Copyright (c) 2021 . All Rights Reserved. */

/**
 * Routing definition for the Diamond feature module
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiamondComponent } from './diamond.component';
import { AuditTrailMaintenanceComponent } from './audit-trail-maintenance/audit-trail-maintenance.component';
import { ChangeSubscriberIdComponent } from './change-subscriber-id/change-subscriber-id.component';
import { CodeTableMaintenanceComponent } from './code-table-maintenance/code-table-maintenance.component';
import { CountryComponent } from './country/country.component';
import { KeywordMaintenanceComponent } from './keyword-maintenance/keyword-maintenance.component';
import { MessageMaintenanceComponent } from './message-maintenance/message-maintenance.component';
import { ParameterComponent } from './parameter/parameter.component';
import { ScreenMaintenanceComponent } from './screen-maintenance/screen-maintenance.component';
import { SystemCodesMaintenanceComponent } from './system-codes-maintenance/system-codes-maintenance.component';
import { TaxReportingEntityComponent } from './tax-reporting-entity/tax-reporting-entity.component';
import { UserDefinedAttributesComponent } from './user-defined-attributes/user-defined-attributes.component';
import { UserDefinedFieldsComponent } from './user-defined-fields/user-defined-fields.component';

// Configure route paths referenced at a constant named 'routes'
// Parent and child routes get put together to create the actual route
const routes: Routes = [
    {
        // The empty path is specified here because, with lazily loaded routes, 
        // the child path url is specified in the app root module
        path: '', 
        component: DiamondComponent,
        children: [
            { path: 'audittrailmaintenance', component: AuditTrailMaintenanceComponent },
            { path: 'changesubscriberid', component: ChangeSubscriberIdComponent },
            { path: 'codetablemaintenance', component: CodeTableMaintenanceComponent },
            { path: 'country', component: CountryComponent },
            { path: 'keywordmaintenance', component: KeywordMaintenanceComponent },
            { path: 'messagemaintenance', component: MessageMaintenanceComponent },
            { path: 'parameter', component: ParameterComponent },
            { path: 'screenmaintenance', component: ScreenMaintenanceComponent },
            { path: 'systemcodesmaintenance', component: SystemCodesMaintenanceComponent },
            { path: 'taxreportingentity', component: TaxReportingEntityComponent },
            { path: 'userdefinedattributes', component: UserDefinedAttributesComponent },
            { path: 'userdefinedfields', component: UserDefinedFieldsComponent },
        ]
    }
];

// Create and export the DiamondRoutingModule class configured with the @NgModulef
// RouterModule.forChild() must be used to import the route definitions in feature modules 
// rather than using forRoot(), which must be used in the root app module. 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiamondRoutingModule {

}

// Create an array of routable components that are exporting 
// which we will need to use in the feature module
export const diamondRoutedComponents = [
    DiamondComponent,
    AuditTrailMaintenanceComponent,
    ChangeSubscriberIdComponent,
    CodeTableMaintenanceComponent,
    CountryComponent,
    KeywordMaintenanceComponent,
    MessageMaintenanceComponent,
    ParameterComponent,
    ScreenMaintenanceComponent,
    SystemCodesMaintenanceComponent,
    TaxReportingEntityComponent,
    UserDefinedAttributesComponent,
    UserDefinedFieldsComponent,
];