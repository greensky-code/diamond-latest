import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SharedService } from "../shared/services/shared.service";
import { BenefitRuleSelect, MedDefStatusModel } from '../api-models/benefit-rule-select.model';

@Injectable({
	providedIn: "root",
})
export class BenefitRuleSelectionService {
	private benefitRuleSelectUrl: string = `${environment.apiUrl}/benefitruleselects`;
	private contentHeaders = new HttpHeaders();
	constructor(
		private httpClient: HttpClient,
		private sharedService: SharedService
	) {
		this.contentHeaders = this.contentHeaders.set("Accept", "application/json");
		this.contentHeaders = this.contentHeaders.set(
			"Content-Type",
			"application/json; charset=utf-8"
		);
	}

	getBenefitRuleSelection(
		usePagination: boolean = false,
		page: number = 0,
		size: number = 0
	): Observable<BenefitRuleSelect[]> {
		const url = `${this.benefitRuleSelectUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
		return this.httpClient.get(url, { observe: "response" }).pipe(
			map((response) => response.body as BenefitRuleSelect[]),
			catchError((error: any) => {
				return this.sharedService.handleError(error);
			})
		);
	}

	getBenefitRuleSelect(ruleId: string): Observable<BenefitRuleSelect> {
		return this.httpClient
			.get(`${this.benefitRuleSelectUrl}/${ruleId}`, { observe: "response" })
			.pipe(
				map((response) => response.body as BenefitRuleSelect),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}
	findByRuleID(ruleId: any) {
		return this.httpClient
			.get(`${this.benefitRuleSelectUrl}/find-by-rule-id/${ruleId}`, {
				observe: "response",
			})
			.pipe(
				map((response) => response.body as BenefitRuleSelect),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}

	getMedDefStatuses(ruleId: string): Observable<MedDefStatusModel> {
		return this.httpClient
			.get(`${this.benefitRuleSelectUrl}/get-med-def-statuses/${ruleId}`, {
				observe: "response",
			})
			.pipe(
				map((response) => response.body as MedDefStatusModel),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}

	getBenefitRuleSelectStateAllowedStatus(ruleType: string): Observable<string> {
		return this.httpClient
			.get(
				`${this.benefitRuleSelectUrl}/get-allowed-Benefit-Rule-State-status/${ruleType}`,
				{ observe: "response" }
			)
			.pipe(
				map((response) => response.body as string),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}

	getBenefitRuleSelectsCount(): Observable<number> {
		var url = `${this.benefitRuleSelectUrl}/count`;
		return this.httpClient.get(url, { observe: "response" }).pipe(
			map((response) => response.body as number),
			catchError((error: any) => {
				return this.sharedService.handleError(error);
			})
		);
	}

	createBenefitRuleSelect(benefitRuleSelect: BenefitRuleSelect[] = []): Observable<any> {
		let body = JSON.stringify(benefitRuleSelect);
		return this.httpClient.post(this.benefitRuleSelectUrl, body, { headers: this.contentHeaders }).pipe(
			map((response) => response),
			catchError((error: any) => {
				return this.sharedService.handleError(error);
			})
		);
	}

	updateBenefitRuleSelect(benefitRuleSelect: BenefitRuleSelect[]=[]): Observable<any> {
		let body = JSON.stringify(benefitRuleSelect);
		return this.httpClient.put(`${this.benefitRuleSelectUrl}`, body, {
				headers: this.contentHeaders,
			})
			.pipe(
				map((response) => response),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}

	updateBenefitSelectRecords(
		benefitRuleSelect: Array<BenefitRuleSelect>
	): Observable<any> {
		let body = JSON.stringify(benefitRuleSelect);
		const url = `${this.benefitRuleSelectUrl}/updateBenefitSelectRecords`;
		return this.httpClient
			.post(url, body, { headers: this.contentHeaders })
			.pipe(
				map((response) => response),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}

	partiallyUpdateBenefitRuleSelect(
		benefitRuleSelect: BenefitRuleSelect,
		ruleId: string
	): Observable<any> {
		let body = JSON.stringify(benefitRuleSelect);
		return this.httpClient
			.patch(`${this.benefitRuleSelectUrl}/${ruleId}`, body, {
				headers: this.contentHeaders,
			})
			.pipe(
				map((response) => response),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}

	deleteBenefitRuleSelect(ruleId: string): Observable<any> {
		return this.httpClient
			.delete(`${this.benefitRuleSelectUrl}/${ruleId}`, { observe: "response" })
			.pipe(
				map((response) => response.body),
				catchError((error: any) => {
					return this.sharedService.handleError(error);
				})
			);
	}

	getBenefitRuleSelectionByRuleIdAndColumnNameAndColumnOccurence(
		ruleId: any,
		columnName: any,
		columnOccurrence: any
	): Observable<any> {
		var url = `${this.benefitRuleSelectUrl}/${ruleId}/${columnName}/${columnOccurrence}`;
		return this.httpClient.get(url, { observe: "response" }).pipe(
			map((response) => response.body as number),
			catchError((error: any) => {
				return this.sharedService.handleError(error);
			})
		);
	}
}
