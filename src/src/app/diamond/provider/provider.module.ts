import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProviderMasterComponent } from './provider-master/provider-master.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PopUpMessageModule } from '../../shared/components/pop-up-message/pop-up.message.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProviderAdminitrativeFeeRuleComponent } from "./provider-adminitrative-fee-rule/provider-adminitrative-fee-rule.component";
import { CoveringProviderGroupsComponent } from './covering-provider-groups/covering-provider-groups.component';
import { CoveringProviderGroupCodesComponent } from './covering-provider-group-codes/covering-provider-group-codes.component';
import { ProviderTypeComponent } from './provider-type/provider-type.component';
import {ProviderAddressComponent} from './provider-address/provider-address.component';
import {ProviderIncentiveProgramRuleComponent} from './provider-incentive-program-rule/provider-incentive-program-rule.component';
import {ProviderContractsComponent} from './provider-contracts/provider-contracts.component';
import {IncentiveRuleCopyComponent} from './provider-incentive-program-rule/incentive-rule-copy/incentive-rule-copy.component';
import {ProviderCredentialsComponent} from './provider-credentials/provider-credentials.component';
import {InsuranceComponent} from './insurance/insurance.component';
import { SpecialtyType } from './provider-master/cell-renderers/speciality-type';
import { PrimarySpeciality } from './provider-master/cell-renderers/primary-speciality';
import { DirectoryInclude } from './provider-master/cell-renderers/directory-include';
import { BoardStatus } from './provider-master/cell-renderers/board-status';
import { ProviderRelationshipComponent } from './provider-relationship/provider-relationship.component';
import { RuleCopyComponent } from './rule-copy/rule-copy.component';
import {ContractPricingDetailsComponent} from './contract-pricing-details/contract-pricing-details.component';
import {DrgInformationComponent} from "./drg-information/drg-information.component";
import {AgGridModule} from "ag-grid-angular";
import {ProviderHelpComponent} from "./provider-help/provider-help.component";

const routes: Routes = [
    { path: 'adminitrative-fee-rule', component: ProviderAdminitrativeFeeRuleComponent },
    { path: 'provider-master', component: ProviderMasterComponent },
    { path: 'provider-address', component: ProviderAddressComponent },
    { path: 'provider-type', component: ProviderTypeComponent },
    { path: 'provider-incentive-program-rule', component: ProviderIncentiveProgramRuleComponent },
    { path: 'provider-contracts', component: ProviderContractsComponent },
    { path: "provider-relationship", component: ProviderRelationshipComponent },
    { path: 'provider-credentials', component: ProviderCredentialsComponent },
    { path: 'insurance', component: InsuranceComponent },
    { path: 'contract-pricing-details', component: ContractPricingDetailsComponent}
];

@NgModule({
    declarations: [
        ProviderAdminitrativeFeeRuleComponent,
        ProviderMasterComponent,
        CoveringProviderGroupsComponent,
        CoveringProviderGroupCodesComponent,
        ProviderAddressComponent,
        ProviderIncentiveProgramRuleComponent,
        ProviderContractsComponent,
        ContractPricingDetailsComponent,
        ProviderTypeComponent,
        ProviderAddressComponent,
        IncentiveRuleCopyComponent,
        ProviderCredentialsComponent,
        InsuranceComponent,
        IncentiveRuleCopyComponent,
        SpecialtyType,
        PrimarySpeciality,
        RuleCopyComponent,
        DirectoryInclude,
        BoardStatus,
        ProviderRelationshipComponent,
        DrgInformationComponent,
        ProviderHelpComponent
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
        ProviderAdminitrativeFeeRuleComponent,
        ProviderMasterComponent,
        CoveringProviderGroupCodesComponent,
        CoveringProviderGroupsComponent,
        ProviderAddressComponent,
        ProviderIncentiveProgramRuleComponent,
        ProviderContractsComponent,
        ProviderTypeComponent,
        IncentiveRuleCopyComponent,
        ProviderCredentialsComponent,
        ProviderRelationshipComponent,
        RuleCopyComponent,
        ProviderHelpComponent
    ]
})
export class ProviderModule {
}
