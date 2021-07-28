import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {DefineBenefitValueFiltersComponent} from "./define-benefit-value-filters/define-benefit-value-filters.component";
import {SharedModule} from "../../shared/shared.module";
import {PopUpMessageModule} from "../../shared/components/pop-up-message/pop-up.message.module";
import {BenefitPackageComponent} from "./benefit-package/benefit-package.component";
import {AuthGuardService as AuthGuard} from "../../api-services/authentication-guard.service";
import {CopyBenefitPackageComponent} from "./copy-benefit-package/copy-benefit-package.component";
import {BenefitPackageUserFieldsComponent} from "./benefit-package-user-fields/benefit-package-user-fields.component";
import {BenefitRuleSelectionComponent} from "./benefit-rule-selection/benefit-rule-selection.component";
import {BenefitWeightAccumulatorComponent} from "./benefit-weight-accumulator/benefit-weight-accumulator.component";
import {BenefitProcessingOrderComponent} from "./benefit-processing-order/benefit-processing-order.component";
import {BenefitRuleComponent} from "./benefit-rule/benefit-rule.component";
import { BenefitType } from './benefit-processing-order/cell-renderers/benefit-type';
import { ProcessingOrder } from './benefit-processing-order/cell-renderers/processing-order';
import { BenefitsHelpComponent } from './benefits-help/benefits-help.component';
const routes: Routes = [
    {path: 'define-benefit-value-filters', component: DefineBenefitValueFiltersComponent},
    {path: 'benefit-package', component: BenefitPackageComponent},
    {path: 'copy-benefit-package', component: CopyBenefitPackageComponent},


    {path: 'benefit-package-user-fields', component: BenefitPackageUserFieldsComponent},
    {path: 'benefit-rule-reflection', component: BenefitRuleSelectionComponent},
    {path: 'benefit-weight-accumulator', component: BenefitWeightAccumulatorComponent},
    {path: 'benefit-processing-order', component: BenefitProcessingOrderComponent},

    {path: 'benefit-rule', component: BenefitRuleComponent, canActivate: [AuthGuard]},

]

@NgModule({
    declarations: [
        DefineBenefitValueFiltersComponent,
        BenefitPackageComponent,
        CopyBenefitPackageComponent,
        BenefitPackageUserFieldsComponent,
        BenefitRuleSelectionComponent,
        BenefitWeightAccumulatorComponent,
        BenefitProcessingOrderComponent,
        BenefitRuleComponent,
        BenefitType,
        ProcessingOrder,
        BenefitsHelpComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule
    ],
    exports: [
        DefineBenefitValueFiltersComponent,
        BenefitPackageComponent,
        CopyBenefitPackageComponent,
        BenefitPackageUserFieldsComponent,
        BenefitRuleSelectionComponent,
        BenefitWeightAccumulatorComponent,
        BenefitProcessingOrderComponent,
        BenefitRuleComponent,
        BenefitsHelpComponent,
    ]
})
export class BenefitsModule {
}
