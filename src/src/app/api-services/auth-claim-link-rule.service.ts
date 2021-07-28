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
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthClaimLinkRule(lineOfBusiness : string): Observable<AuthClaimLinkRule> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthClaimLinkRuleExist(lineOfBusiness : string, seqAuthType: number): Observable<AuthClaimLinkRule> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/${seqAuthType}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    getAuthClaimLinkRulesCount(): Observable<number> {
        var url = `${this.authClaimLinkRuleUrl}/count`;
        return this.httpClient.get(url, {observe: 'response'})
            .pipe(map(response => response.body as number),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    findByLineOfBusiness(lineOfBusiness : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-lineofbusiness/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthQuantityExceededReason(authQuantityExceededReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authquantityexceededreason/${authQuantityExceededReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthNewReason(authNewReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authnewreason/${authNewReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthGroupPlanReason(authGroupPlanReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authgroupplanreason/${authGroupPlanReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthExpiredReason(authExpiredReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authexpiredreason/${authExpiredReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthDeniedReason(authDeniedReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authdeniedreason/${authDeniedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthCostExceededReason(authCostExceededReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authcostexceededreason/${authCostExceededReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthClosedReason(authClosedReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authclosedreason/${authClosedReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthSecOpReqReason(authSecOpReqReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authsecopreqreason/${authSecOpReqReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findBySeqAuthType(seqAuthType : number): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-seqauthtype/${seqAuthType}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthHeldReason(authHeldReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authheldreason/${authHeldReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
    findByAuthDateReason(authDateReason : string): Observable<AuthClaimLinkRule[]> {
        return this.httpClient.get(`${this.authClaimLinkRuleUrl}/find-by-authdatereason/${authDateReason}`, {observe: 'response'})
            .pipe(map(response => response.body as AuthClaimLinkRule),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }




    createAuthClaimLinkRule(authClaimLinkRule : AuthClaimLinkRule): Observable<any> {
        let body = JSON.stringify(authClaimLinkRule);
        return this.httpClient.post(this.authClaimLinkRuleUrl, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    updateAuthClaimLinkRule(authClaimLinkRule: AuthClaimLinkRule, seqAuthType: number, lineOfBusiness: string): Observable<any> {
        let body = JSON.stringify(authClaimLinkRule);
        return this.httpClient.put(`${this.authClaimLinkRuleUrl}/${seqAuthType}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
             .pipe(map(response => response),
                 catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    partiallyUpdateAuthClaimLinkRule(authClaimLinkRule : AuthClaimLinkRule, seqAuthType: number, lineOfBusiness : string): Observable<any> {
        let body = JSON.stringify(authClaimLinkRule);
        return this.httpClient.patch(`${this.authClaimLinkRuleUrl}/${seqAuthType}/${lineOfBusiness}`, body, { headers: this.contentHeaders })
            .pipe(map(response => response),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }

    deleteAuthClaimLinkRule(seqAuthType: number, lineOfBusiness: string): Observable<any> {
        return this.httpClient.delete(`${this.authClaimLinkRuleUrl}/${seqAuthType}/${lineOfBusiness}`, {observe: 'response'})
            .pipe(map(response => response.body),
                catchError((error: any) => {
                     return this.sharedService.handleError(error)
                 }))
    }
}
