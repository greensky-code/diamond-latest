import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PopUpMessageModule } from '../../shared/components/pop-up-message/pop-up.message.module';
import { DrgCodeMaintenanceComponent } from './drg-code-maintenance/drg-code-maintenance.component';
import { PriceDeterminantMaintenanceComponent } from './price-determinant-maintenance/price-determinant-maintenance.component';
import { DrgGrouperpricerMaintenanceComponent } from './drg-grouper-pricer-maintenance/drg-grouper-pricer-maintenance.component';
import { DrgWeightsMaintenanceComponent } from './drg-weights-maintenance/drg-weights-maintenance.component';
import {ConversionFactorComponent} from './conversion-factor/conversion-factor.component';
import {NgxSpinnerModule} from 'ngx-spinner';
import { PricingHelpComponent } from './pricing-help/pricing-help.component';
import { ProcedureCodeComponent } from './procedure-code/procedure-code.component';
import { ProcedureDeterminantComponent } from './procedure-determinant/procedure-determinant.component';
import { MedMgmtAuditComponent } from './med-mgmt-audit/med-mgmt-audit.component';
import { ProcedurePriceComponent } from './procedure-price/procedure-price.component';


const routes: Routes = [
  { path: "drg-code-maintenance", component: DrgCodeMaintenanceComponent },
  {
    path: "price-determinant-maintenance",
    component: PriceDeterminantMaintenanceComponent,
  },
  { path: "drg-weight-maintenance", component: DrgWeightsMaintenanceComponent },
  { path: "conversion-factor", component: ConversionFactorComponent },
  { path: "procedure-code", component: ProcedureCodeComponent },
  { path: "procedure-determinant", component: ProcedureDeterminantComponent },
  { path: "med-mgmt-audit", component: MedMgmtAuditComponent },
  { path: "procedure-price", component: ProcedurePriceComponent },
];

@NgModule({
    declarations: [
      ProcedurePriceComponent,
      MedMgmtAuditComponent,
        ProcedureDeterminantComponent,
        ProcedureCodeComponent,
        DrgCodeMaintenanceComponent,
        PriceDeterminantMaintenanceComponent,
        DrgWeightsMaintenanceComponent,
        DrgGrouperpricerMaintenanceComponent,
        ConversionFactorComponent,
        PricingHelpComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule,
        NgxSpinnerModule
    ],
    exports: [
      ProcedurePriceComponent,
      MedMgmtAuditComponent,
        ProcedureDeterminantComponent,
        ProcedureCodeComponent,
        DrgCodeMaintenanceComponent,
        PriceDeterminantMaintenanceComponent,
        DrgGrouperpricerMaintenanceComponent,
        DrgWeightsMaintenanceComponent,
        ConversionFactorComponent,
        PricingHelpComponent
    ]
})
export class PricingModule {
}
