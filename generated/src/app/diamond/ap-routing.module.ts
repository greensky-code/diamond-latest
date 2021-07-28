/* Copyright (c) 2021 . All Rights Reserved. */

/**
 * Routing definition for the AP feature module
 */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApComponent } from './ap.component';
import { AccountsPayableComponent } from './accounts-payable/accounts-payable.component';
import { AccountsPayableSelectionComponent } from './accounts-payable-selection/accounts-payable-selection.component';
import { AccountsPayableUpdateComponent } from './accounts-payable-update/accounts-payable-update.component';
import { AccountsPayableVendorDisplayComponent } from './accounts-payable-vendor-display/accounts-payable-vendor-display.component';
import { BankAccountComponent } from './bank-account/bank-account.component';
import { CheckPrintSetupComponent } from './check-print-setup/check-print-setup.component';
import { CheckRegisterComponent } from './check-register/check-register.component';
import { ClearVoidStopUpdateComponent } from './clear-void-stop-update/clear-void-stop-update.component';
import { FinalNonApSetupComponent } from './final-non-ap-setup/final-non-ap-setup.component';
import { ManualChecksComponent } from './manual-checks/manual-checks.component';

// Configure route paths referenced at a constant named 'routes'
// Parent and child routes get put together to create the actual route
const routes: Routes = [
    {
        // The empty path is specified here because, with lazily loaded routes, 
        // the child path url is specified in the app root module
        path: '', 
        component: ApComponent,
        children: [
            { path: 'accountspayable', component: AccountsPayableComponent },
            { path: 'accountspayableselection', component: AccountsPayableSelectionComponent },
            { path: 'accountspayableupdate', component: AccountsPayableUpdateComponent },
            { path: 'accountspayablevendordisplay', component: AccountsPayableVendorDisplayComponent },
            { path: 'bankaccount', component: BankAccountComponent },
            { path: 'checkprintsetup', component: CheckPrintSetupComponent },
            { path: 'checkregister', component: CheckRegisterComponent },
            { path: 'clearvoidstopupdate', component: ClearVoidStopUpdateComponent },
            { path: 'finalnonapsetup', component: FinalNonApSetupComponent },
            { path: 'manualchecks', component: ManualChecksComponent },
        ]
    }
];

// Create and export the ApRoutingModule class configured with the @NgModulef
// RouterModule.forChild() must be used to import the route definitions in feature modules 
// rather than using forRoot(), which must be used in the root app module. 
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApRoutingModule {

}

// Create an array of routable components that are exporting 
// which we will need to use in the feature module
export const apRoutedComponents = [
    ApComponent,
    AccountsPayableComponent,
    AccountsPayableSelectionComponent,
    AccountsPayableUpdateComponent,
    AccountsPayableVendorDisplayComponent,
    BankAccountComponent,
    CheckPrintSetupComponent,
    CheckRegisterComponent,
    ClearVoidStopUpdateComponent,
    FinalNonApSetupComponent,
    ManualChecksComponent,
];