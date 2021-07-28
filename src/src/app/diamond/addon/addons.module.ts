import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { AddressPrimaryMailingComponent } from './address-primary-mailing/address-primary-mailing.component';
import { PopUpMessageModule } from '../../shared/components/pop-up-message/pop-up.message.module';
import { ManualChecksComponent } from "./manual-checks/manual-checks.component";
import { PricingPartnerDetailComponent } from "./pricing-partner-detail/pricing-partner-detail.component";
import { ProvinceTaxDetailComponent } from './province-tax-detail/province-tax-detail.component';
import { ExternalCarrierComponent } from './external-carrier/external-carrier.component';
import { CignalinksGroupAddressComponent } from "./cignalinks-group-address/cignalinks-group-address.component";
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AddonControllerComponent } from './addon-controller/addon-controller.component'
import { AdministrativeDetailComponent } from './administrative-detail/administrative-detail.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OtherInfoComponent } from './other-info/other-info.component';
import { StateMandateDetailComponent } from './administrative-detail/state-mandate-detail/state-mandate-detail.component';
import { PayerDetailsComponent } from './pharmacy/payer/payer-details.component';
import { CignaLinkDetailsComponent } from './cigna-link-details/cigna-link-details.component';
import { ESIDetailsComponent } from './pharmacy/esi/esi-details.component';
import { AdonContactComponent } from './adon-contact/adon-contact.component';
import { CignalinksContactsComponent } from './cignalinks-contacts/cignalinks-contacts.component';
import { ContactPlanDetailsComponent } from './contact-plan-details/contact-plan-details.component';
import { ArgusDetailComponent } from './pharmacy/argus-detail/argus-detail.component';
import { ProcGetGroupTestStatusService } from '../../api-services/addon/proc-get-group-test-status.stored-procedure.service';
import { AddonAddressComponent } from './addon-address/addon-address.component';
import { PrimayMailingAddressComponent } from './primary-mailing-address/primary-mailing-address.component';
import { MemberAddonControllerComponent } from './member-addon-controller/member-addon-controller.component';
import { MemberAddonAddressComponent } from './member-addon-address/member-addon-address.component';

import { AddonMemberMasterAddressComponent } from './addon-member-master-address/addon-member-master-address.component';
import { AddonMemberMasterControllerComponent } from './addon-member-master-controller/addon-member-master-controller.component';
import { AddressEmailComponent } from './addon-member-master-controller/address-email/address-email.component';
import { ChooseClaimPaymentMethodComponent } from "./choose-claim-payment-method/choose-claim-payment-method.component";
import { ProviderAddressInformationComponent } from "./provider-address-information/provider-address-information.component";
import { ProviderAddressesComponent } from "./provider-addresses/provider-addresses.component";
import { AddressBankComponent } from './address-bank/aoadbas--bank-i.component';
import { AddressOtherInfoComponent } from './address-other-info/address-other-info.component';
import { MemberMasterAddonAddressComponent } from './addon-member-master-address-addon-address/member-master-addon-address.component';
import { AddonClaimsControllerComponent } from './addon-claims-controller/addon-claims-controller.component';
import { ClaimCurrencyPaymentComponent } from './claim-currency-payment/claim-currency-payment.component';
import {LocalCurrencyConversionComponent} from'./local-currency-conversion/local-currency-conversion.component'
import {AddressBankSearchComponent} from './address-bank/address-bank-search/address-bank-search.component';
import {AddonPhoneComponent} from "./adon-phone/adon-phone.component";
import {MemberAddressesComponent} from './member-addresses/member-addresses.component';
import { HistoryDetailsComponent } from './cigna-link-details/history-details/history-details.component';


const routes: Routes = [
	{ path: "address-primary-mailing", component: AddressPrimaryMailingComponent, },
	{ path: "address_bank", component: AddressBankComponent },
	{ path: "manual-checks", component: ManualChecksComponent },
	{ path: "administrative_details", component: AddonControllerComponent },
	{ path: "province-tax-detail", component: ProvinceTaxDetailComponent },
	{ path: "other-info", component: AddonControllerComponent },
	{ path: "external-carrier", component: ExternalCarrierComponent },
	{ path: "pharmacy", component: PharmacyComponent },
	{ path: 'address-primary-mailing', component: AddressPrimaryMailingComponent },
	{ path: 'manual-checks', component: ManualChecksComponent },
	{ path: 'administrative_details', component: AddonControllerComponent },
	{ path: 'other-info', component: AddonControllerComponent },
	{ path: 'external-carrier', component: ExternalCarrierComponent },
	{ path: 'pharmacy', component: PharmacyComponent },
	{ path: "cigma-links", component: CignalinksContactsComponent },
	{ path: 'payer', component: PayerDetailsComponent },
	{ path: 'cigna-link-details', component: CignaLinkDetailsComponent },
	{ path: 'argus-detail', component: ArgusDetailComponent },
	{ path: "member-addon-address", component: MemberAddonAddressComponent },
	{ path: "addressotherinfo", component: AddressOtherInfoComponent },
	{ path: 'address-email', component: AddressEmailComponent },
	{ path: "choose-claim-payment-method", component: ChooseClaimPaymentMethodComponent },
	{ path: "provider-address-information", component: ProviderAddressInformationComponent },
	{ path: "provider-addresses", component: ProviderAddressesComponent },
	{ path: "member-addresses", component: MemberAddressesComponent },
	{ path: "view-history", component: HistoryDetailsComponent },
	{path: "localcurrencyconversion", component: LocalCurrencyConversionComponent}

];

@NgModule({
	declarations: [
		AddressBankComponent,
		ExternalCarrierComponent,
		AddressPrimaryMailingComponent,
		ManualChecksComponent,
		PricingPartnerDetailComponent,
		ProvinceTaxDetailComponent,
		CignalinksGroupAddressComponent,
		AddonControllerComponent,
		CignalinksContactsComponent,
		AdonContactComponent,
		ContactPlanDetailsComponent,
		PharmacyComponent,
		PayerDetailsComponent,
		AdministrativeDetailComponent,
		StateMandateDetailComponent,
		OtherInfoComponent,
		CignaLinkDetailsComponent,
		ESIDetailsComponent,
		ArgusDetailComponent,
		AddressEmailComponent,
		AddonAddressComponent,
		PrimayMailingAddressComponent,
		MemberAddonControllerComponent,
		MemberAddonAddressComponent,
		MemberMasterAddonAddressComponent,
		AddonMemberMasterAddressComponent,
		AddonMemberMasterControllerComponent,
		AddonClaimsControllerComponent,
		ClaimCurrencyPaymentComponent,
		AddressEmailComponent,
		AddressOtherInfoComponent,
		ChooseClaimPaymentMethodComponent,
		ProviderAddressInformationComponent,
		ProviderAddressesComponent,
		AddressBankSearchComponent,
		AddonPhoneComponent,
		MemberAddressesComponent,
		HistoryDetailsComponent,
		LocalCurrencyConversionComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		PopUpMessageModule,
		RouterModule.forChild(routes),
		NgbNavModule
	],
	exports: [
		AddressBankComponent,
		ExternalCarrierComponent,
		AddressPrimaryMailingComponent,
		ManualChecksComponent,
		PricingPartnerDetailComponent,
		ProvinceTaxDetailComponent,
		CignalinksGroupAddressComponent,
		CignalinksContactsComponent,
		AdonContactComponent,
		ContactPlanDetailsComponent,
		PharmacyComponent,
		PayerDetailsComponent,
		AdministrativeDetailComponent,
		StateMandateDetailComponent,
		OtherInfoComponent,
		ESIDetailsComponent,
		ArgusDetailComponent,
		AddressEmailComponent,
		NgbNavModule,
		AddonAddressComponent,
		MemberMasterAddonAddressComponent,
		PrimayMailingAddressComponent,
		MemberAddonAddressComponent,
		AddressOtherInfoComponent,
		MemberAddonAddressComponent,
		AddonClaimsControllerComponent,
		ClaimCurrencyPaymentComponent,
		ChooseClaimPaymentMethodComponent,
		ProviderAddressInformationComponent,
		ProviderAddressesComponent,
		AddonPhoneComponent,
		HistoryDetailsComponent,
		LocalCurrencyConversionComponent
	]
})

export class AddonsModule {
}
