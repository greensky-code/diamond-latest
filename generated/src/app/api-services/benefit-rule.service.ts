/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { BenefitRule } from '../api-models/benefit-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class BenefitRuleService {

    private benefitRuleUrl: string = `${environment.apiUrl}/benefitrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getBenefitRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<BenefitRule[]> {
        var url = `${this.benefitRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRule[]),
                catchError(this.sharedService.handleError))
    }

    getBenefitRule(ruleId : string): Observable<BenefitRule> {
        return this.httpClient.get(`${this.benefitRuleUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body as BenefitRule),
                catchError(this.sharedService.handleError))
    }

    getBenefitRulesCount(): Observable<number> {
        var url = `${this.benefitRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }





    createBenefitRule(benefitRule : BenefitRule): Observable<any> {
        let body = JSON.stringify(benefitRule);
        return this.httpClient.post(this.benefitRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateBenefitRule(benefitRule : BenefitRule, ruleId : string): Observable<any> {
        let body = JSON.stringify(benefitRule);
        return this.httpClient.put(`${this.benefitRuleUrl}/${ruleId}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateBenefitRule(benefitRule : BenefitRule, ruleId : string): Observable<any> {
        let body = JSON.stringify(benefitRule);
        return this.httpClient.patch(`${this.benefitRuleUrl}/${ruleId}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteBenefitRule(ruleId : string): Observable<any> {
        return this.httpClient.delete(`${this.benefitRuleUrl}/${ruleId}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}