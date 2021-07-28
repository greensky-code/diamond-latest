/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { BenefitRule } from '../api-models/benefit-rule.model';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class BenefitRuleService {

    private benefitRuleUrl: string = `${environment.apiUrl}/benefitrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient: HttpClient, private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitRules(usePagination: boolean = false, page: number = 0, size: number = 0): Observable<BenefitRule[]> {
        var url = `${this.benefitRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as BenefitRule[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByPackageId(benefitPackageId: string): Observable<BenefitRule[]> {
        return this.httpClient.get(`${this.benefitRuleUrl}/find-benefit-rule/${benefitPackageId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRule[],
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })));
    }

    getBenefitRule(ruleId: string): Observable<BenefitRule> {
        return this.httpClient.get(`${this.benefitRuleUrl}/${ruleId}`, { observe: 'response' })
            .pipe(map(response => response.body as BenefitRule),
                catchError((error: any) => {
                    if (error.error.status !== 409) {
                     return this.sharedService.handleError(error);
                    }
                 }))
    }

    getBenefitRulesCount(): Observable<number> {
        var url = `${this.benefitRuleUrl}/count`;
        return this.httpClient.get(url, { observe: 'response' })
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    createBenefitRule(benefitRule: BenefitRule): Observable<any> {
        let body = JSON.stringify(benefitRule);
        return this.httpClient.post(this.benefitRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateBenefitRule(benefitRule: BenefitRule, ruleId: string): Observable<any> {
        let body = JSON.stringify(benefitRule);
        return this.httpClient.put(`${this.benefitRuleUrl}/${ruleId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateBenefitRule(benefitRule: BenefitRule, ruleId: string): Observable<any> {
        let body = JSON.stringify(benefitRule);
        return this.httpClient.patch(`${this.benefitRuleUrl}/${ruleId}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteBenefitRule(ruleId: string): Observable<any> {
        return this.httpClient.delete(`${this.benefitRuleUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    findByBenefitRuleOrderByRuleId(): Observable<BenefitRule[]> {
        return this.httpClient.get(`${this.benefitRuleUrl}/order-by-ruleid`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRule[],
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 })));
    }

     getRules(benefitPackageId:string): Observable<any> {
        let params = new HttpParams();
        params = params.append('benefitPackageId', benefitPackageId);
        return this.httpClient.get(`${this.benefitRuleUrl}/find-benefit-rules`, {
            params: params,
            headers: this.contentHeaders
        }).pipe(map(resp => resp),
            catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


}
