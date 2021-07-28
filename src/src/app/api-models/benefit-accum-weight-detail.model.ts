/* Copyright (c) 2020 . All Rights Reserved. */

export class BenefitAccumWeightDetail {
	benefitAccumWeightDetailPrimaryKey?:any;
	accumulatorId: string;
	seqAccumId: number;
	fromValue: string;
	thruValue: string;
	primaryGroup: string;
	secondaryGroup: string;
	weightedAccum: number;
	effectiveDate: string;
	thruDate: string;
	securityCode: string;
	insertDatetime: Date;
	insertUser: string;
	insertProcess: string;
	updateDatetime: Date;
	updateUser: string;
	updateProcess: string;
	action?: string;
}