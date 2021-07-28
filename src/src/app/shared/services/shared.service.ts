import {Directive, HostBinding, Injectable, Input, Optional} from '@angular/core';
import {GroupMasterComponent} from '../../diamond/member/group-master/group-master.component';
import {AllowIn} from 'ng-keyboard-shortcuts';
import {FunctionalGroupsComponent} from '../../diamond/main-menu/functional-groups/functional-groups.component';
import {GroupContractComponent} from '../../diamond/member/group-contract/group-contract.component';
import {GroupDetailComponent} from '../../diamond/member/group-detail/group-detail.component';
import {GroupUserFieldsComponent} from '../../diamond/member/group-user-fields/group-user-fields.component';
import {AddressRippleComponent} from '../../diamond/member/address-ripple/address-ripple.component';
import {ProviderChangeComponent} from '../../diamond/member/provider-change/provider-change.component';
import {MemberEligibilityHistoryComponent} from '../../diamond/member/member-eligibility-history/member-eligibility-history.component';
import {MemberConditionsComponent} from '../../diamond/member/member-conditions/member-conditions.component';
import {MemberMedicareComponent} from '../../diamond/member/member-medicare/member-medicare.component';
import {MemberWorkingAgedComponent} from '../../diamond/member/member-working-aged/member-working-aged.component';
import {MemberMasterComponent} from '../../diamond/member/member-master/member-master.component';
import {BenefitPackageComponent} from '../../diamond/benefits/benefit-package/benefit-package.component';
import {MemberCobVerificationInformationComponent} from '../../diamond/member/member-cob-verification-information/member-cob-verification-information.component';
import {BenefitRuleComponent} from '../../diamond/benefits/benefit-rule/benefit-rule.component';
import {MedicalDefinitionsComponent} from '../../diamond/member/medical-definitions/medical-definitions.component';
import {AliasResponsiblePartyPrivacyComponent} from '../../diamond/member/alias-responsible-party-privacy/alias-responsible-party-privacy.component';
import {IdCardPrintComponent} from '../../diamond/member/id-card-print/id-card-print.component';
import {MemberAddressComponent} from '../../diamond/member/member-address/member-address.component';
import {DynamicFormComponent} from '../components/dynamic-form/dynamic-form.component';
import {PlaceOfServiceComponent} from '../../diamond/member/place-of-service/place-of-service.component';
import {AlternateSearchColumnsComponent} from '../../diamond/member/alternate-search-columns/alternate-search-columns.component';
import {GroupBillingComponent} from '../../diamond/member/group-billing/group-billing.component';
import {GroupPanelComponent} from '../../diamond/member/group-panel/group-panel.component';
import {ControlContainer} from '@angular/forms';
import {CobOrderLiabilityComponent} from '../../diamond/claims/cob-order-liability/cob-order-liability.component';
import {MedicalDefinitionsLookupComponent} from '../../diamond/member/medical-definitions-lookup/medical-definitions-lookup.component';
import {VendorMasterComponent} from '../../diamond/vendor/vendor-master/vendor-master.component';
import {DrgGrouperpricerMaintenanceComponent} from '../../diamond/pricing/drg-grouper-pricer-maintenance/drg-grouper-pricer-maintenance.component';
import {MemberBillingComponent} from '../../diamond/member/member-billing/member-billing.component';
import {MemberCobHistoryComponent} from '../../diamond/member/member-cob-history/member-cob-history.component';
import {FieldLevelSecuritySetupComponent} from '../../diamond/security/field-level-security-setup/field-level-security-setup.component';
import {BenefitProcessingOrderComponent} from '../../diamond/benefits/benefit-processing-order/benefit-processing-order.component';
import {BenefitWeightAccumulatorComponent} from '../../diamond/benefits/benefit-weight-accumulator/benefit-weight-accumulator.component';
import {VendorAdvancePaymentRulesComponent} from '../../diamond/vendor/vendor-advance-payment-rules/vendor-advance-payment-rules.component';
import {Observable} from 'rxjs';
import {ErrorObservable} from 'rxjs-compat/observable/ErrorObservable';
import {DisplayBenefitAccumulatorsComponent} from '../../diamond/member/display-benefit-accumulators/display-benefit-accumulators.component';
import {DisplayBenefitAccumulatorsSelectMemberComponent} from '../../diamond/member/display-benefit-accumulators-select-member/display-benefit-accumulators-select-member.component';
import {BenefitAccumulatorBaseValuesComponent} from '../../diamond/member/benefit-accumulator-base-values/benefit-accumulator-base-values.component';
import {SelectMemberComponent} from '../../diamond/member/select-member/select-member.component';
import {ConversionFactorComponent} from '../../diamond/pricing/conversion-factor/conversion-factor.component';
import {NotesComponent} from '../components/notes/notes.component';
import {ProviderCredentialsComponent} from '../../diamond/provider/provider-credentials/provider-credentials.component';
import {InsuranceComponent} from '../../diamond/provider/insurance/insurance.component';
import {ProviderTypeComponent} from '../../diamond/provider/provider-type/provider-type.component'
import {ProviderMasterComponent} from '../../diamond/provider/provider-master/provider-master.component';
import {VendorCreditComponent} from '../../diamond/vendor/vendor-credit/vendor-credit.component';
import {ProviderIncentiveProgramRuleComponent} from '../../diamond/provider/provider-incentive-program-rule/provider-incentive-program-rule.component';
import {ProviderAdminitrativeFeeRuleComponent} from '../../diamond/provider/provider-adminitrative-fee-rule/provider-adminitrative-fee-rule.component';
import {ProviderContractsComponent} from '../../diamond/provider/provider-contracts/provider-contracts.component';
import {NgbToastType} from 'ngb-toast';
import {AdvancePaymentOffsetPriorityComponent} from '../../diamond/vendor/advance-payment-offset-priority/advance-payment-offset-priority.component';
import {VendorAddressComponent} from '../../diamond/vendor/vendor-address/vendor-address.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastService} from './toast.service';
import {ProviderAddressComponent} from '../../diamond/provider/provider-address/provider-address.component';
import {VendorTINComponent} from '../../diamond/vendor/vendor-tin/vendor-tin.component';
import {CoveringProviderGroupsComponent} from '../../diamond/provider/covering-provider-groups/covering-provider-groups.component';
import {CoveringProviderGroupCodesComponent} from '../../diamond/provider/covering-provider-group-codes/covering-provider-group-codes.component';
import {ClaimHoldRulesComponent} from '../../diamond/claims/claim-hold-rules/claim-hold-rules.component';
import {ProfessionalServicesClaimsComponent} from '../../diamond/claims/professional-services-claims/professional-services-claims.component';
import {ClaimDisplayComponent} from '../../diamond/claims/claim-display/claim-display.component';
import {ProcedureCodeComponent} from '../../diamond/pricing/procedure-code/procedure-code.component';
import {DynamicConfigGridComponent} from '../components/dynamic-config-grid/dynamic-config-grid.component';
import {ClaimDetailAuthProcRuleComponent} from '../../diamond/claims/claim-detail-auth-proc-rule/claim-detail-auth-proc-rule.component';
import {AuthorizationClaimLinkRuleComponent} from '../../diamond/claims/authorization-claim-link-rule/authorization-claim-link-rule.component';
import {ArCashReceiptsComponent} from '../../diamond/premium/ar-cash-receipts/ar-cash-receipts.component';
import {PremiumBillingSetupComponent} from '../../diamond/premium/premium-billing-setup/premium-billing-setup.component';
import {AuthorizationProceduresComponent} from '../../diamond/authorization/authorization-procedures/authorization-procedures.component';
import {FunctionAccessComponent} from '../../diamond/security/function-access/function-access.component';
import {ClaimAuthProcLinkComponent} from '../../diamond/claims/claim-auth-proc-link/claim-auth-proc-link.component';


import {WindowsAccessComponent} from '../../diamond/security/windows-access/windows-access.component';
import {NoteTypeComponent} from '../components/note-type/note-type.component';
import {NoteWindowComponent} from '../../diamond/support/note-window/note-window.component';
import {AuthorizationCodeComponent} from '../../diamond/authorization/authorization-code/authorization-code.component';
import {PlanComponent} from '../../diamond/support/plan/plan.component';
import {PriceScheduleComponent} from '../../diamond/support/price-schedule/price-schedule.component';
import {MessageType, PopUpMessage, PopUpMessageButton} from '../components/pop-up-message';
import {PopUpMessageComponent} from '../components/pop-up-message/pop-up-message/pop-up-message.component';
import {PriceRuleComponent} from '../../diamond/support/price-rule/price-rule.component';
import {AuthorizationSecondOpinionComponent} from '../../diamond/authorization/authorization-second-opinion/authorization-second-opinion.component';
import {AuthorizationPhysicianAdvisorComponent} from '../../diamond/authorization/authorization-physician-advisor/authorization-physician-advisor.component';
import {AuthorizationDaysVisitsUpdateComponent} from '../../diamond/authorization/authorization-days-visits-update/authorization-days-visits-update.component';
import {ProcedurePriceComponent} from '../../diamond/pricing/procedure-price/procedure-price.component';
import {ArAdjustmentsComponent} from '../../diamond/premium/ar-adjustments/ar-adjustments.component';
import {AuthorizationAppealsComponent} from '../../diamond/authorization/authorization-appeals/authorization-appeals.component';
import {CustomerMaintenanceComponent} from '../../diamond/premium/customer-maintenance/customer-maintenance.component';
import {CarrierComponent} from '../../diamond/support/carrier/carrier.component';
import {ModifierComponent} from '../../diamond/support/modifier/modifier.component';
import {AuthorizationTypeComponent} from '../../diamond/authorization/authorization-type/authorization-type.component';
import {GlReferenceComponent} from '../../diamond/support/gl-reference/gl-reference.component';
import {InstitutionalClaimsComponent} from '../../diamond/claims/institutional-claims/institutional-claims.component';
import {CompanyComponent} from '../../diamond/support/company/company.component';
import {ReasonComponent} from '../../diamond/support/reason/reason.component';
import {BankAccountComponent} from '../../diamond/ap/bank-account/bank-account.component';
import {TaxReportingEntityComponent} from '../../diamond/ap/tax-reporting-entity/tax-reporting-entity.component';
import {PcpAutoAssignComponent} from '../../diamond/support/pcp-auto-assign/pcp-auto-assign.component';
import {DiagnosisCodeComponent} from '../../diamond/support/diagnosis-code/diagnosis-code.component';
import {UsersComponent} from '../../diamond/security/users/users.component';
import {PriceRuleDetailSelectionComponent} from "../../diamond/support/price-rule-detail-selection/price-rule-detail-selection.component";
import {PriceRuleDetailComponent} from "../../diamond/support/price-rule-detail/price-rule-detail.component";
import {FinalNonApSetupComponent} from '../../diamond/ap/final-non-ap-setup/final-non-ap-setup.component';
import {EdiWorkTableEditComponent} from '../../diamond/edi/edi-work-table-edit/edi-work-table-edit.component';
import {UserDefinedFieldsComponent} from '../../diamond/system/user-defined-fields/user-defined-fields.component';
import {UserDefinedAttributesComponent} from '../../diamond/system/user-defined-attributes/user-defined-attributes.component';
import {LineOfBusinessComponent} from '../../diamond/support/line-of-business/line-of-business.component';
import {CheckRegisterComponent} from '../../diamond/ap/check-register/check-register.component';
import {SubmitterMasterComponent} from '../../diamond/edi/submitter-master/submitter-master.component';
import {HoldDenyDeterminantsComponent} from '../../diamond/claims/hold-deny-determinants/hold-deny-determinants.component';
import {InstitutionalClaimDetailComponent} from "../../diamond/claims/institutional-claim-detail/institutional-claim-detail.component";
import {AuthWaiveRulesComponent} from "../../diamond/authorization/auth-waive-rules/auth-waive-rules.component";
import {RiderComponent} from "../../diamond/support/rider/rider.component";
import {ProfessionalServicesClaimsDetailComponent} from "../../diamond/claims/professional-services-claims-detail/professional-services-claims-detail.component";
import { AuthorizationMasterComponent } from '../../diamond/authorization/authorization-master/authorization-master.component';
import {ProfessionalServicesClaimsOtherComponent} from "../../diamond/claims/professional-services-claims-other/professional-services-claims-other.component";
import {ParameterComponent} from '../../diamond/system/parameter/parameter.component';
import {AuthProcedureRangesComponent} from '../../diamond/authorization/auth-procedure-ranges/auth-procedure-ranges.component';
import {CapitationFundModelComponent} from '../../diamond/claims/capitation-fund-model/capitation-fund-model.component';
import {ClaimsHoldReleaseRuleComponent} from '../../diamond/claims/claims-hold-release-rule/claims-hold-release-rule.component';
import {ClaimHoldReleaseDeterminantComponent} from '../../diamond/claims/claim-hold-release-determinant/claim-hold-release-determinant.component';
import {AdonContactComponent} from '../../diamond/addon/adon-contact/adon-contact.component';
import {AlternateSearchOrderComponent} from "../../diamond/member/alternate-search-order/alternate-search-order.component";
import {DrgCodeMaintenanceComponent} from "../../diamond/pricing/drg-code-maintenance/drg-code-maintenance.component";
import {DrgWeightsMaintenanceComponent} from "../../diamond/pricing/drg-weights-maintenance/drg-weights-maintenance.component";
import {PriceDeterminantMaintenanceComponent} from "../../diamond/pricing/price-determinant-maintenance/price-determinant-maintenance.component";
import {BillTypesInstitutionalClaimsComponent} from "../../diamond/support/bill-types-institutional-claims/bill-types-institutional-claims.component";
import {ClaimDuplicateCheckRulesComponent} from "../../diamond/support/claim-duplicate-check-rules/claim-duplicate-check-rules.component";
import {ConversionFactorTypeComponent} from "../../diamond/support/conversion-factor-type/conversion-factor-type.component";
import {GlAssignmentComponent} from "../../diamond/support/gl-assignment/gl-assignment.component";
import {LanguageComponent} from "../../diamond/support/language/language.component";
import {ClaimDiscountCalcRulesComponent} from "../../diamond/support/claim-discount-calc.-rules/claim-discount-calc.-rules.component";
import {ClaimInterestCalcRulesComponent} from "../../diamond/support/claim-interest-calc.-rules/claim-interest-calc.-rules.component";
import {LobPreExistingConditionsComponent} from "../../diamond/support/lob-pre-existing-conditions/lob-pre-existing-conditions.component";
import {PanelComponent} from "../../diamond/support/panel/panel.component";
import {PcpJobSetupComponent} from "../../diamond/support/pcp-job-setup/pcp-job-setup.component";
import {PcpAutoAssignRulesComponent} from "../../diamond/support/pcp-auto-assign-rules/pcp-auto-assign-rules.component";
import {PcpaaSupportInfoDetailsComponent} from "../../diamond/support/pcpaa-support-info-details/pcpaa-support-info-details.component";
import {PreExistingConditionRulesComponent} from "../../diamond/support/pre-existing-condition-rules/pre-existing-condition-rules.component";
import {RegionComponent} from "../../diamond/support/region/region.component";
import {TimelyFilingRulesComponent} from "../../diamond/support/timely-filing-rules/timely-filing-rules.component";
import {ZipCodeComponent} from '../../diamond/support/zip-code/zip-code.component';
import {ClaimEvaluationRuleComponent} from "../../diamond/claims/claim-evaluation-rule/claim-evaluation-rule.component";
import {CapitationFundDistributionComponent} from "../../diamond/claims/capitation-fund-distribution/capitation-fund-distribution.component";
import {DentalServiceClaimsComponent} from "../../diamond/claims/dental-service-claims/dental-service-claims.component";
import {ThistToothHistoryComponent} from "../../diamond/claims/thist-tooth-history/thist-tooth-history.component";
import {ToothRuleComponent} from "../../diamond/claims/tooth-rule/tooth-rule.component";
import {AccountsPayableComponent} from "../../diamond/accounts/accounts-payable/accounts-payable.component";
import {AccountsPayableSelectionComponent} from "../../diamond/ap/accounts-payable-selection/accounts-payable-selection.component";
import {AccountsPayableUpdateComponent} from "../../diamond/ap/accounts-payable-update/accounts-payable-update.component";
import {AccountsPayableVendorDisplayComponent} from "../../diamond/accounts/accounts-payable-vendor-display/accounts-payable-vendor-display.component";
import {CheckPrintSetupComponent} from "../../diamond/ap/check-print-setup/check-print-setup.component";
import {ClearVoidStopUpdateComponent} from "../../diamond/ap/clear-void-stop-update/clear-void-stop-update.component";
import {ManualChecksComponent} from "../../diamond/addon/manual-checks/manual-checks.component";
import {CopyWindowsAccessComponent} from "../../diamond/security/copy-windows-access/copy-windows-access.component";
import {arch} from "os";
import { PricingHelpComponent } from '../../diamond/pricing/pricing-help/pricing-help.component';
import { ArMatrixPremiumRateEntryComponent } from '../../diamond/premium/ar-matrix-premium-rate-entry/ar-matrix-premium-rate-entry.component';
import {AppComponent} from "../../app.component";
import {WindowDescriptionComponent} from "../../diamond/security/window-description/window-description.component";
import {get} from "ag-grid-community/dist/lib/utils/object";
import {ArMatrixDeterminantsComponent} from "../../diamond/premium/ar-matrix-determinants/ar-matrix-determinants.component";
import {FunctionDescriptionComponent} from "../../diamond/security/function-description/function-description.component";
@Injectable({
  providedIn: "root",
})
export class SharedService {
  constructor(
    private modalService: NgbModal,
    public toastService: ToastService
  ) {}

  shortcutModalState = false;

  onVendorModuleTopicMenuClick(
    action: string,
    currentScreen: any,
    activeModal: any,
    vendorId: any
  ) {
    let ref;
    switch (action) {
      case "Master File": {
        if (currentScreen != "Master File") {
          activeModal.close(); //Close current modal
          ref = this.modalService.open(VendorMasterComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.vendorID = vendorId;
        }
        break;
      }
      case "Addresses": {
        if (currentScreen != "Addresses") {
          activeModal.close();
          ref = this.modalService.open(VendorAddressComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.vendorID = vendorId;
        }
        break;
      }
      case "Vendor Credit": {
        if (currentScreen != "Vendor Credit") {
          activeModal.close();
          ref = this.modalService.open(VendorCreditComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.vendorID = vendorId;
        }
        break;
      }

      default: {
        this.toastService.showToast(
          MESSAGE_CONSTANTS.NOT_IMPLEMENTED,
          NgbToastType.Danger
        );
        break;
      }
    }
  }


  onPriceRuleTopicMenu(
    action: string,
    currentScreen: any,
    activeModal: any,
    priceRule: any
  ) {
    let ref;
    switch (action) {
      case "Price Rule Master": {
        if (currentScreen != "Price Rule Master") {
          activeModal.close(); //Close current modal
          ref = this.modalService.open(PriceRuleComponent);
          ref.componentInstance.showIcon = true;
          ref.componentInstance.PriceRule = priceRule;
        }
        break;
      }
      case "Price Rule Detail Selection": {
        if (currentScreen != "Price Rule Detail Selection") {
          activeModal.close(); //Close current modal
          ref = this.modalService.open(PriceRuleDetailSelectionComponent);
          ref.componentInstance.showIcon = true;
          ref.componentInstance.PriceRule = priceRule;
        }
        break;
      }
      case "Master File": {
        if (currentScreen != "Master File") {
          activeModal.close(); //Close current modal
          ref = this.modalService.open(ProcedureCodeComponent);
          ref.componentInstance.showIcon = true;
          ref.componentInstance.PriceRule = priceRule;
        }
        break;
      }
      // case 'Price File': {
      //   if (currentScreen != 'Price File') {
      //     activeModal.close();
      //     //Screen not avaliabe
      //     // ref = this.modalService.open();
      //     // ref.componentInstance.showIcon = true;
      //     // ref.componentInstance.procedureCode = procedureCode;
      //   }
      //   break;
      // }
      // case 'Unit Values': {
      //   if (currentScreen != 'Unit Values') {
      //     activeModal.close();
      //     ref = this.modalService.open();
      //     ref.componentInstance.showIcon = true;
      //     ref.componentInstance.procedureCode = procedureCode;
      //   }
      //   break;
      // }
      default: {
        this.toastService.showToast(
          "This option is not implemented yet",
          NgbToastType.Danger
        );
        break;
      }
    }
  }
  onProcedureCodeMenuClick(
    action: string,
    currentScreen: any,
    activeModal: any,
    procedureCode: any
  ) {
    let ref;
    switch (action) {
      case "Master File": {
        if (currentScreen != "Master File") {
          activeModal.close(); //Close current modal
          ref = this.modalService.open(ProcedureCodeComponent);
          ref.componentInstance.showIcon = true;
          ref.componentInstance.procedureCode = procedureCode;
        break;
      }
    }
      case 'Price File': {
        if (currentScreen != 'Price File') {
          activeModal.close();
          ref = this.modalService.open(ProcedurePriceComponent);
          ref.componentInstance.showIcon = true;
          ref.componentInstance.procedureCode = procedureCode;
        }
        break;
      }
      // case 'Unit Values': {
      //   if (currentScreen != 'Unit Values') {
      //     activeModal.close();
      //     ref = this.modalService.open();
      //     ref.componentInstance.showIcon = true;
      //     ref.componentInstance.procedureCode = procedureCode;
      //   }
      //   break;
      // }

      default: {
        this.toastService.showToast(
          "This option is not implemented yet",
          NgbToastType.Danger
        );
        break;
      }
    }
  }

  onMemberModuleTopicMenuClick(
    action: string,
    currentScreen: any,
    activeModal: any,
    subscriberId: any,
    selectedMember: any
  ) {

    let ref;
    switch (action) {
      case "Close": {
        if (currentScreen != "Master File") {
          activeModal.close(); //Close current modal
          ref = this.modalService.open(MemberMasterComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "Master File": {
        if (currentScreen != "Master File") {
          activeModal.close();
          ref = this.modalService.open(MemberMasterComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "Working Aged": {
        if (currentScreen != "Working Aged") {
          activeModal.close();
          ref = this.modalService.open(MemberWorkingAgedComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "Eligibility History": {
        if (currentScreen != "Eligibility History") {
          activeModal.close();
          ref = this.modalService.open(MemberEligibilityHistoryComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "Coordination of Benefits": {
        if (currentScreen != "Coordination of Benefits") {
          activeModal.close();
          ref = this.modalService.open(MemberCobHistoryComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "Member Address": {
          activeModal.close();
          ref = this.modalService.open(MemberAddressComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        break;
      }
      case "Alias/Responsible Party/Privacy": {
        if (currentScreen != "Alias/Responsible Party/Privacy") {
          activeModal.close();
          ref = this.modalService.open(AliasResponsiblePartyPrivacyComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "M+C Information": {
        if (currentScreen != "M+C Information") {
          activeModal.close();
          ref = this.modalService.open(MemberMedicareComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "Billing Control": {
        if (currentScreen != "Billing Control") {
          activeModal.close();
          ref = this.modalService.open(MemberBillingComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;
      }
      case "Conditions": {
        if (currentScreen != "Conditions") {
          activeModal.close();
          ref = this.modalService.open(MemberConditionsComponent, {
            backdrop: "static",
            keyboard: false,
          });
          ref.componentInstance.showIcon = true;
          ref.componentInstance.SubID = subscriberId;
          ref.componentInstance.selectedMember = selectedMember;
        }
        break;

      }
      default: {
        this.toastService.showToast(
          "This option is not implemented yet",
          NgbToastType.Danger
        );
        break;
      }
    }
  }

  public handleError(
    error: any,
    caught?: Observable<any>,
    isSilentError: boolean = false
  ): Observable<any> {
    let errorMessage = "";
    const message = error.error.message;
    if (
      error &&
      error.error &&
      error.error.status &&
      parseInt(error.error.status) === 409
    ) {
      errorMessage = message;
    } else if (parseInt(error.status) == 0) {
      errorMessage = `An Error occurred while Processing request. Cannot Connect to server. Please make sure that web service is running.`;
    } else if (parseInt(error.status) == 404) {
      errorMessage = `A 404 error occurred while accessing URL ${error.url}. Page Not Found.`;
    } else if (parseInt(error.status) == 500) {
      errorMessage = `An Internal Server Error Occurred while accessing URL ${error.url}. ${error.statusText}`;
    } else if (parseInt(error.status) == 400) {
      /*errorMessage = `An error occurred while accessing URL ${
              message ? ',' + message : ''
            }`;*/
      errorMessage = message;
    } else if (parseInt(error.status) === 409) {
      errorMessage = message;
    } else {
      errorMessage = message;
    }

    if (parseInt(error.status) !== 401 && !isSilentError) {
      let popUpMessage = new PopUpMessage(
        "poUpMessageName",
        "Error",
        errorMessage,
        "danger"
      );
      popUpMessage.buttons = [
        new PopUpMessageButton("Ok", "Ok", "btn btn-primary"),
      ];
      let ref = this.modalService.open(PopUpMessageComponent);
      ref.componentInstance.popupMessage = popUpMessage;
    }
    return ErrorObservable.create(errorMessage);
  }

  showPopUp(
    popUpName: string,
    message: string,
    title: string,
    button = "Cancel",
    messageType = MessageType.SUCCESS
  ) {
    if (!message) {
      return;
    }
    let popUpMessage = new PopUpMessage(popUpName, title, message, "icon");
    popUpMessage.buttons = [
      new PopUpMessageButton(button, button, "btn btn-primary"),
    ];
    let ref = this.modalService.open(PopUpMessageComponent);
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.messageType = messageType;
  }

  showDialogBox(popUpMessage: PopUpMessage) {
    let ref = this.modalService.open(PopUpMessageComponent, {
      size: "lg",
    });
    ref.componentInstance.popupMessage = popUpMessage;
    ref.componentInstance.showIcon = true;
    return ref.componentInstance;
  }
}


@Directive({
    selector: 'label[controlName]',
})
export class LabelControl {
    @Input() controlName: string;

    constructor(
        @Optional() private parent: ControlContainer) {
    }

    @HostBinding('textContent')
    get controlValue() {
        return this.parent ? this.parent.control.get(this.controlName).value : '';
    }
}

export const CONSTANTS = {
    MAIN_FORM: 'main-form',

    DW_GROUP_DE: 'dw_group_de',
    LEVEL_CODE: 'level_code',
    RULE_TYPE: 'rule_type',
    GROUP_TYPE: 'group_type',
    DW_BRULE_DE: 'dw_brule_de',
    ORDER_TYPE: 'order_type',
    COLUMN_NAME: 'column_name',
    OPERATOR: 'operator',
    CALC_DUE_DATE_RULES: 'calc_due_day_rules',
    MEMBER_GENDER: 'member_gender',
    DW_CREATE_DETAIL_DE: 'dw_crate_detail_de',
    MARITAL_STATUS: 'marital_status',
    DW_MEMBR_DE: 'dw_membr_de',
    RELATIONSHIP_CODE: 'relationship_code',
    DW_MELIG_DE: 'dw_melig_de',
    LANGUAGE_CODE: 'oracle_language_code',
    DW_LANGM_DE: 'dw_langm_de',
    MC_INDICATOR: 'mc_indicator',
    DW_NAME: 'dw_grupd_de',
    RECORD_TYPE: 'record_type',
    PROF_COB_CALC_COLUMN: 'cob_calc_method',
    DEPENDENT_DETERMINATION_COLUMN: 'dep_determ_rule_code',
    DNTL_COB_CALC_COLUMN: 'dental_cob_calc_method',
    DW_GRUPB_DE: 'dw_grupb_de',
    DW_GRUPD_PICKLIST: 'dw_grupd_picklist',
    BILLING_FREQUENCY: 'billing_frequency',
    RATE_FREEZE_CALC: 'rate_freeze_calc',
    PRORATION_METHOD: 'proration_method',
    TIERING_METHOD: 'tiering_method',
    DW_RATE_DE: 'dw_rate_de',
    DW_IDPRT_SETUP_DE: 'dw_idprt_setup_de',
    DW_PDTER_DE: 'dw_pdter_de',
    DW_COBHD_DETER_VALUES_DE: 'dw_cobhd_deter_values_de',
    DW_BRULE_SELECT_DE: 'dw_brule_select_de',
    DW_BENEF_DETAIL_DE: 'dw_benef_detail_de',
    DW_COLUMN_AUTH_REQ: 'auth_req',
    DW_COLUMN_SUP_DEP_RULE: 'sup_dep_rule',
    DW_ARADJ_DE: 'dw_aradj_de',
    DW_COLUMN_CUSTOMER_TYPE: 'customer_type',
    DW_COLUMN_COMPANY_CODE: 'company_code',

    DW_COBHS_DE: 'dw_cobhs_de',
    OTHER_FAM_COVERAGE: 'other_fam_coverage',
    COB_CODE: 'cob_code',
    DW_COBHS_OTHER_DE: 'dw_cobhs_other_de',
    DEP_DETERM_RULE_CODE: 'dep_determ_rule_code',
    CARRIER_SUBS_GENDER: 'oth_carrier_subs_gender',
    COVTYPE: 'COVTYPE',
    PLANTYPE: 'PLANTYPE',
    COBPYMT: 'COBPYMT',
    CARRIER_TYPE: 'carrier_type',
    DW_COBHS_PICKLIST: 'dw_cobhs_picklist',
    PRODTYPE: 'PRODTYPE',
    SECDEPRULE: 'SECDEPRULE',
    DW_CRDR_INFO: 'dw_crdr_info',
    DW_COLUMN_ACCT_USE: 'acct_use',
    DW_COLUMN_ACCT_STATUS: 'acct_status',
    DW_RESPONSE_CLDSP_DE: 'dw_response_cldsp_de',
    FILE_TYPE: 'file_type',
    DW_BLHST_RESPONSE: 'dw_blhst_response',

    //Claims Sections
    PATIENT_STATUS: 'patient_status',
    MEDICAL_RELEASE: 'medical_release',
    DW_INCLM_HEADER: 'dw_inclm_header_de',

    //Menus Sections
    F_AUDIT: 'F_AUDIT_',
    DW_VADPR_DE: 'dw_vadpr_de',
    OFF_SET_BY: 'offset_by',
    ZERO_PAY_OPTION: 'zero_pay_option',
    ACC_PAY_TYPE: 'acc_pay_type',
    MESSAGEID11073: '11073',
    MESSAGEID30164: '30164',


    F_ADD_DEPEND: 'F_ADD_DEPEND',
    F_TERM_UNTERM: 'F_TERM_UNTERM',
    F_REINSTATE: 'F_REINSTATE',
    F_PROV_CHANGE: 'F_PROV_CHANGE',
    F_MOD_EXISTPROV: 'F_MOD_EXISTPROV',
    F_ADDR_RIPPLE: 'F_ADDR_RIPPLE',
    F_CLM_HOLD_CDS: 'F_CLM_HOLD_CDS',
    F_VFY_STUDSTAT: 'F_VFY_STUDSTAT',
    F_SUB_DESIG: 'F_SUB_DESIG',
    F_IDCARD_REQ: 'F_IDCARD_REQ',
    F_LETTER_REQ: 'F_LETTER_REQ',
    F_DC_INFO: 'F_DC_INFO',
    F_VW_IPA_INFO: 'F_VW_IPA_INFO',
    F_SUBID_CHANGE: 'F_SUBID_CHANGE',
    F_MCOB_VRFINFO: 'F_MCOB_VRFINFO',
    F_VW_AL_HIST: 'F_VW_AL_HIST',
    F_MOD_PRIVACYIND: 'F_MOD_PRIVACYIND',
    F_VW_CREDIT_BAL: 'F_VW_CREDIT_BAL',
    F_MEMBER_BL_THRU: 'F_MEMBER_BL_THRU',
    F_MEMBER_PD_THRU: 'F_MEMBER_PD_THRU',
    F_GROUP_BL_THRU: 'F_GROUP_BL_THRU',
    F_GROUP_PD_THRU: 'F_GROUP_PD_THRU',
    F_GRP_USR_FLDS: 'F_GRP_USR_FLDS',
    // Benefit package
    F_BENEF_COPY_PKG: 'F_BENEF_COPY_PKG',
    F_DEF_BEN_FIL: 'F_DEF_BEN_FIL',
    F_BEN_USR_FLDS: 'F_BEN_USR_FLDS',
    F_VW_OTHCARR: 'F_VW_OTHCARR',
    F_DET_COBORDER: 'F_DET_COBORDER',
    F_CCOB_VRINFO: 'F_CCOB_VRINFO',
    F_CPY_GRP_DET: 'F_CPY_GRP_DET',
    // Provider Incentive Program rules
    DW_INRUL_QUALITY_PGR_DE: 'dw_inrul_quality_pgm_de',
    QUALITY_CAP_APPLY: 'quality_cap_apply',
    DW_PROVF_SPEC_DE: 'dw_provf_spec_de',
    PRIMARY_SPECIALTY: 'primary_specialty',
    DIRECTORY_INCLUDE: 'directory_include',
    BOARD_STATUS: 'board_status',
    F_LIST_VEND: 'F_LIST_VEND',
    F_PROV_RELATION: 'F_PROV_RELATION',
    F_PROV_ID_CHG: 'F_PROV_ID_CHG',
    F_VEND_ADD: 'F_VEND_ADD',
    F_RULE_CPY: 'F_RULE_CPY',


    // ProviderContract
    DW_PROVC_DE: 'dw_provc_de',
    CONTRACT_TYPE: 'contract_type',
    DW_PROVC_TXNMY_DE: 'dw_provc_txnmy_de',
    PRIMARY: 'primary',
    DW_PROV_CONTRACT_VEND_DE: 'dw_prov_contract_vend_de',
    CDEFAULT_VENDOR_ADDR: 'cdefault_vendor_addr',

    DW_CVPVG_DE: 'dw_cvpvg_de',
    REIMB_METHOD: 'reimb_method',
    //A/R cash reciept
    DW_ARCSH_DE: 'dw_arcsh_de',
    DW_ARCSH_BATCH_CONTROL: 'dw_arcsh_batch_control',
    CUSTOMER_TYPE: 'customer_type',
    STATEMENT_STATUS: 'statement_status',
    BATCH_STATUS: 'batch_status',
    DW_PTYPE: 'dw_ptype_picklist',
    PROVIDER_TYPE_SPECIALTY: 'type_or_specialty',
    DW_AR_CASH_BILL_HISTORY_DE: 'dw_ar_cash_bill_history_de',
    TRANSACTION_TYPE: 'transaction_type',
    PRINT_REMIT_ADVICE: 'print_remit_advice',
    DW_NOTEW_LINK_DE: 'dw_notew_link_de',
    LINK_CONTEXT: 'link_context',
    DW_REGION_DE: 'dw_regin_type',
    REGION_TYPE: 'region_type',
    DW_PCBJB_DE: 'dw_pcpjb_de',
    INSERT_BY_PROCESS: 'insert_by_process',
    DW_PCPJB_PICK: 'dw_pcpjb_pick',
    STATUS: 'status',

    // Price Rule Details
    DW_PRULD_DE: 'dw_pruld_de',
    CALCULATION_METHOD: 'calculation_method',
    UNIT_VALUE_TYPE: 'unit_value_type',
    CAP_OUTLIER_INCL_EXCL: 'cap_outlier_incl_excl',
    MULT_MOD_PRICE_METHOD: 'mult_mod_price_method',
    CLAIMTYPE: 'CLAIMTYPE',

    // Users
    USER_UNLOCK: 'USER_UNLOCK',

    // Unlock user sec function
    F_UNLCK_USR_ACCT: 'F_UNLCK_USR_ACCT',

    DW_CHECK_RESPONSE: 'dw_check_response',
    TYPE: 'type',


    // Professional Service Claim
    F_CLAIMS_PAY_SUB: 'F_CLAIMS_PAY_SUB',



    MEMBER_MASTER_DATA_WINDOWID: "dw_membr_user_fields_de",
    MEMBER_MASTER_WINID:"MEMBR",
    BENEFIT_PACKAGE_DATA_WINDOWID: "dw_benef_de",
    BENEFIT_PACKAGE_WINID:"BENEF",
    ARCUS_WINDID:"ARCUS",
    ARCUS_DATA_WINDOWID:'dw_arcus_de',
    GRUPC_WINDID:"GRUPC",
    GRUPC_DATA_WINDOWID:'dw_group_contract_de',
};

export const MESSAGE_CONSTANTS = {
    NOT_IMPLEMENTED: 'This option is not implemented yet',
    ERROR_8021: '8021: Only one address can be designated as primary.',
    ERROR_28013: '28013: Entered Vendor ID does not exist.',
}

function getShortcutKeyObj(
  key: string,
  label: any,
  description: string,
  command: any,
  allowIn = [AllowIn.Select, AllowIn.Input],
  preventDefault = true,
  target?: HTMLElement
) {
  return {
    command,
    label,
    description,
    allowIn,
    key: [key],
    preventDefault,
    throttleTime: 250,
    target: target,
  };
}

export function getFunctionalGroupsShortcutkeys(functionalGroupsComponent: FunctionalGroupsComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            functionalGroupsComponent.helpScreen();
        }),
    ]
}


export function getGroupMasterShortcutKeys(groupMasterComponent: GroupMasterComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Group Master form data', () => {
                groupMasterComponent.saveGroupMaster();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Group Master', () => {
                groupMasterComponent.createNewFunction();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Group Master', () => {
                groupMasterComponent.resetAll();
        }),
        getShortcutKeyObj('alt + tab', 'Diamond', 'Change tab', () => {
          console.log('tab');
          groupMasterComponent.handleChangeScreen();
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Open Note', () => {
                groupMasterComponent.openNoteShortCut();
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
                groupMasterComponent.openTopicMenu();
        }),
        getShortcutKeyObj('alt + d', 'Diamond', 'Open Topic Menu', () => {
                groupMasterComponent.triggerGroupDetail()
        }),
        getShortcutKeyObj('alt + c', 'Diamond', 'Open Topic Menu', () => {
                groupMasterComponent.triggerGroupContract()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
                groupMasterComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
                groupMasterComponent.openWindowMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
          groupMasterComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
                groupMasterComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          groupMasterComponent.openHelpMenu()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            groupMasterComponent.handleHelpMenu();
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          groupMasterComponent.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          groupMasterComponent.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('u', 'Diamond', 'Group User Field', () => {
              groupMasterComponent.triggerMenus('u')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          groupMasterComponent.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Open New', () => {
          groupMasterComponent.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          groupMasterComponent.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('p', 'Diamond', 'Open Panel', () => {
          groupMasterComponent.triggerMenus('p')
            },  []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open Billing Control', () => {
          groupMasterComponent.triggerMenus('l')
            },  []
        ),
        getShortcutKeyObj('i', 'Diamond', 'D/C Information', () => {
          groupMasterComponent.triggerMenus('i')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          groupMasterComponent.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          groupMasterComponent.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          groupMasterComponent.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          groupMasterComponent.triggerMenus('h')
            },  []
        ),
    ];
}


export function onVendorModuleTopicMenuClick(
    action: string,
    currentScreen: any,
    vendorId: any) {
    let ref;
    switch (action) {
        case 'Master File': {
            if (currentScreen != 'Master File') {
                this.activeModal.close(); //Close current modal
                ref = this.modalService.open(VendorMasterComponent, {backdrop: 'static', keyboard: false});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.vendorID = vendorId;
            }
            break;
        }
        case 'Addresses': {
            if (currentScreen != 'Addresses') {
                this.activeModal.close();
                ref = this.modalService.open(VendorAddressComponent, {backdrop: 'static', keyboard: false});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.vendorID = vendorId;
            }
            break;
        }
        case 'Adv. Pay Priority': {
            if (currentScreen != 'Adv. Pay Priority') {
                this.activeModal.close();
                ref = this.modalService.open(AdvancePaymentOffsetPriorityComponent, {
                    backdrop: 'static',
                    keyboard: false
                });
                ref.componentInstance.showIcon = true;
                ref.componentInstance.vendorID = vendorId;
            }
            break;
        }
        case 'Adv. Pay Account': {
            if (currentScreen != 'Adv. Pay Account') {
                this.activeModal.close();
            }
            break;
        }
        case 'Vendor Credit': {
            if (currentScreen != 'Vendor Credit') {
                this.activeModal.close();
                ref = this.modalService.open(VendorCreditComponent, {backdrop: 'static', keyboard: false});
                ref.componentInstance.showIcon = true;
                ref.componentInstance.vendorID = vendorId;
            }
            break;
        }
        default: {
            this.toastService.showToast(
                'This option is not implemented yet',
                NgbToastType.Danger
            );
            break;
        }
    }
}



export function getGroupMasterSearchShortcut(groupMasterComponent: GroupMasterComponent) {
    return [
        getShortcutKeyObj('tab', 'Diamond', 'Search Group id', () => {
            groupMasterComponent.getGroupMasterByGroupId();
        })
    ]
}

// export function getBenefitRuleByIdShortcut(benefitRuleComponent: BenefitRuleComponent) {
//     return [
//         getShortcutKeyObj('tab', 'Diamond', 'Search Rule id', () => {
//             benefitRuleComponent.getBenefitRuleById();
//         })
//     ]
// }

export function getGroupPanelShortcutKeys(groupPanelComponent: GroupPanelComponent) {
    return [
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Add New Contact', () => {

        }),
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save New Group Panel', () => {
            groupPanelComponent.handleSaveFileMenu();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            groupPanelComponent.helpScreen();
        })
    ]
}

export function getGroupContractShortcutKeys(groupContractComponent: GroupContractComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            groupContractComponent.saveGroupContract();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Contract', () => {
            groupContractComponent.createNewContract();
        }),

        getShortcutKeyObj('ctrl + o', 'Diamond', 'Create New Contract', () => {
            groupContractComponent.resetAllState();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
            groupContractComponent.modalClose();
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
          groupContractComponent.exitScreen();
        }),
        getShortcutKeyObj('ctrl + tab', 'Diamond', 'Switch Screen', (shortcutEventOutput: any) => {
            groupContractComponent.switchKey(shortcutEventOutput.event.preventDefault())
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            groupContractComponent.helpScreen();
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Note Screen', () => {
            groupContractComponent.openNotesScreen();
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
          groupContractComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
           groupContractComponent.openTopicMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
                groupContractComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
                groupContractComponent.openWindowMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
          groupContractComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          groupContractComponent.openHelpMenu()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          groupContractComponent.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          groupContractComponent.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          groupContractComponent.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Open Detail', () => {
          groupContractComponent.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          groupContractComponent.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('p', 'Diamond', 'Open Panel', () => {
          groupContractComponent.triggerMenus('p')
            },  []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open Billing Control', () => {
          groupContractComponent.triggerMenus('l')
            },  []
        ),
        getShortcutKeyObj('i', 'Diamond', 'D/C Information', () => {
          groupContractComponent.triggerMenus('i')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          groupContractComponent.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          groupContractComponent.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          groupContractComponent.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          groupContractComponent.triggerMenus('h')
            },  []
        ),
        getShortcutKeyObj('p', 'Diamond', 'Open Topic Menu', (shortcutEventOutput: any) => {
              if (shortcutEventOutput.event.target.id !== 'networkName') {
                    shortcutEventOutput.event.preventDefault();
                    groupContractComponent.triggerPanel();
                }
            }, [], false
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open Topic Menu', () => {
                groupContractComponent.triggerBillingCtrlLookup()
            },[]
        ),
        getShortcutKeyObj('alt + d', 'Diamond', 'Open Topic Menu', () => {
                groupContractComponent.triggerGroupDetail()},  []),
        getShortcutKeyObj('alt + m', 'Diamond', 'Open Topic Menu', () => {
          groupContractComponent.triggerMasterFile()},[]),
        getShortcutKeyObj('p', 'Diamond', 'Open Topic Menu', (shortcutEventOutput: any) => {
                if (shortcutEventOutput.event.target.id !== 'networkName') {
                    shortcutEventOutput.event.preventDefault();
                    groupContractComponent.triggerPanel();
                }}, [AllowIn.Select, AllowIn.Input], false),
        getShortcutKeyObj('l', 'Diamond', 'Open Topic Menu', () => {
                groupContractComponent.triggerBillingCtrlLookup()},[])
    ]
}

export function getNoteMasterShortcutKeys(notesComponent: NotesComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            notesComponent.saveNoteMaster();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Notes', () => {
            notesComponent.createNewNote();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Notes', () => {
            notesComponent.openNotesScreen();
        })
    ]
}

export function getNoteTypeShortcutKeys(noteTypeComponent: NoteTypeComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            noteTypeComponent.saveChanges();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Note Type', () => {
            noteTypeComponent.editNoteType = false;
            noteTypeComponent.createNewForm();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Select priority level', () => {
            noteTypeComponent.openLookupFieldSearchModel();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            noteTypeComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete form data', () => {
            noteTypeComponent.deleteNoteType();
        }),
    ]
}

export function getNoteWindowShortcutKeys(noteWindowComponent: NoteWindowComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            noteWindowComponent.saveNoteWinLink(noteWindowComponent.noteWinLink);
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Note Window', () => {
                noteWindowComponent.createNewRecord();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            noteWindowComponent.helpScreen();
        })
    ]
}

export function getDynamicFormsShortcutKeys(dynamicFormComponent: DynamicFormComponent) {
    return [
        getShortcutKeyObj('ctrl + a', 'Form', 'Add New Record', () => {
            let mockConfig = JSON.parse(JSON.stringify(dynamicFormComponent.config));    // make a copy of original config
            dynamicFormComponent.addNewRow(mockConfig, false);
        }),
        getShortcutKeyObj('ctrl + shift + s', 'Form', 'Save form data', () => {
            dynamicFormComponent.onSubmit();
        }),


    ]
}

export function getDynamicConfigFormsShortcutKeys(dynamicFormComponent: DynamicConfigGridComponent) {
    return [
        getShortcutKeyObj('ctrl + a', 'Form', 'Add New Record', () => {
            if (dynamicFormComponent.AddNewWithShortcut){
                let mockConfig = JSON.parse(
                    JSON.stringify(dynamicFormComponent.config)
                  );    // make a copy of original config
                dynamicFormComponent.addNewRow(mockConfig, false);}
        }),
        getShortcutKeyObj('ctrl + shift + s', 'Form', 'Save form data', () => {
            dynamicFormComponent.onSubmit();
        })


    ]
}


export function disableF5() {
    return [
        getShortcutKeyObj('f5', 'Form', 'Save form data', () => {

        })
    ]
}

export function getGroupDetailShortcutKeys(groupDetailComponent: GroupDetailComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            groupDetailComponent.saveGroupDetail();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Detail', () => {
            groupDetailComponent.resetAllState()
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            groupDetailComponent.createNewGroupDetial();
        }),
      getShortcutKeyObj('alt + tab', 'Diamond', 'Change tab', () => {
        groupDetailComponent.handleChangeScreen();
      }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
            groupDetailComponent.modalClose()
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
            groupDetailComponent.exitScreen()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
            groupDetailComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
            groupDetailComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
            groupDetailComponent.openTopicMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
            groupDetailComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
            groupDetailComponent.openHelpMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
            groupDetailComponent.openWindowMenu()
        }),
        getShortcutKeyObj('f4', 'Diamond', 'Open Notes', () => {
            groupDetailComponent.popUpNotesMenuClicked();
        }),
        getShortcutKeyObj('f6', 'Diamond', 'Open Addons', () => {
            groupDetailComponent.openAddons();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            groupDetailComponent.helpScreen();
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
            groupDetailComponent.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
              groupDetailComponent.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
              groupDetailComponent.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
              groupDetailComponent.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
              groupDetailComponent.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
              groupDetailComponent.triggerMenus('e')
            },  []
        ),
        getShortcutKeyObj('p', 'Diamond', 'Open Panel', () => {
              groupDetailComponent.triggerMenus('p')
            },  []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open Billing Control', () => {
              groupDetailComponent.triggerMenus('l')
            },  []
        ),
        getShortcutKeyObj('i', 'Diamond', 'D/C Information', () => {
              groupDetailComponent.triggerMenus('i')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
              groupDetailComponent.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
              groupDetailComponent.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
              groupDetailComponent.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
              groupDetailComponent.triggerMenus('h')
            },  []
        ),
    ]
}

export function getAlternateSearchColumns(ASC: AlternateSearchColumnsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            ASC.saveASC();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            ASC.createNewAlternateSC();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            ASC.helpScreen();
        })
    ]
}

export function getProviderContractsShortcutKeys(providerContractsComponent: ProviderContractsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            providerContractsComponent.saveProvContract();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
            providerContractsComponent.editProvContract = false;
            providerContractsComponent.resetForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            providerContractsComponent.handleHelpMenu();
        })
    ]
}

export function getLOBShortcutKeys(lineOfBusinessComponent: LineOfBusinessComponent) {
    return [

      getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
        lineOfBusinessComponent.resetForm();
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        lineOfBusinessComponent.helpScreen();
      }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Open form', () => {
        lineOfBusinessComponent.openScreen();
      }),
      getShortcutKeyObj('ctrl + F4', 'Diamond', 'Close the screen', () => {
        lineOfBusinessComponent.modalClose();
      }),
      getShortcutKeyObj('alt + F4', 'Diamond', 'Close the screen', () => {
        lineOfBusinessComponent.modalClose();
      }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        lineOfBusinessComponent.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        lineOfBusinessComponent.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        lineOfBusinessComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
        lineOfBusinessComponent.openSpecialMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        lineOfBusinessComponent.openTopicMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        lineOfBusinessComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        lineOfBusinessComponent.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        lineOfBusinessComponent.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        lineOfBusinessComponent.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        lineOfBusinessComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        lineOfBusinessComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        lineOfBusinessComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        lineOfBusinessComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Close Screen', () => {
        lineOfBusinessComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            lineOfBusinessComponent.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'Line Of Business', () => {
            lineOfBusinessComponent.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('r', 'Diamond', 'Pre Existing Conditions', () => {
            lineOfBusinessComponent.triggerMenus('lr')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        lineOfBusinessComponent.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        lineOfBusinessComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        lineOfBusinessComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        lineOfBusinessComponent.triggerMenus('h')
          },  []
      ),
    ]
}

export function getPriceRuleDetailShortcutKeys(component: PriceRuleDetailComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
          component.savePriceRule();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Save form data', () => {
          component.handleOpenMenu();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
          component.createNewFunction();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          component.helpScreen();
        }),
        getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
          component.openFunctionalGroupShortcut();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        component.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen()
      }),
      getShortcutKeyObj('alt +  f', 'Diamond', 'Shortcut Menu', () => {
        component.openFileMenu();
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Shortcut Menu', () => {
        component.openTopicMenu()
      }),
      getShortcutKeyObj('alt +  w', 'Diamond', 'Shortcut Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Shortcut Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('alt +  h', 'Diamond', 'Shortcut Menu', () => {
        component.openHelpMenu()
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
            component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
            component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
            component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
            component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
            component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('m', 'Diamond', 'Open Panel', () => {
            component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'Open Billing Control', () => {
            component.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
            component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
            component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
            component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
            component.triggerMenus('h')
          },  []
      ),
    ]
}

export function getProfessionalServicesClaimDetailComponentShortcutKeys(professionalServicesClaimsOtherComponent: ProfessionalServicesClaimsOtherComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            professionalServicesClaimsOtherComponent.saveChanges();
        })
    ]
}
export function getProfessionalServicesDetailComponentShortcutKeys(professionalServicesClaimsComponent: ProfessionalServicesClaimsDetailComponent) {
    return [
      getShortcutKeyObj('f11', 'Diamond', 'Create New', () => {
        professionalServicesClaimsComponent.getChooseClaimPaymentMethodScreen()
      }),
    ]
}


export function getProfessionalClaimServicesShortcutKeys(professionalServicesClaimsComponent: ProfessionalServicesClaimsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            professionalServicesClaimsComponent.saveProfClaimHeader();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
            professionalServicesClaimsComponent.resetForm();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Create New', () => {
            professionalServicesClaimsComponent.resetForm();
        }),
        getShortcutKeyObj('f4', 'Diamond', 'Create New', () => {
            professionalServicesClaimsComponent.openNoteShortCut()
        }),
        getShortcutKeyObj('f11', 'Diamond', 'Create New', () => {
        professionalServicesClaimsComponent.getChooseClaimPaymentMethodScreen()
        }),
        getShortcutKeyObj('f12', 'Diamond', 'Addon', () => {
          professionalServicesClaimsComponent.openClaimsCurrencyConversionAddon()
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Claim Lookup', (shortcutEventOutput: any) => {
            if(shortcutEventOutput.event.target.id === 'memberId'){
                professionalServicesClaimsComponent.openMemberSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'authNo'){
                professionalServicesClaimsComponent.openAuthNumberLookupFieldSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'plcOfSvc'){
                professionalServicesClaimsComponent.openPlaceOfSerLookupFieldSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'facilityId'){
                professionalServicesClaimsComponent.openFacilityIdLookupFieldSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'refProv'){
                professionalServicesClaimsComponent.openProMasterSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'provider'){
                professionalServicesClaimsComponent.openProviderMasterLookupFieldSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'vendor'){
                professionalServicesClaimsComponent.openVendorMasterLookupFieldSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'svcRsn'){
                professionalServicesClaimsComponent.openReasonCodeMasterLookupFieldSearchModel();
            } else if(shortcutEventOutput.event.target.id === 'dx1'){
                professionalServicesClaimsComponent.openDiagnosisLookupFieldSearchModel(shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'dx2'){
                professionalServicesClaimsComponent.openDiagnosisLookupFieldSearchModel(shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'dx3'){
                professionalServicesClaimsComponent.openDiagnosisLookupFieldSearchModel(shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'dx4'){
                professionalServicesClaimsComponent.openDiagnosisLookupFieldSearchModel(shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'claimNumber'){
                professionalServicesClaimsComponent.openClaimLookup();
            }
            professionalServicesClaimsComponent.getNextInput(shortcutEventOutput.event.target.id);
        }),
        getShortcutKeyObj('shift + tab', 'Diamond', 'Claim Lookup', (shortcutEventOutput: any) => {
            professionalServicesClaimsComponent.getPreviousInput(shortcutEventOutput.event.target.id);
        }),
        getShortcutKeyObj('tab', 'Diamond', 'Claim Lookup', (shortcutEventOutput: any) => {
            if(shortcutEventOutput.event.target.id === 'memberId'){
                professionalServicesClaimsComponent.getMemberTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'authNo'){
                professionalServicesClaimsComponent.getAuthNumberTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'plcOfSvc'){
                professionalServicesClaimsComponent.getPlaceOfServiceTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'facilityId'){
                professionalServicesClaimsComponent.getFacilityIdTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'refProv'){
                professionalServicesClaimsComponent.getProMasterTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'provider'){
                professionalServicesClaimsComponent.getProviderMasterTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'vendor'){
                professionalServicesClaimsComponent.getVendorMasterTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'svcRsn'){
                professionalServicesClaimsComponent.getReasonCodeMasterTab(shortcutEventOutput.event);
            } else if(shortcutEventOutput.event.target.id === 'dx1'){
                professionalServicesClaimsComponent.getDiagnosisLookupTab(shortcutEventOutput.event, shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'dx2'){
                professionalServicesClaimsComponent.getDiagnosisLookupTab(shortcutEventOutput.event, shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'dx3'){
                professionalServicesClaimsComponent.getDiagnosisLookupTab(shortcutEventOutput.event, shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'dx4'){
                professionalServicesClaimsComponent.getDiagnosisLookupTab(shortcutEventOutput.event, shortcutEventOutput.event.target.id);
            } else if(shortcutEventOutput.event.target.id === 'claimNumber'){
                professionalServicesClaimsComponent.getClaimTab();
            } else if(shortcutEventOutput.event.target.id === 'dateRecv'){
                professionalServicesClaimsComponent.getDateRecvTab(shortcutEventOutput.event, shortcutEventOutput.event.target.id);
            } else if (shortcutEventOutput.event.target.id === 'batchNumber') {
                professionalServicesClaimsComponent.getBatchNumber(shortcutEventOutput.event, shortcutEventOutput.event.target.id)
            }
            if (!(shortcutEventOutput.event.target.id === 'dx1'
                || shortcutEventOutput.event.target.id === 'dx2'
                || shortcutEventOutput.event.target.id === 'dx3'
                || shortcutEventOutput.event.target.id === 'dx4')) {
                professionalServicesClaimsComponent.getNextInput(shortcutEventOutput.event.target.id);
            }
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            professionalServicesClaimsComponent.helpScreen();
        }),
        getShortcutKeyObj('F3', 'Diamond', 'Help', () => {
            professionalServicesClaimsComponent.triggerMenus('f3');
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Help', () => {
            professionalServicesClaimsComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Help', () => {
            professionalServicesClaimsComponent.openTopicMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Help', () => {
            professionalServicesClaimsComponent.openHelpMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Help', () => {
            professionalServicesClaimsComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Help', () => {
            professionalServicesClaimsComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('d', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('d')
        }, []
        ),
        getShortcutKeyObj('h', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('h')
        }, []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('o')
        }, []
        ),
        getShortcutKeyObj('t', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('t')
        }, []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('s')
        }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('a')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('a')
        }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('a')
        }, []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('g')
        }, []
        ),
        getShortcutKeyObj('h', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('h')
        }, []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Open ', () => {
            professionalServicesClaimsComponent.triggerMenus('e')
        }, []
        ),
        getShortcutKeyObj('F4', 'Diamond', 'Notes', () => {
            professionalServicesClaimsComponent.openNoteShortCut();
        })
    ]
}

export function getProfSvcClaimDetailComponentShortcutKeys(professionalServicesClaimDetailComponent: ProfessionalServicesClaimsDetailComponent) {
    return [
        getShortcutKeyObj('f12', 'Diamond', 'Open Addons', () => {
            professionalServicesClaimDetailComponent.openClaimsCurrencyConversionAddon();
        }),
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            professionalServicesClaimDetailComponent.saveChanges();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Claim Detail', () => {  
            professionalServicesClaimDetailComponent.addNewClaimDetails(false);
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Procedure Code Lookup', (shortcutEventOutput: any) => {
            if(shortcutEventOutput.event.target.id === 'procedureCode'){
                professionalServicesClaimDetailComponent.openProcedureCodeLookup();
            } else if(shortcutEventOutput.event.target.id === 'alternateProcedureCode'){
                professionalServicesClaimDetailComponent.openProcedureCodeAltLookup();
            } else if(shortcutEventOutput.event.target.id === 'companyCode'){
                professionalServicesClaimDetailComponent.openCompanyCodeLookup();
            } else if(shortcutEventOutput.event.target.id === 'glReference'){
                professionalServicesClaimDetailComponent.openGeneralLedgerReferenceLookup();
            } else if(shortcutEventOutput.event.target.id === 'ocPaidRsn'){
                professionalServicesClaimDetailComponent.openOcPaidReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'allowedRsn'){
                professionalServicesClaimDetailComponent.openAllowedReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'notCoveredRsn'){
                professionalServicesClaimDetailComponent.openNotCovReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'copayRsn'){
                professionalServicesClaimDetailComponent.openCopayReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'coinsuranceRsn'){
                professionalServicesClaimDetailComponent.openCoInsReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'deductRsn'){
                professionalServicesClaimDetailComponent.openDeductReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'adjustRsn'){
                professionalServicesClaimDetailComponent.openAdjustReasonLookup();
            }
        }),
        getShortcutKeyObj('tab', 'Diamond', 'Claim Lookup', (shortcutEventOutput: any) => {
            if (shortcutEventOutput.event.target.id === 'claimNumber') {
                professionalServicesClaimDetailComponent.getClaimTab();
            } else if (shortcutEventOutput.event.target.name === 'detailServiceDate') {
                shortcutEventOutput.event.preventDefault();
                professionalServicesClaimDetailComponent.procCode.nativeElement.focus();
            } else if (shortcutEventOutput.event.target.name === 'detailThruDate') {
                shortcutEventOutput.event.preventDefault();
                professionalServicesClaimDetailComponent.dxPtrField.nativeElement.focus();
            }  else if (shortcutEventOutput.event.target.id === 'procedureCode') {
                professionalServicesClaimDetailComponent.getProcedureCodeMaster(shortcutEventOutput.event.target.value);
            } else if (shortcutEventOutput.event.target.id === 'billedAmount') {
                professionalServicesClaimDetailComponent.getNonNullGeneralLedgerAssign();
            }
        }, [], false),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete one row', () => {
            professionalServicesClaimDetailComponent.deleteScreenOption()
        })
    ]
}

export function getProvCVPVCShortcutKeys(coveringProviderGroupCodesComponent: CoveringProviderGroupCodesComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            coveringProviderGroupCodesComponent.saveCovProvGroupMaster();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
            coveringProviderGroupCodesComponent.resetForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            coveringProviderGroupCodesComponent.handleHelpMenu();
        })
    ]
}


export function getGroupUserFieldsShortcutKeys(groupUserFieldsComponent: GroupUserFieldsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            groupUserFieldsComponent.update();
        })
    ]
}

export function getAddressRippleShortcutKeys(addressRippleComponent: AddressRippleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            addressRippleComponent.saveMemberMaster();
        })
    ]
}

export function getProviderChangeShortcutKeys(providerChangeComponent: ProviderChangeComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            providerChangeComponent.saveMemberEligHistory();
        })
    ]
}

export function getEligibilityHistoryShortcutKeys(memberEligibilityHistoryComponent: MemberEligibilityHistoryComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            memberEligibilityHistoryComponent.saveForm();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            memberEligibilityHistoryComponent.createNewForm();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Save form data', () => {
            memberEligibilityHistoryComponent.clearForm();
        }),
        getShortcutKeyObj('F3', 'Diamond', 'Save form data', () => {
            memberEligibilityHistoryComponent.openShortcutKeys();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.helpScreen();
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.popUpNotesMenuClicked();
        }),
        getShortcutKeyObj('alt + F4', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.modalClose()
        }),
        getShortcutKeyObj('ctrl + F4', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.modalClose()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.openFileMenu()
        }),
         getShortcutKeyObj('alt + s', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.openTopicMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.openHelpMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Help', () => {
            memberEligibilityHistoryComponent.openWindowMenu()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Open Master File', () => {
            memberEligibilityHistoryComponent.triggerMenus('m')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('a')
        }, []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('d')
        }, []
        ),
        getShortcutKeyObj('i', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('i')
        }, []
        ),
        getShortcutKeyObj('b', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('b')
        }, []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('l')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('s')
        }, []
        ),
        getShortcutKeyObj('t', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('t')
        }, []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('g')
        }, []
        ),
        getShortcutKeyObj('h', 'Diamond', 'Open ', () => {
            memberEligibilityHistoryComponent.triggerMenus('h')
        }, []
        )
    ]
}

export function getMemberMasterShortcutKeys(memberMasterComponent: MemberMasterComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            memberMasterComponent.saveChanges();
        }),
        getShortcutKeyObj('F5', 'Diamond', 'Member Lookup', () => {
            if (memberMasterComponent.showMemberMasterField === false) {
                memberMasterComponent.openLookupFieldSearchModel();
                memberMasterComponent.valueChanged = false;
            }
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Notes', () => {
            memberMasterComponent.handleNotesMenu('Notes');
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'New Member', () => {
            memberMasterComponent.newFormShortcut();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'New Member', () => {
            memberMasterComponent.newNOpenConfirmation();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Dependent Screen', () => {
            memberMasterComponent.showFamily()
        }),
        getShortcutKeyObj('f11', 'Diamond', 'Open Addons', () => {
            memberMasterComponent.openAddons();
        },[], true),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            memberMasterComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + shift + m', 'Diamond', 'add new dependant', () => {
            memberMasterComponent.addDependantShortcut()
        }),
        getShortcutKeyObj('F3', 'Diamond', 'Save form data', () => {
            memberMasterComponent.openShortcutKeys();
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Help', () => {
            memberMasterComponent.handleNotesMenu('Notes')
        }),
        getShortcutKeyObj('alt + F4', 'Diamond', 'Help', () => {
            memberMasterComponent.closeModal()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Help', () => {
            memberMasterComponent.openFileMenu()
        }),
         getShortcutKeyObj('alt + s', 'Diamond', 'Help', () => {
            memberMasterComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Help', () => {
            memberMasterComponent.openTopicMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Help', () => {
            memberMasterComponent.openHelpMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Help', () => {
            memberMasterComponent.openWindowMenu()
        }),
        getShortcutKeyObj('e', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('e')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('a')
        }, []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('d')
        }, []
        ),
        getShortcutKeyObj('i', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('i')
        }, []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('l')
        }, []
        ),
        getShortcutKeyObj('b', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('b')
        }, []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('s')
        }, []
        ),
        getShortcutKeyObj('t', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('t')
        }, []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('g')
        }, []
        ),
        getShortcutKeyObj('h', 'Diamond', 'Open ', () => {
            memberMasterComponent.triggerMenus('h')
        }, []
        ),

    ]
}

export function geAuthorizationDaysVisitShortcutKeys(authorizationDaysVisitsUpdateComponent: AuthorizationDaysVisitsUpdateComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authorizationDaysVisitsUpdateComponent.saveAuthDaysVisExtension();
        }),
        getShortcutKeyObj('ctrl + n', 'Diamond', 'create new data', () => {
            authorizationDaysVisitsUpdateComponent.createNewAuthDaysVisExtensionShortCutAction();
        })
    ]
}


export function getAuthorizationMaster(
    authorizationMasterComponent: AuthorizationMasterComponent
) {
    return [
        getShortcutKeyObj("ctrl + s", "Diamond", "Save form data", () => {
            authorizationMasterComponent.saveAuthMaster();
        }),
        getShortcutKeyObj("ctrl + m", "Diamond", "create new data", () => {
            authorizationMasterComponent.resetForm();
        }),
    ];
}



export function geAuthorizationTypeShortcutKeys(authorizationTypeComponent: AuthorizationTypeComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authorizationTypeComponent.saveShortCutAction();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'create new data', () => {
            authorizationTypeComponent.newTableCreate();
        })
    ]
}

export function getDiagnosisCodeShortcutKeys(diagnosisCodeComponent: DiagnosisCodeComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            diagnosisCodeComponent.saveShortCutAction();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open form', () => {
            diagnosisCodeComponent.openShortCutAction();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'create new data', () => {
            diagnosisCodeComponent.createNewShortCutAction();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            diagnosisCodeComponent.helpScreen();
        })
    ]
}

export function getCheckRegisterShortcutKeys(checkRegisterComponent: CheckRegisterComponent) {
    return [
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open form', () => {
            checkRegisterComponent.openShortCutAction();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            checkRegisterComponent.helpScreen();
        })
    ]
}

export function getProviderAdminFeeRuleShortcutKeys(providerAdminitrativeFeeRuleComponent: ProviderAdminitrativeFeeRuleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Determinant Rules form data', () => {
            providerAdminitrativeFeeRuleComponent.saveDeterminantRules();
        }),
        getShortcutKeyObj('ctrl + shift + s', 'Diamond', 'Save Determinant Tables form data', () => {
            providerAdminitrativeFeeRuleComponent.saveDeterminantTables();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Open Lookup', () => {
            providerAdminitrativeFeeRuleComponent.openLookupFieldSearchModel();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            providerAdminitrativeFeeRuleComponent.helpScreen();
        })
    ]
}


export function getCobOrderLiabilityShortcutKeys(cobOrderLiabilityComponent: CobOrderLiabilityComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            cobOrderLiabilityComponent.saveDeterminantRules();
            cobOrderLiabilityComponent.saveDeterminantTables();
        }),
        getShortcutKeyObj('ctrl + n', 'Diamond', 'Create new', () => {
            cobOrderLiabilityComponent.createNewForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            cobOrderLiabilityComponent.helpScreen();
        })
    ]
}

export function getMemberAddressShortcutKeys(memberAddressComponent: MemberAddressComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            memberAddressComponent.saveMemberAddress();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            memberAddressComponent.helpScreen();
        })
    ]
}

export function getInstitutionalClaimShortcutKeys(institutionalClaims: InstitutionalClaimsComponent) {
    return [
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create new Data', () => {
            institutionalClaims.createNewClaims()
        }),
        getShortcutKeyObj('f11', 'Diamond', 'Addon Screen', () => {
            institutionalClaims.getChooseClaimPaymentMethodScreen()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            institutionalClaims.helpScreen();
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Notes', () => {
            institutionalClaims.openNoteShortCut();
        }),
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Data', () => {
            institutionalClaims.saveInstClaimHeader()
        })
    ]
}


export function getdisplayBenefitAccumSelectShortcutKeys(displayBenefitAccumulatorsComponent: DisplayBenefitAccumulatorsSelectMemberComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            //  memberAddressComponent.saveMemberAddress();
        })
    ]
}

export function getBenefitAccumShortcutKeys(benefitAccumulatorBaseValuesComponent: BenefitAccumulatorBaseValuesComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            benefitAccumulatorBaseValuesComponent.saveBenefitAccBV('')
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Select Member', () => {
            benefitAccumulatorBaseValuesComponent.selectMember()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            benefitAccumulatorBaseValuesComponent.helpScreen();
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Notes', () => {
            benefitAccumulatorBaseValuesComponent.handleNotesMenu('Notes');
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Special Menu', () => {
          benefitAccumulatorBaseValuesComponent.modalClose()
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Special Menu', () => {
          benefitAccumulatorBaseValuesComponent.exitScreen()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Special Menu', () => {
          benefitAccumulatorBaseValuesComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Special Menu', () => {
          benefitAccumulatorBaseValuesComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Windows Menu', () => {
          benefitAccumulatorBaseValuesComponent.openWindowsMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Window Menu', () => {
          benefitAccumulatorBaseValuesComponent.openWindowsMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Help Menu', () => {
          benefitAccumulatorBaseValuesComponent.openHelpMenu()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New Record', () => {
          benefitAccumulatorBaseValuesComponent.triggerMenus('m')}, []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New Record', () => {
          benefitAccumulatorBaseValuesComponent.triggerMenus('o')}, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Claims Reports..', () => {
          benefitAccumulatorBaseValuesComponent.triggerMenus('c')}, []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
          benefitAccumulatorBaseValuesComponent.triggerMenus('e')}, []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Show Timestamp', () => {
          benefitAccumulatorBaseValuesComponent.triggerMenus('s')}, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          benefitAccumulatorBaseValuesComponent.triggerMenus('a')}, []
        ),
      getShortcutKeyObj('t', 'Diamond', 'THis Window', () => {
        benefitAccumulatorBaseValuesComponent.triggerMenus('t')}, []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        benefitAccumulatorBaseValuesComponent.triggerMenus('g')}, []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
        benefitAccumulatorBaseValuesComponent.triggerMenus('d')}, []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        benefitAccumulatorBaseValuesComponent.triggerMenus('h')}, []
      ),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Select Member', () => {
            benefitAccumulatorBaseValuesComponent.selectMember();
        })
    ]
}

export function getdisplayBenefitAccumShortcutKeys(DisplayBenefitAccumulatorsComponent: DisplayBenefitAccumulatorsComponent) {
    return [
        getShortcutKeyObj('alt + m', 'Diamond', 'Select Member', () => {
            DisplayBenefitAccumulatorsComponent.selectMember();
        }),
        getShortcutKeyObj('alt + c', 'Diamond', 'Select Clm', () => {
            DisplayBenefitAccumulatorsComponent.selectClm();
        }),
        getShortcutKeyObj('alt + p', 'Diamond', 'Paitent Liabilities', () => {
            DisplayBenefitAccumulatorsComponent.paitentLiabilities();
        }),
        getShortcutKeyObj('alt + b', 'Diamond', 'Benefit Value Filters', () => {
            DisplayBenefitAccumulatorsComponent.selectBenefitValueFilters();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            DisplayBenefitAccumulatorsComponent.helpScreen();
        })
    ];
}


export function getSelectMemberShortcutKeys(getSelectMemberShortcutKeys: SelectMemberComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            //  memberAddressComponent.saveMemberAddress();
        })
    ]
}


export function getMedDefLookupShortcutKeys(MedDefLookup: MedicalDefinitionsLookupComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            MedDefLookup.saveMedicalDefinition();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            MedDefLookup.createMedDefLookup();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete form data', () => {
            MedDefLookup.deleteMedDefLookup();
        }),
        getShortcutKeyObj('f1', 'Diamond', 'Help', () => {
            MedDefLookup.helpScreen();
        })
    ]
}

export function getProcedurePriceShortcutKeys(procedurePriceComponent: ProcedurePriceComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            procedurePriceComponent.saveProcedurePrice();
        }),
        getShortcutKeyObj('ctrl + n', 'Diamond', 'Add New Grouper Pricer', () => {
            procedurePriceComponent.createProcedurePrice();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            procedurePriceComponent.helpScreen();
        })
    ]
}

export function getGroupBillingShortcutKeys(groupBillingComponent: GroupBillingComponent) {
    return [
        getShortcutKeyObj("ctrl + s", "Diamond", "Save Group Billing form data", () => {
                groupBillingComponent.saveGroupMaster();
        }),
        getShortcutKeyObj("F1", "Diamond", "Help", () => {
            groupBillingComponent.helpScreen();
        }),
        getShortcutKeyObj("alt + t", "Diamond", "Topic Menu", () => {
            groupBillingComponent.openTopicMenu()
        }),
        getShortcutKeyObj("alt + f", "Diamond", "File Menu", () => {
            groupBillingComponent.openFileMenu()
        }),
        getShortcutKeyObj("alt + h", "Diamond", "Help Menu", () => {
            groupBillingComponent.openHelpMenu()
        }),
        getShortcutKeyObj("ctrl + f4", "Diamond", "Modal Close", () => {
            groupBillingComponent.modalClose()
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
            groupBillingComponent.exitScreen();
        }),
        getShortcutKeyObj("alt + s", "Diamond", "Special Menu", () => {
            groupBillingComponent.openSpecialMenu()
        }),
        getShortcutKeyObj("alt + w", "Diamond", "Windows Menu", () => {
            groupBillingComponent.openWindowsMenu()
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Screen', () => {
            groupBillingComponent.resetAll()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Show Timestamp', () => {
            groupBillingComponent.openWindowsMenu()
        }),
        getShortcutKeyObj('d', 'Diamond', 'Open detail ', () => {
                groupBillingComponent.triggerMenus('d')
           },  []
        ),
        getShortcutKeyObj('m', 'Diamond', 'Open master file', () => {
                groupBillingComponent.triggerMenus('m')
           },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
                groupBillingComponent.triggerMenus('c')
           },  []
        ),
        getShortcutKeyObj('p', 'Diamond', 'Open Panel', () => {
                groupBillingComponent.triggerMenus('p')
           },  []
        ),
        getShortcutKeyObj('b', 'Diamond', 'Open Biiling Control', () => {
                groupBillingComponent.triggerMenus('b')
           },  []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open master file', () => {
                groupBillingComponent.triggerMenus('l')
           },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Show Timestamp', () => {
                groupBillingComponent.triggerMenus('s')
           },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display',
            () => {
                groupBillingComponent.triggerMenus('a')
           },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'Open master file', () => {
                groupBillingComponent.triggerMenus('t')
           },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Open master file', () => {
                groupBillingComponent.triggerMenus('g')
           },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'Open master file', () => {
                groupBillingComponent.triggerMenus('h')
           },  []
        ),
    ];
}

/**
 * @param benefitPackageComponent
 */
export function getBenefitPackgaeShortcutKeys(benefitPackageComponent: BenefitPackageComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            benefitPackageComponent.saveFormData();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            benefitPackageComponent.newFormCretion();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete record', () => {
            benefitPackageComponent.deleteBenefitPackage();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            benefitPackageComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
          benefitPackageComponent.modalClose();
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
          benefitPackageComponent.exitScreen();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          benefitPackageComponent.helpScreen();
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
          benefitPackageComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
          benefitPackageComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
          benefitPackageComponent.openWindowMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
          benefitPackageComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          benefitPackageComponent.openHelpMenu()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          benefitPackageComponent.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          benefitPackageComponent.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          benefitPackageComponent.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
          benefitPackageComponent.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          benefitPackageComponent.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
              benefitPackageComponent.triggerMenus('e')
            },  []
        ),
        getShortcutKeyObj('u', 'Diamond', 'Open Panel', () => {
          benefitPackageComponent.triggerMenus('u')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          benefitPackageComponent.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          benefitPackageComponent.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          benefitPackageComponent.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          benefitPackageComponent.triggerMenus('h')
            },  []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open Topic Menu', () => {
          benefitPackageComponent.triggerMenus('l')
            },[]
        ),
    ]
}


export function getMemCOBVerifInfoShortcutKeys(component: MemberCobVerificationInformationComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.submitForm();
        })
    ]
}

export function getBenefitRuleShortcutKeys(component: BenefitRuleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.saveBenefitRule();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            component.resetForm();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Open Lookup', () => {
            component.openLookupPage();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            component.helpScreen();
        }),
        getShortcutKeyObj('f3', 'Functional Groups', 'Open functional group shortcuts', () => {
            component.openFunctionalGroupShortcut();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete New Record', () => {
            component.deletePopupAlert();
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
          component.openFileMenu();
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
            component.openSpecialMenu();
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Windows Menu', () => {
          component.openWindowsMenu();
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Windows Menu', () => {
          component.openWindowsMenu();
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          component.openHelpMenu();
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Change tab', () => {
          component.exitScreen();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
          component.modalClose()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Med Def ', () => {
          component.triggerMenus('m')
            }, []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
          component.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
              component.triggerMenus('e')
            }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Count Toward Max', () => {
              component.triggerMenus('c')
            }, []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Other Med Defs', () => {
              component.triggerMenus('o')
            }, []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Show Timestamp', () => {
              component.triggerMenus('s')
            }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
            component.triggerMenus('a')
          }, []
      ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          component.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          component.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          component.triggerMenus('h')
            },  []
        ),
    ]
}

export function getMedicalDefinitionShortcutKeys(component: MedicalDefinitionsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.saveMedicalDefinition();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Save form data', () => {
            component.deleteMedicalDefinitionPopup();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            component.createNewDeterminant();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            component.handleHelpMenu();
        })
    ]
}

export function getAliasRespPartPrivacyShortcutKeys(component: AliasResponsiblePartyPrivacyComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.UpdateARPPForm();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Save form data', () => {
            component.resetAll();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Open Lookup', () => {
            component.openLookupPage();
        }),
        getShortcutKeyObj('f3', 'Diamond', 'Shortcut Menu', () => {
            component.openShortcutKeys();
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Help', () => {
            component.modalClose()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            component.helpScreen();
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Help', () => {
            component.openFileMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Help', () => {
            component.openTopicMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Help', () => {
            component.openHelpMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Help', () => {
            component.openWindowMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Help', () => {
            component.openSpecialMenu()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Open Master File', () => {
            component.triggerMenus('m')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            component.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Open ', () => {
            component.triggerMenus('a')
        }, []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Open ', () => {
            component.triggerMenus('d')
        }, []
        ),
        getShortcutKeyObj('i', 'Diamond', 'Open ', () => {
            component.triggerMenus('i')
        }, []
        ),
        getShortcutKeyObj('b', 'Diamond', 'Open ', () => {
            component.triggerMenus('b')
        }, []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open ', () => {
            component.triggerMenus('l')
        }, []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open ', () => {
            component.triggerMenus('o')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            component.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Open ', () => {
            component.triggerMenus('s')
        }, []
        ),
        getShortcutKeyObj('t', 'Diamond', 'Open ', () => {
            component.triggerMenus('t')
        }, []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Open ', () => {
            component.triggerMenus('g')
        }, []
        ),
        getShortcutKeyObj('h', 'Diamond', 'Open ', () => {
            component.triggerMenus('h')
        }, []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Open ', () => {
            component.triggerMenus('e')
        }, []
        )
    ]
}

export function getProcedureCodeShortcutKeys(
    component: ProcedureCodeComponent
) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.saveProcedureCodeMaster();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Procedure Code', () => {
            component.resetAll();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            component.helpScreen();
        })
    ];
}

export function getIDCardPrintShorcutKeys(idCardPrintComponent: IdCardPrintComponent) {
    return [
          getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Group Master form data', () => {
            idCardPrintComponent.saveForm();
          }),
          getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Group Master', () => {
            idCardPrintComponent.openScreen();
          }),
          getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Group Master', () => {
            idCardPrintComponent.resetIDPrint();
          }),
          getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
              idCardPrintComponent.closeModal();
          }),
          getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
              idCardPrintComponent.exitScreen();
          }),
          getShortcutKeyObj('F4', 'Diamond', 'Open Note', () => {
            idCardPrintComponent.openNoteShortCut();
          }),
          getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
            idCardPrintComponent.openTopicMenu();
          }),
          getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
            idCardPrintComponent.openSpecialMenu()
          }),
          getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
            idCardPrintComponent.openWindowMenu()
          }),
          getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
            idCardPrintComponent.openWindowMenu()
          }),
          getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
            idCardPrintComponent.openFileMenu()
          }),
          getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
            idCardPrintComponent.openHelpMenu()
          }),
          getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            idCardPrintComponent.helpScreen();
          }),
          getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
            idCardPrintComponent.triggerMenus('m')
              },  []
          ),
          getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
            idCardPrintComponent.triggerMenus('o')
              },  []
          ),
          getShortcutKeyObj('u', 'Diamond', 'Group User Field', () => {
            idCardPrintComponent.triggerMenus('u')
              },  []
          ),
          getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
            idCardPrintComponent.triggerMenus('s')
              },  []
          ),
          getShortcutKeyObj('d', 'Diamond', 'Open New', () => {
            idCardPrintComponent.triggerMenus('d')
              },  []
          ),
          getShortcutKeyObj('c', 'Diamond', 'Help Contents', () => {
            idCardPrintComponent.triggerMenus('c')
              },  []
          ),
          getShortcutKeyObj('p', 'Diamond', 'Open Panel', () => {
            idCardPrintComponent.triggerMenus('p')
              },  []
          ),
          getShortcutKeyObj('l', 'Diamond', 'Filter Cards by Line of Business', () => {
            idCardPrintComponent.triggerMenus('l')
              },  []
          ),
          getShortcutKeyObj('i', 'Diamond', 'Filter Cards by IPA', () => {
            idCardPrintComponent.triggerMenus('i')
              },  []
          ),
          getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
            idCardPrintComponent.triggerMenus('a')
              },  []
          ),
          getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
            idCardPrintComponent.triggerMenus('t')
              },  []
          ),
          getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
            idCardPrintComponent.triggerMenus('g')
              },  []
          ),
          getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
            idCardPrintComponent.triggerMenus('h')
              },  []
          ),
          getShortcutKeyObj('n', 'Diamond', 'Filter Cards by Panel', () => {
                idCardPrintComponent.triggerMenus('n')
              },  []
          ),
    ];
}


export function getServiceOfPlaceShortcutKeys(placeOfServiceComponent: PlaceOfServiceComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            placeOfServiceComponent.saveOfServiceOfPlace();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            placeOfServiceComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete form data', () => {
            placeOfServiceComponent.deleteServiceOfPlace();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Delete form data', () => {
            placeOfServiceComponent.createServiceOfPlace();
        }),
    ]
}


export function getServiceOfPlaceForNewShortcutKeys(placeOfServiceComponent: PlaceOfServiceComponent) {
    return [
        getShortcutKeyObj('ctrl + i', 'Diamond', 'Save form data', () => {
            placeOfServiceComponent.createServiceOfPlace();
        })
    ]
}


export function getVendorMasterShortcutKeys(vendorMasterComponent: VendorMasterComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            vendorMasterComponent.saveVendorMaster();
        }),
        /*getShortcutKeyObj('f5', 'Diamond', 'Member Lookup', () => {
            vendorMasterComponent.openLookupFieldSearchModel();
        })*/
    ]
}

export function getVendoCreditShortcutKeys(
    vendorMasterComponent: VendorCreditComponent
) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            vendorMasterComponent.saveVendorCredit();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            vendorMasterComponent.createVendorCredit();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Member Lookup', () => {
            // vendorMasterComponent.openLookupFieldSearchModel();
        }),
    ];
}

export function getDrgGrouperpricerMaintenanceShortcutKeys(drgGrouperpricerMaintenanceComponent: DrgGrouperpricerMaintenanceComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Grouper Pricer form data', () => {
            drgGrouperpricerMaintenanceComponent.saveDrgGrouperPricer();
        }),
        getShortcutKeyObj('ctrl + n', 'Diamond', 'Add New Grouper Pricer', () => {
            drgGrouperpricerMaintenanceComponent.addNewDrgGrouperPricer();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            drgGrouperpricerMaintenanceComponent.helpScreen();
        })
    ]
}


export function getMemberBillingShortcutKeys(component: MemberBillingComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.submitForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            component.handleHelpMenu();
        })
    ]
}

export function getCobHistoryShortcutKeys(memberCOBHistoryComponent: MemberCobHistoryComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            memberCOBHistoryComponent.saveCOBHistory();

        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            memberCOBHistoryComponent.helpScreen();
        }),
        getShortcutKeyObj('F4', 'Diamond', 'Notes', () => {
            memberCOBHistoryComponent.handleNotesMenu('Notes');
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'New form', () => {
            memberCOBHistoryComponent.addNewRecord();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'New form', () => {
            memberCOBHistoryComponent.resetAll();

        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Help', () => {
            memberCOBHistoryComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Help', () => {
            memberCOBHistoryComponent.openTopicMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Help', () => {
            memberCOBHistoryComponent.openHelpMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Help', () => {
            memberCOBHistoryComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Help', () => {
            memberCOBHistoryComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + F4', 'Diamond', 'Help', () => {
            memberCOBHistoryComponent.modalClose()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Open Master File', () => {
            memberCOBHistoryComponent.triggerMenus('m')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('a')
        }, []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('d')
        }, []
        ),
        getShortcutKeyObj('i', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('i')
        }, []
        ),
        getShortcutKeyObj('b', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('b')
        }, []
        ),
        getShortcutKeyObj('l', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('l')
        }, []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('o')
        }, []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('c')
        }, []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('s')
        }, []
        ),
        getShortcutKeyObj('t', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('t')
        }, []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('g')
        }, []
        ),
        getShortcutKeyObj('h', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('h')
        }, []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Open ', () => {
            memberCOBHistoryComponent.triggerMenus('e')
        }, []
        )
    ]
}


export function getFieldLevelSecurityShortcutKeys(fieldLevelSecuritySetupComponent: FieldLevelSecuritySetupComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            fieldLevelSecuritySetupComponent.saveAll();
        }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Field Level Security Lookup', () => {
        fieldLevelSecuritySetupComponent.openNewScreen();
      }),
      getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Users', () => {
        fieldLevelSecuritySetupComponent.newScreen();
      }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
        fieldLevelSecuritySetupComponent.modalClose();
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        fieldLevelSecuritySetupComponent.exitScreen();
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        fieldLevelSecuritySetupComponent.helpScreen();
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        fieldLevelSecuritySetupComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        fieldLevelSecuritySetupComponent.openTopicMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
        fieldLevelSecuritySetupComponent.openSpecialMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        fieldLevelSecuritySetupComponent.openWindowMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        fieldLevelSecuritySetupComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        fieldLevelSecuritySetupComponent.openHelpMenu()
      }),
        getShortcutKeyObj('ctrl + f', 'Diamond', 'Copy Field Level Security ID', () => {
          fieldLevelSecuritySetupComponent.copyFieldLevelSecurityId()
        }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('f', 'Diamond', 'Copy Field Level Security ID', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('f')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'Delete Super User', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('h')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Reset Database Password', () => {
        fieldLevelSecuritySetupComponent.triggerMenus('e')
          },  []
      ),
    ]
}

export function getBenefitProcessingOrderShortcutKeys(benefitProcessingOrderComponent: BenefitProcessingOrderComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Benefit Processing Order form data', () => {
            benefitProcessingOrderComponent.saveBenefProcessOrderMaster();
        }),
        getShortcutKeyObj('ctrl + i', 'Diamond', 'Add New Benefit Processing Order', () => {
            benefitProcessingOrderComponent.addNewData();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            benefitProcessingOrderComponent.helpScreen();
        })
    ]
}

export function getBenefitWeightAccumulatorShortcutKeys(benefitWeightAccumulatorComponent: BenefitWeightAccumulatorComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Benefit Weight Accumulator form data', () => {
            benefitWeightAccumulatorComponent.saveBenefitWeightAccum();
        }),
        getShortcutKeyObj('ctrl + i', 'Diamond', 'Add New Benefit Weight Accumulator', () => {
            benefitWeightAccumulatorComponent.resetFormAndGrid();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            benefitWeightAccumulatorComponent.helpScreen()
        })
    ]
}

export function getVendorAdvPayRulesShortcutKeys(vendorAdvancePaymentRulesComponent: VendorAdvancePaymentRulesComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            vendorAdvancePaymentRulesComponent.saveRule();
        })
        // getShortcutKeyObj('f5', 'Diamond', 'Member Lookup', () => {
        //     vendorAdvancePaymentRulesComponent.showMemberMasterField = true;
        // })
    ]
}

export function getConversionFactorShortcutKeys(conversionFactorComponent: ConversionFactorComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            conversionFactorComponent.saveConversionFactorHdr();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            conversionFactorComponent.helpScreen();
        })
    ]
}

export function getProviderCredentialsShortcutKeys(providerCredentialsComponent: ProviderCredentialsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            providerCredentialsComponent.saveChanges();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Provider Credential', () => {
            providerCredentialsComponent.createProvCredential();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Provider Master Lookup', () => {
            providerCredentialsComponent.openLookupPage();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            providerCredentialsComponent.handleHelpMenu();
        })
    ]
}

export function getProviderCredentialsInsuranceShortcutKeys(insuranceComponent: InsuranceComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            insuranceComponent.saveProvCredential();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Provider Credential', () => {
            insuranceComponent.createProvCredential();
        }),
    ]
}

export function getProviderMasterShortcutKeys(providerMasterComponent: ProviderMasterComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Provider Master form data', () => {
            providerMasterComponent.saveProvMaster();
        }),
        getShortcutKeyObj('ctrl + i', 'Diamond', 'Add New Provider Master', () => {
            providerMasterComponent.addNewData();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            providerMasterComponent.handleHelpMenu()
        })
    ]
}

export function getProviderTypeShortcutKeys(providerTypeComponent: ProviderTypeComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Provider Type form data', () => {
            providerTypeComponent.saveProvTypeMaster();
        }),
        getShortcutKeyObj('ctrl + i', 'Diamond', 'Add New Provider Type', () => {
            providerTypeComponent.createForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            providerTypeComponent.handleHelpMenu();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete One Row', () => {
            providerTypeComponent.deleteOneRow();
        })
    ]
}


export function getProviderIncentiveRuleShortcutKeys(providerIncentiveProgramRuleComponent: ProviderIncentiveProgramRuleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            providerIncentiveProgramRuleComponent.saveIncentiveRule();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            providerIncentiveProgramRuleComponent.handleHelpMenu();
        })
    ]
}

export function getParameterShortcutKeys(parameterComponent: ParameterComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            parameterComponent.saveSystemParameter();
        })
    ]
}

export function getProviderAddressShortcutKeys(providerAddressComponent: ProviderAddressComponent) {
    return [
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Option', () => {
            providerAddressComponent.createNewOption();
        }),
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            providerAddressComponent.saveProvAddress();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            providerAddressComponent.handleHelpMenu();
        })
    ]
}

export function getCoveringProviderGroups(coveringProviderGroups: CoveringProviderGroupsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            coveringProviderGroups.saveFormData();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            coveringProviderGroups.newFormCretion();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            coveringProviderGroups.handleHelpMenu();
        })
    ]
}

export function getAuthorizationClaimLinkRuleComponentShortcutKeys(authorizationClaimLinkRuleComponent: AuthorizationClaimLinkRuleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authorizationClaimLinkRuleComponent.saveAuthClaimLinkRule();
        }),
        getShortcutKeyObj("ctrl + m", "Diamond", "Create New Record", () => {
            authorizationClaimLinkRuleComponent.newFormCretion();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            authorizationClaimLinkRuleComponent.helpScreen();
        })
    ]
}

export function getAuthorizationProceduresComponentShortcutKeys(authorizationProceduresComponent: AuthorizationProceduresComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authorizationProceduresComponent.saveAuthProcedure();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            authorizationProceduresComponent.createNew();
        })
    ]
}

export function getAuthorizationProcedureRangesComponentShortcutKeys(authorizationProcedureRangesComponent: AuthProcedureRangesComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            //authorizationProcedureRangesComponent.saveAuthProcedure();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            authorizationProcedureRangesComponent.shortcutEventCtrlM();
        })
    ]
}

export function getCarrierComponentShortcutKeys(carrierComponent: CarrierComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            carrierComponent.saveCarrier();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            carrierComponent.createNewForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            carrierComponent.helpScreen();
        })
    ]
}

export function getModifierComponentShortcutKeys(modifierComponent: ModifierComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            modifierComponent.saveModifierCodeMaster();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            modifierComponent.createNewForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            modifierComponent.helpScreen();
        })
    ]
}

export function getCustomerMaintenanceShortcutKeys(
    component: CustomerMaintenanceComponent
) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.savePmbArCustomerMaster();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Procedure Code', () => {
            component.resetFormAndGrid();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Clear existing customer ID', () => {
            component.openScreen()
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
          component.modalClose()
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
          component.exitScreen()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
          component.openFileMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
          component.openWindowMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          component.openHelpMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
          component.openWindowMenu()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          component.helpScreen();
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          component.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          component.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          component.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
              component.triggerMenus('e')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          component.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
          component.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          component.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          component.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          component.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          component.triggerMenus('h')
            },  []
        ),
    ];
}

export function getUsersShortcutKeys(
    component: UsersComponent
) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            component.saveSecUser();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Users', () => {
            component.createNewFunction();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open New Users', () => {
            component.createNewFunction();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
        component.modalClose();
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen();
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        component.helpScreen();
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        component.openFileMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        component.openTopicMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
        component.openSpecialMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        component.openHelpMenu()
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('r', 'Diamond', 'Update Role Password', () => {
            component.triggerMenus('r')
          },  []
      ),
      getShortcutKeyObj('p', 'Diamond', 'Provider Affiliation', () => {
        component.triggerMenus('p')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'Delete Super User', () => {
        component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('u', 'Diamond', 'Users', () => {
        component.triggerMenus('u')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('n', 'Diamond', 'Function Access', () => {
        component.triggerMenus('n')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'LOB Affiliation', () => {
            component.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        component.triggerMenus('h')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
            component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Reset Database Password', () => {
            component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('v', 'Diamond', 'Vendor Affiliation', () => {
            component.triggerMenus('v')
          },  []
      ),
      getShortcutKeyObj('w', 'Diamond', 'Update User Password', () => {
            component.triggerMenus('w')
          },  []
      ),
    ];
}

export function vendorTINScreenShortcutKeys(vendorTINComponent: VendorTINComponent) {
    return [
        getShortcutKeyObj(
            'ctrl + s',
            'Diamond',
            'Save Vendor TIN Data',
            () => {
                // only do if user is permitted to add  new
                vendorTINComponent.saveVendorTin();
            }
        ),
        getShortcutKeyObj(
            'ctrl + o',
            'Diamond',
            'Open Vendor TIN',
            () => {
                // only do if user is permitted to add  new
                vendorTINComponent.getVendorTINByIRSTaxId(vendorTINComponent.irsTaxId);
            }
        ),
        getShortcutKeyObj(
            'ctrl + m',
            'Diamond',
            'Create New Vendor TIN',
            () => {
                // only do if user is permitted to add  new
                vendorTINComponent.createForm();
                vendorTINComponent.addVendonTIN = true;
            }
        )

    ];


}

export function getClaimDetailAuthProcRulesShortcutKeys(claimDetailAuthProcRuleComponent: ClaimDetailAuthProcRuleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Claim Detail Auth Proc Rule', () => {
            claimDetailAuthProcRuleComponent.saveClmDtlAuthProcLnkRule();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Add New Claim Detail Auth Proc Rule', () => {
            claimDetailAuthProcRuleComponent.createNewClmDtlAuthProcRule();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimDetailAuthProcRuleComponent.helpScreen();
        })
    ]
}


export function getClaimDetailAuthProcLinkShortcutKeys(
    ClaimAuthProcLinkComponent: ClaimAuthProcLinkComponent
) {
    return [
        getShortcutKeyObj(
            'ctrl + s',
            'Diamond',
            'Save Claim Auth Proc Link',
            () => {
                ClaimAuthProcLinkComponent.saveClmDtlAuthProcLnkHdr();
            }
        ),
        getShortcutKeyObj(
            'ctrl + m',
            'Diamond',
            'Add New Claim Auth Proc Link',
            () => {
                ClaimAuthProcLinkComponent.createNewRecord();
            }
        ),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            ClaimAuthProcLinkComponent.helpScreen();
        })
    ];
}

export function getArCashReceiptsShortcutKeys(arCashReceiptsComponent: ArCashReceiptsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save A/R Cash form data', () => {
            arCashReceiptsComponent.saveData();
        }),
        getShortcutKeyObj('ctrl + i', 'Diamond', 'Add New A/R Cash Data', () => {
            arCashReceiptsComponent.addNewData();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Add Open New', () => {
            arCashReceiptsComponent.openNew();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Open New Screen', () => {
            arCashReceiptsComponent.openNewScreen();
        })
    ]
}

export function getClaimDisplayComponentShortcutKeys(claimDisplayComponent: ClaimDisplayComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            claimDisplayComponent.saveProfsvcClaimHeader();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Claim Display', () => {
            claimDisplayComponent.createProfsvcClaimHeader();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Lookup', () => {
            claimDisplayComponent.helpScreen();
        })
    ]
}

export function getInstClaimDetailComponentShortcutKeys(institutionalClaimDetailComponent: InstitutionalClaimDetailComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            institutionalClaimDetailComponent.saveChanges();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Claim Detail', () => {
            institutionalClaimDetailComponent.resetAll(false, {claimNumber: institutionalClaimDetailComponent.claimNumber});
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Procedure Code Lookup', (shortcutEventOutput: any) => {
            if(shortcutEventOutput.event.target.id === 'procedureCode'){
                institutionalClaimDetailComponent.openProcedureCodeLookup();
            } else if(shortcutEventOutput.event.target.id === 'alternateProcedureCode'){
                institutionalClaimDetailComponent.openProcedureCodeAltLookup();
            } else if(shortcutEventOutput.event.target.id === 'companyCode'){
                institutionalClaimDetailComponent.openCompanyCodeLookup();
            } else if(shortcutEventOutput.event.target.id === 'glReference'){
                institutionalClaimDetailComponent.openGeneralLedgerReferenceLookup();
            } else if(shortcutEventOutput.event.target.id === 'ocPaidRsn'){
                institutionalClaimDetailComponent.openOcPaidReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'allowedRsn'){
                institutionalClaimDetailComponent.openAllowedReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'notCoveredRsn'){
                institutionalClaimDetailComponent.openNotCovReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'copayRsn'){
                institutionalClaimDetailComponent.openCopayReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'coinsuranceRsn'){
                institutionalClaimDetailComponent.openCoInsReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'deductRsn'){
                institutionalClaimDetailComponent.openDeductReasonLookup();
            } else if(shortcutEventOutput.event.target.id === 'adjustRsn'){
                institutionalClaimDetailComponent.openAdjustReasonLookup();
            }
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Record', () => {
            institutionalClaimDetailComponent.deletePopup();
        })
    ]
}

export function getClaimHoldRulesShortcutKeys(claimHoldRulesComponent: ClaimHoldRulesComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            claimHoldRulesComponent.saveClaimHoldRules();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            claimHoldRulesComponent.createClaimRuleForm();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete form data', () => {
            claimHoldRulesComponent.deletePopupAlert();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimHoldRulesComponent.helpScreen();
        })
    ]
}

export function getCOBHoldDenyShortcutKeys(holdDenyDeterminantsComponent: HoldDenyDeterminantsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            holdDenyDeterminantsComponent.saveDeterminantRules();

        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create new', () => {
            holdDenyDeterminantsComponent.newFormCretion();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete', () => {
            holdDenyDeterminantsComponent.deleteForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            holdDenyDeterminantsComponent.helpScreen();
        })
    ]
}

export function getCapitationFundModelShortcutKeys(capitationFundModelComponent: CapitationFundModelComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            capitationFundModelComponent.saveCapitationFundModel();

        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create new', () => {
            capitationFundModelComponent.newFormCreation();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            capitationFundModelComponent.helpScreen();
        })
    ]
}

export function getClaimHoldReleaseDeterminantShortcutKeys(claimHoldReleaseDeterminantComponent: ClaimHoldReleaseDeterminantComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            claimHoldReleaseDeterminantComponent.saveClaimHoldReleaseDeterm();

        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create new', () => {
            claimHoldReleaseDeterminantComponent.newFormCreation();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimHoldReleaseDeterminantComponent.helpScreen();
        })
    ]
}

export function getClaimHoldReleaseRuleShortcutKeys(claimsHoldReleaseRuleComponent: ClaimsHoldReleaseRuleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            claimsHoldReleaseRuleComponent.saveClaimHoldReleaseRule();

        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create new', () => {
            claimsHoldReleaseRuleComponent.newFormCreation();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimsHoldReleaseRuleComponent.helpScreen();
        })
    ]
}

export function getFunctionAccessShortcutKeys(functionAccessComponent: FunctionAccessComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            functionAccessComponent.saveFunctionAccess();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create new Data', () => {
            functionAccessComponent.createNewData();
        }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Create New Contract', () => {
        functionAccessComponent.openScreen();
      }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
        functionAccessComponent.modalClose();
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        functionAccessComponent.exitScreen();
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        functionAccessComponent.helpScreen();
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        functionAccessComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        functionAccessComponent.openTopicMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
        functionAccessComponent.openSpecialMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        functionAccessComponent.openWindowMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        functionAccessComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        functionAccessComponent.openHelpMenu()
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        functionAccessComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        functionAccessComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        functionAccessComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Open Detail', () => {
        functionAccessComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        functionAccessComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        functionAccessComponent.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('u', 'Diamond', 'Users', () => {
        functionAccessComponent.triggerMenus('u')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'The Window', () => {
        functionAccessComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Window Access', () => {
        functionAccessComponent.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('n', 'Diamond', 'Function Access', () => {
        functionAccessComponent.triggerMenus('n')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        functionAccessComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        functionAccessComponent.triggerMenus('h')
          },  []
      ),
      getShortcutKeyObj('f', 'Diamond', 'Copy Function Access', () => {
            functionAccessComponent.triggerMenus('f')
          },  []
      ),
    ]
}


export function pmbSetupScreenShortcutKeys(pmbSetupComponent: PremiumBillingSetupComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Premium Bill SetUp Data', () => {
                pmbSetupComponent.savePmpSetupRecord();
        }),
        getShortcutKeyObj('ctrl + a', 'Diamond', 'Save Premium Bill SetUp Data', () => {
                pmbSetupComponent.saveAsTemplate();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Premium Bill SetUp Record', () => {
                pmbSetupComponent.resetFormFieldsToCreateNewRecord();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
              pmbSetupComponent.closeScreen();
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
              pmbSetupComponent.exitScreen();
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Help', () => {
            pmbSetupComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Help', () => {
            pmbSetupComponent.openTopicMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Help', () => {
            pmbSetupComponent.openHelpMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Help', () => {
            pmbSetupComponent.openWindowMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Show Windows', () => {
            pmbSetupComponent.openWindowMenu()
        }),
        getShortcutKeyObj('F3', 'Diamond', 'Save form data', () => {
            pmbSetupComponent.openShortcutKeys();
        }),
        getShortcutKeyObj('alt + F4', 'Diamond', 'Help', () => {
            pmbSetupComponent.modalClose()
        }),
        getShortcutKeyObj('u', 'Diamond', 'SUBSC', () => {
            pmbSetupComponent.triggerMenus('u')
        }),
        getShortcutKeyObj('g', 'Diamond', 'GPBIL', () => {
            pmbSetupComponent.triggerMenus('g')
        }),
        getShortcutKeyObj('s', 'Diamond', 'Show Timestamp', () => {
            pmbSetupComponent.triggerMenus('s')
        }),
        getShortcutKeyObj('p', 'Diamond', 'Show Processing Message', () => {
          pmbSetupComponent.triggerMenus('p')
        }),
        getShortcutKeyObj('c', 'Diamond', 'Contents', () => {
            pmbSetupComponent.triggerMenus('c')
        }),
        getShortcutKeyObj('s', 'Diamond', 'Search for Help on...', () => {
          pmbSetupComponent.triggerMenus('s')
        }),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          pmbSetupComponent.triggerMenus('t')
        }),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          pmbSetupComponent.triggerMenus('g')
        }),
        getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
          pmbSetupComponent.triggerMenus('d')
        }),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          pmbSetupComponent.triggerMenus('h')
        }),
        getShortcutKeyObj('a', 'Diamond', 'About Diamond Client/Server', () => {
          pmbSetupComponent.triggerMenus('a')
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            pmbSetupComponent.handleHelpScreen();
        })
    ];
}

export function getWindowAccessShortcutKeys(windowsAccessComponent: WindowsAccessComponent) {
    return [
      getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
        windowsAccessComponent.save();
      }),
      getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Contract', () => {
        windowsAccessComponent.createNewDataScreen();
      }),

      getShortcutKeyObj('ctrl + o', 'Diamond', 'Create New Contract', () => {
        windowsAccessComponent.openScreen();
      }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
        windowsAccessComponent.modalClose();
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        windowsAccessComponent.exitScreen();
      }),

      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        windowsAccessComponent.helpScreen();
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        windowsAccessComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        windowsAccessComponent.openTopicMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
        windowsAccessComponent.openSpecialMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        windowsAccessComponent.openWindowMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        windowsAccessComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        windowsAccessComponent.openHelpMenu()
      }),
        getShortcutKeyObj('ctrl + y', 'Diamond', 'Copy Window Access', () => {
          windowsAccessComponent.copyWindowAccessScreen()
        }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        windowsAccessComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        windowsAccessComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        windowsAccessComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
        windowsAccessComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Close Modal', () => {
        windowsAccessComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('u', 'Diamond', 'Users', () => {
        windowsAccessComponent.triggerMenus('u')
          },  []
      ),
      getShortcutKeyObj('n', 'Diamond', 'Function Access', () => {
        windowsAccessComponent.triggerMenus('n')
          },  []
      ),
      getShortcutKeyObj('i', 'Diamond', 'D/C Information', () => {
        windowsAccessComponent.triggerMenus('i')
          },  []
      ),
      getShortcutKeyObj('f', 'Diamond', 'Copy Window Access', () => {
        windowsAccessComponent.triggerMenus('f')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        windowsAccessComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        windowsAccessComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        windowsAccessComponent.triggerMenus('h')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'About Diamond Client/Server', () => {
            windowsAccessComponent.triggerMenus('a')
          },  []
      ),
    ]
}

export function getCopyWindowAccessShortcutKeys(copyWindowAccessComponent: CopyWindowsAccessComponent) {
    return [
        getShortcutKeyObj('H1', 'Diamond', 'Help', () => {
            copyWindowAccessComponent.helpScreen();
        })
    ]
}


export function getAuthCodeShortcutKeys(
    authorizationCodeComponent: AuthorizationCodeComponent
) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authorizationCodeComponent.saveAuthCode();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Auth Code', () => {
            authorizationCodeComponent.createNewAuthCode();
        })

    ];
}


export function getPlanMasterShortcutKeys(component: PlanComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
          component.savePlanMaster();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Save form data', () => {
          component.deletePlan();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Plan Master', () => {
          component.createNewPlan();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          component.helpScreen();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        component.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        component.openFileMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        component.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        component.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
            component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
            component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
            component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
            component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
            component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
            component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
            component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
            component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
            component.triggerMenus('h')
          },  []
      ),
    ];
}


export function getPriceScheduleShortcutKeys(component: PriceScheduleComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
          component.savePriceSchedule();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
          component.createPriceScheduleForm();
        }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Save form data', () => {
        component.getPriceScheduleMasters();
      }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Price Schedule', () => {
          component.deletePriceSchedule();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        component.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        component.openFileMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        component.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        component.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        component.triggerMenus('h')
          },  []
      ),
        getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
          component.openFunctionalGroupShortcut();
        }),
    ]
}


export function getPriceRuleShortcutKeys(component: PriceRuleComponent) {
    return [
        getShortcutKeyObj("ctrl + s", "Diamond", "Save form data", () => {
          component.savePriceRuleMaster();
        }),
        getShortcutKeyObj("ctrl + m", "Diamond", "Create New Price Rule", () => {
          component.createNewPriceRule();
        }),
        getShortcutKeyObj("ctrl + o", "Diamond", "Open Price Rule", () => {
          component.handleOpenMenu();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'F1', () => {
          component.helpScreen();
        }),
        getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
          component.openFunctionalGroupShortcut();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        component.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen()
      }),
      getShortcutKeyObj('alt +  f', 'Diamond', 'Shortcut Menu', () => {
        component.openFileMenu();
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Shortcut Menu', () => {
        component.openTopicMenu()
      }),
      getShortcutKeyObj('alt +  w', 'Diamond', 'Shortcut Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Shortcut Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('alt +  h', 'Diamond', 'Shortcut Menu', () => {
        component.openHelpMenu()
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
            component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
            component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
            component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
            component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
            component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('m', 'Diamond', 'Open Panel', () => {
            component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'Open Billing Control', () => {
            component.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
            component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
            component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
            component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
            component.triggerMenus('h')
          },  []
      ),
    ];
}

export function getAuthorizationSecondOpinionShortcutKeys(authorizationSecondOpinionComponent: AuthorizationSecondOpinionComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authorizationSecondOpinionComponent.saveAuthSecondOpinion();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create new data', () => {
            authorizationSecondOpinionComponent.createNewAuthSecondOpinion();
        }),
    ]
}


export function getArAdjustmentShortcutKeys(arAdjustmentsComponent: ArAdjustmentsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            arAdjustmentsComponent.saveArAdjustment();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Ar Adjustments', () => {
            arAdjustmentsComponent.handleNewMenuClick();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Claim Detail Auth Proc Rule Lookup', () => {
            // authPhysicianComponent.openLookupFieldSearchModel();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Screen', () => {
            arAdjustmentsComponent.openScreen();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
            arAdjustmentsComponent.modalClose()
        }),
        getShortcutKeyObj('atl + f4', 'Diamond', 'Exit Screen', () => {
            arAdjustmentsComponent.exitScreen()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Special Menu', () => {
            arAdjustmentsComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Windows Menu', () => {
          arAdjustmentsComponent.openWindowMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Windows Menu', () => {
          arAdjustmentsComponent.openWindowMenu()
        }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Help Menu', () => {
          arAdjustmentsComponent.openHelpMenu()
        }),
        getShortcutKeyObj('r', 'Diamond', 'Aradj Report By Customer', () => {
          arAdjustmentsComponent.triggerMenus('r')
        }),
        getShortcutKeyObj('p', 'Diamond', 'Aradj Post', () => {
          arAdjustmentsComponent.triggerMenus('p')
        }),
        getShortcutKeyObj('s', 'Diamond', 'Show Timestamp', ()=> {
          arAdjustmentsComponent.triggerMenus('s')
        }),
        getShortcutKeyObj('p', 'Diamond', 'Processing Messages', ()=> {
          arAdjustmentsComponent.triggerMenus('p')
        }),
        getShortcutKeyObj('c', 'Diamond', 'Contents', () => {
          arAdjustmentsComponent.triggerMenus('c')
        }),
        getShortcutKeyObj('s', 'Diamond', 'Search for Help on..', () => {
          arAdjustmentsComponent.triggerMenus('s')
        }),
        getShortcutKeyObj('t', 'Diamond', 'This Window', ()=> {
          arAdjustmentsComponent.triggerMenus('s')
        }),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', ()=> {
          arAdjustmentsComponent.triggerMenus('p')
        }),
        getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
          arAdjustmentsComponent.triggerMenus('d')
        }),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          arAdjustmentsComponent.triggerMenus('h')
        }),
        getShortcutKeyObj('a', 'Diamond', 'About Diamond Client/Server', ()=> {
          arAdjustmentsComponent.triggerMenus('a')
        }),
    ]
}

export function getPhysicianAdvisoryShortcutKeys(authPhysicianComponent: AuthorizationPhysicianAdvisorComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authPhysicianComponent.saveAuthPhysAdvisor();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Physician Advisor', () => {
            authPhysicianComponent.handleNewMenuClick();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Claim Detail Auth Proc Rule Lookup', () => {
            // authPhysicianComponent.openLookupFieldSearchModel();
        })
    ]
}


export function getAuthorizationAppealsShortcutKeys(authorizationAppealsComponent: AuthorizationAppealsComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            authorizationAppealsComponent.saveAuthAppeal();
        }),
        getShortcutKeyObj('ctrl + n', 'Diamond', 'create new data', () => {
            authorizationAppealsComponent.createNewAuthAppealsShortCutAction();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Line of Business Lookup', (shortcutEventOutput: any) => {
            if(shortcutEventOutput.event.target.id === 'authNumber'){
                authorizationAppealsComponent.openAuthNumberModal();
            } else if(shortcutEventOutput.event.target.id === 'advisor'){
                authorizationAppealsComponent.openPhysicianAdvisorModal();
            } else if(shortcutEventOutput.event.target.id === 'appDeterm'){
                authorizationAppealsComponent.openAuthCodeModal();
            }
        }),
        getShortcutKeyObj('tab', 'Diamond', 'Line of Business Lookup', (shortcutEventOutput: any) => {
            if(shortcutEventOutput.event.target.id === 'authNumber'){
                authorizationAppealsComponent.openAuthNumberTab(shortcutEventOutput.event);
            }
        }),
    ]
}

export function getVendorAddressShortcutKeys(vendorAddressComponent: VendorAddressComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            vendorAddressComponent.saveVendorAddress();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Provider Credential', () => {
            vendorAddressComponent.resetAll(false);
        })
    ]
}

export function getGlReferenceComponentShortcutKeys(glReferenceComponent: GlReferenceComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            glReferenceComponent.saveGeneralLedgerReference();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'New form data', () => {
            glReferenceComponent.createForm();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            glReferenceComponent.helpScreen();
        })
    ]
}
export function getCompanyMasterShortcutKeys(CompanyComponent: CompanyComponent) {
    return [
        getShortcutKeyObj("ctrl + s", "Diamond", "Save form data", () => {
            CompanyComponent.saveCompanyMaster();
        }),
        getShortcutKeyObj("ctrl + m", "Diamond", "Create New Company Master", () => {
            CompanyComponent.createNewCompany();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Company Master', () => {
            CompanyComponent.deleteRequestAlert()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            CompanyComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
          CompanyComponent.modalClose()
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
          CompanyComponent.exitScreen()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
          CompanyComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
          CompanyComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          CompanyComponent.openHelpMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
          CompanyComponent.openWindowMenu()
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          CompanyComponent.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          CompanyComponent.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          CompanyComponent.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
          CompanyComponent.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          CompanyComponent.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
              CompanyComponent.triggerMenus('e')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          CompanyComponent.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          CompanyComponent.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          CompanyComponent.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          CompanyComponent.triggerMenus('h')
            },  []
        ),
    ];
}
export function getReasonShortcutKeys(reasonComponent: ReasonComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            reasonComponent.popupAlert('Data has been modified. Press Yes to save the changes. ', 'Reason');
        }),

        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Reason', () => {
            reasonComponent.createReasonCodeMaster();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            reasonComponent.helpScreen();
        })
    ];
}


export function getBankAccountShortcuts(bankAccountcom: BankAccountComponent) {
    return [
        getShortcutKeyObj("ctrl + s", "Diamond", "Save form data", () => {
            bankAccountcom.saveBankMaster();
        }),
        getShortcutKeyObj("ctrl + m", "Diamond", "Create New Bank Account", () => {
            bankAccountcom.createNewBank();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Bank Account', () => {
            bankAccountcom.deleteRequestAlert();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            bankAccountcom.helpScreen();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
          bankAccountcom.modalClose()
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
          bankAccountcom.exitScreen()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
          bankAccountcom.openFileMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
          bankAccountcom.openWindowMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          bankAccountcom.openHelpMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
          bankAccountcom.openWindowMenu()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          bankAccountcom.helpScreen();
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          bankAccountcom.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          bankAccountcom.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          bankAccountcom.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
          bankAccountcom.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          bankAccountcom.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
          bankAccountcom.triggerMenus('e')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          bankAccountcom.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          bankAccountcom.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          bankAccountcom.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          bankAccountcom.triggerMenus('h')
            },  []
        ),
    ];
}


export function getPriceRuleSelectionShortcutKeys(component: PriceRuleDetailSelectionComponent) {
    return [
        getShortcutKeyObj("ctrl + s", "Diamond", "Save form data", () => {
          component.savePriceRuleDetailRules();
        }),
        getShortcutKeyObj("ctrl + m", "Diamond", "Create New Price Rule Selection", () => {
          component.createNewPriceRuleDet();
        }),
        getShortcutKeyObj("ctrl + o", "Diamond", "Open Price Rule Selection", () => {
          component.handleOpenMenu();
        }),
        getShortcutKeyObj("ctrl + d", "Diamond", "Delete Price Rule Selection", () => {
          component.deletePriceRuleDetailRule();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          component.helpScreen();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        component.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen()
      }),
        getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
          component.openFunctionalGroupShortcut();
        }),
        getShortcutKeyObj('alt +  f', 'Diamond', 'Shortcut Menu', () => {
          component.openFileMenu();
        }),
        getShortcutKeyObj('alt + t', 'Diamond', 'Shortcut Menu', () => {
          component.openTopicMenu()
        }),
        getShortcutKeyObj('alt +  w', 'Diamond', 'Shortcut Menu', () => {
          component.openWindowMenu()
        }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Shortcut Menu', () => {
        component.openWindowMenu()
      }),
        getShortcutKeyObj('alt +  h', 'Diamond', 'Shortcut Menu', () => {
          component.openHelpMenu()
        }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('m', 'Diamond', 'Open Panel', () => {
        component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'Open Billing Control', () => {
        component.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        component.triggerMenus('h')
          },  []
      ),
    ];
}

export function getTaxShortcutKeys(
    TaxReportingEntityComponent: TaxReportingEntityComponent
) {
    return [
        getShortcutKeyObj("ctrl + s", "Diamond", "Save form data", () => {
            TaxReportingEntityComponent.savetaxReportingEntity();
        }),
        getShortcutKeyObj("ctrl + m", "Diamond", "Create New ", () => {
            TaxReportingEntityComponent.createTax();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            TaxReportingEntityComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'delete', () => {
            TaxReportingEntityComponent.deleteTaxReportingEntity();
        }),
        getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
          TaxReportingEntityComponent.modalClose()
        }),
        getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
          TaxReportingEntityComponent.exitScreen()
        }),
        getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
          TaxReportingEntityComponent.openFileMenu()
        }),
        getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
          TaxReportingEntityComponent.openSpecialMenu()
        }),
        getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
          TaxReportingEntityComponent.openWindowMenu()
        }),
        getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
          TaxReportingEntityComponent.openHelpMenu()
        }),
        getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
          TaxReportingEntityComponent.openWindowMenu()
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          TaxReportingEntityComponent.helpScreen();
        }),
        getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          TaxReportingEntityComponent.triggerMenus('m')
            },  []
        ),
        getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          TaxReportingEntityComponent.triggerMenus('o')
            },  []
        ),
        getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          TaxReportingEntityComponent.triggerMenus('s')
            },  []
        ),
        getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
          TaxReportingEntityComponent.triggerMenus('d')
            },  []
        ),
        getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          TaxReportingEntityComponent.triggerMenus('c')
            },  []
        ),
        getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
              TaxReportingEntityComponent.triggerMenus('e')
            },  []
        ),
        getShortcutKeyObj('l', 'Diamond', 'List Companies', () => {
          TaxReportingEntityComponent.triggerMenus('l')
            },  []
        ),
        getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          TaxReportingEntityComponent.triggerMenus('a')
            },  []
        ),
        getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          TaxReportingEntityComponent.triggerMenus('t')
            },  []
        ),
        getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          TaxReportingEntityComponent.triggerMenus('g')
            },  []
        ),
        getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          TaxReportingEntityComponent.triggerMenus('h')
            },  []
        ),
    ];
}




export function getFinalApNoneSetupComponentShortcutKeys(finalNonApSetupComponent: FinalNonApSetupComponent) {
    return [
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Save form data', () => {
            finalNonApSetupComponent.createNewForm();
        }),

        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
            finalNonApSetupComponent.saveFinalNonApSetup();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            finalNonApSetupComponent.helpScreen();
        })
    ];
}
export function getPcpAutoAssignShortcutKeys(pcpAutoAssignComponent: PcpAutoAssignComponent) {
    return [
        getShortcutKeyObj('f5', 'Diamond', 'Line of Business Lookup', (shortcutEventOutput: any) => {
            if(shortcutEventOutput.event.target.id === 'event'){
                pcpAutoAssignComponent.openEventLookupPage();
            }else {
                //event.target.id === 'lineOfBusiness'
                pcpAutoAssignComponent.openLineOfBusinessLookupPage();
            }
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        pcpAutoAssignComponent.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        pcpAutoAssignComponent.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        pcpAutoAssignComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        pcpAutoAssignComponent.openTopicMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        pcpAutoAssignComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        pcpAutoAssignComponent.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        pcpAutoAssignComponent.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        pcpAutoAssignComponent.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        pcpAutoAssignComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        pcpAutoAssignComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        pcpAutoAssignComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        pcpAutoAssignComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        pcpAutoAssignComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        pcpAutoAssignComponent.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        pcpAutoAssignComponent.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        pcpAutoAssignComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        pcpAutoAssignComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        pcpAutoAssignComponent.triggerMenus('h')
          },  []
      ),
      getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
        pcpAutoAssignComponent.openFunctionalGroupShortcut();
      }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Shortcut Menu', () => {
        pcpAutoAssignComponent.handleOpenMenu();
      })
    ]
}

export function getEdiWorkTableEditshortcuts(ediWorkTableEditComponent: EdiWorkTableEditComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Edi work table edit data', () => {
            ediWorkTableEditComponent.saveMemberEdiEligWork();
        }),
        getShortcutKeyObj('f5', 'Diamond', 'Job lookup', () => {
            ediWorkTableEditComponent.openLookupFieldSearchModel();
        })
    ]
}

export function getUDTXTShortcutKeys(userDefinedFieldsComponent:UserDefinedFieldsComponent ) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'User Defined Fields Save', () => {
            userDefinedFieldsComponent.saveUserDefinedText();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
            userDefinedFieldsComponent.addNewUserDefinedCode();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Record', () => {
            userDefinedFieldsComponent.deleteUserDefinedCode();
        }),
    ]
}

export function getSUBMTShortcutKeys(submitterMasterComponent:SubmitterMasterComponent ) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Submitter Master Save', () => {
            submitterMasterComponent.saveSubmitterProfileMaster()
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
            submitterMasterComponent.resetAll();
        }),
    ]
}

export function getUDATTShortcutKeys(userDefinedAttributesComponent:UserDefinedAttributesComponent ) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'User Defined Attributes Save', () => {
            userDefinedAttributesComponent.saveUserDefinedAttributes();
        }),
    ]
}

export function getAuthWaiveRules(authWaiveRulesComponent: AuthWaiveRulesComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Auth Data', () => {
            authWaiveRulesComponent.saveRecord()
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Data', () => {
            authWaiveRulesComponent.createNewAuthWaiveRules()
        })
    ]
}


export function getRiderShortcutKey(riderComponent: RiderComponent) {
    return [
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create form data', () => {
            riderComponent.createNewForm();
        }),
        getShortcutKeyObj('ctrl + s' , 'Diamond', 'Save form data', () => {
            riderComponent.saveRiderMaster();
        }),
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            riderComponent.helpScreen();
        })
    ]
}

export function getAddonCignaLinkContactsShortcuts(adonContactComponent: AdonContactComponent) {
    return [
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', (shortcutEventOutput: any) => {
            adonContactComponent.saveFormByShortcut();
        })
    ]
}


export function getAlternateSearchOrderShortcutKeys(alternateSearchOrderComponent: AlternateSearchOrderComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            alternateSearchOrderComponent.helpScreen();
        })
    ]
}

export function getMemberMedicareShortcutKeys(memberMedicareComponent: MemberMedicareComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            memberMedicareComponent.helpScreen();
        })
    ]
}

export function getMemberWorkingAgedShortcutKeys(memberWorkingAgedComponent: MemberWorkingAgedComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            memberWorkingAgedComponent.helpScreen()
        })
    ]
}

export function getDrgCodeMaintenanceShortcutKeys(drgCodeMaintenanceComponent: DrgCodeMaintenanceComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            drgCodeMaintenanceComponent.helpScreen();
        })
    ]
}

export function getDrgWeightMaintenanceShortcutKeys(drgWeightMaintenanceComponent: DrgWeightsMaintenanceComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            drgWeightMaintenanceComponent.helpScreen();
        })
    ]
}

export function getPriceDeterminantMaintenanceShortcutKeys(priceDeterminantMaintenanceComponent: PriceDeterminantMaintenanceComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            priceDeterminantMaintenanceComponent.helpScreen();
        })
    ]
}

export function getBillTypesInstitutionalClaimsShortcutKeys(billTypesInstitutionClaimsComponent: BillTypesInstitutionalClaimsComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            billTypesInstitutionClaimsComponent.helpScreen()
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
            billTypesInstitutionClaimsComponent.createNew()
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Screen', () => {
            billTypesInstitutionClaimsComponent.openScreen()
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Record', () => {
           billTypesInstitutionClaimsComponent.deleteRecord();
        })
    ]
}

export function getClaimDuplicateCheckRulesShortcutKeys(claimDuplicateCheckRulesComponent: ClaimDuplicateCheckRulesComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimDuplicateCheckRulesComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Record', () => {
          claimDuplicateCheckRulesComponent.createNewRecord()
        }),
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Record', () => {
          claimDuplicateCheckRulesComponent.save()
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Record', () => {
          claimDuplicateCheckRulesComponent.delete();
        })
    ]
}

export function getConversionFactorTypeComponent(conversionFactorTypeComponent: ConversionFactorTypeComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            conversionFactorTypeComponent.helpScreen();
        })
    ]
}

export function getGlAssignmentShortcutKeys(glAssignmentComponent: GlAssignmentComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            glAssignmentComponent.helpScreen();
        })
    ]
}

export function getLanguageShortcutKeys(languageComponent: LanguageComponent) {
    return [
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        languageComponent.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        languageComponent.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        languageComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
        languageComponent.openSpecialMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        languageComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        languageComponent.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        languageComponent.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        languageComponent.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        languageComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        languageComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        languageComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        languageComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Close Screen', () => {
        languageComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        languageComponent.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        languageComponent.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        languageComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
            languageComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        languageComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        languageComponent.triggerMenus('h')
          },  []
      ),
    ]
}

export function getClaimSDiscountCalcRulesShortcutKeys(claimsDiscountCalsRulesComponent: ClaimDiscountCalcRulesComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimsDiscountCalsRulesComponent.helpScreen();
        }),
        getShortcutKeyObj('ctrl + d', 'Diamond', 'Delete Record', () => {
          claimsDiscountCalsRulesComponent.deleteRecordAlert();
        }),
      getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
        claimsDiscountCalsRulesComponent.createNew();
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        claimsDiscountCalsRulesComponent.helpScreen();
      }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Open form', () => {
        claimsDiscountCalsRulesComponent.openScreen();
      }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        claimsDiscountCalsRulesComponent.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        claimsDiscountCalsRulesComponent.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        claimsDiscountCalsRulesComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        claimsDiscountCalsRulesComponent.openTopicMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        claimsDiscountCalsRulesComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        claimsDiscountCalsRulesComponent.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        claimsDiscountCalsRulesComponent.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        claimsDiscountCalsRulesComponent.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('p', 'Diamond', 'Open Panel', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('p')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'Open Billing Control', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('i', 'Diamond', 'D/C Information', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('i')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        claimsDiscountCalsRulesComponent.triggerMenus('h')
          },  []
      ),
    ]
}

export function getClaimInterestCalcRuleShortcutKeys(claimInterestCalcRulesComponent: ClaimInterestCalcRulesComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimInterestCalcRulesComponent.helpScreen();
        }),
      getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
        claimInterestCalcRulesComponent.createNew();
      }),
      getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Record', () => {
        claimInterestCalcRulesComponent.saveDeterminantValues();
      }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Open form', () => {
        claimInterestCalcRulesComponent.openScreen();
      }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        claimInterestCalcRulesComponent.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        claimInterestCalcRulesComponent.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        claimInterestCalcRulesComponent.openFileMenu()
      }),
      getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
        claimInterestCalcRulesComponent.openTopicMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        claimInterestCalcRulesComponent.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        claimInterestCalcRulesComponent.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        claimInterestCalcRulesComponent.openWindowMenu()
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        claimInterestCalcRulesComponent.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        claimInterestCalcRulesComponent.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        claimInterestCalcRulesComponent.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        claimInterestCalcRulesComponent.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        claimInterestCalcRulesComponent.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            claimInterestCalcRulesComponent.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'Line Of Business', () => {
        claimInterestCalcRulesComponent.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('p', 'Diamond', 'PCP Support Info Details', () => {
        claimInterestCalcRulesComponent.triggerMenus('p')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        claimInterestCalcRulesComponent.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        claimInterestCalcRulesComponent.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        claimInterestCalcRulesComponent.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        claimInterestCalcRulesComponent.triggerMenus('h')
          },  []
      ),
    ]
}

export function getLobPreExistingConditionsShortcutKeys(lobPreexistingConditionsComponent: LobPreExistingConditionsComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            lobPreexistingConditionsComponent.helpScreen();
        })
    ]
}

export function getPanelShortcutKeys(panelComponent: PanelComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            panelComponent.helpScreen();
        })
    ]
}

export function getPCPJobSetupShortcutKeys(component: PcpJobSetupComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          component.helpScreen();
        }),
        getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
          component.openFunctionalGroupShortcut();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        component.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        component.openFileMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Special Menu', () => {
        component.openSpecialMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        component.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        component.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
            component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
            component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
            component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
            component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
            component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('l', 'Diamond', 'Line Of Business', () => {
            component.triggerMenus('l')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
            component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
            component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
            component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
            component.triggerMenus('h')
          },  []
      ),
      getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
        component.openFunctionalGroupShortcut();
      }),
    ]
}

export function getPcpAutoAssignRulesShortcutKeys(component: PcpAutoAssignRulesComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
          component.helpScreen();
        }),
      getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
        component.modalClose()
      }),
      getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
        component.exitScreen()
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
        component.openFileMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
        component.openHelpMenu()
      }),
      getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
        component.openWindowMenu()
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        component.helpScreen();
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
            component.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
            component.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
            component.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
            component.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
            component.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
            component.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
            component.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
            component.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
            component.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
            component.triggerMenus('h')
          },  []
      ),
      getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
        component.openFunctionalGroupShortcut();
      }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Shortcut Menu', () => {
          component.handleOpenMenu();
        })
    ]
}

export function getPcpaaSupportInfoDetailsShortcutKeys(component: PcpaaSupportInfoDetailsComponent) {
  return [
    getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
      component.helpScreen();
    }),
    getShortcutKeyObj('ctrl + m', 'Diamond', 'Open Window Menu', () => {
      component.createForm()
    }),
    getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Window Menu', () => {
      component.handleOpenMenu()
    }),
    getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
      component.openFunctionalGroupShortcut();
    }),
    getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Screen', () => {
      component.modalClose()
    }),
    getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
      component.exitScreen()
    }),
    getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
      component.openFileMenu()
    }),
    getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
      component.openWindowMenu()
    }),
    getShortcutKeyObj('alt + t', 'Diamond', 'Open Window Menu', () => {
      component.openTopicMenu()
    }),
    getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
      component.openHelpMenu()
    }),
    getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
      component.openWindowMenu()
    }),
    getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
      component.helpScreen();
    }),
    getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          component.triggerMenus('m')
        },  []
    ),
    getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          component.triggerMenus('o')
        },  []
    ),
    getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          component.triggerMenus('s')
        },  []
    ),
    getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
          component.triggerMenus('d')
        },  []
    ),
    getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          component.triggerMenus('c')
        },  []
    ),
    getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
          component.triggerMenus('e')
        },  []
    ),
    getShortcutKeyObj('p', 'Diamond', 'PCP', () => {
          component.triggerMenus('p')
        },  []
    ),
    getShortcutKeyObj('l', 'Diamond', 'Letter', () => {
          component.triggerMenus('l')
        },  []
    ),
    getShortcutKeyObj('i', 'Diamond', 'Information', () => {
          component.triggerMenus('')
        },  []
    ),
    getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          component.triggerMenus('a')
        },  []
    ),
    getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
          component.triggerMenus('t')
        },  []
    ),
    getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          component.triggerMenus('g')
        },  []
    ),
    getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          component.triggerMenus('h')
        },  []
    ),
    getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
      component.openFunctionalGroupShortcut();
    }),
  ]
}

export function getPreExistingConditionRulesShortcutKeys(preExistingConditionRulesComponent: PreExistingConditionRulesComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            preExistingConditionRulesComponent.helpScreen();
        })
    ]
}

export function getRegionShortcutKeys(regionComponent: RegionComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            regionComponent.helpScreen();
        })
    ]
}

export function getTimelyFilingRulesShortcutKeys(timelyFilingRulesComponent: TimelyFilingRulesComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            timelyFilingRulesComponent.helpScreen();
        })
    ]
}

export function getZipCodeShortcutKeys(zipCode: ZipCodeComponent) {

    return [
      getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
        zipCode.createNew();
      }),
      getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
        zipCode.helpScreen();
      }),
      getShortcutKeyObj('ctrl + o', 'Diamond', 'Open form', () => {
        zipCode.resetAll();
      }),
      getShortcutKeyObj('ctrl + s', 'Diamond', 'Open form', () => {
        zipCode.saveZipCode();
      }),
      getShortcutKeyObj('ctrl + F4', 'Diamond', 'Close the screen', () => {
        zipCode.modalClose();
      }),
      getShortcutKeyObj('alt + F4', 'Diamond', 'Close the screen', () => {
        zipCode.exitScreen();
      }),
      getShortcutKeyObj('alt + f', 'Diamond', 'Open File menu', () => {
        zipCode.openFileMenu()
      }),
      getShortcutKeyObj('alt + w', 'Diamond', 'Open Window menu', () => {
        zipCode.openWindowMenu()
      }),
      getShortcutKeyObj('alt + h', 'Diamond', 'Help', () => {
        zipCode.openHelpMenu()
      }),
      getShortcutKeyObj('alt + s', 'Diamond', 'Open Timestamp', () => {
        zipCode.openSpecialMenu()
      }),
      getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
        zipCode.triggerMenus('m')
          },  []
      ),
      getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
        zipCode.triggerMenus('o')
          },  []
      ),
      getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
        zipCode.triggerMenus('s')
          },  []
      ),
      getShortcutKeyObj('d', 'Diamond', 'Delete Record', () => {
        zipCode.triggerMenus('d')
          },  []
      ),
      getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
        zipCode.triggerMenus('c')
          },  []
      ),
      getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
        zipCode.triggerMenus('e')
          },  []
      ),
      getShortcutKeyObj('z', 'Diamond', 'Open Billing Control', () => {
        zipCode.triggerMenus('z')
          },  []
      ),
      getShortcutKeyObj('i', 'Diamond', 'D/C Information', () => {
        zipCode.triggerMenus('i')
          },  []
      ),
      getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
        zipCode.triggerMenus('a')
          },  []
      ),
      getShortcutKeyObj('t', 'Diamond', 'This Window', () => {
        zipCode.triggerMenus('t')
          },  []
      ),
      getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
        zipCode.triggerMenus('g')
          },  []
      ),
      getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
        zipCode.triggerMenus('h')
          },  []
      ),
    ]
}

export function getClaimEvaluationRuleShortcutKeys(claimEvaluationRuleComponent: ClaimEvaluationRuleComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            claimEvaluationRuleComponent.helpScreen();
        })
    ]
}

export function getCapitationFundDistributionShortcutKeys(capitationFundDistributionComponent: CapitationFundDistributionComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            capitationFundDistributionComponent.helpScreen();
        })
    ]
}

export function getDentalServiceClaimsShortcutKeys(dentalServiceClaimsComponent: DentalServiceClaimsComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            dentalServiceClaimsComponent.helpScreen();
        })
    ]
}

export function getToothHistoryShortcutKeys(toothHistoryComponent: ThistToothHistoryComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            toothHistoryComponent.helpScreen();
        })
    ]
}

export function getToothRuleShortcutKeys(toothRuleComponent: ToothRuleComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            toothRuleComponent.helpScreen();
        })
    ]
}

export function getAccountsPayableShortcutKeys(accountPayableComponent: AccountsPayableComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            accountPayableComponent.helpScreen();
        })
    ]
}

export function getAccountsPayableSelectionShortcutKeys(accountPayableSelectionComponent: AccountsPayableSelectionComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            accountPayableSelectionComponent.helpScreen();
        })
    ]
}

export function getAccountsPayableUpdateShortcutKeys(accountPayableUpdateComponent: AccountsPayableUpdateComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            accountPayableUpdateComponent.helpScreen();
        })
    ]
}

export function getAccountsPayableVendorDisplayShortcutKeys(accountPayableVendorDisplayComponent: AccountsPayableVendorDisplayComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            accountPayableVendorDisplayComponent.helpScreen();
        })
    ]
}

export function getCheckPrintSetupShortcutKeys(checkPrintSetupComponent: CheckPrintSetupComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            checkPrintSetupComponent.helpScreen();
        })
    ]
}

export function clearVoidStopUpdateShortcutKeys(clearVoidStopUpdateComponent: ClearVoidStopUpdateComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            clearVoidStopUpdateComponent.helpScreen();
        })
    ]
}

export function getManualChecksShortcutKeys(manualCheckComponent: ManualChecksComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
            manualCheckComponent.helpScreen();
        })
    ]
}

export function getArMatrixPremiumRateEntryComponent(component: ArMatrixPremiumRateEntryComponent) {
    return [
        getShortcutKeyObj('F1', 'Diamond', 'Help', () => {

        }),
        getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
            component.createNewScreen();
        }),
        getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Screen', () => {
            component.createNewScreen();
        }),
        getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Record', () => {
            component.savePremiumMatrixHeader();
        })
    ]
}

export function getShortcutMenuKeyEvent(component: AppComponent) {
    return [
        getShortcutKeyObj('F3', 'Diamond', 'Shortcut Menu', () => {
          component.openFunctionalGroupShortcut()
        })
    ]
}

export function getArMatrixDeterminantShortcutKeys(component: ArMatrixDeterminantsComponent) {
  return [
    getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New', () => {
      component.handleNewMenu();
    }),
    getShortcutKeyObj('ctrl + o', 'Diamond', 'Open Screen', () => {
      component.resetForm();
    }),
    getShortcutKeyObj('ctrl + s', 'Diamond', 'Save Record', () => {
      component.handleSaveMenu();
    }),
    getShortcutKeyObj('ctrl + d', 'Diamond', 'Save Record', () => {
      component.handleDeleteMenu();
    })
  ]
}

export function getWindowDescriptionShortcutKeys(component: WindowDescriptionComponent) {
  return [
    getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
      component.saveSecFuncDescr();
    }),
    getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Users', () => {
      component.createRecord();
    }),
    getShortcutKeyObj('ctrl + o', 'Diamond', 'Open New Users', () => {
      component.openRecord();
    }),
    getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
      component.modalClose();
    }),
    getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
      component.exitScreen();
    }),
    getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
      component.helpScreen();
    }),
    getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
      component.openFileMenu()
    }),
    getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
      component.openTopicMenu()
    }),
    getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
      component.openWindowMenu()
    }),
    getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
      component.openWindowMenu()
    }),
    getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
      component.openHelpMenu()
    }),
    getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          component.triggerMenus('m')
        },  []
    ),
    getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          component.triggerMenus('o')
        },  []
    ),
    getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          component.triggerMenus('s')
        },  []
    ),
    getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
          component.triggerMenus('e')
        },  []
    ),
    getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          component.triggerMenus('c')
        },  []
    ),
    getShortcutKeyObj('t', 'Diamond', 'Delete Super User', () => {
          component.triggerMenus('t')
        },  []
    ),
    getShortcutKeyObj('w', 'Diamond', 'Users', () => {
          component.triggerMenus('w')
        },  []
    ),
    getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          component.triggerMenus('a')
        },  []
    ),
    getShortcutKeyObj('n', 'Diamond', 'Function Access', () => {
          component.triggerMenus('n')
        },  []
    ),
    getShortcutKeyObj('f', 'Diamond', 'LOB Affiliation', () => {
          component.triggerMenus('f')
        },  []
    ),
    getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          component.triggerMenus('g')
        },  []
    ),
    getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          component.triggerMenus('h')
        },  []
    ),
    getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
          component.triggerMenus('d')
        },  []
    ),
  ]
}

export function getFunctionDescriptionShortcutKeys(component: FunctionDescriptionComponent) {
  return [
    getShortcutKeyObj('ctrl + s', 'Diamond', 'Save form data', () => {
      component.saveSecFuncDescr();
    }),
    getShortcutKeyObj('ctrl + m', 'Diamond', 'Create New Users', () => {
      component.createRecord();
    }),
    getShortcutKeyObj('ctrl + o', 'Diamond', 'Open New Users', () => {
      component.openRecord();
    }),
    getShortcutKeyObj('ctrl + f4', 'Diamond', 'Close Modal', () => {
      component.modalClose();
    }),
    getShortcutKeyObj('alt + f4', 'Diamond', 'Exit Screen', () => {
      component.exitScreen();
    }),
    getShortcutKeyObj('F1', 'Diamond', 'Help', () => {
      component.helpScreen();
    }),
    getShortcutKeyObj('alt + f', 'Diamond', 'Open File Menu', () => {
      component.openFileMenu()
    }),
    getShortcutKeyObj('alt + t', 'Diamond', 'Open Topic Menu', () => {
      component.openTopicMenu()
    }),
    getShortcutKeyObj('alt + w', 'Diamond', 'Open Window Menu', () => {
      component.openWindowMenu()
    }),
    getShortcutKeyObj('shift + alt', 'Diamond', 'Open Window Menu', () => {
      component.openWindowMenu()
    }),
    getShortcutKeyObj('alt + h', 'Diamond', 'Open Help Menu', () => {
      component.openHelpMenu()
    }),
    getShortcutKeyObj('m', 'Diamond', 'Create New', () => {
          component.triggerMenus('m')
        },  []
    ),
    getShortcutKeyObj('o', 'Diamond', 'Open New', () => {
          component.triggerMenus('o')
        },  []
    ),
    getShortcutKeyObj('s', 'Diamond', 'Save Record', () => {
          component.triggerMenus('s')
        },  []
    ),
    getShortcutKeyObj('e', 'Diamond', 'Exit Screen', () => {
          component.triggerMenus('e')
        },  []
    ),
    getShortcutKeyObj('c', 'Diamond', 'Open Contracts', () => {
          component.triggerMenus('c')
        },  []
    ),
    getShortcutKeyObj('t', 'Diamond', 'Delete Super User', () => {
          component.triggerMenus('t')
        },  []
    ),
    getShortcutKeyObj('w', 'Diamond', 'Users', () => {
          component.triggerMenus('w')
        },  []
    ),
    getShortcutKeyObj('a', 'Diamond', 'Audit Display', () => {
          component.triggerMenus('a')
        },  []
    ),
    getShortcutKeyObj('n', 'Diamond', 'Function Access', () => {
          component.triggerMenus('n')
        },  []
    ),
    getShortcutKeyObj('f', 'Diamond', 'LOB Affiliation', () => {
          component.triggerMenus('f')
        },  []
    ),
    getShortcutKeyObj('g', 'Diamond', 'Glossary', () => {
          component.triggerMenus('g')
        },  []
    ),
    getShortcutKeyObj('h', 'Diamond', 'How to use Help', () => {
          component.triggerMenus('h')
        },  []
    ),
    getShortcutKeyObj('d', 'Diamond', 'Getting Started', () => {
          component.triggerMenus('d')
        },  []
    ),
  ]
}
