/* Copyright (c) 2020 . All Rights Reserved. */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { AuthClaimLinkRule } from '../api-models/auth-claim-link-rule.model'
import { CONFIG } from '../core/config';
import { environment } from '../../environments/environment'
import { HttpHeaders } from '@angular/common/http';
import { SharedService } from '../shared/services/shared.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class AuthClaimLinkRuleService {

    private authClaimLinkRuleUrl: string = `${environment.apiUrl}/authclaimlinkrules`;
    private contentHeaders = new HttpHeaders();
    constructor(private httpClient : HttpClient,
                private sharedService: SharedService) {
        this.contentHeaders = this.contentHeaders.set('Accept', 'application/json');
        this.contentHeaders = this.contentHeaders.set('Content-Type', 'application/json; charset=utf-8');
    }

    getAuthClaimLinkRules(usePagination: boolean=false, page: number = 0, size: number = 0): Observable<AuthClaimLinkRule[]> {
        var url = `${this.authClaimLinkRuleUrl}/?use-pagination=${usePagination}&page=${page}&size=${size}`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule[]),
                catchError(this.sharedService.handleError))
    }

    getAuthClaimLinkRule(lineOfBusiness : string): Observable<AuthClaimLinkRule> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }

    getAuthClaimLinkRulesCount(): Observable<number> {
        var url = `${this.authClaimLinkRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError(this.sharedService.handleError))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthQuantityExceededReason(authQuantityExceededReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authquantityexceededreason/${authQuantityExceededReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthNewReason(authNewReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authnewreason/${authNewReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthGroupPlanReason(authGroupPlanReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authgroupplanreason/${authGroupPlanReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthExpiredReason(authExpiredReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authexpiredreason/${authExpiredReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthDeniedReason(authDeniedReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authdeniedreason/${authDeniedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthCostExceededReason(authCostExceededReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authcostexceededreason/${authCostExceededReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthClosedReason(authClosedReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authclosedreason/${authClosedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthSecOpReqReason(authSecOpReqReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authsecopreqreason/${authSecOpReqReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findBySeqAuthType(seqAuthType : number): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-seqauthtype/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthHeldReason(authHeldReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authheldreason/${authHeldReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }
    findByAuthDateReason(authDateReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authdatereason/${authDateReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError(this.sharedService.handleError))
    }




    createAuthClaimLinkRule(authClaimLinkRule : AuthClaimLinkRule): Observable<any> {
        let body = JSON.stringify(authClaimLinkRule);
        return this.httpClient.post(this.authClaimLinkRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    updateAuthClaimLinkRule(authClaimLinkRule : AuthClaimLinkRule, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimLinkRule);
        return this.httpClient.put(`${this.authClaimLinkRuleUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError(this.sharedService.handleError))
    }

    partiallyUpdateAuthClaimLinkRule(authClaimLinkRule : AuthClaimLinkRule, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimLinkRule);
        return this.httpClient.patch(`${this.authClaimLinkRuleUrl}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError(this.sharedService.handleError))
    }

    deleteAuthClaimLinkRule(lineOfBusiness : string): Observable<any> {
        return this.httpClient.delete(`${this.authClaimLinkRuleUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError(this.sharedService.handleError))
    }
}