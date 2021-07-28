import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberWorkingAgedComponent } from "./member-working-aged/member-working-aged.component";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../../shared/shared.module";
import { PopUpMessageModule } from "../../shared/components/pop-up-message/pop-up.message.module";
import { GroupContractComponent } from "./group-contract/group-contract.component";
import { GroupDetailComponent } from "./group-detail/group-detail.component";
import { GroupMasterComponent } from "./group-master/group-master.component";
import { LetterRequestComponent } from "./letter-request/letter-request.component";
import { AddressRippleComponent } from "./address-ripple/address-ripple.component";
import { ProviderChangeComponent } from "./provider-change/provider-change.component";
import { AddDiamondIdComponent } from "./add-diamond-id/add-diamond-id.component";
import { MemberEligibilityHistoryComponent } from "./member-eligibility-history/member-eligibility-history.component";
import { GroupUserFieldsComponent } from "./group-user-fields/group-user-fields.component";
import { MemberAddressComponent } from "./member-address/member-address.component";
import { MemberMasterComponent } from "./member-master/member-master.component";
import { MemberTerminateUnterminateComponent } from "./member-terminate-unterminate/member-terminate-unterminate.component";
import { MedicalDefinitionsLookupComponent } from "./medical-definitions-lookup/medical-definitions-lookup.component";
import { AlternateSearchColumnsComponent } from "./alternate-search-columns/alternate-search-columns.component";
import { MedicalDefinitionsComponent } from "./medical-definitions/medical-definitions.component";
import { AlternateSearchOrderComponent } from "./alternate-search-order/alternate-search-order.component";
import { PlaceOfServiceComponent } from "./place-of-service/place-of-service.component";
import { MemberConditionsComponent } from "./member-conditions/member-conditions.component";
import { MemberBillingComponent } from "./member-billing/member-billing.component";
import { AliasResponsiblePartyPrivacyComponent } from "./alias-responsible-party-privacy/alias-responsible-party-privacy.component";
import { MemberCobHistoryComponent } from "./member-cob-history/member-cob-history.component";
import { MemberMedicareComponent } from "./member-medicare/member-medicare.component";
import { DependentVerificationStatusComponent } from "./dependent-verification-status/dependent-verification-status.component";
import { ChangeSubscriberDesignationComponent } from "./change-subscriber-designation/change-subscriber-designation.component";
import { MemberCobVerificationInformationComponent } from "./member-cob-verification-information/member-cob-verification-information.component";
import { DeactivateGuardService } from "../../shared/services/deactivate-guard.service";
import { IdCardPrintComponent } from "./id-card-print/id-card-print.component";
import { IdCardPrintSelectionComponent } from "./id-card-print-selection/id-card-print-selection.component";
import { MemberFamilyViewComponent } from './member-family-view/member-family-view.component';
import { DiamondIdDisplayComponent } from './diamond-id-display/diamond-id-display.component';
import { GroupBillingComponent } from './group-billing/group-billing.component';
import { BenefitAccumulatorBaseValuesComponent } from './benefit-accumulator-base-values/benefit-accumulator-base-values.component';
import { GroupPanelComponent } from './group-panel/group-panel.component';
import { SelectMemberComponent } from './select-member/select-member.component';
import {DisplayBenefitAccumulatorsComponent} from "./display-benefit-accumulators/display-benefit-accumulators.component";
import {DisplayBenefitAccumulatorsSelectMemberComponent} from "./display-benefit-accumulators-select-member/display-benefit-accumulators-select-member.component";
import {NgxSpinnerModule} from 'ngx-spinner';
import { AccumClaimsReportComponent } from './accum-claims-report/accum-claims-report.component';
import { HelpComponent } from './../member/help/help.component';
import { CarrierCobVerficationInformationComponent } from './carrier-cob-verfication-information/carrier-cob-verfication-information.component';
import { AccountInformationComponent } from './account-information/account-information.component';
import { CarrierOtherInfoComponent } from './carrier-other-info/carrier-other-info.component';

const routes: Routes = [
    { path: 'member-working-aged', component: MemberWorkingAgedComponent },
    { path: 'group-contract', component: GroupContractComponent },
    { path: 'group-detail', component: GroupDetailComponent },
    { path: 'group-master', component: GroupMasterComponent, canDeactivate: [DeactivateGuardService] },
    { path: 'letter-request', component: LetterRequestComponent },
    { path: 'address-ripple', component: AddressRippleComponent },
    { path: 'provider-change', component: ProviderChangeComponent },
    { path: 'add-diamond', component: AddDiamondIdComponent, },
    { path: 'eligibility-history', component: MemberEligibilityHistoryComponent },
    { path: 'group-user-field', component: GroupUserFieldsComponent },
    { path: 'address', component: MemberAddressComponent },
    { path: 'member-master', component: MemberMasterComponent },
    { path: 'terminate-un-terminate', component: MemberTerminateUnterminateComponent },
    { path: 'medical-definitions-lookup', component: MedicalDefinitionsLookupComponent },
    { path: 'alternate-search-columns', component: AlternateSearchColumnsComponent },
    { path: 'medical-definitions', component: MedicalDefinitionsComponent },
    { path: 'alternate-search-order', component: AlternateSearchOrderComponent },
    { path: 'place-of-service', component: PlaceOfServiceComponent },
    { path: 'select-member', component: SelectMemberComponent },

    { path: 'conditions', component: MemberConditionsComponent },
    { path: 'billing', component: MemberBillingComponent },
    { path: 'alias-responsible-party-privacy', component: AliasResponsiblePartyPrivacyComponent, },
    { path: 'cob-history', component: MemberCobHistoryComponent },
    { path: 'medicare', component: MemberMedicareComponent },
    { path: 'dependent-verification-status', component: DependentVerificationStatusComponent },
    { path: 'change-subscriber-designation', component: ChangeSubscriberDesignationComponent },

    { path: 'cob-verification-information', component: MemberCobVerificationInformationComponent },
    { path: 'id-card-print', component: IdCardPrintComponent },
    { path: 'member-family-view', component: MemberFamilyViewComponent },
    { path: 'diamond-id-display', component: DiamondIdDisplayComponent },
    { path: 'benefitaccumulatorbasevalues', component: BenefitAccumulatorBaseValuesComponent },
     { path: 'grouppanel', component: GroupPanelComponent },
    { path: 'display-benefit-accumulator', component: DisplayBenefitAccumulatorsComponent },
    { path: 'group-billing', component: GroupBillingComponent},
    { path: 'accum-claims-report',component: AccumClaimsReportComponent},
]

@NgModule({
    declarations: [
        MemberWorkingAgedComponent,
        GroupPanelComponent,
        GroupBillingComponent,
        GroupContractComponent,
        GroupDetailComponent,
        GroupMasterComponent,
        LetterRequestComponent,
        AddressRippleComponent,
        ProviderChangeComponent,
        AddDiamondIdComponent,
        MemberEligibilityHistoryComponent,
        GroupUserFieldsComponent,
        MemberAddressComponent,
        MemberMasterComponent,
        MemberTerminateUnterminateComponent,
        MedicalDefinitionsLookupComponent,
        AlternateSearchColumnsComponent,
        MedicalDefinitionsComponent,
        AlternateSearchOrderComponent,
        PlaceOfServiceComponent,
        MemberConditionsComponent,
        MemberBillingComponent,
        AliasResponsiblePartyPrivacyComponent,
        MemberCobHistoryComponent,
        MemberMedicareComponent,
        ChangeSubscriberDesignationComponent,
        MemberCobVerificationInformationComponent,
        DependentVerificationStatusComponent,
        IdCardPrintComponent,
        IdCardPrintSelectionComponent,
        MemberFamilyViewComponent,
        DiamondIdDisplayComponent,
        BenefitAccumulatorBaseValuesComponent,
        SelectMemberComponent,
        DisplayBenefitAccumulatorsComponent,
        DisplayBenefitAccumulatorsSelectMemberComponent,
        GroupBillingComponent,
        AccumClaimsReportComponent,
        HelpComponent,
        AccountInformationComponent,
        CarrierCobVerficationInformationComponent,
        CarrierOtherInfoComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
        PopUpMessageModule,
        NgxSpinnerModule,
    ],
    exports: [
        GroupPanelComponent,
        MemberWorkingAgedComponent,
        GroupBillingComponent,
        GroupContractComponent,
        GroupDetailComponent,
        GroupMasterComponent,
        LetterRequestComponent,
        AddressRippleComponent,
        ProviderChangeComponent,
        AddDiamondIdComponent,
        MemberEligibilityHistoryComponent,
        GroupUserFieldsComponent,
        MemberAddressComponent,
        MemberMasterComponent,
        MemberTerminateUnterminateComponent,
        MedicalDefinitionsLookupComponent,
        AlternateSearchColumnsComponent,
        MedicalDefinitionsComponent,
        AlternateSearchOrderComponent,
        PlaceOfServiceComponent,
        MemberConditionsComponent,
        MemberBillingComponent,
        AliasResponsiblePartyPrivacyComponent,
        MemberCobHistoryComponent,
        MemberMedicareComponent,
        ChangeSubscriberDesignationComponent,
        MemberCobVerificationInformationComponent,
        DependentVerificationStatusComponent,
        IdCardPrintComponent,
        IdCardPrintSelectionComponent,
        MemberFamilyViewComponent,
        DiamondIdDisplayComponent,
        BenefitAccumulatorBaseValuesComponent,
        SelectMemberComponent,
        DisplayBenefitAccumulatorsComponent,
        DisplayBenefitAccumulatorsSelectMemberComponent,
        AccumClaimsReportComponent,
        HelpComponent,
        AccountInformationComponent,
        CarrierCobVerficationInformationComponent,
        CarrierOtherInfoComponent
    ]
})
export class MemberModule {
}
