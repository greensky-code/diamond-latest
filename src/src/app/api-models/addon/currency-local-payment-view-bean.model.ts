/* Copyright (c) 2021 . All Rights Reserved. */

import { AddressOutgoingPaymentViewBean } from "./address-outgoing-payment-view-bean.model";
import { CurrencyClaimHeader } from "./currency-claim-header.model";
import { EntityHeader } from "./entity-header.model";

export class CurrencyLocalPaymentViewBean {
  averageLocalClaimRate: string = "";
	calculated:boolean = false;
	claimDetailElements: any;
	claimHeaderElement: CurrencyClaimHeader;
	claimPayable: boolean = true;
	companyCode: string = "";
	displayTransHistory: boolean = false;
	entityHeaderElement: EntityHeader;
	euroClearingHouseAbbr: string = "";
	historyPresent: boolean = false;
	outgoingAddressElement: AddressOutgoingPaymentViewBean;
	outgoingLinesExisting: boolean = false;
	outgoingLocalCountryCode: string = "";
	paymentTransactionHistoryElements: any[] = [];
	saved:boolean = false;
	specialPaymentElements: any[] = [];
	totalNetAmt: string = "";
	totalOutgoingNetAmt: string = "";
	transPaymentCode: string = "";
	transPaymentList: any[] = [];
}