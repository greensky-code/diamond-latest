/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { ClaimsDuplicateRule } from '../api-models/claims-duplicate-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class ClaimsDuplicateRuleService {

    private claimsDuplicateRuleUrl: string = `${environment.apiUrl}/claimsduplicaterules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimsDuplicateRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<ClaimsDuplicateRule[]> {
        var url = `${this.claimsDuplicateRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule[]),
                catchError(this.sharedService.handleError))
    }

    getClaimsDuplicateRule(claimDupRule : string): Observable<ClaimsDuplicateRule> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/${claimDupRule}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError(this.sharedService.handleError))
    }

    getClaimsDuplicateRulesCount(): Observable<number> {
        var url = `${this.claimsDuplicateRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByReasonCode3(reasonCode3 : string): Observable<ClaimsDuplicateRule[]> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/find-by-reasoncode3/${reasonCode3}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError(this.sharedService.handleError))
    }
    findByReasonCode2(reasonCode2 : string): Observable<ClaimsDuplicateRule[]> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/find-by-reasoncode2/${reasonCode2}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError(this.sharedService.handleError))
    }
    findByReasonCode1(reasonCode1 : string): Observable<ClaimsDuplicateRule[]> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/find-by-reasoncode1/${reasonCode1}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError(this.sharedService.handleError))
    }




    createClaimsDuplicateRule(claimsDuplicateRule : ClaimsDuplicateRule): Observable<any> {
        let body = JSON.stringify(claimsDuplicateRule);
        return this.httpClient.post(this.claimsDuplicateRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateClaimsDuplicateRule(claimsDuplicateRule : ClaimsDuplicateRule, claimDupRule : string): Observable<any> {
        let body = JSON.stringify(claimsDuplicateRule);
        return this.httpClient.put(`${this.claimsDuplicateRuleUrl}/${claimDupRule}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateClaimsDuplicateRule(claimsDuplicateRule : ClaimsDuplicateRule, claimDupRule : string): Observable<any> {
        let body = JSON.stringify(claimsDuplicateRule);
        return this.httpClient.patch(`${this.claimsDuplicateRuleUrl}/${claimDupRule}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteClaimsDuplicateRule(claimDupRule : string): Observable<any> {
        return this.httpClient.delete(`${this.claimsDuplicateRuleUrl}/${claimDupRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}