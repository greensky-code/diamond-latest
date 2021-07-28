/* Copyright (c) 2020 . All Rights Reserved. */
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Rx';
import {Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {SharedService} from '../../shared/services/shared.service';
import {environment} from '../../../environments/environment';
import {ClaimsDuplicateRule} from '../../api-models/support/claims-duplicate-rule.model';

@Injectable()
export class ClaimsDuplicateRuleService {

    private claimsDuplicateRuleUrl = `${environment.apiUrl}/claimsduplicaterules`;
    private contentHeaders = new HttpHeaders();

    constructor(private httpClient: HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getClaimsDuplicateRules(usePagination = false, page = 0, size = 0): Observable<ClaimsDuplicateRule[]> {
        let url = `${this.claimsDuplicateRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule[]),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getClaimsDuplicateRule(claimDupRule: string): Observable<ClaimsDuplicateRule> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/${claimDupRule}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getClaimsDuplicateRulesCount(): Observable<number> {
        let url = `${this.claimsDuplicateRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByReasonCode3(reasonCode3: string): Observable<ClaimsDuplicateRule[]> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/find-by-reasoncode3/${reasonCode3}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByReasonCode2(reasonCode2: string): Observable<ClaimsDuplicateRule[]> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/find-by-reasoncode2/${reasonCode2}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByReasonCode1(reasonCode1: string): Observable<ClaimsDuplicateRule[]> {
        return this.httpClient.get(`${this.claimsDuplicateRuleUrl}/find-by-reasoncode1/${reasonCode1}`, {observe: 'response'})
            .pipe(map(response => response.body as ClaimsDuplicateRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }


    createClaimsDuplicateRule(claimsDuplicateRule: ClaimsDuplicateRule): Observable<any> {
        let body = JSON.stringify(claimsDuplicateRule);
        return this.httpClient.post(this.claimsDuplicateRuleUrl, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateClaimsDuplicateRule(claimsDuplicateRule: ClaimsDuplicateRule, claimType: string, claimDupRule: string): Observable<any> {
        let body = JSON.stringify(claimsDuplicateRule);
        return this.httpClient.put(`${this.claimsDuplicateRuleUrl}/${claimType}/${claimDupRule}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateClaimsDuplicateRule(claimsDuplicateRule: ClaimsDuplicateRule, claimType: string, claimDupRule: string): Observable<any> {
        let body = JSON.stringify(claimsDuplicateRule);
        return this.httpClient.patch(`${this.claimsDuplicateRuleUrl}/${claimType}/${claimDupRule}`, body, {headers: this.contentHeaders})
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteClaimsDuplicateRule(claimDupRule: string): Observable<any> {
        return this.httpClient.delete(`${this.claimsDuplicateRuleUrl}/${claimDupRule}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
