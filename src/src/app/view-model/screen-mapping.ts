import {GroupMasterComponent} from '../diamond/member/group-master/group-master.component';
import {GroupContractComponent} from '../diamond/member/group-contract/group-contract.component';
import {GroupDetailComponent} from '../diamond/member/group-detail/group-detail.component';
import {MemberEligibilityHistoryComponent} from '../diamond/member/member-eligibility-history/member-eligibility-history.component';
import {MemberAddressComponent} from '../diamond/member/member-address/member-address.component';
import {MemberWorkingAgedComponent} from '../diamond/member/member-working-aged/member-working-aged.component';
import {MemberMasterComponent} from '../diamond/member/member-master/member-master.component';
import {BenefitPackageComponent} from '../diamond/benefits/benefit-package/benefit-package.component';
import {BenefitWeightAccumulatorComponent} from '../diamond/benefits/benefit-weight-accumulator/benefit-weight-accumulator.component';
import {AlternateSearchColumnsComponent} from '../diamond/member/alternate-search-columns/alternate-search-columns.component';
import {MedicalDefinitionsComponent} from '../diamond/member/medical-definitions/medical-definitions.component';
import {MedicalDefinitionsLookupComponent} from '../diamond/member/medical-definitions-lookup/medical-definitions-lookup.component';
import {PlaceOfServiceComponent} from '../diamond/member/place-of-service/place-of-service.component';
import {BenefitProcessingOrderComponent} from '../diamond/benefits/benefit-processing-order/benefit-processing-order.component';
import {BenefitRuleComponent} from '../diamond/benefits/benefit-rule/benefit-rule.component';
import {MemberConditionsComponent} from '../diamond/member/member-conditions/member-conditions.component';
import {MemberBillingComponent} from '../diamond/member/member-billing/member-billing.component';
import {AliasResponsiblePartyPrivacyComponent} from '../diamond/member/alias-responsible-party-privacy/alias-responsible-party-privacy.component';
import {MemberCobHistoryComponent} from '../diamond/member/member-cob-history/member-cob-history.component';
import {MemberMedicareComponent} from '../diamond/member/member-medicare/member-medicare.component';
import {ChangeSubscriberDesignationComponent} from '../diamond/member/change-subscriber-designation/change-subscriber-designation.component';
import {IdCardPrintComponent} from '../diamond/member/id-card-print/id-card-print.component';
import {GroupBillingComponent} from '../diamond/member/group-billing/group-billing.component';
import {BenefitAccumulatorBaseValuesComponent} from '../diamond/member/benefit-accumulator-base-values/benefit-accumulator-base-values.component';
import {GroupPanelComponent} from '../diamond/member/group-panel/group-panel.component';
import {DrgCodeMaintenanceComponent} from '../diamond/pricing/drg-code-maintenance/drg-code-maintenance.component';
import {DisplayBenefitAccumulatorsComponent} from '../diamond/member/display-benefit-accumulators/display-benefit-accumulators.component';
import {VendorMasterComponent} from '../diamond/vendor/vendor-master/vendor-master.component';
import {DrgGrouperpricerMaintenanceComponent} from '../diamond/pricing/drg-grouper-pricer-maintenance/drg-grouper-pricer-maintenance.component';
import {DrgWeightsMaintenanceComponent} from '../diamond/pricing/drg-weights-maintenance/drg-weights-maintenance.component';
import {FieldLevelSecuritySetupComponent} from '../diamond/security/field-level-security-setup/field-level-security-setup.component';
import {PriceDeterminantMaintenanceComponent} from '../diamond/pricing/price-determinant-maintenance/price-determinant-maintenance.component';
import {AdvancePaymentOffsetPriorityComponent} from '../diamond/vendor/advance-payment-offset-priority/advance-payment-offset-priority.component';
import {ProviderCredentialsComponent} from '../diamond/provider/provider-credentials/provider-credentials.component';
import {ProviderMasterComponent} from '../diamond/provider/provider-master/provider-master.component';
import {VendorAddressComponent} from '../diamond/vendor/vendor-address/vendor-address.component';
import {NoteTypeComponent} from '../shared/components/note-type/note-type.component';
import {NoteWindowComponent} from '../diamond/support/note-window/note-window.component';
import {ProviderAdminitrativeFeeRuleComponent} from '../diamond/provider/provider-adminitrative-fee-rule/provider-adminitrative-fee-rule.component';
import {CoveringProviderGroupsComponent} from '../diamond/provider/covering-provider-groups/covering-provider-groups.component';
import {CoveringProviderGroupCodesComponent} from '../diamond/provider/covering-provider-group-codes/covering-provider-group-codes.component';
import {ProviderAddressComponent} from '../diamond/provider/provider-address/provider-address.component';
import {VendorCreditComponent} from '../diamond/vendor/vendor-credit/vendor-credit.component';
import {ProviderTypeComponent} from '../diamond/provider/provider-type/provider-type.component';
import {VendorTINComponent} from '../diamond/vendor/vendor-tin/vendor-tin.component';
import {ProviderContractsComponent} from '../diamond/provider/provider-contracts/provider-contracts.component';
import {AlternateSearchOrderComponent} from '../diamond/member/alternate-search-order/alternate-search-order.component';
import {ProviderIncentiveProgramRuleComponent} from '../diamond/provider/provider-incentive-program-rule/provider-incentive-program-rule.component';
import {ClaimDisplayComponent} from '../diamond/claims/claim-display/claim-display.component';
import {ThistToothHistoryComponent} from '../diamond/claims/thist-tooth-history/thist-tooth-history.component';
import {AuthorizationClaimLinkRuleComponent} from '../diamond/claims/authorization-claim-link-rule/authorization-claim-link-rule.component';
import {ArCashReceiptsComponent} from '../diamond/premium/ar-cash-receipts/ar-cash-receipts.component';
import {ProfessionalServicesClaimsComponent} from '../diamond/claims/professional-services-claims/professional-services-claims.component';
import {ClaimDetailAuthProcRuleComponent} from '../diamond/claims/claim-detail-auth-proc-rule/claim-detail-auth-proc-rule.component';
import {ToothRuleComponent} from '../diamond/claims/tooth-rule/tooth-rule.component';
import {CustomerMaintenanceComponent} from '../diamond/premium/customer-maintenance/customer-maintenance.component';
import {ArMatrixDeterminantsComponent} from '../diamond/premium/ar-matrix-determinants/ar-matrix-determinants.component';
import {ArMatrixPremiumRateEntryComponent} from '../diamond/premium/ar-matrix-premium-rate-entry/ar-matrix-premium-rate-entry.component';
import {DentalServiceClaimsComponent} from '../diamond/claims/dental-service-claims/dental-service-claims.component';
import {SubscriberUpdateComponent} from '../diamond/premium/subscriber-update/subscriber-update.component';
import {ArAdjustmentsComponent} from '../diamond/premium/ar-adjustments/ar-adjustments.component';
import {ProcedureCodeComponent} from '../diamond/pricing/procedure-code/procedure-code.component';
import {ProcedurePriceComponent} from '../diamond/pricing/procedure-price/procedure-price.component';
import {ClaimAuthProcLinkComponent} from '../diamond/claims/claim-auth-proc-link/claim-auth-proc-link.component';
import {ClaimHoldRulesComponent} from '../diamond/claims/claim-hold-rules/claim-hold-rules.component';
import {DisplayPremiumBillingHistoryComponent} from '../diamond/premium/display-premium-billing-history/display-premium-billing-history.component';
import {PremiumBillingSetupComponent} from '../diamond/premium/premium-billing-setup/premium-billing-setup.component';
import {ClaimEvaluationRuleComponent} from '../diamond/claims/claim-evaluation-rule/claim-evaluation-rule.component';
import {AuthorizationProceduresComponent} from '../diamond/authorization/authorization-procedures/authorization-procedures.component';
import {InstitutionalClaimsComponent} from '../diamond/claims/institutional-claims/institutional-claims.component';
import {WindowsAccessComponent} from '../diamond/security/windows-access/windows-access.component';
import {PanelComponent} from '../diamond/support/panel/panel.component';
import {AuthorizationCodeComponent} from '../diamond/authorization/authorization-code/authorization-code.component';
import {AuthorizationPhysicianAdvisorComponent} from '../diamond/authorization/authorization-physician-advisor/authorization-physician-advisor.component';
import {PlanComponent} from '../diamond/support/plan/plan.component';
import {PcpAutoAssignRulesComponent} from '../diamond/support/pcp-auto-assign-rules/pcp-auto-assign-rules.component';
import {AuthorizationDaysVisitsUpdateComponent} from '../diamond/authorization/authorization-days-visits-update/authorization-days-visits-update.component';
import {AuthClaimMatchRulesComponent} from '../diamond/authorization/auth-claim-match-rules/auth-claim-match-rules.component';
import {FunctionDescriptionComponent} from '../diamond/security/function-description/function-description.component';
import {WindowDescriptionComponent} from '../diamond/security/window-description/window-description.component';
import {RegionComponent} from '../diamond/support/region/region.component';
import {PriceScheduleComponent} from '../diamond/support/price-schedule/price-schedule.component';
import {PriceRuleDetailComponent} from '../diamond/support/price-rule-detail/price-rule-detail.component';
import {PreExistingConditionRulesComponent} from '../diamond/support/pre-existing-condition-rules/pre-existing-condition-rules.component';
import {PriceRuleDetailSelectionComponent} from '../diamond/support/price-rule-detail-selection/price-rule-detail-selection.component';
import {PcpJobSetupComponent} from '../diamond/support/pcp-job-setup/pcp-job-setup.component';
import {AuthWaiveRulesComponent} from '../diamond/authorization/auth-waive-rules/auth-waive-rules.component';
import {TimelyFilingRulesComponent} from '../diamond/support/timely-filing-rules/timely-filing-rules.component';
import {AuthProcedureRangesComponent} from '../diamond/authorization/auth-procedure-ranges/auth-procedure-ranges.component';
import {FunctionAccessComponent} from '../diamond/security/function-access/function-access.component';
import {RiderComponent} from '../diamond/support/rider/rider.component';
import {AuthorizationAppealsComponent} from '../diamond/authorization/authorization-appeals/authorization-appeals.component';
import {UsersComponent} from '../diamond/security/users/users.component';
import {ModifierComponent} from '../diamond/support/modifier/modifier.component';
import {LanguageComponent} from '../diamond/support/language/language.component';
import {CarrierComponent} from '../diamond/support/carrier/carrier.component';
import {CobOrderLiabilityComponent} from '../diamond/claims/cob-order-liability/cob-order-liability.component';
import {AuthorizationTypeComponent} from '../diamond/authorization/authorization-type/authorization-type.component';
import {ConversionFactorTypeComponent} from '../diamond/support/conversion-factor-type/conversion-factor-type.component';
import {PcpaaSupportInfoDetailsComponent} from '../diamond/support/pcpaa-support-info-details/pcpaa-support-info-details.component';
import {AuthorizationSecondOpinionComponent} from '../diamond/authorization/authorization-second-opinion/authorization-second-opinion.component';
import {ClaimDuplicateCheckRulesComponent} from '../diamond/support/claim-duplicate-check-rules/claim-duplicate-check-rules.component';
import {BillTypesInstitutionalClaimsComponent} from '../diamond/support/bill-types-institutional-claims/bill-types-institutional-claims.component';
import {AccountsPayableSelectionComponent} from '../diamond/ap/accounts-payable-selection/accounts-payable-selection.component';
import {ReasonComponent} from '../diamond/support/reason/reason.component';
import {PcpAutoAssignComponent} from '../diamond/support/pcp-auto-assign/pcp-auto-assign.component';
import {CodeTableMaintenanceComponent} from '../diamond/system/code-table-maintenance/code-table-maintenance.component';
import {LineOfBusinessComponent} from '../diamond/support/line-of-business/line-of-business.component';
import {GlReferenceComponent} from '../diamond/support/gl-reference/gl-reference.component';
import {BankAccountComponent} from '../diamond/ap/bank-account/bank-account.component';
import {SystemCodesMaintenanceComponent} from '../diamond/system/system-codes-maintenance/system-codes-maintenance.component';
import {DiagnosisCodeComponent} from '../diamond/support/diagnosis-code/diagnosis-code.component';
import {GlAssignmentComponent} from '../diamond/support/gl-assignment/gl-assignment.component';
import {TaxReportingEntityComponent} from '../diamond/ap/tax-reporting-entity/tax-reporting-entity.component';
import {AuditTrailMaintenanceComponent} from '../diamond/system/audit-trail-maintenance/audit-trail-maintenance.component';
import {ParameterComponent} from '../diamond/system/parameter/parameter.component';
import {ChangeSubscriberIdComponent} from '../diamond/system/change-subscriber-id/change-subscriber-id.component';
import {MessageMaintenanceComponent} from '../diamond/support/message-maintenance/message-maintenance.component';
import {ClaimDiscountCalcRulesComponent} from '../diamond/support/claim-discount-calc.-rules/claim-discount-calc.-rules.component';
import {ClearVoidStopUpdateComponent} from '../diamond/ap/clear-void-stop-update/clear-void-stop-update.component';
import {ManualChecksComponent} from "../diamond/addon/manual-checks/manual-checks.component";
import {ClaimInterestCalcRulesComponent} from '../diamond/support/claim-interest-calc.-rules/claim-interest-calc.-rules.component';
import {ZipCodeComponent} from '../diamond/support/zip-code/zip-code.component';
import {MemberAuthorizationDisplayComponent} from '../diamond/authorization/member-authorization-display/member-authorization-display.component';
import {HoldDenyDeterminantsComponent} from '../diamond/claims/hold-deny-determinants/hold-deny-determinants.component';
import {TradingPartnerMasterComponent} from '../diamond/edi/trading-partner-master/trading-partner-master.component';
import {ScreenMaintenanceComponent} from '../diamond/system/screen-maintenance/screen-maintenance.component';
import {AuthorizationMasterComponent} from '../diamond/authorization/authorization-master/authorization-master.component';
import {CountryComponent} from '../diamond/system/country/country.component';
import { AccountsPayableUpdateComponent } from '../diamond/ap/accounts-payable-update/accounts-payable-update.component';
import {CheckPrintSetupComponent} from '../diamond/ap/check-print-setup/check-print-setup.component';
import {FinalNonApSetupComponent} from '../diamond/ap/final-non-ap-setup/final-non-ap-setup.component';
import {CheckRegisterComponent} from '../diamond/ap/check-register/check-register.component';
import {EdiWorkTableEditComponent} from '../diamond/edi/edi-work-table-edit/edi-work-table-edit.component';
import {CompanyComponent} from '../diamond/support/company/company.component';
import {UserDefinedAttributesComponent} from '../diamond/system/user-defined-attributes/user-defined-attributes.component';
import {UserDefinedFieldsComponent} from '../diamond/system/user-defined-fields/user-defined-fields.component';

import {ProcessEdiComponent} from '../diamond/edi/process-edi/process-edi.component';
import {AccountsPayableComponent} from "../diamond/accounts/accounts-payable/accounts-payable.component";
import {AccountsPayableVendorDisplayComponent} from "../diamond/accounts/accounts-payable-vendor-display/accounts-payable-vendor-display.component";
import {KeywordMaintenanceComponent} from "../diamond/system/keyword-maintenance/keyword-maintenance.component";
import { SubmitterMasterComponent } from '../diamond/edi/submitter-master/submitter-master.component';
import {VendorAdvancePaymentRulesComponent} from "../diamond/vendor/vendor-advance-payment-rules/vendor-advance-payment-rules.component";
import {PriceRuleComponent} from "../diamond/support/price-rule/price-rule.component";
import {ConversionFactorComponent} from "../diamond/pricing/conversion-factor/conversion-factor.component";
import {LobPreExistingConditionsComponent} from '../diamond/support/lob-pre-existing-conditions/lob-pre-existing-conditions.component';
import {AddressPrimaryMailingComponent} from "../diamond/addon/address-primary-mailing/address-primary-mailing.component";
import { ExternalCarrierComponent } from '../diamond/addon/external-carrier/external-carrier.component';
import { ProvinceTaxDetailComponent } from '../diamond/addon/province-tax-detail/province-tax-detail.component';
import {CignalinksGroupAddressComponent} from "../diamond/addon/cignalinks-group-address/cignalinks-group-address.component";
import {AddonControllerComponent} from "../diamond/addon/addon-controller/addon-controller.component";
import { CignalinksContactsComponent } from '../diamond/addon/cignalinks-contacts/cignalinks-contacts.component';
import {PharmacyComponent} from '../diamond/addon/pharmacy/pharmacy.component';
import {PayerDetailsComponent} from '../diamond/addon/pharmacy/payer/payer-details.component';
import {ESIDetailsComponent} from '../diamond/addon/pharmacy/esi/esi-details.component';
import { CignaLinkDetailsComponent } from '../diamond/addon/cigna-link-details/cigna-link-details.component';
import { PrimayMailingAddressComponent } from '../diamond/addon/primary-mailing-address/primary-mailing-address.component';
import {CapitationFundModelComponent} from '../diamond/claims/capitation-fund-model/capitation-fund-model.component';
import {ClaimHoldReleaseDeterminantComponent} from '../diamond/claims/claim-hold-release-determinant/claim-hold-release-determinant.component';
import {ClaimsHoldReleaseRuleComponent} from '../diamond/claims/claims-hold-release-rule/claims-hold-release-rule.component';
import {CapitationFundDistributionComponent} from "../diamond/claims/capitation-fund-distribution/capitation-fund-distribution.component";

export class ScreenMapping {
    static getScreenMapping(winId: string): any {
        var screen_mapping = [
          // Add-on
          { name: "AORXANG", component: AddressPrimaryMailingComponent },
          { name: "AORXPRP", component: AddonControllerComponent },      // todo: AddonControllerComponent will be replace   d by PricingPartnerDetailComponent
          { name: "AORXPVD", component: AddonControllerComponent },
          { name: "AORXEX", component: ExternalCarrierComponent },
          {name : 'AORXADF', component: AddonControllerComponent},
          { name: "AOADCLG", component: CignalinksGroupAddressComponent },
          { name: "AOADCT", component: CignalinksContactsComponent },
          { name: "AORXARG", component: PharmacyComponent },
          { name: "AORXPAY", component: PayerDetailsComponent},
          { name: "AORXESI", component: ESIDetailsComponent},
          { name: "AORXCLG", component: CignaLinkDetailsComponent },
          { name: "APADPM", component: PrimayMailingAddressComponent },


          // A/P

          { name: "ACPAY", component: AccountsPayableComponent },
          { name: "APSEL", component: AccountsPayableSelectionComponent },
          { name: "APUPD", component: AccountsPayableUpdateComponent },
          { name: "APVDS", component: AccountsPayableVendorDisplayComponent },
          { name: "BANKA", component: BankAccountComponent },
          { name: "CHECK", component: CheckRegisterComponent },
          { name: "CKPRT", component: CheckPrintSetupComponent },
          { name: "CVSUP", component: ClearVoidStopUpdateComponent },
          { name: "FINAL", component: FinalNonApSetupComponent },
          { name: "MCHEK", component: ManualChecksComponent },
          { name: "TRENT", component: TaxReportingEntityComponent },
          // Authorization
          { name: "APPEL", component: AuthorizationAppealsComponent },
          { name: "AUDSP", component: MemberAuthorizationDisplayComponent },
          { name: "AUTHC", component: AuthorizationCodeComponent },
          { name: "AUTHS", component: AuthorizationMasterComponent },
          { name: "AUTYP", component: AuthorizationTypeComponent },
          { name: "AWAVE", component: AuthWaiveRulesComponent },
          { name: "DVEXT", component: AuthorizationDaysVisitsUpdateComponent },
          { name: "MCHRL", component: AuthClaimMatchRulesComponent },
          { name: "PHYAD", component: AuthorizationPhysicianAdvisorComponent },
          { name: "PRCDR", component: AuthorizationProceduresComponent },
          { name: "PRCRA", component: AuthProcedureRangesComponent },
          { name: "SECOP", component: AuthorizationSecondOpinionComponent },
          // Claims
          { name: "ARULE", component: AuthorizationClaimLinkRuleComponent },
          { name: "CDAPL", component: ClaimAuthProcLinkComponent },
          { name: "CDAPR", component: ClaimDetailAuthProcRuleComponent },
          { name: "CERUL", component: ClaimEvaluationRuleComponent },
          { name: "CFDST", component: CapitationFundDistributionComponent},
          { name: "CLDSP", component: ClaimDisplayComponent },
          { name: "CLHLD", component: ClaimHoldRulesComponent },
          { name: "COBHD", component: HoldDenyDeterminantsComponent },
          { name: "DNCLM", component: DentalServiceClaimsComponent },
          { name: "INCLM", component: InstitutionalClaimsComponent },
          { name: "PSCLM", component: ProfessionalServicesClaimsComponent },
          { name: "THIST", component: ThistToothHistoryComponent },
          { name: "TRULE", component: ToothRuleComponent },
          // EDI
          { name: "EDIED", component: EdiWorkTableEditComponent },
          { name: "PREDI", component: ProcessEdiComponent },
          { name: "SUBMT", component: SubmitterMasterComponent },
          { name: "TRADP", component: TradingPartnerMasterComponent },
          // Benefits
          { name: "BENEF", component: BenefitPackageComponent },
          { name: "BENWT", component: BenefitWeightAccumulatorComponent },
          { name: "BORDR", component: BenefitProcessingOrderComponent },
          { name: "BRULE", component: BenefitRuleComponent },
          { name: "MEDCO", component: AlternateSearchColumnsComponent },
          { name: "MEDEF", component: MedicalDefinitionsComponent },
          { name: "MEDLU", component: MedicalDefinitionsLookupComponent },
          { name: "MEDOR", component: AlternateSearchOrderComponent },
          { name: "PLSVC", component: PlaceOfServiceComponent },
          // Members
          { name: "ACCUM", component: BenefitAccumulatorBaseValuesComponent },
          { name: "ALIAS", component: AliasResponsiblePartyPrivacyComponent },
          { name: "COBHS", component: MemberCobHistoryComponent },
          { name: "COBOR", component: CobOrderLiabilityComponent },
          { name: "DSPBN", component: DisplayBenefitAccumulatorsComponent },
          { name: "GROUP", component: GroupMasterComponent },
          { name: "GRUPB", component: GroupBillingComponent },
          { name: "GRUPC", component: GroupContractComponent },
          { name: "GRUPD", component: GroupDetailComponent },
          { name: "GRUPP", component: GroupPanelComponent },
          { name: "IDPRT", component: IdCardPrintComponent },
          { name: "MCOND", component: MemberConditionsComponent },
          { name: "MELIG", component: MemberEligibilityHistoryComponent },
          { name: "MEMBA", component: MemberAddressComponent },
          { name: "MEMBB", component: MemberBillingComponent },
          { name: "MEMBR", component: MemberMasterComponent },
          { name: "MEMMC", component: MemberMedicareComponent },
          { name: "MEMWA", component: MemberWorkingAgedComponent },
          // Premium
          { name: "ARADJ", component: ArAdjustmentsComponent },
          { name: "ARCSH", component: ArCashReceiptsComponent },
          { name: "ARCUS", component: CustomerMaintenanceComponent },
          { name: "BLHST", component: DisplayPremiumBillingHistoryComponent },
          { name: "GPBIL", component: PremiumBillingSetupComponent },
          { name: "MATRX", component: ArMatrixDeterminantsComponent },
          { name: "PREMM", component: ArMatrixPremiumRateEntryComponent },
          { name: "SUBSC", component: SubscriberUpdateComponent },
          // Pricing
          { name: "CONVF", component: ConversionFactorComponent },
          { name: "DRGCD", component: DrgCodeMaintenanceComponent },
          { name: "DRGGP", component: DrgGrouperpricerMaintenanceComponent },
          { name: "DRGWT", component: DrgWeightsMaintenanceComponent },
          { name: "PDTER", component: PriceDeterminantMaintenanceComponent },
          { name: "PROCD", component: ProcedureCodeComponent },
          { name: "PRULE", component: PriceRuleComponent },
          { name: "PROCP", component: ProcedurePriceComponent },
          // Providers
          { name: "ADRUL", component: ProviderAdminitrativeFeeRuleComponent },
          { name: "CREDL", component: ProviderCredentialsComponent },
          { name: "CVPVC", component: CoveringProviderGroupCodesComponent },
          { name: "CVPVG", component: CoveringProviderGroupsComponent },
          { name: "INRUL", component: ProviderIncentiveProgramRuleComponent },
          { name: "PROVA", component: ProviderAddressComponent },
          { name: "PROVC", component: ProviderContractsComponent },
          { name: "PROVF", component: ProviderMasterComponent },
          { name: "PTYPE", component: ProviderTypeComponent },
          // Reports
          { name: "IDPRT", component: IdCardPrintComponent },
          // Security
          { name: "SFLDL", component: FieldLevelSecuritySetupComponent },
          { name: "SFNDS", component: FunctionDescriptionComponent },
          { name: "SFUNC", component: FunctionAccessComponent },
          { name: "SUSER", component: UsersComponent },
          { name: "SWIND", component: WindowsAccessComponent },
          { name: "SWNDS", component: WindowDescriptionComponent },
          // Support
          { name: "BLTYP", component: BillTypesInstitutionalClaimsComponent },
          { name: "BRULE", component: BenefitRuleComponent },
          { name: "CARCD", component: CarrierComponent },
          { name: "COMPF", component: CompanyComponent },
          { name: "DIAGN", component: DiagnosisCodeComponent },
          { name: "DUPRL", component: ClaimDuplicateCheckRulesComponent },
          { name: "FACTY", component: ConversionFactorTypeComponent },
          { name: "GLASS", component: GlAssignmentComponent },
          { name: "GLREF", component: GlReferenceComponent },
          { name: "LANGM", component: LanguageComponent },
          { name: "LBCDC", component: ClaimDiscountCalcRulesComponent },
          { name: "LBCIC", component: ClaimInterestCalcRulesComponent },
          { name: "LBPEC", component: LobPreExistingConditionsComponent },
          { name: "LINBS", component: LineOfBusinessComponent },
          { name: "MODIF", component: ModifierComponent },
          { name: "NOTET", component: NoteTypeComponent },
          { name: "NOTEW", component: NoteWindowComponent },
          { name: "PANEL", component: PanelComponent },
          { name: "PCPAA", component: PcpAutoAssignComponent },
          { name: "PCPJB", component: PcpJobSetupComponent },
          { name: "PCPRL", component: PcpAutoAssignRulesComponent },
          { name: "PCPSI", component: PcpaaSupportInfoDetailsComponent },
          { name: "PLANC", component: PlanComponent },
          { name: "PRULD", component: PriceRuleDetailComponent },
          { name: "PRULS", component: PriceRuleDetailSelectionComponent },
          { name: "PSCHD", component: PriceScheduleComponent },
          { name: "PXRUL", component: PreExistingConditionRulesComponent },
          { name: "REASN", component: ReasonComponent },
          { name: "REGIN", component: RegionComponent },
          { name: "RIDER", component: RiderComponent },
          { name: "TFRUL", component: TimelyFilingRulesComponent },
          { name: "ZIPRF", component: ZipCodeComponent },
          // System
          { name: "AUDIT", component: AuditTrailMaintenanceComponent },
          { name: "CDTMT", component: CodeTableMaintenanceComponent },
          { name: "CNTRY", component: CountryComponent },
          { name: "CODES", component: SystemCodesMaintenanceComponent },
          { name: "KWDMT", component: KeywordMaintenanceComponent },
          { name: "MSGMT", component: MessageMaintenanceComponent },
          { name: "PARAM", component: ParameterComponent },
          { name: "SCNMT", component: ScreenMaintenanceComponent },
          { name: "SUBID", component: ChangeSubscriberIdComponent },
          { name: "UDATT", component: UserDefinedAttributesComponent },
          { name: "UDTXT", component: UserDefinedFieldsComponent },
          // Vendor
          { name: "VADPP", component: AdvancePaymentOffsetPriorityComponent },
          { name: "VADPR", component: VendorAdvancePaymentRulesComponent },
          { name: "VENCR", component: VendorCreditComponent },
          { name: "VENDA", component: VendorAddressComponent },
          { name: "VENDR", component: VendorMasterComponent },
          { name: "VENTX", component: VendorTINComponent },
          { name: "CFMOD", component: CapitationFundModelComponent },
          { name: "RHDET", component: ClaimHoldReleaseDeterminantComponent },
          { name: "RHRUL", component: ClaimsHoldReleaseRuleComponent }
        ];
        let mappings = screen_mapping.filter(g => g.name === winId);
        if (mappings.length > 0) {
            return mappings[0].component;
        } else {
            return false;
        }
    }
}
