import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PopUpMessageModule } from '../../shared/components/pop-up-message/pop-up.message.module';

import { VendorMasterComponent } from './vendor-master/vendor-master.component';
import {VendorAdvancePaymentRulesComponent} from './vendor-advance-payment-rules/vendor-advance-payment-rules.component';
import { AdvancePaymentOffsetPriorityComponent } from './advance-payment-offset-priority/advance-payment-offset-priority.component';
import { VendorCreditComponent } from './vendor-credit/vendor-credit.component';
import {VendorAddressComponent} from './vendor-address/vendor-address.component';
import { VendorTINComponent } from './vendor-tin/vendor-tin.component';
import { ViewCreditBalanceComponent } from './view-credit-balance/view-credit-Balance.component';
import { VendorCreditStatusComponent } from './vendor-credit-status/vendor-credit-status.component';
import { ApplyVendorCreditComponent } from './apply-vendor-credit/apply-vendor-credit.component';

const routes: Routes = [
  { path: "vendor-master", component: VendorMasterComponent },
  {
    path: "vendor-advance-payment-offset",
    component: AdvancePaymentOffsetPriorityComponent,
  },
  {
    path: "vendor-advance-payment-rules",
    component: VendorAdvancePaymentRulesComponent,
  },
  { path: "vendor-credit", component: VendorCreditComponent },
  { path: "view-credit-balance", component: ViewCreditBalanceComponent },
  { path: "vendor-credit-status", component: VendorCreditStatusComponent },
  { path: "vendor-address", component: VendorAddressComponent },
  { path: "vendor-tin", component: VendorTINComponent },
];


@NgModule({
  declarations: [
    ViewCreditBalanceComponent,
    VendorMasterComponent,
    AdvancePaymentOffsetPriorityComponent,
    VendorAdvancePaymentRulesComponent,
    VendorCreditComponent,
    VendorAddressComponent,
    VendorTINComponent,
    VendorCreditStatusComponent,
    ApplyVendorCreditComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    PopUpMessageModule,
  ],
  exports: [
    ViewCreditBalanceComponent,
    VendorCreditComponent,
    VendorCreditStatusComponent,
    VendorMasterComponent,
    AdvancePaymentOffsetPriorityComponent,
    VendorAdvancePaymentRulesComponent,
    VendorAddressComponent,
    VendorTINComponent,
    ApplyVendorCreditComponent,
  ],
})
export class VendorModule {}
