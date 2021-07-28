import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArCashReceiptsComponent } from './ar-cash-receipts/ar-cash-receipts.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PopUpMessageModule } from '../../shared/components/pop-up-message/pop-up.message.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SubscriberUpdateComponent } from './subscriber-update/subscriber-update.component';
import { CustomerMaintenanceComponent } from './customer-maintenance/customer-maintenance.component';
import { ArMatrixPremiumRateEntryComponent } from './ar-matrix-premium-rate-entry/ar-matrix-premium-rate-entry.component';
import { SelectCustomerComponent } from './select-customer/select-customer.component';
import { ArAdjustmentsComponent } from './ar-adjustments/ar-adjustments.component';
import { ArAdjustmentsGlMonthComponent } from './ar-adjustments-gl-month/ar-adjustments-gl-month.component';
import { DisplayPremiumBillingHistoryComponent } from './display-premium-billing-history/display-premium-billing-history.component';
import { ArMatrixDeterminantsComponent } from './ar-matrix-determinants/ar-matrix-determinants.component';
import { PremiumBillingSetupComponent } from './premium-billing-setup/premium-billing-setup.component';
import { AlertMessageComponent } from '../../shared/components/alert-message/alert-message/alert-message.component';
import { AlertMessageModule } from '../../shared/components/alert-message/alert.message.module';
import { FunctionDescriptionComponent } from '../security/function-description/function-description.component';
import { WindowDescriptionComponent } from '../security/window-description/window-description.component';
import { PMBTemplateIdComponent } from './premium-billing-setup/pmb-templateid.component';
import {PremiumHelpComponent} from "./premium-help/premium-help.component";

const routes: Routes = [

  { path: 'ar-cash-receipts', component: ArCashReceiptsComponent },
  { path: 'customer-maintenance', component: CustomerMaintenanceComponent },
  { path: 'subscriber-update', component: SubscriberUpdateComponent },
  { path: 'ar-adjustments', component: ArAdjustmentsComponent },
  { path: 'customer-maintenance', component: CustomerMaintenanceComponent },
  { path: 'ar-matrix-premium-rate-entry', component: ArMatrixPremiumRateEntryComponent },
  { path: 'display-premium-billing-history', component: DisplayPremiumBillingHistoryComponent },
  { path: 'ar-matrix-premium-determinants', component: ArMatrixDeterminantsComponent },
  { path: 'premium-billingsetup', component: PremiumBillingSetupComponent }

];



@NgModule({
  declarations: [
    ArCashReceiptsComponent,
    ArAdjustmentsGlMonthComponent,
    CustomerMaintenanceComponent,
    SelectCustomerComponent,
    SubscriberUpdateComponent,
    ArMatrixPremiumRateEntryComponent,
    ArAdjustmentsComponent,
    CustomerMaintenanceComponent,
    SelectCustomerComponent,
    ArAdjustmentsGlMonthComponent,
    DisplayPremiumBillingHistoryComponent,
    ArMatrixDeterminantsComponent,
    PremiumBillingSetupComponent,
    WindowDescriptionComponent,
    FunctionDescriptionComponent,
    PMBTemplateIdComponent,
      PremiumHelpComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    PopUpMessageModule,
    AlertMessageModule,
    NgxSpinnerModule
  ],
  exports: [
    ArCashReceiptsComponent,
    ArAdjustmentsGlMonthComponent,
    CustomerMaintenanceComponent,
    SelectCustomerComponent,
    SubscriberUpdateComponent,
    ArMatrixPremiumRateEntryComponent,
    ArAdjustmentsComponent,
    CustomerMaintenanceComponent,
    SelectCustomerComponent,
    DisplayPremiumBillingHistoryComponent,
    ArMatrixDeterminantsComponent,
    PremiumBillingSetupComponent,
    WindowDescriptionComponent,
    FunctionDescriptionComponent,
    PMBTemplateIdComponent
  ]
})
export class PremiumModule { }
