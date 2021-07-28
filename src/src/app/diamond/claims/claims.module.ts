import {ClaimEvaluationRuleComponent} from './claim-evaluation-rule/claim-evaluation-rule.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberClaimHoldCodesComponent } from './member-claim-hold-codes/member-claim-hold-codes.component';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { PopUpMessageModule } from '../../shared/components/pop-up-message/pop-up.message.module';
import { CobOrderLiabilityComponent } from './cob-order-liability/cob-order-liability.component';
import { ClaimHoldRulesComponent } from './claim-hold-rules/claim-hold-rules.component';
import {ClaimDisplayComponent} from './claim-display/claim-display.component';
import {ThistToothHistoryComponent} from './thist-tooth-history/thist-tooth-history.component';
import {ProfessionalServicesClaimsComponent} from './professional-services-claims/professional-services-claims.component';
import {AuthorizationClaimLinkRuleComponent} from './authorization-claim-link-rule/authorization-claim-link-rule.component';
import { ClaimsBatchInitiationComponent } from './claims-batch-initiation/claims-batch-initiation.component';
import {InstitutionalClaimsComponent} from './institutional-claims/institutional-claims.component';
import {ClaimDetailAuthProcRuleComponent} from './claim-detail-auth-proc-rule/claim-detail-auth-proc-rule.component';
import {ToothRuleComponent} from './tooth-rule/tooth-rule.component';
import {DentalServiceClaimsComponent} from './dental-service-claims/dental-service-claims.component';
import {MemberUtilizationDisplayComponent} from './member-utilization-display/member-utilization-display.component';
import {HoldDenyDeterminantsComponent} from './hold-deny-determinants/hold-deny-determinants.component';
import { ClaimAuthProcLinkComponent } from './claim-auth-proc-link/claim-auth-proc-link.component';
import {InstitutionalClaimDetailComponent} from './institutional-claim-detail/institutional-claim-detail.component';
import {ProfessionalServicesClaimsDetailComponent} from './professional-services-claims-detail/professional-services-claims-detail.component';
import {ProfessionalServicesClaimsOtherComponent} from './professional-services-claims-other/professional-services-claims-other.component';
import { ChangeHeaderComponent } from './change-header/change-header.component';
import { ProviderVendorInformationComponent } from './provider-vendor-information/provider-vendor-information.component';
import { ClaimHeaderInformationComponent } from './claim-header-information/claim-header-information.component';
import { SubmittedClaimProviderComponent } from './submitted-claim-provider/submitted-claim-provider.component';
import { SubmittedClaimHeaderub92InformationComponent } from './submitted-claim-header/ub92-information.component';
import { ClaimDisplayTotalsComponent } from './claim-display-totals/claim-display-totals.component';
import { ClaimHoldReasonsComponent } from './claims-hold-reasons/claims-hold-reasons.component';
import {CapitationFundModelComponent} from './capitation-fund-model/capitation-fund-model.component';
import {ClaimHoldReleaseDeterminantComponent} from './claim-hold-release-determinant/claim-hold-release-determinant.component';
import {ClaimsHoldReleaseRuleComponent} from './claims-hold-release-rule/claims-hold-release-rule.component';
import {CapitationFundDistributionComponent} from "./capitation-fund-distribution/capitation-fund-distribution.component";
import {ClaimsHelpComponent} from "./claims-help/claims-help.component";
import {ClaimsPaymentComponent} from './institutional-claims/claims-payment/claims-payment.component';
import {ProviderPaymentComponent} from './institutional-claims/claims-payment/provider-payment/provider-payment.component';
import { PaymentTypeComponent } from './institutional-claims/claims-payment/payment-type/payment-type.component';
import { AddressPreviewComponent } from './institutional-claims/claims-payment/address-preview/address-preview.component';
import {LocalCurrencyConversionComponent} from '../addon/local-currency-conversion/local-currency-conversion.component'



const routes: Routes = [
    {path: 'claim-detail-auth-proc-link', component: ClaimAuthProcLinkComponent },
    {path: 'claim-hold-rules', component: ClaimHoldRulesComponent },
    {path: 'member-claim-hold-codes', component: MemberClaimHoldCodesComponent},
    {path: 'cob-order-liability', component: CobOrderLiabilityComponent},
    {path: 'claim-evaluation-rule', component: ClaimEvaluationRuleComponent},
    {path: 'cob-order-liability', component: CobOrderLiabilityComponent},
    {path: 'claim-display', component: ClaimDisplayComponent},
    {path: 'cob-order-liability', component: CobOrderLiabilityComponent},
    {path: 'authorization-claim-link-rule', component: AuthorizationClaimLinkRuleComponent},
    {path: 'claim-detail-auth-proc-rule', component: ClaimDetailAuthProcRuleComponent},
    {path: 'thist-tooth-history', component: ThistToothHistoryComponent},
    {path: 'tooth-rule', component: ThistToothHistoryComponent},
    {path: 'institutional-claims', component: InstitutionalClaimsComponent},
    {path: 'dental-service-claims', component: DentalServiceClaimsComponent},
    {path: 'tooth-rule', component: ToothRuleComponent},
    {path: 'hold-deny-determinants', component: HoldDenyDeterminantsComponent},
    {path: 'header-file', component: InstitutionalClaimDetailComponent},
    {path: 'claim-header-info', component: ClaimHeaderInformationComponent},
    {path: 'provider-vendor-info', component: ProviderVendorInformationComponent},
    {path: 'professional-services-claims', component: ProfessionalServicesClaimsComponent},
    {path: 'professional-services-claims-other', component: ProfessionalServicesClaimsDetailComponent},
    {path: 'professional-services-claims-detail', component: ProfessionalServicesClaimsOtherComponent},
    {path: 'claim-display-totals', component: ClaimDisplayTotalsComponent},
    {path: 'capitation-fund-model', component: ProfessionalServicesClaimsOtherComponent},
    {path: 'capitation-fund-distribution', component: CapitationFundDistributionComponent},
    {path: 'claim-hold-release-determinant', component: ClaimHoldReleaseDeterminantComponent},
    {path: 'claim-hold-release-rule', component: ClaimsHoldReleaseRuleComponent},
    {path: 'claim-payment', component: ClaimsPaymentComponent ,
        children:[
            {path:'provider-claim-payment/:claimNo' ,  component: ProviderPaymentComponent },
            {path:'type-claim-payment' ,  component: PaymentTypeComponent },
            {path:'address-preview-claim-payment/:claimNo' ,  component: AddressPreviewComponent }


        ]},


];

@NgModule({
    declarations: [
        ClaimAuthProcLinkComponent,
        MemberClaimHoldCodesComponent,
        CobOrderLiabilityComponent,
        ClaimHoldRulesComponent,
        ClaimDisplayComponent,
        AuthorizationClaimLinkRuleComponent,
        ProfessionalServicesClaimsComponent,
        ClaimsBatchInitiationComponent,
        ClaimDetailAuthProcRuleComponent,
        ThistToothHistoryComponent,
        ToothRuleComponent,
        InstitutionalClaimsComponent,
        DentalServiceClaimsComponent,
        MemberUtilizationDisplayComponent,
        HoldDenyDeterminantsComponent,
        ClaimEvaluationRuleComponent,
        InstitutionalClaimDetailComponent,
        ProfessionalServicesClaimsComponent,
        ProfessionalServicesClaimsDetailComponent,
        ProfessionalServicesClaimsOtherComponent,
        ChangeHeaderComponent,
        ClaimHeaderInformationComponent,
        ProviderVendorInformationComponent,
        SubmittedClaimProviderComponent,
        SubmittedClaimHeaderub92InformationComponent,
        ClaimDisplayTotalsComponent,
        ClaimHoldReasonsComponent,
        CapitationFundModelComponent,
        ClaimHoldReleaseDeterminantComponent,
        ClaimsHoldReleaseRuleComponent,
        CapitationFundDistributionComponent,
        ClaimsHelpComponent,
        ClaimsPaymentComponent,
        ProviderPaymentComponent,
        PaymentTypeComponent,
        AddressPreviewComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        PopUpMessageModule,
        RouterModule.forChild(routes)
    ],
    exports: [MemberClaimHoldCodesComponent,
        ClaimAuthProcLinkComponent,
        ProfessionalServicesClaimsComponent,
        ProfessionalServicesClaimsDetailComponent,
        ProfessionalServicesClaimsOtherComponent,
        AuthorizationClaimLinkRuleComponent,
        CobOrderLiabilityComponent,
        ClaimDisplayComponent,
        ClaimsBatchInitiationComponent,
        ClaimDetailAuthProcRuleComponent,
        ThistToothHistoryComponent,
        ToothRuleComponent,
        DentalServiceClaimsComponent,
        MemberUtilizationDisplayComponent,
        ClaimHoldRulesComponent,
        InstitutionalClaimsComponent,
        HoldDenyDeterminantsComponent,
        InstitutionalClaimDetailComponent,
        ClaimHeaderInformationComponent,
        ProviderVendorInformationComponent,
        ClaimDisplayTotalsComponent,
        CapitationFundModelComponent,
        ClaimHoldReleaseDeterminantComponent,
        ClaimsHoldReleaseRuleComponent,
        CapitationFundDistributionComponent,
        ClaimsHelpComponent,
        ClaimsPaymentComponent,
        ProviderPaymentComponent,
        PaymentTypeComponent,
        AddressPreviewComponent,
    ]
})
export class ClaimsModule {
}
