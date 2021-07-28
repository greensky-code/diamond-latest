import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {AgGridModule} from 'ag-grid-angular';
import {PreExistingConditionRulesComponent} from './pre-existing-condition-rules/pre-existing-condition-rules.component';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {PopUpMessageModule} from '../../shared/components/pop-up-message/pop-up.message.module';
import {NgxSpinnerModule} from 'ngx-spinner';
import {PanelComponent} from './panel/panel.component';
import {NoteWindowComponent} from './note-window/note-window.component';
import {PlanComponent} from './plan/plan.component';
import {PriceRuleComponent} from './price-rule/price-rule.component';
import {PcpAutoAssignRulesComponent} from './pcp-auto-assign-rules/pcp-auto-assign-rules.component';
import {RegionComponent} from './region/region.component';
import {PriceScheduleComponent} from './price-schedule/price-schedule.component';
import {PriceRuleDetailSelectionComponent} from './price-rule-detail-selection/price-rule-detail-selection.component';
import {PcpJobSetupComponent} from './pcp-job-setup/pcp-job-setup.component';
import {PriceRuleDetailComponent} from './price-rule-detail/price-rule-detail.component';
import {TimelyFilingRulesComponent} from './timely-filing-rules/timely-filing-rules.component';
import {TimelyFilingRulesSpecialComponent} from './timely-filing-rules-special/timely-filing-rules-special.component';
import {ZipCodeComponent} from './zip-code/zip-code.component';
import {CarrierComponent} from './carrier/carrier.component';
import {RiderComponent} from './rider/rider.component';
import {ModifierComponent} from './modifier/modifier.component';
import {ConversionFactorTypeComponent} from './conversion-factor-type/conversion-factor-type.component';
import {LanguageComponent} from './language/language.component';
import {PcpaaSupportInfoDetailsComponent} from './pcpaa-support-info-details/pcpaa-support-info-details.component';
import {BillTypesInstitutionalClaimsComponent} from './bill-types-institutional-claims/bill-types-institutional-claims.component';
import {ClaimDuplicateCheckRulesComponent} from './claim-duplicate-check-rules/claim-duplicate-check-rules.component';
import {CompanyComponent} from './company/company.component';
import {GlReferenceComponent} from './gl-reference/gl-reference.component';
import {ReasonComponent} from './reason/reason.component';
import { ClaimInterestCalcRulesComponent } from './claim-interest-calc.-rules/claim-interest-calc.-rules.component';
import {LineOfBusinessComponent} from "./line-of-business/line-of-business.component";
import {PcpAutoAssignComponent} from './pcp-auto-assign/pcp-auto-assign.component';
import {GlAssignmentComponent} from './gl-assignment/gl-assignment.component';
import {DiagnosisCodeComponent} from './diagnosis-code/diagnosis-code.component';
import {AlertMessageModule} from '../../shared/components/alert-message/alert.message.module';
import { MessageMaintenanceComponent } from './message-maintenance/message-maintenance.component';
import { ClaimDiscountCalcRulesComponent } from './claim-discount-calc.-rules/claim-discount-calc.-rules.component';
import { LanguageSelectComponent } from './language-select/language-select.component';
import {LobPreExistingConditionsComponent} from './lob-pre-existing-conditions/lob-pre-existing-conditions.component';
import {SupportHelpComponent} from "./support-help/support-help.component";

const routes: Routes = [
    {path: 'panel', component: PanelComponent},
    {path: 'note-win', component: NoteWindowComponent},
    {path: 'plan', component: PlanComponent},
    {path: 'price-rule', component: PriceRuleComponent},
    {path: 'pcp-auto-assign-rules', component: PcpAutoAssignRulesComponent},
    {path: 'price-rule-detail-selection', component: PriceRuleDetailSelectionComponent},
    {path: 'pcp-auto-assign-rules', component: PcpAutoAssignRulesComponent},
    {path: 'price-schedule', component: PriceScheduleComponent},
    {path: 'pcp-auto-assign-rules', component: PcpAutoAssignRulesComponent},
    {path: 'pre-existing-condition-rules', component: PreExistingConditionRulesComponent},
    {path: 'pcp-job-setup', component: PcpJobSetupComponent},
    {path: 'region', component: RegionComponent},
    {path: 'zip', component: ZipCodeComponent},
    {path: 'modifier', component: ModifierComponent},
    {path: 'bill-types-institutional', component: BillTypesInstitutionalClaimsComponent},
    {path: 'claim-duplicate-check-rules', component: ClaimDuplicateCheckRulesComponent},
    {path: 'company', component: CompanyComponent},
    {path: 'reason', component: ReasonComponent},
    {path: 'pcpautoassign', component: PcpAutoAssignComponent},
    {path:'price-schedule', component:PriceScheduleComponent},
  {path: 'pcp-auto-assign-rules', component: PcpAutoAssignRulesComponent},
  { path: 'pre-existing-condition-rules', component: PreExistingConditionRulesComponent },
  {path: 'pcp-job-setup', component: PcpJobSetupComponent},
  { path: 'region', component: RegionComponent },
  { path: 'zip', component: ZipCodeComponent },
  { path: 'modifier', component: ModifierComponent },
  {path: 'bill-types-institutional', component: BillTypesInstitutionalClaimsComponent},
  { path: 'claim-duplicate-check-rules', component: ClaimDuplicateCheckRulesComponent },
  { path: 'gl-reference', component: GlReferenceComponent },
    { path: 'company', component:CompanyComponent },
    { path: 'diagnosis-code', component: DiagnosisCodeComponent },
    {path: 'reason', component: ReasonComponent},
    {path: 'gl-assignment', component: GlAssignmentComponent},
    {path: 'claim-interest-calc.-rules', component: ClaimInterestCalcRulesComponent},
    {path: 'pcpaa-support-info-details', component: PcpaaSupportInfoDetailsComponent},
    {path: 'language-select', component: LanguageSelectComponent},
    { path: 'lob-pre-existing-conditions', component: LobPreExistingConditionsComponent },

];

@NgModule({
    declarations: [
        CompanyComponent,
        PanelComponent,
        PreExistingConditionRulesComponent,
        PlanComponent,
        PriceRuleDetailSelectionComponent,
        PriceRuleComponent,
        PanelComponent,
        NoteWindowComponent,
        PcpAutoAssignRulesComponent,
        RegionComponent,
        PriceScheduleComponent,
        PriceRuleDetailComponent,
        PcpAutoAssignRulesComponent,
        PcpJobSetupComponent,
        TimelyFilingRulesComponent,
        TimelyFilingRulesSpecialComponent,
        ZipCodeComponent,
        RiderComponent,
        ModifierComponent,
        ConversionFactorTypeComponent,
        LanguageComponent,
        PcpaaSupportInfoDetailsComponent,
        CarrierComponent,
        BillTypesInstitutionalClaimsComponent,
        ClaimDuplicateCheckRulesComponent,
        ReasonComponent,
        ClaimInterestCalcRulesComponent,
        PcpAutoAssignComponent,
        GlReferenceComponent,
        ReasonComponent,
        LineOfBusinessComponent,
        GlAssignmentComponent,
        ReasonComponent,
        DiagnosisCodeComponent,
        MessageMaintenanceComponent,
        ClaimDiscountCalcRulesComponent,
        LanguageSelectComponent,
        LobPreExistingConditionsComponent,
        SupportHelpComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule,
        AlertMessageModule,
        NgxSpinnerModule,
        AgGridModule.withComponents([])
    ],
    exports: [
        PriceRuleDetailSelectionComponent,
        PanelComponent,
        PlanComponent,
        PriceRuleComponent,
        PanelComponent,
        CompanyComponent,
        NoteWindowComponent,
        PcpAutoAssignRulesComponent,
        RegionComponent,
        PriceScheduleComponent,
        PcpJobSetupComponent,
        PcpJobSetupComponent,
        PriceRuleDetailComponent,
        PcpAutoAssignRulesComponent,
        RiderComponent,
        ModifierComponent,
        LanguageComponent,
        PcpaaSupportInfoDetailsComponent,
        CarrierComponent,
        RiderComponent,
        ClaimDuplicateCheckRulesComponent,
        GlReferenceComponent,
        ClaimDuplicateCheckRulesComponent,
        ReasonComponent,
        GlAssignmentComponent,
        DiagnosisCodeComponent,
        LineOfBusinessComponent,
        MessageMaintenanceComponent,
        ClaimDiscountCalcRulesComponent,
        ReasonComponent,
        PcpAutoAssignComponent,
        LobPreExistingConditionsComponent,
        SupportHelpComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA,
    ]
})
export class SupportModule {
}
