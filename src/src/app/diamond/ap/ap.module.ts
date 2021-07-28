import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PopUpMessageModule} from '../../shared/components/pop-up-message/pop-up.message.module';
import {NgxSpinnerModule} from 'ngx-spinner';

import { BankAccountComponent } from './bank-account/bank-account.component';
import { TaxReportingEntityComponent } from './tax-reporting-entity/tax-reporting-entity.component';
import { AccountsPayableSelectionComponent } from './accounts-payable-selection/accounts-payable-selection.component';
import { ClearVoidStopUpdateComponent } from './clear-void-stop-update/clear-void-stop-update.component';
import { FinalNonApSetupComponent } from './final-non-ap-setup/final-non-ap-setup.component';
import { AccountsPayableUpdateComponent } from './accounts-payable-update/accounts-payable-update.component';
import {CheckPrintSetupComponent} from './check-print-setup/check-print-setup.component';
import {CheckRegisterComponent} from './check-register/check-register.component';
import {CheckRegisterFilterComponent} from './check-register-filter-data/check-register-filter-data.component';
import {ApHelpComponent} from "./ap-help/ap-help.component";

const routes: Routes = [
  { path: "bank-account", component: BankAccountComponent },
  { path: "tax-reporting-entity", component: TaxReportingEntityComponent },
      { path: 'account-payable-selection', component: AccountsPayableSelectionComponent },
      { path: 'final-non-ap-setup', component: FinalNonApSetupComponent },
      {path: 'account-payable-selection', component: AccountsPayableSelectionComponent },
 //   { path: 'account-payable-update', component: AccountsPayableUpdateComponent },
  { path: 'check-print-setup', component: CheckPrintSetupComponent },
  { path: 'check-register', component: CheckRegisterComponent },
  { path: 'check-register-filter', component: CheckRegisterFilterComponent }
];

@NgModule({
  declarations: [
    BankAccountComponent,
    TaxReportingEntityComponent,
    AccountsPayableSelectionComponent,
    AccountsPayableUpdateComponent,
    ClearVoidStopUpdateComponent,
    FinalNonApSetupComponent,
    AccountsPayableUpdateComponent,
    CheckPrintSetupComponent,
    CheckRegisterComponent,
    CheckRegisterFilterComponent,
      ApHelpComponent
  ],
    imports: [
        CommonModule,
        SharedModule,

    RouterModule.forChild(routes),
    PopUpMessageModule,
    NgxSpinnerModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    BankAccountComponent,
    TaxReportingEntityComponent,
    AccountsPayableSelectionComponent,
    AccountsPayableUpdateComponent,
    ClearVoidStopUpdateComponent,
    FinalNonApSetupComponent,
    AccountsPayableUpdateComponent,
    CheckPrintSetupComponent,
    CheckRegisterComponent,
    CheckRegisterFilterComponent,
      ApHelpComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class ApModule {}
